type ClassValue = string | false | null | undefined;

/** Unește clase CSS și ignoră valorile goale: cn("a", false && "b", "c") → "a c" */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}