type ClassValue = string | false | null | undefined;

/** Unește clase CSS și ignoră valorile goale: cn("a", false && "b", "c") → "a c" */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}



export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}