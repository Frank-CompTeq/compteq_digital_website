import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { SITE, STATIC_PAGES } from '../src/lib/site-data.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const PUBLIC_DIR = path.join(ROOT, 'public')

const VIRTUAL_INDEX = 'virtual:blog'
const VIRTUAL_POST_PREFIX = 'virtual:blog-post/'
const RESOLVED = '\0'

const WORDS_PER_MINUTE = 225
const REQUIRED = ['title', 'description', 'date', 'author', 'category', 'image']

export const BLOG_PAGE_SIZE = Number.parseInt(process.env.BLOG_PAGE_SIZE ?? '', 10) || 6

export function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toIsoDate(value, file, field) {
  const date = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(date.getTime())) throw new Error(`[blog] ${file}: "${field}" is not a valid date`)
  return date.toISOString().slice(0, 10)
}

function createMarkdown() {
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true })

  md.core.ruler.push('heading_ids', (state) => {
    const used = new Map()
    const toc = []
    const { tokens } = state
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i]
      if (token.type !== 'heading_open') continue
      const level = Number(token.tag.slice(1))
      if (level === 1) throw new Error('[blog] Do not use "# " headings in articles: the title comes from the frontmatter.')
      const text = tokens[i + 1].children
        .filter((child) => child.type === 'text' || child.type === 'code_inline')
        .map((child) => child.content)
        .join('')
      let id = slugify(text) || 'section'
      const count = used.get(id) ?? 0
      used.set(id, count + 1)
      if (count > 0) id = `${id}-${count + 1}`
      token.attrSet('id', id)
      if (level === 2 || level === 3) toc.push({ id, text, level })
    }
    state.env.toc = toc
  })

  const defaultLinkOpen = md.renderer.rules.link_open ?? ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const href = tokens[idx].attrGet('href') ?? ''
    if (/^https?:\/\//i.test(href) && !href.startsWith(SITE.url)) {
      tokens[idx].attrSet('rel', 'noopener noreferrer')
    }
    return defaultLinkOpen(tokens, idx, options, env, self)
  }

  md.renderer.rules.table_open = () =>
    '<div class="table-scroll" role="region" aria-label="Scrollable table" tabindex="0"><table>\n'
  md.renderer.rules.table_close = () => '</table></div>\n'

  return md
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ')
}

export function loadPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const md = createMarkdown()
  const posts = []

  for (const file of fs.readdirSync(CONTENT_DIR).filter((name) => /\.md$/.test(name) && !/^readme/i.test(name)).sort()) {
    const source = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
    const { data, content } = matter(source)
    if (data.draft === true) continue

    for (const field of REQUIRED) {
      if (!data[field]) throw new Error(`[blog] ${file}: missing frontmatter field "${field}"`)
    }

    const slug = data.slug ? slugify(data.slug) : slugify(file.replace(/\.md$/, ''))
    const env = {}
    const html = md.render(content, env)
    const words = plainText(content).split(/\s+/).filter(Boolean).length

    const ogPng = String(data.image).replace(/\.[a-z]+$/i, '.png')
    const hasOgPng = fs.existsSync(path.join(PUBLIC_DIR, ogPng))

    posts.push({
      meta: {
        slug,
        title: String(data.title),
        description: String(data.description),
        date: toIsoDate(data.date, file, 'date'),
        updated: data.updated ? toIsoDate(data.updated, file, 'updated') : null,
        author: String(data.author),
        authorType: data.authorType === 'person' ? 'person' : 'organization',
        category: String(data.category),
        categorySlug: slugify(data.category),
        image: String(data.image),
        ogImage: hasOgPng ? ogPng : SITE.ogImage,
        imageAlt: String(data.imageAlt ?? data.title),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
      },
      html,
      toc: env.toc ?? [],
      file,
    })
  }

  const slugs = new Set()
  for (const post of posts) {
    if (slugs.has(post.meta.slug)) throw new Error(`[blog] Duplicate slug "${post.meta.slug}"`)
    slugs.add(post.meta.slug)
  }

  return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date) || a.meta.title.localeCompare(b.meta.title))
}

