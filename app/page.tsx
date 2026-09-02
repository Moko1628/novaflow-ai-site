import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import HowItWorks from "@/app/components/HowItWorks";
import SocialProof from "@/app/components/SocialProof";
import FAQ from "@/app/components/FAQ";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <SocialProof />
      <FAQ />
    </div>
  );
}
