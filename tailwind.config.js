module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        slideLeft: {
          "0%": { marginLeft: "100%" },
          "100%": { marginLeft: "0%" },
        },
      },
      animation: {
        slideLeft: "slideLeft 0.5s",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
