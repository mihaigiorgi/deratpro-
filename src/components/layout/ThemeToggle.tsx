"use client";

import { Moon, Sun } from "lucide-react";

import { applyTheme, readTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  label: string;
  className?: string;
}

export function ThemeToggle({ label, className }: ThemeToggleProps) {
  const toggle = () => applyTheme(readTheme() === "light" ? "dark" : "light");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-fg/10 text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg",
        className,
      )}
    >
      <Sun aria-hidden className="size-4.5 light:hidden" />
      <Moon aria-hidden className="hidden size-4.5 light:block" />
    </button>
  );
}
