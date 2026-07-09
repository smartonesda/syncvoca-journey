import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  LockKeyhole,
  Medal,
  MoveRight,
  PlayCircle,
  Quote,
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

type Tone = "green" | "amber" | "blue" | "purple";

type StepItem = {
  icon: LucideIcon;
  title: string;
  body: string;
  label: string;
  tone: Tone;
};

type DetailItem = {
  step: number;
  title: string;
  bullets: string[];
  tone: Tone;
  visual: {
    src: string;
    alt: string;
    width: string;
    right: string;
    bottom: string;
    mobileHeight: string;
  };
};

const toneClass: Record<
  Tone,
  { text: string; bg: string; border: string; chip: string; soft: string }
> = {
  green: {
    text: "text-[#009856]",
    bg: "bg-[#009856]",
    border: "border-[#b9dcc7]",
    chip: "bg-[#e7f8ed] text-[#008a4a]",
    soft: "bg-[#eaf8ee]",
  },
  amber: {
    text: "text-[#f59a23]",
    bg: "bg-[#f59a23]",
    border: "border-[#f5d5a8]",
    chip: "bg-[#fff0dc] text-[#e47700]",
    soft: "bg-[#fff4e6]",
  },
  blue: {
    text: "text-[#2878f0]",
    bg: "bg-[#2878f0]",
    border: "border-[#b9d4ff]",
    chip: "bg-[#e9f2ff] text-[#276dd8]",
    soft: "bg-[#edf5ff]",
  },
  purple: {
    text: "text-[#8557f6]",
    bg: "bg-[#8557f6]",
    border: "border-[#d6c7ff]",
    chip: "bg-[#f1ebff] text-[#7651df]",
    soft: "bg-[#f5f0ff]",
  },
};

const journeySteps = [
  {
    icon: UserRound,
    title: "Mengenal Diri",
    body: "Mengenali potensi, minat, kebutuhan dukungan, dan batas data privat.",
    label: "Intake",
    tone: "green",
  },
  {
    icon: Target,
    title: "Eksplorasi Minat",
    body: "Belajar dan mencoba melalui simulasi adaptif sesuai minat.",
    label: "Simulasi",
    tone: "green",
  },
  {
    icon: BriefcaseBusiness,
    title: "Pra-Internship",
    body: "Aktivitas dan hasil simulasi dikumpulkan menjadi bukti kompetensi.",
    label: "Pendampingan",
    tone: "amber",
  },
  {
    icon: UsersRound,
    title: "Internship",
    body: "Pengalaman kerja nyata di lingkungan yang terkontrol dan aman.",
    label: "Portofolio",
    tone: "blue",
  },
  {
    icon: Medal,
    title: "Siap Kerja",
    body: "Portofolio siap dibaca DUDI, divalidasi industri, dan siap bekerja.",
    label: "Validasi",
    tone: "purple",
  },
] satisfies StepItem[];

const detailItems = [
  {
    step: 1,
    title: "Mengenal Potensi Siswa",
    bullets: [
      "Menggali minat dan kebutuhan awal.",
      "Memetakan skill awal yang dimiliki.",
      "Mengidentifikasi kebutuhan dukungan.",
      "Menentukan batas data yang privat.",
    ],
    tone: "green",
    visual: {
      src: "/landing/cara-kerja/1.png",
      alt: "Siswa mengenal potensi",
      width: "clamp(170px, 16vw, 230px)",
      right: "0px",
      bottom: "0px",
      mobileHeight: "190px",
    },
  },
  {
    step: 2,
    title: "Belajar Lewat Simulasi Adaptif",
    bullets: [
      "Siswa berlatih melalui tugas kerja kecil.",
      "Sistem mencatat skor, akurasi, waktu, dan konsistensi.",
      "Simulasi menyesuaikan tingkat kesulitan dengan kemampuan siswa.",
    ],
    tone: "green",
    visual: {
      src: "/landing/cara-kerja/2.png",
      alt: "Panel simulasi adaptif SyncVoca",
      width: "clamp(150px, 13vw, 195px)",
      right: "12px",
      bottom: "18px",
      mobileHeight: "170px",
    },
  },
  {
    step: 3,
    title: "Aktivitas Menjadi Bukti",
    bullets: [
      "Hasil simulasi disimpan otomatis.",
      "Dokumen tugas dikumpulkan.",
      "Foto / video jika ada.",
      "Refleksi siswa dan catatan pendamping tersimpan.",
    ],
    tone: "amber",
    visual: {
      src: "/landing/cara-kerja/3.png",
      alt: "Dokumen tugas, foto video, dan refleksi diri",
      width: "clamp(150px, 13vw, 190px)",
      right: "14px",
      bottom: "0px",
      mobileHeight: "190px",
    },
  },
  {
    step: 4,
    title: "Guru dan Orang Tua Mendampingi",
    bullets: [
      "Guru memantau progress siswa.",
      "Orang tua mendapatkan arahan dan latihan di rumah.",
      "Rencana latihan dibuat bersama.",
      "Catatan perkembangan tersimpan.",
    ],
    tone: "blue",
    visual: {
      src: "/landing/cara-kerja/4.png",
      alt: "Guru dan orang tua mendampingi siswa",
      width: "clamp(240px, 22vw, 330px)",
      right: "22px",
      bottom: "0px",
      mobileHeight: "170px",
    },
  },
  {
    step: 5,
    title: "Portofolio Siap Dibaca DUDI",
    bullets: [
      "Skill utama siswa dirangkum jelas.",
      "Journey score menunjukkan kemajuan.",
      "Evidence terverifikasi dan terstruktur.",
      "Siswa siap untuk internship atau kerja.",
    ],
    tone: "purple",
    visual: {
      src: "/landing/cara-kerja/5.png",
      alt: "Portofolio siswa siap dibaca DUDI",
      width: "clamp(230px, 22vw, 310px)",
      right: "24px",
      bottom: "18px",
      mobileHeight: "190px",
    },
  },
] satisfies DetailItem[];

