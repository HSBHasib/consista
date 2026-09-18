"use client";

import { MotionDiv } from "@/components/motion/Motion-div";
import { flowSteps } from "@/data/landing.data";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-295 px-8">

        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-[65ch] text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            How It Works
          </p>
          <h2 className="text-[clamp(32px,4vw,42px)] font-semibold leading-[1.14] tracking-[-0.015em] text-fg">
            One loop. Every day. Compounding results.
          </h2>
          <p className="mt-3 text-sm text-muted">
            Designed to eliminate friction, anchor daily execution, and compound momentum quietly.
          </p>
        </MotionDiv>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {flowSteps.map((step, index) => (
            <MotionDiv
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-[#faf6f0]/80 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-[#faf6f0] shadow"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-xs font-bold text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono text-muted/60">
                    Phase {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>

              {/* Subtle bottom progress/accent line on hover */}
              <div className="mt-6 h-0.5 w-full overflow-hidden rounded-full bg-border/40">
                <div className="h-full w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </MotionDiv>
          ))}
        </div>

      </div>
    </section>
  );
}
