"use client";

import type { HTMLAttributes, PointerEvent } from "react";

export function SpotlightCard({ children, ...props }: HTMLAttributes<HTMLElement>) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <article onPointerMove={handlePointerMove} {...props}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgb(184 242 74 / 0.09), transparent 60%)",
        }}
      />
      {children}
    </article>
  );
}
