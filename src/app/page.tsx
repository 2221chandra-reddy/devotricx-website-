import About from "@/components/About";
import ChatAssistant from "@/components/ChatAssistant";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Stats />
        <Process />
        <Portfolio />
        <Technologies />
        <Testimonials />
        <Clients />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </>
  );
}
