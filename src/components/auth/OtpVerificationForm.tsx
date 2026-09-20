"use client";

import { useState, Suspense, useEffect } from "react";
import { toast } from "@/utils/toast";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@heroui/react";
import { IoMdMailUnread } from "react-icons/io";
import {
  ExtendedOtpVerificationFormProps,
  OtpVerificationFormData,
} from "@/types/auth.types";

function OtpFormContent({
  defaultEmail = "your email address",
  onSubmitOtp,
  onResend,
  externalLoading = false,
  verificationType = "email-verification",
  onSuccessRoute = verificationType === "email-verification"
    ? "/sign-in"
    : "/reset-password",
}: {
  defaultEmail?: string;
  onSubmitOtp?: (data: OtpVerificationFormData) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  externalLoading?: boolean;
  verificationType?: "email-verification" | "forget-password";
  onSuccessRoute?: string;
}) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const router = useRouter();
  const searchParams = useSearchParams();

  // ===================================
  // Get email from query parameters or fallback to default
  // ===================================
  const emailFromQuery = searchParams.get("email") || defaultEmail;
  const loading = externalLoading || internalLoading;

  // =====================================
  // Persistent Countdown timer effect (reload-proof, respects expiration lock at 0)
  // =====================================
  useEffect(() => {
    const STORAGE_KEY = `otp_expiry_${verificationType}_${emailFromQuery}`;
    const savedExpiry = sessionStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    let targetTime: number;
    if (savedExpiry) {
      targetTime = Number(savedExpiry);
      const remaining = Math.max(0, Math.floor((targetTime - now) / 1000));
      setTimeLeft(remaining);
    } else {
      targetTime = now + 300 * 1000;
      sessionStorage.setItem(STORAGE_KEY, targetTime.toString());
      setTimeLeft(300);
    }

    const timer = setInterval(() => {
      const currentStored = sessionStorage.getItem(STORAGE_KEY);
      if (currentStored) {
        const remaining = Math.max(
          0,
          Math.floor((Number(currentStored) - Date.now()) / 1000),
        );
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [emailFromQuery, verificationType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ========================
  // Input Handling (Responsive & Smooth)
  // ========================
  const handleDigitChange = (index: number, value: string) => {
    const char = value.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    if (errorMessage) setErrorMessage(null);

    if (char && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // ==========================
  // Handle keyboard events for each OTP input
  // ==========================
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      const newDigits = [...digits];
      if (digits[index]) {
        newDigits[index] = "";
        setDigits(newDigits);
      } else if (index > 0) {
        newDigits[index - 1] = "";
        setDigits(newDigits);
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  // ==========================
  // Handle pasting of OTP code
  // ==========================
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{1,6}$/.test(pastedData)) return;

    const chars = pastedData.split("");
    const newDigits = ["", "", "", "", "", ""];
    chars.forEach((c, idx) => {
      if (idx < 6) newDigits[idx] = c;
    });
    setDigits(newDigits);
    if (errorMessage) setErrorMessage(null);

    const focusIndex = Math.min(chars.length, 5);
    document.getElementById(`otp-input-${focusIndex}`)?.focus();
  };

  // ========================
  // Form Submission Handler
  // ========================
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = digits.join("");
    if (otpValue.length < 6) {
      const msg = "Please enter all 6 digits verification code.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setErrorMessage(null);
    setInternalLoading(true);

    try {
      if (onSubmitOtp) {
        await onSubmitOtp({ otp: otpValue });
      } else {
        if (verificationType === "email-verification") {
          const { error } = await authClient.emailOtp.verifyEmail({
            email: emailFromQuery,
            otp: otpValue,
          });

          if (error) {
            toast.error(error.message || "Invalid OTP");
          } else {
            toast.success("Email verified successfully!");
            router.push(onSuccessRoute);
          }
        } else if (verificationType === "forget-password") {
          toast.success("OTP accepted. Please set your new password.");
          router.push(
            `/reset-password?email=${encodeURIComponent(emailFromQuery)}&otp=${encodeURIComponent(otpValue)}`,
          );
        }
      }
    } finally {
      setInternalLoading(false);
    }
  };

  // ========================
  // Resend Code Handler (Strictly resets timer to full 300s only on explicit resend)
  // ========================
  const handleResendClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onResend) {
      await onResend();
    } else {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: emailFromQuery,
        type: verificationType,
      });

      if (error) {
        toast.error(error.message || "Failed to resend code.");
        return;
      } else {
        toast.success("Verification code resent.");
      }
    }

    // Forcefully reset expiry and timer state to full 5 minutes (300s) on resend
    const STORAGE_KEY = `otp_expiry_${verificationType}_${emailFromQuery}`;
    const newTarget = Date.now() + 300 * 1000;
    sessionStorage.setItem(STORAGE_KEY, newTarget.toString());
    setTimeLeft(300);
  };

  return (
    <div className="w-full max-w-sm mx-auto text-center flex flex-col items-center px-4">
      <div className="mx-auto mb-3 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#c27850]/12">
        <IoMdMailUnread className="text-[#c27850] h-6 w-6 sm:h-8 sm:w-8" />
      </div>

      <h1 className="text-[22px] sm:text-[24px] font-bold tracking-[-0.01em] text-fg">
        {verificationType === "forget-password"
          ? "Reset your password"
          : "Check your email"}
      </h1>
      <p className="mx-auto mt-1 text-[14px] sm:text-[15px] text-muted">
        We sent a 6-digit code to{" "}
        <span className="font-medium text-fg break-all">{emailFromQuery}</span>.
        Enter it below to continue.
      </p>

      {/* ============================== */}
      {/* OTP Input Form (Responsive & Accessible) */}
      {/* ============================== */}
      <form
        onSubmit={handleFormSubmit}
        className="mt-6 sm:mt-8 space-y-6 flex flex-col items-center w-full"
      >
        <div className="flex justify-center gap-1.5 sm:gap-2.5 w-full">
          {digits.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              inputMode="numeric"
              aria-label={`Digit ${index + 1}`}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-10.5 w-10.5 sm:h-13 sm:w-13 rounded-[10px] border border-border bg-surface text-center text-[18px] sm:text-[22px] text-fg transition-all duration-150 focus:border-accent focus:outline-none focus:ring-3 focus:ring-[#c27850]/15"
            />
          ))}
        </div>

        {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-white transition-all hover:bg-[#a0522d] active:translate-y-[1px] disabled:opacity-60 cursor-pointer"
        >
          {loading
            ? "Verifying..."
            : verificationType === "forget-password"
              ? "Verify Code"
              : "Verify Email"}
        </button>
      </form>

      {/* ============================= */}
      {/* Timer Display 5min (Persistent) */}
      {/* ============================= */}
      <div className="mt-4 text-[13px] text-muted">
        {timeLeft > 0 ? (
          <span>
            Code expires in{" "}
            <span className="font-medium text-fg">{formatTime(timeLeft)}</span>
          </span>
        ) : (
          <span className="text-red-500 font-medium">
            Code has expired. Please request a new code.
          </span>
        )}
      </div>

      {/* ============================== */}
      {/* Resend Code Features */}
      {/* ============================== */}
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[14px] text-muted">
        <p>Didn&apos;t receive the code?</p>
        <Link
          href="#"
          onClick={handleResendClick}
          className="font-medium text-accent underline cursor-pointer"
        >
          Resend
        </Link>
      </div>
    </div>
  );
}

// Main component for the OTP verification form
export function OtpVerificationForm(props: ExtendedOtpVerificationFormProps) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-8 text-muted">
          Loading verification...
        </div>
      }
    >
      <OtpFormContent
        defaultEmail={props.email}
        onSubmitOtp={props.onSubmitOtp}
        onResend={props.onResend}
        externalLoading={props.loading}
        verificationType={props.verificationType}
      />
    </Suspense>
  );
}

