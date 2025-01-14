/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        finlandica : "Finlandica",
        roboto: 'Roboto'
      },
      colors: {
        primary: '#198298',
        secondary: '#dc404e'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}