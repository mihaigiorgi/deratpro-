import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optionalLabel?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, error, hint, optionalLabel, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg-strong">
          {label}
          {!optionalLabel && (
            <span aria-hidden className="ml-0.5 text-brand">
              *
            </span>
          )}
        </label>
        {optionalLabel && <span className="text-xs text-fg-subtle">{optionalLabel}</span>}
      </div>

      {children}

      <div className="min-h-6 pt-1.5 text-xs leading-snug">
        {error ? (
          <p id={`${id}-error`} className="flex items-start gap-1.5 text-danger">
            <AlertCircle aria-hidden className="mt-px size-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          hint && (
            <p id={`${id}-hint`} className="text-fg-subtle">
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
    "w-full rounded-xl border bg-page/60 px-4 text-[0.95rem] text-fg placeholder:text-fg-subtle",
    "transition-[border-color,box-shadow,background-color] duration-200",
    "focus:bg-page focus:outline-none focus:ring-4",
    hasError
      ? "border-danger-line/60 focus:border-danger-line focus:ring-danger-line/15"
      : "border-fg/10 hover:border-fg/20 focus:border-brand/70 focus:ring-brand/15",
  );
}
