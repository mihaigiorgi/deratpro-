import type { ContactFormData, ContactFormErrors, ContactFormField } from "@/types";

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;
export const NAME_MIN_LENGTH = 2;
export function normalizePhone(value: string): string {
  return value.replace(/[\s\-.()/]/g, "");
}

const RO_PHONE = /^(?:\+40|0040)?0?[237]\d{8}$/;
const INTL_PHONE = /^\+(?!40)[1-9]\d{7,13}$/;

export function isValidPhone(value: string): boolean {
  const phone = normalizePhone(value);
  return RO_PHONE.test(phone) || INTL_PHONE.test(phone);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const NAME = /^[\p{L}][\p{L}\s'’-]*$/u;

type FieldValidator = (value: string) => string | undefined;

const validators: Record<ContactFormField, FieldValidator> = {
  name: (raw) => {
    const value = raw.trim();
    if (!value) return "Te rugăm să introduci numele.";
    if (value.length < NAME_MIN_LENGTH) return `Numele trebuie să aibă minim ${NAME_MIN_LENGTH} caractere.`;
    if (!NAME.test(value)) return "Numele poate conține doar litere, spații și cratime.";
    return undefined;
  },
  phone: (raw) => {
    if (!raw.trim()) return "Te rugăm să introduci un număr de telefon.";
    if (!isValidPhone(raw)) return "Numărul nu pare valid. Exemplu: 0722 123 456 sau +40 722 123 456.";
    return undefined;
  },
  email: (raw) => {
    const value = raw.trim();
    if (!value) return undefined;
    if (!EMAIL.test(value)) return "Adresa de email nu pare validă.";
    return undefined;
  },
  service: () => undefined,
  message: (raw) => {
    const value = raw.trim();
    if (!value) return "Te rugăm să descrii pe scurt situația.";
    if (value.length < MESSAGE_MIN_LENGTH) return `Mesajul trebuie să aibă minim ${MESSAGE_MIN_LENGTH} caractere.`;
    if (value.length > MESSAGE_MAX_LENGTH) return `Mesajul poate avea maxim ${MESSAGE_MAX_LENGTH} caractere.`;
    return undefined;
  },
};

export function validateField(field: ContactFormField, value: string): string | undefined {
  return validators[field](value);
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  (Object.keys(validators) as ContactFormField[]).forEach((field) => {
    const error = validateField(field, data[field]);
    if (error) errors[field] = error;
  });
  return errors;
}
