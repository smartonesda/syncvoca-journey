import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileCheck2,
  LockKeyhole,
  Medal,
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
  visual: "student" | "simulation" | "evidence" | "mentoring" | "portfolio";
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
    visual: "student",
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
    visual: "simulation",
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
    visual: "evidence",
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
    visual: "mentoring",
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
    visual: "portfolio",
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
    <section className="border-b border-[#e8efe9] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 px-5 pb-8 pt-8 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-10 xl:px-10">
        <div className="relative z-10 min-w-0">
          <Kicker icon={Sparkles}>Perjalanan Potensi Menjadi Bukti Kerja</Kicker>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-[#101a35] sm:text-5xl lg:text-[3.65rem] lg:leading-[1.08]">
            Dari Potensi Kecil Hari Ini
            <br />
            Menjadi <span className="text-[#009856]">Bukti Kerja.</span>
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
                  <span className="absolute -left-3 top-7 hidden h-px w-6 bg-[#00a45d] sm:block" />
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

        <div className="relative mx-auto mt-4 min-w-0 w-full max-w-2xl self-end lg:mx-0 lg:mt-0 lg:self-center lg:scale-[1.15] lg:translate-[-20px,0] 2xl:max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute inset-x-[9%] bottom-[8%] top-0 rounded-[42%] bg-[#eaf7ed]"
          />
          <Image
            src="/landing/beranda/hero-section.png"
            alt="Siswa SyncVoca belajar dengan tablet"
            width={1459}
            height={971}
            priority
            sizes="(max-width: 1024px) 92vw, 58vw"
            className="relative z-10 h-auto w-full object-contain"
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
          <span className="h-px w-5 bg-current" />
          <ArrowRight className="size-4" />
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
    <section className="bg-[#fbfdfb] px-5 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl">
        <SectionHeading title="Bagaimana SyncVoca Bekerja di Setiap Tahap" />

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {detailItems.slice(0, 3).map((item) => (
            <DetailCard key={item.title} item={item} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {detailItems.slice(3).map((item) => (
            <DetailCard key={item.title} item={item} large />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailCard({ item, large = false }: { item: DetailItem; large?: boolean }) {
  return (
    <article className="grid min-h-[320px] overflow-hidden rounded-2xl border border-[#dbe8df] bg-white shadow-[0_14px_34px_rgba(17,28,51,0.04)] md:grid-cols-[1fr_auto]">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full text-base font-extrabold text-white",
              toneClass[item.tone].bg,
            )}
          >
            {item.step}
          </span>
          <h3 className="text-lg font-extrabold leading-6 text-[#101a35]">
            {item.title}
          </h3>
        </div>

        <ul className="mt-6 space-y-3">
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-sm font-semibold leading-6 text-[#31405c]"
            >
              <span
                className={cn(
                  "mt-1 grid size-5 shrink-0 place-items-center rounded-full text-white",
                  toneClass[item.tone].bg,
                )}
              >
                <Check className="size-3.5" />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "relative min-h-44 w-full self-end overflow-hidden px-4 pb-4 md:w-52 lg:w-48",
          large && "md:w-72 lg:w-80",
        )}
      >
        <DetailVisual visual={item.visual} tone={item.tone} />
      </div>
    </article>
  );
}

function DetailVisual({
  visual,
  tone,
}: {
  visual: DetailItem["visual"];
  tone: Tone;
}) {
  if (visual === "student") {
    return (
      <Image
        src="/landing/beranda/murid.png"
        alt="Siswa mengenal potensi"
        width={367}
        height={424}
        loading="lazy"
        sizes="220px"
        className="absolute bottom-0 right-0 h-48 w-auto object-contain"
      />
    );
  }

  if (visual === "mentoring") {
    return (
      <Image
        src="/landing/tentang-kami/hero-section.png"
        alt="Guru dan orang tua mendampingi siswa"
        width={1593}
        height={987}
        loading="lazy"
        sizes="320px"
        className="absolute bottom-0 right-0 h-56 w-auto max-w-none object-contain"
      />
    );
  }

  if (visual === "portfolio") {
    return <PortfolioMiniCard />;
  }

  if (visual === "evidence") {
    return (
      <div className="absolute bottom-5 right-4 w-44 space-y-3">
        {[
          { icon: LockKeyhole, label: "Dokumen Tugas" },
          { icon: BriefcaseBusiness, label: "Foto / Video" },
          { icon: FileCheck2, label: "Refleksi Diri" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex min-h-12 items-center gap-3 rounded-xl border border-[#e2ebe5] bg-white px-3 shadow-[0_12px_28px_rgba(17,28,51,0.07)]"
          >
            <span
              className={cn(
                "grid size-8 place-items-center rounded-lg",
                toneClass[tone].soft,
              )}
            >
              <item.icon className={cn("size-4", toneClass[tone].text)} />
            </span>
            <span className="text-xs font-extrabold text-[#101a35]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return <SimulationMiniCard tone={tone} />;
}

function SimulationMiniCard({ tone }: { tone: Tone }) {
  return (
    <div className="absolute bottom-5 right-4 w-48 rounded-2xl border border-[#e2ebe5] bg-white p-4 shadow-[0_18px_40px_rgba(17,28,51,0.09)]">
      <p className="text-xs font-extrabold text-[#101a35]">
        Simulasi Administrasi
      </p>
      <p className="mt-1 text-xs font-semibold text-[#6b778b]">Perkantoran</p>
      <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-4">
        <div className="flex h-20 items-end gap-2">
          {[34, 56, 72, 48].map((height, index) => (
            <span
              key={index}
              className={cn("w-4 rounded-t-full", toneClass[tone].bg)}
              style={{ height: `${height}%`, opacity: 0.32 + index * 0.18 }}
            />
          ))}
        </div>
        <div className="grid size-16 place-items-center rounded-full border-[7px] border-[#dff4e8] text-sm font-extrabold text-[#009856]">
          92%
        </div>
      </div>
    </div>
  );
}

function PortfolioMiniCard() {
  return (
    <div className="absolute bottom-5 right-4 w-60 rounded-2xl border border-[#e2ebe5] bg-white p-4 shadow-[0_18px_40px_rgba(17,28,51,0.09)]">
      <div className="flex items-center gap-3">
        <Image
          src="/landing/beranda/murid.png"
          alt=""
          width={367}
          height={424}
          loading="lazy"
          sizes="44px"
          className="size-11 rounded-full bg-[#eaf8ee] object-cover object-top"
        />
        <div>
          <p className="text-sm font-extrabold text-[#101a35]">
            Rizky Pratama
          </p>
          <p className="text-xs font-semibold text-[#6b778b]">Siswa</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs font-semibold text-[#6b778b]">Journey Score</p>
          <p className="text-xl font-extrabold text-[#009856]">82</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Administrasi", "Data Entry", "Komunikasi"].map((item) => (
          <span
            key={item}
            className="rounded-full bg-[#f1f6f3] px-2 py-1 text-center text-[10px] font-extrabold text-[#31405c]"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-[#f7fbf8] p-3">
        <p className="text-xs font-extrabold text-[#101a35]">
          Evidence Terkumpul
        </p>
        <p className="mt-1 text-2xl font-extrabold text-[#2878f0]">48</p>
      </div>
    </div>
  );
}

function ValidationSection() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-5 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 overflow-hidden rounded-2xl border border-[#dbe8df] bg-white px-6 py-7 shadow-[0_14px_36px_rgba(17,28,51,0.04)] lg:grid-cols-[0.82fr_1fr_0.64fr] lg:items-center lg:px-8">
        <div className="relative min-h-56 overflow-hidden rounded-2xl bg-[#f4fbf6]">
          <Image
            src="/landing/tentang-kami/3.png"
            alt="Validasi industri SyncVoca"
            width={1772}
            height={888}
            loading="lazy"
            sizes="(max-width: 1024px) 90vw, 34vw"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-[#101a35] sm:text-3xl">
            Validasi Industri dengan Data Aman
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "DUDI melihat bukti kompetensi yang relevan.",
              "DUDI tidak melihat data sensitif siswa.",
              "Persetujuan diperlukan sebelum validasi dan placement.",
              "Hasil validasi berupa Industry Validation Seal.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm font-semibold leading-6 text-[#31405c]"
              >
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[#009856] text-white">
                  <Check className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex gap-3 text-sm font-extrabold text-[#31405c]">
            <LockKeyhole className="size-5 shrink-0 text-[#009856]" />
            Kami menjaga setiap data dengan standar keamanan tinggi.
          </p>
        </div>

        <div className="rounded-2xl border border-[#f1d8ad] bg-[#fff7eb] p-5">
          <div className="flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-2xl bg-[#f59a23] text-white">
              <ShieldCheck className="size-9" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-[#101a35]">
                Industry Validation Seal
              </h3>
              <p className="mt-1 text-sm font-semibold text-[#7a5a24]">
                Telah tervalidasi DUDI
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-[#31405c]">
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
              src="/landing/beranda/murid.png"
              alt="Contoh siswa SyncVoca"
              width={367}
              height={424}
              loading="lazy"
              sizes="224px"
              className="absolute inset-x-0 bottom-0 mx-auto h-60 w-auto object-contain"
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
                  <item.icon className={cn("size-5", toneClass[item.tone].text)} />
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
            Mulai lihat perjalanan ABK menuju masa depan yang lebih cerah.
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
