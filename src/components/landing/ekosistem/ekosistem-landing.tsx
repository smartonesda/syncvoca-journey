import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  Factory,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  PlayCircle,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  UsersRound,
} from "lucide-react";
import { LandingFooter } from "@/components/landing/shared/landing-footer";
import { LandingHeader } from "@/components/landing/shared/landing-header";
import { demoPortalUrl } from "@/lib/external-links";
import { cn } from "@/lib/utils";

type Tone = "green" | "amber" | "purple" | "blue" | "pink";

type IconItem = {
  icon: LucideIcon;
  title: string;
  body: string;
  tone?: Tone;
};

const tones: Record<
  Tone,
  { icon: string; soft: string; border: string; arrow: string }
> = {
  green: {
    icon: "text-[#009856]",
    soft: "bg-[#eaf8ee]",
    border: "border-[#cfe8d8]",
    arrow: "text-[#009856]",
  },
  amber: {
    icon: "text-[#f39a1f]",
    soft: "bg-[#fff3e2]",
    border: "border-[#f2ddbf]",
    arrow: "text-[#f39a1f]",
  },
  purple: {
    icon: "text-[#8557e8]",
    soft: "bg-[#f2edff]",
    border: "border-[#e0d8f5]",
    arrow: "text-[#8557e8]",
  },
  blue: {
    icon: "text-[#2577e8]",
    soft: "bg-[#edf5ff]",
    border: "border-[#d6e4f8]",
    arrow: "text-[#2577e8]",
  },
  pink: {
    icon: "text-[#df58c6]",
    soft: "bg-[#fff0fb]",
    border: "border-[#f1d8ec]",
    arrow: "text-[#df58c6]",
  },
};

const pillars = [
  {
    icon: UserRound,
    title: "Siswa",
    body: "Mengenal potensi, berlatih lewat simulasi, mengumpulkan bukti, dan membangun portofolio kompetensi.",
    tone: "green",
  },
  {
    icon: UsersRound,
    title: "Guru / Sekolah",
    body: "Membimbing, memantau perkembangan, memvalidasi bukti, dan menyiapkan kesiapan kerja siswa.",
    tone: "amber",
  },
  {
    icon: HeartHandshake,
    title: "Orang Tua",
    body: "Memahami perkembangan anak, memberi dukungan di rumah, dan menyetujui penggunaan data.",
    tone: "purple",
  },
  {
    icon: BriefcaseBusiness,
    title: "DUDI",
    body: "Mendapatkan kandidat berdasarkan bukti kompetensi yang relevan, aman, dan siap divalidasi.",
    tone: "blue",
  },
] satisfies IconItem[];

const partners = [
  { icon: School, label: "SLB / Sekolah\nInklusi", tone: "green" },
  { icon: GraduationCap, label: "SMK / SMA\nInklusi", tone: "green" },
  { icon: Factory, label: "DUDI &\nIndustri", tone: "purple" },
  { icon: Landmark, label: "Dinas / Instansi\nPemerintah", tone: "blue" },
  { icon: UsersRound, label: "Komunitas\nABK", tone: "blue" },
  { icon: Accessibility, label: "Ahli PLB /\nPsikolog", tone: "pink" },
  { icon: BadgeCheck, label: "Mitra\nSertifikasi", tone: "blue" },
] as const;

const ecosystemValues = [
  {
    icon: Sparkles,
    title: "Simulasi Vokasi Adaptif",
    body: "Latihan berbasis dunia kerja yang menyesuaikan kemampuan siswa.",
  },
  {
    icon: BookOpenCheck,
    title: "Portofolio Kompetensi Digital",
    body: "Semua bukti tersusun rapi, mudah dibaca, dan siap untuk validasi industri.",
  },
  {
    icon: UsersRound,
    title: "Monitoring Empat Pilar",
    body: "Siswa, guru, orang tua, dan DUDI terhubung dalam satu ekosistem.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Wall Terjaga",
    body: "Data sensitif dilindungi dengan consent dan hak akses yang jelas.",
  },
  {
    icon: BadgeCheck,
    title: "Validation Seal Industri",
    body: "Bukti kompetensi divalidasi dan disertai Industry Validation Seal.",
  },
  {
    icon: UserRound,
    title: "Talent Pool Aman",
    body: "DUDI mendapatkan akses kandidat yang relevan dan terverifikasi.",
  },
] satisfies IconItem[];

