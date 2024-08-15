/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'cursive']
      },
      colors: {
        'blue-navy': 'var(--blue-navy)',
        'orange': 'var(--orange)',
        'yellow': 'var(--yellow)',
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}

