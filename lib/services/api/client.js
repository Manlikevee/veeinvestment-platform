import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Access tokens are held in memory only. Refresh tokens belong in an
 * HttpOnly, Secure, SameSite cookie managed by the backend.
 */
let inMemoryAccessToken = null;

export function setAccessToken(token) {
  inMemoryAccessToken = token || null;
}

export function clearAccessToken() {
  inMemoryAccessToken = null;
}

export class ApiError extends Error {
  constructor(message, { status, code, details, requestId } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Client": "vee-web",
  },
});

apiClient.interceptors.request.use((config) => {
  if (inMemoryAccessToken) {
    config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(
        new ApiError("Request cancelled.", { code: "REQUEST_CANCELLED" }),
      );
    }

    const response = error.response;
    const data = response?.data;
    const requestId =
      response?.headers?.["x-request-id"] || data?.request_id || undefined;

    return Promise.reject(
      new ApiError(
        data?.message || data?.detail || error.message || "Something went wrong.",
        {
          status: response?.status,
          code: data?.code || error.code,
          details: data?.errors || data?.details,
          requestId,
        },
      ),
    );
  },
);

/**
 * Normalises common DRF response envelopes. Pagination is preserved rather
 * than silently flattened so tables can render server-side pages.
 */
export async function request(config) {
  const response = await apiClient.request(config);
  const payload = response.data;
  if (payload && typeof payload === "object" && "data" in payload && "success" in payload) {
    return { ...payload.data, meta: payload.meta || null };
  }
  return payload;
}

export function createAbortController() {
  return new AbortController();
}
