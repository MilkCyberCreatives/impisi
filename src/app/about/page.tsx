import BreadcrumbHero from "@/components/BreadcrumbHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutPillars from "@/components/about/AboutPillars";
import AboutSustainability from "@/components/about/AboutSustainability";
import FooterSection from "@/components/FooterSection";

export default function AboutPage() {
  return (
    <main>
      <BreadcrumbHero
        title="About Impisi Resources"
        subtitle="An integrated mining, beneficiation and commodity solutions platform focused on disciplined execution, quality consistency and dependable delivery."
        bgImage="/platform.jpg"
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
