import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        // Убрали additionalData, так как index.scss - это reset-стили
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  }
});