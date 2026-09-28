import { ArrowUpRight, Check } from "lucide-react";

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index: number;
}

/** Server Component — singura parte interactivă (spotlight) e în <SpotlightCard>. */
export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <SpotlightCard aria-labelledby={`serviciu-${service.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-white/8 bg-ink-800/60 p-6 shadow-card transition-[border-color,transform] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-accent-400/30 sm:p-7"
    >
      <div className="relative flex items-start justify-between">
        <span className="flex size-13 items-center justify-center rounded-2xl border border-accent-400/20 bg-accent-400/10 text-accent-400 transition-[transform,background-color] duration-500 ease-(--ease-out-expo) group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-accent-400/15">
          <Icon aria-hidden className="size-6" strokeWidth={1.75} />
        </span>
        <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
      </div>

      <h3 id={`serviciu-${service.id}`} className="relative mt-8 text-xl font-semibold tracking-tight text-white">
        {service.title}
      </h3>
      <p className="relative mt-3 leading-relaxed text-slate-400">{service.description}</p>

      <ul className="relative mt-6 space-y-2.5 border-t border-white/6 pt-6 text-sm text-slate-300">
        {service.highlights.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-400" />
            {item}
          </li>
        ))}
      </ul>

      <a href="#contact" className="relative mt-auto inline-flex items-center gap-1.5 self-start rounded-md pt-8 text-sm font-medium text-white transition-colors hover:text-accent-300">
        Solicită ofertă<span className="sr-only"> pentru {service.title.toLowerCase()}</span>
        <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </SpotlightCard>
  );
}