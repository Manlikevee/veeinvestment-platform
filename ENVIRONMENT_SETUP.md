# Environment setup

## Prerequisites

- Node.js **20.9+** (verified with 22.20.0)
- npm 11+ (pnpm/yarn also work)
- Optional: a Django REST Framework backend at `NEXT_PUBLIC_API_BASE_URL`

## Install and run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Turbopack development server |
| `npm run build` | Production build and route generation |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint 9 flat config |

## Environment variables

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_DATA_PROVIDER=mock
NEXT_PUBLIC_DEMO_MODE=true

# Server-only — never prefix with NEXT_PUBLIC_
DJANGO_API_URL=http://localhost:8000/api/v1
DJANGO_API_TOKEN=
```

- Only `NEXT_PUBLIC_*` values are exposed to browsers.
- The demonstration runs with no backend and no required env file.
- Payment keys, Django tokens and other secrets must never be placed in `NEXT_PUBLIC_*` variables.

## Demonstration accounts

All accounts are local-only and no password is stored.

| Role | Email | Password |
|---|---|---|
| Customer | `bayo.adeyemi@demo.veeinvestment.com` | `Demo2026!` |
| Administrator | `admin@demo.veeinvestment.com` | `Admin2026!` |
| Compliance officer | `compliance@demo.veeinvestment.com` | `Compliance2026!` |

Use the account shortcuts on `/auth/login` to fill credentials.

## Recommended QA sequence

1. Visit `/` and toggle light/dark/system using the header control.
2. Sign in as the customer and review every dashboard route.
3. Run `/dashboard/investments/new` end-to-end (application remains pending; no funds move).
4. Complete or navigate through `/onboarding`; test save/resume and consent.
5. Sign in as Administrator and review `/admin`, customers, KYC, products, applications, reports and audit logs.
6. Sign in as Compliance Officer and confirm finance/staff actions are restricted.
7. Check mobile widths at 390px, 768px and 1024px.

## Clearing demo state

- Theme: clear `vee-theme` from localStorage.
- Session: sign out or clear the site's browser storage.
- Onboarding draft: **Reset draft** in the onboarding screen or clear `vee-onboarding-draft` from session storage.

## Troubleshooting

- **Fonts fail to download at build time:** `next/font/google` requires network access during build. Use a local font file if the build environment is offline.
- **Images are not displayed in a full-page screenshot:** Next Image lazy-loads below-the-fold images; scroll before capture.
- **Session ends unexpectedly:** the demo session lasts 8 hours. Without **Remember me**, the session is per-tab (`sessionStorage`); with it, a non-sensitive session marker is kept in `localStorage` for 7 days. Production authentication must use server-managed HTTP-only cookies instead.
- **Backend unreachable:** the UI works independently in mock mode. Do not set the API URL until the service layer is wired to pages.

## Production notes

- Serve over HTTPS.
- Replace demonstration authentication and client-side guards with server-side authorization.
- Set a Content Security Policy appropriate to the deployed asset origins.
- Use a managed secret store for API/payment credentials.
- Complete legal, compliance, security and accessibility review before launch.
