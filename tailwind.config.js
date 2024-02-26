/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary: '#FF4500',  
        // secondary: {
        //   100: '#FDE9E9',  
        //   200: '#F9CACA',
        //   300: '#F69B9B', 
        // },
      },
    },
  },
  plugins: [],
}

