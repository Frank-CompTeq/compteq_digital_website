# CompTeq Digital website

Marketing site for CompTeq Digital (St. Petersburg, Florida): custom SaaS development, process automation, data and BI, and digital products. English content, "Atelier" art direction (ivory, navy, brass; Fraunces + Inter).

## Stack

- React 19, Vite 6, Tailwind CSS 4, shadcn/ui (only `Button` is kept), lucide-react
- [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) with `react-router-dom` 6: every route is **pre-rendered to static HTML at build time** (content, `<title>`, meta, Open Graph, canonical and JSON-LD are in the HTML without JavaScript) and hydrated in the browser
- Self-hosted variable fonts (`@fontsource-variable`, latin subset): no third-party requests

## Commands

```bash
pnpm install
pnpm dev        # dev server
pnpm lint
pnpm build      # pre-renders to dist/ (home, privacy/, legal/, 404/, blog/...) + sitemap.xml + rss.xml
pnpm preview    # serves dist/ on http://localhost:4173
```

## Structure

```
src/
  main.jsx, routes.jsx     entry + route table (pre-rendered routes)
  pages/                   Home, Privacy, Legal, NotFound, BlogIndex, BlogPost
  sections/                Hero, Services, Process, Approach, Contact
  components/              Header (accessible mobile menu), Footer, HeroVisual (SVG), ContactForm, Seo, ...
  lib/site.js              company data, nav, SEO defaults
content/blog/              Markdown articles (see content/blog/README.md)
plugins/blog.js            Vite plugin: Markdown -> HTML, blog data, sitemap.xml and rss.xml at build
scripts/og-images.mjs      generates the 1200x630 PNG social cards (pnpm blog:og)
public/                    robots.txt, icons, OG image, blog illustrations, .htaccess
```

`sitemap.xml` and `rss.xml` are generated at build time (static pages are listed in `src/lib/site-data.js`; blog URLs come from `content/blog`).

When adding a page: add the route in `src/routes.jsx`, a `<Seo>` block in the page, and the page in `STATIC_PAGES` in `src/lib/site-data.js` (it feeds `sitemap.xml`).

## Blog

English blog at `/blog/` with articles written in Markdown. To add an article, see [`content/blog/README.md`](content/blog/README.md).

## Contact form

The contact form stays on the page and sends JSON with `POST` to `https://api.web3forms.com/submit` (Web3Forms). It does not use `mailto:`. The visitor sees a pending, success, or error message in an `aria-live` region. A honeypot field filters basic bots. Client-side checks cover name, email and message before anything is sent.

The access key is **not** stored in the repository. Vite inlines it at build time from:

```
VITE_WEB3FORMS_ACCESS_KEY
```

Copy `.env.example` to `.env.local` for local builds and put the key there. `.env.local` is gitignored.

**Hostinger, before the next deployment:** open the website in hPanel, then the web app environment variables (Websites → Manage → the Node.js / web app → Environment variables). Add `VITE_WEB3FORMS_ACCESS_KEY` with the Web3Forms access key as the value. Do not commit that value. The variable is read when the site is built, so save it and run a new build. If it is missing, the form does not open an email app: it stays on the page and shows an error that asks the visitor to email `info@compteqdigital.com`.

`public/.htaccess` already allows `https://api.web3forms.com` in `connect-src`. The privacy policy names Web3Forms as the service that delivers the message.

## Deployment (Hostinger / Apache)

Upload the content of `dist/` to `public_html`. `public/.htaccess` (copied to `dist/`) provides: www to apex redirect, security headers (HSTS, CSP, nosniff, frame protection, referrer and permissions policies), immutable caching for hashed assets, `no-cache` for HTML, and a real 404 page. There is no catch-all SPA rewrite: every route is a static file.

## CI

`.github/workflows/ci.yml` runs `pnpm lint`, `pnpm build` and checks that the pre-rendered HTML contains the content. Nothing is deployed automatically.
