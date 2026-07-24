import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Absolute base matching the GitHub repo name. This must match your
  // repo exactly: https://<username>.github.io/<repo-name>/
  // If you ever rename the repo, update this to match.
  base: "/",
});
