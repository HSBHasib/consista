import { authClient } from "@/lib/auth-client";
import { toast } from "@/utils/toast";

export const handleSignOut = async () => {
  try {
    await authClient.signOut();
    toast.success("Signed out successfully.");
    window.location.href = "/";
  } catch (err) {
    toast.error("Failed to Sign Out.");
  }
};

