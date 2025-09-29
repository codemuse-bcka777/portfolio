/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0B0C10',
        'section-bg': '#1F2833', 
        'text-primary': '#C5C6C7',
        'neon-primary': '#66FCF1',
        'neon-secondary': '#45A29E',
      },
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};