# Copilot Instructions

React 18 + TypeScript + Vite container ("host") app for the SelfCare dashboard of PNPG (non-public-administration companies). It is served under the base path `/dashboard` and loads the users and groups micro-frontends at runtime via Module Federation. It is a sibling of `selfcare-dashboard-frontend`, with its own copies of the shared types and its own PNPG backend API.

## Commands

Use Yarn (Node version in `.node-version`).

```
yarn install
yarn generate          # required before first build/start/test: generates src/api/generated/* from openApi/dashboard-pnpg-api-docs.json
yarn start             # vite dev server on :3000
yarn build             # tsc && vite build (prebuild runs generate)
yarn lint              # eslint (use yarn lint-autofix to fix)
yarn typecheck         # tsc --noEmit
yarn prettify
yarn test              # vitest run (all tests)
yarn test:coverage
```

Run a single test file or test name:

```
yarn vitest run src/pages/dashboard/__tests__/Dashboard.test.tsx
yarn vitest run -t "partial test name"
```

E2E (Playwright) lives in `e2e/` with its own `package.json`; it is excluded from vitest. Run with `cd e2e && yarn playwright test`.

CI (`.github/workflows/code_review.yaml`) runs build, lint, Danger and `test:coverage`.

## Architecture

- **Module Federation host** (`vite.config.ts`): remotes `selfcareUsers` and `selfcareGroups` (plus a `selfcareAdmin` entry in the config) are resolved from `MICROFRONTEND_URL_USERS|GROUPS|ADMIN` env vars. Shared singletons (react, mui, redux, router, i18next, `@pagopa/selfcare-common-frontend`, `@pagopa/mui-italia`) are declared in the `shared` block; adding a shared dependency requires registering it there.
- `src/microcomponents/*` wraps each remote (`RemoteRoutingUsers`, `RemoteRoutingProductUsers`, `RemoteRoutingGroups`) and passes shared data/callbacks as props. Remote prop types are declared in the `selfcare*.d.ts` files next to the wrappers and derive from `dashboardMicrocomponentsUtils.ts`. The shared model types (`Party`, `Product`, `ProductRole`) are copied (not imported) in each repo, so changes to them or to the remote props must be mirrored in `selfcare-dashboard-users-microfrontend`, `selfcare-dashboard-groups-microfrontend` and `selfcare-dashboard-frontend`.
- **Routing** (`src/routes.tsx`): react-router v5 (`Redirect`, `useParams`, not v6). Routes are a `RouteConfig` map with flags `withProductRolesMap`, `withSelectedProduct`, `withSelectedProductRoles`; these select the HOCs in `src/decorators/` (`withParties`, `withSelectedParty`, ...) that load data into redux before rendering. Paths are built from `BASE_ROUTE` (`ENV.PUBLIC_URL`).
- **Data flow**: page/hook → `src/services/*` → `src/api/DashboardApi.ts` (wraps the generated `b4f-dashboard-pnpg` client, adds bearer token and error handling) → redux slice `src/redux/slices/partiesSlice.ts`.
- **Generated API code**: `src/api/generated/` is gitignored and produced by `yarn generate` from `openApi/dashboard-pnpg-api-docs.json` (OpenAPI 3 → Swagger 2 → `gen-api-models`, with pre/post fix scripts in `openApi/scripts/`). To pick up API changes, update the spec JSON and re-run `yarn generate`; never edit generated files.
- **Mocking**: `src/api/__mocks__/DashboardApi.ts` and `src/services/__mocks__` back the tests.
- **Env**: runtime config goes through `src/utils/env.ts` from `VITE_*` variables (only `VITE_`-prefixed vars are exposed via `process.env`).
- **i18n**: translations are in `src/locale/{it,en,fr,sl,de}.ts` and registered in `src/locale/index.ts` via `configureI18n`. Add new keys to every language file.
- Shared UI, utilities, redux helpers and i18n setup come from `@pagopa/selfcare-common-frontend` and `@pagopa/mui-italia`; prefer them over reimplementing.

## Testing conventions

- Vitest + jsdom + Testing Library, globals enabled, setup in `src/setupTests.ts`.
- `vitest.config.ts` replaces every `selfcare*/...` federated import with an empty stub via the `moduleFederationStubPlugin`; remote modules are never loaded in tests. `restoreMocks`/`clearMocks` are on and tests only match `src/**/__tests__/**/*.test.{ts,tsx}`.
- Tests live in `__tests__` folders next to the code.

## Conventions

- Prettier (`.prettierrc`) and ESLint (`.eslintrc.js`, includes `sonarjs` and `functional` plugins) are enforced in CI; run `yarn lint` and `yarn typecheck` before finishing.
- PRs use `.github/PULL_REQUEST_TEMPLATE.md`.
