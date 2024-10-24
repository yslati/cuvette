/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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