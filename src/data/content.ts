import {
  BadgeCheck,
  Bug,
  Building2,
  ClipboardCheck,
  FlaskConical,
  Home,
  MessageSquareText,
  Rat,
  ShieldCheck,
  SprayCan,
  Timer,
  Wrench,
} from "lucide-react";

import type { Advantage, Audience, NavSectionId, ProcessStep, Service } from "@/types";

export const NAV_SECTIONS: NavSectionId[] = ["servicii", "de-ce-noi", "proces", "contact"];

export const SERVICES: Service[] = [
  { id: "deratizare", icon: Rat },
  { id: "dezinsectie", icon: Bug },
  { id: "dezinfectie", icon: SprayCan },
];

export const AUDIENCES: Audience[] = [
  { id: "residential", icon: Home },
  { id: "commercial", icon: Building2 },
];

export const ADVANTAGES: Advantage[] = [
  { id: "rapid", icon: Timer },
  { id: "substante", icon: FlaskConical },
  { id: "personal", icon: BadgeCheck },
  { id: "garantie", icon: ShieldCheck },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: "contact", number: "01", icon: MessageSquareText },
  { id: "evaluare", number: "02", icon: ClipboardCheck },
  { id: "interventie", number: "03", icon: Wrench },
];

export const DEMO_CONTACT = {
  phoneDisplay: "+40 700 000 000",
  phoneHref: "tel:+40700000000",
  email: "contact@deratpro.example",
} as const;

export function emailHref(subject: string, body: string): string {
  return `mailto:${DEMO_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
