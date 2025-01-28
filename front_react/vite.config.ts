import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  //   css: {
  //   modules: {
  //     generateScopedName: "[name]__[local]___[hash:base64:5]",
  //   },
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lodash'],
        },
      },
    },
  },
});
