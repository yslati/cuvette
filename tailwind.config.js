/** @type {import('tailwindcss').Config} */
export default {
  darkMode: '',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "mainColor": "#0B66EF",
        "grayColor": "#292929",
        "borderColor": "#CCCCCC",
        "inputColor": "#F4F4F4",
        "inputTextColor": "#535353"
      },
      fontFamily: {
        DMSans: ['DMSans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}