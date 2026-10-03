export const LOCALES = ["ro", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ro";

export const LOCALE_NAMES: Record<Locale, string> = {
  ro: "Română",
  en: "English",
};

export const OG_LOCALES: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
};

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}
