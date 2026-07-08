import { notFound } from "next/navigation";
import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec, type PageSpec, type PageSpecKey } from "@/lib/routes";

const dudiSpecByPath: Record<string, PageSpecKey> = {
  kandidat: "/dudi/kandidat",
  lowongan: "/dudi/lowongan",
  validasi: "/dudi/validasi",
  placement: "/dudi/placement",
};

const dudiExtraSpecs: Record<string, PageSpec> = {
  "report-aman": {
    path: "/dashboard/dudi/report-aman",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Report Aman",
    title: "DUDI membaca laporan kolaborasi tanpa membuka data sensitif siswa",
    description:
      "Halaman ini disiapkan untuk ringkasan kandidat, lowongan, validasi, dan placement dengan payload publik yang sudah disetujui.",
    narrative: [
      "Report hanya menampilkan agregat dan kandidat publik yang lolos consent aktif.",
      "DUDI dapat membaca tren kebutuhan skill, readiness kandidat, dan status placement tanpa melihat catatan internal sekolah.",
      "Setiap unduhan report akan mengikuti aturan no-store dan tercatat dalam audit log.",
    ],
    checkpoints: ["public payload", "safe aggregate", "no-store export", "audit trail"],
  },
  "profil-perusahaan": {
    path: "/dashboard/dudi/profil-perusahaan",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Profil Perusahaan",
    title: "Profil DUDI membantu sekolah memahami kebutuhan kerja yang inklusif",
    description:
      "Halaman ini disiapkan untuk profil perusahaan, bidang industri, kontak HRD, kebutuhan skill, dan kesiapan akomodasi kerja.",
    narrative: [
      "Profil perusahaan harus menjelaskan lingkungan kerja, bidang lowongan, dan dukungan yang tersedia untuk kandidat.",
      "Skill kebutuhan ditulis sebagai kompetensi yang bisa dicocokkan dengan evidence siswa.",
      "Perubahan profil perusahaan tetap menjadi bagian dari jejak kolaborasi dan audit.",
    ],
    checkpoints: ["company profile", "inclusive workplace", "skill needs", "audited update"],
  },
  bantuan: {
    path: "/dashboard/dudi/bantuan",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Bantuan DUDI",
    title: "Panduan membantu DUDI memakai SyncVoca dengan aman dan jelas",
    description:
      "Halaman ini disiapkan untuk panduan membaca kandidat, batas data publik, validasi, shortlist, dan placement.",
    narrative: [
      "Panduan harus menjelaskan mengapa identitas sensitif tidak tampil dan data apa yang aman dibaca.",
      "Flow validasi ditulis sebagai kontribusi industri terhadap bukti kerja, bukan akses bebas terhadap siswa.",
      "Bantuan placement mengarahkan DUDI menjaga follow-up agar sekolah dan keluarga tetap mendapat konteks.",
    ],
    checkpoints: ["privacy guide", "validation guide", "shortlist flow", "placement support"],
  },
};

type DashboardDudiSectionPageProps = {
  params: Promise<{
    path: string[];
  }>;
};

export default async function DashboardDudiSectionPage({
  params,
}: DashboardDudiSectionPageProps) {
  const { path } = await params;
  const pathKey = path.join("/");
  const specKey = pathKey.startsWith("kandidat/")
    ? "/dudi/kandidat/[candidateCode]"
    : dudiSpecByPath[pathKey];
  const page = specKey ? getPageSpec(specKey) : dudiExtraSpecs[pathKey];

  if (!page) {
    notFound();
  }

  return <RoutePlaceholderPage page={page} />;
}
