/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mb: "400px",
      tb: "762px",
      lt: "1024px",
      dt: "1280px",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
