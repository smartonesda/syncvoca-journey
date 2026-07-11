import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Check,
  FileClock,
  FileText,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import { LandingFooter } from "@/components/landing/shared/landing-footer";
import { LandingHeader } from "@/components/landing/shared/landing-header";
import { cn } from "@/lib/utils";

type Tone = "green" | "blue" | "purple" | "amber" | "red";

const toneClasses: Record<
  Tone,
  { text: string; soft: string; border: string }
> = {
  green: {
    text: "text-[#009856]",
    soft: "bg-[#eaf8ee]",
    border: "border-[#cfe7d8]",
  },
  blue: {
    text: "text-[#2878ee]",
    soft: "bg-[#edf5ff]",
    border: "border-[#d5e4f9]",
  },
  purple: {
    text: "text-[#8456e8]",
    soft: "bg-[#f2edff]",
    border: "border-[#dfd7f6]",
  },
  amber: {
    text: "text-[#f39a1f]",
    soft: "bg-[#fff3e2]",
    border: "border-[#f2ddbf]",
  },
  red: {
    text: "text-[#f04452]",
    soft: "bg-[#fff0f1]",
    border: "border-[#f4cfd2]",
  },
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Data Minimization",
    body: "Kami hanya mengumpulkan data yang diperlukan untuk pendampingan dan validasi.",
    tone: "green",
  },
  {
    icon: UserRoundCheck,
    title: "Consent Sebelum Validasi",
    body: "Tidak ada data yang digunakan untuk validasi atau placement tanpa persetujuan pihak berwenang.",
    tone: "green",
  },
  {
    icon: UsersRound,
    title: "Role-Based Access",
    body: "Akses data diberikan sesuai peran dan kebutuhan, tidak semua melihat semua.",
    tone: "blue",
  },
  {
    icon: FileClock,
    title: "Audit Log",
    body: "Setiap akses dan perubahan data dicatat untuk menjaga akuntabilitas dan transparansi.",
    tone: "purple",
  },
  {
    icon: LockKeyhole,
    title: "Pseudonymized Reporting",
    body: "Laporan dan analitik menggunakan data tersamarkan untuk menjaga privasi dan keamanan.",
    tone: "amber",
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}>;

const publicData = [
  ["Kode Kandidat", "Contoh: ABK-01-XDZF"],
  ["Minat Vokasi", "Area minat dan kecenderungan kerja"],
  ["Readiness Score", "Skor kesiapan kerja secara ringkas"],
  ["Skill Publik", "Kompetensi utama yang relevan"],
  ["Evidence Terkurasi", "Bukti kerja yang telah dikurasi"],
  ["Akomodasi Kerja", "Kebutuhan dukungan di tempat kerja"],
  ["Consent Status", "Pending / Approved / Revoked"],
  ["Validation Seal", "Seal validasi industri"],
  ["Placement Status", "Status penempatan jika tersedia"],
] as const;

const privateData = [
  "Nama Lengkap Siswa",
  "Sekolah Spesifik",
  "Kontak Wali / Orang Tua",
  "Catatan Medis",
  "Latar Keluarga",
  "Private Notes",
  "Catatan Guru Internal",
  "Raw Support Profile",
  "Riwayat Pendampingan Detail",
  "Informasi Lain di Luar Scope",
] as const;

