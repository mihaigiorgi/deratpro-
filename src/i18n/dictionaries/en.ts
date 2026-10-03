import type { Dictionary } from "@/types";

export const en: Dictionary = {
  meta: {
    title: "DeratPro — Rodent Control, Insect Control & Disinfection",
    description:
      "Professional rodent control, insect control and disinfection for homes and businesses. Fast response, approved products, trained staff. Request a quote.",
    keywords: ["pest control", "rodent control", "insect control", "disinfection", "Romania"],
  },
  common: {
    skipToContent: "Skip to content",
  },
  nav: {
    ariaLabel: "Main navigation",
    homeLabel: "DeratPro — back to top",
    items: {
      servicii: "Services",
      "de-ce-noi": "Why us",
      proces: "Process",
      contact: "Contact",
    },
    cta: "Get a quote",
    mobileCta: "Request a quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Site language",
    themeLabel: "Switch between light and dark theme",
    themeMenu: "Theme",
  },
  hero: {
    badge: "Rodents · Insects · Disinfection",
    titleStart: "Professional protection against",
    titleHighlight: "pests.",
    description:
      "Fast, effective rodent control, insect control and disinfection for homes and businesses — carried out by specialists, with minimal disruption to your day.",
    primaryCta: "Request a quote",
    secondaryCta: "See our services",
    trustPoints: ["Homes and commercial spaces", "Approved products", "Guaranteed treatments"],
    legendPest: "Pest",
    legendNeutralized: "Neutralized",
    legendProtected: "Protected home",
  },
  services: {
    eyebrow: "What we do",
    title: "Professional services",
    description:
      "Three core services, adapted to every type of space. Every treatment starts with an assessment and ends with prevention advice.",
    audiencesLabel: "Who we work for",
    audiences: {
      residential: { label: "Homeowners", detail: "Houses, apartments, outbuildings" },
      commercial: { label: "Businesses", detail: "Offices, hospitality, warehouses, retail" },
    },
    items: {
      deratizare: {
        title: "Rodent control",
        description: "Removing and preventing rodent infestations with effective, safe methods.",
        highlights: [
          "Inspection and entry point identification",
          "Tamper-resistant bait stations",
          "Prevention advice",
        ],
      },
      dezinsectie: {
        title: "Insect control",
        description: "Getting rid of insects and keeping them from coming back, in homes and commercial spaces.",
        highlights: [
          "Cockroaches, ants, bed bugs, mosquitoes",
          "Treatment matched to the type of insect",
          "Plan to prevent reinfestation",
        ],
      },
      dezinfectie: {
        title: "Disinfection",
        description: "Cleaning and disinfecting spaces for a safer, healthier environment.",
        highlights: [
          "Homes, offices, commercial spaces",
          "Fogging and surface treatment",
          "Approved biocidal products",
        ],
      },
    },
    cardCta: "Get a quote",
    cardCtaFor: "for",
  },
  why: {
    eyebrow: "Why DeratPro",
    title: "Safety, speed and results you can rely on.",
    description:
      "We treat every job like a project: we understand the problem, choose the right method and work cleanly, discreetly and responsibly.",
    cta: "Talk to a specialist",
    items: {
      rapid: {
        title: "Fast response",
        description: "We reply promptly and schedule the visit as soon as possible, including for urgent cases.",
      },
      substante: {
        title: "Approved products",
        description: "We use products and solutions that meet current standards, applied in controlled doses.",
      },
      personal: {
        title: "Authorised staff",
        description: "Treatments are carried out by trained, specialised staff with the right equipment.",
      },
      garantie: {
        title: "Guarantee",
        description: "Our services come with a guarantee, depending on the type of treatment.",
      },
    },
  },
  process: {
    eyebrow: "How it works",
    title: "Three steps to a protected space",
    description: "A simple, transparent process. You know from the start what happens next and what to prepare.",
    stepLabel: "Step",
    steps: {
      contact: {
        title: "You get in touch",
        description: "Fill in the form or contact us to describe the problem.",
      },
      evaluare: {
        title: "We assess the situation",
        description: "We talk it through and find the right solution for your space.",
      },
      interventie: {
        title: "We treat the space",
        description: "Our team carries out the treatment professionally and safely.",
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Request a quote",
    description:
      "Tell us briefly what the problem is. We'll get back to you with an assessment and a quote tailored to your space — no obligation.",
    nextStepsTitle: "What happens next",
    nextSteps: [
      "We review your request",
      "We call you for details and an estimate",
      "We agree on a date for the treatment",
    ],
    hours: "Monday – Saturday, flexible hours",
    visits: "At your home or business premises",
    demoNote: "The contact details above are for demo purposes only.",
    emailSubject: "Quote request — DeratPro",
    emailBody:
      "Hello,\n\nI would like a quote for:\n\nType of space (home / business):\nProblem noticed:\nLocation:\nPhone:\n\nThank you!",
  },
  form: {
    legend: "Contact details and request information",
    name: { label: "Name", placeholder: "e.g. Andrei Popescu" },
    phone: { label: "Phone", placeholder: "07xx xxx xxx" },
    email: { label: "Email", placeholder: "name@example.com" },
    service: {
      label: "Service needed",
      placeholder: "Choose a service",
      unsure: "Not sure — I need an assessment",
    },
    message: {
      label: "Message",
      placeholder: "e.g. We've been seeing cockroaches in the kitchen for about two weeks…",
      hint: "Briefly describe the problem: type of pest, the space, how long it's been happening (at least {min} characters).",
    },
    optional: "optional",
    requiredBefore: "Fields marked with",
    requiredAfter: "are required.",
    demoNote: "Demo form — no data is sent to a server.",
    submit: "Send request",
    submitting: "Sending…",
    liveSubmitting: "Sending your request…",
    successTitle: "Thank you!",
    successText: "We've received your request and will get back to you shortly.",
    reset: "Send another request",
    errors: {
      nameRequired: "Please enter your name.",
      nameTooShort: "Your name must be at least {min} characters.",
      nameInvalid: "Your name can only contain letters, spaces and hyphens.",
      phoneRequired: "Please enter a phone number.",
      phoneInvalid: "This number doesn't look valid. Example: 0722 123 456 or +40 722 123 456.",
      emailInvalid: "This email address doesn't look valid.",
      messageRequired: "Please briefly describe the situation.",
      messageTooShort: "Your message must be at least {min} characters.",
      messageTooLong: "Your message can be at most {max} characters.",
    },
  },
  footer: {
    tagline: "Professional rodent control, insect control and disinfection for homes and businesses.",
    navLabel: "Footer navigation",
    navTitle: "Navigation",
    servicesTitle: "Services",
    contactTitle: "Contact",
    area: "Romania",
    copyright: "Demo project — fictional brand, illustrative contact details.",
    backToTop: "Back to top",
  },
};
