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
        disable:'#00000033',
        disable2:'#F1F3F4',
        yellow:'#FFA52F'
      },
      width: {
        "10p": "10%",
        "15p": "15%",
        "16p": "16%",
        "20p": "20%",
        "25p": "25%",
        "30p": "30%",
        "40p": "40%",
        "50p": "50%",
        "60p": "60%",
        "80p": "80%",
        "90p": "97%",
      },
      margin: {
        "15p": "15%",
        "20p": "20%"
      }
    },
  },
  plugins: [],
}
