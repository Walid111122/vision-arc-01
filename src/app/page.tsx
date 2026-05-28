import { Nav }  from "@/components/human/Nav";
import { Hero } from "@/components/human/Hero";
import { Work } from "@/components/human/Work";
import { Services } from "@/components/human/Services";
import { About } from "@/components/human/About";
import { ContactForm } from "@/components/human/ContactForm";
import { Footer } from "@/components/human/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Work />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </>
  );
}
