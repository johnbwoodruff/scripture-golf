const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,svg,ts}'],
  theme: {},
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  darkMode: 'class'
};
