/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'dgrey': '#161616',
        'mgrey': '#222222',
        'bgrey': '#2D2D2D',
        'lgrey': '#ffffff',
        'a-green': '#7DE3A8',
        'a-yellow': '#EED17A',
        'a-purple': '#DEB8F6',
      }
    },
  },
  plugins: [],
}

