/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./assets/css/*.css', './dist/*.html', './assets/js/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
