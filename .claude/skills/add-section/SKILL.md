---
name: add-section
description: Adaugă o secțiune nouă pe landing page-ul DeratPro, respectând structura existentă (texte în dicționarele ro/en, Server Component, SectionHeading, Reveal, link în navbar). Folosește când utilizatorul cere o secțiune nouă (ex. FAQ, zone deservite, prețuri orientative).
---

# Adăugarea unei secțiuni noi

Urmează pașii în ordine. Nu scrie text direct în JSX: totul trece prin dicționare, în română și în engleză.

## 1. Tipuri — `src/types/index.ts`

- Adaugă id-ul secțiunii în `SectionId` (ex. `"intrebari"`), dacă va apărea în meniu.
- Adaugă în `Dictionary` o cheie pentru textele secțiunii, de exemplu:

  ```ts
  faq: { eyebrow: string; title: string; description: string; items: { question: string; answer: string }[] };
  ```

- Dacă elementele au iconițe, ține-le separat de text, în `src/data/content.ts` (`{ id, icon: LucideIcon }`), ca la servicii.

## 2. Texte — `src/i18n/dictionaries/ro.ts` și `en.ts`

- Completează cheia nouă în **ambele** fișiere. Dacă lipsește dintr-unul, `npx tsc --noEmit` dă eroare.
- Conținut general și onest: DeratPro e fictiv, fără cifre, certificări sau recenzii inventate.

## 3. Componenta — `src/components/sections/<Nume>.tsx`

Schelet (Server Component, fără `"use client"`):

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/types";

export function Nume({ dict }: { dict: Dictionary["faq"] }) {
  return (
    <section id="id-sectiune" aria-labelledby="id-sectiune-title" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="id-sectiune-title"
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
        </Reveal>
        {/* conținut: .map() peste dict.items, carduri cu h3 */}
      </Container>
    </section>
  );
}
```

Reguli:
- Folosește tokens (`bg-ink-800/60`, `border-white/8`, `text-accent-400`, `rounded-(--radius-card)`), nu culori noi.
- Pe fundal deschis: `SectionHeading tone="light"` și `Button variant="dark"`.
- Dacă ai nevoie de interacțiune (mouse, stare), izolează doar acea bucată într-un Client Component mic și trimite restul prin `children`. Unui Client Component îi trimiți doar text simplu din dicționar, nu funcții sau iconițe.
- Animații: `Reveal` cu `delay={index * 0.08}` pentru apariții în cascadă.

## 4. Pagina — `src/app/[lang]/page.tsx`

Importă componenta, pune-o în `<main>` în ordinea dorită și dă-i partea ei din dicționar: `<Nume dict={dict.faq} />`.

## 5. Meniu (opțional)

- Adaugă id-ul în `NAV_SECTIONS` din `src/data/content.ts`.
- Adaugă eticheta în `nav.items` din `ro.ts` și `en.ts`.

Navbar-ul și footer-ul o preiau automat, iar `useActiveSection` o evidențiază la scroll.

## 6. Verificare

Rulează skill-ul `verify-before-commit`, verifică secțiunea la `/` și la `/en`, apoi:

```bash
git add -A
git commit -m "feat: add <nume> section"
```
