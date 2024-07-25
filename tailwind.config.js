/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        "custom-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 -8px 25px -5px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        mainBlue: "#006AF5",
        hoverBlue: "#1768D1",
        gradiant: "#D2DFFF",
        textBlue: "#005FDB",
        error: "#E21D12",
      },
    },
  },
  plugins: [],
};
