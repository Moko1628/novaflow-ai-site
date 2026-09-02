import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import ROICalculator from "./components/ROICalculator";
import WorkflowSimulator from "./components/WorkflowSimulator";
import Pricing from "./components/Pricing";
import SocialProof from "./components/SocialProof";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import ClientPortal from "./components/ClientPortal";
import QuickContact from "./components/QuickContact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <ROICalculator />
      <WorkflowSimulator />
      <Pricing />
      <SocialProof />
      <FAQ />
      <Contact />
      <Footer />
      <ChatWidget />
      <ClientPortal />
      <QuickContact />
    </main>
  );
}
