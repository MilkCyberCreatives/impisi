import BreadcrumbHero from "@/components/BreadcrumbHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import FooterSection from "@/components/FooterSection";
import { SERVICES } from "@/data/services";

export default function ServicesPage() {
  return (
    <main>
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
