import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
//
// HOW TO DEPLOY TO DIFFERENT BASES:
//   Local dev / root deploy:  npm run build
//   GitHub Pages (/dristi-portfolio/): VITE_BASE_URL=/dristi-portfolio/ npm run build
//
// Images and assets always resolve correctly regardless of base,
// because all asset paths in portfolioData.ts use the asset() utility
// which reads import.meta.env.BASE_URL at runtime.
export default defineConfig({
  plugins: [react()],

  // Read base from env variable — defaults to '/' for local/root deploys
  base: process.env.VITE_BASE_URL ?? '/',

  server: {
    port: 3000,
    open: false,
  },

  build: {
    target: 'es2020',
    sourcemap: true,
  },
});
