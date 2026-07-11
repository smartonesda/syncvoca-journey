import type { Metadata } from "next";
import { BuktiKerjaLanding } from "@/components/landing/bukti-kerja/bukti-kerja-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd, siteConfig } from "@/lib/seo";

const title = "Bukti Kerja | SyncVoca";
const description =
  "Pelajari bagaimana SyncVoca mengubah simulasi, skor, catatan pendamping, dan dokumen tugas menjadi portofolio kompetensi yang aman serta siap divalidasi DUDI.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/bukti-kerja",
  },
  openGraph: {
    title,
    description,
    url: "/bukti-kerja",
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

export default function BuktiKerjaPage() {
  return (
    <>
      <JsonLd
        data={buildArticleJsonLd({
          title,
          description,
          path: "/bukti-kerja",
          publishedAt: siteConfig.updatedAt,
        })}
      />
      <BuktiKerjaLanding />
    </>
  );
}
