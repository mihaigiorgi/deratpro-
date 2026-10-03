import { LOCALE_NAMES, LOCALES, localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  hash?: string | null;
  className?: string;
}

export function LanguageSwitcher({ locale, label, hash, className }: LanguageSwitcherProps) {
  const suffix = hash && hash !== "acasa" ? `#${hash}` : "";

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center rounded-full border border-white/10 p-0.5 text-xs font-medium", className)}
    >
      {LOCALES.map((option) => {
        const isActive = option === locale;
        return (
          <a
            key={option}
            href={`${localePath(option)}${suffix}`}
            hrefLang={option}
            lang={option}
            aria-label={LOCALE_NAMES[option]}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "flex h-9 min-w-10 items-center justify-center rounded-full px-2.5 uppercase transition-colors duration-300",
              isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white",
            )}
          >
            {option}
          </a>
        );
      })}
    </div>
  );
}
