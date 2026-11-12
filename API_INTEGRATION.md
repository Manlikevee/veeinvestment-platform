# API integration contract

**Target:** Django REST Framework (DRF)  
**Base URL:** `NEXT_PUBLIC_API_BASE_URL` (example `http://localhost:8000/api/v1`)  
**Transport:** HTTPS, JSON, bearer access token, HTTP-only refresh cookie.

## 1. Client

`lib/services/api/client.js` uses Axios with:

- 15-second timeout and `withCredentials: true`.
- In-memory access token only. Refresh tokens must be HTTP-only cookies.
- Request `Authorization: Bearer …` when a token is present.
- Request ID propagation for support.
- Normalised `ApiError` with `status`, `code`, `details`, `requestId`.
- Support for cancellation via `AbortController` signals.
- Response envelope parsing: `{success, data, meta}` is unwrapped while preserving pagination meta.

## 2. Standard envelopes

```json
{
  "success": true,
  "data": { "id": "CUS-1042" },
  "meta": { "request_id": "req_01J..." }
}
```

```json
{
  "success": false,
  "message": "One or more fields are invalid.",
  "code": "validation_error",
  "errors": {
    "email": ["Enter a valid email address."]
  },
  "request_id": "req_01J..."
}
```

HTTP status usage: `400` validation, `401` unauthenticated, `403` permission denied, `404` not found, `409` state conflict, `422` business-rule failure, `429` rate limited, `500` server error.

## 3. Pagination, filtering and sorting

```
GET /customers/?page=2&page_size=25&search=bayo&status=active&ordering=-created_at
```

```json
{
  "count": 1248,
  "next": "https://api.example.com/api/v1/customers/?page=3",
  "previous": null,
  "results": []
}
```

The frontend supports `page`, `page_size`, `search`, resource-specific filters and `ordering`.

## 4. Authentication

| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | `/auth/register/` | name, email, phone, password | user + verification status |
| POST | `/auth/login/` | email, password, remember | access token + user (refresh cookie set) |
| POST | `/auth/logout/` | — | 204 |
| POST | `/auth/password-reset/request/` | email | 202 generic response |
| POST | `/auth/password-reset/confirm/` | token, new_password | 200 |
| POST | `/auth/email/verify/` | email, code | 200 verification record |
| POST | `/auth/email/resend/` | email | 202 |
| POST | `/auth/otp/verify/` | phone, code | 200 |
| POST | `/auth/2fa/verify/` | code or backup_code | session |
| GET | `/auth/me/` | — | current user + permissions |

```json
POST /auth/login/
{ "email": "jane@example.com", "password": "••••••••", "remember": true }
```

```json
{
  "access": "eyJ...",
  "user": {
    "id": "CUS-1042",
    "name": "Bayo Adeyemi",
    "email": "bayo@example.com",
    "role": "customer",
    "permissions": ["dashboard.view", "investments.view"]
  }
}
```

## 5. Customer profile

`GET /customers/me/` and `PATCH /customers/me/`.

```json
{
  "id": "CUS-1042",
  "reference": "VEE-CUS-1042",
  "first_name": "Bayo",
  "last_name": "Adeyemi",
  "email": "bayo@example.com",
  "phone": "+2348035550184",
  "kyc_status": "verified",
  "account_status": "active",
  "risk_profile": "balanced",
  "preferred_contact": "email",
  "bank": {
    "bank_name": "Guaranty Trust Bank",
    "account_name": "Bayo Adeyemi",
    "account_number_last4": "4821",
    "verified": true
  }
}
```

Masked account numbers only in ordinary responses. A bank change requires a dedicated endpoint, verification evidence and audit logging.

