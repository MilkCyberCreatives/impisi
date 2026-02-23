import { SERVICES } from "@/data/services";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `Website: ${SITE_URL}`,
    `Description: ${SITE_DESCRIPTION}`,
    "",
    "## Core Pages",
    `- Home: ${absoluteUrl("/")}`,
    `- About: ${absoluteUrl("/about")}`,
    `- Services: ${absoluteUrl("/services")}`,
    `- Mining: ${absoluteUrl("/mining")}`,
    `- Exploration: ${absoluteUrl("/exploration")}`,
    `- Beneficiation: ${absoluteUrl("/beneficiation")}`,
    `- Commodity Trading: ${absoluteUrl("/trading")}`,
    `- Project Development: ${absoluteUrl("/projects")}`,
    `- Contact: ${absoluteUrl("/contact")}`,
    "",
    "## Service Detail Pages",
    ...SERVICES.map((service) => `- ${service.title}: ${absoluteUrl(`/services/${service.slug}`)}`),
    "",
    "## Contact",
    "- Phone: +27 11 082 9828",
    "- Email: info@impisiresources.co.za",
    "- Region: South Africa",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
