# Frontend architecture

## 1. Overview

Vee Investment is a JavaScript Next.js 16 App Router application with three experiences sharing one design system:

1. **Public website** — route group `app/(marketing)` with a public header/footer.
2. **Customer portal** — `app/dashboard` with a client-side access guard and authenticated shell.
3. **Administration portal** — `app/admin` with a separate dark operations shell and role-gated access.

Authentication, onboarding and legal/utility routes have their own layouts.

## 2. Source structure

```
app/
  (marketing)/           Public pages, legal pages, insights/product details
  admin/                 Administration pages and record detail routes
  auth/                  Authentication shell and eight auth screens
  dashboard/             Customer portal pages and record detail routes
  onboarding/            12-step onboarding application
  styles/                Token, base, component, marketing, auth, portal and onboarding CSS
  layout.js              Fonts, metadata, no-flash theme boot, providers
  globals.css            CSS layer imports
components/
  layout/                Public header/footer, app shell, auth shell, session guard, search
  marketing/             Page hero, product card, catalogue, FAQ, insights, forms
  ui/                    Buttons, fields, tables, modals, tabs, toasts, badges, icons, charts helpers
  charts/                Recharts client primitives
  admin/                 Customer and document actions
  forms/                 OTP input, file upload, auth shared messages
features/
  auth/ onboarding/ investments/ loans/ portfolios/ transactions/ documents/
  notifications/ statements/ support/ profile/ settings/ admin/
providers/               Theme, Auth, Toast and combined AppProviders
lib/
  data/                  Typed-in-shape demonstration repositories and content
  services/              API client + domain service adapters + mock adapter
  utils/                 Formatting, validation, status, downloads
  constants/             Customer and admin navigation
  config/                Site/runtime configuration
  services/api/          Axios instance, interceptors, normalised errors
hooks/                   Scroll lock, media query
```

## 3. Rendering strategy

- Public marketing pages are server components where possible. Interactive catalogues, filters, accordions, forms and charts are client components.
- Customer and admin shells are client components because they use pathname, session, menus and responsive navigation.
- Table-heavy admin routes are client components because column renderers cannot cross the server/client boundary as functions.
- Dynamic record routes use `generateStaticParams` where the demonstration data is known. `/dashboard/investments/new` is dynamic because it reads search parameters.
- Every data display is demonstration data and labelled accordingly.

## 4. Theme system

- CSS design tokens live in `app/styles/tokens.css`; dark mode is the `[data-theme="dark"]` token set.
- The root layout injects a tiny pre-hydration script to set `data-theme` before paint, avoiding theme flash.
- `ThemeProvider` resolves `light`, `dark` or `system`, persists the choice under `vee-theme`, listens for OS changes and exposes `toggleTheme`.
- Theme consumers are limited to the provider and toggle/controls, avoiding application-wide re-renders.
- Charts use CSS variables for grid, stroke and semantic colours.

## 5. Authentication and access

- `AuthProvider` stores a non-sensitive demonstration session with an expiry. It uses `sessionStorage` by default and `localStorage` only when Remember me is selected. It never stores a password or a real access token.
- `SessionGuard` redirects unauthenticated users to `/auth/login?next=…`, shows a loading state while restoring, and blocks role mismatches.
- The admin shell allows `admin` and `compliance` roles; the customer shell allows `customer`.
- `useAuth().can(permission)` is used for demonstration permission UI (for example suspending a customer or approving an application).
- **Frontend permissions are not authorization.** Every permission must be enforced by the future backend.

## 6. Data and services

- All demo content lives in `lib/data/{site,customer,admin,legal,content}.js`, not inside components.
- `lib/services/*.service.js` describes the intended DRF resources and methods.
- `lib/services/api/client.js` provides base URL, timeouts, credentials, in-memory bearer token, normalised errors, cancellation support and pagination-friendly response parsing.
- `lib/services/mock/index.js` is an async mock adapter with the same general method shapes.
- `NEXT_PUBLIC_DATA_PROVIDER` is reserved for a future repository factory. In this build the portal pages read the local repository synchronously to keep the demonstration fully offline; wire the async service/hook layer when the API is available.
- No sensitive financial data or API secrets are stored client-side.

## 7. Forms and documents

- Shared fields support labels, hints, errors, required state, prefixes, password visibility and accessible help/error association.
- Multi-step forms use a single state object and step-level validation.
- `FileUpload` validates PDF/JPG/PNG and 10 MB, exposes progress and replacement/removal, and never performs a real upload. The future adapter should switch to multipart requests using `documentsService.upload`.
- Onboarding drafts are saved to `sessionStorage`; passwords and file contents are explicitly stripped.

## 8. Tables, charts and interactions

- `DataTable` supports search, multi-filter, sorting, pagination, page-size selection, row selection, CSV export, responsive column hiding, empty states and loading skeletons.
- Chart primitives use `ResponsiveContainer`, accessible labels and a themed tooltip.
- Modals trap focus, close on Escape, lock scroll and restore focus.
- Toast notifications are announced with `aria-live`.
- Demo-only actions always explain that no backend state changed.

## 9. Quality and accessibility

- Semantic landmarks, skip link, visible focus rings, labelled controls, keyboard-operable menus, `aria-current`, `aria-expanded`, `aria-selected` and `role="switch"` where appropriate.
- Reduced-motion support, responsive breakpoints at 1180/1050/960/800/600/540px.
- `npm run lint` uses ESLint 9 flat config with Next core-web-vitals.
- `npm run build` uses Turbopack and pre-renders 157 route outputs.

## 10. Extension points

1. Replace `lib/services` implementations with DRF-backed adapters.
2. Add a `DataProvider`/repository factory to choose mock vs remote using `NEXT_PUBLIC_DATA_PROVIDER`.
3. Add React Query/SWR only if the API requires caching; the existing async services are already cancellable and centralised.
4. Move authentication to server-managed HTTP-only cookies and server-enforced route protection.
5. Add schema validation (`zod`) at every service boundary and form submission.
6. Add Playwright coverage for all critical routes and form flows.
