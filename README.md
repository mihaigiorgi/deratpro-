# DeratPro

Landing page pentru o firmă (fictivă) de deratizare, dezinsecție și dezinfecție. L-am făcut ca temă tehnică pentru un post de Junior Fullstack Engineer.

Cerința era un site de prezentare cu 5 secțiuni (hero, servicii, avantaje, proces, contact), o animație Three.js în hero și un formular cu validare. Mi-am propus să iasă un site care chiar ar putea fi folosit de o firmă mică, nu doar o demonstrație tehnică.

DeratPro nu există. Pe site nu am pus statistici, certificări sau recenzii inventate, iar datele de contact sunt de test (`+40 700 000 000`, `contact@deratpro.example`).

## Cum îl rulezi

Ai nevoie de Node.js 20.9 sau mai nou.

```bash
npm install
npm run dev
```

Site-ul pornește pe http://localhost:3000.

Alte comenzi utile:

```bash
npm run build     # build de producție
npm run start     # pornește build-ul
npm run lint
npx tsc --noEmit  # verificare de tipuri
```

## Cu ce l-am făcut

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Three.js cu @react-three/fiber pentru scena din hero
- Motion pentru animațiile la scroll și meniul de pe mobil
- Lucide pentru iconițe, Geist pentru font

Am încercat să nu adaug pachete doar ca să fie. De exemplu, formularul nu folosește o librărie de formulare: validarea are cam 80 de rânduri și e mai ușor de urmărit așa.

## Design

Am pornit de la un concept generat în Google Stitch. Promptul folosit e în [`docs/design-prompt.md`](docs/design-prompt.md).

<!-- TODO: captură din Stitch + ce am păstrat / ce am schimbat -->

Din concept am păstrat direcția generală (fundal închis, accent verde-lime, carduri rotunjite). Restul l-am ajustat pe parcurs:

- Culorile, umbrele și colțurile sunt definite o singură dată în `globals.css`, ca tokens Tailwind. Așa nu am valori „aproape la fel” împrăștiate prin componente.
- Secțiunea „De ce DeratPro” e singura pe fundal deschis. Pagina toată pe negru devenea obositoare la scroll.
- Pe fundalul deschis, butonul e negru, pentru că verdele avea contrast prea slab.
- Pe mobil, animația 3D stă sub text, nu în spatele lui, ca titlul să rămână lizibil.
- Logo-ul (un scut cu un gândac) l-am desenat în SVG. Am încercat și variante cu șoarece sau cu o simplă țintă, dar gândacul se vedea cel mai clar la mărimea de favicon.

## Animația 3D

În hero e o casă desenată din linii, sub o cupolă transparentă. Din exterior vin particule portocalii (dăunătorii). Când ating cupola, devin verzi, ricoșează și dispar, iar pe cupolă apare o undă în punctul de impact. Cu mouse-ul poți împinge particulele.

Prima variantă a fost un scut abstract cu particule. Arăta bine, dar nu era clar ce reprezintă. Casa sub cupolă spune direct ce vinde firma, fără să arate insecte sau rozătoare.

Câteva lucruri pe care le-am făcut pentru performanță:

- Scena se încarcă separat (`next/dynamic` cu `ssr: false`), deci restul paginii nu așteaptă după Three.js.
- Toate particulele sunt un singur obiect `Points`, cu un shader mic scris de mână, deci un singur draw call.
- Pozițiile se actualizează în `useFrame`, pe array-uri create o singură dată, fără obiecte noi la fiecare cadru.
- Când hero-ul nu mai e pe ecran, scena nu se mai randează.
- Pe telefon sunt 220 de particule în loc de 560, iar rezoluția e limitată.
- Dacă utilizatorul are activată opțiunea „reduce motion” în sistem, scena rămâne o imagine statică.

## Formularul

Câmpuri: nume, telefon, email (opțional), serviciul dorit (opțional) și mesaj.

- Numele trebuie să aibă minim 2 caractere și poate conține diacritice, cratimă sau apostrof.
- Telefonul acceptă formatele obișnuite din România (`0722 123 456`, `+40 722 123 456`, fix `0256…`) și numere internaționale cu `+`. Spațiile și cratimele sunt ignorate.
- Mesajul trebuie să aibă între 10 și 1000 de caractere.

