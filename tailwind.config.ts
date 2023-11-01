/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0e2958',
        blue: '#0078ff',
        lightBlue: '#F1F8FF',
        offwhite: '#f4f4f4',
        deep_dark_gray: '#3e3e3e',
        red: '#F92316',
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
  plugins: [require('@tailwindcss/forms'), tailwindScrollbar],
};
