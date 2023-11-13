/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: { min: '0px', max: '393px' },
      md: { min: '393px', max: '1024px' },
      lg: { min: '1024px' },
    },
    extend: {
      colors: {
        navy: '#0e2958',
        blue: '#0078ff',
        lightBlue: '#F1F8FF',
        offwhite: '#f4f4f4',
        deep_dark_gray: '#3e3e3e',
        red: '#F92316',
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
    fontFamily: {
      tmoney: ['TmoneyRoundWind', 'sans-serif'],
    },
    fontWeight: {
      regular: 400,
      extrabold: 800,
    },
    scrollBehavior: {
      smooth: 'smooth',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
