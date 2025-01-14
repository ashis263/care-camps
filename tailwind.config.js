/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Finlandica : "Finlandica"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}