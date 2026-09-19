"use client";

import { MotionDiv } from "@/components/motion/Motion-div";
import { insightCategories } from "@/data/landing.data";

export function BehavioralInsightsSection() {
  return (
    <section id="insights" className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-295 px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ============================== */}
          {/* Left Column — Radar Chart */}
          {/* ============================== */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-surface/40 p-10"
          >
            <div className="relative mx-auto aspect-square max-w-70">
              <svg viewBox="0 0 280 280" fill="none" className="h-full w-full">
                <polygon points="140,28 218,78 238,162 178,240 102,240 42,162 62,78" stroke="var(--color-border)" strokeWidth="1" />
                <polygon points="140,56 196,94 210,154 162,216 118,216 70,154 84,94" stroke="var(--color-border)" strokeWidth="1" />
                <polygon points="140,84 174,110 182,146 146,192 134,192 98,146 106,110" stroke="var(--color-border)" strokeWidth="1" />
                <polygon
                  points="140,42 210,86 196,168 130,228 90,200 56,138 78,72"
                  fill="color-mix(in srgb, var(--color-accent) 15%, transparent)"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                />
                {[
                  [140, 42], [210, 86], [196, 168], [130, 228], [90, 200], [56, 138], [78, 72],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="var(--color-accent)" />
                ))}
              </svg>
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.04em] text-fg">
                Study
              </span>
              <span className="absolute right-[-12px] top-[18%] text-xs uppercase tracking-[0.04em] text-fg">
                Work
              </span>
              <span className="absolute bottom-[18%] right-[-12px] text-xs uppercase tracking-[0.04em] text-fg">
                Exercise
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.04em] text-fg">
                Reading
              </span>
              <span className="absolute bottom-[18%] left-[-12px] text-xs uppercase tracking-[0.04em] text-fg">
                Growth
              </span>
            </div>
          </MotionDiv>


          {/* ============================== */}
          {/* Right Column — Radar Chart Data */}
          {/* ============================== */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                Behavioral Insights
              </p>
              <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.015em] text-fg">
                Where is your effort actually going?
              </h2>
            </div>
            <p className="max-w-[60ch] text-[18px] leading-relaxed text-muted">
              The radar chart is derived from your real task completions. Finish more study tasks? Study grows.
              Skip exercise? That sector shrinks. It reflects you, not a preset.
            </p>
            <div className="flex flex-col gap-3">
              {insightCategories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div
                    className="h-2 w-2 rounded-full bg-accent"
                    style={{ opacity: cat.opacity }}
                  />
                  <span className="text-sm text-fg">
                    <strong>{cat.name}</strong> — {cat.percentage}% of completed tasks
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs italic text-muted">
              Not a psychological assessment — a behavioral productivity visualization.
            </p>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}