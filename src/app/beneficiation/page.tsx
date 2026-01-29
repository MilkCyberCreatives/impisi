import BreadcrumbHero from "@/components/BreadcrumbHero";
import BeneficiationOverview from "@/components/beneficiation/BeneficiationOverview";
import WolfmountainCapabilities from "@/components/beneficiation/WolfmountainCapabilities";
import ProcessingPhilosophy from "@/components/beneficiation/ProcessingPhilosophy";
import FooterSection from "@/components/FooterSection";

export default function BeneficiationPage() {
  return (
    <main>
      <BreadcrumbHero
        title="Beneficiation"
        subtitle="Mineral processing and beneficiation enabling market-ready products and improved recovery outcomes."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Beneficiation" },
        ]}
      />

      <BeneficiationOverview />
      <WolfmountainCapabilities />
      <ProcessingPhilosophy />

      <FooterSection />
    </main>
  );
}
