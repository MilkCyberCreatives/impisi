import BreadcrumbHero from "@/components/BreadcrumbHero";
import TradingOverview from "@/components/trading/TradingOverview";
import TradingCapabilities from "@/components/trading/TradingCapabilities";
import FooterSection from "@/components/FooterSection";

export default function TradingPage() {
  return (
    <main>
      <BreadcrumbHero
        title="Commodity Trading"
        subtitle="Active trading and offtake execution supported by market intelligence and coordinated delivery."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Commodity Trading" },
        ]}
      />

      <TradingOverview />
      <TradingCapabilities />

      <FooterSection />
    </main>
  );
}
