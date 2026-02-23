import type { ServiceItem } from "@/data/services";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

const CONTACT_PHONE = "+27 11 082 9828";
const CONTACT_EMAIL = "info@impisiresources.co.za";

type BreadcrumbItem = { label: string; href?: string };

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl("/opengraph-image"),
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
    addressRegion: "South Africa",
  },
  areaServed: "South Africa",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-ZA",
  publisher: {
    "@id": `${SITE_URL}#organization`,
  },
};

export function buildWebPageSchema(
  path: string,
  title: string,
  description: string
) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    about: {
      "@id": `${SITE_URL}#organization`,
    },
  };
}

export function buildBreadcrumbSchema(path: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href || path),
    })),
  };
}

export function buildServicesItemListSchema(services: ServiceItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/services/${service.slug}`),
      name: service.title,
      description: service.summary,
    })),
  };
}

export function buildServiceSchema(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: {
      "@id": `${SITE_URL}#organization`,
    },
    areaServed: "South Africa",
    url: absoluteUrl(`/services/${service.slug}`),
  };
}
