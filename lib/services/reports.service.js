import { request } from "./api/client";

export const reportsService = {
  async summary(params = {}) {
    return request({ method: "GET", url: "/admin/reports/summary/", params });
  },
  async export(type, format = "csv", params = {}) {
    return request({ method: "GET", url: `/admin/reports/${type}/export/`, params: { format, ...params } });
  },
};
