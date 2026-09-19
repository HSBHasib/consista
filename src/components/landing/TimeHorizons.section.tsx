"use client";

import { motion } from "framer-motion";
import { MotionDiv } from "@/components/motion/Motion-div";
import { horizons } from "@/data/landing.data";

const blockContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.15 },
  },
};

const block = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function TimeHorizonsSection() {
  return (
    <section id="timeline" className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-280 px-8">
        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mb-16 max-w-[65ch] text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            TIME HORIZONS
          </p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.015em] text-fg">
            Small daily actions become long-term insight.
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-muted">
            What you do today shapes your month. What you do this month defines your year.
          </p>
        </MotionDiv>

        {/*Tactile Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Time Horizon Cards */}
          {horizons.map((item, index) => (
            <MotionDiv
              key={item.badge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group flex flex-col justify-between rounded-3xl border border-border/85 bg-surface/50 p-7 text-center transition-all duration-300 hover:border-accent/40 hover:shadow-sm hover:-translate-y-0.5"
            >
              <div>   
                <div className="mb-7 flex h-30 items-center justify-center rounded-2xl bg-[#faf6f0]/60 shadow-sm p-5">
                  {item.previewType === "daily" && (
                    <motion.div
                      variants={blockContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="flex items-center gap-2 "
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          variants={block}
                          whileHover={{ scale: 1.2 }}
                          className={`h-4 w-4 rounded-sm transition-colors cursor-pointer ${
                            i < 4
                              ? "bg-success/70"
                              : i === 4
                              ? "bg-border/60"
                              : "bg-missed/70"
                          }`}
                        />
                      ))}
                    </motion.div>
                  )}

                  {item.previewType === "monthly" && (
                    <motion.div
                      variants={blockContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid grid-cols-10 gap-1.5 cursor-pointer"
                    >
                      {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                          key={i}
                          variants={block}
                          whileHover={{ scale: 1.2 }}
                          className={`h-3 w-3 rounded-xs ${
                            i < 27 ? "bg-success/70" : "bg-border/50"
                          }`}
                        />
                      ))}
                    </motion.div>
                  )}

                  {item.previewType === "yearly" && (
                    <motion.div
                      variants={blockContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid grid-cols-4 gap-2.5 cursor-pointer"
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          variants={block}
                          whileHover={{ scale: 1.15 }}
                          className="h-6 w-6 rounded-sm bg-success/70 shadow-xs"
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.08em] text-accent/80">
                  {item.badge}
                </span>
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}