import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — Consista",
  description:
    "Reset your Consista password to regain access to your habit tracking dashboard and behavioral insights.",
  openGraph: {
    title: "Forgot Password — Consista",
    description:
      "Reset your Consista password to regain access to your habit tracking dashboard and behavioral insights.",
  },
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

