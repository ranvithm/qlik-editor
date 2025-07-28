import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      exclude: ["src/dev.tsx", "**/*.test.tsx", "**/*.stories.tsx"]
    })
  ],
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
      fileName: (format) => `qlik-editor.${format}.js`
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "monaco-editor"
      ],
      output: {
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsx",
          "monaco-editor": "monaco"
        }
      }
    },
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true
  }
});
