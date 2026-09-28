import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const TRUST_POINTS = ["Locuințe și spații comerciale", "Substanțe avizate", "Garanție pentru intervenții"];

export function Hero() {
  return (
    <section id="acasa" aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 md:pt-32 lg:flex lg:min-h-[min(100svh,56rem)] lg:items-center lg:pt-24 lg:pb-20"
    >
      {/* Fundal: grilă + două lumini difuze */}
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-accent-400/[0.07] blur-[120px]"
      />
      <div aria-hidden
        className="absolute bottom-[-20%] left-[-15%] -z-10 size-[36rem] rounded-full bg-sky-500/[0.05] blur-[120px]"
      />

      <Container className="relative">
        <div className="max-w-xl lg:max-w-[38rem]">
          <Reveal y={16}>
            <p className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-xs font-medium text-slate-300 sm:text-sm">
              <span className="relative flex size-2 rounded-full bg-accent-400 animate-pulse-dot" aria-hidden />
              Deratizare · Dezinsecție · Dezinfecție
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title"
              className="mt-6 text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-white min-[400px]:text-[2.6rem] sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
            >
              Protecție profesională împotriva{" "}
              <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                dăunătorilor.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-slate-400 sm:text-lg">
              Soluții rapide și eficiente de deratizare, dezinsecție și dezinfecție pentru locuințe și afaceri —
              aplicate de specialiști, cu impact minim asupra activității tale.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 min-[400px]:flex-row">
              <Button href="#contact" size="lg">
                Solicită o ofertă
                <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Button>
              <Button href="#servicii" size="lg" variant="secondary">
                Vezi serviciile
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-10 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-accent-400/12 text-accent-400">
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}