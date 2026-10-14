import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const MANIFEST_FETCH = `window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = await (await fetch(withLeadingSlash(manifestUrl))).json();`
const DATA_FETCH = `window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[pathname] = await (await fetch(withLeadingSlash(dataUrl))).json();`

const READ_STATIC_JSON = `async function readStaticJson(url) {
  try {
    const response = await fetch(url);
    const type = response.headers.get("Content-Type") || "";
    if (!response.ok || !/\\bjson\\b/i.test(type)) return null;
    return await response.json();
  } catch {
    return null;
  }
}
`

const INLINE_SCRIPT = /<script>([\s\S]*?)<\/script>/g

/**
 * vite-react-ssg fetches static-loader JSON and calls Response.json() with no
 * check. A non-JSON body (the HTML 404 page) rejects the route loader.
 */
export function guardSsgJsonPlugin() {
  return {
    name: 'guard-ssg-json',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes(`${path.sep}vite-react-ssg${path.sep}dist${path.sep}index.mjs`)) return null
      if (code.includes('async function readStaticJson')) return null
      if (!code.includes(MANIFEST_FETCH) || !code.includes(DATA_FETCH)) {
        throw new Error('[guard-ssg-json] vite-react-ssg client no longer matches the expected Response.json() calls.')
      }
      const manifestBlock = `if (!window.__VITE_REACT_SSG_HASH__) {
            window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = {};
          } else {
            const manifestUrl = joinUrlSegments(
              BASE_URL,
              \`static-loader-data-manifest-\${window.__VITE_REACT_SSG_HASH__}.json\`
            );
            window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = await readStaticJson(withLeadingSlash(manifestUrl)) ?? {};
          }`
      let next = code.replace(
        `if (!window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__) {
          const manifestUrl = joinUrlSegments(
            BASE_URL,
            \`static-loader-data-manifest-\${window.__VITE_REACT_SSG_HASH__}.json\`
          );
          ${MANIFEST_FETCH}
        }`,
        `if (!window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__) {
          ${manifestBlock}
        }`,
      )
      next = next.replace(
        DATA_FETCH,
        'window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[pathname] = await readStaticJson(withLeadingSlash(dataUrl)) ?? {};',
      )
      if (next === code || next.includes(MANIFEST_FETCH) || next.includes(DATA_FETCH)) {
        throw new Error('[guard-ssg-json] Failed to rewrite the static loader fetches.')
      }
      return READ_STATIC_JSON + next
    },
  }
}

/**
 * The production CSP is script-src 'self', so the inline boot scripts that set
 * __VITE_REACT_SSG_HASH__ and __staticRouterHydrationData never run. The loader
 * then requests static-loader-data-manifest-undefined.json and parses the HTML
 * 404 page. Move those scripts to same-origin files the CSP already allows.
 * They stay parser-blocking (no defer) so they run before the deferred module.
 */
export function externalizeBootScripts(distDir) {
  const bootDir = path.join(distDir, 'assets', 'boot')
  fs.mkdirSync(bootDir, { recursive: true })
  let pages = 0
  let hashScripts = 0

  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'boot' && dir.endsWith(`${path.sep}assets`)) continue
        visit(full)
        continue
      }
      if (!entry.name.endsWith('.html')) continue
      pages += 1
      const html = fs.readFileSync(full, 'utf8')
      let pageHasHash = false
      const next = html.replace(INLINE_SCRIPT, (match, code) => {
        const isHash = code.includes('__VITE_REACT_SSG_HASH__')
        const isHydration = code.includes('__staticRouterHydrationData')
        if (!isHash && !isHydration) return match
        if (isHash) {
          pageHasHash = true
          hashScripts += 1
        }
        const name = crypto.createHash('sha256').update(code).digest('hex').slice(0, 16) + '.js'
        const file = path.join(bootDir, name)
        if (!fs.existsSync(file)) fs.writeFileSync(file, code)
        return `<script src="/assets/boot/${name}"></script>`
      })
      if (!pageHasHash) {
        throw new Error(`[ssg] ${path.relative(distDir, full)} has no __VITE_REACT_SSG_HASH__ script to externalize.`)
      }
      if (next !== html) fs.writeFileSync(full, next)
    }
  }

  visit(distDir)
  if (pages === 0 || hashScripts === 0) {
    throw new Error('[ssg] No pre-rendered pages found while externalizing boot scripts.')
  }
}
