/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  prefix: 'tw-',
  important: true,
  theme: {
    extend: {
      fontFamily : {
        sans : ['Sofia Sans Semi Condensed', 'sans-serif'],
        serif : ['Instrument Serif','serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

