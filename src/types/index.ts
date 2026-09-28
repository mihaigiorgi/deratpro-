import type { LucideIcon } from "lucide-react";


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
  highlights: string[];
}


export interface Advantage {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}



export type ServiceOption = Service["id"] | "nu-stiu";

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: ServiceOption | "";
  message: string;
}


export type ContactFormField = keyof ContactFormData;


export type ContactFormErrors = Partial<Record<ContactFormField, string>>;