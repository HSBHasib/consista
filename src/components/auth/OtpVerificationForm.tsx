"use client";

import { useRef, useState } from "react";
import { toast } from "@/utils/toast";
import { IoIosMail } from "react-icons/io";
import { IoMailUnreadOutline } from "react-icons/io5";

export interface OtpVerificationFormData {
  otp: string;
}

interface OtpVerificationFormProps {
  email?: string;
  onSubmitOtp?: (data: OtpVerificationFormData) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  loading?: boolean;
}

export function OtpVerificationForm({
  email = "your email address",
  onSubmitOtp,
  onResend,
  loading = false,
}: OtpVerificationFormProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, value: string) => {
    const char = value.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    if (errorMessage) setErrorMessage(null);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

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
    inputRefs.current[focusIndex]?.focus();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const combined = digits.join("");
    if (combined.length < 6) {
      const msg = "Please enter all 6 digits verification code.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setErrorMessage(null);
    if (onSubmitOtp) {
      await onSubmitOtp({ otp: combined });
    }
  };

  const handleResendClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onResend) {
      await onResend();
    }
    toast.info("Verification code resent.");
  };

  return (
    <div className="w-full text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c27850]/10">
        <IoMailUnreadOutline className="h-8 w-8 text-accent" />
      </div>

      <h1 className="font-serif text-[24px] font-semibold tracking-[-0.01em] text-fg">
        Check your email
      </h1>
      <p className="mx-auto mt-2 max-w-[50ch] text-[15px] leading-relaxed text-muted">
        We sent a 6-digit verification code to <span className="font-medium text-fg">{email}</span>. Enter it below to continue.
      </p>

      <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
        <div className="flex justify-center gap-2.5">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              inputMode="numeric"
              aria-label={`Digit ${index + 1}`}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-13 w-13 rounded-[10px] border border-border bg-surface text-center font-mono text-[22px] text-fg transition-all duration-150 focus:border-accent focus:outline-none focus:ring-3 focus:ring-[#c27850]/15"
            />
          ))}
        </div>

        {errorMessage && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-white transition-all hover:bg-[#a0522d] active:translate-y-[1px] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <p className="mt-5 text-[14px] text-muted">
        Didn&apos;t receive the code?{" "}
        <a
          href="#"
          onClick={handleResendClick}
          className="font-medium text-accent hover:underline"
        >
          Resend
        </a>
      </p>

    </div>
  );
}