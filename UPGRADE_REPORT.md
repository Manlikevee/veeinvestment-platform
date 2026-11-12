# Technology upgrade report

**Status:** Complete  
**Date:** 12 November 2026  
**Strategy:** Upgrade the existing App Router application in place; preserve business domains and routes, then refactor incompatible patterns.

## 1. Before and after

| Package | Before | After | Notes |
|---|---:|---:|---|
| `next` | 15.1.0 | **16.4.6** | Latest stable release queried from npm at build time. No canary/experimental release. |
| `react` | ^19.0.0 | **19.3.1** | Compatible with Next 16 peer range `^19.0.0`. |
| `react-dom` | ^19.0.0 | **19.3.1** | Matches React. |
| `material-symbols` | ^0.27.2 | **Removed** | Replaced with `lucide-react` 0.572.0. |
| `eslint` | not declared | **9.39.5** | Flat-config-compatible; Next 16 peer requires ESLint >=9. |
| `eslint-config-next` | not declared | **16.4.6** | Matches Next version. |
| `axios` | not present | **1.21.1** | Central API client for DRF integration. |
| `recharts` | not present | **3.10.1** | Accessible responsive charts. |
| `date-fns` | not present | **4.4.0** | Date utility compatibility for future services. |
| `zod` | not present | **4.6.7** | Schema-validation foundation for API contracts. |
| `clsx` | not present | **2.1.1** | Small class-name composition utility. |
| `package-lock.json` | Next 15 lockfile | Regenerated | `npm install` resolved a single compatible tree. |

## 2. Why the latest stable versions

- `next@16.4.6` was the current stable npm release when the upgrade was performed.
- React 19.3.1 satisfies Next 16's peer dependency.
- ESLint 10 was available, but `eslint-config-next@16.4.6` declares support for ESLint `>=9`. ESLint 9.39.5 was selected as the latest compatible major rather than forcing an unsupported combination.
- No experimental flags, canary builds or React release candidates are used.
- Node engine requirement: **>=20.9.0**. The build was verified on Node 22.20.0.

## 3. Next.js 16 breaking changes handled

1. **Async route params and search params.** Product, insight, loan, customer, document, application and portfolio dynamic pages now `await params` / `await searchParams`.
2. **Turbopack is the default production builder.** The production build runs with Next's Turbopack pipeline.
3. **`next lint` removal.** Added `eslint.config.mjs` using the flat config and `eslint-config-next/core-web-vitals`; script is now `eslint .`.
4. **Async request APIs / server-client boundary.** Data-table column render functions are kept inside client components; server pages only pass serialisable props.
5. **Metadata and viewport exports.** Theme colour and responsive viewport are declared from the root layout; page metadata is server-only.
6. **Next Image requirements.** Local images are used; image formats are AVIF/WebP and sizes are supplied for responsive loading.
7. **New React hook lint rules.** Refactored non-hook `useDemo` name; documented and scoped the storage-hydration rule exception in ESLint. Modal effects were corrected to avoid dependency churn and focus-reset bugs.

## 4. Removed and replaced packages

| Removed | Replacement | Reason |
|---|---|---|
| `material-symbols` | `lucide-react` | Better tree-shaking, maintained React components and a consistent 24px stroke system. |
| create-next-app starter CSS and assets usage | Design-token stylesheet | The starter was not Vee Investment. Unused assets remain in `public/` as archive material. |

No package was downgraded to make the application compile. No unmaintained package was retained.

## 5. Configuration changes

- `next.config.mjs`: strict mode, powered-by header disabled, AVIF/WebP images, CSP for SVG placeholders.
- `eslint.config.mjs`: Next core-web-vitals flat config; build/cache directories ignored; a narrowly scoped rule exception for persisted theme/session hydration.
- `.env.example`: API base URL, data provider, demo mode and server-only Django values.
- `.gitignore`: local npm cache excluded; `.env.example` explicitly committed.
- `jsconfig.json`: `@/*` path alias retained for the existing JavaScript project.

## 6. Verification

| Check | Command | Result |
|---|---|---|
| Dependency install | `npm install` | 394 packages; compatible tree |
| Lint | `npm run lint` | Passed, 0 errors / 0 warnings |
| Production build | `npm run build` | Passed; 157 route outputs generated |
| Route crawl | Puppeteer against dev server | No console/page errors across public, customer and admin route sets |
| Theme test | Light/dark/system + reload | Applied across all shells; no runtime errors |
| Flow tests | Login, 12-step onboarding, new investment, support ticket | Completed with expected demo confirmations |
| Responsive checks | 1440px and 390px viewports | Public mobile header, stacking layouts and responsive tables verified |

## 7. Remaining compatibility limitations

- No live backend, so service adapters are present but the UI currently reads from the local demonstration repository.
- Authentication is a client-side demonstration; it does not provide production security. The backend must own sessions, refresh tokens, permissions, throttling and audit logging.
- Legal copy, product terms and company details require approval.
- Mock PDFs/CSVs are generated in the browser and are not regulated statements.
- Some long admin tables rely on horizontal scroll at narrow widths by design; row-level field priority is handled with `hideOnMobile`.
- Browser storage is used only for non-sensitive theme preference, session marker, remembered email and an onboarding draft. Passwords and document contents are never stored.
