import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** Logo DeratPro: un scut (protecție) cu un gândac în interior (dăunătorul ținut sub control). */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0" fill="none">
        {/* Fundal */}
        <rect width="32" height="32" rx="9" className="fill-accent-400" />
        {/* Scut */}
        <path
          d="M16 5.8 7.8 8.9v6.8c0 5.1 3.4 9.1 8.2 10.9 4.8-1.8 8.2-5.8 8.2-10.9V8.9L16 5.8Z"
          className="stroke-ink-900"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        {/* Gândac: picioare și antene */}
        <path
          d="M13.4 15.2l-2-1.1M13.2 17.6h-2.2M13.4 19.9l-2 1.2M18.6 15.2l2-1.1M18.8 17.6h2.2M18.6 19.9l2 1.2M15.3 11.6l-1.2-1.6M16.7 11.6l1.2-1.6"
          className="stroke-ink-900"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Gândac: cap și corp */}
        <circle cx="16" cy="12.6" r="1.55" className="fill-ink-900" />
        <ellipse cx="16" cy="17.4" rx="3.1" ry="4" className="fill-ink-900" />
        {/* Linia dintre aripi */}
        <path d="M16 14.2v6.8" className="stroke-accent-400" strokeWidth="0.8" />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-white">
        Derat<span className="text-accent-400">Pro</span>
      </span>
    </span>
  );
}