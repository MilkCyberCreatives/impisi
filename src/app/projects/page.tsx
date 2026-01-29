import BreadcrumbHero from "@/components/BreadcrumbHero";
import ProjectsOverview from "@/components/projects/ProjectsOverview";
import GrowthStrategy from "@/components/projects/GrowthStrategy";
import FooterSection from "@/components/FooterSection";

export default function ProjectsPage() {
  return (
    <main>
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
