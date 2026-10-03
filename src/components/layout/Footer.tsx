import { ArrowUp } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { DEMO_CONTACT, emailHref, NAV_SECTIONS, SERVICES } from "@/data/content";
import type { Dictionary } from "@/types";

export function Footer({ dict }: { dict: Dictionary }) {
  const text = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fg/6 bg-page-deep">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_repeat(3,minmax(0,2fr))]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">{text.tagline}</p>
          </div>

          <nav aria-label={text.navLabel}>
            <h2 className="text-sm font-medium text-fg">{text.navTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="rounded text-fg-muted transition-colors hover:text-fg">
                    {dict.nav.items[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-fg">{text.servicesTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-fg-muted">
              {SERVICES.map((service) => (
                <li key={service.id}>{dict.services.items[service.id].title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-medium text-fg">{text.contactTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={DEMO_CONTACT.phoneHref} className="rounded text-fg-muted transition-colors hover:text-fg">
                  {DEMO_CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={emailHref(dict.contact.emailSubject, dict.contact.emailBody)}
                  className="rounded break-all text-fg-muted transition-colors hover:text-fg"
                >
                  {DEMO_CONTACT.email}
                </a>
              </li>
              <li className="text-fg-muted">{text.area}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-fg/6 pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} DeratPro. {text.copyright}
          </p>
          <a
            href="#acasa"
            className="inline-flex items-center gap-2 self-start rounded-full border border-fg/10 px-3.5 py-2 text-fg-soft transition-colors hover:border-fg/20 hover:text-fg sm:self-auto"
          >
            {text.backToTop}
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
