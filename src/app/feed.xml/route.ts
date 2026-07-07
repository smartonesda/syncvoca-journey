import { absoluteUrl, feedItems, siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const updatedAt = new Date(siteConfig.updatedAt).toUTCString();
  const items = feedItems
    .map((item) => {
      const url = absoluteUrl(item.href);

      return [
        "<item>",
        `<title>${escapeXml(item.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid>${escapeXml(url)}</guid>`,
        `<description>${escapeXml(item.description)}</description>`,
        `<pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${escapeXml(`${siteConfig.name} Updates`)}</title>`,
    `<link>${escapeXml(siteConfig.url)}/</link>`,
    `<description>${escapeXml(siteConfig.shortDescription)}</description>`,
    `<language>${siteConfig.language}</language>`,
    `<lastBuildDate>${updatedAt}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
