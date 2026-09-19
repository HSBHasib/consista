"use client";

import { MotionDiv } from "@/components/motion/Motion-div";
import { leaderboardEntries } from "@/data/landing.data";

export function LeaderboardSection() {
  return (
    <section id="leaderboard" className="border-t border-border py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1120px] px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                Community
              </p>
              <h2 className="text-[clamp(28px,3.5vw,42px)] font-semibold leading-[1.1] tracking-[-0.015em] text-fg">
                Yearly Top 10 Leaderboard
              </h2>
            </div>
            <p className="max-w-[60ch] text-[18px] leading-relaxed text-muted">
              See how you stack up against other consistent performers. A healthy competition that drives everyone forward.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-surface"
          >
            {leaderboardEntries.map((entry) => (
              <div
                key={entry.rank}
                className="grid items-center gap-4 border-b border-border px-6 py-4 last:border-b-0 transition-colors duration-200 hover:bg-fg-soft/50"
                style={{ gridTemplateColumns: "40px 1fr auto" }}
              >
                <span
                  className={`text-xl font-bold ${
                    entry.rankClass === "gold"
                      ? "text-[color-mix(in_srgb,var(--color-accent)_60%,#b8860b)]"
                      : entry.rankClass === "silver"
                        ? "text-muted"
                        : entry.rankClass === "bronze"
                          ? "text-[color-mix(in_srgb,var(--color-accent)_40%,#a0522d)]"
                          : "text-muted"
                  }`}
                >
                  {entry.rank}
                </span>
                <span className={`font-medium ${entry.name === "You" ? "text-success font-semibold" : "text-fg"}`}>
                  {entry.name}
                </span>
                <span className="text-sm font-semibold text-accent">
                  {entry.score}
                </span>
              </div>
            ))}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

