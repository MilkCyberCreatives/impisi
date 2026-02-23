import BreadcrumbHero from "@/components/BreadcrumbHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutPillars from "@/components/about/AboutPillars";
import AboutSustainability from "@/components/about/AboutSustainability";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

const pagePath = "/about";
const pageTitle = "About Impisi Resources";
const pageDescription =
  "An integrated mining, beneficiation and commodity solutions platform focused on disciplined execution, quality consistency and dependable delivery.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "about impisi resources",
    "mining company south africa",
    "integrated commodity platform",
  ],
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "About" },
          ]),
        ]}
      />
      <BreadcrumbHero
        title="About Impisi Resources"
        subtitle="An integrated mining, beneficiation and commodity solutions platform focused on disciplined execution, quality consistency and dependable delivery."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <AboutIntro />
      <AboutPillars />
      <AboutSustainability />

      <FooterSection />
    </main>
  );
}
