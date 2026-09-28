/** Id-urile secțiunilor de pe pagină — o singură sursă pentru toate link-urile. */
export type SectionId = "acasa" | "servicii" | "de-ce-noi" | "proces" | "contact";

export interface NavItem {
  label: string;
  href: `#${SectionId}`;
}