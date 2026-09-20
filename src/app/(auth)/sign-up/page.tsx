import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Sign Up — Consista",
  description:
    "Create your Consista account to start tracking habits, building consistency, and unlocking behavioral insights.",
  openGraph: {
    title: "Sign Up — Consista",
    description:
      "Create your Consista account to start tracking habits, building consistency, and unlocking behavioral insights.",
  },
};

export default function SignUpPage() {
  return (
    <AuthGuard>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </AuthGuard>
  );
}
