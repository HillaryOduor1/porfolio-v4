/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015', // For broader browser support
    cssTarget: 'es5'  // Ensure CSS is compatible with older browsers
  }
})*/

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'ie 11'], // Support IE11 and other legacy browsers
      modernPolyfills: true
    })
  ],
  build: {
    target: 'es5'
  }
})*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['ie >= 11', 'chrome >= 49', 'firefox >= 45', 'safari >= 10', 'edge >= 12'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: ['es.promise', 'es.array.iterator', 'es.object.assign', 'web.dom.iterable'],
      renderLegacyChunks: true
    })
  ],
  build: {
    target: 'es2015', // Use ES2015 instead of ES5 for better compatibility
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'polyfills': ['core-js', 'regenerator-runtime']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'core-js']
  },
  esbuild: {
    target: 'es2015',
    legalComments: 'none'
  }
})