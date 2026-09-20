"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useState } from "react";
import { toast } from "@/utils/toast";
import { LoginFormData } from "@/types/auth.types";
import { authClient } from "@/lib/auth-client";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SigninForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  // ===================================
  // Form Submission
  // ===================================
  const onSubmit = async (SingInData: LoginFormData) => {
    if (!emailRegex.test(SingInData.email)) {
      toast.error("Please provide a valid email address to sign in.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: SingInData.email,
        password: SingInData.password,
        rememberMe: true,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        toast.success("Signed in successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-[-0.015em] text-fg">
          Welcome back
        </h1>
        <p className="mt-1 text-sm font-medium text-muted">
          Sign in to your Consista account
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

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-medium text-fg">Password</label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            register={register}
            name="password"
            registerOptions={{ required: "Password is required" }}
            error={errors.password?.message}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <SocialAuthButtons />

      <div className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-fg hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
