/** URL-ul site-ului. Open Graph (preview-ul de link) are nevoie de adrese complete. */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const SITE = {
  name: "DeratPro",
  title: "DeratPro — Deratizare, Dezinsecție & Dezinfecție",
  description:
    "Servicii profesionale de deratizare, dezinsecție și dezinfecție pentru locuințe și afaceri. Intervenție rapidă, substanțe avizate, personal autorizat. Solicită o ofertă.",
  url: resolveSiteUrl(),
  locale: "ro_RO",
} as const;