import type { MetadataRoute } from "next";

import { LOCALES, localePath } from "@/i18n/config";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((locale) => [locale, `${SITE.url}${localePath(locale)}`]));

  return LOCALES.map((locale) => ({
    url: `${SITE.url}${localePath(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
