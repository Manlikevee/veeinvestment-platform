import { request } from "./api/client";

export const loansService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/loans/", params });
  },
  async get(id) {
    return request({ method: "GET", url: `/loans/${id}/` });
  },
  async apply(payload) {
    return request({ method: "POST", url: "/loans/applications/", data: payload });
  },
  async repaymentSchedule(id) {
    return request({ method: "GET", url: `/loans/${id}/repayments/` });
  },
  async adminList(params = {}) {
    return request({ method: "GET", url: "/admin/loans/", params });
  },
  async decide(id, payload) {
    return request({ method: "POST", url: `/admin/loans/${id}/decision/`, data: payload });
  },
};
