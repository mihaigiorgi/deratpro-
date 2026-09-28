---
name: add-section
description: Adaugă o secțiune nouă pe landing page-ul DeratPro, respectând structura existentă (date în content.ts, Server Component, SectionHeading, Reveal, link în navbar). Folosește când utilizatorul cere o secțiune nouă (ex. FAQ, zone deservite, prețuri orientative).
---

# Adăugarea unei secțiuni noi

Urmează pașii în ordine. Nu scrie text direct în JSX — totul trece prin `src/data/content.ts`.

## 1. Tipuri — `src/types/index.ts`

- Adaugă id-ul secțiunii în `SectionId` (ex. `"intrebari"`), dacă va apărea în meniu.
- Adaugă o interfață pentru elementele secțiunii (ex. `FaqItem { question: string; answer: string }`).
- Dacă elementele au iconițe, folosește `icon: LucideIcon`.

## 2. Date — `src/data/content.ts`

- Exportă o constantă tipizată: `export const FAQ_ITEMS: FaqItem[] = [...]`.
- Conținut general și onest: DeratPro e fictiv, fără cifre, certificări sau recenzii inventate.

## 3. Componenta — `src/components/sections/<Nume>.tsx`

Schelet (Server Component, fără `"use client"`):

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Nume() {
  return (
    <section id="id-sectiune" aria-labelledby="id-sectiune-title" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="id-sectiune-title" eyebrow="Eticheta" title="Titlul secțiunii" description="Descriere scurtă." />
        </Reveal>
        {/* conținut: .map() peste datele din content.ts, carduri cu h3 */}
      </Container>
    </section>
  );
}
```

Reguli:
- Folosește tokens (`bg-ink-800/60`, `border-white/8`, `text-accent-400`, `rounded-(--radius-card)`), nu culori noi.
- Pe fundal deschis: `SectionHeading tone="light"` și `Button variant="dark"`.
- Dacă ai nevoie de interacțiune (mouse, stare), izolează doar acea bucată într-un Client Component mic și trimite restul prin `children`.
- Animații: `Reveal` cu `delay={index * 0.08}` pentru apariții în cascadă.

## 4. Pagina — `src/app/page.tsx`

Importă componenta și pune-o în `<main>`, în ordinea dorită.

## 5. Meniu (opțional) — `NAV_ITEMS` din `content.ts`

Adaugă `{ label: "...", href: "#id-sectiune" }`. Navbar-ul și footer-ul o preiau automat, iar `useActiveSection` o evidențiază la scroll.

## 6. Verificare

Rulează skill-ul `verify-before-commit`, apoi:

```bash
git add -A
git commit -m "feat: add <nume> section"
```
