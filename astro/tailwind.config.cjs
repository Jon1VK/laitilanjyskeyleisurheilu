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
    "object-[50%_10%]",
    "object-[50%_20%]",
    "object-[50%_30%]",
    "object-[50%_40%]",
    "object-[50%_50%]",
    "object-[50%_60%]",
    "object-[50%_70%]",
    "object-[50%_80%]",
    "object-[50%_90%]",
    "object-[50%_100%]",
  ],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
