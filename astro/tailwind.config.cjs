/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["graduate", "cursive"],
      },
    },
  },
  safelist: [
    "object-[50%_0%]",
    "object-[50%_25%]",
    "object-[50%_50%]",
    "object-[50%_75%]",
    "object-[50%_100%]",
  ],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
