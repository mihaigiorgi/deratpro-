import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/data/content";

import { ProcessLine } from "./ProcessLine";

export function Process() {
  return (
    <section id="proces" aria-labelledby="proces-title" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="proces-title"
            align="center"
            eyebrow="Cum funcționează"
            title="Trei pași până la un spațiu protejat"
            description="Un proces simplu și transparent. Știi de la început ce urmează și ce trebuie să pregătești."
          />
        </Reveal>

        <div className="relative mt-16 sm:mt-20">
          <ProcessLine />

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.number} className="relative pl-20 md:pl-0 md:text-center">
                  <Reveal delay={0.15 + index * 0.15}>
                    <div className="absolute top-0 left-0 md:static md:mx-auto md:w-fit">
                      <span className="relative flex size-14 items-center justify-center rounded-2xl border border-accent-400/25 bg-ink-850 text-accent-400 shadow-[0_0_0_8px_var(--color-ink-900)]">
                        <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                      </span>
                    </div>
                    <p className="font-mono text-xs tracking-[0.18em] text-accent-400 md:mt-8">
                      <span className="sr-only">Pasul </span>
                      {step.number}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-400 md:mx-auto md:max-w-xs">{step.description}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
