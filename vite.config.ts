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
/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true,
      renderLegacyChunks: true
    })
  ],
  build: {
    target: 'es5', // Don't use 'es5', let legacy plugin handle it
    cssTarget: 'es5',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
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
      targets: ['ie >= 11', 'chrome >= 49', 'firefox >= 45', 'safari >= 10', 'edge >= 14'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true,
      polyfills: [
        'es.promise',
        'es.object.assign',
        'es.array.iterator',
        'es.string.iterator',
        'web.dom.iterable'
      ]
    })
  ],
  build: {
    target: 'es5',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000
  }
})