const consentFlow = [
  {
    icon: FileText,
    title: "Request Consent",
    body: "Sekolah atau DUDI mengajukan permintaan penggunaan data tertentu.",
    tone: "green",
  },
  {
    icon: ShieldCheck,
    title: "Review & Approve",
    body: "Sekolah atau wali meninjau scope data yang diminta, lalu memberi persetujuan.",
    tone: "green",
  },
  {
    icon: X,
    title: "Revoke Kapan Saja",
    body: "Persetujuan dapat dicabut kapan saja jika sudah tidak diperlukan.",
    tone: "red",
  },
  {
    icon: BadgeCheck,
    title: "Status Consent",
    body: "Status terlihat jelas di profil kandidat: pending, approved, atau revoked.",
    tone: "blue",
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}>;

const consentStatuses = [
  { label: "Pending", body: "Menunggu persetujuan", tone: "amber" },
  { label: "Approved", body: "Disetujui dan aktif", tone: "green" },
  { label: "Revoked", body: "Dicabut dan tidak aktif", tone: "red" },
] satisfies Array<{ label: string; body: string; tone: Tone }>;

const auditItems = [
  {
    icon: FileClock,
    title: "Akses Data Tercatat",
    body: "Setiap akses ke data kandidat dicatat berdasarkan peran dan waktu.",
    tone: "green",
  },
  {
    icon: LockKeyhole,
    title: "Validasi Diblokir Jika Consent Belum Aktif",
    body: "Sistem otomatis menolak jika consent belum diberikan.",
    tone: "red",
  },
  {
    icon: FileText,
    title: "Export Report Tercatat",
    body: "Setiap export laporan tercatat: siapa, kapan, dan data apa yang diakses.",
    tone: "blue",
  },
  {
    icon: BarChart3,
    title: "Placement Update Tercatat",
    body: "Semua perubahan status placement dicatat untuk transparansi.",
    tone: "amber",
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}>;

export function KeamananDataLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#101a35]">
      <LandingHeader activeLabel="Keamanan Data" />
      <SecurityHero />
      <PrinciplesSection />
      <DataBoundarySection />
      <ConsentSection />
      <AuditSection />
      <PrivacyWallSimulation />
      <SecurityCta />
      <LandingFooter />
    </main>
  );
}

