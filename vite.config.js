import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use '/cyberlearn-platform/' for GitHub Pages, '/' for Vercel and other hosts
const base = process.env.GITHUB_PAGES === 'true' ? '/cyberlearn-platform/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'syntax-highlighter': ['react-syntax-highlighter']
        }
      }
    }
  },
  ssr: {
    // Bundle these packages into the SSR output instead of leaving them
    // as external imports (fixes ESM resolution issues at prerender time).
    noExternal: ['react-syntax-highlighter'],
  },
});
