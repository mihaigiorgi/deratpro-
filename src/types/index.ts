import type { LucideIcon } from "lucide-react";

/** Id-urile secțiunilor de pe pagină — o singură sursă pentru toate link-urile. */
export type SectionId = "acasa" | "servicii" | "de-ce-noi" | "proces" | "contact";

export interface NavItem {
  label: string;
  href: `#${SectionId}`;
}

export interface Service {
  id: "deratizare" | "dezinsectie" | "dezinfectie";
  title: string;
  description: string;
  icon: LucideIcon;
  /** Ce include serviciul — afișat ca listă pe card. */
  highlights: string[];
}


export interface Advantage {
  title: string;
  description: string;
  icon: LucideIcon;
}