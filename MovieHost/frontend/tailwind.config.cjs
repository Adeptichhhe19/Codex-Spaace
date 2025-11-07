/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        dark: '#0f172a'
      }
    }
  },
  plugins: []
};
