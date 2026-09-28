import { Building2, Home } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/content";

import { ServiceCard } from "./ServiceCard";

const AUDIENCES = [
  { label: "Clienți casnici", detail: "Case, apartamente, spații anexe", icon: Home },
  { label: "Clienți comerciali", detail: "Birouri, HoReCa, depozite, retail", icon: Building2 },
];

export function Services() {
  return (
    <section id="servicii" aria-labelledby="servicii-title" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="servicii-title"
              eyebrow="Ce facem"
              title="Servicii profesionale"
              description="Trei servicii esențiale, adaptate fiecărui tip de spațiu. Fiecare intervenție începe cu o evaluare și se încheie cu recomandări de prevenție."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" aria-label="Pentru cine lucrăm">
              {AUDIENCES.map(({ label, detail, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <Icon aria-hidden className="size-5 text-accent-400" strokeWidth={1.75} />
                  <span className="text-sm">
                    <span className="block font-medium text-white">{label}</span>
                    <span className="text-slate-500">{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, index) => (
            <li key={service.id} className={index === 2 ? "md:col-span-2 lg:col-span-1" : undefined}>
              <Reveal delay={index * 0.08} className="h-full">
                <ServiceCard service={service} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}