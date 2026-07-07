import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const content = [
    "/* TEAM */",
    `Product: ${siteConfig.name}`,
    "Focus: Vokasi inklusif, portofolio bukti kerja, consent keluarga, validasi DUDI.",
    `Contact: ${siteConfig.email}`,
    "",
    "/* SITE */",
    `URL: ${siteConfig.url}/`,
    "Language: Indonesian",
    "Frontend: Next.js, React, TypeScript, Tailwind CSS",
    "PWA: enabled",
    "Accessibility: responsive, semantic sections, keyboard-friendly navigation",
    "",
    "/* GEO */",
    "AI-ready files: /llms.txt, /sitemap.xml, /robots.txt, /feed.xml",
    "Structured data: Organization, WebSite, BreadcrumbList, FAQPage",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
