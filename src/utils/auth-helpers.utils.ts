import { authClient } from "@/lib/auth-client"; 
import { AuthSessionData, AuthUser, FullSession } from "@/types/user/User.type";

// ———————————————————————————————————— 
// User Full Data with Session
// ————————————————————————————————————
export const getUserFullData = async (): Promise<FullSession | null> => {
  const { data } = await authClient.getSession();
  return (data as FullSession) || null;
};


// ———————————————————————————————————— 
// User Data
// ———————————————————————————————————— 
export const getUser = async (): Promise<AuthUser | null> => {
  const session = await getUserFullData();
  return session?.user || null;
};


// ———————————————————————————————————— 
// User Session
// ———————————————————————————————————— 
export const getUserSession = async (): Promise<AuthSessionData | null> => {
  const session = await getUserFullData();
  return session?.session || null;
};


// ———————————————————————————————————— 
// User Token
// ———————————————————————————————————— 
export const getUserToken = async (): Promise<string | null> => {
  const session = await getUserFullData();
  return session?.session?.token || null;
};


// ———————————————————————————————————— 
// Set Session Data in Cookies
// ———————————————————————————————————— 
export const syncSessionToCookies = (sessionData: FullSession | null) => {
  if (typeof window === "undefined" || !sessionData) return;

  const { session, user } = sessionData;
  const maxAge = 604800; // 7 days

  if (session?.token) {
    document.cookie = `auth_token=${session.token}; path=/; max-age=${maxAge}; samesite=lax`;
  }
  if (user?.role) {
    document.cookie = `user_role=${user.role}; path=/; max-age=${maxAge}; samesite=lax`;
  }
  if (session?.ipAddress) {
    document.cookie = `ip_address=${session.ipAddress}; path=/; max-age=${maxAge}; samesite=lax`;
  }
  if (session?.userAgent) {
    document.cookie = `user_agent=${encodeURIComponent(session.userAgent)}; path=/; max-age=${maxAge}; samesite=lax`;
  }
};
