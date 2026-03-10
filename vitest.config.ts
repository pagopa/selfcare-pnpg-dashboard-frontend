import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

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
  plugins: [react(), svgr(), moduleFederationStubPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    pool: 'forks',
    restoreMocks: true,
    clearMocks: true,
    isolate: false,
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', 'e2e/**', '**/__mf__temp/**'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/__mocks__/**',
        'src/api/**',
        'src/services/**',
        'src/microcomponents/**',
        'src/locale/**',
        'src/index.js',
        'src/reportWebVitals.ts',
        'src/api/generated/**',
        'e2e/**',
      ],
    },
  },
});
