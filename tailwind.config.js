/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#124694",
        gray: "#E7E7E3",
        disable:'#00000033'
      },
      width: {
        "10p": "10%",
        "15p": "15%",
        "20p": "20%",
        "25p": "25%",
        "40p": "40%",
        "50p": "50%",
        "60p": "60%",
        "80p": "80%",
      },
      margin: {
        "15p": "15%"
      }
    },
  },
  plugins: [],
}

