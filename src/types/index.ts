import type { LucideIcon } from "lucide-react";

export type SectionId = "acasa" | "servicii" | "de-ce-noi" | "proces" | "contact";

export type NavSectionId = Exclude<SectionId, "acasa">;

export type ServiceId = "deratizare" | "dezinsectie" | "dezinfectie";

export type AdvantageId = "rapid" | "substante" | "personal" | "garantie";

export type ProcessStepId = "contact" | "evaluare" | "interventie";

export type AudienceId = "residential" | "commercial";

export interface Service {
  id: ServiceId;
  icon: LucideIcon;
}

export interface Advantage {
  id: AdvantageId;
  icon: LucideIcon;
}

export interface ProcessStep {
  id: ProcessStepId;
  number: string;
  icon: LucideIcon;
}

export interface Audience {
  id: AudienceId;
  icon: LucideIcon;
}

export type ServiceOption = ServiceId | "nu-stiu";

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: ServiceOption | "";
  message: string;
}

export type ContactFormField = keyof ContactFormData;

export type ContactFormErrorCode =
  | "nameRequired"
  | "nameTooShort"
  | "nameInvalid"
  | "phoneRequired"
  | "phoneInvalid"
  | "emailInvalid"
  | "messageRequired"
  | "messageTooShort"
  | "messageTooLong";

export type ContactFormErrors = Partial<Record<ContactFormField, ContactFormErrorCode>>;

interface TextItem {
  title: string;
  description: string;
}

export interface NavDictionary {
  ariaLabel: string;
  homeLabel: string;
  items: Record<NavSectionId, string>;
  cta: string;
  mobileCta: string;
  openMenu: string;
  closeMenu: string;
  languageLabel: string;
  themeLabel: string;
  themeMenu: string;
}

export interface FormDictionary {
  legend: string;
  name: { label: string; placeholder: string };
  phone: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  service: { label: string; placeholder: string; unsure: string };
  message: { label: string; placeholder: string; hint: string };
  optional: string;
  requiredBefore: string;
  requiredAfter: string;
  demoNote: string;
  submit: string;
  submitting: string;
  liveSubmitting: string;
  successTitle: string;
  successText: string;
  reset: string;
  errors: Record<ContactFormErrorCode, string>;
}

export interface Dictionary {
  meta: { title: string; description: string; keywords: string[] };
  common: { skipToContent: string };
  nav: NavDictionary;
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustPoints: string[];
    legendPest: string;
    legendNeutralized: string;
    legendProtected: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    audiencesLabel: string;
    audiences: Record<AudienceId, { label: string; detail: string }>;
    items: Record<ServiceId, TextItem & { highlights: string[] }>;
    cardCta: string;
    cardCtaFor: string;
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    items: Record<AdvantageId, TextItem>;
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    stepLabel: string;
    steps: Record<ProcessStepId, TextItem>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    nextStepsTitle: string;
    nextSteps: string[];
    hours: string;
    visits: string;
    demoNote: string;
    emailSubject: string;
    emailBody: string;
  };
  form: FormDictionary;
  footer: {
    tagline: string;
    navLabel: string;
    navTitle: string;
    servicesTitle: string;
    contactTitle: string;
    area: string;
    copyright: string;
    backToTop: string;
  };
}
