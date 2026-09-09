/**
 * Thin HTTP layer. Every service call goes through here so the app can be
 * pointed at a local DEVFORGE backend by setting VITE_API_BASE_URL.
 */

export const API_BASE_URL: string = import.meta.env["VITE_API_BASE_URL"] ?? "";

export const isBackendConfigured = (): boolean => API_BASE_URL.trim().length > 0;

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!isBackendConfigured()) {
    throw new ApiError("Unable to connect to the DEVFORGE backend.", 0);
  }

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  return (await response.json()) as T;
}
