import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  DatabaseZap,
  GraduationCap,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { LandingFooter } from "@/components/landing/shared/landing-footer";
import { LandingHeader } from "@/components/landing/shared/landing-header";
import { demoPortalUrl } from "@/lib/external-links";
import { cn } from "@/lib/utils";

type Tone = "green" | "amber" | "purple" | "blue" | "teal";
type Access = "yes" | "limited" | "no";

type RoleCardData = {
  id: string;
  icon: LucideIcon;
  title: string;
  bullets: string[];
  note: string;
  image: string;
  tone: Tone;
};

const toneClasses: Record<
  Tone,
  { text: string; soft: string; border: string; note: string }
> = {
  green: {
    text: "text-[#009856]",
    soft: "bg-[#eaf8ee]",
    border: "border-[#cfe7d8]",
    note: "bg-[#eff9f3] text-[#26724d]",
  },
  amber: {
    text: "text-[#f39a1f]",
    soft: "bg-[#fff3e2]",
    border: "border-[#f2ddbf]",
    note: "bg-[#fff8ee] text-[#9a6421]",
  },
  purple: {
    text: "text-[#8557e8]",
    soft: "bg-[#f2edff]",
    border: "border-[#dfd7f6]",
    note: "bg-[#f7f3ff] text-[#6d51b8]",
  },
  blue: {
    text: "text-[#2878ee]",
    soft: "bg-[#edf5ff]",
    border: "border-[#d5e4f9]",
    note: "bg-[#f1f6ff] text-[#2d62ae]",
  },
  teal: {
    text: "text-[#138f70]",
    soft: "bg-[#e8f8f3]",
    border: "border-[#cce8df]",
    note: "bg-[#eef9f5] text-[#26735e]",
  },
};

const roleCards: RoleCardData[] = [
  {
    id: "siswa",
    icon: GraduationCap,
    title: "Untuk Siswa",
    bullets: [
      "Mengenal potensi dan minat",
      "Latihan atau simulasi sesuai kemampuan",
      "Melihat progres perkembangan",
      "Membangun portofolio kompetensi",
      "Siap untuk peluang kerja nyata",
    ],
    note: "Belajar sesuai minat, bertumbuh percaya diri, dan siap untuk masa depan.",
    image: "/landing/beranda/murid.png",
    tone: "green",
  },
  {
    id: "guru",
    icon: UsersRound,
    title: "Untuk Guru",
    bullets: [
      "Memantau perkembangan siswa",
      "Melihat hasil simulasi dan evidence",
      "Membuat catatan pendampingan yang terstruktur",
      "Menyusun rencana latihan yang tepat",
      "Membantu proses consent dan portofolio",
    ],
    note: "Data membantu guru mendampingi lebih tepat, bukan menggantikan peran guru.",
    image: "/landing/beranda/guru.png",
    tone: "amber",
  },
  {
    id: "orang-tua",
    icon: UsersRound,
    title: "Untuk Orang Tua",
    bullets: [
      "Melihat perkembangan anak dengan mudah",
      "Mendapat rekomendasi dukungan di rumah",
      "Memahami progres dengan bahasa sederhana",
      "Ikut menjaga consent dan keamanan data",
    ],
    note: "Lebih tenang karena perkembangan anak dapat dipahami dan data tetap aman.",
    image: "/landing/beranda/ortu.png",
    tone: "purple",
  },
  {
    id: "dudi",
    icon: BriefcaseBusiness,
    title: "Untuk DUDI",
    bullets: [
      "Menemukan talenta berbasis bukti",
      "Membaca skill dan evidence yang relevan",
      "Memahami kebutuhan akomodasi kerja",
      "Memberi validation seal berbasis bukti",
      "Menjalankan shortlist atau placement dengan data aman",
    ],
    note: "Talenta lebih tepat, proses lebih adil, dan keputusan berbasis bukti.",
    image: "/landing/beranda/dudi.png",
    tone: "blue",
  },
  {
    id: "admin",
    icon: ShieldCheck,
    title: "Untuk Admin / Sekolah",
    bullets: [
      "Mengelola data pengguna dan akses",
      "Melihat governance dan kepatuhan",
      "Memantau consent dan status keamanan data",
      "Melihat audit trail dan log aktivitas",
      "Menjaga kualitas data dan alur proses",
    ],
    note: "Sistem tertata, data terjaga, dan ekosistem sekolah berjalan lebih efektif.",
    image: "/landing/beranda/admin.png",
    tone: "teal",
  },
];

