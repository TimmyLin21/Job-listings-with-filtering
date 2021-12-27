const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './index.html',
    './js/all.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(180, 29%, 50%)',
        'grayish-cyan': {
          100: 'hsl(180, 52%, 96%)',
          200: 'hsl(180, 31%, 95%)',
          300: 'hsl(180, 8%, 52%)',
          400: 'hsl(180, 14%, 20%)',
        },
      },
      backgroundImage: {
        'header-mobile': 'url(../images/bg-header-mobile.svg)',
        'header-desktop': 'url(../images/bg-header-desktop.svg)',
      },
      fontFamily: {
        header: [
          'Spartan',
          ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
