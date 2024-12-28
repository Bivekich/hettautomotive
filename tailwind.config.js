/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hett: {
          1: "#38AE34",
          2: "#E8F9E8",
        },
      },
      fontFamily: {
        "roboto-condensed": ['"Roboto Condensed"', "serif"],
      },
    },
  },
  plugins: [],
};
