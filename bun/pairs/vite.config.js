import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/pairs/www/pairs', // Adjust this if deploying to a subdirectory
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },

});
