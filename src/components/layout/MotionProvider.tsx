"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Toate animațiile din site respectă setarea „reduce motion” din sistemul de operare. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}