Erorile apar după ce ieși dintr-un câmp sau când apeși pe trimite, nu în timp ce scrii. Mi s-a părut enervant să văd „câmp invalid” de la prima literă. La submit, focusul sare pe primul câmp greșit.

Nu există backend, trimiterea e simulată: așteaptă puțin, apoi afișează mesajul de confirmare. Funcțiile de validare sunt separate de componentă (`src/lib/validation.ts`), ca să poată fi refolosite pe server. Pasul următor ar fi un Server Action care revalidează datele și trimite un email.

Linkul de email din secțiunea de contact deschide un mesaj nou, cu subiectul și o structură de mesaj deja completate.

## Unelte AI

Am folosit două unelte AI, fiecare pentru altceva:

- **Google Stitch**, pentru conceptul vizual de pornire (vezi secțiunea Design).
- **Claude** (Anthropic), ca asistent de programare. Am construit proiectul pas cu pas: la fiecare pas discutam ce trebuie făcut și de ce, apoi scriam componentele și testam în browser. Părțile mai lungi, cum sunt scena 3D și formularul, le-am primit scrise și le-am parcurs până le-am înțeles. Tot Claude m-a ajutat să înțeleg și să rezolv erorile de mai jos.

În repository am lăsat și configurarea pentru Claude Code, ca proiectul să poată fi continuat în același stil:

- `CLAUDE.md` are regulile proiectului: comenzile, convențiile de cod și ce nu trebuie inventat pe site.
- `.claude/skills/` are trei instrucțiuni reutilizabile:
  - `add-section`: cum adaugi o secțiune nouă;
  - `edit-content`: unde schimbi textele;
  - `verify-before-commit`: ce verifici înainte de commit.

## Structura

```text
src/
  app/            layout, pagina, stiluri globale, SEO (OG image, robots, sitemap)
  components/
    layout/       Navbar, Footer
    sections/     Hero, Services, WhyDeratPro, Process, Contact
    three/        scena 3D și shaderele
    contact/      formularul
    ui/           Button, Container, Logo, Field etc.
  data/           tot textul site-ului
  hooks/          useActiveSection, useMediaQuery
  lib/            validare, utilitare, configurare site
  types/
```

Secțiunile sunt Server Components. `"use client"` apare doar unde e nevoie de browser: meniul, scena 3D, formularul și câteva animații. Textele stau în `data/content.ts`, nu direct în JSX, ca să poată fi modificate fără să atingi componentele.

## Probleme întâlnite pe parcurs

- **Iconițele trimise unui Client Component.** Iconițele Lucide sunt funcții, iar Next.js nu te lasă să trimiți funcții ca props de la server la client. Am rezolvat păstrând cardul pe server și mutând pe client doar efectul de lumină care urmărește mouse-ul.
- **Tipul `never` în `Container`.** Prop-ul `as?: ElementType` făcea ca TypeScript să nu mai accepte `className`. L-am restrâns la elementele pe care le folosesc efectiv (`div`, `section`, `nav`…).
- **Regulile noi din ESLint (React Compiler).**
  - `set-state-in-effect`: citeam media queries cu `useState` + `useEffect`. Am trecut la `useSyncExternalStore`, care e varianta recomandată pentru surse din afara React.
  - `immutability`: reclama modificarea directă a buffer-elor în scena 3D. Acolo e exact modelul recomandat de React Three Fiber, așa că am dezactivat regula doar pentru folderul `components/three/`, cu un comentariu care explică de ce.

## Ce aș face în continuare

- Un Server Action real pentru formular (email prin Resend sau salvare într-un tabel).
- Câteva teste pentru `validation.ts`.
- Pagini separate pentru fiecare serviciu, dacă firma ar avea mai mult conținut.

## Deploy

Proiectul e pregătit pentru Vercel. Faci push pe GitHub, imporți repository-ul pe vercel.com/new, iar Next.js e detectat automat. Opțional, poți seta `NEXT_PUBLIC_SITE_URL` cu domeniul final. Altfel se folosește adresa oferită de Vercel.
