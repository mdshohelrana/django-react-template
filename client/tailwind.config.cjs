/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: { desktop: '1440px', 'mid-desktop': '1660px', '3xl': '1920px', '4xl': '2100px' },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: '#383E42',
        'primary-turquoise': '#00B7C8',
        'primary-dark-gray': '#383E42',
        'primary-light-gray': '#A1A1a0',
        'secondary-yellow': '#FFCC5A',
        'light-yellow': '#FFE09C',
        'secondary-blood-orange': '#F54B32',
        'secondary-blue': '#DEF5F8',
      },
      borderRadius: {
        '5px': '5px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
