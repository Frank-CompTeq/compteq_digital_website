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
    // sitemap.xml and rss.xml are generated from the pages + content/blog so new articles appear automatically.
    onFinished: (dir) => writeBlogFeeds(dir),
  },
})
