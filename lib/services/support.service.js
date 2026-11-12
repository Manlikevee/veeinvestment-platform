import { request } from "./api/client";

export const supportService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/support/tickets/", params });
  },
  async get(id) {
    return request({ method: "GET", url: `/support/tickets/${id}/` });
  },
  async create(payload) {
    return request({ method: "POST", url: "/support/tickets/", data: payload });
  },
  async reply(id, message) {
    return request({ method: "POST", url: `/support/tickets/${id}/messages/`, data: { message } });
  },
  async adminList(params = {}) {
    return request({ method: "GET", url: "/admin/support/tickets/", params });
  },
};