const sustainabilitySteps = [
  {
    icon: School,
    title: "SaaS untuk Sekolah",
    body: "Layanan berlangganan untuk pengelolaan pembelajaran dan bukti.",
  },
  {
    icon: ShieldCheck,
    title: "Subscription DUDI",
    body: "Akses kandidat, validasi, dan talent pool berbasis bukti.",
  },
  {
    icon: HandHeart,
    title: "CSR / Grant",
    body: "Dukungan pendanaan untuk inklusi, penelitian, dan pemberdayaan ABK.",
  },
  {
    icon: BadgeCheck,
    title: "Validasi Modul Industri",
    body: "Industri membantu menyusun dan memvalidasi modul kerja.",
  },
  {
    icon: CircleDollarSign,
    title: "Placement Fee dari Mitra",
    body: "Model kolaboratif yang adil dan berkelanjutan.",
  },
] satisfies IconItem[];

const impacts = [
  {
    icon: Sparkles,
    title: "Potensi ABK lebih terlihat",
    body: "Setiap kemampuan dipetakan dan ditampilkan dengan jelas.",
  },
  {
    icon: Target,
    title: "Guru punya data pendampingan",
    body: "Pendampingan lebih tepat berbasis bukti dan perkembangan nyata.",
  },
  {
    icon: UserRound,
    title: "Keluarga lebih paham perkembangan",
    body: "Informasi lebih mudah dipahami dan bisa didukung di rumah.",
  },
  {
    icon: ClipboardCheck,
    title: "DUDI lebih percaya karena ada bukti",
    body: "Keputusan rekrutmen lebih adil, cepat, dan berbasis data.",
  },
  {
    icon: HeartHandshake,
    title: "Transisi sekolah-ke-kerja lebih terarah",
    body: "Siswa lebih siap dan punya peluang kerja yang lebih nyata.",
  },
] satisfies IconItem[];

const stats = [
  {
    icon: UsersRound,
    value: "10K+",
    label: "Siswa Aktif",
    note: "Target 2025",
  },
  {
    icon: Building2,
    value: "250+",
    label: "Sekolah Bergabung",
    note: "Target 2025",
  },
  {
    icon: BriefcaseBusiness,
    value: "150+",
    label: "DUDI Mitra",
    note: "Target 2025",
  },
  {
    icon: ClipboardCheck,
    value: "1M+",
    label: "Bukti Kerja Terkumpul",
    note: "Target 2025",
  },
  {
    icon: ShieldCheck,
    value: "Aman & Terpercaya",
    label: "Berbasis consent, aman, dan sesuai regulasi.",
    note: "",
  },
] as const;

export function EkosistemLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#101a35]">
      <LandingHeader activeLabel="Ekosistem" />
      <EcosystemHero />
      <PillarsSection />
      <PartnersSection />
      <ValuesSection />
      <SustainabilitySection />
      <ImpactSection />
      <StatsSection />
      <EcosystemCta />
      <LandingFooter />
    </main>
  );
}

