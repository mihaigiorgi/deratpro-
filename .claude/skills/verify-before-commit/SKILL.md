---
name: verify-before-commit
description: Verificările de rulat în proiectul DeratPro înainte de commit sau push (tipuri, lint, build, test vizual rapid). Folosește înainte de orice commit, push sau deploy pe Vercel.
---

# Verificare înainte de commit

Rulează din rădăcina proiectului, în ordine. Oprește-te la prima eroare și rezolv-o.

```bash
npx tsc --noEmit
npx eslint src
npm run build
```

Toate trei trebuie să se termine fără `error`.

## Probleme frecvente

- **`Cannot find module '@/…'`** — nume de fișier sau folder greșit (atenție la litere mari/mici; Vercel rulează pe Linux). Apoi `Ctrl+Shift+P` → *TypeScript: Restart TS Server*.
- **„Only plain objects / Functions cannot be passed to Client Components”** — o iconiță sau o funcție e trimisă ca prop unui Client Component. Randează-o pe server și trimite rezultatul prin `children`.
- **`react-hooks/set-state-in-effect`** — nu seta stare direct în `useEffect`; pentru valori din browser folosește `useMediaQuery` / `useSyncExternalStore`, sau setează starea într-un callback.
- **Pagina arată o versiune veche** — oprește serverul, șterge `.next` (`rmdir /s /q .next` pe Windows) și pornește din nou `npm run dev`.

## Verificare vizuală rapidă

`npm run dev`, apoi în Chrome `F12` → modul telefon:
- 320px și 375px: fără scroll orizontal, meniul hamburger merge, scena 3D e sub text;
- 768px: servicii pe 2 coloane, timeline orizontal;
- formularul: gol → 3 erori; completat → „Se trimite…” → mesaj de succes.
- butonul RO / EN: duce la `/en` și înapoi la `/`, iar pe `/en` nu rămâne niciun text în română (inclusiv erorile din formular).
- butonul soare / lună: toată pagina trece pe tema deschisă și înapoi, inclusiv scena 3D, iar după refresh tema aleasă rămâne fără „flash”. Textul trebuie să se citească bine în ambele teme.

## Commit

```bash
git add -A
git commit -m "tip: descriere scurtă"
```

Tipuri: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`.
