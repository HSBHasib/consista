"use client";

import { motion } from "framer-motion";
import { MotionDiv } from "@/components/motion/Motion-div";
import { features } from "@/data/landing.data";

export function CoreFeaturesSection() {
  return (
    <section id="features" className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1120px] px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-[65ch]"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            Core Features
          </p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.015em] text-fg">
            Built for people who value consistency over intensity.
          </h2>
        </MotionDiv>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <MotionDiv
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="mb-5 grid h-10 w-10 place-items-center rounded-[10px] border border-border text-accent transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-sm"
              >
                <feature.icon className="h-5 w-5" />
              </motion.div>
              <h3 className="mb-1.5 text-base font-semibold text-fg">{feature.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{feature.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
