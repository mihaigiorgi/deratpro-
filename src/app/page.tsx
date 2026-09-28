import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyDeratPro } from "@/components/sections/WhyDeratPro";
import { Container } from "@/components/ui/Container";

// Secțiuni temporare — le înlocuim una câte una în pașii următori.
const PLACEHOLDERS = [
  { id: "proces", title: "Proces", bg: "bg-ink-850" },
  { id: "contact", title: "Contact", bg: "bg-ink-900" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="continut">
        <Hero />
        <Services />
        <WhyDeratPro />
        {PLACEHOLDERS.map((section) => (
          <section key={section.id} id={section.id} className={`${section.bg} flex min-h-screen items-center`}>
            <Container>
              <h2 className="text-4xl font-semibold text-accent-500">{section.title}</h2>
            </Container>
          </section>
        ))}
      </main>
    </>
  );
}
