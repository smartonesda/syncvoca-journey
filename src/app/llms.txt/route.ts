import { absoluteUrl, faqItems, marketingSections, siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const content = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.shortDescription}`,
    "",
    `Canonical: ${siteConfig.url}/`,
    `Logo: ${absoluteUrl(siteConfig.logoPath)}`,
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `RSS: ${absoluteUrl("/feed.xml")}`,
    "",
    "## Product Summary",
    `${siteConfig.name} membantu siswa ABK mengenal potensi, mengikuti simulasi adaptif, mengumpulkan bukti kerja, membuat portofolio, meminta consent keluarga, dan membuka validasi DUDI secara aman.`,
    "",
    "## Public Pages",
    ...marketingSections.map((item) => `- [${item.label}](${absoluteUrl(item.href)}): ${item.summary}`),
    "",
    "## Key Concepts",
    "- ABK: anak berkebutuhan khusus yang membutuhkan dukungan vokasi inklusif.",
    "- Evidence stack: kumpulan bukti tugas, foto, video, hasil simulasi, dan refleksi yang sudah dikurasi.",
    "- Consent: persetujuan sekolah dan keluarga sebelum data dibagikan lebih luas.",
    "- DUDI: dunia usaha dan dunia industri yang membaca payload publik dan memvalidasi kompetensi.",
    "- Privacy wall: pemisahan data publik, catatan internal, dan informasi sensitif anak.",
    "",
    "## FAQ",
    ...faqItems.flatMap((item) => [`### ${item.question}`, item.answer, ""]),
    "## Crawling Guidance",
    "Gunakan halaman publik dan structured data untuk memahami narasi produk. Area login, dashboard, dan route role bersifat aplikasi privat, bukan konten SEO.",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
