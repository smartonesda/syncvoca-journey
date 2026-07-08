import { notFound } from "next/navigation";
import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec, type PageSpec, type PageSpecKey } from "@/lib/routes";

const adminSpecByPath: Record<string, PageSpecKey> = {
  overview: "/admin/overview",
  users: "/admin/users",
  schools: "/admin/schools",
  dudi: "/admin/dudi",
  consent: "/admin/consent",
  audit: "/admin/audit",
  reports: "/admin/reports",
};

const adminExtraSpecs: Record<string, PageSpec> = {
  students: {
    path: "/dashboard/admin/students",
    role: "admin",
    surface: "governance",
    eyebrow: "Student Governance",
    title: "Admin memantau data siswa lintas sekolah tanpa membuka detail sensitif",
    description:
      "Halaman ini disiapkan untuk daftar siswa lintas tenant, status journey, consent, validasi, dan risiko data yang perlu dipantau admin.",
    narrative: [
      "Tampilkan ringkasan siswa berdasarkan sekolah, kelas, tahap journey, status consent, dan kesiapan validasi.",
      "Admin hanya membaca sinyal tata kelola dan status agregat, bukan catatan pendampingan personal yang menjadi ruang guru.",
      "Aksi lanjut diarahkan ke audit, consent governance, atau eskalasi tenant agar batas role tetap jelas.",
    ],
    checkpoints: ["tenant filter", "privacy-safe summary", "consent status", "audit escalation"],
  },
  "placement-metrics": {
    path: "/dashboard/admin/placement-metrics",
    role: "admin",
    surface: "governance",
    eyebrow: "Placement Metrics",
    title: "Outcome placement dibaca sebagai kesehatan ekosistem, bukan sekadar angka",
    description:
      "Halaman ini menyiapkan metrik kandidat siap DUDI, shortlist, onboarding, dan follow-up agar admin melihat dampak program secara menyeluruh.",
    narrative: [
      "Pisahkan metrik kesiapan, proses DUDI, dan hasil placement supaya bottleneck mudah ditemukan.",
      "Gunakan filter sekolah, industri, periode, dan status consent untuk menjaga konteks analisis.",
      "Setiap ekspor tetap memakai payload aman dan tercatat di audit log.",
    ],
    checkpoints: ["outcome metrics", "industry filter", "safe export", "audit trail"],
  },
  settings: {
    path: "/dashboard/admin/settings",
    role: "admin",
    surface: "governance",
    eyebrow: "System Settings",
    title: "Pengaturan sistem menjaga tenant, role, dan integrasi tetap terkendali",
    description:
      "Halaman ini disiapkan untuk konfigurasi tenant, role default, keamanan, notifikasi, integrasi DUDI, dan aturan laporan.",
    narrative: [
      "Konfigurasi yang berdampak pada keamanan perlu konfirmasi jelas dan jejak audit.",
      "Pengaturan dibagi menjadi tenant, user & role, data sharing, notifikasi, integrasi, dan laporan.",
      "Perubahan besar tidak dilakukan diam-diam dari UI; backend tetap menjadi lapisan validasi final.",
    ],
    checkpoints: ["tenant config", "role policy", "data sharing rules", "audited changes"],
  },
};

type DashboardAdminSectionPageProps = {
  params: Promise<{
    path: string[];
  }>;
};

export default async function DashboardAdminSectionPage({
  params,
}: DashboardAdminSectionPageProps) {
  const { path } = await params;
  const pathKey = path.join("/");
  const specKey = adminSpecByPath[pathKey];
  const page = specKey ? getPageSpec(specKey) : adminExtraSpecs[pathKey];

  if (!page) {
    notFound();
  }

  return <RoutePlaceholderPage page={page} />;
}
