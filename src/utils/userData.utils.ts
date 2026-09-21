import { cookies } from "next/headers";

export async function getAuthUserDataFromCookie() {
  const cookieStore = await cookies();
  return {
    token: cookieStore.get("auth_token")?.value || null,
    role: cookieStore.get("user_role")?.value || null,
    ipAddress: cookieStore.get("ip_address")?.value || null,
    userAgent: decodeURIComponent(cookieStore.get("user_agent")?.value || ""),
  };
}
