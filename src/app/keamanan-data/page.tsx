import type { Metadata } from "next";
import { KeamananDataLanding } from "@/components/landing/keamanan-data/keamanan-data-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd, siteConfig } from "@/lib/seo";

const title = "Keamanan Data | SyncVoca";
const description =
  "Pelajari cara SyncVoca menjaga data ABK melalui privacy wall, consent, role-based access, audit trail, minimisasi data, dan pelaporan tersamarkan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/keamanan-data" },
  openGraph: {
    title,
    description,
    url: "/keamanan-data",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: siteConfig.ogImage.url, width: siteConfig.ogImage.width, height: siteConfig.ogImage.height, alt: siteConfig.ogImage.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [siteConfig.ogImage.url] },
};

export default function KeamananDataPage() {
  return (
    <>
      <JsonLd data={buildArticleJsonLd({ title, description, path: "/keamanan-data", publishedAt: siteConfig.updatedAt })} />
      <KeamananDataLanding />
    </>
  );
}
