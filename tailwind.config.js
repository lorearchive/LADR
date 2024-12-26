/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "./data/pages/*.{js,ts,jsx,tsx}",
    "./data/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        defaultGray: '#242424',
      },
    },
  },
  plugins: [],
}
