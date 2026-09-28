import { BadgeCheck, Bug, FlaskConical, Rat, ShieldCheck, SprayCan, Timer } from "lucide-react";

import type { Advantage, NavItem, Service } from "@/types";
/*
 * Tot textul site-ului stă aici, separat de design.
 * DeratPro e un brand fictiv: afirmațiile sunt generale, fără certificări sau statistici inventate.
 */

export const NAV_ITEMS: NavItem[] = [
  { label: "Servicii", href: "#servicii" },
  { label: "De ce noi", href: "#de-ce-noi" },
  { label: "Proces", href: "#proces" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: Service[] = [
  {
    id: "deratizare",
    title: "Deratizare",
    description: "Eliminarea și prevenirea infestărilor cu rozătoare prin soluții eficiente și sigure.",
    icon: Rat,
    highlights: [
      "Inspecție și identificarea punctelor de acces",
      "Stații de momire securizate",
      "Recomandări de prevenție",
    ],
  },
  {
    id: "dezinsectie",
    title: "Dezinsecție",
    description: "Combaterea insectelor și prevenirea reapariției acestora în spații rezidențiale și comerciale.",
    icon: Bug,
    highlights: [
      "Gândaci, furnici, ploșnițe, țânțari",
      "Tratament adaptat tipului de insectă",
      "Plan de prevenire a reapariției",
    ],
  },
  {
    id: "dezinfectie",
    title: "Dezinfecție",
    description: "Igienizarea și dezinfectarea spațiilor pentru un mediu mai sigur și mai sănătos.",
    icon: SprayCan,
    highlights: [
      "Locuințe, birouri, spații comerciale",
      "Nebulizare și tratare a suprafețelor",
      "Produse biocide avizate",
    ],
  },
];


export const ADVANTAGES: Advantage[] = [
  {
    title: "Intervenție rapidă",
    description: "Răspundem prompt solicitărilor și programăm intervenția cât mai repede, inclusiv pentru situații urgente.",
    icon: Timer,
  },
  {
    title: "Substanțe avizate",
    description: "Folosim produse și soluții conforme cu standardele în vigoare, aplicate în doze controlate.",
    icon: FlaskConical,
  },
  {
    title: "Personal autorizat",
    description: "Intervențiile sunt realizate de personal instruit și specializat, echipat corespunzător.",
    icon: BadgeCheck,
  },
  {
    title: "Garanție",
    description: "Oferim garanție pentru serviciile efectuate, în funcție de tipul intervenției.",
    icon: ShieldCheck,
  },
];