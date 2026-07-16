import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Check,
  CircleUserRound,
  ClipboardCheck,
  FileText,
  FolderCheck,
  Gamepad2,
  GraduationCap,
  Layers3,
  LockKeyhole,
  PlayCircle,
  School,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { LandingFooter } from "@/components/landing/shared/landing-footer";
import { LandingHeader } from "@/components/landing/shared/landing-header";
import { demoPortalUrl } from "@/lib/external-links";
import { cn } from "@/lib/utils";

type Tone = "green" | "amber" | "blue" | "purple";

const toneClasses: Record<
  Tone,
  { icon: string; soft: string; border: string; surface: string }
> = {
  green: {
    icon: "text-[#009856]",
    soft: "bg-[#eaf8ee]",
    border: "border-[#cfe7d8]",
    surface: "bg-[#f2fbf5]",
  },
  amber: {
    icon: "text-[#f39a1f]",
    soft: "bg-[#fff3e2]",
    border: "border-[#f2ddbf]",
    surface: "bg-[#fffaf2]",
  },
  blue: {
    icon: "text-[#2577e8]",
    soft: "bg-[#edf5ff]",
    border: "border-[#d5e4f9]",
    surface: "bg-[#f5f9ff]",
  },
  purple: {
    icon: "text-[#8557e8]",
    soft: "bg-[#f2edff]",
    border: "border-[#dfd7f6]",
    surface: "bg-[#faf8ff]",
  },
};

const proofTypes = [
  {
    icon: Gamepad2,
    title: "Hasil Simulasi",
    body: "Aktivitas simulasi sesuai minat dan kemampuan siswa.",
    tone: "green",
  },
  {
    icon: BarChart3,
    title: "Skor & Metrik",
    body: "Akurasi, ketelitian, konsistensi, waktu penyelesaian, dan kesiapan tugas.",
    tone: "amber",
  },
  {
    icon: CircleUserRound,
    title: "Catatan Pendamping",
    body: "Catatan guru dan orang tua tentang perkembangan dan dukungan siswa.",
    tone: "green",
  },
  {
    icon: Camera,
    title: "Dokumen / Foto / Video",
    body: "Tugas, proyek, dan bukti nyata yang menunjukkan proses belajar siswa.",
    tone: "blue",
  },
  {
    icon: FolderCheck,
    title: "Portofolio Kompetensi",
    body: "Semua bukti dikurasi menjadi portofolio yang rapi dan mudah dibaca.",
    tone: "green",
  },
  {
    icon: BadgeCheck,
    title: "Industry Validation Seal",
    body: "Kompetensi divalidasi oleh DUDI melalui proses yang aman dan terpercaya.",
    tone: "amber",
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}>;

const evidenceFlow = [
  {
    icon: ClipboardCheck,
    title: "1. Misi Simulasi",
    body: "Siswa mengerjakan misi simulasi sesuai minat dan levelnya.",
  },
  {
    icon: BarChart3,
    title: "2. Skor & Metrik",
    body: "Sistem mengukur akurasi, ketelitian, konsistensi, dan waktu penyelesaian.",
  },
  {
    icon: Layers3,
    title: "3. Evidence Stack",
    body: "Hasil, dokumen, foto, video, dan catatan dikumpulkan.",
  },
  {
    icon: FolderCheck,
    title: "4. Portofolio",
    body: "Bukti dikurasi menjadi portofolio kompetensi yang terstruktur.",
  },
  {
    icon: ShieldCheck,
    title: "5. Validasi DUDI",
    body: "DUDI meninjau bukti dan memberi pengakuan berbasis kompetensi.",
  },
] satisfies Array<{ icon: LucideIcon; title: string; body: string }>;

const measuredSignals = [
  "Akurasi",
  "Ketelitian",
  "Konsistensi",
  "Waktu Penyelesaian",
  "Kesiapan Tugas",
  "Minat & Potensi",
] as const;

const evidenceStack = [
  {
    icon: FileText,
    title: "Dokumen Tugas",
    body: "File tugas, laporan, dan dokumen pendukung.",
  },
  {
    icon: Camera,
    title: "Foto / Video",
    body: "Bukti aktivitas, proyek, atau praktik kerja.",
  },
  {
    icon: BarChart3,
    title: "Hasil Simulasi",
    body: "Skor, metrik, dan grafik perkembangan.",
  },
  {
    icon: ShieldCheck,
    title: "Refleksi Diri",
    body: "Catatan refleksi siswa tentang proses belajar.",
  },
  {
    icon: GraduationCap,
    title: "Catatan Guru",
    body: "Observasi, feedback, dan rencana tindak lanjut.",
  },
] satisfies Array<{ icon: LucideIcon; title: string; body: string }>;

const roleBenefits = [
  {
    image: "/landing/beranda/murid.png",
    icon: School,
    title: "Siswa",
    body: "Lebih percaya diri karena potensinya terlihat melalui bukti nyata.",
    tone: "green",
  },
  {
    image: "/landing/beranda/guru.png",
    icon: UsersRound,
    title: "Guru",
    body: "Memiliki dasar yang kuat untuk pendampingan dan penyusunan rencana belajar.",
    tone: "amber",
  },
  {
    image: "/landing/beranda/ortu.png",
    icon: UserRound,
    title: "Orang Tua",
    body: "Lebih mudah memahami perkembangan dan kekuatan anak.",
    tone: "purple",
  },
  {
    image: "/landing/beranda/dudi.png",
    icon: BriefcaseBusiness,
    title: "DUDI / Industri",
    body: "Melihat kandidat berdasarkan bukti kompetensi yang relevan dan aman.",
    tone: "blue",
  },
  {
    image: "/landing/beranda/admin.png",
    icon: School,
    title: "Admin / Sekolah",
    body: "Memiliki laporan perkembangan yang lebih terstruktur dan mudah dianalisis.",
    tone: "green",
  },
] satisfies Array<{
  image: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}>;

export function BuktiKerjaLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#101a35]">
      <LandingHeader activeLabel="Bukti Kerja" />
      <ProofHero />
      <ProofDefinition />
      <EvidenceJourney />
      <TalentPortfolio />
      <EvidenceStackSection />
      <ValidationSeal />
      <BenefitSection />
      <ProofCta />
      <LandingFooter />
    </main>
  );
}

