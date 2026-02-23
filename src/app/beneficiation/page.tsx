import BreadcrumbHero from "@/components/BreadcrumbHero";
import BeneficiationOverview from "@/components/beneficiation/BeneficiationOverview";
import WolfmountainCapabilities from "@/components/beneficiation/WolfmountainCapabilities";
import ProcessingPhilosophy from "@/components/beneficiation/ProcessingPhilosophy";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

const pagePath = "/beneficiation";
const pageTitle = "Beneficiation";
const pageDescription =
  "Mineral processing and beneficiation enabling market-ready products and improved recovery outcomes.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "mineral processing",
    "chrome beneficiation",
    "wash plant",
    "recovery optimisation",
  ],
});

export default function BeneficiationPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Beneficiation" },
          ]),
        ]}
      />
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
