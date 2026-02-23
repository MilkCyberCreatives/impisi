import BreadcrumbHero from "@/components/BreadcrumbHero";
import ProjectsOverview from "@/components/projects/ProjectsOverview";
import GrowthStrategy from "@/components/projects/GrowthStrategy";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

const pagePath = "/projects";
const pageTitle = "Project Development";
const pageDescription =
  "A scalable mining and beneficiation platform focused on disciplined growth and predictable delivery.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "project development",
    "mining growth strategy",
    "beneficiation expansion",
    "southern africa projects",
  ],
});

export default function ProjectsPage() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, pageTitle, pageDescription),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Project Development" },
          ]),
        ]}
      />
      <BreadcrumbHero
        title="Project Development"
        subtitle="A scalable mining and beneficiation platform focused on disciplined growth and predictable delivery."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Project Development" },
        ]}
      />

      <ProjectsOverview />
      <GrowthStrategy />

      <FooterSection />
    </main>
  );
}
