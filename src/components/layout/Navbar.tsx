"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NAV_ITEMS } from "@/data/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["acasa", ...NAV_ITEMS.map((item) => item.href.slice(1))];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (event: MediaQueryListEvent) => event.matches && setOpen(false);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const elevated = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          elevated
            ? "border-white/8 bg-ink-900/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <Container
          as="nav"
          aria-label="Navigare principală"
          className="flex h-16 items-center justify-between gap-6 md:h-18"
        >
          <a href="#acasa" className="rounded-lg" aria-label="DeratPro — înapoi sus" onClick={closeMenu}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative isolate rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-400 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button href="#contact" size="md" className="max-md:hidden">
              Solicită ofertă
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
              />
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="meniu-mobil"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/5 md:hidden"
            >
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="meniu-mobil"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/8 bg-ink-900/95 backdrop-blur-xl md:hidden"
          >
            <Container className="flex h-full flex-col pt-6 pb-8">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.35 }}
                    className="border-b border-white/6"
                  >
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight text-white"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <Button href="#contact" size="lg" onClick={closeMenu} className="mt-auto w-full">
                Solicită o ofertă
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
