import type { MetadataRoute } from "next";
import { FEATURED_PROJECTS } from "@/data/content";

const siteUrl = "https://rayyankhan.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date() },
    ...FEATURED_PROJECTS.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
