const colors = require("./src/config/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        "open-sans-regular": "OpenSans_400Regular",
        "open-sans-semibold": "OpenSans_600SemiBold",
        "open-sans-bold": "OpenSans_700Bold",
      },
    },
  },
  plugins: [],
};
