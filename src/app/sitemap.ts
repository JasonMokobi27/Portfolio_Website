import type { MetadataRoute } from "next";
import { getSlugs } from "@/lib/projects";
import { SITE } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.domain, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...getSlugs().map((slug) => ({
      url: `${SITE.domain}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
