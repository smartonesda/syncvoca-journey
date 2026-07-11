import type { Metadata } from "next";
import { KontakLanding } from "@/components/landing/kontak/kontak-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd, siteConfig } from "@/lib/seo";

const title = "Kontak | SyncVoca";
const description =
  "Hubungi SyncVoca untuk kolaborasi sekolah, keluarga, DUDI, komunitas, demo platform, dan kemitraan dalam membangun perjalanan vokasi ABK yang inklusif.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kontak" },
  openGraph: {
    title,
    description,
    url: "/kontak",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: siteConfig.ogImage.url, width: siteConfig.ogImage.width, height: siteConfig.ogImage.height, alt: siteConfig.ogImage.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [siteConfig.ogImage.url] },
};

export default function KontakPage() {
  return (
    <>
      <JsonLd data={buildArticleJsonLd({ title, description, path: "/kontak", publishedAt: siteConfig.updatedAt })} />
      <KontakLanding />
    </>
  );
}
