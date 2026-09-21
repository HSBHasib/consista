"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ForgotPasswordFormData } from "@/types/auth/auth.types";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/utils/toast";
import { MotionDiv } from "@/components/motion/Motion-div";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

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
    if (!emailRegex.test(data.email)) {
      toast.error("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "forget-password",
      });

      if (error) {
        toast.error(error.message || "Failed to send reset code.");
        return;
      }

      setSubmitted(true);
      toast.success("Reset code sent to your email!");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&type=forget-password`);
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <MotionDiv {...fadeUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <h1 className="text-[27px] font-bold tracking-[-0.01em] text-fg">
          Forgot password?
        </h1>
        <p className="mt-1 text-[14px] text-muted">
          Enter your email and we&apos;ll send you a reset code.
        </p>
      </MotionDiv>

      <MotionDiv {...fadeUp} transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
        <div>
          <label className="block text-[14px] font-medium text-fg mb-1.5">
            Email address
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-[10px] border border-border bg-surface px-3.5 py-2.5 text-[15px] text-fg focus:border-accent focus:outline-none focus:ring-3 focus:ring-[#c27850]/15"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </MotionDiv>

      <MotionDiv {...fadeUp} transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-white transition-all hover:bg-[#a0522d] active:translate-y-[1px] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </MotionDiv>

      <MotionDiv {...fadeUp} transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <p className="text-center text-[14px] text-muted mt-4">
          Remembered your password?{" "}
          <Link href="/sign-in" className="text-accent font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </MotionDiv>
    </form>
  );
}