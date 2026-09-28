import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em]",
          isLight ? "text-accent-700" : "text-accent-400",
        )}
      >
        <span aria-hidden className={cn("h-px w-6", isLight ? "bg-accent-700/60" : "bg-accent-400/60")} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          isLight ? "text-ink-900" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-pretty sm:text-lg",
            isLight ? "text-ink-700/80" : "text-slate-400",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
