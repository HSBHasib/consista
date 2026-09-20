import { EditorialConsistencySvg } from "@/lib/svg/EditorialConsistencySvg";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-parchment">
      <div className="relative hidden lg:flex flex-col items-center justify-center p-12 border-r border-border/60 bg-[#f3eae1]/50 overflow-hidden">
        
        {/* ======================== */}
        {/* background Colors */}
        {/* ======================== */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-bronze/8 blur-3xl pointer-events-none" />


        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
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
        </div>
      </div>

      {/* Right form container: shows on all devices */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-[#F9F4EF]/10">
        <div className="mx-auto w-full max-w-105">{children}</div>
      </div>
    </div>
  );
}


