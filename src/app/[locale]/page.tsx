import { ComparisonTable } from "@/components/comparison-table";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PrincipalFormContact from "@/components/PrincipalFormContact";
import { FeaturesSection } from "@/components/features-section";
import { CTASection } from "@/components/cta-section";
import { ProcessSection } from "@/components/process-section";
import SituationsSection from "@/components/situations-section";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhyChooseSection from "@/components/why-choose-section";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main className="bg-[#f1f1f1]">
      <Hero />
      <ProcessSection />
      <ComparisonTable />
      <SituationsSection />
      <WhyChooseSection />
      <Testimonials />
      <CTASection />
      <PrincipalFormContact />
    </main>
  );
}