const storyMilestones = [
  { icon: UserRound, label: "Minat Ditemukan", tone: "green" },
  { icon: Target, label: "Simulasi Adaptif", tone: "green" },
  { icon: BriefcaseBusiness, label: "Evidence Terkumpul", tone: "amber" },
  { icon: UsersRound, label: "Didampingi Guru & Orang Tua", tone: "blue" },
  { icon: Medal, label: "Portofolio Siap untuk DUDI", tone: "purple" },
] satisfies Array<{ icon: LucideIcon; label: string; tone: Tone }>;

export function CaraKerjaLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#101a35]">
      <LandingHeader activeLabel="Cara Kerja" />
      <HeroSection />
      <JourneyOverview />
      <WorkflowDetails />
      <ValidationSection />
      <StudentStory />
      <ClosingCta />
      <LandingFooter />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="  border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="sv-hero-grid mx-auto grid w-full max-w-screen-2xl gap-6 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-5 lg:pt-8 xl:px-10 2xl:gap-7 2xl:pb-0 2xl:pt-9">
        <div className="relative z-10 w-full min-w-0 max-w-3xl overflow-hidden">
          <Kicker icon={Sparkles}>
            Perjalanan Potensi Menjadi Bukti Kerja
          </Kicker>

          <h1 className="mt-6 max-w-full break-words text-3xl font-extrabold leading-tight tracking-normal text-[#111c33] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] 2xl:mt-7 2xl:text-5xl 2xl:leading-tight">
            Dari Potensi Kecil Hari Ini
            <br />
            Menjadi <span className="text-[#436757]">Bukti Kerja</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#31405c]">
            SyncVoca membantu siswa mengenal diri, belajar melalui simulasi,
            mengumpulkan bukti, didampingi guru dan orang tua, hingga
            portofolionya siap dibaca DUDI dengan aman.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {index > 0 ? (
                  <span className="absolute -left-5 top-7 hidden h-px w-6 bg-[#00a45d] sm:block" />
                ) : null}
                <span
                  className={cn(
                    "mx-auto grid size-16 place-items-center rounded-full border",
                    toneClass[step.tone].border,
                    toneClass[step.tone].soft,
                  )}
                >
                  <step.icon
                    className={cn("size-8", toneClass[step.tone].text)}
                  />
                </span>
                <p className="mt-3 text-xs font-extrabold leading-5 text-[#14203b]">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-8 mx-auto min-w-0 w-full max-w-2xl self-end lg:mx-0 lg:self-center 2xl:max-w-3xl scale-[1.1] lg:scale-[1.2] lg:translate-[-30px,0]">
          <Image
            src="/landing/cara-kerja/hero-section-2.png"
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

