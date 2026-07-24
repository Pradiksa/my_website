import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base so the built site works from a GitHub Pages
  // project URL like username.github.io/repo-name/
  base: "./",
});
