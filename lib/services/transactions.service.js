import { request } from "./api/client";

export const transactionsService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/transactions/", params });
  },
  async receipt(id) {
    return request({ method: "GET", url: `/transactions/${id}/receipt/` });
  },
  async adminList(params = {}) {
    return request({ method: "GET", url: "/admin/transactions/", params });
  },
  async reconcile(id, note) {
    return request({ method: "POST", url: `/admin/transactions/${id}/reconcile/`, data: { note } });
  },
  async export(params = {}) {
    return request({ method: "GET", url: "/admin/transactions/export/", params });
  },
};
