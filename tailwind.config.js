/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Urbanist', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
      colors: {
        baseColor: "#FFF9F9",
        secondaryColor: "#7B1984",
        nav_title: "#2F2F2F",
        googleBtn: "#292929",
        todoDiv: "#FAC3FF",
        inprogressDiv: "#85D9F1",
        completedDiv: "#CEFFCC",
        boardcompletedDiv: "#A2D6A0",
        boxGray: "#F1F1F1"
      }
    },
  },
  plugins: [],
}

