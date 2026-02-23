import BreadcrumbHero from "@/components/BreadcrumbHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import FooterSection from "@/components/FooterSection";
import { SERVICES } from "@/data/services";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildServicesItemListSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

const pagePath = "/services";
const pageTitle = "Services";
const pageDescription =
  "Explore integrated services across the value chain, including mining operations, exploration, beneficiation, commodity trading, project development and logistics.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "mining services",
    "beneficiation services",
    "commodity trading services",
    "project development services",
  ],
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Services" },
          ]),
          buildServicesItemListSchema(SERVICES),
        ]}
      />
      <BreadcrumbHero
        title="Services"
        subtitle="Explore integrated services across the value chain — each service opens to a dedicated detail page."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <ServicesGrid items={SERVICES} />

      <FooterSection />
    </main>
  );
}
