import type { Metadata } from "next";
import { UntukSiapaLanding } from "@/components/landing/untuk-siapa/untuk-siapa-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd, siteConfig } from "@/lib/seo";

const title = "Untuk Siapa | SyncVoca";
const description =
  "Temukan manfaat SyncVoca untuk siswa ABK, guru, orang tua, DUDI, serta admin sekolah dengan akses dan pengalaman yang sesuai setiap peran.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/untuk-siapa" },
  openGraph: {
    title,
    description,
    url: "/untuk-siapa",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: siteConfig.ogImage.url, width: siteConfig.ogImage.width, height: siteConfig.ogImage.height, alt: siteConfig.ogImage.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [siteConfig.ogImage.url] },
};

export default function UntukSiapaPage() {
  return (
    <>
      <JsonLd data={buildArticleJsonLd({ title, description, path: "/untuk-siapa", publishedAt: siteConfig.updatedAt })} />
      <UntukSiapaLanding />
    </>
  );
}
