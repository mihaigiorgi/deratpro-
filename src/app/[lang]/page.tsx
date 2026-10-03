import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyDeratPro } from "@/components/sections/WhyDeratPro";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <Navbar dict={dict.nav} locale={lang} />
      <main id="continut" tabIndex={-1} className="outline-none">
        <Hero dict={dict.hero} />
        <Services dict={dict.services} />
        <WhyDeratPro dict={dict.why} />
        <Process dict={dict.process} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
