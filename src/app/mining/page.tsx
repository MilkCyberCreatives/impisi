import BreadcrumbHero from "@/components/BreadcrumbHero";
import MiningOverview from "@/components/mining/MiningOverview";
import MiningModels from "@/components/mining/MiningModels";
import MiningCapabilities from "@/components/mining/MiningCapabilities";
import FooterSection from "@/components/FooterSection";

export default function MiningPage() {
  return (
    <main>
      <BreadcrumbHero
        title="Mining"
        subtitle="Mining operations aligned to beneficiation requirements for consistent feed quality and operational stability."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Mining" },
        ]}
      />

      <MiningOverview />
      <MiningModels />
      <MiningCapabilities />

      <FooterSection />
    </main>
  );
}
