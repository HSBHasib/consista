export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// ====================================
// Error Handler
// ====================================
export async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorData: any = {};
    try {
      errorData = await res.json();
    } catch {
      // If JSON parse fails
}

    const errorMessage = errorData?.message || errorData?.error || res.statusText;

    switch (res.status) {
      case 401:
        throw new ApiError(401, errorMessage || 'Unauthorized! Token invalid or expired.', errorData);
      case 403:
        throw new ApiError(403, errorMessage || 'Forbidden! You do not have permission.', errorData);
      case 404:
        throw new ApiError(404, errorMessage || 'Resource not found.', errorData);
      case 500:
        throw new ApiError(500, errorMessage || 'Internal server error.', errorData);
      default:
        throw new ApiError(res.status, errorMessage || `API Error: ${res.status}`, errorData);
    }
  }

  // If Response is not JSON or empty
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  return {} as T;
}

