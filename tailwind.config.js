/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      colors: {
        // Safer custom colors matching VS Code / modern dark themes
        ide: {
          bg: '#1e1e1e',        // Main background
          surface: '#252526',   // Card/Sidebar background
          border: '#3c3c3c',    // Subtle borders
          text: '#cccccc',      // Main text
          muted: '#8b8b8b',     // Secondary text
          tag: '#2d2d2d',       // Tag background
          tagBorder: '#404040', // Tag border
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#007acc', // VS Code Blue
          600: '#006bb3',
          700: '#005c99',
          800: '#004d80',
          900: '#003d66',
        }
      }
    },
  },
  plugins: [],
}