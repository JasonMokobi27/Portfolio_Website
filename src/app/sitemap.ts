import type { MetadataRoute } from "next";
import { getCategorySlugs, getSlugs } from "@/lib/projects";
import { SITE } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.domain, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...getCategorySlugs().map((slug) => ({
      url: `${SITE.domain}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...getSlugs().map((slug) => ({
      url: `${SITE.domain}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
