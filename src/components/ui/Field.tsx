import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, error, hint, optional, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-200">
          {label}
          {!optional && (
            <span aria-hidden className="ml-0.5 text-accent-400">
              *
            </span>
          )}
        </label>
        {optional && <span className="text-xs text-slate-500">opțional</span>}
      </div>

      {children}

      <div className="min-h-6 pt-1.5 text-xs leading-snug">
        {error ? (
          <p id={`${id}-error`} className="flex items-start gap-1.5 text-rose-300">
            <AlertCircle aria-hidden className="mt-px size-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          hint && (
            <p id={`${id}-hint`} className="text-slate-500">
              {hint}
            </p>
          )
        )}
      </div>
    </div>
  );
}

export function fieldA11y(id: string, error?: string, hasHint = false) {
  const describedBy = error ? `${id}-error` : hasHint ? `${id}-hint` : undefined;
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  } as const;
}

export function controlClasses(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-ink-900/60 px-4 text-[0.95rem] text-white placeholder:text-slate-500",
    "transition-[border-color,box-shadow,background-color] duration-200",
    "focus:bg-ink-900 focus:outline-none focus:ring-4",
    hasError
      ? "border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/15"
      : "border-white/10 hover:border-white/20 focus:border-accent-400/70 focus:ring-accent-400/15",
  );
}
