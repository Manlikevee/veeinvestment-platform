# Maintenance and general health check

**Date:** 12 November 2026  
**Scope:** Fonts, assets, routes, responsive layout, accessibility basics, interactive controls and production build.

## 1. Issues found and fixed

### Critical — fonts were not loading at all

The browser was rendering **Times** instead of Manrope and Instrument Serif. The root cause was CSS variable scope:

- `next/font` exposes `--font-sans` and `--font-display` on the **body** class.
- The derived `--font-body` / `--font-serif` tokens were declared on `:root`.
- Those values became invalid at computed-value time and never inherited, so `font-family` fell back to Times.

**Fix:** moved the derived font tokens to `body` in `app/styles/base.css`, where the generated font variables exist.  
**Verified:** `document.fonts.check('16px Manrope')` and `document.fonts.check('16px "Instrument Serif"')` now return true; computed `body` and `h1` families are the intended fonts.

### Hero overlay and mobile spacing

- The desktop KYC floating card overlapped the allocation rows. Increased the visual height and moved the note below the dashboard card.
- The mobile “Your terms, explained” note wrapped awkwardly. Allowed it to wrap as a normal text block.
- The decorative floating card is hidden on small screens to avoid covering the dashboard.

### Help centre search was non-functional

The search field on `/help` was only visual. Replaced it with the client-side `HelpExplorer`, which filters topics and article titles live and shows an empty state.

### Accessibility labels

- Icon-only `DownloadStatement` buttons rendered without an accessible name when `label=""`. Added an automatic `aria-label`/`title` based on the document title.
- Internal customer note textarea and account-closure reason textarea now have explicit accessible labels.
- Breadcrumb separator in the portal header used a double-chevron icon; replaced with a single right chevron.
- Auth info alerts now use the correct info icon instead of a warning icon.

### Broken legacy links

Added safe redirects for old URLs that were still referenced by legacy components:

- `/portfolio` → `/dashboard/portfolio`
- `/profile` → `/dashboard/profile`
- `/profile/profile-update` → `/dashboard/profile`
- `/dashboard/profile/profile-update` → `/dashboard/profile`

### Branding and discoverability

- Replaced the default create-next-app favicon with a Vee-branded `.ico`, SVG and Apple touch icon.
- Added `app/sitemap.js` and `app/robots.js`.
- Added server-rendered metadata for all public pages.

### Admin navigation density

Reduced admin sidebar row height and group spacing so all sections fit at 1100px height. The nav remains scrollable on shorter screens.

### Remember me behaviour

Previously the session lived only in `sessionStorage`, so Remember me could not survive a new browser tab/window. The non-sensitive demonstration session now uses:

- `sessionStorage` by default;
- `localStorage` only when **Remember me** is selected (7-day expiry).

No passwords, tokens or document contents are stored. Production must use server-managed HTTP-only cookies instead.

### Allocation layout

The `allocation-amount` label was being auto-placed into an 8px grid column, causing clipping. Explicit grid placement now puts the percentage, bar and amount on defined rows.

## 2. Checks performed

- `npm run lint` — 0 errors / 0 warnings.
- `npm run build` — successful production build.
- Full route crawl for public, authentication, customer and admin sections — no console errors, page errors, failed requests or HTTP 4xx responses.
- Font validation with the browser document font set.
- Lazy image loading confirmed after scroll for editorial, insight and team imagery.
- `favicon.ico`, `icon.svg`, `apple-icon.png`, `sitemap.xml` and `robots.txt` all return 200.
- Accessible-name heuristics across routes: labelled buttons, links, images and form controls.
- Responsive checks at 1440×1100 and 390×844.
- Login, Remember me, new-tab persistence, 12-step onboarding, new investment, support ticket and theme switching tested.
- Content screenshots refreshed in `docs/screenshots`.

## 3. Current non-runtime gaps

These are deliberate frontend-demo boundaries, not visual defects:

1. **No backend** — decisions, payments, KYC, audit events and drafts are local demonstration state.
2. **Authentication is not production authentication** — browser storage is only a demo session; use secure HTTP-only cookies and server-side authorization.
3. **No live email/SMS/push** — notification builders are interfaces only.
4. **Document viewer is a metadata mock** — no actual PDF/image rendering from a backend.
5. **PDF/CSV exports are generated in the browser** — replace with server-generated, retained statements.
6. **CMS is an inventory/publish interface** — no rich-text section editor yet.
7. **No automated regression suite** — current validation is lint, build, route crawl and manual/browser flow testing.
8. **Legal and company content needs review** — all legal pages are marked draft.
9. **Legacy components remain for reference** — they are unused by the new UI and still contain old Material Symbols class names.

## 4. Recommended next development pass

1. Connect the Axios service layer to DRF endpoints and replace the local data reads.
2. Implement server-side sessions, refresh cookies, MFA and permission enforcement.
3. Add real document storage, signed URLs, malware scanning and preview rendering.
4. Integrate email/SMS/push adapters and complete admin template management.
5. Add Playwright coverage for authentication, onboarding, investment application, KYC review and reconciliation.
6. Run an independent WCAG 2.2 AA audit and a security review.
