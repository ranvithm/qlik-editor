import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*']
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'QlikScriptEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => `qlik-script-editor.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'monaco-editor',
        '@monaco-editor/react'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'monaco-editor': 'monaco',
          '@monaco-editor/react': 'MonacoEditor'
        },
        assetFileNames: 'style.css',
      },
    },
    sourcemap: false,
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  css: {
    postcss: './postcss.config.js',
  },
});