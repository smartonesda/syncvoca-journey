import type { Metadata } from "next";
import { TentangKamiLanding } from "@/components/landing/tentang-kami-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd, siteConfig } from "@/lib/seo";

const title = "Tentang Kami | SyncVoca";
const description =
  "Kenali visi SyncVoca dalam membantu ABK membangun bukti kerja yang aman, terukur, dan dipahami oleh sekolah, keluarga, serta dunia industri.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title,
    description,
    url: "/tentang-kami",
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

export default function TentangKamiPage() {
  return (
    <>
      <JsonLd
        data={buildArticleJsonLd({
          title,
          description,
          path: "/tentang-kami",
          publishedAt: siteConfig.updatedAt,
        })}
      />
      <TentangKamiLanding />
    </>
  );
}
