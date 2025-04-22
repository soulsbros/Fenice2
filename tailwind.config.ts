import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#f6f6f6",
        "main-bg-dark": "#212121",
        "text-white": "#ececec",
        "fenice-red": "#dc2626",
        enemy: "rgb(255, 73, 73)",
        ally: "rgb(101 163 13)",
        player: "rgb(0, 168, 255)",
        unknown: "rgb(255, 203, 0)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
