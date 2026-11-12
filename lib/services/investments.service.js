import { request } from "./api/client";

export const investmentsService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/investments/", params });
  },
  async get(id) {
    return request({ method: "GET", url: `/investments/${id}/` });
  },
  async apply(payload) {
    return request({ method: "POST", url: "/investments/applications/", data: payload });
  },
  async listApplications(params = {}) {
    return request({ method: "GET", url: "/admin/investment-applications/", params });
  },
  async decideApplication(id, payload) {
    return request({ method: "POST", url: `/admin/investment-applications/${id}/decision/`, data: payload });
  },
};
