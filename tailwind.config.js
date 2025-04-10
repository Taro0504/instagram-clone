/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0095f6",
        secondary: "#262626",
        success: "#58c322",
        danger: "#ed4956",
        warning: "#fcac38",
        info: "#3897f0",
        dark: "#000000",
        light: "#ffffff",
        gray: {
          100: "#fafafa",
          200: "#efefef",
          300: "#dbdbdb",
          400: "#a8a8a8",
          500: "#737373",
          600: "#8e8e8e",
          700: "#262626",
          800: "#121212",
          900: "#000000",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
