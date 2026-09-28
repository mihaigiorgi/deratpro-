"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { useIsClient, useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import type { PointerTarget, SceneQuality } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const QUALITY_HIGH: SceneQuality = { particles: 560, domeSegments: 64 };
const QUALITY_LOW: SceneQuality = { particles: 220, domeSegments: 40 };

function pickQuality(smallScreen: boolean, coarsePointer: boolean): SceneQuality {
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  return smallScreen || (coarsePointer && fewCores) ? QUALITY_LOW : QUALITY_HIGH;
}

export function HeroVisual({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  const isClient = useIsClient();
  const smallScreen = useMediaQuery("(max-width: 767px)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const quality = isClient ? pickQuality(smallScreen, coarsePointer) : null;
  const pointer = useRef<PointerTarget>({ x: 0, y: 0, active: false });

  useEffect(() => {
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

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "100px",
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      section?.removeEventListener("pointermove", onPointerMove);
      section?.removeEventListener("pointerleave", onPointerLeave);
      observer.disconnect();
    };
  }, []);

  const frameloop = reducedMotion ? "demand" : visible ? "always" : "never";

  return (
    <div ref={containerRef} aria-hidden className={cn("relative", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="aspect-[2/1] w-[52%] translate-y-[10%] rounded-t-full border border-b-0 border-accent-400/25 shadow-[inset_0_20px_60px_rgb(184_242_74/0.1)]" />
      </div>

      {quality && (
        <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
          <HeroScene quality={quality} frameloop={frameloop} pointer={pointer} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
