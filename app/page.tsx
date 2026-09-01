import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import SocialProof from "./components/SocialProof";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Pricing />
      <SocialProof />
      <Contact />
      <Footer />
    </main>
  );
}
