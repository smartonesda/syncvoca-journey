import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { LandingFooter } from "@/components/landing/shared/landing-footer";
import { LandingHeader } from "@/components/landing/shared/landing-header";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Database,
  HeartHandshake,
  LockKeyhole,
  Medal,
  PlayCircle,
  ShieldCheck,
  Target,
  UserCheck,
  UsersRound,
} from "lucide-react";
import { demoPortalUrl } from "@/lib/external-links";
import { cn } from "@/lib/utils";

const trustBadges = [
  { icon: ShieldCheck, title: "Aman & Privasi", body: "Terlindungi" },
  { icon: CheckCircle2, title: "Berbasis Bukti", body: "& Terukur" },
  { icon: UsersRound, title: "Empati, Inklusif", body: "& Aksesibel" },
  { icon: Building2, title: "Siap Validasi", body: "Industri" },
];

const problemCards = [
  {
    icon: CircleUserRound,
    tone: "green",
    title: "ABK punya potensi, tapi sering sulit dibuktikan.",
    body: "Banyak kemampuan hebat yang belum terlihat dan butuh peluang yang utuh berkembang.",
  },
  {
    icon: Building2,
    tone: "amber",
    title:
      "Sekolah dan orang tua punya catatan, tapi belum jadi portofolio kerja.",
    body: "Catatan perkembangan masih tersebar dan belum tersusun sebagai bukti kompetensi yang kuat.",
  },
  {
    icon: BriefcaseBusiness,
    tone: "blue",
    title: "DUDI butuh bukti kompetensi yang jelas.",
    body: "DUDI membutuhkan informasi yang dapat dipercaya untuk menilai kesiapan kerja secara adil.",
  },
  {
    icon: LockKeyhole,
    tone: "purple",
    title: "Data sensitif anak harus tetap aman.",
    body: "Informasi pribadi dan catatan sensitif hanya boleh diakses oleh pihak yang berwenang.",
  },
] satisfies Array<{
  icon: LucideIcon;
  tone: Tone;
  title: string;
  body: string;
}>;

const journeySteps = [
  {
    icon: CircleUserRound,
    tone: "green",
    title: "1. Mengenal Diri",
    body: "Mengenali potensi, minat, dan kebutuhan dukungan.",
    status: "Selesai",
  },
  {
    icon: Target,
    tone: "green",
    title: "2. Eksplorasi Minat",
    body: "Menjelajahi minat dan kemampuan melalui simulasi adaptif.",
    status: "Selesai",
  },
  {
    icon: BriefcaseBusiness,
    tone: "amber",
    title: "3. Pra-Internship",
    body: "Asah keterampilan kerja melalui simulasi dan latihan terarah.",
    status: "Berjalan",
  },
  {
    icon: UsersRound,
    tone: "blue",
    title: "4. Internship",
    body: "Pengalaman kerja nyata di lingkungan yang terkontrol dan aman.",
    status: "Menunggu",
  },
  {
    icon: Medal,
    tone: "purple",
    title: "5. Siap Kerja",
    body: "Portofolio siap, divalidasi industri, dan siap untuk peluang nyata.",
    status: "Menunggu",
  },
] satisfies Array<{
  icon: LucideIcon;
  tone: Tone;
  title: string;
  body: string;
  status: "Selesai" | "Berjalan" | "Menunggu";
}>;

