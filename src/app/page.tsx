import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";
import ContractBanner from "@/components/ContractBanner";
import VsSection from "@/components/VsSection";
import BenefitsSection from "@/components/BenefitsSection";
import LlmSection from "@/components/LlmSection";
import PricingSection from "@/components/PricingSection";
import CompareSection from "@/components/CompareSection";
import RoiSection from "@/components/RoiSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <ContractBanner />
        <VsSection />
        <BenefitsSection />
        <LlmSection />
        <PricingSection />
        <CompareSection />
        <RoiSection />
        <GuaranteeSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