function EcosystemHero() {
  return (
    <section className="mb-20 border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="sv-hero-grid mx-auto grid w-full max-w-screen-2xl gap-6 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-5 lg:pt-8 xl:px-10 2xl:gap-7 2xl:pb-0 2xl:pt-9">
        <div className="relative z-10 w-full min-w-0 max-w-3xl overflow-hidden">
          <Kicker icon={ShieldCheck}>
            Ekosistem Vokasi Inklusif untuk ABK
          </Kicker>

          <h1 className="mt-6 max-w-full break-words text-3xl font-extrabold leading-tight tracking-normal text-[#111c33] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] 2xl:mt-7 2xl:text-5xl 2xl:leading-tight">
            Membangun Jembatan
            <br />
            <span className="text-[#009856]">Sekolah, Keluarga,</span>
            <br />
            dan Industri
          </h1>

          <p className="mt-6 max-w-2xl text-sm font-semibold leading-7 text-[#3d4d67] sm:text-base sm:leading-8">
            SyncVoca menyatukan empat pilar penting untuk membantu siswa ABK
            mengenal potensi, berlatih, mengumpulkan bukti kerja, dan siap
            memasuki dunia kerja yang inklusif dan bermakna.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:hello@syncvoca.id?subject=Bergabung%20Sebagai%20Mitra%20SyncVoca"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-7 text-sm font-extrabold text-white shadow-[0_16px_30px_rgba(0,152,86,0.2)] transition hover:bg-[#007b45]"
            >
              Bergabung Sebagai Mitra
              <ArrowRight className="size-4" />
            </a>
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
            src="/landing/ekosistem/hero-section.png"
            alt="Siswa, guru, keluarga, dan mitra dalam ekosistem SyncVoca"
            width={1306}
            height={979}
            priority
            sizes="(max-width: 1024px) 94vw, 58vw"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <PageBand title="Empat Pilar SyncVoca">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className={cn(
              "flex min-h-48 flex-col rounded-2xl border bg-white p-5 shadow-[0_12px_28px_rgba(17,28,51,0.035)]",
              tones[pillar.tone].border,
            )}
          >
            <div className="flex items-center gap-3">
              <IconBubble icon={pillar.icon} tone={pillar.tone} />
              <h3 className="text-base font-extrabold text-[#111c33]">
                {pillar.title}
              </h3>
            </div>
            <p className="mt-5 text-sm font-semibold leading-7 text-[#43516b]">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>
    </PageBand>
  );
}

