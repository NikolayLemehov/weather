import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: { buildMode: true } })],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/common"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
