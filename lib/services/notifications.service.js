import { request } from "./api/client";

export const notificationsService = {
  async list(params = {}) {
    return request({ method: "GET", url: "/notifications/", params });
  },
  async markRead(id) {
    return request({ method: "POST", url: `/notifications/${id}/read/` });
  },
  async markAllRead() {
    return request({ method: "POST", url: "/notifications/read-all/" });
  },
  async preferences() {
    return request({ method: "GET", url: "/notifications/preferences/" });
  },
  async updatePreferences(payload) {
    return request({ method: "PATCH", url: "/notifications/preferences/", data: payload });
  },
  async sendAnnouncement(payload) {
    return request({ method: "POST", url: "/admin/announcements/", data: payload });
  },
};
