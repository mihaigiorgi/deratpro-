---
name: edit-content
description: Modifică textele site-ului DeratPro (servicii, avantaje, pașii procesului, meniul, datele de contact, emailul precompletat) fără să atingi componentele. Folosește când utilizatorul vrea să schimbe un text, să adauge/scoată un serviciu sau un avantaj.
---

# Modificarea conținutului

Tot textul reutilizabil stă în `src/data/content.ts`. Componentele îl citesc automat.

| Ce vrei să schimbi | Unde |
| --- | --- |
| Link-urile din meniu (și footer) | `NAV_ITEMS` |
| Cele 3 servicii (titlu, descriere, iconiță, „ce include”) | `SERVICES` — se actualizează și lista din formular (`SERVICE_OPTIONS`) și footer-ul |
| Avantajele din „De ce DeratPro” | `ADVANTAGES` |
| Pașii din „Cum funcționează” | `PROCESS_STEPS` |
| Telefon / email / subiectul și șablonul emailului | `DEMO_CONTACT`, `EMAIL`, `EMAIL_SUBJECT`, `EMAIL_BODY` |
| Titlul, descrierea SEO, URL-ul site-ului | `src/lib/site.ts` |
| Textele din Hero (titlu, subtitlu, puncte de încredere) | `src/components/sections/Hero.tsx` |

## Reguli

- Iconițele vin din `lucide-react`; adaugă-le în importul din capul fișierului.
- `Service["id"]` e o listă fixă de valori în `src/types/index.ts` — dacă adaugi un serviciu nou, adaugă și id-ul acolo.
- Păstrează tonul: afirmații generale, fără cifre, certificări sau recenzii inventate. Datele de contact rămân demonstrative.
- Pentru emailul precompletat, textul trece prin `encodeURIComponent` — nu construi manual link-ul `mailto:`.

După modificare rulează `verify-before-commit`, apoi commit cu `feat:` (conținut nou) sau `fix:` (corectură).
