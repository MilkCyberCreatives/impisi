import BreadcrumbHero from "@/components/BreadcrumbHero";
import MiningOperationsIntro from "@/components/mining/MiningOperationsIntro";
import MiningModels from "@/components/mining/MiningModels";
import MiningCapabilities from "@/components/mining/MiningCapabilities";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

const pagePath = "/mining";
const pageTitle = "Mining";
const pageDescription =
  "Mining operations aligned to beneficiation requirements for consistent feed quality and operational stability.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: ["mining operations", "open-pit mining", "grade control", "mine to plant"],
});

export default function MiningPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Mining" },
          ]),
        ]}
      />
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
