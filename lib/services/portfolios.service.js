import { request } from "./api/client";

export const portfoliosService = {
  async summary() {
    return request({ method: "GET", url: "/portfolio/" });
  },
  async performance(params = {}) {
    return request({ method: "GET", url: "/portfolio/performance/", params });
  },
  async adminOverview(params = {}) {
    return request({ method: "GET", url: "/admin/portfolios/", params });
  },
  async customerPortfolio(customerId) {
    return request({ method: "GET", url: `/admin/portfolios/${customerId}/` });
  },
  async export(customerId, format = "pdf") {
    return request({ method: "GET", url: `/admin/portfolios/${customerId}/export/`, params: { format } });
  },
};
