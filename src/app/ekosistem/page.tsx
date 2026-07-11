import type { Metadata } from "next";
import { EkosistemLanding } from "@/components/landing/ekosistem/ekosistem-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd, siteConfig } from "@/lib/seo";

const title = "Ekosistem | SyncVoca";
const description =
  "Kenali ekosistem SyncVoca yang menghubungkan siswa ABK, sekolah, keluarga, DUDI, komunitas, dan mitra untuk membangun jalur vokasi yang inklusif.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/ekosistem",
  },
  openGraph: {
    title,
    description,
    url: "/ekosistem",
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

export default function EkosistemPage() {
  return (
    <>
      <JsonLd
        data={buildArticleJsonLd({
          title,
          description,
          path: "/ekosistem",
          publishedAt: siteConfig.updatedAt,
        })}
      />
      <EkosistemLanding />
    </>
  );
}
