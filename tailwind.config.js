/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F75FB',
        gray: {
          400: '#9898ad',
          500: '#a1a1a1',
          600: '#3C3C3C',
          700: '#575757',
          800: '#353340',
          900: '#151515'
        }
      },
      boxShadow: {
        DEFAULT: '0 3px 12px rgba(0, 0, 0, 0.03)',
        md: '0 3px 12px rgba(0, 0, 0, 0.1)'
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        fade: 'fade .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out'
      },
      fontSize: {
        xs: '.9rem',
        sm: '1rem',
        tiny: '1.2rem',
        base: '1.4rem',
        lg: '1.5rem',
        xl: '1.6rem',
        '2xl': '1.75rem',
        '3xl': '1.9rem',
        '4xl': '2.4rem',
        '5xl': '3.5rem',
        '6xl': '4.5rem',
        '7xl': '5.5rem'
      }
    }
  },
  plugins: []
}
