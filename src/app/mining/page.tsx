import BreadcrumbHero from "@/components/BreadcrumbHero";
import MiningOperationsIntro from "@/components/mining/MiningOperationsIntro";
import MiningModels from "@/components/mining/MiningModels";
import MiningCapabilities from "@/components/mining/MiningCapabilities";
import FooterSection from "@/components/FooterSection";

export default function MiningPage() {
  return (
    <main>
      <BreadcrumbHero
        title="Mining"
        subtitle="Mining operations aligned to beneficiation requirements for consistent feed quality and operational stability."
        crumbs={[{ label: "Home", href: "/" }, { label: "Mining" }]}
      />

      <MiningOperationsIntro />
      <MiningModels />
      <MiningCapabilities />

      <FooterSection />
    </main>
  );
}
