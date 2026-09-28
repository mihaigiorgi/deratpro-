"use client";

import { useEffect, useState } from "react";

/**
 * Returnează id-ul secțiunii aflate acum pe ecran.
 * Folosit ca să evidențiem link-ul corespunzător din meniu.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // O bandă subțire la ~35% din înălțimea ecranului: o singură secțiune o traversează la un moment dat.
      { rootMargin: "-35% 0px -64% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
