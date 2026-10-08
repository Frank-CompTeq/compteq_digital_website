import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
  },
})
