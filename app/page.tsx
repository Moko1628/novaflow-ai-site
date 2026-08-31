import Hero from "./components/Hero";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import SocialProof from "./components/SocialProof";
import HowItWorks from "./components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Pricing />
      <SocialProof />
      <HowItWorks />
    </main>
  );
}
