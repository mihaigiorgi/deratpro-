@AGENTS.md

# DeratPro — reguli de proiect

Landing page (o singură pagină) pentru o firmă fictivă de deratizare / dezinsecție / dezinfecție, în română (`/`) și engleză (`/en`).
Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, Three.js prin @react-three/fiber, Motion.

## Comenzi

- `npm run dev` — server de dezvoltare (http://localhost:3000)
- `npx tsc --noEmit` — verificare de tipuri
- `npx eslint src` — lint
- `npm run build` — build de producție (trebuie să treacă înainte de orice push)

## Convenții

- **Server Components implicit.** `"use client"` doar pentru interacțiune: Navbar, scena 3D, formular, animații (`Reveal`, `ProcessLine`), `SpotlightCard`.
- **Nu trimite funcții (ex. iconițe Lucide) ca props de la un Server Component la un Client Component.** Randează iconița pe server și trimite rezultatul prin `children`.
- **Textul stă în dicționare:** `src/i18n/dictionaries/ro.ts` și `en.ts`, ambele de tipul `Dictionary` din `src/types/index.ts`. Orice text nou se adaugă în ambele limbi. `src/data/content.ts` are doar structura (id-uri, ordine, iconițe, contact demonstrativ). Componentele primesc partea lor din dicționar prin prop-ul `dict` și doar afișează datele.
- **Limbi:** configurate în `src/i18n/config.ts`. Rutele sunt sub `src/app/[lang]/`, iar `src/proxy.ts` servește româna la `/` (rescriere internă către `/ro`) și redirecționează `/ro` la `/`. Linkurile între limbi se fac cu `localePath()`.
- **Teme (dark / light):** tema stă în `data-theme` pe `<html>` (implicit `dark`), iar alegerea utilizatorului e salvată în `localStorage` și aplicată de scriptul din `<head>` înainte de afișare (`src/lib/theme.ts`). Componentele folosesc **doar tokens semantice**, care își schimbă valoarea după temă:
  - fundaluri: `bg-page`, `bg-page-deep`, `bg-surface`, `bg-surface-2`;
  - text: `text-fg`, `text-fg-strong`, `text-fg-soft`, `text-fg-muted`, `text-fg-subtle`;
  - accent: `text-brand`, `bg-brand/10`, `border-brand/20`, gradient `from-brand-soft to-brand-strong`;
  - erori: `text-danger`, `border-danger-line`;
  - margini și suprafețe transparente: `border-fg/8`, `bg-fg/5` (nu `white/…`).

  Nu folosi `text-white`, `slate-*`, `ink-*` sau `mist-*` în componente. Excepții voite, la fel în ambele teme: butonul principal (`bg-accent-400 text-ink-900`), iconița logo-ului, punctele din legenda scenei 3D și pătratele închise cu iconițe din „De ce DeratPro”. O secțiune cu clasa `theme-invert` primește tema opusă (vezi „De ce DeratPro”). Valorile tokens-urilor stau în `src/app/globals.css`. Fără valori hex arbitrare (`bg-[#…]`) în componente. Excepții: scena 3D (are paletă proprie pentru fiecare temă) și `opengraph-image.tsx`.
- Clase Tailwind în forma canonică (`size-168`, nu `size-[42rem]`; `bg-linear-to-r`, nu `bg-gradient-to-r`).
- Fiecare secțiune: `<section id aria-labelledby>`, titlu cu `SectionHeading`, conținut în `Container`, animații cu `Reveal`.
- Accesibilitate: un singur `h1` (în Hero), `h2` pentru secțiuni, `h3` pentru carduri; iconițele decorative au `aria-hidden`.
- **Brand fictiv:** fără statistici, certificări, premii sau testimoniale inventate. Datele de contact rămân demonstrative (`.example`, `+40 700 000 000`).
- Media queries în componente client: `useMediaQuery` din `src/hooks/useMediaQuery.ts` (nu `useState` + `useEffect`).
- În `src/components/three/` regula `react-hooks/immutability` e dezactivată intenționat (mutații în `useFrame`, modelul R3F). Nu o dezactiva în altă parte.

## Git

Commit-uri mici, în stil Conventional Commits: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`.

## Skills disponibile

- `add-section` — cum adaugi o secțiune nouă pe pagină
- `edit-content` — cum modifici sau traduci texte, servicii, avantaje, pași sau date de contact
- `verify-before-commit` — verificările de rulat înainte de commit / push
