import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
//add https://localhost/* to the permissions section of my manifest.json.
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "src"),
  /*resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },*/
  /*build: {
    outDir: "../dist",
  },*/
  server: {
    port: 8080,
    hot: true,
  },
});

