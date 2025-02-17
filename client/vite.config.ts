import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/monosynth/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
