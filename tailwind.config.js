/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Urbanist', 'sans-serif'], // Use the name defined in @font-face
      },
      colors: {
        baseColor: "#FFF9F9",
        secondaryColor: "#7B1984",
        googleBtn: "#292929"
      }
    },
  },
  plugins: [],
}

