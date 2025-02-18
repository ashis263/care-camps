/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        finlandica : "Finlandica",
        roboto: 'Roboto'
      },
      colors: {
        primary: '#198298',
        secondary: '#dc404e',
        tertiary: '#1a242d'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}