# QA report

**Date:** 12 November 2026  
**Environment:** Node 22.20.0, macOS, Chrome headless 1440×1100 and 390×844, Next.js 16.4.6.

## 1. Static checks

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | **Passed** — 0 errors, 0 warnings |
| Production build | `npm run build` | **Passed** — 157 route outputs; static and SSG records generated |
| Dependency tree | `npm ls --depth=0` | Core stack compatible; no peer conflicts |
| Console errors | Puppeteer route crawl | **None** |
| Runtime page errors | Puppeteer route crawl | **None** |

## 2. Route coverage

Crawled at least one instance of every route family:

- **Public:** `/`, about, services, investments (+ detail), team, contact, FAQ, insights (+ detail), privacy, terms, risk, cookies, security, complaints, careers, help, how it works.
- **Authentication:** login, register, forgot, reset, verify email, verify OTP, two-factor, activation.
- **Customer:** overview, investments (+ detail + new), portfolio, transactions, loans (+ detail + new), documents, notifications, statements, support, profile, settings.
- **Admin:** overview, customers (+ detail), onboarding, documents (+ detail), products (+ detail), applications (+ detail), portfolio (+ customer), loans (+ detail), transactions, payments, staff, roles, reports, support, CMS, notifications, audit logs, settings.
- **Legacy:** `/userdashboard*`, `/investment*`, `/loan*`, `/auth/password-reset` return redirects to modern destinations.

All routes returned HTTP 200 or redirected as expected. The crawler excluded the intentional redirect to `/auth/login` from failure reporting.

## 3. Functional tests

| Flow | Test | Result |
|---|---|---|
| Login | Demo shortcut → secure form → role-appropriate redirect | Passed |
| Session guard | Unauthenticated `/dashboard` and `/admin` redirect to login | Passed |
| Role guard | Customer session cannot open `/admin`; administrator/compliance can | Passed |
| New investment | Product → eligibility → amount → terms → acknowledgement → pending-review confirmation | Passed |
| Onboarding | All 12 steps, document fields, consent, submission reference and pending-review screen | Passed |
| Support | Create ticket, validation, conversation modal, reply | Passed |
| Modal focus | Typing multiple characters into modal form does not lose focus | Passed after fixing modal effect dependencies |
| Theme | Light/dark/system selection, persistence and reload | Passed |
| Legacy routes | Redirects resolve to new pages | Passed |
| Data tables | Search, filters, sort, export, pagination and empty state | Exercised via pages and build |
| CSV/PDF downloads | Browser Blob download and mock PDF generation | Exercised; no live server files |

## 4. Responsive and visual checks

- 1440px public, auth, customer, admin and onboarding screens reviewed.
- 390px public homepage reviewed; mobile navigation and stacked hero verified.
- Portal tables hide lower-priority columns and retain horizontal scrolling where necessary.
- Sidebar collapses to off-canvas navigation below 1050px.
- Modals fit the viewport; mobile modal is bottom-aligned.
- Theme contrast checked across panels, forms, charts, tables, modals and navigation.
- Light, dark and system themes tested; no theme flash observed because the root boot script applies the stored theme before paint.

Captured evidence is in [`docs/screenshots`](docs/screenshots).

## 5. Accessibility checks performed

- Skip link.
- Landmark roles and heading hierarchy.
- Focus-visible styling.
- Form labels, hints, errors and required indicators.
- Keyboard-operable menus, tabs and accordions.
- Modal focus trap, Escape close, focus restoration and scroll lock.
- `aria-current`, `aria-expanded`, `aria-selected`, `aria-pressed` and switch roles.
- Toast region announced with `aria-live`.
- Reduced-motion CSS.
- Chart legend and textual summaries; charts are not the sole information source.

An independent WCAG 2.2 AA audit with assistive technology remains required before production.

## 6. Financial and security control checks

- Demo financial data is labelled “illustrative”/“demonstration”.
- Target returns are consistently described as non-guaranteed.
- No live payment, approval or verification is claimed.
- Bank details are masked in customer and admin ordinary views.
- Approval actions explicitly do not create transactions.
- App permissions are represented in the UI and labelled as needing backend enforcement.
- Audit log interface is read-only.
- No API secrets are rendered.
- Passwords and file contents are not persisted to storage.

## 7. Defects found and resolved during QA

1. **Server-to-client function props** in admin table pages caused prerender failures. Converted interactive table pages into client components.
2. **Modal focus reset** caused only the first character to be retained in modal forms because the focus effect depended on an unstable callback. Stabilised the callback with a ref and restricted the effect to `open`.
3. **Dark mode panels** using inverted brand tokens produced light-on-light contrast in some areas. Introduced fixed dark panel surfaces.
4. **Layout route conflict** between the legacy `/services` and the new marketing `/services`. Removed the legacy route and retained the new page.
5. **Legacy hooks lint** on `useDemo` naming. Renamed to a non-hook helper.

## 8. Post-implementation maintenance pass (12 November 2026)

- **Fonts fixed:** derived font tokens now live on `body`, where `next/font` exposes its variables; Manrope and Instrument Serif are confirmed loaded.
- **Help search fixed:** `/help` now filters topics and articles.
- **Accessibility fixes:** download controls and raw textareas have accessible names.
- **Branding/SEO:** branded favicon, Apple icon, sitemap and robots routes added.
- **Compatibility:** legacy `/portfolio` and `/profile` URLs now redirect to the portal.
- **Responsive fixes:** hero overlay, mobile note, allocation grid and admin sidebar density corrected.
- See [`MAINTENANCE_REPORT.md`](MAINTENANCE_REPORT.md) for details.

## 9. Remaining QA before production

- Backend integration and contract tests.
- Automated unit, integration and Playwright regression suite.
- Independent accessibility audit.
- Penetration test and threat model.
- Load/performance testing.
- Legal and compliance content review.
- Cross-browser coverage (Safari/Firefox/Edge) and real-device testing.
- Production CSP, monitoring, rate limiting and secrets review.
