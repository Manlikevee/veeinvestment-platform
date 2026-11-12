# Phase 1 — Existing project audit

**Project:** Vee Investment (`veeinvestment-master`)  
**Audit date:** 12 November 2026  
**Scope:** Every supplied page, component, form, utility, stylesheet, asset and configuration file.

## 1. Executive summary

The supplied application was a Next.js 15.1.0 / React 19 prototype using the App Router, JavaScript/JSX, CSS Modules, one large global stylesheet, Material Symbols and a small set of hand-built components. It contained useful customer, investment, loan, KYC and onboarding concepts, but much of the UI was static and several routes were incomplete or linked to pages that did not exist.

The project has been modernised rather than replaced. Existing business concepts and form domains were retained, the legacy routes were redirected to equivalent flows, and the old components remain in the repository as reference material. The new platform adds a complete public site, authentication interfaces, a 12-step onboarding journey, a customer portal and a 24-route administration portal.

## 2. What existed

### Routes found

| Route | State at audit | Finding |
|---|---|---|
| `/` | create-next-app starter | Not a Vee Investment landing page; contained Vercel/Next.js links and imagery. |
| `/auth/login` | Static preview | Form logged nothing; no validation, loading, session, error or redirect logic. |
| `/auth/register` | Static preview | Button said “Login”; fields not validated; social buttons had no action. |
| `/auth/password-reset` | Static preview | Reset button opened a success popup without a request. |
| `/investment` | Static dashboard-like page | 809 lines, largely a hard-coded list of external Nigerian company logos and placeholder cards. No catalogue or filters. |
| `/investment/investment-summary` | Static summary | Hard-coded fixed-deposit figures; “Confirm Booking” did nothing. |
| `/investment/investmentdetail` | Static marketing copy | Hard-coded terms repeated; back arrow was not a link; download button did nothing. |
| `/investment/new-investment` | Static form shell | Form state lived inside an isolated component; “Next” did nothing. |
| `/loan` | Static dashboard | Hard-coded customer “BAYO”, 23 active loans and a currency mix of `$` and `N`. |
| `/loan/loan-detail` | Static detail | Lorem-ipsum-like copy; duplicated interest fields; no actions. |
| `/loan/loan-summary` | Static summary | “I agree”/“I don’t agree” were not wired to anything. |
| `/loan/new-loan` | Static form shell | “Next” had no handler; unused imports and duplicate amount field. |
| `/userdashboard` | Static dashboard | A welcome popup auto-opened; profile link incorrectly pointed to `/profile/profile-update`, not `/userdashboard/profile/profile-update`. |
| `/userdashboard/profile` | Misnamed investment page | Displayed investment information rather than a customer profile. |
| `/userdashboard/profile/profile-update` | Partial multi-step form | Four steps existed but data was local to child components, no validation or submit. |
| `/services` | Static service tiles | Some tiles linked to `#`; wording referenced unrelated business-services content. |

### Components found

`Header`, `Inputcomponent`, `Selectcomponent`, `Investmentcard`, `Investments_list`, `Recenttransactions`, `Recenttransactioncard`, `Recenttransactiongrid`, `ServiceBox`, `SelfServiceBox`, `Summarydetail`, `Valuebox`, `Popup`, `Reusablepopup`, `Stepblock`, `Stockscards`, `Columndiv`, `Mylogocomponent` and nine form components.

**Assessment:** reusable in intent, but coupled to global class names and fixed copy. Form components held their own state and could not be submitted as a coherent application. Most had no validation, loading, error or success states. Several used `console.log` as the only submit action.

### Styling and assets

- 1,725-line global stylesheet with legacy naming, duplicated values and no design-token layer.
- CSS Modules used only for the create-next-app landing page.
- Material Symbols loaded from a package.
- 40+ public assets, mostly unrelated stock screenshots, bank logos and a PDF. None formed a coherent brand system.
- No favicon/brand mark system, no metadata beyond create-next-app defaults, no typography system and no dark mode.

### Configuration and dependencies

- `next@15.1.0`, `react@^19.0.0`, `react-dom@^19.0.0`, `material-symbols@^0.27.2`.
- No ESLint configuration file; `npm run lint` called `next lint`.
- No API layer, environment contract, data model, test suite, error boundary, loading UI, not-found page or documentation.
- No `NEXT_PUBLIC_API_BASE_URL` contract or data-provider abstraction.

