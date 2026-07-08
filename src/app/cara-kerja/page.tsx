import type { Metadata } from "next";
import { CaraKerjaLanding } from "@/components/landing/cara-kerja/cara-kerja-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd, siteConfig } from "@/lib/seo";

const title = "Cara Kerja | SyncVoca";
const description =
  "Pahami alur SyncVoca dari mengenal potensi, simulasi adaptif, evidence stack, pendampingan, portofolio, hingga validasi DUDI yang aman.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/cara-kerja",
  },
  openGraph: {
    title,
    description,
    url: "/cara-kerja",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage.url,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.ogImage.url],
  },
};

export default function CaraKerjaPage() {
  return (
    <>
      <JsonLd
        data={buildArticleJsonLd({
          title,
          description,
          path: "/cara-kerja",
          publishedAt: siteConfig.updatedAt,
        })}
      />
      <CaraKerjaLanding />
    </>
  );
}
