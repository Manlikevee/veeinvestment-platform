/**
 * Service barrel. Each service mirrors the expected Django REST Framework
 * contract. Set NEXT_PUBLIC_DATA_PROVIDER=mock to use the local demo
 * repository at @/lib/data while developing without a backend.
 */
export { authService } from "./auth.service";
export { customersService } from "./customers.service";
export { onboardingService } from "./onboarding.service";
export { documentsService } from "./documents.service";
export { productsService } from "./products.service";
export { investmentsService } from "./investments.service";
export { portfoliosService } from "./portfolios.service";
export { loansService } from "./loans.service";
export { transactionsService } from "./transactions.service";
export { paymentsService } from "./payments.service";
export { notificationsService } from "./notifications.service";
export { supportService } from "./support.service";
export { reportsService } from "./reports.service";
export { cmsService } from "./cms.service";
export { adminService } from "./admin.service";
export { apiClient, ApiError, API_BASE_URL, setAccessToken } from "./api/client";
