// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { toast } from "@/utils/toast";
// import {
//   ResetPasswordFormData,
//   ResetPasswordFormProps,
// } from "@/types/auth.types";
// import {
//   MdDoneAll,
// } from "react-icons/md";
// import { PasswordInput } from "./PasswordInput";
// import { HiOutlineEye } from "react-icons/hi";
// import { HiOutlineEyeSlash } from "react-icons/hi2";

// export function ResetPasswordForm({
//   onSubmitReset,
//   loading = false,
// }: ResetPasswordFormProps) {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   // ==========================
//   // Form Initialization
//   // ==========================
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<ResetPasswordFormData>({
//     defaultValues: {
//       password: "",
//       confirm: "",
//     },
//   });

//   // =================================
//   // Watch Password Value
//   // =================================
//   const passwordValue = watch("password");

//   // =============================
//   // Password Criteria
//   // =============================
//   const passwordCriteria = [
//     { label: "8+ chars", valid: passwordValue.length >= 8 },
//     { label: "Uppercase", valid: /[A-Z]/.test(passwordValue) },
//     { label: "Lowercase", valid: /[a-z]/.test(passwordValue) },
//     { label: "Number", valid: /[0-9]/.test(passwordValue) },
//     { label: "Special char", valid: /[^A-Za-z0-9]/.test(passwordValue) },
//   ];

//   // ================================
//   // Form Submission Handler
//   // ================================
//   const handleFormSubmit = handleSubmit(async (data) => {
//     if (data.password !== data.confirm) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (onSubmitReset) {
//       await onSubmitReset(data);
//     } else {
//       setIsSuccess(true);
//       toast.success("Your password has been updated successfully.");
//     }
//   });

//   // ================================
//   // Password Reset Success View
//   // ================================
//   if (isSuccess) {
//     return (
//       <div className="w-full text-center">
//         <div className="justify-center bg-accent/5 inline-block rounded-full p-3">
//           <MdDoneAll className="h-7 w-7 text-accent" />
//         </div>

//         <h1 className="text-[24px] font-bold tracking-[-0.01em] text-fg">
//           Password reset
//         </h1>
//         <p className="mx-auto mt-2 mb-8 text-[15px] leading-relaxed text-muted">
//           Your password has been updated successfully. You can now sign in with
//           your new password.
//         </p>

//         <Link
//           href="/sign-in"
//           className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-white no-underline transition-all"
//         >
//           Sign In
//         </Link>
//       </div>
//     );
//   }

//   // ================================
//   // Form Input View
//   // ================================
//   return (
//     <div className="w-full text-center">
//       <h1 className="text-[27px] font-bold tracking-[-0.01em] text-fg">
//         Set new password
//       </h1>
//       <p className="mx-auto mt-1 mb-8 text-[15px] leading-relaxed text-muted">
//         Choose a strong password for your account.
//       </p>

//       <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
//         {/* New Password Field (with toggle support in PasswordInput) */}
//         <div>
//           <label className="mb-1.5 block text-[13px] font-medium text-fg">
//             Password
//           </label>
//           <PasswordInput
//             register={register}
//             name="password"
//             registerOptions={{
//               required: "Password is required",
//               validate: () =>
//                 passwordCriteria.every((c) => c.valid) || "Requirement not met",
//             }}
//             error={errors.password?.message}
//           />

//           {/* Inline check */}
//           <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px]">
//             {passwordCriteria.map((item, idx) => (
//               <span
//                 key={idx}
//                 className={`inline-flex items-center gap-1 transition-colors ${
//                   item.valid ? "text-emerald-600 font-medium" : "text-muted"
//                 }`}
//               >
//                 <MdDoneAll
//                   className={`h-3.5 w-3.5 ${
//                     item.valid ? "text-emerald-500" : "text-muted/40"
//                   }`}
//                 />
//                 {item.label}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Confirm Password  */}
//         <div className="flex flex-col gap-1.5">
//           <label htmlFor="confirm" className="text-[13px] font-medium text-fg">
//             Confirm password
//           </label>
//           <div className="relative">
//             <input
//               id="confirm"
//               type={showConfirm ? "text" : "password"}
//               placeholder="Repeat your password"
//               autoComplete="new-password"
//               {...register("confirm", {
//                 required: "Please confirm your password",
//                 validate: (value) =>
//                   value === passwordValue || "Passwords do not match",
//               })}
//               className="w-full rounded-[10px] border border-border bg-surface px-3.5 py-3 pr-10 text-[15px] text-fg transition-all focus:border-accent focus:outline-none placeholder:text-muted/60"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirm(!showConfirm)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg focus:outline-none cursor-pointer"
//               aria-label="Toggle confirm password visibility"
//             >
//               {showConfirm ? (
//                 <HiOutlineEyeSlash className="h-5 w-5" />
//               ) : (
//                 <HiOutlineEye className="h-5 w-5" />
//               )}
//             </button>
//           </div>
//           {errors.confirm && (
//             <p className="text-xs text-red-600">{errors.confirm.message}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-white transition-all disabled:opacity-60 cursor-pointer"
//         >
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>

//       <p className="mt-6 text-center text-[14px] text-muted">
//         <Link
//           href="/sign-in"
//           className="font-medium text-accent hover:underline"
//         >
//           Back to sign in
//         </Link>
//       </p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "@/utils/toast";
import { authClient } from "@/lib/auth-client";
import {
  ResetPasswordFormData,
  ResetPasswordFormProps,
} from "@/types/auth.types";
import { MdDoneAll } from "react-icons/md";
import { PasswordInput } from "./PasswordInput";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { MotionDiv } from "@/components/motion/Motion-div";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export function ResetPasswordForm({
  onSubmitReset,
  loading: externalLoading = false,
}: ResetPasswordFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const [isSuccess, setIsSuccess] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const loading = externalLoading || internalLoading;

  // ==========================
  // Form Initialization
  // ==========================
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  // =================================
  // Watch Password Value
  // =================================
  const passwordValue = watch("password");

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

  // ================================
  // Form Submission Handler
  // ================================
  const handleFormSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setInternalLoading(true);
    try {
      if (onSubmitReset) {
        await onSubmitReset(data);
      } else {
        const { error } = await authClient.emailOtp.resetPassword({
          email: email,
          otp: otp,
          password: data.password,
        });

        if (error) {
          toast.error(
            error.message || error.statusText || "Invalid password or request.",
          );
          return;
        }

        setIsSuccess(true);
        toast.success("Your password has been updated successfully.");
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setInternalLoading(false);
    }
  });

  // ================================
  // Password Reset Success View
  // ================================
  if (isSuccess) {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full text-center"
      >
        <div className="justify-center bg-accent/5 inline-block rounded-full p-3">
          <MdDoneAll className="h-7 w-7 text-accent" />
        </div>

        <h1 className="text-[24px] font-bold tracking-[-0.01em] text-fg">
          Password reset
        </h1>
        <p className="mx-auto mt-2 mb-8 text-[15px] leading-relaxed text-muted">
          Your password has been updated successfully. You can now sign in with
          your new password.
        </p>

        <Link
          href="/sign-in"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-white no-underline transition-all"
        >
          Sign In
        </Link>
      </MotionDiv>
    );
  }

  // ================================
  // Form Input View
  // ================================
  return (
    <div className="w-full text-center">
      <MotionDiv {...fadeUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <h1 className="text-[27px] font-bold tracking-[-0.01em] text-fg">
          Set new password
        </h1>
        <p className="mx-auto mt-1 mb-8 text-[15px] leading-relaxed text-muted">
          Choose a strong password for your account.
        </p>
      </MotionDiv>

      <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
        {/* New Password Field (with toggle support in PasswordInput) */}
        <MotionDiv {...fadeUp} transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-fg">
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

            {/* Inline check */}
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
        </MotionDiv>

        {/* Confirm Password  */}
        <MotionDiv {...fadeUp} transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm" className="text-[13px] font-medium text-fg">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                autoComplete="new-password"
                {...register("confirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className="w-full rounded-[10px] border border-border bg-surface px-3.5 py-3 pr-10 text-[15px] text-fg transition-all focus:border-accent focus:outline-none placeholder:text-muted/60"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg focus:outline-none cursor-pointer"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? (
                  <HiOutlineEyeSlash className="h-5 w-5" />
                ) : (
                  <HiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirm && (
              <p className="text-xs text-red-600">{errors.confirm.message}</p>
            )}
          </div>
        </MotionDiv>

        {/* Submit Button */}
        <MotionDiv {...fadeUp} transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[15px] font-medium tracking-[-0.005em] text-white transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </MotionDiv>
      </form>

      <MotionDiv {...fadeUp} transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
        <p className="mt-6 text-center text-[14px] text-muted">
          <Link
            href="/sign-in"
            className="font-medium text-accent hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </MotionDiv>
    </div>
  );
}
