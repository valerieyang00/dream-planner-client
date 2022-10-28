/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {},
  },
  colors: {
    font: rgb(128, 128, 128),
    button: rgb(183, 216, 241),
    buttonHover: rgb(80, 148, 212),
    accent: rgb(214, 174, 221)   
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}

