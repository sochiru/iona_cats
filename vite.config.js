import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'components', replacement: resolve(__dirname, 'src/components') },
      { find: 'consts', replacement: resolve(__dirname, 'src/consts') },
      { find: 'context', replacement: resolve(__dirname, 'src/context') },
      { find: 'hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: 'lib', replacement: resolve(__dirname, 'src/lib') },
      { find: 'pages', replacement: resolve(__dirname, 'src/pages') },
    ],
  },
});
