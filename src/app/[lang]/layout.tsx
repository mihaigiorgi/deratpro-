import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";

import { MotionProvider } from "@/components/layout/MotionProvider";
import { DEFAULT_LOCALE, hasLocale, LOCALES, localePath, OG_LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE } from "@/lib/site";

import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const { meta } = getDictionary(lang);
  const path = localePath(lang);

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: meta.title,
      template: `%s · ${SITE.name}`,
    },
    description: meta.description,
    applicationName: SITE.name,
    keywords: meta.keywords,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((locale) => [locale, localePath(locale)])),
        "x-default": localePath(DEFAULT_LOCALE),
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((locale) => locale !== lang).map((locale) => OG_LOCALES[locale]),
      url: path,
      siteName: SITE.name,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#070c17",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#continut"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-accent-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-900"
        >
          {dict.common.skipToContent}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
