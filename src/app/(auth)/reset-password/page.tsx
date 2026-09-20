import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — Consista",
  description:
    "Set a new password for your Consista account to secure your habit tracking data and continue your growth journey.",
  openGraph: {
    title: "Reset Password — Consista",
    description:
      "Set a new password for your Consista account to secure your habit tracking data and continue your growth journey.",
  },
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}