function JourneyOverview() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-7 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl rounded-2xl border border-[#dbe8df] bg-white px-5 py-7 shadow-[0_18px_48px_rgba(17,28,51,0.04)] sm:px-7">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-[#101a35] sm:text-3xl">
            Gambaran Perjalanan 5 Tahap
          </h2>
          <p className="mt-2 text-sm font-semibold text-[#516078]">
            Perjalanan terstruktur yang mengubah potensi menjadi peluang nyata.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {journeySteps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: StepItem; index: number }) {
  const Icon = step.icon;

  return (
    <article
      className={cn(
        "relative rounded-2xl border bg-white px-5 pb-6 pt-5 text-center shadow-[0_12px_28px_rgba(17,28,51,0.04)]",
        toneClass[step.tone].border,
      )}
    >
      {index < journeySteps.length - 1 ? (
        <span className="absolute left-full top-1/2 z-10 hidden -translate-x-2 items-center text-[#00a45d] xl:flex">
          <MoveRight className="size-10  " />
        </span>
      ) : null}
      <span
        className={cn(
          "absolute left-4 top-4 grid size-9 place-items-center rounded-full border-2 bg-white text-sm font-extrabold",
          toneClass[step.tone].border,
          toneClass[step.tone].text,
        )}
      >
        {index + 1}
      </span>
      <span
        className={cn(
          "mx-auto mt-5 grid size-20 place-items-center rounded-full",
          toneClass[step.tone].soft,
        )}
      >
        <Icon className={cn("size-10", toneClass[step.tone].text)} />
      </span>
      <h3 className="mt-5 text-lg font-extrabold text-[#101a35]">
        {step.title}
      </h3>
      <p className="mx-auto mt-3 max-w-52 text-sm font-semibold leading-6 text-[#43516b]">
        {step.body}
      </p>
      <span
        className={cn(
          "mt-5 inline-flex min-h-8 items-center rounded-full px-4 text-xs font-extrabold",
          toneClass[step.tone].chip,
        )}
      >
        {step.label}
      </span>
    </article>
  );
}

