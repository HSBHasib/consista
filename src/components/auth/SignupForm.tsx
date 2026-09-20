"use client";

import { useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useState } from "react";
import { toast } from "@/utils/toast";
import { RegisterFormData } from "@/types/auth.types";
import { MdDoneAll } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ============================
  // Form Handling — Use React Hook Form
  // ============================
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  // =============================
  // Password Criteria
  // =============================
  const passwordCriteria = [
    { label: "8+ chars", valid: passwordValue.length >= 8 },
    { label: "Uppercase", valid: /[A-Z]/.test(passwordValue) },
    { label: "Lowercase", valid: /[a-z]/.test(passwordValue) },
    { label: "Number", valid: /[0-9]/.test(passwordValue) },
    { label: "Special char", valid: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  // ============================
  // Form Submission
  // ============================
  const onSubmit = async (signUpData: RegisterFormData) => {
    if (
      !nameRegex.test(signUpData.firstName) ||
      signUpData.firstName.length < 3
    ) {
      toast.error(
        "First name should contain only letters and be at least 3 characters long.",
      );
      return;
    }
    if (
      !nameRegex.test(signUpData.lastName) ||
      signUpData.lastName.length < 3
    ) {
      toast.error(
        "Last name should contain only letters and be at least 3 characters long.",
      );
      return;
    }
    if (!emailRegex.test(signUpData.email)) {
      toast.error("Please provide a valid email address to continue.");
      return;
    }
    if (!passwordCriteria.every((c) => c.valid)) {
      toast.error(
        "Your password must meet all the listed requirements for your security.",
      );
      return;
    }


    // Call the authentication client to sign up the user — (BetterAuth)
    const { data, error } = await authClient.signUp.email({
      name: signUpData.firstName + " " + signUpData.lastName,
      email: signUpData.email,
      password: signUpData.password,
    });

    if (error) {
      toast.error(error.message || "Failed to create account.");
      return;
    }

    if (data) {
      // =========================
      // Send OTP
      // =========================
      await authClient.emailOtp.sendVerificationOtp({
        email: signUpData.email,
        type: "email-verification",
      });

      toast.success("Account created! Please verify your Account.");
      router.push(`/verify-otp?email=${encodeURIComponent(signUpData.email)}`);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-[-0.015em] text-fg">
          Create your account
        </h1>
        <p className="mt-1 text-sm font-medium text-muted">
          Begin your consistency journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-fg">
              First name
            </label>
            <input
              type="text"
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 3, message: "Min 3 chars" },
                pattern: { value: nameRegex, message: "Letters only" },
              })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-fg">
              Last name
            </label>
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 3, message: "Min 3 chars" },
                pattern: { value: nameRegex, message: "Letters only" },
              })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-fg">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter Your Email address"
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
          <label className="mb-1.5 block text-xs font-medium text-fg">
            Password
          </label>
          <PasswordInput
            register={register}
            name="password"
            registerOptions={{
              required: "Password is required",
              validate: () =>
                passwordCriteria.every((c) => c.valid) || "Requirement not met",
            }}
            error={errors.password?.message}
          />

          {/* Inline check badges */}
          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px]">
            {passwordCriteria.map((item, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 transition-colors ${
                  item.valid ? "text-emerald-600 font-medium" : "text-muted"
                }`}
              >
                <MdDoneAll
                  className={`h-3.5 w-3.5 ${
                    item.valid ? "text-emerald-500" : "text-muted/40"
                  }`}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-all hover:bg-accent/90 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Sending code..." : "Create Account"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <SocialAuthButtons />

      <div className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-fg hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
