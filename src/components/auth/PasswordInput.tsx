"use client";

import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export interface PasswordInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  register?: any;
  registerOptions?: any;
}

export function PasswordInput({
  id = "password",
  name = "password",
  placeholder = "At least 8 characters",
  register,
  registerOptions,
  error,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...(register && name ? register(name, registerOptions) : {})}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg focus:border-accent focus:outline-none transition-colors pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors cursor-pointer"
      >
        {show ? <HiOutlineEyeSlash className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
