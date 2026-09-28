import { ArrowUp } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { DEMO_CONTACT, NAV_ITEMS, SERVICES } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 bg-ink-950">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_repeat(3,minmax(0,2fr))]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Servicii profesionale de deratizare, dezinsecție și dezinfecție pentru locuințe și afaceri.
            </p>
          </div>

          <nav aria-label="Navigare subsol">
            <h2 className="text-sm font-medium text-white">Navigare</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="rounded text-slate-400 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-white">Servicii</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {SERVICES.map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-medium text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={DEMO_CONTACT.phoneHref} className="rounded text-slate-400 transition-colors hover:text-white">
                  {DEMO_CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={DEMO_CONTACT.emailHref}
                  className="rounded break-all text-slate-400 transition-colors hover:text-white"
                >
                  {DEMO_CONTACT.email}
                </a>
              </li>
              <li className="text-slate-400">{DEMO_CONTACT.area}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-white/6 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} DeratPro. Proiect demonstrativ — brand fictiv, date de contact ilustrative.</p>
          <a
            href="#acasa"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-3.5 py-2 text-slate-300 transition-colors hover:border-white/20 hover:text-white sm:self-auto"
          >
            Înapoi sus
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
