export const vociDestinations = [
  {
    href: "/tentang-kami",
    label: "Tentang SyncVoca",
    summary: "tujuan, visi, dan manfaat utama SyncVoca",
  },
  {
    href: "/cara-kerja",
    label: "Cara kerja SyncVoca",
    summary: "alur dari mengenal potensi sampai validasi DUDI",
  },
  {
    href: "/ekosistem",
    label: "Ekosistem SyncVoca",
    summary: "peran siswa, sekolah, keluarga, DUDI, komunitas, dan mitra",
  },
  {
    href: "/bukti-kerja",
    label: "Bukti kerja & portofolio",
    summary: "simulasi, evidence stack, portofolio, dan validasi kompetensi",
  },
  {
    href: "/keamanan-data",
    label: "Keamanan data",
    summary: "consent, privacy wall, minimisasi data, audit trail, dan akses berbasis peran",
  },
  {
    href: "/untuk-siapa",
    label: "Untuk siapa SyncVoca",
    summary: "manfaat dan akses untuk siswa ABK, guru, orang tua, DUDI, serta admin sekolah",
  },
  {
    href: "/kontak",
    label: "Kontak & kolaborasi",
    summary: "demo, kemitraan, dan cara menghubungi tim SyncVoca",
  },
] as const;

export type VociDestinationHref = (typeof vociDestinations)[number]["href"];

export function isVociDestination(value: string): value is VociDestinationHref {
  return vociDestinations.some((destination) => destination.href === value);
}

export function getVociDestination(href: VociDestinationHref) {
  return vociDestinations.find((destination) => destination.href === href);
}
