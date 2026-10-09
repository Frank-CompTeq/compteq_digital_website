import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { blogPlugin, writeBlogFeeds } from './plugins/blog.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [blogPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // vite-react-ssg: pre-renders every route to static HTML at build time.
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    beastiesOptions: { preload: 'media', pruneSource: false, preloadFonts: false },
    // The charset declaration must be within the first 1024 bytes; react-head prepends tags before it.
    onPageRendered: (_route, html) => {
      const charset = html.match(/<meta charset="[^"]*"\s*\/?>/i)?.[0]
      if (!charset) return html
      return html.replace(charset, '').replace('<head>', `<head>${charset}`)
    },
    // sitemap.xml and rss.xml are generated from the pages + content/blog so new articles appear automatically.
    onFinished: (dir) => writeBlogFeeds(dir),
  },
})