export function getCategories(posts) {
  const map = new Map()
  for (const { meta } of posts) {
    const entry = map.get(meta.categorySlug) ?? { name: meta.category, slug: meta.categorySlug, count: 0 }
    entry.count += 1
    map.set(meta.categorySlug, entry)
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export function blogPaths(posts, pageSize = BLOG_PAGE_SIZE) {
  const pagesFor = (count) => Math.max(1, Math.ceil(count / pageSize))
  const paths = ['/blog/']
  for (let n = 2; n <= pagesFor(posts.length); n += 1) paths.push(`/blog/page/${n}/`)
  for (const category of getCategories(posts)) {
    paths.push(`/blog/category/${category.slug}/`)
    for (let n = 2; n <= pagesFor(category.count); n += 1) paths.push(`/blog/category/${category.slug}/page/${n}/`)
  }
  for (const { meta } of posts) paths.push(`/blog/${meta.slug}/`)
  return paths
}

const xmlEscape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function buildSitemap(posts) {
  const latest = posts.reduce((max, { meta }) => (meta.updated ?? meta.date) > max ? (meta.updated ?? meta.date) : max, '')
  const postByPath = new Map(posts.map(({ meta }) => [`/blog/${meta.slug}/`, meta]))
  const entries = STATIC_PAGES.map((page) => ({ ...page }))

  for (const blogPath of blogPaths(posts)) {
    const meta = postByPath.get(blogPath)
    entries.push({
      path: blogPath,
      lastmod: meta ? (meta.updated ?? meta.date) : latest,
      changefreq: meta ? 'yearly' : 'weekly',
      priority: meta ? '0.7' : blogPath === '/blog/' ? '0.8' : '0.5',
    })
  }

  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
      return `  <url>\n    <loc>${xmlEscape(SITE.url + entry.path)}</loc>${lastmod}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function absolutize(html) {
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${SITE.url}/`)
}

export function buildRss(posts) {
  const latest = posts[0]?.meta.updated ?? posts[0]?.meta.date
  const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString()
  const items = posts
    .map(({ meta, html }) => {
      const url = `${SITE.url}/blog/${meta.slug}/`
      return `    <item>
      <title>${xmlEscape(meta.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <pubDate>${rfc822(meta.date)}</pubDate>
      <dc:creator>${xmlEscape(meta.author)}</dc:creator>
      <category>${xmlEscape(meta.category)}</category>
      <description>${xmlEscape(meta.description)}</description>
      <content:encoded><![CDATA[${absolutize(html).replace(/]]>/g, ']]]]><![CDATA[>')}]]></content:encoded>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xmlEscape(SITE.name)} Blog</title>
    <link>${SITE.url}/blog/</link>
    <description>Practical writing on custom SaaS development, process automation, analytics and launching digital products.</description>
    <language>en-us</language>
    ${latest ? `<lastBuildDate>${rfc822(latest)}</lastBuildDate>` : ''}
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
}

export function writeBlogFeeds(distDir) {
  const posts = loadPosts()
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap(posts))
  fs.writeFileSync(path.join(distDir, 'rss.xml'), buildRss(posts))
}

export function blogPlugin() {
  return {
    name: 'compteq-blog',
    enforce: 'pre',

    buildStart() {
      for (const file of fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR) : []) {
        this.addWatchFile(path.join(CONTENT_DIR, file))
      }
    },

    resolveId(id) {
      if (id === VIRTUAL_INDEX || id.startsWith(VIRTUAL_POST_PREFIX)) return RESOLVED + id
      return null
    },

    load(id) {
      if (id === RESOLVED + VIRTUAL_INDEX) {
        const posts = loadPosts()
        const loaders = posts
          .map(({ meta }) => `  ${JSON.stringify(meta.slug)}: () => import(${JSON.stringify(VIRTUAL_POST_PREFIX + meta.slug)}),`)
          .join('\n')
        return [
          `export const posts = ${JSON.stringify(posts.map((post) => post.meta))}`,
          `export const categories = ${JSON.stringify(getCategories(posts))}`,
          `export const pageSize = ${BLOG_PAGE_SIZE}`,
          `export const loaders = {\n${loaders}\n}`,
        ].join('\n')
      }
      if (id.startsWith(RESOLVED + VIRTUAL_POST_PREFIX)) {
        const slug = id.slice((RESOLVED + VIRTUAL_POST_PREFIX).length)
        const post = loadPosts().find((item) => item.meta.slug === slug)
        if (!post) throw new Error(`[blog] Unknown post "${slug}"`)
        return `export default ${JSON.stringify({ html: post.html, toc: post.toc })}`
      }
      return null
    },

    configureServer(server) {
      server.watcher.add(CONTENT_DIR)
      server.watcher.on('all', (_event, file) => {
        if (!file.startsWith(CONTENT_DIR)) return
        for (const module of server.moduleGraph.idToModuleMap.values()) {
          if (module.id?.startsWith(RESOLVED + 'virtual:blog')) server.moduleGraph.invalidateModule(module)
        }
        server.ws.send({ type: 'full-reload' })
      })
    },
  }
}
