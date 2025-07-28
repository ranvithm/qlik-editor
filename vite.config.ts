import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "QlikEditor",
      formats: ["es", "cjs"],
      fileName: (format) => `qlik-editor.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "monaco-editor"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsx",
          "monaco-editor": "monaco",
        },
      },
    },
    outDir: "lib",
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
