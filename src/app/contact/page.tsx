import BreadcrumbHero from "@/components/BreadcrumbHero";
import ContactSection from "@/components/contact/ContactSection";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  localBusinessSchema,
} from "@/lib/structured-data";

const pagePath = "/contact";
const pageTitle = "Contact";
const pageDescription =
  "Reach out for discussions on mining operations, exploration, beneficiation, commodity trading, and project development.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "contact impisi resources",
    "mining enquiries",
    "commodity trading enquiries",
    "south africa",
  ],
});

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]),
          localBusinessSchema,
        ]}
      />
      <BreadcrumbHero
        title="Contact"
        subtitle="Reach out for discussions on mining operations, exploration, beneficiation, commodity trading, and project development."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <ContactSection />

      <FooterSection />
    </main>
  );
}
