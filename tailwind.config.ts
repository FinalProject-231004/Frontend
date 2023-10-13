/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0e2958',
        blue: '#0078ff',
        offwhite: '#f4f4f4',
        deep_dark_gray: '#3e3e3e',
      },
    },
  },
  plugins: [],
};
