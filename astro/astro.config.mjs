import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [solidJs(), tailwind(), icon()],
  prefetch: true,
  vite: {
    ssr: {
      external: ["svgo"],
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
