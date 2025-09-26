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
})