function SecurityHero() {
  return (
    <section className="mb-20 md:pt-15 pt-0 border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="sv-hero-grid mx-auto grid w-full max-w-screen-2xl gap-6 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-5 lg:pt-8 xl:px-10 2xl:gap-7 2xl:pb-0 2xl:pt-9">
        <div className="relative z-10 w-full min-w-0 max-w-3xl overflow-hidden">
          <Kicker icon={ShieldCheck}>Data Aman, Potensi Terlindungi</Kicker>
          <h1 className="mt-6 max-w-full break-words text-3xl font-extrabold leading-tight tracking-normal text-[#111c33] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] 2xl:mt-7 2xl:text-5xl 2xl:leading-tight">
            Bukti Kerja Bisa Dibaca,
            <br />
            <span className="text-[#009856]">Data Sensitif Tetap Aman</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm font-semibold leading-7 text-[#3d4d67] sm:text-base sm:leading-8">
            SyncVoca menerapkan privacy wall yang memisahkan data publik yang
            boleh dibaca industri dengan data sensitif yang hanya digunakan
            untuk pendampingan internal.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={"/cara-kerja" as Route}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-7 text-sm font-extrabold text-white shadow-[0_16px_30px_rgba(0,152,86,0.2)] transition hover:bg-[#007b45]"
            >
              Pelajari Cara Kerja
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={"/bukti-kerja" as Route}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d7e5dc] bg-white px-7 text-sm font-extrabold text-[#111c33] shadow-sm transition hover:bg-[#f4faf6]"
            >
              Lihat Bukti Kerja
              <PlayCircle className="size-5" />
            </Link>
          </div>
        </div>

        <div className="relative mt-8 mx-auto min-w-0 w-full max-w-2xl self-end lg:mx-0 lg:self-center 2xl:max-w-3xl scale-[1.1] lg:scale-[1.2] lg:translate-[-30px,0]">
          <Image
            src="/landing/keamanan-data/hero-section.png"
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

function PrinciplesSection() {
  return (
    <PageBand title="Prinsip Keamanan SyncVoca">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {principles.map((item) => (
          <article
            key={item.title}
            className="flex min-h-52 flex-col items-center rounded-2xl border border-[#dce8e0] bg-white px-4 py-5 text-center"
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

function DataBoundarySection() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#dbe8df] bg-white p-6 shadow-[0_16px_42px_rgba(17,28,51,0.035)]">
          <h2 className="text-center text-2xl font-extrabold text-[#111c33]">
            DUDI Melihat Apa?
          </h2>
          <p className="mt-2 text-center text-xs font-semibold text-[#647188]">
            Informasi yang boleh dibaca industri melalui privacy wall.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {publicData.map(([title, body]) => (
              <div key={title} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 rounded-full bg-[#009856] p-0.5 text-white" />
                <div>
                  <h3 className="text-xs font-extrabold text-[#111c33]">
                    {title}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold leading-5 text-[#647188]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#cfe7d8] bg-[#eff9f3] px-4 py-3 text-xs font-extrabold leading-5 text-[#405a4d]">
            <ShieldCheck className="size-7 shrink-0 text-[#009856]" />
            DUDI tidak dapat melihat data sensitif atau informasi pribadi yang
            tidak relevan dengan rekrutmen.
          </div>
        </article>

        <article className="rounded-2xl border border-[#f0d8da] bg-[linear-gradient(135deg,#ffffff,#fff8f8)] p-6 shadow-[0_16px_42px_rgba(17,28,51,0.035)]">
          <h2 className="text-center text-2xl font-extrabold text-[#111c33]">
            Data yang Tetap Internal
          </h2>
          <p className="mt-2 text-center text-xs font-semibold text-[#647188]">
            Informasi sensitif hanya digunakan untuk pendampingan internal.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {privateData.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white/75 px-3 py-2.5"
              >
                <LockKeyhole className="size-4 shrink-0 text-[#f04452]" />
                <span className="text-xs font-extrabold text-[#263550]">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#f2c9cd] bg-[#fff0f1] px-4 py-3 text-xs font-extrabold leading-5 text-[#70434a]">
            <LockKeyhole className="size-7 shrink-0 text-[#f04452]" />
            Data ini tidak pernah dibagikan ke pihak industri tanpa persetujuan
            yang sah.
          </div>
        </article>
      </div>
    </section>
  );
}

function ConsentSection() {
  return (
    <PageBand
      title="Consent Sebelum Validasi"
      subtitle="Sebelum data kandidat dipakai untuk validasi industri atau placement, sekolah atau wali harus memberi persetujuan sesuai scope yang dibutuhkan."
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_230px]">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {consentFlow.map((item, index) => (
            <article key={item.title} className="relative text-center">
              {index < consentFlow.length - 1 ? (
                <ArrowRight className="absolute -right-4 top-7 hidden size-5 text-[#24b773] lg:block" />
              ) : null}
              <IconBubble
                icon={item.icon}
                tone={item.tone}
                large
                className="mx-auto"
              />
              <h3 className="mt-4 text-sm font-extrabold text-[#111c33]">
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-48 text-xs font-semibold leading-6 text-[#536178]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <aside className="rounded-2xl border border-[#dce8e0] bg-[#fbfdfb] p-5">
          <h3 className="text-sm font-extrabold text-[#008a4a]">
            Status Consent
          </h3>
          <div className="mt-4 space-y-4">
            {consentStatuses.map((status) => (
              <div key={status.label} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 size-4 rounded-full",
                    toneClasses[status.tone].soft,
                    "border-4 border-current",
                    toneClasses[status.tone].text,
                  )}
                />
                <div>
                  <p className="text-xs font-extrabold text-[#111c33]">
                    {status.label}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-[#647188]">
                    {status.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </PageBand>
  );
}

function AuditSection() {
  return (
    <PageBand
      title="Audit Trail & Keamanan Aktivitas"
      subtitle="SyncVoca mencatat setiap aktivitas penting untuk menjaga integritas dan keamanan sistem."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {auditItems.map((item) => (
          <article key={item.title} className="flex gap-4">
            <IconBubble icon={item.icon} tone={item.tone} />
            <div>
              <h3 className="text-sm font-extrabold leading-5 text-[#111c33]">
                {item.title}
              </h3>
              <p className="mt-2 text-xs font-semibold leading-6 text-[#536178]">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageBand>
  );
}

function PrivacyWallSimulation() {
  return (
    <PageBand
      title="Simulasi Privacy Wall"
      subtitle="Contoh kandidat dan data yang dibagikan secara aman."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
        <PrivacyDataCard
          title="Yang Dilihat DUDI"
          label="Publik"
          tone="green"
          rows={[
            ["Kode Kandidat", "ABK-01-XDZF"],
            ["Minat Vokasi", "Administrasi & Data Entry"],
            ["Readiness Score", "82 / 100"],
            ["Skill Publik", "Data Entry, Ketelitian, Administrasi"],
            ["Evidence Terkurasi", "6 Bukti"],
            ["Akomodasi Kerja", "Bukti instruksi visual, waktu adaptasi"],
            ["Consent Status", "Approved"],
            ["Validation Seal", "Industry Validation Seal"],
            ["Placement Status", "Ready for Opportunity"],
          ]}
        />

        <div className="relative rounded-2xl border border-[#dce8e0] bg-white p-5 text-center shadow-[0_12px_28px_rgba(17,28,51,0.05)]">
          <ShieldCheck className="absolute left-1/2 top-0 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#009856] p-2 text-white" />
          <div className="relative mx-auto mt-2 size-20 overflow-hidden rounded-full bg-[#eaf8ee]">
            <Image
              src="/landing/cara-kerja/7.png"
              alt="Rizky Pratama"
              width={1254}
              height={1254}
              loading="lazy"
              sizes="80px"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <h3 className="mt-3 text-base font-extrabold text-[#111c33]">
            Rizky Pratama
          </h3>
          <p className="mt-1 text-xs font-bold text-[#647188]">ABK-01-XDZF</p>
          <div className="mx-auto mt-4 grid size-24 place-items-center rounded-full bg-[conic-gradient(#009856_0_82%,#e3ede7_82%_100%)] p-2">
            <div className="grid size-full place-items-center rounded-full bg-white">
              <div>
                <span className="text-3xl font-extrabold">82</span>
                <span className="text-xs font-bold text-[#647188]">/100</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs font-bold text-[#647188]">Journey Score</p>
          <Link
            href={"/bukti-kerja" as Route}
            className="mt-4 inline-flex min-h-10 items-center rounded-xl bg-[#009856] px-5 text-xs font-extrabold text-white"
          >
            Lihat Portofolio
          </Link>
        </div>

        <PrivacyDataCard
          title="Yang Tetap Internal"
          label="Privat"
          tone="red"
          rows={[
            ["Nama Lengkap", "Rizky Pratama"],
            ["Sekolah", "Negeri 1 Sidoarjo"],
            ["Kontak Wali", "0812-XXXX-XXXX"],
            ["Catatan Medis", "Sensitif"],
            ["Latar Keluarga", "Sensitif"],
            ["Private Notes", "Perlu pendampingan intensif"],
            ["Catatan Guru Internal", "Perkembangan harian"],
            ["Raw Support Profile", "Lengkap"],
          ]}
        />
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#eff8f2] px-4 py-2 text-center text-xs font-extrabold text-[#476153]">
        <LockKeyhole className="size-4 text-[#009856]" />
        Privacy wall memastikan hanya data yang relevan dan aman yang dibagikan
        ke pihak industri.
      </div>
    </PageBand>
  );
}

function SecurityCta() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-8 pt-2 sm:px-8">
      <div className="relative mx-auto grid min-h-44 w-full max-w-screen-2xl overflow-hidden rounded-2xl border border-[#cfe7d8] bg-[linear-gradient(100deg,#f4fbf6_0%,#ffffff_55%,#f4fbf6_100%)] px-5 py-7 sm:px-7 lg:grid-cols-[180px_1fr_auto] lg:items-center lg:gap-6 lg:py-5">
        <div className="relative hidden h-36 lg:block">
          <Image
            src="/voci/full-body.png"
            alt="Voci menjaga keamanan data"
            width={1024}
            height={1024}
            loading="lazy"
            sizes="180px"
            className="absolute -bottom-8 left-0 h-48 w-auto object-contain"
          />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-extrabold leading-tight text-[#111c33]">
            Mari menjaga data, sambil membuka peluang
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#536178]">
            Bersama SyncVoca, potensi ABK bisa terlihat, bukti kerja bisa
            dipercaya, dan data sensitif tetap aman.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-0">
          <Link
            href={"/cara-kerja" as Route}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-6 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,152,86,0.18)] transition hover:bg-[#007b45]"
          >
            Pelajari Cara Kerja
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={"/bukti-kerja" as Route}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d4e4da] bg-white px-6 text-sm font-extrabold text-[#111c33] transition hover:bg-[#f5fbf7]"
          >
            Lihat Bukti Kerja
            <PlayCircle className="size-4" />
          </Link>
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
          <p className="mx-auto mt-2 max-w-4xl text-center text-xs font-semibold leading-6 text-[#647188] sm:text-sm">
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
  className,
}: {
  icon: LucideIcon;
  tone: Tone;
  large?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        large ? "size-16" : "size-11",
        toneClasses[tone].soft,
        toneClasses[tone].text,
        className,
      )}
    >
      <Icon className={large ? "size-8" : "size-5"} />
    </span>
  );
}

function DataPreviewCard({
  title,
  subtitle,
  tone,
  items,
  footer,
}: {
  title: string;
  subtitle: string;
  tone: "green" | "red";
  items: string[];
  footer: string;
}) {
  return (
    <div
      className={cn(
        "relative z-20 hidden overflow-hidden rounded-2xl border bg-white/92 shadow-[0_14px_34px_rgba(17,28,51,0.07)] sm:block",
        toneClasses[tone].border,
      )}
    >
      <div className="px-3 py-3 text-center">
        <p className="text-xs font-extrabold text-[#111c33]">
          {title}{" "}
          <span className="font-semibold text-[#7b8798]">({subtitle})</span>
        </p>
      </div>
      <div className="space-y-2 px-3 py-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-[9px] font-bold leading-4 text-[#536178]"
          >
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full",
                toneClasses[tone].soft,
                toneClasses[tone].text,
              )}
            >
              {tone === "red" ? (
                <LockKeyhole className="size-2.5" />
              ) : (
                <Check className="size-2.5" />
              )}
            </span>
            {item}
          </div>
        ))}
      </div>
      <div
        className={cn(
          "mt-2 px-3 py-2 text-center text-[9px] font-extrabold",
          toneClasses[tone].soft,
          toneClasses[tone].text,
        )}
      >
        {footer}
      </div>
    </div>
  );
}

function PrivacyDataCard({
  title,
  label,
  tone,
  rows,
}: {
  title: string;
  label: string;
  tone: "green" | "red";
  rows: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border p-5",
        tone === "green"
          ? "border-[#cfe7d8] bg-[#f1faf4]"
          : "border-[#f0cfd2] bg-[#fff6f6]",
      )}
    >
      <h3 className={cn("text-base font-extrabold", toneClasses[tone].text)}>
        {title} <span className="text-xs font-bold">({label})</span>
      </h3>
      <dl className="mt-4 space-y-2.5">
        {rows.map(([term, value]) => (
          <div
            key={term}
            className="grid grid-cols-[120px_1fr] gap-3 text-[11px] leading-5"
          >
            <dt className="font-extrabold text-[#263550]">{term}:</dt>
            <dd className="font-semibold text-[#536178]">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
