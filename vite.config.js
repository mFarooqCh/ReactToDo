// vite.config.js
import { defineConfig } from 'vite'
import react       from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  root: './wwwroot/src',
  plugins: [react()],
  publicDir: '../public',
  base: mode === 'production' ? '/dist/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      cache: false
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7028',
        secure: true,
        changeOrigin: true
      }
    }
  }
}))