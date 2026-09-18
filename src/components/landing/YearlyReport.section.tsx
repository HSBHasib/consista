"use client";

import { MotionDiv } from "@/components/motion/Motion-div";
import { reportStats, reportSummary, monthBars } from "@/data/landing.data";

export function YearlyReportSection() {
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
              <h3 className="text-lg font-semibold text-fg">2026 Performance Report</h3>
              <p className="mt-1 text-xs text-muted">Generated Dec 31, 2026</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py- text-[11px] font-semibold uppercase tracking-[0.04em] text-accent">
              Final Rank: #12
            </span>
          </div>

          <div className="mb-6 grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-4">
            {reportStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-[28px] font-bold leading-none tracking-[-0.02em] ${stat.colorClass || "text-fg"}`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.04em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 border-t border-border pt-5">
            <p className="mb-4 text-center text-xs uppercase tracking-[0.06em] text-muted">
              Monthly Breakdown
            </p>
            <div className="grid grid-cols-12 gap-2 text-center">
              {monthBars.map((bar) => (
                <div key={bar.label}>
                  <div
                    className="mx-auto rounded-t"
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
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-border pt-5 sm:grid-cols-4">
            {reportSummary.map((item) => (
              <div key={item.label}>
                <span className="text-xs text-muted">{item.label}</span>
                <div className="mt-1 text-lg font-semibold text-fg">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
