import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/types";

import { en } from "./en";
import { ro } from "./ro";

const dictionaries: Record<Locale, Dictionary> = { ro, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