const proofCards = [
  {
    icon: ClipboardCheck,
    tone: "green",
    title: "Simulasi Adaptif",
    body: "Simulasi yang menyesuaikan tingkat kesulitan dengan kemampuan siswa.",
    visual: "simulation",
  },
  {
    icon: BookOpenCheck,
    tone: "green",
    title: "Evidence Stack",
    body: "Semua bukti dikumpulkan dan diverifikasi dalam satu tempat.",
    visual: "evidence",
  },
  {
    icon: BadgeCheck,
    tone: "blue",
    title: "Portofolio ABK",
    body: "Portofolio kompetensi yang siap dibagikan ke sekolah, orang tua, dan DUDI.",
    visual: "portfolio",
  },
  {
    icon: HeartHandshake,
    tone: "green",
    title: "Rencana Pendampingan",
    body: "Guru dan orang tua memiliki panduan pendampingan yang terstruktur.",
    visual: "support",
  },
  {
    icon: ShieldCheck,
    tone: "amber",
    title: "Validasi DUDI",
    body: "DUDI memvalidasi kompetensi berdasarkan bukti, bukan sekadar klaim.",
    visual: "validation",
  },
] satisfies Array<{
  icon: LucideIcon;
  tone: Tone;
  title: string;
  body: string;
  visual: "simulation" | "evidence" | "portfolio" | "support" | "validation";
}>;

const privacyItems = [
  {
    icon: ShieldCheck,
    title: "DUDI hanya melihat data publik yang relevan.",
    body: "Hanya informasi kompetensi dan bukti kerja yang bisa dilihat DUDI.",
  },
  {
    icon: LockKeyhole,
    title: "Catatan sensitif tetap di sekolah/keluarga.",
    body: "Catatan kebutuhan dukungan dan informasi sensitif tidak dibagikan.",
  },
  {
    icon: UserCheck,
    title: "Consent diperlukan sebelum validasi dan placement.",
    body: "Persetujuan dari sekolah dan orang tua wajib sebelum data dibagikan lebih luas.",
  },
  {
    icon: Database,
    title: "Sistem aman dan terenkripsi.",
    body: "Menggunakan enkripsi, kontrol akses, dan audit log untuk setiap aktivitas.",
  },
];

const roleCards = [
  {
    image: "/landing/beranda/murid.png",
    title: "Siswa",
    color: "green",
    bullets: [
      "Kenali potensi dan minat diri",
      "Latihan dan simulasi seru",
      "Portofolio kerja yang membanggakan",
      "Siap untuk peluang kerja nyata",
    ],
  },
  {
    image: "/landing/beranda/guru.png",
    title: "Guru",
    color: "amber",
    bullets: [
      "Pantau perkembangan siswa",
      "Rencana pendampingan terstruktur",
      "Kelola bukti dan portofolio siswa",
      "Laporan perkembangan otomatis",
    ],
  },
  {
    image: "/landing/beranda/ortu.png",
    title: "Orang Tua",
    color: "amber",
    bullets: [
      "Lihat perkembangan anak",
      "Dapat rekomendasi dukungan",
      "Terlibat dalam perjalanan anak",
      "Tenang dengan data yang aman",
    ],
  },
  {
    image: "/landing/beranda/dudi.png",
    title: "DUDI",
    color: "blue",
    bullets: [
      "Temukan talenta berbasis bukti",
      "Validasi kompetensi secara adil",
      "Pipeline kandidat terverifikasi",
      "Kolaborasi dengan sekolah",
    ],
  },
  {
    image: "/landing/beranda/admin.png",
    title: "Admin",
    color: "purple",
    bullets: [
      "Kelola sistem dan pengguna",
      "Pantau ekosistem secara menyeluruh",
      "Audit dan keamanan terjamin",
      "Data akurat untuk keputusan",
    ],
  },
] satisfies Array<{
  image: string;
  title: string;
  color: Tone;
  bullets: string[];
}>;

const stats = [
  { icon: UsersRound, value: "10K+", label: "Siswa Aktif" },
  { icon: Building2, value: "250+", label: "Sekolah Bergabung" },
  { icon: BriefcaseBusiness, value: "150+", label: "DUDI Mitra" },
  { icon: ShieldCheck, value: "100%", label: "Berbasis Bukti" },
  { icon: Medal, value: "Aman &", label: "Terpercaya" },
];

