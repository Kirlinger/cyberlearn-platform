/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#2563eb',
          700: '#1d4ed8'
        }
      },
      boxShadow: {
        glass: '0 8px 30px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: []
};
