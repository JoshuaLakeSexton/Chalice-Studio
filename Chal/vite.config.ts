import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public", // THIS is the critical line
  build: {
    outDir: "dist",
  },
});