function PartnersSection() {
  return (
    <PageBand title="Partner Kunci dalam Ekosistem">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7">
        {partners.map((partner) => (
          <div key={partner.label} className="text-center">
            <IconBubble
              icon={partner.icon}
              tone={partner.tone}
              large
              className="mx-auto"
            />
            <p className="mt-3 whitespace-pre-line text-xs font-extrabold leading-5 text-[#111c33]">
              {partner.label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-7 text-center text-sm font-semibold text-[#5a6880]">
        Bersama membangun ekosistem vokasi inklusif yang aman, adil, dan
        berkelanjutan.
      </p>
    </PageBand>
  );
}

function ValuesSection() {
  return (
    <PageBand title="Nilai Ekosistem SyncVoca">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {ecosystemValues.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-[#dce8e0] bg-white px-4 py-5 text-center"
          >
            <span className="mx-auto grid size-11 place-items-center rounded-full bg-[#eaf8ee] text-[#009856]">
              <item.icon className="size-6" />
            </span>
            <h3 className="mt-4 text-sm font-extrabold leading-5 text-[#007b45]">
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

function SustainabilitySection() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl rounded-2xl border border-[#dbe8df] bg-[linear-gradient(135deg,#ffffff_0%,#fbfefc_65%,#eff9f3_100%)] px-5 py-7 shadow-[0_16px_42px_rgba(17,28,51,0.035)] sm:px-7">
        <SectionTitle title="Model Keberlanjutan Ekosistem" />
        <p className="mx-auto mt-2 max-w-3xl text-center text-sm font-semibold leading-6 text-[#536178]">
          SyncVoca dirancang agar akses untuk ABK tetap inklusif, sementara
          keberlanjutan platform dibangun melalui kemitraan dan kolaborasi.
        </p>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_260px] xl:items-center">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {sustainabilitySteps.map((item, index) => (
              <article key={item.title} className="relative text-center">
                {index < sustainabilitySteps.length - 1 ? (
                  <span className="absolute left-[calc(50%+34px)] top-7 hidden h-px w-[calc(100%-52px)] bg-[#b9dfc8] lg:block" />
                ) : null}
                <span className="relative mx-auto grid size-14 place-items-center rounded-full border border-[#cae6d5] bg-white text-[#009856] shadow-sm">
                  <item.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-xs font-extrabold leading-5 text-[#111c33]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-[#5a6880]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <aside className="rounded-2xl border border-[#c9e6d4] bg-[#ecf9f1] p-6 text-[#007b45]">
            <ShieldCheck className="size-10" />
            <p className="mt-4 text-base font-extrabold leading-7">
              Bukan membebankan biaya utama ke ABK atau keluarga.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <PageBand title="Dampak yang Ingin Dicapai">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {impacts.map((item) => (
          <article key={item.title} className="text-center lg:text-left">
            <div className="flex flex-col items-center gap-3 lg:flex-row">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eaf8ee] text-[#009856]">
                <item.icon className="size-6" />
              </span>
              <h3 className="text-sm font-extrabold leading-5 text-[#111c33]">
                {item.title}
              </h3>
            </div>
            <p className="mt-4 text-xs font-semibold leading-6 text-[#5a6880]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </PageBand>
  );
}

function StatsSection() {
  return (
    <PageBand title="Ekosistem Kuat, Dampak Nyata">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <article
            key={stat.value}
            className="flex min-h-28 items-center gap-4 rounded-2xl border border-[#dce8e0] bg-white px-5 py-4"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eaf8ee] text-[#009856]">
              <stat.icon className="size-7" />
            </span>
            <div className="min-w-0">
              <p
                className={cn(
                  "font-extrabold leading-tight text-[#009856]",
                  stat.value.length > 8 ? "text-lg" : "text-2xl",
                )}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold leading-5 text-[#111c33]">
                {stat.label}
              </p>
              {stat.note ? (
                <p className="mt-1 text-[11px] font-semibold text-[#7a8698]">
                  {stat.note}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </PageBand>
  );
}

function EcosystemCta() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-8 pt-3 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl overflow-hidden rounded-2xl border border-[#cfe7d8]  lg:grid-cols-[0.9fr_1.35fr] lg:items-center">
        <div className="relative min-h-64 overflow-hidden lg:min-h-72">
          <Image
            src="/landing/beranda/cta-students.png"
            alt="Siswa dan pendamping bergabung dalam ekosistem SyncVoca"
            width={1307}
            height={1004}
            loading="lazy"
            sizes="(max-width: 1024px) 95vw, 38vw"
            className="absolute inset-0 h-full w-full object-contain object-bottom"
          />
        </div>

        <div className="px-6 pb-8 text-center lg:px-8 lg:py-8 lg:text-left">
          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-[#007b45] sm:text-3xl">
            Bersama membangun masa depan ABK yang lebih mandiri dan bermakna
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#536178]">
            Mari jadi bagian dari ekosistem SyncVoca.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <a
              href="mailto:hello@syncvoca.id?subject=Bergabung%20Sebagai%20Mitra%20SyncVoca"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-5 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,152,86,0.18)] transition hover:bg-[#007b45]"
            >
              Bergabung Sebagai Mitra
              <ArrowRight className="size-4" />
            </a>
            <a
              href={demoPortalUrl}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d4e4da] bg-white px-5 text-sm font-extrabold text-[#111c33] transition hover:bg-[#f5fbf7]"
            >
              Masuk Portal Demo
              <PlayCircle className="size-4" />
            </a>
            <a
              href="mailto:hello@syncvoca.id"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#d4e4da] bg-white px-5 text-sm font-extrabold text-[#111c33] transition hover:bg-[#f5fbf7]"
            >
              Hubungi Tim SyncVoca
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageBand({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl rounded-2xl border border-[#dbe8df] bg-white px-5 py-7 shadow-[0_16px_42px_rgba(17,28,51,0.035)] sm:px-7">
        <SectionTitle title={title} />
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-center text-xl font-extrabold text-[#111c33] sm:text-2xl">
      {title}
    </h2>
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
        large ? "size-16" : "size-10",
        tones[tone].soft,
        tones[tone].icon,
        className,
      )}
    >
      <Icon className={large ? "size-8" : "size-5"} />
    </span>
  );
}
