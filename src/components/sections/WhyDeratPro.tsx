import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADVANTAGES } from "@/data/content";
import type { Dictionary } from "@/types";

export function WhyDeratPro({ dict }: { dict: Dictionary["why"] }) {
  return (
    <section
      id="de-ce-noi"
      aria-labelledby="de-ce-noi-title"
      className="theme-invert relative isolate overflow-hidden bg-page-deep py-24 text-fg sm:py-32"
    >
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
      />

      <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="de-ce-noi-title"
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
          <div className="mt-8">
            <Button href="#contact" variant="contrast" size="lg">
              {dict.cta}
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
              <li key={advantage.id} className={index % 2 === 1 ? "sm:translate-y-10" : undefined}>
                <Reveal delay={index * 0.08} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-(--radius-card) border border-fg/8 bg-surface p-6 shadow-card transition-[box-shadow,border-color] duration-500 hover:border-fg/15 hover:shadow-[0_24px_48px_-24px_rgb(7_12_23/0.28)] sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-ink-900 text-accent-400 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-105">
                        <Icon aria-hidden className="size-5.5" strokeWidth={1.75} />
                      </span>
                      <span aria-hidden className="font-mono text-4xl font-medium tracking-tighter text-fg/7">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold tracking-tight">{dict.items[advantage.id].title}</h3>
                    <p className="mt-2.5 leading-relaxed text-fg-muted">{dict.items[advantage.id].description}</p>
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
