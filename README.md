# DeratPro

Landing page pentru o firmă de deratizare, dezinsecție și dezinfecție. Firma e inventată, așa că pe site nu găsești statistici, certificări sau recenzii, iar telefonul și emailul (`+40 700 000 000`, `contact@deratpro.example`) sunt de test.

Are cinci secțiuni (hero, servicii, avantaje, proces, contact), o scenă Three.js în hero și un formular de contact cu validare. Am vrut să arate ca un site pe care o firmă mică l-ar putea folosi chiar mâine.

Demo: https://deratpro-two.vercel.app

## Rulare locală

Ai nevoie de Node.js 20.9 sau mai nou.

```bash
npm install
npm run dev
```

Apoi deschizi http://localhost:3000.

```bash
npm run build     # build de producție
npm run start     # rulează build-ul
npm run lint
npx tsc --noEmit  # verificare de tipuri
```

## Stack

Next.js 16 (App Router), React 19 și TypeScript, cu Tailwind CSS 4 pentru stiluri. Scena 3D e făcută cu Three.js prin @react-three/fiber, animațiile la scroll și meniul de pe mobil cu Motion. Iconițele sunt din Lucide, fontul e Geist.

N-am vrut dependențe de care nu am nevoie. Formularul, de exemplu, nu folosește nicio librărie de formulare. Toată validarea are vreo 60 de rânduri, iar așa e mai ușor de citit.

## Design

Punctul de plecare a fost un concept făcut în Google Stitch (promptul e în [`docs/design-prompt.md`](docs/design-prompt.md)). De acolo am păstrat fundalul închis, accentul verde-lime și cardurile rotunjite. Multe s-au schimbat pe parcurs.

<!-- TODO: captură din Stitch + ce am păstrat / ce am schimbat -->

Culorile, umbrele și colțurile sunt definite o singură dată, ca tokens în `globals.css`. Altfel ajungeam cu trei nuanțe de gri aproape identice prin componente.

Secțiunea „De ce DeratPro” e singura pe fundal deschis, pentru că toată pagina pe negru obosea ochii la scroll. Pe fundalul ăla butonul e negru, fiindcă verdele nu avea destul contrast.

Pe mobil scena 3D stă sub text, nu în spatele lui. Altfel titlul se citea greu.

Logo-ul e un scut cu un gândac, desenat de mine în SVG. Am încercat și cu un șoarece, și cu o țintă, dar la mărimea unui favicon doar gândacul se mai înțelegea.

## Scena 3D

În hero e o casă desenată din linii, sub o cupolă transparentă. Din afară vin particule portocalii, adică dăunătorii. Când lovesc cupola se fac verzi, ricoșează și dispar, iar pe cupolă apare o undă acolo unde au lovit. Cu mouse-ul le poți împinge.

Prima versiune era un scut abstract cu particule în jur. Arăta bine, dar nu înțelegeai ce e. Casa sub cupolă arată direct ce face firma, fără gândaci sau șobolani pe ecran.

La performanță am avut grijă la câteva lucruri. Scena se încarcă separat, cu `next/dynamic` și `ssr: false`, ca restul paginii să nu aștepte după Three.js. Toate particulele sunt un singur obiect `Points` cu un shader scris de mână, deci un singur draw call. În `useFrame` modific array-uri alocate o singură dată, fără obiecte noi la fiecare cadru.

Când hero-ul iese din ecran, scena se oprește. Pe telefon sunt 220 de particule în loc de 560 și rezoluția e limitată. Dacă ai „reduce motion” activat în sistem, vezi doar o imagine statică.

## Formularul

Are nume, telefon, mesaj și două câmpuri opționale, email și serviciul dorit.

Numele trebuie să aibă măcar 2 caractere și poate avea diacritice, cratimă sau apostrof. La telefon merg formatele obișnuite din România (`0722 123 456`, `+40 722 123 456`, fix `0256…`) și numerele internaționale cu `+`, iar spațiile și cratimele nu contează. Mesajul are între 10 și 1000 de caractere.

