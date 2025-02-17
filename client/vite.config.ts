import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/monosynth/',
  build: {
    outDir: 'dist/public',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
});
