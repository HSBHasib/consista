import { getAuthUserDataFromCookie } from "@/utils/userData.utils";
import { handleResponse } from "./ApiError";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Base URL
const CURRENT_API_VERSION = process.env.NEXT_PUBLIC_API_VERSION; // API Version
type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE"; // Methods

// ==============================
// Auth Header
// ==============================
export const authHeader = async (): Promise<Record<string, string>> => {
  const userData = await getAuthUserDataFromCookie(); // Access Token
  const token = userData?.token || "";

  return token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
};


// ==============================
// ProtectedFetch —— Get
// ==============================
export const protectedFetch = async <T>(ProvidedPath: string): Promise<T> => {
  // Remove slash if accidentally provided in path
  const PATH = ProvidedPath.startsWith("/")
    ? ProvidedPath.slice(1)
    : ProvidedPath;

  const res = await fetch(`${BASE_URL}${CURRENT_API_VERSION}/${PATH}`, {
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  });
  return handleResponse<T>(res);
};


// ==============================
// ServerMutation —— (POST, PUT, PATCH, DELETE)
// ==============================
export const serverMutation = async <T>(
  ProvidedPath: string,
  method: MutationMethod,
  body?: unknown,
): Promise<T> => {
  // Remove slash if accidentally provided in path
  const PATH = ProvidedPath.startsWith("/")
    ? ProvidedPath.slice(1)
    : ProvidedPath;

  const res = await fetch(`${BASE_URL}/${PATH}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  return handleResponse<T>(res);
};


