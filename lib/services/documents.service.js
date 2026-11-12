import { request } from "./api/client";

export const documentsService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/documents/", params });
  },
  async upload(file, metadata = {}) {
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(metadata).forEach(([key, value]) => formData.append(key, value));
    return request({
      method: "POST",
      url: "/documents/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: undefined,
    });
  },
  async get(id) {
    return request({ method: "GET", url: `/documents/${id}/` });
  },
  async approve(id, note) {
    return request({ method: "POST", url: `/admin/documents/${id}/approve/`, data: { note } });
  },
  async reject(id, reason) {
    return request({ method: "POST", url: `/admin/documents/${id}/reject/`, data: { reason } });
  },
  async requestReplacement(id, reason) {
    return request({ method: "POST", url: `/admin/documents/${id}/request-replacement/`, data: { reason } });
  },
};
