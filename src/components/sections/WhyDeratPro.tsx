import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADVANTAGES } from "@/data/content";

export function WhyDeratPro() {
  return (
    <section
      id="de-ce-noi"
      aria-labelledby="de-ce-noi-title"
      className="relative isolate overflow-hidden bg-mist-100 py-24 text-ink-900 sm:py-32"
    >
      <div
        aria-hidden
        className="bg-grid-light absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
      />

      <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="de-ce-noi-title"
            tone="light"
            eyebrow="De ce DeratPro"
            title="Siguranță, rapiditate și rezultate pe care te poți baza."
            description="Tratăm fiecare intervenție ca pe un proiect: înțelegem problema, alegem metoda potrivită și lucrăm curat, discret și responsabil."
          />
          <div className="mt-8">
            <Button href="#contact" variant="dark" size="lg">
              Discută cu un specialist
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
              />
            </Button>
          </div>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {ADVANTAGES.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <li key={advantage.title} className={index % 2 === 1 ? "sm:translate-y-10" : undefined}>
                <Reveal delay={index * 0.08} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-(--radius-card) border border-ink-900/8 bg-mist-50 p-6 shadow-card-light transition-[box-shadow,border-color] duration-500 hover:border-ink-900/15 hover:shadow-[0_24px_48px_-24px_rgb(7_12_23/0.28)] sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-ink-900 text-accent-400 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-105">
                        <Icon aria-hidden className="size-5.5" strokeWidth={1.75} />
                      </span>
                      <span aria-hidden className="font-mono text-4xl font-medium tracking-tighter text-ink-900/7">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold tracking-tight">{advantage.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink-700/75">{advantage.description}</p>
                    <span
                      aria-hidden
                      className="mt-6 h-0.5 w-8 origin-left rounded-full bg-accent-500 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-x-[2.5]"
                    />
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