const permissionRows: Array<{ label: string; values: Access[] }> = [
  {
    label: "Identitas Pribadi Siswa",
    values: ["limited", "limited", "limited", "no", "limited"],
  },
  {
    label: "Hasil Simulasi & Progress",
    values: ["yes", "yes", "limited", "limited", "yes"],
  },
  {
    label: "Evidence & Portofolio Publik",
    values: ["yes", "yes", "limited", "yes", "yes"],
  },
  {
    label: "Catatan Pendampingan Guru",
    values: ["yes", "yes", "no", "no", "yes"],
  },
  {
    label: "Kebutuhan Akomodasi Kerja",
    values: ["yes", "yes", "limited", "yes", "yes"],
  },
  {
    label: "Catatan Medis & Sensitif",
    values: ["limited", "limited", "limited", "no", "limited"],
  },
  { label: "Data Governance & Audit", values: ["no", "no", "no", "no", "yes"] },
];

const permissionRoles = [
  { label: "Siswa", icon: GraduationCap, tone: "green" },
  { label: "Guru", icon: UsersRound, tone: "amber" },
  { label: "Orang Tua", icon: UsersRound, tone: "purple" },
  { label: "DUDI", icon: BriefcaseBusiness, tone: "blue" },
  { label: "Admin / Sekolah", icon: ShieldCheck, tone: "teal" },
] satisfies Array<{ label: string; icon: LucideIcon; tone: Tone }>;

const accessRules = [
  { icon: ShieldCheck, text: "DUDI tidak mendapatkan data internal siswa." },
  { icon: UserRound, text: "Orang tua hanya melihat data anak terkait." },
  {
    icon: ClipboardCheck,
    text: "Guru hanya melihat siswa sesuai assignment atau sekolah.",
  },
  {
    icon: DatabaseZap,
    text: "Semua akses dicatat dalam audit trail untuk keamanan dan transparansi.",
  },
] as const;

export function UntukSiapaLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#101a35]">
      <LandingHeader activeLabel="Untuk Siapa" />
      <AudienceHero />
      <RoleSections />
      <AccessMatrix />
      <AudienceCta />
      <LandingFooter />
    </main>
  );
}

