/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'window': '0 10px 40px rgba(0, 0, 0, 0.35)',
        'window-focus': '0 15px 50px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'dock-bounce': 'dock-bounce 0.5s ease-out',
        'window-in': 'window-in 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'dock-bounce': {
          '0%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.1) translateY(-10px)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
        'window-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}