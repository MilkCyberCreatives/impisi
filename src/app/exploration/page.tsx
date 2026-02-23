import BreadcrumbHero from "@/components/BreadcrumbHero";
import ExplorationOverview from "@/components/exploration/ExplorationOverview";
import ExplorationFocus from "@/components/exploration/ExplorationFocus";
import ExplorationActivities from "@/components/exploration/ExplorationActivities";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

const pagePath = "/exploration";
const pageTitle = "Exploration";
const pageDescription =
  "A commercially focused, risk-managed exploration strategy aimed at fast-tracking viable resources into production.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "resource development",
    "exploration strategy",
    "brownfield exploration",
    "mine extensions",
  ],
});

export default function ExplorationPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Exploration" },
          ]),
        ]}
      />
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
