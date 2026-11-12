import { request } from "./api/client";

export const cmsService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/admin/cms/pages/", params });
  },
  async get(id) {
    return request({ method: "GET", url: `/admin/cms/pages/${id}/` });
  },
  async create(payload) {
    return request({ method: "POST", url: "/admin/cms/pages/", data: payload });
  },
  async update(id, payload) {
    return request({ method: "PATCH", url: `/admin/cms/pages/${id}/`, data: payload });
  },
  async publish(id) {
    return request({ method: "POST", url: `/admin/cms/pages/${id}/publish/` });
  },
  async unpublish(id) {
    return request({ method: "POST", url: `/admin/cms/pages/${id}/unpublish/` });
  },
};