const partnerLogos = [
  {
    src: "/landing/beranda/mitra/1.png",
    alt: "Logo mitra SyncVoca 1",
    width: 180,
    height: 180,
  },
  {
    src: "/landing/beranda/mitra/2.png",
    alt: "Logo mitra SyncVoca 2",
    width: 98,
    height: 98,
  },
  {
    src: "/landing/beranda/mitra/3.png",
    alt: "Logo mitra SyncVoca 3",
    width: 262,
    height: 262,
  },
  {
    src: "/landing/beranda/mitra/4.png",
    alt: "Logo mitra SyncVoca 4",
    width: 276,
    height: 228,
  },
  {
    src: "/landing/beranda/mitra/5.png",
    alt: "Logo mitra SyncVoca 5",
    width: 260,
    height: 260,
  },
  {
    src: "/landing/beranda/mitra/6.png",
    alt: "Logo mitra SyncVoca 6",
    width: 260,
    height: 193,
  },
] satisfies Array<{
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

type Tone = "green" | "amber" | "blue" | "purple";

const toneClass: Record<
  Tone,
  { badge: string; icon: string; soft: string; text: string }
> = {
  green: {
    badge: "bg-emerald-50 text-emerald-700",
    icon: "text-emerald-600",
    soft: "bg-emerald-50",
    text: "text-emerald-600",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700",
    icon: "text-amber-500",
    soft: "bg-amber-50",
    text: "text-amber-500",
  },
  blue: {
    badge: "bg-blue-50 text-blue-700",
    icon: "text-blue-600",
    soft: "bg-blue-50",
    text: "text-blue-600",
  },
  purple: {
    badge: "bg-violet-50 text-violet-700",
    icon: "text-violet-600",
    soft: "bg-violet-50",
    text: "text-violet-600",
  },
};

export function BerandaLanding() {
  return (
    <main
      id="beranda"
      className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#111c33]"
    >
      <LandingHeader />
      <HeroSection />
      <ProblemSection />
      <JourneySection />
      <ProofSection />
      <PrivacySection />
      <RoleSection />
      <EcosystemSection />
      <CtaSection />
      <LandingFooter />
    </main>
  );
}

function HeroSection() {
  return (
    <section className=" border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="sv-hero-grid mx-auto grid w-full max-w-screen-2xl gap-6 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-5 lg:pt-8 xl:px-10 2xl:gap-7 2xl:pb-0 2xl:pt-9">
        <div className="relative z-10 w-full min-w-0 max-w-3xl overflow-hidden">
          <div className="inline-flex min-h-8 items-center gap-2 rounded-full bg-[#effaf4] px-4 text-sm font-extrabold text-[#008a4a]">
            <ShieldCheck className="size-4" />
            Ekosistem Vokasi Inklusif untuk ABK
          </div>

          <h1 className="mt-6 max-w-full break-words text-3xl font-extrabold leading-tight tracking-normal text-[#111c33] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] 2xl:mt-7 2xl:text-5xl 2xl:leading-tight">
            Temukan Potensi
            <br />
            Siapkan Masa Depan
            <br />
            <span className="text-[#0cae61]">Tumbuh</span> Bersama
            <br className="sm:hidden" /> SyncVoca
          </h1>

          <p className="mt-5 max-w-full break-words text-base font-medium leading-7 text-[#42506a] sm:max-w-2xl 2xl:mt-6 2xl:text-lg 2xl:leading-8">
            SyncVoca membantu siswa mengenal diri, mengasah kompetensi, dan
            terhubung dengan dunia kerja yang inklusif dan bermakna.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row 2xl:mt-8">
            <a
              href={demoPortalUrl}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-6 text-sm font-extrabold text-white shadow-[0_18px_32px_rgba(0,152,86,0.2)] transition hover:bg-[#007b45] 2xl:min-h-14 2xl:px-8 2xl:text-base"
            >
              Masuk Portal Demo
              <span className="grid size-6 place-items-center rounded-full border border-white/60">
                <ArrowRight className="size-4" />
              </span>
            </a>
            <a
              href="/cara-kerja"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#dbe7e0] bg-white px-6 text-sm font-extrabold text-[#111c33] shadow-sm transition hover:bg-[#f7fbf8] 2xl:min-h-14 2xl:px-8 2xl:text-base"
            >
              Pelajari Cara Kerja
              <PlayCircle className="size-5 text-[#111c33]" />
            </a>
          </div>

          <div className="mt-8 grid  gap-4 grid-cols-2 md:grid-cols-4 2xl:mt-10">
            {trustBadges.map((item) => (
              <div
                key={item.title}
                className="flex jus min-w-0  items-center gap-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf8ee] text-[#06995a] 2xl:size-10">
                  <item.icon className="size-5" />
                </span>
                <p className="text-xs font-extrabold leading-5 text-[#17233c] 2xl:text-sm">
                  {item.title}
                  <br />
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-8 mx-auto min-w-0 w-full max-w-2xl self-end lg:mx-0 lg:self-center 2xl:max-w-3xl scale-[1.1] lg:scale-[1.2] lg:translate-[-30px,0]">
          <Image
            src="/landing/beranda/hero-section-3.png"
            alt="Dua siswa SyncVoca memegang tablet"
            width={1100}
            height={826}
            priority
            sizes="(max-width: 1024px) 92vw, 52vw"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-white mt-10 py-8">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionTitle
          id="masalah"
          eyebrow="Masalah yang Ingin Diselesaikan"
          showArrows
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problemCards.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section id="cara-kerja" className="bg-[#fbfdfb] py-8">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-[#111c33]">
            Cara SyncVoca Membantu
          </h2>
          <p className="mt-2 text-sm font-medium text-[#5e6a7e]">
            Perjalanan 5 tahap untuk membantu ABK berkembang sesuai potensinya.
          </p>
        </div>

        <div className="mt-14 grid gap-x-4 gap-y-[50] lg:grid-cols-5">
          {journeySteps.map((step, index) => (
            <JourneyCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section id="bukti-kerja" className="bg-[#fbfdfb] py-7">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-[#111c33]">
            Mengubah Aktivitas Menjadi Bukti Kerja
          </h2>
          <p className="mt-2 text-sm font-medium text-[#5e6a7e]">
            Setiap langkah menghasilkan bukti yang terukur dan bermakna.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {proofCards.map((card) => (
            <ProofCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section id="keamanan-data" className="bg-[#fbfdfb] py-8">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="rounded-2xl border border-[#dbe9df] bg-[linear-gradient(90deg,#f3fbf5_0%,#ffffff_52%,#f3fbf5_100%)] px-6 py-7 shadow-[0_14px_36px_rgba(17,28,51,0.05)]">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#111c33]">
              Keamanan Data Anak
            </h2>
            <p className="mt-2 text-sm font-medium text-[#5e6a7e]">
              Kami menjaga setiap data dengan standar keamanan tinggi.
            </p>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {privacyItems.map((item) => (
              <div key={item.title} className="flex gap-4 ">
                <span className="grid size-14 h-full shrink-0 place-items-center rounded-2xl bg-[#e5f6ec] text-[#009856]">
                  <item.icon className="size-7" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold leading-5 text-[#111c33]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#5e6a7e]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleSection() {
  return (
    <section id="untuk-siapa" className="bg-[#fbfdfb] py-8">
      <div className="mx-auto w-full max-w-screen-2xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-[#111c33]">
            Untuk Setiap Peran
          </h2>
          <p className="mt-2 text-sm font-medium text-[#5e6a7e]">
            SyncVoca dirancang untuk memberikan manfaat nyata bagi semua pihak.
          </p>
        </div>

        <div className="mt-20 grid gap-y-9 gap-x-4  md:grid-cols-2 xl:grid-cols-5">
          {roleCards.map((role) => (
            <RoleCard key={role.title} {...role} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section id="ekosistem" className="bg-[#fbfdfb] py-8">
      <div className="mx-auto w-full max-w-screen-2xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-[#111c33]">
            Ekosistem Kuat, Dampak Nyata
          </h2>
          <p className="mt-2 text-sm font-medium text-[#5e6a7e]">
            Bersama sekolah, keluarga, dan industri menciptakan masa depan yang
            lebih inklusif.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.value + stat.label}
              className="flex min-h-24 items-center gap-4 rounded-2xl border border-[#dbe9df] bg-white px-6 shadow-[0_14px_30px_rgba(17,28,51,0.04)]"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#e7f7ed] text-[#00a45d]">
                <stat.icon className="size-7" />
              </span>
              <div>
                <p className="text-3xl font-extrabold leading-tight text-[#009856]">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-[#111c33]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-extrabold text-[#111c33]">
            Didukung Oleh Sekolah Dan Mitra
          </h2>
          <div className="mx-auto mt-7 max-w-6xl overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="sv-partner-logo-track">
              {[0, 1, 2].map((groupIndex) => (
                <div
                  key={groupIndex}
                  aria-hidden={groupIndex > 0}
                  className="sv-partner-logo-rail"
                >
                  {partnerLogos.map((logo) => (
                    <div
                      key={`${groupIndex}-${logo.src}`}
                      className="grid h-20 w-28 shrink-0 place-items-center rounded-2xl border border-[#dbe9df] bg-white/90 px-4  sm:h-24 sm:w-36"
                    >
                      <Image
                        src={logo.src}
                        alt={groupIndex === 0 ? logo.alt : ""}
                        width={logo.width}
                        height={logo.height}
                        loading={groupIndex === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 640px) 80px, 112px"
                        // className="h-auto max-h-12 w-auto max-w-20 object-contain grayscale opacity-80 transition duration-300 hover:grayscale-0 hover:opacity-100 sm:max-h-16 sm:max-w-28"
                        className="object-contain max-h-25 "
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="tentang-kami" className="bg-[#fbfdfb] px-5 py-7 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl  rounded-2xl border border-[#cfe7d8]  lg:grid-cols-3">
        <div className="relative min-h-64  h-full">
          <Image
            src="/landing/beranda/cta-students.png"
            alt="Siswa melihat perkembangan SyncVoca"
            width={900}
            height={577}
            loading="eager"
            sizes="(max-width: 1024px) 70vw, 34vw"
            className="absolute inset-x-0 bottom-0 h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-8 text-center lg:px-3 lg:text-left">
          <h2 className="text-3xl font-extrabold leading-tight text-[#006b3f] sm:text-4xl">
            Mulai lihat perjalanan ABK & Disabilitas menuju masa depan yang
            lebih cerah
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-[#42506a]">
            Masuk ke portal demo dan temukan bagaimana SyncVoca bekerja untuk
            mereka.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href={demoPortalUrl}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-7 text-sm font-extrabold text-white shadow-[0_15px_28px_rgba(0,152,86,0.18)] hover:bg-[#007b45]"
            >
              Masuk Portal Demo
              <ArrowRight className="size-4" />
            </a>
            <a
              href="/cara-kerja"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#dbe7e0] bg-white px-7 text-sm font-extrabold text-[#111c33] hover:bg-[#f7fbf8]"
            >
              Pelajari Cara Kerja
              <PlayCircle className="size-5" />
            </a>
          </div>
        </div>

        <div className="relative  h-full items-center justify-center ">
          <Image
            src="/landing/beranda/footer.png"
            alt="Panel bukti dan validasi SyncVoca"
            width={300}
            height={167}
            loading="eager"
            sizes="280px"
            className="relative z-10 h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  id,
  showArrows = false,
}: {
  eyebrow: string;
  id?: string;
  showArrows?: boolean;
}) {
  return (
    <div id={id} className="flex items-center justify-center gap-4 text-center">
      {showArrows ? <ArrowRight className="size-6 text-[#0ba45f]" /> : null}
      <h2 className="text-2xl font-extrabold text-[#111c33] sm:text-3xl">
        {eyebrow}
      </h2>
      {showArrows ? (
        <ArrowRight className="size-6 rotate-180 text-[#0ba45f]" />
      ) : null}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  tone,
  title,
  body,
}: {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  body: string;
}) {
  return (
    <article className="flex flex-col items-center text-center min-h-36 gap-5 rounded-2xl border border-[#e0e9e3] bg-white p-6 shadow-[0_14px_36px_rgba(17,28,51,0.05)]">
      <span
        className={cn(
          "grid size-16 shrink-0 place-items-center rounded-full",
          toneClass[tone].soft,
        )}
      >
        <Icon className={cn("size-9", toneClass[tone].icon)} />
      </span>
      <div>
        <h3 className="text-base font-extrabold leading-6 text-[#111c33]">
          {title}
        </h3>
        <p className="mt-3 text-sm font-medium leading-6 text-[#5e6a7e]">
          {body}
        </p>
      </div>
    </article>
  );
}

function JourneyCard({
  step,
  index,
}: {
  step: (typeof journeySteps)[number];
  index: number;
}) {
  const Icon = step.icon;
  const isLast = index === journeySteps.length - 1;

  return (
    <article className="relative rounded-2xl border border-[#e0e9e3] bg-white px-5 pb-6 pt-12 text-center shadow-[0_14px_32px_rgba(17,28,51,0.04)]">
      {!isLast ? (
        <span className="absolute left-full top-8 z-10 hidden -translate-x-4 items-center text-[#0aa960] lg:flex">
          <span className="h-px w-10 border-t border-dashed border-current" />
          <ChevronRight className="size-5" />
        </span>
      ) : null}
      <span
        className={cn(
          "absolute left-1/2 top-0 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white shadow-[0_14px_28px_rgba(17,28,51,0.08)]",
          toneClass[step.tone as Tone].soft,
        )}
      >
        <Icon className={cn("size-9", toneClass[step.tone as Tone].icon)} />
      </span>
      <h3 className="mt-1 text-base font-extrabold text-[#111c33]">
        {step.title}
      </h3>
      <p className="mx-auto mt-3 max-w-48 text-sm font-medium leading-6 text-[#5e6a7e]">
        {step.body}
      </p>
      <span
        className={cn(
          "mt-4 inline-flex min-h-7 items-center rounded-full px-3 text-xs font-extrabold",
          step.status === "Selesai"
            ? "bg-[#e7f7ed] text-[#008a4a]"
            : step.status === "Berjalan"
              ? "bg-amber-50 text-amber-600"
              : "bg-slate-100 text-slate-500",
        )}
      >
        {step.status}
      </span>
    </article>
  );
}

function ProofCard({
  icon: Icon,
  tone,
  title,
  body,
  visual,
}: {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  body: string;
  visual: string;
}) {
  return (
    <article className="flex min-h-72 flex-col justify-between rounded-2xl border border-[#e0e9e3] bg-white p-5 text-center shadow-[0_14px_32px_rgba(17,28,51,0.04)]">
      <h3 className="text-base font-extrabold text-[#111c33]">{title}</h3>
      <div className="my-5 flex min-h-28 items-center justify-center">
        <ProofVisual visual={visual} icon={Icon} tone={tone} />
      </div>
      <p className=" text-sm font-medium leading-6 text-[#4e5c73]">{body}</p>
    </article>
  );
}

function ProofVisual({
  visual,
  icon: Icon,
  tone,
}: {
  visual: string;
  icon: LucideIcon;
  tone: Tone;
}) {
  if (visual === "simulation") {
    return (
      <div className="w-36 rounded-2xl bg-[#f7fbf8] p-3 text-left shadow-[0_10px_24px_rgba(17,28,51,0.08)]">
        <div className="h-2 w-20 rounded-full bg-[#dfe8e3]" />
        <p className="mt-3 text-xs font-bold text-[#42506a]">
          Simulasi Administrasi Perkantoran
        </p>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-2xl font-extrabold text-[#111c33]">92%</span>
          <span className="rounded-full bg-[#dff7e9] px-3 py-1 text-xs font-bold text-[#008a4a]">
            Selesai
          </span>
        </div>
      </div>
    );
  }

  if (visual === "evidence") {
    return (
      <div className="space-y-2 text-left">
        {[
          "Dokumen Tugas",
          "Foto / Video",
          "Hasil Simulasi",
          "Refleksi Diri",
        ].map((item) => (
          <div
            key={item}
            className="flex min-h-8 w-40 items-center gap-2 rounded-lg bg-[#f7fbf8] px-3"
          >
            <Icon className={cn("size-4", toneClass[tone].icon)} />
            <span className="text-xs font-bold text-[#42506a]">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  if (visual === "portfolio") {
    return (
      <div className="w-36 rounded-2xl bg-[#f7fbf8] p-3 text-left shadow-[0_10px_24px_rgba(17,28,51,0.07)]">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-blue-100 text-blue-600">
            <CircleUserRound className="size-6" />
          </span>
          <div>
            <p className="text-xs font-extrabold text-[#111c33]">
              Rizky Pratama
            </p>
            <p className="text-xs font-medium text-[#778297]">Siswa</p>
          </div>
        </div>
        <div className="mt-4 flex items-end gap-2">
          <span className="text-2xl font-extrabold text-[#111c33]">82</span>
          <span className="pb-1 text-xs font-bold text-[#5e6a7e]">
            Level Mahir
          </span>
        </div>
      </div>
    );
  }

  if (visual === "support") {
    return (
      <div className="space-y-2 text-left">
        {["Pendampingan Mingguan", "Latihan Komunikasi", "Kesiapan Kerja"].map(
          (item) => (
            <div
              key={item}
              className="flex min-h-9 w-44 items-center gap-3 rounded-lg bg-[#f7fbf8] px-3"
            >
              <span className="grid size-5 place-items-center rounded-full bg-[#009856] text-white">
                <Check className="size-3" />
              </span>
              <span className="text-xs font-bold text-[#42506a]">{item}</span>
            </div>
          ),
        )}
      </div>
    );
  }

  return (
    <div className="w-44 rounded-2xl bg-amber-50 p-4 text-left shadow-[0_10px_24px_rgba(17,28,51,0.06)]">
      <div className="flex items-center gap-3">
        <ShieldCheck className="size-9 text-amber-500" />
        <div>
          <p className="text-xs font-extrabold text-[#111c33]">
            Industry Validation Seal
          </p>
          <p className="mt-1 text-xs font-bold text-amber-600">
            Telah tervalidasi DUDI
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#5e6a7e]">
        Tanggal: 20 Mei 2025
      </div>
    </div>
  );
}

function RoleCard({
  image,
  title,
  color,
  bullets,
}: {
  image: string;
  title: string;
  color: Tone;
  bullets: string[];
}) {
  return (
    <article className=" rounded-2xl border border-[#e0e9e3] bg-white shadow-[0_14px_36px_rgba(17,28,51,0.05)]">
      {/* <div className={cn("relative h-40", toneClass[color].soft)}> */}
      <div className={cn("relative h-40")}>
        <Image
          src={image}
          alt={`Peran ${title} di SyncVoca`}
          width={360}
          height={494}
          style={{
            translate: "0 -15px",
          }}
          loading="eager"
          sizes="(max-width: 1280px) 45vw, 260px"
          className="absolute inset-x-0 bottom-0 mx-auto h-44 w-auto object-contain"
        />
      </div>
      <div className="p-5 text-center xl:text-left">
        <h3 className="text-base text-center font-extrabold  text-[#111c33]">
          {title}
        </h3>
        <ul className="mt-4 inline-flex flex-col space-y-3">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm font-medium leading-5 text-[#42506a]"
            >
              <Check
                className={cn("mt-0.5 size-4 shrink-0", toneClass[color].icon)}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="/cara-kerja"
          className={cn(
            "mt-5  flex justify-center items-center gap-1 text-sm font-extrabold ",
            toneClass[color].text,
          )}
        >
          Pelajari lebih lanjut
          <ArrowRight className="size-4" />
        </a>
      </div>
    </article>
  );
}
