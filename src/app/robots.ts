import type { MetadataRoute } from "next";
import { absoluteUrl, privateSeoPaths, siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          ...privateSeoPaths.map((path) => `${path}/`),
          ...privateSeoPaths,
          "/api/",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
