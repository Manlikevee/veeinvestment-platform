import { products, team, insights, faqs } from "@/lib/data/site";
import {
  customer,
  portfolioSummary,
  investments,
  portfolioHistory,
  allocation,
  transactions,
  loans,
  documents,
  notifications,
  statements,
  tickets,
} from "@/lib/data/customer";
import {
  adminStats,
  customers,
  onboardingApplications,
  documentQueue,
  applications,
  adminLoans,
  adminTransactions,
  payments,
  staff,
  roles,
} from "@/lib/data/admin";

const wait = (value, delay = 180) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), delay));

/**
 * Mock adapter with the same method signatures as the live service layer.
 * It is intentionally async so UI code does not need to change when the
 * Django REST Framework API is connected.
 */
export const mockServices = {
  products: {
    list: (params = {}) => {
      const category = params.category && params.category !== "All" ? params.category : null;
      const query = (params.search || "").toLowerCase();
      return wait(
        products.filter(
          (p) =>
            (!category || p.category === category) &&
            (!query ||
              p.name.toLowerCase().includes(query) ||
              p.summary.toLowerCase().includes(query)),
        ),
      );
    },
    get: (slug) => wait(products.find((p) => p.slug === slug) || null),
  },
  site: {
    team: () => wait(team),
    insights: () => wait(insights),
    faqs: () => wait(faqs),
  },
  customers: {
    list: () => wait(customers),
    get: (id) => wait(customers.find((c) => c.id === id) || null),
    me: () => wait(customer),
    overview: () => wait({ customer, portfolioSummary, investments, transactions }),
  },
  onboarding: {
    list: () => wait(onboardingApplications),
  },
  documents: {
    customer: () => wait(documents),
    queue: () => wait(documentQueue),
  },
  investments: {
    list: () => wait(investments),
    applications: () => wait(applications),
  },
  portfolios: {
    overview: () => wait({ portfolioSummary, portfolioHistory, allocation, investments }),
  },
  loans: {
    customer: () => wait(loans),
    admin: () => wait(adminLoans),
  },
  finance: {
    transactions: () => wait(transactions),
    adminTransactions: () => wait(adminTransactions),
    payments: () => wait(payments),
    statements: () => wait(statements),
  },
  notifications: {
    list: () => wait(notifications),
  },
  support: {
    tickets: () => wait(tickets),
  },
  admin: {
    dashboard: () => wait({ adminStats, customers, applications, adminLoans }),
    staff: () => wait(staff),
    roles: () => wait(roles),
  },
};
