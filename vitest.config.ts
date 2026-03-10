// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Stubs ALL module federation remotes — no federation() plugin loaded at all
function moduleFederationStubPlugin() {
  return {
    name: 'vite-plugin-mf-stub',
    enforce: 'pre' as const,
    resolveId(id: string): string | undefined {
      if (id.startsWith('\0virtual:mf-stub:')) return id;
      if (/^selfcare[A-Za-z]+\//.test(id)) {
        return '\0virtual:mf-stub:' + id;
      }
      return undefined;
    },
    load(id: string): string | undefined {
      if (id.startsWith('\0virtual:mf-stub:')) {
        return `
          import React from 'react';
          const Stub = () => null;
          export default Stub;
        `;
      }
      return undefined;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    moduleFederationStubPlugin(),
    // NOTE: NO federation() plugin, NO tsconfigPaths that might pull vite.config.ts
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    pool: 'forks',
    restoreMocks: true,
    clearMocks: true,
    isolate: false,
    testTimeout: 15000,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'coverage/*',
      'e2e/**',
      '**/*.spec.ts',
      '**/__mf__temp/**',
    ],
    coverage: {
      provider: 'v8',
      exclude: ['src/index.js', 'src/reportWebVitals.ts', 'src/api/generated/**', 'e2e/**'],
    },
  },
});
