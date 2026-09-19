/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#ffffff',
          canvas: '#f7f8fa',
          card: '#ffffff',
          border: '#e9eaf0',
          text: '#0f172a',
          muted: '#64748b'
        },
        brand: {
          blue: '#0144e4',
          blueHover: '#0035b5',
          amber: '#f59e0b',
          gold: '#d97706',
          indigo: '#4f46e5',
          rose: '#e11d48',
          emerald: '#059669'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'clean': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'krazy': '0 10px 30px -5px rgba(1, 68, 228, 0.12)',
      }
    },
  },
  plugins: [],
}
