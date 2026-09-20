"use client";

import { useSearchParams } from "next/navigation";
import { OtpVerificationForm } from "@/components/auth/OtpVerificationForm";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";

function VerifyOtpPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const typeParam = searchParams.get("type");
  const verificationType =
    typeParam === "forget-password" ? "forget-password" : "email-verification";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <OtpVerificationForm email={email} verificationType={verificationType} />
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <AuthLayout>
        <VerifyOtpPageContent />
      </AuthLayout>
    </Suspense>
  );
}