Erorile apar când ieși dintr-un câmp sau când apeși pe trimite, nu în timp ce scrii. Nu-mi place să văd „câmp invalid” după prima literă. Dacă ceva e greșit la trimitere, focusul sare la primul câmp cu problemă.

Backend nu există, așa că trimiterea e simulată: un mic delay, apoi mesajul de confirmare. Validarea e separată de componentă, în `src/lib/validation.ts`, ca să poată fi folosită și pe server. Următorul pas ar fi un Server Action care verifică din nou datele și trimite emailul.

În secțiunea de contact, linkul de email deschide un mesaj nou cu subiectul și un mic șablon deja completate.

## Unelte AI

Conceptul vizual de la început l-am generat cu Google Stitch, cum scriam la Design.

La cod am lucrat cu Claude (Anthropic) ca asistent. Am mers pas cu pas: discutam ce urmează și de ce, apoi scriam componenta și o testam în browser. Părțile mai lungi, scena 3D și formularul, le-am primit scrise și le-am luat la mână până le-am înțeles. Tot cu el am rezolvat și problemele de mai jos.

Am lăsat în repo și configurarea pentru Claude Code, ca proiectul să poată fi continuat la fel. [`CLAUDE.md`](CLAUDE.md) conține regulile proiectului (comenzi, convenții, ce nu se inventează pe site). În [`.claude/skills/`](.claude/skills) sunt trei instrucțiuni:

- [`add-section`](.claude/skills/add-section/SKILL.md) pentru o secțiune nouă
- [`edit-content`](.claude/skills/edit-content/SKILL.md) pentru schimbat texte
- [`verify-before-commit`](.claude/skills/verify-before-commit/SKILL.md) cu verificările dinainte de commit

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

Secțiunile sunt Server Components. `"use client"` am pus doar unde chiar e nevoie de browser: meniul, scena 3D, formularul și câteva animații. Textele sunt toate în `data/content.ts`, nu în JSX, ca să le poți schimba fără să umbli la componente.

## Probleme pe parcurs

Prima a apărut la iconițe. Cele din Lucide sunt funcții, iar Next.js nu te lasă să trimiți funcții ca props de la server la client. Cardul a rămas pe server, iar pe client am mutat doar efectul de lumină care urmărește mouse-ul.

La `Container` aveam un prop `as?: ElementType`, iar TypeScript ajungea la tipul `never` și nu mai accepta `className`. L-am limitat la elementele pe care le folosesc de fapt (`div`, `section`, `nav`…).

Apoi au fost regulile noi din ESLint, cele pentru React Compiler. `set-state-in-effect` se plângea că citeam media queries cu `useState` și `useEffect`, așa că am trecut la `useSyncExternalStore`, care e făcut exact pentru surse din afara React. `immutability` nu voia să modific direct buffer-ele din scena 3D. Numai că exact așa se lucrează în React Three Fiber, deci am oprit regula doar pentru `components/three/`.

## Ce ar mai fi de făcut

- Un Server Action adevărat pentru formular, cu email prin Resend sau salvare într-o bază de date
- Teste pentru `validation.ts`
- Câte o pagină pentru fiecare serviciu, dacă ar exista mai mult conținut

## Deploy

Site-ul e pe Vercel, la https://deratpro-two.vercel.app, și se republică singur la fiecare push pe `main`.

Dacă vrei să-l pui în contul tău, faci push pe GitHub și imporți repo-ul pe [vercel.com/new](https://vercel.com/new). Next.js e recunoscut automat, deci nu trebuie să setezi nimic. Poți pune `NEXT_PUBLIC_SITE_URL` cu domeniul tău, folosit la metadata, sitemap și imaginea Open Graph. Fără el se folosește domeniul dat de Vercel.
