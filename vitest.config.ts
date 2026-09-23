import path from 'node:path';
import { defineConfig } from 'vitest/config';

// Mirrors tsconfig.json's `baseUrl: "src"` so tests can resolve the same
// non-relative imports (e.g. "types/config/config.js") used by the source.
export default defineConfig({
  resolve: {
    alias: [
      { find: /^(assets|services|types|utils|view)\//, replacement: path.resolve(__dirname, 'src') + '/$1/' },
    ],
  },
  test: {
    environment: 'jsdom',
  },
});
