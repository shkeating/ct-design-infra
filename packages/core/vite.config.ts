import { defineConfig } from "vite";
// This is a default import. Notice there are no { } curly braces.
import cem from "vite-plugin-cem";

export default defineConfig({
  plugins: [
    // We call the imported 'cem' variable as a function here
    cem({
      files: ["./src/components/**/*.ts"],
      lit: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "CtCore",
      fileName: (format) => `ct-core.${format === "es" ? "js" : "umd.cjs"}`,
    },
    rollupOptions: {
      external: ["lit", /^@ct-infra\/tokens/],
    },
  },
});