function ProofHero() {
  return (
    <section className="mb-15 border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="sv-hero-grid mx-auto grid w-full max-w-screen-2xl gap-6 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-5 lg:pt-8 xl:px-10 2xl:gap-7 2xl:pb-0 2xl:pt-9">
        <div className="relative z-10 w-full min-w-0 max-w-3xl overflow-hidden">
          <Kicker icon={ShieldCheck}>
            Bukti Kerja yang Terukur & Terpercaya
          </Kicker>

          <h1 className="mt-6 max-w-full break-words text-3xl font-extrabold leading-tight tracking-normal text-[#111c33] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] 2xl:mt-7 2xl:text-5xl 2xl:leading-tight">
            Potensi Tidak Cukup
            <br />
            Diceritakan,
            <br />
            <span className="text-[#009856]">Perlu Dibuktikan</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm font-semibold leading-7 text-[#3d4d67] sm:text-base sm:leading-8">
            SyncVoca mengubah aktivitas belajar, simulasi, dan pendampingan
            menjadi bukti kerja yang jelas, terukur, dan siap divalidasi
            industri.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={"/cara-kerja" as Route}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-7 text-sm font-extrabold text-white shadow-[0_16px_30px_rgba(0,152,86,0.2)] transition hover:bg-[#007b45]"
            >
              Lihat Cara Kerja
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={demoPortalUrl}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d7e5dc] bg-white px-7 text-sm font-extrabold text-[#111c33] shadow-sm transition hover:bg-[#f4faf6]"
            >
              Masuk Portal Demo
              <PlayCircle className="size-5" />
            </a>
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

function ProofDefinition() {
  return (
    <PageBand title="Apa Itu Bukti Kerja di SyncVoca?">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {proofTypes.map((item) => (
          <article
            key={item.title}
            className="flex min-h-56 flex-col items-center rounded-2xl border border-[#dce8e0] bg-white px-4 py-5 text-center"
          >
            <IconBubble icon={item.icon} tone={item.tone} large />
            <h3 className="mt-4 text-sm font-extrabold leading-5 text-[#111c33]">
              {item.title}
            </h3>
            <p className="mt-3 text-xs font-semibold leading-6 text-[#536178]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </PageBand>
  );
}

function EvidenceJourney() {
  return (
    <PageBand
      title="Dari Simulasi Menjadi Evidence"
      subtitle="Alur sederhana yang mengubah latihan menjadi bukti kerja yang bermakna."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {evidenceFlow.map((item, index) => (
          <article
            key={item.title}
            className="relative rounded-2xl border border-[#dce8e0] bg-white px-4 pb-5 pt-12 text-center"
          >
            {index < evidenceFlow.length - 1 ? (
              <ArrowRight className="absolute -right-6 top-1/2 z-10 hidden size-6 -translate-y-1/2 text-[#009856] lg:block" />
            ) : null}
            <span className="absolute left-1/2 top-0 grid size-16 -translate-x-1/2 -translate-y-1/3 place-items-center rounded-full border border-[#cde7d7] bg-[#f2fbf5] text-[#009856] shadow-sm">
              <item.icon className="size-8" />
            </span>
            <h3 className="mt-2 text-sm font-extrabold text-[#111c33]">
              {item.title}
            </h3>
            <p className="mx-auto mt-4 max-w-44 text-xs font-semibold leading-6 text-[#536178]">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-2 rounded-2xl bg-[#f0f9f3] px-4 py-3 sm:grid-cols-2 lg:grid-cols-6">
        {measuredSignals.map((signal) => (
          <div
            key={signal}
            className="flex items-center justify-center gap-2 text-center text-xs font-extrabold text-[#31405c]"
          >
            <Check className="size-4 shrink-0 rounded-full bg-[#009856] p-0.5 text-white" />
            {signal}
          </div>
        ))}
      </div>
    </PageBand>
  );
}

function TalentPortfolio() {
  return (
    <PageBand
      title="ABK Talent Portfolio"
      subtitle="Portofolio ini menampilkan kompetensi siswa secara aman dan relevan."
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <article className="grid overflow-hidden rounded-2xl border border-[#dce8e0] bg-white shadow-[0_12px_28px_rgba(17,28,51,0.035)] lg:grid-cols-[250px_1fr]">
          <div className="border-b border-[#e4ece7] p-5 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-[#eaf8ee]">
                <Image
                  src="/landing/cara-kerja/7.png"
                  alt="Rizky Pratama"
                  width={1254}
                  height={1254}
                  loading="lazy"
                  sizes="64px"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#111c33]">
                  Rizky Pratama
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#647188]">
                  Minat: Administrasi & Data
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs font-extrabold text-[#536178]">
              Journey Score
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid size-24 place-items-center rounded-full bg-[conic-gradient(#009856_0_82%,#e5eee9_82%_100%)] p-2">
                <div className="grid size-full place-items-center rounded-full bg-white text-center">
                  <div>
                    <span className="text-3xl font-extrabold text-[#111c33]">
                      82
                    </span>
                    <span className="text-xs font-bold text-[#68758a]">
                      /100
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-extrabold text-[#009856]">
                Level Mahir
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <PortfolioLabel>Skill Utama</PortfolioLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Data Entry", "Administrasi", "Ketelitian", "Komunikasi"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#eef8f2] px-3 py-1.5 text-[11px] font-extrabold text-[#426052]"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>

            <PortfolioLabel className="mt-6">
              Bukti Simulasi Terbaru
            </PortfolioLabel>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                ["Input Data Penjualan", "Skor 92"],
                ["Verifikasi Dokumen", "Skor 85"],
                ["Pengelolaan Arsip", "Skor 86"],
              ].map(([title, score]) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#e0e9e3] bg-[#fbfdfb] p-3"
                >
                  <ClipboardCheck className="size-5 text-[#009856]" />
                  <p className="mt-2 text-[11px] font-extrabold leading-4 text-[#111c33]">
                    {title}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-[#718096]">
                    {score}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <PortfolioLabel>Kebutuhan Akomodasi Kerja</PortfolioLabel>
                <p className="mt-2 text-xs font-semibold text-[#536178]">
                  Instruksi visual, waktu adaptif
                </p>
              </div>
              <div>
                <PortfolioLabel>Ringkasan Kesiapan</PortfolioLabel>
                <p className="mt-2 text-xs font-semibold text-[#536178]">
                  Siap untuk tugas entry level dengan pendampingan.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-4">
          <aside className="rounded-2xl border border-[#cfe7d8] bg-[#f1faf4] p-5">
            <h3 className="text-base font-extrabold text-[#008a4a]">
              Elemen yang Ditampilkan ke DUDI
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Skill utama & minat vokasi",
                "Journey score & progres",
                "Bukti simulasi & proyek",
                "Ringkasan kesiapan kerja",
              ].map((item) => (
                <CheckListItem key={item}>{item}</CheckListItem>
              ))}
            </ul>
          </aside>
          <aside className="flex items-start gap-4 rounded-2xl border border-[#cfe7d8] bg-[#f1faf4] p-5">
            <LockKeyhole className="size-8 shrink-0 text-[#009856]" />
            <div>
              <h3 className="text-sm font-extrabold text-[#008a4a]">
                Privasi Aman
              </h3>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#536178]">
                Informasi sensitif dan kebutuhan khusus tidak ditampilkan ke
                pihak luar.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </PageBand>
  );
}

function EvidenceStackSection() {
  return (
    <PageBand
      title="Evidence Stack"
      subtitle="Semua bukti dikumpulkan, dikurasi, dan hanya yang relevan ditampilkan ke DUDI."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_250px]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {evidenceStack.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#dce8e0] bg-white px-4 py-5 text-center"
            >
              <span className="mx-auto grid size-11 place-items-center rounded-full bg-[#eaf8ee] text-[#009856]">
                <item.icon className="size-6" />
              </span>
              <h3 className="mt-4 text-xs font-extrabold text-[#111c33]">
                {item.title}
              </h3>
              <p className="mt-3 text-[11px] font-semibold leading-5 text-[#536178]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <aside className="rounded-2xl border border-[#cfe7d8] bg-[#f1faf4] p-5">
          <ShieldCheck className="size-10 text-[#009856]" />
          <h3 className="mt-4 text-base font-extrabold text-[#008a4a]">
            Kuris & Aman
          </h3>
          <p className="mt-3 text-xs font-semibold leading-6 text-[#536178]">
            SyncVoca memastikan bukti yang tampil ke DUDI sudah dikurasi agar
            tetap aman, relevan, dan menghargai privasi siswa.
          </p>
        </aside>
      </div>
    </PageBand>
  );
}

function ValidationSeal() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 rounded-2xl border border-[#bfe2cd] bg-[linear-gradient(110deg,#f5fcf7_0%,#ffffff_50%,#f5fcf7_100%)] px-6 py-7 shadow-[0_16px_42px_rgba(17,28,51,0.04)] lg:grid-cols-[150px_0.9fr_1.3fr] lg:items-center lg:px-8">
        <SealBadge />
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-extrabold text-[#111c33]">
            Industry Validation Seal
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-[#536178]">
            DUDI memberikan pengakuan berbasis bukti kompetensi siswa. Seal ini
            bukan sekadar badge, tetapi tanda bahwa kemampuan siswa telah
            ditinjau dan diakui oleh pihak industri.
          </p>
        </div>
        <ul className="space-y-3">
          {[
            "Validasi berbasis evidence, bukan asumsi.",
            "Meningkatkan kepercayaan dalam proses rekrutmen.",
            "Membantu ABK mendapatkan peluang kerja yang lebih adil.",
            "Seal dapat digunakan dalam portofolio dan lamaran kerja.",
          ].map((item) => (
            <CheckListItem key={item}>{item}</CheckListItem>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitSection() {
  return (
    <PageBand title="Siapa yang Mendapat Manfaat dari Bukti Kerja?">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {roleBenefits.map((role) => (
          <article
            key={role.title}
            className={cn(
              " rounded-2xl border",
              toneClasses[role.tone].border,
              toneClasses[role.tone].surface,
            )}
          >
            <div className="relative h-32 bg-white/60">
              <Image
                src={role.image}
                alt={role.title}
                width={520}
                height={472}
                loading="lazy"
                sizes="(max-width: 640px) 90vw, 20vw"
                className="absolute inset-x-0 bottom-0 mx-auto h-36 w-auto object-contain object-bottom"
              />
              <span
                className={cn(
                  "absolute left-3 top-3 grid size-9 place-items-center rounded-full",
                  toneClasses[role.tone].soft,
                  toneClasses[role.tone].icon,
                )}
              >
                <role.icon className="size-5" />
              </span>
            </div>
            <div className="p-4">
              <h3
                className={cn(
                  "text-sm font-extrabold",
                  toneClasses[role.tone].icon,
                )}
              >
                {role.title}
              </h3>
              <p className="mt-3 text-xs font-semibold leading-6 text-[#536178]">
                {role.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageBand>
  );
}

function ProofCta() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-8 pt-2 sm:px-8">
      <div className="relative mx-auto grid min-h-44 w-full max-w-screen-2xl overflow-hidden rounded-2xl border border-[#cfe7d8] bg-[linear-gradient(100deg,#f4fbf6_0%,#ffffff_55%,#f4fbf6_100%)] px-5 py-7 sm:px-7 lg:grid-cols-[180px_1fr_auto] lg:items-center lg:gap-6 lg:py-5">
        <div className="relative hidden h-36 lg:block">
          <Image
            src="/voci/raise-hand.png"
            alt="Voci mengajak melihat bukti kerja"
            width={503}
            height={592}
            loading="lazy"
            sizes="180px"
            className="absolute -bottom-5 left-0 h-44 w-auto object-contain"
          />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-extrabold leading-tight text-[#111c33]">
            Siap Mengubah Potensi Menjadi Bukti Kerja?
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#536178]">
            Mulai perjalanan yang terukur, aman, dan bermakna bersama SyncVoca.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-0">
          <Link
            href={"/cara-kerja" as Route}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-6 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,152,86,0.18)] transition hover:bg-[#007b45]"
          >
            Lihat Cara Kerja
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={demoPortalUrl}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d4e4da] bg-white px-6 text-sm font-extrabold text-[#111c33] transition hover:bg-[#f5fbf7]"
          >
            Masuk Portal Demo
            <PlayCircle className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function PageBand({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl rounded-2xl border border-[#dbe8df] bg-white px-5 py-7 shadow-[0_16px_42px_rgba(17,28,51,0.035)] sm:px-7">
        <h2 className="text-center text-xl font-extrabold text-[#111c33] sm:text-2xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-center text-xs font-semibold leading-6 text-[#647188] sm:text-sm">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function Kicker({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded-full bg-[#eaf8ee] px-4 text-xs font-extrabold text-[#008a4a] sm:text-sm">
      <Icon className="size-4" />
      {children}
    </span>
  );
}

function IconBubble({
  icon: Icon,
  tone,
  large = false,
}: {
  icon: LucideIcon;
  tone: Tone;
  large?: boolean;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        large ? "size-16" : "size-11",
        toneClasses[tone].soft,
        toneClasses[tone].icon,
      )}
    >
      <Icon className={large ? "size-8" : "size-5"} />
    </span>
  );
}

function PortfolioLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xs font-extrabold text-[#009856]", className)}>
      {children}
    </p>
  );
}

function CheckListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-xs font-semibold leading-5 text-[#40506a]">
      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#009856] text-white">
        <Check className="size-3" />
      </span>
      <span>{children}</span>
    </li>
  );
}

function SealBadge() {
  return (
    <div className="mx-auto grid size-32 place-items-center rounded-[32px] border-4 border-[#c68b24] bg-[linear-gradient(145deg,#0b4f3c,#06382c)] p-3 text-center text-[#ffd477] shadow-[0_14px_30px_rgba(57,42,12,0.18)]">
      <div>
        <BadgeCheck className="mx-auto size-10" />
        <p className="mt-1 text-[11px] font-black uppercase leading-4">
          Industry
          <br />
          Validation
          <br />
          Seal
        </p>
      </div>
    </div>
  );
}

function BuildingIcon() {
  return <BriefcaseBusiness className="size-6" />;
}
