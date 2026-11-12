import { request } from "./api/client";

export const onboardingService = {
  async getDraft() {
    return request({ method: "GET", url: "/onboarding/application/" });
  },
  async saveDraft(section, data) {
    return request({ method: "PATCH", url: "/onboarding/application/", data: { section, data } });
  },
  async submit(payload) {
    return request({ method: "POST", url: "/onboarding/application/submit/", data: payload });
  },
  async list(params = {}) {
    return request({ method: "GET", url: "/admin/onboarding/", params });
  },
  async review(id, payload) {
    return request({ method: "POST", url: `/admin/onboarding/${id}/review/`, data: payload });
  },
};
