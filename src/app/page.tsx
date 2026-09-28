import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyDeratPro } from "@/components/sections/WhyDeratPro";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="continut" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <WhyDeratPro />
        <Process />
        <Contact />
      </main>
    </>
  );
}