"use client";

import { motion } from "motion/react";

const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 };
const viewport = { once: true, margin: "0px 0px -20% 0px" } as const;

export function ProcessLine() {
  return (
    <div aria-hidden>
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewport}
        transition={transition}
        className="absolute top-7 bottom-7 left-7 w-px origin-top bg-linear-to-b from-accent-400/70 via-accent-400/30 to-white/5 md:hidden"
      />

      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={transition}
        className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-px origin-left bg-linear-to-r from-accent-400/70 via-accent-400/30 to-accent-400/70 md:block"
      />
    </div>
  );
}
