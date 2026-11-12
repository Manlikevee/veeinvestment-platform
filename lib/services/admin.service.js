import { request } from "./api/client";

export const adminService = {
  async dashboard(params = {}) {
    return request({ method: "GET", url: "/admin/dashboard/", params });
  },
  async staff(params = {}) {
    return request({ method: "GET", url: "/admin/staff/", params });
  },
  async inviteStaff(payload) {
    return request({ method: "POST", url: "/admin/staff/invite/", data: payload });
  },
  async roles() {
    return request({ method: "GET", url: "/admin/roles/" });
  },
  async updateRole(id, payload) {
    return request({ method: "PATCH", url: `/admin/roles/${id}/`, data: payload });
  },
  async auditLogs(params = {}) {
    return request({ method: "GET", url: "/admin/audit-logs/", params });
  },
  async settings() {
    return request({ method: "GET", url: "/admin/settings/" });
  },
  async updateSettings(payload) {
    return request({ method: "PATCH", url: "/admin/settings/", data: payload });
  },
};
