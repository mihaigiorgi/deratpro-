import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEMO_CONTACT, emailHref, SERVICES } from "@/data/content";
import type { Dictionary, ServiceOption } from "@/types";

export function Contact({ dict }: { dict: Dictionary }) {
  const text = dict.contact;
  const serviceOptions: { value: ServiceOption; label: string }[] = [
    ...SERVICES.map((service) => ({ value: service.id, label: dict.services.items[service.id].title })),
    { value: "nu-stiu", label: dict.form.service.unsure },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-120 w-240 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-400/6 blur-[120px]"
      />

      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="flex flex-col">
          <SectionHeading id="contact-title" eyebrow={text.eyebrow} title={text.title} description={text.description} />

          <div className="mt-10 rounded-(--radius-card) border border-white/8 bg-white/2 p-6">
            <p className="font-mono text-xs tracking-[0.18em] text-slate-500 uppercase">{text.nextStepsTitle}</p>
            <ol className="mt-5 space-y-4">
              {text.nextSteps.map((step, index) => (
                <li key={step} className="flex items-center gap-3.5 text-sm text-slate-300">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-accent-400/25 font-mono text-xs text-accent-400">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <ul className="mt-8 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-1">
            <li className="flex items-center gap-3">
              <Phone aria-hidden className="size-4 text-accent-400" />
              <a href={DEMO_CONTACT.phoneHref} className="rounded text-slate-300 transition-colors hover:text-white">
                {DEMO_CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden className="size-4 text-accent-400" />
              <a
                href={emailHref(text.emailSubject, text.emailBody)}
                className="rounded text-slate-300 transition-colors hover:text-white"
              >
                {DEMO_CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <Clock aria-hidden className="size-4 text-accent-400" />
              {text.hours}
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <MapPin aria-hidden className="size-4 text-accent-400" />
              {text.visits}
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">{text.demoNote}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass relative rounded-(--radius-panel) p-5 shadow-card sm:p-8 lg:p-10">
            <span
              aria-hidden
              className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-accent-400/60 to-transparent"
            />
            <ContactForm dict={dict.form} serviceOptions={serviceOptions} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
