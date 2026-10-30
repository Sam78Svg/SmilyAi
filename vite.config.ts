import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
            return 'vendor-react';
          }
          if (id.includes('react-icons')) return 'vendor-icons';
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('micromark')) {
            return 'vendor-markdown';
          }
          if (id.includes('react-simple-wysiwyg')) return 'vendor-editor';
        },
      },
    },
  },
})
