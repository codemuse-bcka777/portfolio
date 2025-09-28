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
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #66FCF1, 0 0 10px #66FCF1, 0 0 15px #66FCF1',
          },
          '100%': { 
            boxShadow: '0 0 10px #66FCF1, 0 0 20px #66FCF1, 0 0 30px #66FCF1',
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
    },
  },
  plugins: [],
};