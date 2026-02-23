import BreadcrumbHero from "@/components/BreadcrumbHero";
import TradingOverview from "@/components/trading/TradingOverview";
import TradingCapabilities from "@/components/trading/TradingCapabilities";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

const pagePath = "/trading";
const pageTitle = "Commodity Trading";
const pageDescription =
  "Active trading and offtake execution supported by market intelligence and coordinated delivery.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "commodity trading",
    "offtake agreements",
    "market execution",
    "logistics coordination",
  ],
});

export default function TradingPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Commodity Trading" },
          ]),
        ]}
      />
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
