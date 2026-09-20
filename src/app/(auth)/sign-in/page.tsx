import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SigninForm } from "@/components/auth/SigninForm";

export const metadata: Metadata = {
  title: "Sign In — Consista",
  description:
    "Sign in to your Consista account to track consistency, visualize progress, and build lasting habits.",
  openGraph: {
    title: "Sign In — Consista",
    description:
      "Sign in to your Consista account to track consistency, visualize progress, and build lasting habits.",
  },
};

export default function SignInPage() {
  return (
    <AuthGuard>
      <AuthLayout>
        <SigninForm />
      </AuthLayout>
    </AuthGuard>
  );
}
