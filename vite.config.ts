import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      components: '/src/components',
      assets: '/src/assets',
      types: '/src/types',
      hooks: '/src/hooks',
      pages: '/src/pages',
      store: '/src/store',
      routes: '/src/routes',
      utils: '/src/utils',
    },
  },
});

