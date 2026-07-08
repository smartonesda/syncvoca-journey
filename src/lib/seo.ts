const productionUrl = "https://syncvoca.vercel.app";

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export const siteConfig = {
  name: "SyncVoca",
  title: "SyncVoca - Bukti Kerja, Masa Depan, Bersama",
  description:
    "Platform vokasi inklusif untuk membantu ABK mengenal potensi, membangun portofolio bukti kerja, menjaga consent keluarga, dan siap divalidasi DUDI.",
  shortDescription:
    "Platform vokasi inklusif untuk journey ABK, portofolio bukti kerja, consent, dan validasi DUDI.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL ?? productionUrl),
  locale: "id_ID",
  language: "id-ID",
  logoPath: "/syncvoca-logo.png",
  updatedAt: "2026-07-07T00:00:00.000Z",
  email: "hello@syncvoca.id",
  phone: "+62 21 1234 5678",
  address: "Jl. Pendidikan No. 1, Jakarta, Indonesia",
  keywords: [
    "SyncVoca",
    "vokasi inklusif",
    "ABK",
    "anak berkebutuhan khusus",
    "portofolio kerja",
    "evidence kompetensi",
    "validasi DUDI",
    "dashboard pendampingan",
    "PWA pendidikan",
    "pendampingan siswa",
  ],
  ogImage: {
    url: "/syncvoca-logo.png",
    width: 640,
    height: 640,
    alt: "Logo SyncVoca",
  },
} as const;

export const marketingSections = [
  {
    label: "Beranda",
    href: "/",
    summary:
      "Cerita utama tentang potensi ABK, bukti kerja, dan kesiapan masa depan.",
  },
  {
    label: "Cara Kerja",
    href: "/cara-kerja",
    summary:
      "Alur lima tahap dari mengenal diri, eksplorasi minat, pra-internship, internship, sampai siap kerja.",
  },
  {
    label: "Bukti Kerja",
    href: "/#bukti-kerja",
    summary:
      "Aktivitas siswa dikumpulkan sebagai evidence stack, portofolio, dan validasi DUDI.",
  },
  {
    label: "Keamanan Data",
    href: "/#keamanan-data",
    summary:
      "Batas data publik dan data sensitif dijaga melalui consent, kontrol akses, dan audit.",
  },
  {
    label: "Untuk Siapa",
    href: "/#untuk-siapa",
    summary: "Manfaat SyncVoca untuk siswa, guru, orang tua, DUDI, dan admin.",
  },
  {
    label: "Ekosistem",
    href: "/#ekosistem",
    summary:
      "Kolaborasi sekolah, keluarga, industri, dan mitra untuk vokasi inklusif.",
  },
  {
    label: "Tentang Kami",
    href: "/tentang-kami",
    summary:
      "Visi SyncVoca untuk membuat perjalanan ABK lebih terbaca, aman, dan bermakna.",
  },
  {
    label: "Kontak",
    href: "/#kontak",
    summary: "Kanal komunikasi SyncVoca untuk sekolah, DUDI, dan mitra.",
  },
] as const;

export const privateSeoPaths = [
  "/login",
  "/forgot-password",
  "/accept-invite",
  "/offline",
  "/dashboard",
  "/siswa",
  "/orang-tua",
  "/guru",
  "/dudi",
  "/admin",
] as const;

export const faqItems = [
  {
    question: "Apa itu SyncVoca?",
    answer:
      "SyncVoca adalah platform vokasi inklusif yang membantu ABK mengenal potensi, berlatih lewat simulasi, mengumpulkan bukti kerja, dan menyiapkan portofolio yang bisa divalidasi industri.",
  },
  {
    question: "Bagaimana SyncVoca membantu siswa ABK?",
    answer:
      "SyncVoca membagi perjalanan siswa menjadi lima tahap: mengenal diri, eksplorasi minat, pra-internship, internship, dan siap kerja. Setiap tahap menghasilkan bukti perkembangan yang mudah dipahami.",
  },
  {
    question: "Apakah data anak aman di SyncVoca?",
    answer:
      "Data sensitif tetap berada pada ruang sekolah dan keluarga. DUDI hanya melihat informasi publik yang relevan setelah ada consent dari pihak yang berwenang.",
  },
  {
    question: "Siapa saja yang menggunakan SyncVoca?",
    answer:
      "SyncVoca dirancang untuk siswa, guru, orang tua, DUDI, dan admin sekolah agar perjalanan vokasi inklusif bisa dipantau dari sudut pandang masing-masing.",
  },
  {
    question: "Apa yang dilihat DUDI dari portofolio siswa?",
    answer:
      "DUDI melihat ringkasan kompetensi, evidence kerja yang sudah dipilih, status validasi, dan informasi kesiapan kerja yang aman dibagikan.",
  },
] as const;

export const feedItems = [
  {
    title: "SyncVoca membantu aktivitas siswa menjadi bukti kerja",
    href: "/#bukti-kerja",
    description:
      "Kenali cara SyncVoca merangkai simulasi, evidence stack, portofolio ABK, pendampingan, dan validasi DUDI.",
    publishedAt: siteConfig.updatedAt,
  },
  {
    title: "Alur lima tahap SyncVoca untuk vokasi inklusif",
    href: "/cara-kerja",
    description:
      "Perjalanan SyncVoca dimulai dari mengenal diri, eksplorasi minat, pra-internship, internship, hingga siap kerja.",
    publishedAt: siteConfig.updatedAt,
  },
] as const;

export function buildLandingJsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.logoPath),
      slogan: "Menghubungkan Potensi, Mewujudkan Mandiri",
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressCountry: "ID",
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      knowsAbout: [
        "vokasi inklusif",
        "portofolio kerja ABK",
        "simulasi adaptif",
        "evidence kompetensi",
        "validasi DUDI",
        "keamanan data anak",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": organizationId,
      },
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: marketingSections.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: absoluteUrl(item.href),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
  updatedAt = publishedAt,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(siteConfig.logoPath),
    datePublished: publishedAt,
    dateModified: updatedAt,
    inLanguage: siteConfig.language,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logoPath),
      },
    },
  };
}