## 6. Onboarding

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/onboarding/application/` | current draft |
| PATCH | `/onboarding/application/` | save a section |
| POST | `/onboarding/application/submit/` | submit for review |
| GET | `/admin/onboarding/` | review queue |
| POST | `/admin/onboarding/{id}/review/` | record a decision |

Save request:

```json
{
  "section": "identity",
  "data": {
    "document_type": "passport",
    "document_number": "A1234567",
    "issuing_country": "NG",
    "expiry_date": "2029-04-12",
    "document_id": "DOC-7401"
  }
}
```

Submission response must never return `verified` or `approved` merely because the client submitted:

```json
{
  "reference": "VEE-ONB-2026-1234",
  "status": "pending_review",
  "submitted_at": "2026-11-12T10:00:00Z",
  "next_steps": ["application_review", "document_verification"]
}
```

## 7. Document upload and KYC

`POST /documents/` must use `multipart/form-data`.

```
file: <binary>
category: identity
document_type: passport
consent_version: 2026.1
```

```json
{
  "id": "DOC-7401",
  "customer_id": "CUS-1119",
  "name": "International passport",
  "category": "identity",
  "status": "under_review",
  "uploaded_at": "2026-11-12T10:00:00Z",
  "expires_at": "2029-04-12",
  "reviewer": null
}
```

Review actions: `POST /admin/documents/{id}/approve/`, `/reject/`, `/request-replacement/` with `{ "note": "…" }`. Each requires `kyc.approve` or equivalent and writes an immutable audit event.

## 8. Investment products

`GET /investment-products/`, `GET /investment-products/{slug}/`, `POST /investment-products/`, `PATCH /investment-products/{id}/`, `POST /investment-products/{id}/archive/`.

```json
{
  "id": "PRD-001",
  "slug": "vee-prime-fixed-income",
  "name": "VEE Prime Fixed Income",
  "category": "fixed_income",
  "status": "open",
  "minimum_investment": "500000.00",
  "maximum_investment": "50000000.00",
  "duration_months": 12,
  "target_return": "14.25",
  "target_return_is_guaranteed": false,
  "risk_classification": "moderate",
  "fees": [{ "label": "Management fee", "value": "1.00% per annum" }],
  "eligibility": ["Completed KYC", "Minimum age 18"],
  "documents": [{ "id": "DOC-TS-001", "name": "Term sheet" }],
  "visible": true,
  "applications_open": true,
  "version": 3,
  "updated_at": "2026-11-04T09:00:00Z"
}
```

All financial values should be serialised as decimal strings, not floats.

## 9. Investment applications

`POST /investments/applications/`, `GET /investments/`, `GET /investments/{id}/`, `GET/POST /admin/investment-applications/{id}/decision/`.

```json
{
  "product_id": "PRD-001",
  "amount": "1000000.00",
  "acknowledged_risk": true,
  "terms_version": "2026.1"
}
```

```json
{
  "id": "APP-6082",
  "status": "pending_review",
  "stage": "suitability_review",
  "amount": "1000000.00",
  "payment_status": "not_required_yet",
  "submitted_at": "2026-11-02T11:42:00Z"
}
```

Decision payload: `{ "decision": "approve|reject|request_information", "note": "…" }`. **Approval must not create a transaction or activate an investment.** A separate funding/reconciliation workflow does that.

## 10. Portfolios and transactions

`GET /portfolio/` returns summary, allocation, history. `GET /transactions/` supports `type`, `status`, `from`, `to`.

```json
{
  "id": "TXN-98218",
  "reference": "VEE-TXN-98218",
  "type": "return",
  "description": "Green Infrastructure distribution",
  "amount": "92000.00",
  "currency": "NGN",
  "status": "completed",
  "method": "bank_transfer",
  "date": "2026-11-01",
  "related_investment_id": "INV-24041"
}
```

Reconciliation: `POST /admin/transactions/{id}/reconcile/` with `{ "note", "evidence_reference" }`. Never expose an endpoint that allows arbitrary balance edits.

## 11. Loans

`GET /loans/`, `POST /loans/applications/`, `GET /loans/{id}/`, `GET /loans/{id}/repayments/`, `POST /admin/loans/{id}/decision/`.

```json
{
  "id": "LN-8841",
  "amount": "4500000.00",
  "outstanding": "2150000.00",
  "interest_rate": "18.50",
  "term_months": 18,
  "status": "active",
  "next_payment": { "date": "2026-11-28", "amount": "412500.00" }
}
```

Loan approval requires affordability evidence and must not disburse funds automatically.

## 12. Notifications and support

Notifications: `GET /notifications/`, `POST /notifications/{id}/read/`, `GET/PATCH /notifications/preferences/`.
Announcements: `POST /admin/announcements/` with audience and channels.

Support: `GET/POST /support/tickets/`, `POST /support/tickets/{id}/messages/`, attachments via multipart. Admin list and reply use `/admin/support/tickets/`.

```json
{
  "id": "TKT-4482",
  "reference": "VEE-SUP-4482",
  "subject": "Statement download interrupted",
  "category": "statements",
  "priority": "high",
  "status": "open",
  "messages": [
    { "id": "MSG-1", "from": "customer", "body": "…", "created_at": "2026-11-10T09:24:00Z" }
  ]
}
```

## 13. Staff, roles and permissions

`GET/POST /admin/staff/`, `POST /admin/staff/invite/`, `PATCH /admin/staff/{id}/`, `GET /admin/roles/`, `PATCH /admin/roles/{id}/`.

```json
{
  "id": "ROLE-03",
  "name": "Compliance Officer",
  "permissions": ["customers.view", "kyc.view", "kyc.review", "kyc.approve", "audit.view"],
  "members": 2
}
```

The server must derive permissions from the authenticated staff user on every request. The UI's `can()` checks are informational only.

## 14. CMS and reports

CMS: `GET/POST /admin/cms/pages/`, `PATCH /admin/cms/pages/{id}/`, `POST /.../publish/`, `/unpublish/`.
Reports: `GET /admin/reports/summary/`, `GET /admin/reports/{type}/export/?format=csv|pdf&from=…&to=…`. Exports must be generated server-side and access-logged.

## 15. Integration checklist

1. Implement DRF viewsets and serializers for every resource above.
2. Add schema generation (drf-spectacular) and generate a client contract if desired.
3. Add `DataProvider` switch and wire page data to `lib/services`.
4. Replace demo login with backend login; store access token in memory, refresh cookie HTTP-only.
5. Server-enforce permissions, tenant/role scoping and workflow state transitions.
6. Implement document storage with signed URLs and malware scanning.
7. Add payment gateway webhooks, idempotency and reconciliation evidence.
8. Add immutable audit logs for every sensitive action.
9. Run contract, integration and end-to-end tests against staging.
