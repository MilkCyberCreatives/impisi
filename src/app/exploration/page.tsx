import BreadcrumbHero from "@/components/BreadcrumbHero";
import ExplorationOverview from "@/components/exploration/ExplorationOverview";
import ExplorationFocus from "@/components/exploration/ExplorationFocus";
import ExplorationActivities from "@/components/exploration/ExplorationActivities";
import FooterSection from "@/components/FooterSection";

export default function ExplorationPage() {
  return (
    <main>
      <BreadcrumbHero
        title="Exploration"
        subtitle="A commercially focused, risk-managed exploration strategy aimed at fast-tracking viable resources into production."
        crumbs={[{ label: "Home", href: "/" }, { label: "Exploration" }]}
      />

      <ExplorationOverview />
      <ExplorationFocus />
      <ExplorationActivities />

      <FooterSection />
    </main>
  );
}
