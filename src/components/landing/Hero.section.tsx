"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { MotionDiv } from "@/components/motion/Motion-div";
import { heroData, dashboardMockData } from "@/data/landing.data";
import { getDynamicDashboardData } from "@/utils/dashboard";

const titleWords = heroData.title.split(" ");

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.30 },
  },
};

const word = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  // =============================
  // Fetch Dynamic Dashboard Data
  // =============================
  const dynamicInfo = getDynamicDashboardData("Hasib");
  const UserData = {
    ...dashboardMockData,
    greeting: dynamicInfo.greeting,
    date: dynamicInfo.date,
  };


  return (
    <section className="py-[clamp(60px,10vw,70px)]">
      <div className="mx-auto max-w-295 px-8">
        <div className="grid items-center gap-24 lg:grid-cols-2">
          
          {/* =============================== */}
          {/* Left Column — Content */}
          {/* =============================== */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              {heroData.tagline}
            </p>
            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="text-[clamp(40px,5.5vw,50px)] font-semibold leading-[1.02] tracking-[-0.02em] text-fg"
            >
              {titleWords.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className="mr-[0.3em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </motion.h1>
            <p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-muted">
              {heroData.lead}
            </p>
            <div className="mt-7 inline-flex gap-3">
              <Link href="/signup">
                <Button
                  variant="primary"
                  className="bg-accent hover:bg-accent/90 transition-colors duration-100 text-white rounded-lg"
                >
                  {heroData.primaryCta}
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-fg border border-border rounded-lg bg-muted/10 hover:bg-muted/15 transition-colors duration-100"
                >
                  {heroData.secondaryCta}{" "}
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Button>
              </Link>
            </div>
          </MotionDiv>


          {/* =============================== */}
          {/* Right Column — Dashboard Preview */}
          {/* =============================== */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-border bg-surface/40 p-6 shadow-[0_8px_32px_rgba(44,40,37,0.06)]"
          >
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <div>
                <div className="text-lg font-semibold text-fg">
                  {/* {greeting} */}  {UserData.greeting}
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  {/* {date} */}
                  {UserData.date}
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-accent">
                {UserData.streak}
              </span>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-3">
              {UserData.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl bg-fg-soft/80 p-3.5 text-center"
                >
                  <div className="text-[26px] font-bold leading-none text-accent">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.04em] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div>
              {UserData.tasks.map((task) => (
                <div
                  key={task.text}
                  className="flex items-center gap-2.5 border-b border-border py-2.5 text-sm last:border-b-0"
                >
                  <div
                    className={`h-4.5 w-4.5 shrink-0 rounded-full border-2 ${
                      task.done ? "border-success bg-success" : "border-border"
                    }`}
                  />
                  <span
                    className={`flex-1 ${task.done ? "text-muted line-through" : "text-fg"}`}
                  >
                    {task.text}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.04em] font-normal ${
                      task.required
                        ? "bg-accent-soft text-accent"
                        : "bg-fg-soft text-muted"
                    }`}
                  >
                    {task.required ? "Required" : "Optional"}
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

