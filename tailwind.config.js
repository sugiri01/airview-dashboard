/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0099cc',
          light: "rgba(0, 153, 204, 0.1)",
          dark: "#0088b3",
        },
        secondary: {
          DEFAULT: "#00AEEF",
          light: "rgba(0, 174, 239, 0.1)",
          dark: "#009ad6",
        },
        "dark-theme": {
          DEFAULT: "#003366",
        },
        "green-theme": {
          DEFAULT: "#4CAF50",
          light: "rgba(76, 175, 80, 0.1)",
          dark: "#409444",
        },
      },
      boxShadow: {
        "primary-sm": "0 2px 4px rgba(0, 153, 204, 0.3)",
        "secondary-sm": "0 2px 4px rgba(0, 174, 239, 0.3)",
      },
      scale: {
        101: "1.01",
        102: "1.02",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(90deg, #0099CC, #00AEEF, #4CAF50)",
        "gradient-forecast": "linear-gradient(to right, #e6f7ff, #ffffff)",
        "gradient-forecast-dark":
          "linear-gradient(to right, rgba(0, 153, 204, 0.05), transparent)",
      },
    },
  },
  plugins: [],
}
  