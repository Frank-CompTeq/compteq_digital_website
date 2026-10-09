# Adding a blog article

1. Create `content/blog/<slug>.md` (the file name becomes the URL: `/blog/<slug>/`).
2. Start it with this frontmatter:

   ```yaml
   ---
   title: "Short, specific title (aim for 60 characters or fewer)"
   description: "One or two sentences for search results and link previews (about 120 to 160 characters)."
   date: 2026-10-08                 # publication date, YYYY-MM-DD
   updated: 2026-11-02              # optional, YYYY-MM-DD
   author: "CompTeq Digital"        # shown in the byline and JSON-LD
   authorType: person               # optional: "organization" (default) or "person"
   category: "Custom SaaS"          # new categories get their own /blog/category/<slug>/ page
   image: /blog/images/<slug>.svg   # cover illustration, a file in public/ (SVG or CSS art, no licensed images)
   imageAlt: "Describes the cover for the Open Graph / Twitter card"
   tags: [custom software, SaaS strategy]   # optional
   draft: true                      # optional: excluded from the build while true
   ---
   ```

3. Write the body in Markdown. Do not add a `# ` heading (the title comes from the frontmatter); start sections at `##`. `##` and `###` headings build the table of contents automatically. Tables, lists, quotes and links are supported.
4. Add the cover at `public/blog/images/<slug>.svg` (1200 x 630), then generate the social card PNG with `pnpm blog:og` (needs Chrome: `CHROME_PATH=/path/to/chrome pnpm blog:og`). Commit both files. If the PNG is missing, the site-wide `og-image.png` is used instead.
5. Run `pnpm build`. The article is pre-rendered to `dist/blog/<slug>/index.html` and added automatically to the blog list, its category page, `sitemap.xml` and `rss.xml`. Reading time, canonical URL, Open Graph / Twitter tags, Article and BreadcrumbList JSON-LD and related articles are generated for you.

The list shows 6 articles per page (`BLOG_PAGE_SIZE` env var at build time overrides it, e.g. `BLOG_PAGE_SIZE=2 pnpm build` to test pagination).

Editorial rules: no invented figures, testimonials or unverifiable claims; no licensed images.
