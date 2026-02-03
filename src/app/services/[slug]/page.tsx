import { notFound } from "next/navigation";
import BreadcrumbHero from "@/components/BreadcrumbHero";
import ServiceDetail from "@/components/services/ServiceDetail";
import FooterSection from "@/components/FooterSection";
import { SERVICES } from "@/data/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return (
    <main>
      <BreadcrumbHero
        title={service.title}
        subtitle={service.subtitle}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <ServiceDetail service={service} />

      <FooterSection />
    </main>
  );
}
