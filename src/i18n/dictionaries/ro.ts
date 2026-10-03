import type { Dictionary } from "@/types";

export const ro: Dictionary = {
  meta: {
    title: "DeratPro — Deratizare, Dezinsecție & Dezinfecție",
    description:
      "Servicii profesionale de deratizare, dezinsecție și dezinfecție pentru locuințe și afaceri. Intervenție rapidă, substanțe avizate, personal autorizat. Solicită o ofertă.",
    keywords: ["deratizare", "dezinsecție", "dezinfecție", "pest control", "combatere dăunători"],
  },
  common: {
    skipToContent: "Sari la conținut",
  },
  nav: {
    ariaLabel: "Navigare principală",
    homeLabel: "DeratPro — înapoi sus",
    items: {
      servicii: "Servicii",
      "de-ce-noi": "De ce noi",
      proces: "Proces",
      contact: "Contact",
    },
    cta: "Solicită ofertă",
    mobileCta: "Solicită o ofertă",
    openMenu: "Deschide meniul",
    closeMenu: "Închide meniul",
    languageLabel: "Limba site-ului",
  },
  hero: {
    badge: "Deratizare · Dezinsecție · Dezinfecție",
    titleStart: "Protecție profesională împotriva",
    titleHighlight: "dăunătorilor.",
    description:
      "Soluții rapide și eficiente de deratizare, dezinsecție și dezinfecție pentru locuințe și afaceri — aplicate de specialiști, cu impact minim asupra activității tale.",
    primaryCta: "Solicită o ofertă",
    secondaryCta: "Vezi serviciile",
    trustPoints: ["Locuințe și spații comerciale", "Substanțe avizate", "Garanție pentru intervenții"],
    legendPest: "Dăunător",
    legendNeutralized: "Neutralizat",
    legendProtected: "Casă protejată",
  },
  services: {
    eyebrow: "Ce facem",
    title: "Servicii profesionale",
    description:
      "Trei servicii esențiale, adaptate fiecărui tip de spațiu. Fiecare intervenție începe cu o evaluare și se încheie cu recomandări de prevenție.",
    audiencesLabel: "Pentru cine lucrăm",
    audiences: {
      residential: { label: "Clienți casnici", detail: "Case, apartamente, spații anexe" },
      commercial: { label: "Clienți comerciali", detail: "Birouri, HoReCa, depozite, retail" },
    },
    items: {
      deratizare: {
        title: "Deratizare",
        description: "Eliminarea și prevenirea infestărilor cu rozătoare prin soluții eficiente și sigure.",
        highlights: [
          "Inspecție și identificarea punctelor de acces",
          "Stații de momire securizate",
          "Recomandări de prevenție",
        ],
      },
      dezinsectie: {
        title: "Dezinsecție",
        description: "Combaterea insectelor și prevenirea reapariției acestora în spații rezidențiale și comerciale.",
        highlights: [
          "Gândaci, furnici, ploșnițe, țânțari",
          "Tratament adaptat tipului de insectă",
          "Plan de prevenire a reapariției",
        ],
      },
      dezinfectie: {
        title: "Dezinfecție",
        description: "Igienizarea și dezinfectarea spațiilor pentru un mediu mai sigur și mai sănătos.",
        highlights: [
          "Locuințe, birouri, spații comerciale",
          "Nebulizare și tratare a suprafețelor",
          "Produse biocide avizate",
        ],
      },
    },
    cardCta: "Solicită ofertă",
    cardCtaFor: "pentru",
  },
  why: {
    eyebrow: "De ce DeratPro",
    title: "Siguranță, rapiditate și rezultate pe care te poți baza.",
    description:
      "Tratăm fiecare intervenție ca pe un proiect: înțelegem problema, alegem metoda potrivită și lucrăm curat, discret și responsabil.",
    cta: "Discută cu un specialist",
    items: {
      rapid: {
        title: "Intervenție rapidă",
        description:
          "Răspundem prompt solicitărilor și programăm intervenția cât mai repede, inclusiv pentru situații urgente.",
      },
      substante: {
        title: "Substanțe avizate",
        description: "Folosim produse și soluții conforme cu standardele în vigoare, aplicate în doze controlate.",
      },
      personal: {
        title: "Personal autorizat",
        description: "Intervențiile sunt realizate de personal instruit și specializat, echipat corespunzător.",
      },
      garantie: {
        title: "Garanție",
        description: "Oferim garanție pentru serviciile efectuate, în funcție de tipul intervenției.",
      },
    },
  },
  process: {
    eyebrow: "Cum funcționează",
    title: "Trei pași până la un spațiu protejat",
    description: "Un proces simplu și transparent. Știi de la început ce urmează și ce trebuie să pregătești.",
    stepLabel: "Pasul",
    steps: {
      contact: {
        title: "Ne contactezi",
        description: "Completezi formularul sau ne contactezi pentru a descrie problema.",
      },
      evaluare: {
        title: "Evaluăm situația",
        description: "Discutăm situația și identificăm soluția potrivită pentru spațiul tău.",
      },
      interventie: {
        title: "Intervenim",
        description: "Echipa noastră efectuează intervenția în condiții profesionale și sigure.",
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Solicită o ofertă",
    description:
      "Spune-ne pe scurt ce problemă ai. Revenim cu o evaluare și o ofertă adaptată spațiului tău — fără obligații.",
    nextStepsTitle: "Ce urmează",
    nextSteps: [
      "Analizăm solicitarea ta",
      "Te sunăm pentru detalii și o estimare",
      "Stabilim împreună data intervenției",
    ],
    hours: "Luni – Sâmbătă, program flexibil",
    visits: "Intervenții la domiciliu și la sediul firmei",
    demoNote: "Datele de contact de mai sus sunt demonstrative.",
    emailSubject: "Solicitare ofertă — DeratPro",
    emailBody:
      "Bună ziua,\n\nAș dori o ofertă pentru:\n\nTip spațiu (locuință / firmă):\nProblema observată:\nLocalitate:\nTelefon:\n\nMulțumesc!",
  },
  form: {
    legend: "Date de contact și detalii despre solicitare",
    name: { label: "Nume", placeholder: "Ex: Andrei Popescu" },
    phone: { label: "Telefon", placeholder: "07xx xxx xxx" },
    email: { label: "Email", placeholder: "nume@exemplu.ro" },
    service: {
      label: "Serviciu dorit",
      placeholder: "Alege un serviciu",
      unsure: "Nu sunt sigur — am nevoie de o evaluare",
    },
    message: {
      label: "Mesaj",
      placeholder: "Ex: Am observat gândaci în bucătărie de aproximativ două săptămâni…",
      hint: "Descrie pe scurt problema: tipul dăunătorului, spațiul, de când apare (minim {min} caractere).",
    },
    optional: "opțional",
    requiredBefore: "Câmpurile marcate cu",
    requiredAfter: "sunt obligatorii.",
    demoNote: "Formular demonstrativ — datele nu sunt transmise către un server.",
    submit: "Trimite solicitarea",
    submitting: "Se trimite…",
    liveSubmitting: "Se trimite solicitarea…",
    successTitle: "Mulțumim!",
    successText: "Am primit solicitarea ta. Te vom contacta în cel mai scurt timp.",
    reset: "Trimite o nouă solicitare",
    errors: {
      nameRequired: "Te rugăm să introduci numele.",
      nameTooShort: "Numele trebuie să aibă minim {min} caractere.",
      nameInvalid: "Numele poate conține doar litere, spații și cratime.",
      phoneRequired: "Te rugăm să introduci un număr de telefon.",
      phoneInvalid: "Numărul nu pare valid. Exemplu: 0722 123 456 sau +40 722 123 456.",
      emailInvalid: "Adresa de email nu pare validă.",
      messageRequired: "Te rugăm să descrii pe scurt situația.",
      messageTooShort: "Mesajul trebuie să aibă minim {min} caractere.",
      messageTooLong: "Mesajul poate avea maxim {max} caractere.",
    },
  },
  footer: {
    tagline: "Servicii profesionale de deratizare, dezinsecție și dezinfecție pentru locuințe și afaceri.",
    navLabel: "Navigare subsol",
    navTitle: "Navigare",
    servicesTitle: "Servicii",
    contactTitle: "Contact",
    area: "România",
    copyright: "Proiect demonstrativ — brand fictiv, date de contact ilustrative.",
    backToTop: "Înapoi sus",
  },
};
