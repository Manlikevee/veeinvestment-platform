import { request } from "./api/client";

export const paymentsService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/admin/payments/", params });
  },
  async verify(id, payload) {
    return request({ method: "POST", url: `/admin/payments/${id}/verify/`, data: payload });
  },
  async refund(id, payload) {
    return request({ method: "POST", url: `/admin/payments/${id}/refund/`, data: payload });
  },
  async reconciliation(params = {}) {
    return request({ method: "GET", url: "/admin/payments/reconciliation/", params });
  },
};
