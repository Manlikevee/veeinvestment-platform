# Implementation progress

**Updated:** 12 November 2026  
**Status:** Frontend implementation complete; backend integration pending.

## Phase status

| Phase | Scope | Status |
|---|---|---|
| A — Audit & modernisation | Legacy audit, Next 16, React 19, dependencies, compatibility | Complete |
| B — Foundation | Tokens, typography, components, layouts, theme, providers | Complete |
| C — Public website | Homepage, about, services, investments, team, contact, FAQ, insights, legal, careers, help, process | Complete |
| D — Auth & onboarding | 8 auth routes, 12-step onboarding, draft, document uploads, review, consent, submission | Complete |
| E — Customer portal | Overview, investments, application, portfolio, transactions, loans, documents, notifications, statements, support, profile, settings | Complete |
| F — Admin portal | Overview, customers, onboarding, documents/KYC, products, applications, portfolio, loans, transactions, payments, staff, roles, reports, support, CMS, notifications, audit, settings | Complete |
| G — API preparation | Axios client, service modules, mock adapter, env config, architecture and integration docs | Complete (service layer); pages use local demo repository by default |
| H — QA | Lint, production build, route crawl, responsive/dark checks, flow tests | Complete |

## Completed frontend work

- 157 pre-rendered route outputs including static dynamic-record pages.
- 38+ product pages, articles, customer/investment/loan/document/portfolio records available.
- 12-step onboarding with session draft, validation, file abstraction, review and consent record.
- Customer application wizard and loan application flow with explicit non-approval language.
- Document and KYC split-screen review, product configuration, application decisions and RBAC matrix.
- Full light/dark/system theme with no-flash boot script and persisted preference.
- Accessible modal, toast, tabs, accordion, table, field, file upload and chart primitives.
- Demo-only actions are labelled; no fake approvals, verification results, transactions or returns.
- Legacy routes retained as redirects.

## Remaining before production launch

1. Implement the Django REST Framework API and connect the service layer.
2. Replace demonstration authentication with secure server-side sessions, HTTP-only refresh cookies and MFA.
3. Move all onboarding drafts, documents and consent records to the backend.
4. Implement server-side RBAC enforcement, audit logging and approval workflows.
5. Integrate KYC/document storage, payment gateway and reconciliation evidence.
6. Replace legal, company, team, testimonial, product and performance content with approved data.
7. Add automated unit/end-to-end tests and CI.
8. Complete accessibility audit with assistive technology and independent penetration testing.
9. Add production observability, rate limiting, CSRF strategy and secret management.
10. Remove or replace demonstration photography and unused legacy assets.

## Known limitations

- Local demonstration authentication is intentionally not production authentication.
- Data mutations in the UI are in-memory or session-local; they do not persist to a backend.
- Mock PDFs are generated client-side.
- The `zod` dependency is available for future request-schema validation but is not yet wired into every form.
- Some legacy components remain for reference and are not part of the new runtime experience.
