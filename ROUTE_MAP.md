# Route map

## Public website — `/app/(marketing)`

| Route | Access | Experience |
|---|---|---|
| `/` | Public | Full landing page: hero, trust, products, process, services, mission, milestones, testimonials, insights, FAQ, newsletter, CTA |
| `/about` | Public | History, mission, vision, values, philosophy, milestones, leadership |
| `/services` | Public | Investment management, portfolio management, advisory, loan services, wealth planning, support |
| `/investments` | Public | Searchable/filterable product catalogue with risk, term and minimum |
| `/investments/[slug]` | Public | Full product detail, objectives, eligibility, fees, withdrawal, documents, FAQ, application CTA |
| `/team` | Public | Board, executive and management profiles |
| `/contact` | Public | Enquiry form, contact details, map placeholder and social links |
| `/faq` | Public | Category and text search across 9 FAQ categories |
| `/insights` | Public | Featured articles, categories, search, article cards |
| `/insights/[slug]` | Public | Article detail, takeaways, share controls, related reading |
| `/careers` | Public | Culture, benefits and open roles |
| `/help` | Public | Help categories and support routing |
| `/how-it-works` | Public | Seven-stage onboarding and investment journey |
| `/privacy-policy` | Public | Draft privacy policy |
| `/terms` | Public | Draft terms of use |
| `/risk-disclosure` | Public | Draft investment and borrowing risk disclosure |
| `/cookie-policy` | Public | Cookie table and choices |
| `/security` | Public | Security controls and responsible disclosure |
| `/complaints` | Public | Complaints process |

## Authentication — `/app/auth`

`/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/verify-email`, `/auth/verify-otp`, `/auth/two-factor`, `/auth/account-activation`.

Legacy `/auth/password-reset` redirects to `/auth/forgot-password`.

## Onboarding

| Route | Access | Notes |
|---|---|---|
| `/onboarding` | Demo/preview | 12 steps, session draft, validation, document upload abstraction, review, consent and pending-review confirmation |

## Customer portal — `/app/dashboard`

Guarded for the `customer` role.

| Route | Purpose |
|---|---|
| `/dashboard` | Portfolio summary, performance, allocation, recent transactions, tasks, maturities, verification |
| `/dashboard/investments` | Searchable/filterable investment table |
| `/dashboard/investments/[id]` | Investment detail, performance, payment history, documents, status and actions |
| `/dashboard/investments/new` | Five-step application: product, eligibility, amount, terms, confirmation |
| `/dashboard/portfolio` | Allocation, period-controlled performance, distribution, maturity calendar, statements |
| `/dashboard/transactions` | Filterable transactions and receipt modal |
| `/dashboard/loans` | Facility overview and table |
| `/dashboard/loans/[id]` | Outstanding balance, repayment schedule, documents and repayment support |
| `/dashboard/loans/new` | Loan application with indicative repayment and declaration |
| `/dashboard/documents` | Document cards, upload/replace modal, review metadata |
| `/dashboard/notifications` | All/unread notifications, mark read/all read |
| `/dashboard/statements` | Statement search, generation and PDF download |
| `/dashboard/support` | Ticket list, conversation, reply, create ticket with attachment |
| `/dashboard/profile` | Personal, address, bank, next of kin, employment and verification tabs |
| `/dashboard/settings` | Account, password/2FA, notifications, appearance, privacy, sessions and closure |

## Administration — `/app/admin`

Guarded for `admin` and `compliance`; finance actions additionally checked with `can()`.

| Route | Purpose |
|---|---|
| `/admin` | Operations overview, 8 KPIs, growth, activity, revenue, tasks and queues |
| `/admin/customers` | Directory with search, filters, export and pagination |
| `/admin/customers/[id]` | Full customer profile, masked bank, portfolio, transactions, documents, support, audit, internal notes and suspend/reactivate |
| `/admin/onboarding` | Queue summary, stage filters and review modal |
| `/admin/documents` | KYC document queue |
| `/admin/documents/[id]` | Split-screen document preview + metadata + approve/reject/replacement |
| `/admin/investment-products` | Product list, create/edit modal, availability toggle |
| `/admin/investment-products/[id]` | Full product configuration, fees, terms, eligibility, documents and publication |
| `/admin/investments` | Application pipeline |
| `/admin/investments/[id]` | Customer/product context, payment status, decision history and decisions |
| `/admin/portfolio` | AUM overview, allocation, customer portfolios and maturity exposure |
| `/admin/portfolio/[customerId]` | Customer portfolio, principal/dates, applications, payment integrity note |
| `/admin/loans` | Loan book |
| `/admin/loans/[id]` | Facility, amortisation schedule, documents, approval history, arrears |
| `/admin/transactions` | Reconcile selected, filters, export and exception view |
| `/admin/payments` | Payment records, verification, reconciliation note and gateway interface |
| `/admin/staff` | Staff directory and invitation modal |
| `/admin/roles` | Permission matrix by module and action |
| `/admin/reports` | Report date range, charts, CSV/PDF export interfaces |
| `/admin/support` | Ticket queue, assignment, replies and internal notes |
| `/admin/cms` | Content inventory, publish/unpublish, draft creation |
| `/admin/notifications` | Announcement builder and delivery history |
| `/admin/audit-logs` | Immutable audit log table and details |
| `/admin/settings` | Company, brand, currency, investment, loans, documents, onboarding, notifications, payments, security, maintenance |

## Legacy redirects

| Legacy | Destination |
|---|---|
| `/userdashboard` | `/dashboard` |
| `/userdashboard/profile` | `/dashboard/profile` |
| `/userdashboard/profile/profile-update` | `/dashboard/profile` |
| `/investment` | `/dashboard/investments` |
| `/investment/investment-summary` | `/dashboard/investments` |
| `/investment/investmentdetail` | `/investments` |
| `/investment/new-investment` | `/dashboard/investments/new` |
| `/loan` | `/dashboard/loans` |
| `/loan/loan-detail` | `/dashboard/loans` |
| `/loan/loan-summary` | `/dashboard/loans` |
| `/loan/new-loan` | `/dashboard/loans/new` |
| `/services` | Public `/services` (rebuilt) |
