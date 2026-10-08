// Generates a 1200x630 PNG Open Graph card for every article, next to its SVG cover
// (public/blog/images/<slug>.svg -> <slug>.png). Social networks do not render SVG, so these PNGs
// are committed. Requires a local Chrome/Chromium: CHROME_PATH=/path/to/chrome pnpm blog:og
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadPosts } from '../plugins/blog.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const chrome = process.env.CHROME_PATH || 'google-chrome'
const font = (name, file) =>
  pathToFileURL(path.join(ROOT, 'node_modules', '@fontsource-variable', name, 'files', file)).href
const esc = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'))

for (const { meta } of loadPosts()) {
  const cover = pathToFileURL(path.join(ROOT, 'public', meta.image)).href
  const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:F;src:url(${font('fraunces', 'fraunces-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:I;src:url(${font('inter', 'inter-latin-wght-normal.woff2')});font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#fbf9f4;font-family:I;color:#0e1b2e;display:flex;overflow:hidden}
.t{width:600px;padding:64px 36px 56px 64px;display:flex;flex-direction:column;border-left:10px solid #b8893b}
.b{font:500 34px F;letter-spacing:-.01em}.b span{font:600 14px I;letter-spacing:.22em;text-transform:uppercase;color:#7a561a;margin-left:12px}
.c{margin-top:auto;font:600 17px I;letter-spacing:.2em;text-transform:uppercase;color:#7a561a}
h1{font:300 52px/1.08 F;letter-spacing:-.02em;margin-top:18px}
.u{margin-top:34px;font-size:20px;color:#55607a}
.i{flex:1;background:#f4efe4;border-left:1px solid #d8d0bd;display:flex;align-items:center;overflow:hidden}
.i img{width:122%;max-width:none;height:auto;margin-left:-11%}
</style><div class="t"><div class="b">CompTeq<span>Digital</span></div><div class="c">${esc(meta.category)}</div><h1>${esc(meta.title)}</h1><div class="u">compteqdigital.com/blog</div></div><div class="i"><img src="${cover}" alt=""></div>`
  const file = path.join(tmp, `${meta.slug}.html`)
  fs.writeFileSync(file, html)
  const out = path.join(ROOT, 'public', meta.image.replace(/\.[a-z]+$/i, '.png'))
  execFileSync(chrome, [
    '--headless=new', '--no-sandbox', `--user-data-dir=${path.join(tmp, 'profile')}`, '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1200,630', '--virtual-time-budget=2000', `--screenshot=${out}`, pathToFileURL(file).href,
  ], { stdio: 'ignore' })
  console.log('wrote', path.relative(ROOT, out))
}
