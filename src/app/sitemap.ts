import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }> = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.85 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/mining", changeFrequency: "weekly", priority: 0.85 },
    { path: "/exploration", changeFrequency: "weekly", priority: 0.85 },
    { path: "/beneficiation", changeFrequency: "weekly", priority: 0.85 },
    { path: "/trading", changeFrequency: "weekly", priority: 0.85 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.85 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes = SERVICES.map((service) => ({
    path: `/services/${service.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
