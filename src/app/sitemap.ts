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
    {
      url: absoluteUrl("/cara-kerja"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/ekosistem"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/bukti-kerja"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/keamanan-data"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/untuk-siapa"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/kontak"),
      lastModified: new Date(siteConfig.updatedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];
}
