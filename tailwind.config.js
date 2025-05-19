// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        reenie: "'Reenie Beanie', cursive",
        roboto: "'Roboto', sans-serif",
        robotoslab: "'Roboto Slab', serif",
        belle: "'La Belle Aurore', cursive",
        marcellus: "'Marcellus', serif",
        jost: "'Jost', sans-serif",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#47ccc8",
          secondary: "#2d3663",
          accent: "#dc4545",
          neutral: "#343434",
          "base-100": "#ffffff",
        },
      },
      "light",
      "synthwave",
    ],
  },
};

export default config;
