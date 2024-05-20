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
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
