import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbHero from "@/components/BreadcrumbHero";
import ServiceDetail from "@/components/services/ServiceDetail";
import FooterSection from "@/components/FooterSection";
import { SERVICES } from "@/data/services";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";

type Params = { slug: string };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return buildPageMetadata({
      title: "Service",
      description: "Service detail page",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    imagePath: service.image,
    keywords: [service.title, "impisi services", "mining services south africa"],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return notFound();

  const pagePath = `/services/${service.slug}`;

  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(pagePath, service.title, service.summary),
          buildBreadcrumbSchema(pagePath, [
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]),
          buildServiceSchema(service),
        ]}
      />
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
