import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pathName = require
  .resolve("@prisma/client")
  .replace("@prisma/client/index.js", "");

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [solidJs(), tailwind(), prefetch()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
    resolve: {
      alias: {
        ".prisma/client/index-browser": `${pathName}.prisma/client/index-browser.js`,
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "entry.[hash].js",
        },
      },
    },
  },
  server: {
    host: true,
  },
});
