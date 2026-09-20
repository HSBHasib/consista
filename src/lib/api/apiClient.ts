const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const API_PREFIX = "/api/v1";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${BASE_URL}${API_PREFIX}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

async function request<T = unknown>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<{ data: T; response: Response }> {
  const { params, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  const res = await fetch(buildUrl(path, params), {
    method,
    credentials: "include",
    ...fetchOptions,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const json = await res.json() as ApiResponse<T>;

  if (!res.ok || !json.success) {
    const error = new ApiError(
      json.message || `Request failed with status ${res.status}`,
      res.status,
      json
    );
    throw error;
  }

  return { data: json.data as T, response: res };
}

export class ApiError extends Error {
  status: number;
  body: ApiResponse;

  constructor(message: string, status: number, body: ApiResponse) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export const apiClient = {
  get: <T = unknown>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),

  post: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),

  patch: <T = unknown>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),

  delete: <T = unknown>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
