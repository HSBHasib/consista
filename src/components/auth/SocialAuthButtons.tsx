"use client";

import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

export function SocialAuthButtons() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm font-medium text-fg transition-all hover:bg-muted/10 active:scale-[0.99] cursor-pointer"
      >
        <FcGoogle size={20} />
        Google
      </button>

      {/* GitHub */}
      <button
        type="button"
        onClick={handleGithubSignIn}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm font-medium text-fg transition-all hover:bg-muted/10 active:scale-[0.99] cursor-pointer"
      >
        <IoLogoGithub size={20}  />
        GitHub
      </button>
    </div>
  );
}