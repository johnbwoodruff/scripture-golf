const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,svg,ts}'],
  theme: {},
  daisyui: {
    darkTheme: 'sgdark',
    themes: [
      {
        sglight: {
          primary: '#4d7c0f',
          secondary: '#facc15',
          'base-100': '#FFFFFF'
        },
        sgdark: {
          primary: '#4d7c0f',
          secondary: '#facc15',
          'base-100': '#2D2D2D'
        }
      }
    ]
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  darkMode: ['class', '[data-theme="sgdark"]']
};
