
import { basename, resolve } from 'node:path';
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  existsSync,
} from 'node:fs';
import { defineConfig } from 'vite';

const ROOT = import.meta.dirname;

const htmlPages = Object.fromEntries(
  readdirSync(ROOT)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [
      basename(file, '.html'),
      resolve(ROOT, file),
    ])
);

export default defineConfig({
  plugins: [
    {
      name: 'copy-static-brand-assets',

      closeBundle() {
        const sourceAssets = resolve(ROOT, 'assets');
        const outputAssets = resolve(ROOT, 'dist/assets');

        mkdirSync(outputAssets, { recursive: true });

        // Copy all required logo files
        const brandAssets = [
          'extasit-logo.png',
          'logo2.png',
        ];

        brandAssets.forEach((file) => {
          const source = resolve(sourceAssets, file);
          const destination = resolve(outputAssets, file);

          if (existsSync(source)) {
            copyFileSync(source, destination);
            console.log(`Copied asset: ${file}`);
          } else {
            console.warn(`Missing asset: ${source}`);
          }
        });
      },
    },
  ],

  server: {
    host: '0.0.0.0',
    allowedHosts: ['terminal.local'],
  },

  build: {
    rollupOptions: {
      input: htmlPages,
    },
  },
});



// import { basename, resolve } from 'node:path';
// import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
// import { defineConfig } from 'vite';

// const htmlPages = Object.fromEntries(
//   readdirSync(import.meta.dirname)
//     .filter((file) => file.endsWith('.html'))
//     .map((file) => [basename(file, '.html'), resolve(import.meta.dirname, file)])
// );

// export default defineConfig({
//   plugins: [{
//     name: 'copy-static-brand-assets',
//     closeBundle() {
//       const outputAssets = resolve(import.meta.dirname, 'dist/assets');
//       mkdirSync(outputAssets, { recursive: true });
//       copyFileSync(
//         resolve(import.meta.dirname, 'assets/extasit-logo.png'),
//         resolve(outputAssets, 'extasit-logo.png')
//       );
//     }
//   }],
//   server: {
//     host: '0.0.0.0',
//     allowedHosts: ['terminal.local']
//   },
//   build: {
//     rollupOptions: {
//       input: htmlPages
//     }
//   }
// });
