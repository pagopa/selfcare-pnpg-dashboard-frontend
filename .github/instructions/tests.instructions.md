---
applyTo: "**/__tests__/**,src/**/*.test.{ts,tsx}"
---

- Vitest globals are enabled: use `describe`, `it`, `expect`, `vi` without importing them.
- Mock modules with `vi.mock('<path>')`; reusable mocks live in sibling `__mocks__` folders (`src/decorators/__mocks__`, `src/services/__mocks__`, `src/api/__mocks__`).
- Federated remotes (`selfcare*/...`) are stubbed to an empty component in `vitest.config.ts`; do not try to load real remotes in tests.
- `restoreMocks` and `clearMocks` are enabled, so re-create mock implementations inside each test or `beforeEach`.
- Run one file with `yarn vitest run <path>`.
