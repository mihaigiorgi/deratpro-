---
name: edit-content
description: Modifică textele site-ului DeratPro în română și engleză (servicii, avantaje, pașii procesului, meniul, formularul, datele de contact, emailul precompletat) fără să atingi componentele. Folosește când utilizatorul vrea să schimbe sau să traducă un text, ori să adauge/scoată un serviciu sau un avantaj.
---

# Modificarea conținutului

Site-ul are două limbi: română la `/` și engleză la `/en`. Textele stau în dicționare, câte unul pe limbă:

- `src/i18n/dictionaries/ro.ts`
- `src/i18n/dictionaries/en.ts`

Ambele respectă tipul `Dictionary` din `src/types/index.ts`. Dacă un text lipsește dintr-o limbă, `npx tsc --noEmit` dă eroare, deci **orice text nou se adaugă în ambele fișiere**.

| Ce vrei să schimbi | Unde |
| --- | --- |
| Titlul și descrierea SEO, cuvintele cheie | `meta` |
| Meniul, butonul din navbar, eticheta selectorului de limbă | `nav` |
| Hero (badge, titlu, subtitlu, butoane, puncte de încredere, legenda scenei 3D) | `hero` |
| Serviciile (titlu, descriere, „ce include”), clienții casnici / comerciali | `services` |
| Avantajele din „De ce DeratPro” | `why` |
| Pașii din „Cum funcționează” | `process` |
| Secțiunea de contact, subiectul și șablonul emailului precompletat | `contact` |
| Etichetele, placeholder-ele și mesajele de eroare din formular | `form` |
| Footer | `footer` |

Ce **nu** e text și stă în `src/data/content.ts`: ordinea și iconițele serviciilor, avantajelor și pașilor, secțiunile din meniu și telefonul / emailul demonstrativ.

## Adăugarea unui serviciu, avantaj sau pas

1. Adaugă id-ul în tipul corespunzător din `src/types/index.ts` (`ServiceId`, `AdvantageId`, `ProcessStepId`).
2. Adaugă `{ id, icon }` în lista din `src/data/content.ts`. Iconițele vin din `lucide-react`.
3. Adaugă textele sub același id în `ro.ts` și `en.ts`.

Un serviciu nou apare automat și în lista din formular și în footer.

## Reguli

- În mesajele de eroare, `{min}` și `{max}` se înlocuiesc cu limitele din `src/lib/validation.ts`. Nu scrie cifrele direct în text.
- Păstrează tonul: afirmații generale, fără cifre, certificări sau recenzii inventate. Datele de contact rămân demonstrative.
- Emailul precompletat se construiește cu `emailHref()` din `content.ts`, care aplică `encodeURIComponent`. Nu construi manual link-ul `mailto:`.

După modificare rulează `verify-before-commit`, apoi commit cu `feat:` (conținut nou) sau `fix:` (corectură).
