const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: {
      card: "60vh",
    },
    extend: {
      colors: {
        lime: colors.lime,
        cyan: colors.cyan,
        lightBlue: colors.lightBlue,
        blueGray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
