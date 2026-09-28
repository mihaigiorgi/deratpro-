"use client";

import { ArrowRight, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { controlClasses, Field, fieldA11y } from "@/components/ui/Field";
import { SERVICE_OPTIONS } from "@/data/content";
import { cn, wait } from "@/lib/utils";
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH, validateContactForm } from "@/lib/validation";
import type { ContactFormData, ContactFormErrors, ContactFormField } from "@/types";

type Status = "idle" | "submitting" | "success";

const INITIAL_DATA: ContactFormData = { name: "", phone: "", email: "", service: "", message: "" };

const FIELD_ORDER: ContactFormField[] = ["name", "phone", "email", "service", "message"];

const SIMULATED_LATENCY_MS = 1400;

export function ContactForm() {
  const [data, setData] = useState<ContactFormData>(INITIAL_DATA);
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const errors = useMemo(() => validateContactForm(data), [data]);

  const visibleErrors: ContactFormErrors = useMemo(() => {
    const result: ContactFormErrors = {};
    FIELD_ORDER.forEach((field) => {
      if ((touched[field] || submitAttempted) && errors[field]) result[field] = errors[field];
    });
    return result;
  }, [errors, touched, submitAttempted]);

  const hasVisibleErrors = Object.keys(visibleErrors).length > 0;
  const isSubmitting = status === "submitting";

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((previous) => ({ ...previous, [name]: value }));
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.target.name as ContactFormField;
    setTouched((previous) => (previous[field] ? previous : { ...previous, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    await wait(SIMULATED_LATENCY_MS);
    setStatus("success");
  };

  const reset = () => {
    setData(INITIAL_DATA);
    setTouched({});
    setSubmitAttempted(false);
    setStatus("idle");
  };

  return (
    <div className="relative">
      <p className="sr-only" role="status" aria-live="polite">
        {status === "submitting" && "Se trimite solicitarea…"}
        {status === "success" && "Mulțumim! Am primit solicitarea ta. Te vom contacta în cel mai scurt timp."}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-120 flex-col items-center justify-center px-2 py-10 text-center outline-none"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="flex size-16 items-center justify-center rounded-full bg-accent-400/12 text-accent-400 ring-8 ring-accent-400/5"
            >
              <CheckCircle2 aria-hidden className="size-8" strokeWidth={1.75} />
            </motion.span>
            <h3 className="mt-7 text-2xl font-semibold tracking-tight text-white">Mulțumim!</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-slate-400">
              Am primit solicitarea ta. Te vom contacta în cel mai scurt timp.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <RotateCcw aria-hidden className="size-4" />
              Trimite o nouă solicitare
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-describedby="form-note"
            aria-busy={isSubmitting}
          >
            <fieldset disabled={isSubmitting} className="grid gap-x-5 sm:grid-cols-2">
              <legend className="sr-only">Date de contact și detalii despre solicitare</legend>

              <Field id="name" label="Nume" error={visibleErrors.name}>
                <input
                  {...fieldA11y("name", visibleErrors.name)}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ex: Andrei Popescu"
                  aria-required
                  value={data.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(controlClasses(Boolean(visibleErrors.name)), "h-12")}
                />
              </Field>

              <Field id="phone" label="Telefon" error={visibleErrors.phone}>
                <input
                  {...fieldA11y("phone", visibleErrors.phone)}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="07xx xxx xxx"
                  aria-required
                  value={data.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(controlClasses(Boolean(visibleErrors.phone)), "h-12")}
                />
              </Field>

              <Field id="email" label="Email" optional error={visibleErrors.email}>
                <input
                  {...fieldA11y("email", visibleErrors.email)}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="nume@exemplu.ro"
                  value={data.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(controlClasses(Boolean(visibleErrors.email)), "h-12")}
                />
              </Field>

              <Field id="service" label="Serviciu dorit" optional>
                <div className="relative">
                  <select
                    {...fieldA11y("service")}
                    name="service"
                    value={data.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      controlClasses(false),
                      "h-12 appearance-none pr-10",
                      data.service === "" && "text-slate-500",
                    )}
                  >
                    <option value="">Alege un serviciu</option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="text-ink-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate-400"
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
                  </svg>
                </div>
              </Field>

              <Field
                id="message"
                label="Mesaj"
                className="sm:col-span-2"
                error={visibleErrors.message}
                hint={`Descrie pe scurt problema: tipul dăunătorului, spațiul, de când apare (minim ${MESSAGE_MIN_LENGTH} caractere).`}
              >
                <div className="relative">
                  <textarea
                    {...fieldA11y("message", visibleErrors.message, true)}
                    name="message"
                    rows={5}
                    maxLength={MESSAGE_MAX_LENGTH}
                    placeholder="Ex: Am observat gândaci în bucătărie de aproximativ două săptămâni…"
                    aria-required
                    value={data.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(controlClasses(Boolean(visibleErrors.message)), "resize-y py-3 pb-8")}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3.5 bottom-3 font-mono text-[0.7rem] text-slate-500"
                  >
                    {data.message.trim().length}/{MESSAGE_MAX_LENGTH}
                  </span>
                </div>
              </Field>
            </fieldset>

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p id="form-note" className="text-xs leading-relaxed text-slate-500 sm:max-w-xs">
                Câmpurile marcate cu <span className="text-accent-400">*</span> sunt obligatorii. Formular demonstrativ
                — datele nu sunt transmise către un server.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting || hasVisibleErrors} className="w-full sm:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 aria-hidden className="size-4 animate-spin" />
                    Se trimite…
                  </>
                ) : (
                  <>
                    Trimite solicitarea
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                    />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