function AudienceHero() {
  return (
    <section className=" mb-15 border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="sv-hero-grid mx-auto grid w-full max-w-screen-2xl gap-6 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-5 lg:pt-8 xl:px-10 2xl:gap-7 2xl:pb-0 2xl:pt-9">
        <div className="relative z-10 w-full min-w-0 max-w-3xl overflow-hidden">
          <Kicker icon={ShieldCheck}>Satu Platform untuk Semua Peran</Kicker>
          <h1 className="mt-6 max-w-[680px] text-3xl font-extrabold leading-[1.14] text-[#111c33] sm:text-4xl lg:text-[2.7rem] xl:text-[3.15rem] 2xl:text-[3.5rem]">
            Satu Platform,
            <br />
            Banyak Peran,
            <br />
            <span className="text-[#009856]">Satu Tujuan</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm font-semibold leading-7 text-[#3d4d67] sm:text-base sm:leading-8">
            SyncVoca menghubungkan siswa, sekolah, keluarga, dan industri dalam
            satu ekosistem untuk membantu ABK mengenal potensi, mengasah
            kemampuan, dan siap menuju masa depan yang mandiri.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={demoPortalUrl}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-7 text-sm font-extrabold text-white shadow-[0_16px_30px_rgba(0,152,86,0.2)] transition hover:bg-[#007b45]"
            >
              Pilih Peran di Portal Demo
              <ArrowRight className="size-4" />
            </a>
            <Link
              href={"/cara-kerja" as Route}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d7e5dc] bg-white px-7 text-sm font-extrabold text-[#111c33] shadow-sm transition hover:bg-[#f4faf6]"
            >
              Pelajari Cara Kerja
              <PlayCircle className="size-5" />
            </Link>
          </div>
        </div>

        <div className="relative mt-8 mx-auto min-w-0 w-full max-w-2xl self-end lg:mx-0 lg:self-center 2xl:max-w-3xl scale-[1.1] lg:scale-[1.2] lg:translate-[-30px,0]">
          <Image
            src="/landing/untuk-siapa/hero-section.png"
            alt="Siswa, guru, orang tua, dan DUDI dalam SyncVoca"
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

function RoleSections() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-4 lg:grid-cols-6">
        {roleCards.map((role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
          />
        ))}
      </div>
    </section>
  );
}

function RoleCard({
  role,
  className,
}: {
  role: RoleCardData;
  className?: string;
}) {
  return (
    <article
      id={role.id}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-2xl border bg-white shadow-[0_16px_42px_rgba(17,28,51,0.04)]",
        toneClasses[role.tone].border,
        className,
      )}
    >
      <div className="px-5 pt-6 sm:px-6 lg:hidden">
        <div className="flex items-center gap-3">
          <IconBubble icon={role.icon} tone={role.tone} large />
          <h2 className="text-lg font-extrabold text-[#111c33] sm:text-xl">
            {role.title}
          </h2>
        </div>

        <div
          className={cn(
            "relative mt-5 flex h-64 items-end justify-center overflow-hidden rounded-xl sm:h-72",
            toneClasses[role.tone].soft,
          )}
        >
          <Image
            src={role.image}
            alt={role.title}
            width={560}
            height={620}
            loading="lazy"
            sizes="(max-width: 1024px) 82vw, 42vw"
            className="relative h-full w-auto max-w-full object-contain object-bottom"
          />
        </div>

        <RoleBulletList role={role} className="mb-6 mt-6" />
      </div>

      <div className="hidden min-h-[370px] grid-cols-[1fr_44%] gap-3 px-5 pt-6 sm:px-6 lg:grid">
        <div className="relative z-10 pb-5">
          <div className="flex items-center gap-3">
            <IconBubble icon={role.icon} tone={role.tone} large />
            <h2 className="text-lg font-extrabold text-[#111c33] sm:text-xl">
              {role.title}
            </h2>
          </div>
          <RoleBulletList role={role} className="mt-6" />
        </div>
        <div className="relative min-w-0 self-end">
          <Image
            src={role.image}
            alt={role.title}
            width={560}
            height={620}
            loading="lazy"
            sizes="(max-width: 1024px) 42vw, 24vw"
            className="absolute bottom-0 left-1/2 h-[290px] w-auto max-w-none -translate-x-1/2 object-contain object-bottom sm:h-[320px]"
          />
        </div>
      </div>
      <p
        className={cn(
          "mx-4 mb-4 rounded-xl px-4 py-3 text-center text-xs font-extrabold leading-5 sm:mx-5",
          toneClasses[role.tone].note,
        )}
      >
        {role.note}
      </p>
    </article>
  );
}

