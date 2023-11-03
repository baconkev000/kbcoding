/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'd-grey': '#161616',
        'md-grey': '#222222',
        'base-grey': '#2D2D2D',
        'l-grey': '#ffffff',
        'a-green': '#7DE3A8',
        'a-yellow': '#EED17A',
        'a-purple': '#DEB8F6',
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

