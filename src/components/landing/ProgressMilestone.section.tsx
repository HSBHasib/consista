"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { MotionDiv } from "@/components/motion/Motion-div";

export function ProgressMilestoneSection() {
  return (
    <section className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[600px] px-8 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.015em] text-fg">
            Your progress is built one day at a time.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-muted">
            Start tracking your consistency today. See how small daily actions compound into meaningful results.
          </p>
          <div className="mt-8 inline-flex gap-3">
            <Link href="/signup">
              <Button variant="primary" className="bg-accent hover:bg-accent/90 transition-colors duration-100  text-white rounded-lg">
                Start Your Journey
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="ghost" className="text-fg border border-border rounded-lg bg-muted/10 hover:bg-muted/15 transition-colors duration-100">
                Learn More →
              </Button>
            </Link>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
