import { request } from "./api/client";

export const customersService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/customers/", params });
  },
  async get(id) {
    return request({ method: "GET", url: `/customers/${id}/` });
  },
  async update(id, payload) {
    return request({ method: "PATCH", url: `/customers/${id}/`, data: payload });
  },
  async profile() {
    return request({ method: "GET", url: "/customers/me/" });
  },
  async updateProfile(payload) {
    return request({ method: "PATCH", url: "/customers/me/", data: payload });
  },
  async suspend(id, note) {
    return request({ method: "POST", url: `/customers/${id}/suspend/`, data: { note } });
  },
  async reactivate(id) {
    return request({ method: "POST", url: `/customers/${id}/reactivate/` });
  },
  async addNote(id, note) {
    return request({ method: "POST", url: `/customers/${id}/notes/`, data: { note } });
  },
};
