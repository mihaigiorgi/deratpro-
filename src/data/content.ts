import { BadgeCheck, Bug, ClipboardCheck, FlaskConical, MessageSquareText, Rat, ShieldCheck, SprayCan, Timer, Wrench } from "lucide-react";

import type { Advantage, NavItem, ProcessStep, Service, ServiceOption } from "@/types";
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


export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Ne contactezi",
    description: "Completezi formularul sau ne contactezi pentru a descrie problema.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: "Evaluăm situația",
    description: "Discutăm situația și identificăm soluția potrivită pentru spațiul tău.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Intervenim",
    description: "Echipa noastră efectuează intervenția în condiții profesionale și sigure.",
    icon: Wrench,
  },
];


export const SERVICE_OPTIONS: { value: ServiceOption; label: string }[] = [
  ...SERVICES.map((service) => ({ value: service.id, label: service.title })),
  { value: "nu-stiu", label: "Nu sunt sigur — am nevoie de o evaluare" },
];


const EMAIL = "contact@deratpro.example";
const EMAIL_SUBJECT = "Solicitare ofertă — DeratPro";
const EMAIL_BODY = "Bună ziua,\n\nAș dori o ofertă pentru:\n\nTip spațiu (locuință / firmă):\nProblema observată:\nLocalitate:\nTelefon:\n\nMulțumesc!";


export const DEMO_CONTACT = {
  phoneDisplay: "+40 700 000 000",
  phoneHref: "tel:+40700000000",
  email: EMAIL,
  /** Deschide un email nou, cu destinatarul, subiectul și un șablon de mesaj deja completate. */
  emailHref: `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`,
  area: "România",
} as const;