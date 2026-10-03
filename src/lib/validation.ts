import type { ContactFormData, ContactFormErrorCode, ContactFormErrors, ContactFormField } from "@/types";

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;
export const NAME_MIN_LENGTH = 2;

export const ERROR_TEMPLATE_VALUES: Partial<Record<ContactFormErrorCode, Record<string, number>>> = {
  nameTooShort: { min: NAME_MIN_LENGTH },
  messageTooShort: { min: MESSAGE_MIN_LENGTH },
  messageTooLong: { max: MESSAGE_MAX_LENGTH },
};

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

type FieldValidator = (value: string) => ContactFormErrorCode | undefined;

const validators: Record<ContactFormField, FieldValidator> = {
  name: (raw) => {
    const value = raw.trim();
    if (!value) return "nameRequired";
    if (value.length < NAME_MIN_LENGTH) return "nameTooShort";
    if (!NAME.test(value)) return "nameInvalid";
    return undefined;
  },
  phone: (raw) => {
    if (!raw.trim()) return "phoneRequired";
    if (!isValidPhone(raw)) return "phoneInvalid";
    return undefined;
  },
  email: (raw) => {
    const value = raw.trim();
    if (!value) return undefined;
    if (!EMAIL.test(value)) return "emailInvalid";
    return undefined;
  },
  service: () => undefined,
  message: (raw) => {
    const value = raw.trim();
    if (!value) return "messageRequired";
    if (value.length < MESSAGE_MIN_LENGTH) return "messageTooShort";
    if (value.length > MESSAGE_MAX_LENGTH) return "messageTooLong";
    return undefined;
  },
};

export function validateField(field: ContactFormField, value: string): ContactFormErrorCode | undefined {
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
