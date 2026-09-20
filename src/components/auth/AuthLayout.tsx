"use client";

import { EditorialConsistencySvg } from "@/lib/svg/EditorialConsistencySvg";
import { MotionDiv } from "@/components/motion/Motion-div";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col items-center justify-center p-12 border-r border-border/60 overflow-hidden">
        
        {/* ======================== */}
        {/* background Colors */}
        {/* ======================== */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-bronze/8 blur-3xl pointer-events-none" />


        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center max-w-md"
        >
          {/* ======================== */}
          {/* Illustration */}
          {/* ======================== */}
          <div className="mb-2 w-full flex justify-center">
            <EditorialConsistencySvg />
          </div>

          {/* ======================== */}
          {/* Headline */}
          {/* ======================== */}
          <h2 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.015em] text-fg">
            Start building consistency today
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Join thousands of people who track their daily progress and build lasting habits.
          </p>
        </MotionDiv>
      </div>

      {/* Right form container: shows on all devices */}
      <div className="flex flex-col lg:justify-center justify-start px-6 py-7 sm:px-12 lg:px-20">
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-105"
        >
          {children}
        </MotionDiv>
      </div>
    </div>
  );
}

