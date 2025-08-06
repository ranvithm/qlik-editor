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
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/**/*.stories.*'],
      rollupTypes: true,
      bundledPackages: ['class-variance-authority', 'clsx', 'tailwind-merge']
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'QlikScriptEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'monaco-editor',
        '@monaco-editor/react',
        // Radix UI should be external for tree-shaking
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-progress', 
        '@radix-ui/react-separator',
        '@radix-ui/react-slot',
        'sonner'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'monaco-editor': 'monaco',
          '@monaco-editor/react': 'MonacoEditor',
          '@radix-ui/react-dropdown-menu': 'RadixDropdownMenu',
          '@radix-ui/react-progress': 'RadixProgress',
          '@radix-ui/react-separator': 'RadixSeparator',
          '@radix-ui/react-slot': 'RadixSlot',
          'sonner': 'Sonner'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name;
        },
        // Preserve module structure for better tree-shaking
        preserveModules: false,
        // Ensure CSS is extracted
        manualChunks: undefined,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: false,
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  // Optimize for library usage
  define: {
    'process.env.NODE_ENV': '"production"'
  },
});