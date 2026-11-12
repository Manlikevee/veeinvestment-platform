import { request, setAccessToken, clearAccessToken } from "./api/client";

export const authService = {
  async login(payload) {
    const data = await request({ method: "POST", url: "/auth/login/", data: payload });
    if (data?.access) setAccessToken(data.access);
    return data;
  },
  async register(payload) {
    return request({ method: "POST", url: "/auth/register/", data: payload });
  },
  async logout() {
    try {
      return await request({ method: "POST", url: "/auth/logout/" });
    } finally {
      clearAccessToken();
    }
  },
  async forgotPassword(payload) {
    return request({ method: "POST", url: "/auth/password-reset/request/", data: payload });
  },
  async resetPassword(payload) {
    return request({ method: "POST", url: "/auth/password-reset/confirm/", data: payload });
  },
  async verifyEmail(payload) {
    return request({ method: "POST", url: "/auth/email/verify/", data: payload });
  },
  async resendVerification(payload) {
    return request({ method: "POST", url: "/auth/email/resend/", data: payload });
  },
  async verifyOtp(payload) {
    return request({ method: "POST", url: "/auth/otp/verify/", data: payload });
  },
  async verifyTwoFactor(payload) {
    const data = await request({ method: "POST", url: "/auth/2fa/verify/", data: payload });
    if (data?.access) setAccessToken(data.access);
    return data;
  },
  async me() {
    return request({ method: "GET", url: "/auth/me/" });
  },
};