## 3. What was broken or incomplete

1. **Landing page mismatch** — the root page was untouched create-next-app content.
2. **Dead navigation** — multiple links led to missing routes (`/portfolio`) or used `#`.
3. **Dead buttons** — “Confirm Booking”, “Next”, “I agree”, “Download” and social sign-in had no behaviour.
4. **No validation or submission lifecycle** — forms did not check fields, show errors, disable during submit or confirm outcomes.
5. **State fragmentation** — multi-step forms had no shared draft or summary.
6. **No authentication boundary** — customer and admin areas were not separated or protected in any way.
7. **No admin experience** — no operations, KYC, finance, RBAC, CMS or audit interface existed.
8. **Inconsistent currency and formatting** — `$`, `N` and hard-coded numbers were mixed.
9. **Accessibility gaps** — unlabelled icon-only buttons, placeholder links, no skip link, no focus management, poor contrast in places.
10. **No responsive strategy** — desktop-oriented fixed layouts; tables, forms and navigation not designed for mobile.
11. **No dark mode or theme tokens**.
12. **No error, empty, loading or success states**.
13. **No data-service layer** — content embedded directly in pages.
14. **No audit or disclosure discipline** — figures appeared real without labels.
15. **No tests or builds recorded** — no evidence that the existing routes built cleanly.

## 4. What was preserved

- Brand name **Vee Investment** and the green visual direction.
- Customer domain language: investments, loans, summaries, next of kin, bank information, statements, self-service.
- Existing route intents for investment and loan journeys, retained as redirects to the modern destinations.
- Form domains: account, personal information, next of kin, bank details, investment preferences and loan application.
- Legacy source components remain in `components/` and `app/` for reference. They are no longer imported by the new experience.

## 5. What was retained, redesigned or replaced

| Area | Action | Rationale |
|---|---|---|
| Green brand | Retained and expanded | Existing recognition; refined into a full token palette. |
| Next.js App Router | Retained | Correct foundation; upgraded to latest stable. |
| Global CSS | Replaced | Legacy sheet had no tokens, dark mode or scalable component layer. |
| Material Symbols | Replaced with `lucide-react` | Actively maintained, tree-shakeable, consistent stroke system. |
| Header and navigation | Replaced | New public, client and admin shells with role-aware navigation. |
| Legacy forms | Reimplemented as controlled, validated components | State, validation, errors, loading and submission needed to work together. |
| Static route content | Replaced with data repositories and page components | Avoids hard-coded UI data and supports API integration. |
| Investment and loan pages | Rebuilt and old paths redirected | Preserves discoverability while upgrading the flow. |
| Popup components | Replaced with accessible modal/toast primitives | Focus trapping, Escape, scroll lock and dismiss controls. |
| `page.module.css` starter | Removed | create-next-app artifact. |
| `material-symbols` package | Removed | No longer used. |

## 6. Legacy route mapping

| Legacy route | New destination |
|---|---|
| `/userdashboard` | `/dashboard` |
| `/userdashboard/profile` | `/dashboard/profile` |
| `/userdashboard/profile/profile-update` | `/dashboard/profile` (edit tabs / onboarding for full submission) |
| `/investment` | `/dashboard/investments` |
| `/investment/investment-summary` | `/dashboard/investments` |
| `/investment/investmentdetail` | `/investments` |
| `/investment/new-investment` | `/dashboard/investments/new` |
| `/loan` | `/dashboard/loans` |
| `/loan/loan-detail` | `/dashboard/loans` |
| `/loan/loan-summary` | `/dashboard/loans` |
| `/loan/new-loan` | `/dashboard/loans/new` |
| `/auth/password-reset` | `/auth/forgot-password` |
| `/services` (legacy app route) | Public `/services` |

## 7. Risks carried into the rebuild

- All product, performance, people and company information is sample content and must be replaced with approved information.
- Legal pages are drafts requiring qualified legal and compliance review.
- Demonstration authentication is not a production authentication implementation.
- PDF and CSV exports are front-end demonstration files, not regulated statements.
- Payment, KYC and investment decisions are simulated interfaces; no backend authorisation exists.
- Unsplash photographs are demonstration imagery and must be replaced or licensed appropriately before launch.