function WorkflowDetails() {
  return (
    <section id="workflow-details" className="bg-[#fbfdfb] px-5 py-5 sm:px-8">
      <div className="mx-auto w-full max-w-[1320px]">
        <SectionHeading title="Bagaimana SyncVoca Bekerja di Setiap Tahap" />

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {detailItems.slice(0, 3).map((item) => (
            <DetailCard key={item.title} item={item} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {detailItems.slice(3).map((item) => (
            <DetailCard key={item.title} item={item} large />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  item,
  large = false,
}: {
  item: DetailItem;
  large?: boolean;
}) {
  return (
    <article
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-[#dbe8df] bg-white px-5 pb-5 pt-5 shadow-[0_14px_34px_rgba(17,28,51,0.04)] lg:min-h-[252px]",
        large ? "lg:min-h-[252px]" : "lg:min-h-[252px]",
      )}
    >
      <div
        className={cn(
          "relative z-10 max-w-none",
          large ? "lg:max-w-[48%]" : "lg:max-w-[56%]",
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white",
              toneClass[item.tone].bg,
            )}
          >
            {item.step}
          </span>
          <h3 className="pt-0.5 text-[15px] font-extrabold leading-tight text-[#101a35]">
            {item.title}
          </h3>
        </div>

        <div
          className="relative mt-4 overflow-hidden rounded-xl bg-[#fbfdfb] lg:hidden"
          style={{ height: item.visual.mobileHeight }}
        >
          <Image
            src={item.visual.src}
            alt={item.visual.alt}
            width={900}
            height={700}
            loading="lazy"
            sizes="(max-width: 1024px) 82vw"
            className="h-full w-full object-contain object-bottom"
          />
        </div>

        <ul className="mt-6 space-y-3">
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-[11px] font-semibold leading-[1.65] text-[#31405c]"
            >
              <span
                className={cn(
                  "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full text-white",
                  toneClass[item.tone].bg,
                )}
              >
                <Check className="size-3" />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <Image
        src={item.visual.src}
        alt={item.visual.alt}
        width={900}
        height={700}
        loading="lazy"
        sizes={
          large
            ? "(max-width: 1024px) 52vw, 34vw"
            : "(max-width: 1024px) 58vw, 22vw"
        }
        className="pointer-events-none absolute z-0 hidden h-auto max-w-none select-none object-contain lg:block"
        style={{
          width: item.visual.width,
          right: item.visual.right,
          bottom: item.visual.bottom,
        }}
      />
    </article>
  );
}

function ValidationSection() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-5 pt-0 sm:px-8">
      <div className="mx-auto grid min-h-[230px] w-full max-w-[1320px] gap-5 overflow-hidden rounded-2xl border border-[#dbe8df] bg-white px-5 py-5 shadow-[0_14px_36px_rgba(17,28,51,0.04)] lg:grid-cols-[0.88fr_1fr_0.7fr] lg:items-center">
        <div className="relative min-h-48 overflow-hidden bg-white">
          <Image
            src="/landing/cara-kerja/6.png"
            alt="Validasi industri SyncVoca"
            width={1509}
            height={1042}
            loading="lazy"
            sizes="(max-width: 1024px) 90vw, 34vw"
            className="absolute bottom-[-10px] left-[-18px] h-[220px] w-auto max-w-none object-contain"
          />
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-[#101a35]">
            Validasi Industri dengan Data Aman
          </h2>
          <ul className="mt-5 space-y-2.5">
            {[
              "DUDI melihat bukti kompetensi yang relevan.",
              "DUDI tidak melihat data sensitif siswa.",
              "Persetujuan diperlukan sebelum validasi dan placement.",
              "Hasil validasi berupa Industry Validation Seal.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[11px] font-semibold leading-[1.6] text-[#31405c]"
              >
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#009856] text-white">
                  <Check className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex gap-2 text-[11px] font-extrabold text-[#31405c]">
            <LockKeyhole className="size-4 shrink-0 text-[#009856]" />
            Kami menjaga setiap data dengan standar keamanan tinggi.
          </p>
        </div>

        <div className="rounded-2xl border border-[#f1d8ad] bg-[#fff7eb] p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-[#f59a23] text-white">
              <ShieldCheck className="size-7" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-[#101a35]">
                Industry Validation Seal
              </h3>
              <p className="mt-1 text-xs font-semibold text-[#7a5a24]">
                Telah tervalidasi DUDI
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-white px-4 py-3 text-xs font-extrabold text-[#31405c]">
            Tanggal: 20 Mei 2025
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentStory() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-7 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl">
        <SectionHeading title="Contoh Cerita Siswa" />

        <div className="mt-7 grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="relative mx-auto size-56 overflow-hidden rounded-full border border-[#dbe8df] bg-[#eaf8ee] shadow-[0_18px_40px_rgba(17,28,51,0.08)]">
            <Image
              src="/landing/cara-kerja/7.png"
              alt="Contoh siswa SyncVoca"
              width={1254}
              height={1254}
              loading="lazy"
              sizes="224px"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="rounded-2xl border border-[#dbe8df] bg-white p-6 shadow-[0_14px_34px_rgba(17,28,51,0.04)] sm:p-8">
              <Quote className="size-10 text-[#009856]" />
              <p className="mt-4 text-base font-semibold leading-8 text-[#31405c]">
                Rizky mulai dari minat administrasi. Ia mencoba simulasi data
                entry, lalu hasilnya masuk ke evidence stack. Guru memberi
                rencana latihan, orang tua melihat perkembangan, dan portofolio
                Rizky siap dibaca DUDI tanpa membuka data sensitif.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {storyMilestones.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#dbe8df] bg-white px-3 text-center shadow-[0_10px_24px_rgba(17,28,51,0.035)]"
                >
                  <item.icon
                    className={cn("size-5", toneClass[item.tone].text)}
                  />
                  <span className="text-xs font-extrabold text-[#31405c]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-8 pt-4 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 overflow-hidden rounded-2xl border border-[#dbe8df] bg-[linear-gradient(90deg,#f4fbf6_0%,#ffffff_54%,#f4fbf6_100%)] px-6 py-8 shadow-[0_14px_36px_rgba(17,28,51,0.04)] lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
        <div>
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-[#006b3f] sm:text-4xl">
            Mulai lihat perjalanan ABK & Disabilitas menuju masa depan yang
            lebih cerah
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#42506a]">
            Masuk ke portal demo dan temukan bagaimana SyncVoca bekerja untuk
            mereka.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <a
              href={demoPortalUrl}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-7 text-sm font-extrabold text-white shadow-[0_15px_28px_rgba(0,152,86,0.18)] hover:bg-[#007b45]"
            >
              Masuk Portal Demo
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/#bukti-kerja"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#b9dcc7] bg-white px-7 text-sm font-extrabold text-[#111c33] hover:bg-[#f7fbf8]"
            >
              Lihat Bukti Kerja
              <PlayCircle className="size-5" />
            </Link>
          </div>
        </div>

        <div className="relative hidden h-56 w-[360px] lg:block">
          <Image
            src="/landing/beranda/footer.png"
            alt="Panel validasi SyncVoca"
            width={1091}
            height={617}
            loading="lazy"
            sizes="360px"
            className="absolute bottom-[-18px] right-[-22px] h-64 w-auto max-w-none object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <ArrowRight className="size-5 text-[#00a45d]" />
      <h2 className="text-2xl font-extrabold leading-tight text-[#101a35] sm:text-3xl">
        {title}
      </h2>
      <ArrowRight className="size-5 rotate-180 text-[#00a45d]" />
    </div>
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
    <span className="inline-flex min-h-8 items-center gap-2 rounded-full bg-[#eaf8ee] px-4 text-sm font-extrabold text-[#008a4a]">
      <Icon className="size-4" />
      {children}
    </span>
  );
}