function RoleBulletList({
  role,
  className,
}: {
  role: RoleCardData;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3.5", className)}>
      {role.bullets.map((bullet) => (
        <li
          key={bullet}
          className="flex gap-3 text-xs font-semibold leading-5 text-[#40506a] sm:text-sm sm:leading-6"
        >
          <Check
            className={cn(
              "mt-0.5 size-4 shrink-0 rounded-full p-0.5 text-white",
              role.tone === "purple"
                ? "bg-[#8557e8]"
                : role.tone === "blue"
                  ? "bg-[#2878ee]"
                  : role.tone === "amber"
                    ? "bg-[#f39a1f]"
                    : "bg-[#009856]",
            )}
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function AccessMatrix() {
  return (
    <PageBand
      title="Peran Berbeda, Data Berbeda"
      subtitle="Setiap peran memiliki hak akses yang berbeda sesuai kebutuhan. SyncVoca menerapkan privacy wall agar data internal siswa tetap aman."
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <div className="sv-scrollbar-hidden overflow-x-auto rounded-2xl border border-[#dce8e0]">
          <table className="w-full min-w-[840px] border-collapse bg-white text-xs">
            <thead>
              <tr className="bg-[#f6faf7] text-[#111c33]">
                <th className="w-52 border-b border-r border-[#e1eae4] px-4 py-4 text-left font-extrabold">
                  Jenis Data
                </th>
                {permissionRoles.map((role) => (
                  <th
                    key={role.label}
                    className="border-b border-r border-[#e1eae4] px-3 py-3 font-extrabold last:border-r-0"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <IconBubble icon={role.icon} tone={role.tone} />
                      <span>{role.label}</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionRows.map((row) => (
                <tr key={row.label} className="text-[#40506a]">
                  <th className="border-b border-r border-[#e7eee9] px-4 py-3 text-left font-bold">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.label}-${permissionRoles[index].label}`}
                      className="border-b border-r border-[#e7eee9] px-3 py-3 text-center last:border-r-0"
                    >
                      <AccessBadge value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex min-w-[840px] flex-wrap items-center justify-center gap-6 bg-[#fbfdfb] px-4 py-3 text-[11px] font-bold text-[#647188]">
            <AccessBadge value="yes" />
            <AccessBadge value="limited" />
            <span>Hanya sesuai scope dan relasi</span>
            <AccessBadge value="no" />
            <span>Tidak dapat diakses</span>
          </div>
        </div>

        <aside className="grid gap-4 rounded-2xl border border-[#cfe7d8] bg-[#f1faf4] p-5 sm:grid-cols-2 xl:grid-cols-1">
          {accessRules.map((rule) => (
            <div key={rule.text} className="flex items-start gap-4">
              <rule.icon className="size-8 shrink-0 text-[#009856]" />
              <p className="text-xs font-extrabold leading-6 text-[#40506a]">
                {rule.text}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </PageBand>
  );
}

function AudienceCta() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-8 pt-2 sm:px-8">
      <div className="relative mx-auto grid min-h-44 w-full max-w-screen-2xl overflow-hidden rounded-2xl border border-[#cfe7d8] bg-[linear-gradient(100deg,#f4fbf6_0%,#ffffff_55%,#f4fbf6_100%)] px-5 py-7 sm:px-7 lg:grid-cols-[180px_1fr_auto] lg:items-center lg:gap-6 lg:py-5">
        <div className="relative hidden h-36 lg:block">
          <Image
            src="/voci/raise-hand.png"
            alt="Voci mengajak memilih peran"
            width={503}
            height={592}
            loading="lazy"
            sizes="180px"
            className="absolute -bottom-5 left-0 h-44 w-auto object-contain"
          />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-extrabold leading-tight text-[#008a4a]">
            Setiap peran penting untuk masa depan ABK
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#536178]">
            Bersama-sama, kita ciptakan perjalanan belajar dan kerja yang
            inklusif, aman, dan bermakna.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-0">
          <a
            href={demoPortalUrl}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-6 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,152,86,0.18)] transition hover:bg-[#007b45]"
          >
            Pilih Peran di Portal Demo
            <ArrowRight className="size-4" />
          </a>
          <Link
            href={"/cara-kerja" as Route}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d4e4da] bg-white px-6 text-sm font-extrabold text-[#111c33] transition hover:bg-[#f5fbf7]"
          >
            Pelajari Cara Kerja
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
}: {
  icon: LucideIcon;
  tone: Tone;
  large?: boolean;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        large ? "size-12" : "size-8",
        toneClasses[tone].soft,
        toneClasses[tone].text,
      )}
    >
      <Icon className={large ? "size-6" : "size-4"} />
    </span>
  );
}

function AccessBadge({ value }: { value: Access }) {
  if (value === "yes")
    return (
      <span className="inline-flex items-center justify-center gap-1.5 font-extrabold text-[#009856]">
        <Check className="size-4 rounded-full border border-current p-0.5" />{" "}
        Dapat Dilihat
      </span>
    );
  if (value === "limited")
    return (
      <span className="inline-flex items-center justify-center gap-1.5 font-extrabold text-[#f39a1f]">
        <LockKeyhole className="size-4" /> Terbatas
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center gap-1.5 font-extrabold text-[#f04452]">
      <X className="size-4 rounded-full border border-current p-0.5" /> Tidak
    </span>
  );
}
