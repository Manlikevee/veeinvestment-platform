import { request } from "./api/client";

export const productsService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/investment-products/", params });
  },
  async get(slug) {
    return request({ method: "GET", url: `/investment-products/${slug}/` });
  },
  async create(payload) {
    return request({ method: "POST", url: "/investment-products/", data: payload });
  },
  async update(id, payload) {
    return request({ method: "PATCH", url: `/investment-products/${id}/`, data: payload });
  },
  async archive(id) {
    return request({ method: "POST", url: `/investment-products/${id}/archive/` });
  },
};
