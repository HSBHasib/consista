import { ApiError } from "./apiClient";
import { toast } from "@/utils/toast";

export function extractErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred. Please try again.";
}

export function handleApiError(error: unknown, fallback?: string): string {
  const message = fallback ?? extractErrorMessage(error);
  toast.error(message);
  return message;
}

export function handleApiSuccess(message: string): void {
  toast.success(message);
}
