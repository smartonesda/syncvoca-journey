import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8faf7",
    theme_color: "#0b6f31",
    orientation: "portrait-primary",
    categories: ["education", "productivity"],
    icons: [
      {
        src: siteConfig.logoPath,
        sizes: "640x640",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.logoPath,
        sizes: "640x640",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
