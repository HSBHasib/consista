import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OtpVerificationForm } from "@/components/auth/OtpVerificationForm";

export const metadata: Metadata = {
  title: "Verify OTP — Consista",
  description:
    "Verify your one-time password to secure your Consista account and continue building lasting habits.",
  openGraph: {
    title: "Verify OTP — Consista",
    description:
      "Verify your one-time password to secure your Consista account and continue building lasting habits.",
  },
};

export default function VerifyOtpPage() {
  return (
    <AuthLayout>
        <OtpVerificationForm />
    </AuthLayout>
  );
}

