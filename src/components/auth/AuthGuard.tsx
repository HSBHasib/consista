"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const userRole = (session?.user as unknown as { role?: string })?.role;

  // if(userRole !== "USER" || userRole !== "ADMIN") {
  //   redirect("/unauthorized");
  // }

  useEffect(() => {
    if (userRole) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return <>{children}</>;
}