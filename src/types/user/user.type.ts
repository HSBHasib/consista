export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role?: string;
  timezone: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface UserProfileData extends AuthUser {
  currentStreak: number;
  longestStreak: number;
}

export interface AuthSessionData {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date | string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FullSession {
  session: AuthSessionData;
  user: AuthUser;
}