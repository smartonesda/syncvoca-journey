import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/tentang-kami"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
