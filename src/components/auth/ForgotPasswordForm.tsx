"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ForgotPasswordFormData } from "@/types/auth.types";
import { useRouter } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setSubmitted(true);

    if (submitted) {
      router.push("/reset-password");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-[-0.015em] text-fg">
          Forgot password?
        </h1>
        <p className="mt-1 text-sm font-medium text-muted">
          Enter your email to receive a verification code
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-fg">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: { value: emailRegex, message: "Invalid email format" },
            })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Sending code..." : "Send Verification Code"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted">
        Remember your password?{" "}
        <Link href="/sign-in" className="font-medium text-fg hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
