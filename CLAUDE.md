@AGENTS.md

# DeratPro — reguli de proiect

Landing page (o singură pagină) pentru o firmă fictivă de deratizare / dezinsecție / dezinfecție.
Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, Three.js prin @react-three/fiber, Motion.

## Comenzi

- `npm run dev` — server de dezvoltare (http://localhost:3000)
- `npx tsc --noEmit` — verificare de tipuri
- `npx eslint src` — lint
- `npm run build` — build de producție (trebuie să treacă înainte de orice push)

## Convenții

- **Server Components implicit.** `"use client"` doar pentru interacțiune: Navbar, scena 3D, formular, animații (`Reveal`, `ProcessLine`), `SpotlightCard`.
- **Nu trimite funcții (ex. iconițe Lucide) ca props de la un Server Component la un Client Component.** Randează iconița pe server și trimite rezultatul prin `children`.
- **Textul stă în `src/data/content.ts`**, tipurile în `src/types/index.ts`. Componentele doar afișează datele.
- **Design tokens** în `src/app/globals.css` (`@theme`): culori `ink-*`, `mist-*`, `accent-*`, `pest-*`, `glow-*`, `shadow-card`, `shadow-glow`, `radius-card`. Din paleta Tailwind se folosesc doar `slate-*` pentru text neutru și `rose-*` pentru erori. Fără valori hex arbitrare (`bg-[#…]`) în componente. Excepții: scena 3D și `opengraph-image.tsx`, unde culorile nu pot veni din clase CSS.
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
- `edit-content` — cum modifici texte, servicii, avantaje, pași sau date de contact
- `verify-before-commit` — verificările de rulat înainte de commit / push
