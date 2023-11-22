/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowcolor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#FFFF",
        textColor: "#FFFF", // Added # before the color value
        
      },
    },
    boxShadow: {
      panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;", // No need for the semicolon
    },
  },
  plugins: [],
}
