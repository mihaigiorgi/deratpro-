"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import type { PointerTarget, SceneQuality } from "./HeroScene";

/*
 * Three.js is the heaviest dependency in the project, so the scene is:
 *  - code-split and loaded only on the client (no SSR for WebGL),
 *  - rendered only while the hero is on screen (frameloop "never" otherwise),
 *  - reduced on small / low-power devices,
 *  - frozen into a single static frame when the user prefers reduced motion.
 * Until the canvas is ready, a CSS placeholder with the same silhouette is shown,
 * so there is no layout shift and no empty box.
 */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const QUALITY_HIGH: SceneQuality = { particles: 720, shieldDetail: 3 };
const QUALITY_LOW: SceneQuality = { particles: 260, shieldDetail: 2 };

function detectQuality(): SceneQuality {
  const smallScreen = window.matchMedia("(max-width: 767px)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  return smallScreen || (coarsePointer && fewCores) ? QUALITY_LOW : QUALITY_HIGH;
}

export function HeroVisual({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quality, setQuality] = useState<SceneQuality | null>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const pointer = useRef<PointerTarget>({ x: 0, y: 0, active: false });

  useEffect(() => {
    setQuality(detectQuality());

    // Track the pointer on the whole hero section, normalised to the canvas box.
    const container = containerRef.current;
    const section = container?.closest("section");
    const onPointerMove = (event: PointerEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current.active = true;
    };
    const onPointerLeave = () => {
      pointer.current.active = false;
    };
    section?.addEventListener("pointermove", onPointerMove, { passive: true });
    section?.addEventListener("pointerleave", onPointerLeave);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const onMotionChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    motionQuery.addEventListener("change", onMotionChange);

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "100px",
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      section?.removeEventListener("pointermove", onPointerMove);
      section?.removeEventListener("pointerleave", onPointerLeave);
      observer.disconnect();
    };
  }, []);

  const frameloop = reducedMotion ? "demand" : visible ? "always" : "never";

  return (
    <div ref={containerRef} aria-hidden className={cn("relative", className)}>
      {/* Placeholder / fallback: same composition in pure CSS */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="relative aspect-square w-[46%] rounded-full border border-accent-400/25 shadow-[inset_0_0_60px_rgb(184_242_74/0.15)]">
          <div className="absolute inset-[42%] rounded-full bg-accent-400/80 blur-[2px]" />
        </div>
      </div>

      {quality && (
        <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
          <HeroScene quality={quality} frameloop={frameloop} pointer={pointer} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
