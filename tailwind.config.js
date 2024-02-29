/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F1035",
        secondary: "#365486",
        light: "#7FC7D9",
        lighter: "#DCF2F1", 
      },
    },
  },
  plugins: [],
};
