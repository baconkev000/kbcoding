/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        'd-grey': '#161616',
        'md-grey': '#222222',
        'base-grey': '#2D2D2D',
        'l-grey': '#383838',
        'lighter-grey': '#616161',
        'a-green': '#7DE3A8',
        'a-yellow': '#EED17A',
        'a-purple': '#DEB8F6',
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('flowbite/plugin')
  ],
}

