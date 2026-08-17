import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['ie >= 11', 'chrome >= 49', 'firefox >= 45', 'safari >= 10', 'edge >= 14','Android >= 44', 'iOS >= 10'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true,
      polyfills: [
        'es.promise',
        'es.object.assign',
        'es.array.iterator',
        'es.string.iterator'
      ]
    })
  ],
  build: {
    target: 'es5',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000
  },
  // Add base URL for production
  base: '/',
  // Configure preview server for testing production build locally
  preview: {
    port: 3000
  }
})