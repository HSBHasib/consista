"use client";

import { motion } from "framer-motion";
import { MotionDiv } from "@/components/motion/Motion-div";
import { useCountUp } from "@/hooks/useCountUp";
import { reportStats, reportSummary, monthBars } from "@/data/landing.data";

function parseNumericValue(val: string): number {
  return parseInt(val.replace(/[^0-9]/g, ""), 10) || 0;
}

function hasPercent(val: string): boolean {
  return val.includes("%");
}

function ReportCountUp({ value, className }: { value: string; className?: string }) {
  const num = parseNumericValue(value);
  const { count, ref } = useCountUp(num, 1400);
  const display = hasPercent(value) ? `${count}%` : count.toLocaleString();
  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}

const barContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.2 },
  },
};

const barItem = {
  hidden: { opacity: 0, scaleY: -0.30 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export function YearlyReportSection() {

  const currentYear = new Date();

  return (
    <section id="report" className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-295 px-8">
        
        {/* ============================ */}
        {/* Annual Report — Title */}
        {/* ============================ */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-[80ch] text-center"
        >
          <div className="flex justify-center items-center flex-col">

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            Annual Report
          </p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.015em] text-fg">
            Your year, summarized beautifully.
          </h2>
          <p className="mt-3 max-w-[60ch] text-[18px] leading-relaxed text-muted">
            A complete performance report with month-by-month breakdown, streak history, and final rank.
          </p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border bg-surface/50 p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-fg">{currentYear.getFullYear() - 1 } Performance Report</h3>
              <p className="mt-1 text-xs text-muted">Generated Dec 31, {currentYear.getFullYear() - 1}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py- text-[11px] font-semibold uppercase tracking-[0.04em] text-accent">
              Final Rank: #12
            </span>
          </div>

          <div className="mb-6 grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-4">
            {reportStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="text-center cursor-default rounded-lg p-2 transition-colors hover:bg-fg-soft/50"
              >
                <ReportCountUp
                  value={stat.value}
                  className={`text-[28px] font-bold leading-none tracking-[-0.02em] ${stat.colorClass || "text-fg"}`}
                />
                <div className="mt-1 text-[11px] uppercase tracking-[0.04em] text-muted">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          

          {/* ============================ */}
          {/* Monthly Breakdown */}
          {/* ============================ */}
          <div className="mb-6 border-t border-border pt-5">
            <p className="mb-4 text-center text-xs uppercase tracking-[0.06em] text-muted">
              Monthly Breakdown
            </p>
            <motion.div
              variants={barContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-20px" }}
              className="grid grid-cols-12 gap-2 text-center"
            >
              {monthBars.map((bar) => (
                <motion.div
                  key={bar.label}
                  variants={barItem}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="cursor-pointer"
                  style={{ transformOrigin: "bottom" }}
                >
                  <div
                    className="mx-auto rounded-t transition-shadow hover:shadow-sm"
                    style={{
                      height: bar.height,
                      width: "100%",
                      background: bar.filled
                        ? `color-mix(in srgb, var(--color-success) 100%, transparent)`
                        : "var(--color-fg-soft)",
                      opacity: bar.filled ? bar.opacity : 1,
                    }}
                  />
                  <span className="mt-1 text-[11px] text-muted">
                    {bar.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>


          {/* =========================== */}
          {/* Report Summary */}
          {/* =========================== */}
          <div className="grid grid-cols-2 gap-6 border-t border-border pt-5 sm:grid-cols-4">
            {reportSummary.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.03 }}
                className="cursor-default rounded-lg p-2 transition-colors hover:bg-fg-soft/50"
              >
                <span className="text-xs text-muted">{item.label}</span>
                <div className="mt-1 text-lg font-semibold text-fg">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
