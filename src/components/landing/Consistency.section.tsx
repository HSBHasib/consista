"use client";

import { motion } from "framer-motion";
import { MotionDiv } from "@/components/motion/Motion-div";
import { useCountUp } from "@/hooks/useCountUp";
import { consistencyStats, calendarDays } from "@/data/landing.data";


// ============================
// Status Styles
// ============================
const statusStyles: Record<string, string> = {
  success: "bg-success/75",
  missed: "bg-missed/75",
  empty: "bg-fg-soft",
  today: "outline-2 outline-accent outline-offset-1 bg-fg-soft",
  pending: "bg-fg-soft opacity-40",
};


// =============================
// Container Animation Variants
// =============================
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.10, delayChildren: 0.2 },
  },
};


// ==============================
// Cell Animation Variants
// ==============================
const cell = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
};


// ==============================
// CountUp Value Component
// ==============================
function CountUpValue({ value, className }: { value: number; className?: string }) {
  const { count, ref } = useCountUp(value, 1800);
  return (
    <div ref={ref} className={className}>
      {count}
    </div>
  );
}



// =================================
// Consistency Section
// =================================
export function ConsistencySection() {
  const currentDate = new Date();
  return (
    <section id="streaks" className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-270 px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ===================================== */}
          {/* Left Column — Content */}
          {/* ===================================== */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                Consistency Over Time
              </p>
              <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.015em] text-fg">
                Behavior compounds. So do streaks.
              </h2>
            </div>
            <p className="max-w-[60ch] text-[17px] leading-relaxed text-muted">
              Consista tracks every day you follow through. Required tasks build your streak.
              Optional tasks add to your insights without pressure.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <CountUpValue
                  value={consistencyStats.currentStreak}
                  className="text-[clamp(48px,7vw,60px)] font-semibold leading-none tracking-[-0.04em] text-accent"
                />
                <p className="mt-2 max-w-[24ch] text-sm text-muted">
                  {consistencyStats.currentStreakLabel}
                </p>
              </div>
              <div>
                <CountUpValue
                  value={consistencyStats.longestStreak}
                  className="text-[clamp(48px,7vw,60px)] font-semibold leading-none tracking-[-0.04em] text-fg"
                />
                <p className="mt-2 max-w-[24ch] text-sm text-muted">
                  {consistencyStats.longestStreakLabel}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <CountUpValue
                  value={consistencyStats.monthlyRate}
                  className="text-[clamp(48px,7vw,60px)] font-semibold leading-none tracking-[-0.04em] text-success"
                />
                <p className="mt-2 max-w-[24ch] text-sm text-muted">
                  {consistencyStats.monthlyRateLabel}
                </p>
              </div>
              <div>
                <CountUpValue
                  value={consistencyStats.totalDays}
                  className="text-[clamp(48px,7vw,60px)] font-semibold leading-none tracking-[-0.04em] text-fg"
                />
                <p className="mt-2 max-w-[24ch] text-sm text-muted">
                  {consistencyStats.totalDaysLabel}
                </p>
              </div>
            </div>
          </MotionDiv>
          
          
          {/* ===================================== */}
          {/* Right Column — Calendar */}
          {/* ===================================== */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.985 }}
            className="rounded-2xl border border-border bg-surface/50 p-6 cursor-pointer select-none transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fg">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h3>
              <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-accent">
                87% consistent
              </span>
            </div>


            {/* =========================== */}
            {/* Day Headers */}
            {/* =========================== */}
            <div className="mb-1 grid grid-cols-7 gap-0.5">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span
                  key={d}
                  className="text-center text-xs text-muted"
                >
                  {d}
                </span>
              ))}
            </div>
            

            {/* =========================== */}
            {/* Calendar Grid */}
            {/* =========================== */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-20px" }}
              className="grid grid-cols-7 gap-1"
            >
              {calendarDays.map((day, i) => (
                <motion.div
                  key={i}
                  variants={cell}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className={`aspect-square rounded ${statusStyles[day.status]}`}
                />
              ))}
            </motion.div>


            {/* ============================= */}
            {/* Content — Legend */}
            {/* ============================= */}
            <div className="mt-3 flex gap-5">
              {[
                { color: "bg-success", label: "Successful" },
                { color: "bg-missed", label: "Missed" },
                { color: "bg-fg-soft", label: "No activity" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-sm ${item.color}`} />
                  <span className="text-xs text-muted">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
