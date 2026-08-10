import { basename, resolve } from 'node:path';
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { defineConfig } from 'vite';

const htmlPages = Object.fromEntries(
  readdirSync(import.meta.dirname)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [basename(file, '.html'), resolve(import.meta.dirname, file)])
);

export default defineConfig({
  plugins: [{
    name: 'copy-static-brand-assets',
    closeBundle() {
      const outputAssets = resolve(import.meta.dirname, 'dist/assets');
      mkdirSync(outputAssets, { recursive: true });
      copyFileSync(
        resolve(import.meta.dirname, 'assets/extasit-logo.png'),
        resolve(outputAssets, 'extasit-logo.png')
      );
    }
  }],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['terminal.local']
  },
  build: {
    rollupOptions: {
      input: htmlPages
    }
  }
});
