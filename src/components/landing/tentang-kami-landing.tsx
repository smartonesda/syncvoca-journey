import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  Eye,
  Gamepad2,
  GraduationCap,
  Handshake,
  Heart,
  Leaf,
  Mail,
  Network,
  School,
  Send,
  ShieldCheck,
  Sprout,
  Target,
  UsersRound,
} from "lucide-react";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { cn } from "@/lib/utils";

const heroPillars = [
  { icon: Network, label: "Vokasi Inklusif" },
  { icon: ClipboardCheck, label: "Bukti Nyata" },
  { icon: GraduationCap, label: "Data Aman" },
  { icon: Handshake, label: "Kolaboratif" },
] satisfies AboutIconItem[];

const storyBullets = [
  "Potensi sering terlihat hanya dari cerita, bukan bukti.",
  "Sekolah butuh cara objektif untuk memantau dan mendampingi.",
  "Industri butuh bukti kompetensi yang relevan dan mudah dipahami.",
  "Data anak harus dilindungi, hanya dibagikan secukupnya.",
] as const;

const missionVisionCards = [
  {
    icon: Target,
    title: "Misi Kami",
    body: "Membantu ABK membangun bukti kerja yang aman, terukur, dan dapat dipahami oleh sekolah, keluarga, serta dunia industri.",
    highlights: ["aman", "terukur", "dapat dipahami"],
  },
  {
    icon: Eye,
    title: "Visi Kami",
    body: "Menjadi ekosistem vokasi inklusif yang membuka jalan menuju kemandirian ekonomi ABK.",
    highlights: ["vokasi inklusif", "menuju"],
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  highlights: string[];
}>;

const values = [
  {
    icon: UsersRound,
    title: "Inklusi",
    body: "Setiap anak berhak mendapat kesempatan yang setara.",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Data",
    body: "Data anak dilindungi dengan prinsip privacy by design.",
  },
  {
    icon: ClipboardCheck,
    title: "Bukti Nyata",
    body: "Keputusan didukung oleh bukti, bukan sekadar asumsi.",
  },
  {
    icon: Handshake,
    title: "Kolaborasi",
    body: "Bersama sekolah, keluarga, industri, dan komunitas.",
  },
  {
    icon: Accessibility,
    title: "Aksesibilitas",
    body: "Dirancang agar mudah diakses semua pengguna.",
  },
  {
    icon: Sprout,
    title: "Keberlanjutan",
    body: "Membangun dampak jangka panjang untuk generasi mendatang.",
  },
] satisfies AboutIconItem[];

const approachItems = [
  {
    icon: Network,
    title: "UDL",
    body: "Universal Design for Learning untuk pengalaman belajar yang inklusif.",
  },
  {
    icon: Target,
    title: "WCAG",
    body: "Standar aksesibilitas digital agar semua pengguna dapat mengakses dengan baik.",
  },
  {
    icon: Sprout,
    title: "ICF - WHO",
    body: "Berbasis kerangka fungsi dan partisipasi agar pendampingan lebih tepat sasaran.",
  },
  {
    icon: Gamepad2,
    title: "Gamifikasi Vokasi",
    body: "Belajar melalui simulasi interaktif yang seru dan bermakna.",
  },
  {
    icon: UsersRound,
    title: "Role-Based Access",
    body: "Setiap peran melihat data sesuai kebutuhan dan kewenangannya.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Wall",
    body: "Memisahkan data internal dan data publik untuk menjaga privasi anak.",
  },
] satisfies AboutIconItem[];

const ecosystemCards = [
  {
    image: "/landing/beranda/admin.png",
    title: "Tim Pengembang",
    body: "Membangun teknologi dengan hati dan fokus pada dampak nyata.",
  },
  {
    image: "/landing/beranda/guru.png",
    title: "Sekolah & Guru",
    body: "Mitra utama dalam pendampingan dan pengembangan siswa.",
  },
  {
    image: "/landing/beranda/ortu.png",
    title: "Pembimbing & Ahli",
    body: "PLB, psikolog, dan praktisi vokasi yang menjadi penasihat kami.",
  },
  {
    image: "/landing/beranda/dudi.png",
    title: "Mitra Industri (DUDI)",
    body: "Memberi kesempatan, validasi, dan membuka peluang kerja.",
  },
  {
    image: "/landing/beranda/cta-students.png",
    title: "Komunitas",
    body: "Orang tua, relawan, dan komunitas yang bergerak untuk inklusi.",
  },
] as const;

type AboutIconItem = {
  icon: LucideIcon;
  title?: string;
  label?: string;
  body?: string;
};

export function TentangKamiLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#101a35]">
      <LandingHeader activeLabel="Tentang Kami" />
      <AboutHero />
      <AboutStory />
      <MissionVision />
      <ValuesSection />
      <ApproachSection />
      <EcosystemSection />
      <CommitmentSection />
      <AboutCta />
      <LandingFooter />
    </main>
  );
}

function AboutHero() {
  return (
    <section className="border-b border-[#e8efe9] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 px-5 pb-10 pt-9 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-10 xl:px-10">
        <div className="relative z-10 min-w-0">
          <Kicker icon={Heart}>Tentang SyncVoca</Kicker>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-[#101a35] sm:text-5xl lg:text-[4rem] lg:leading-[1.08]">
            Kami percaya,
            <br />
            potensi ABK perlu diberi
            <br />
            ruang untuk <span className="text-[#009856]">terlihat.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-[#31405c]">
            SyncVoca hadir untuk membantu ABK membangun bukti kerja yang aman,
            terukur, dan dihargai dunia kerja.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {heroPillars.map((item) => (
              <div key={item.label} className="min-w-0 text-center">
                <IconBubble icon={item.icon} className="mx-auto" />
                <p className="mt-3 text-xs font-extrabold leading-5 text-[#14203b]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[330px] overflow-hidden lg:min-h-[500px]">
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] bottom-10 top-0 rounded-[42%] bg-[#eaf7ed]"
          />
          <Image
            src="/landing/beranda/cta-students.png"
            alt="Siswa dan pendamping SyncVoca menggunakan tablet"
            width={1307}
            height={1004}
            priority
            sizes="(max-width: 1024px) 92vw, 58vw"
            className="absolute bottom-0 right-[-5%] z-10 h-full w-[118%] max-w-none object-contain object-right-bottom lg:right-[-9%]"
          />
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 rounded-2xl border border-[#dbe8df] bg-white px-6 py-7 shadow-[0_18px_48px_rgba(17,28,51,0.04)] lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-9">
        <div>
          <h2 className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#101a35] sm:text-3xl">
            Cerita Awal SyncVoca
            <Leaf className="size-5 rotate-45 text-[#00a45d]" />
          </h2>
          <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-[#31405c]">
            Kami melihat banyak ABK memiliki potensi luar biasa, namun transisi
            dari sekolah ke dunia kerja masih penuh tantangan. Bukti kemampuan
            sering kali tidak terukur, tidak terdokumentasi, dan tidak sampai ke
            pihak yang tepat.
          </p>

          <ul className="mt-6 space-y-4">
            {storyBullets.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm font-semibold leading-6 text-[#20304f]"
              >
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[#009856] text-white">
                  <Check className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <BridgeVisual />
      </div>
    </section>
  );
}

function BridgeVisual() {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#fbfdfb_0%,#ffffff_58%,#eff8f2_100%)] px-5 pb-5 pt-4">
      <div className="absolute left-1/2 top-3 z-20 grid size-16 -translate-x-1/2 place-items-center rounded-full bg-[#009856] text-white shadow-[0_14px_32px_rgba(0,152,86,0.24)]">
        <BookOpen className="size-9" />
      </div>
      <div className="absolute right-6 top-8 z-20 grid size-14 place-items-center rounded-full bg-[#8557f6] text-white shadow-[0_14px_32px_rgba(133,87,246,0.22)]">
        <BriefcaseBusiness className="size-7" />
      </div>

      <div className="absolute bottom-20 left-8 h-24 w-36 rounded-t-3xl bg-[#0da35e]/90 shadow-[0_22px_44px_rgba(0,152,86,0.18)]">
        <div className="absolute left-5 top-5 grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="size-3 rounded-sm bg-white/45"
            />
          ))}
        </div>
        <School className="absolute bottom-4 left-1/2 size-12 -translate-x-1/2 text-white/85" />
      </div>
      <p className="absolute bottom-[4.7rem] left-12 z-20 text-xs font-extrabold uppercase tracking-normal text-white">
        Sekolah
      </p>

      <div className="absolute bottom-20 right-7 h-28 w-32 rounded-t-3xl bg-[#8067df]/80 shadow-[0_22px_44px_rgba(105,80,200,0.16)]">
        <div className="absolute bottom-0 left-4 h-24 w-5 rounded-t-lg bg-white/28" />
        <div className="absolute bottom-0 left-12 h-32 w-6 rounded-t-lg bg-white/22" />
        <div className="absolute bottom-0 right-4 h-20 w-5 rounded-t-lg bg-white/25" />
      </div>
      <p className="absolute bottom-[4.7rem] right-10 z-20 text-xs font-extrabold uppercase tracking-normal text-white">
        Dunia Kerja
      </p>

      <div className="absolute left-[24%] right-[22%] top-[42%] z-10 h-5 rounded-full bg-[#d5c5a7] shadow-[0_8px_18px_rgba(87,73,52,0.13)]" />
      <div className="absolute left-[25%] right-[23%] top-[35%] z-10 h-px bg-[#9b8c72]" />
      <div className="absolute left-[28%] top-[35%] z-10 h-20 w-1 bg-[#b6a684]" />
      <div className="absolute right-[26%] top-[35%] z-10 h-20 w-1 bg-[#b6a684]" />
      {Array.from({ length: 7 }).map((_, index) => (
        <span
          key={index}
          className="absolute top-[37%] z-10 h-12 w-px bg-[#b6a684]"
          style={{ left: `${33 + index * 5}%` }}
        />
      ))}

      <div className="absolute bottom-[4.8rem] left-1/2 z-20 -translate-x-1/2 text-center">
        <div className="mx-auto h-12 w-9 rounded-t-full bg-[#263449]" />
        <div className="mx-auto -mt-1 h-14 w-16 rounded-t-2xl bg-[#f7fbf8] shadow-[0_10px_24px_rgba(17,28,51,0.16)]" />
        <div className="mx-auto -mt-11 h-16 w-12 rounded-2xl bg-[#1f2b42]" />
      </div>
      <p className="absolute bottom-3 left-1/2 z-20 w-56 -translate-x-1/2 text-center text-sm font-extrabold leading-5 text-[#101a35]">
        Kita bangun jembatan yang aman, terukur, dan bermakna.
      </p>
    </div>
  );
}

function MissionVision() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-3 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-5 lg:grid-cols-2">
        {missionVisionCards.map((item) => (
          <article
            key={item.title}
            className="relative overflow-hidden rounded-2xl border border-[#dbe8df] bg-white px-6 py-7 shadow-[0_14px_36px_rgba(17,28,51,0.04)] sm:px-8"
          >
            <div className="flex gap-5">
              <IconBubble icon={item.icon} />
              <div className="max-w-xl">
                <h2 className="text-lg font-extrabold text-[#101a35]">
                  {item.title}
                </h2>
                <p className="mt-4 text-lg font-semibold leading-8 text-[#17233c]">
                  <HighlightedText
                    text={item.body}
                    highlights={item.highlights}
                  />
                </p>
              </div>
            </div>
            <Leaf className="absolute -bottom-3 right-8 size-28 -rotate-12 text-[#bfe6c8]/55" />
          </article>
        ))}
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-9 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl">
        <SectionHeading title="Nilai yang Kami Pegang" />

        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {values.map((item) => (
            <IconInfo key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-4 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl rounded-2xl border border-[#dbe8df] bg-white px-5 py-7 shadow-[0_14px_36px_rgba(17,28,51,0.04)] sm:px-8">
        <SectionHeading title="Pendekatan Produk Kami" />
        <p className="mt-2 text-center text-sm font-semibold text-[#516078]">
          Kami merancang SyncVoca dengan prinsip humanis dan berbasis standar
          global.
        </p>

        <div className="mt-7 grid divide-y divide-[#dbe8df] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3 xl:grid-cols-6">
          {approachItems.map((item) => (
            <div key={item.title} className="px-4 py-5 text-center">
              <item.icon className="mx-auto size-9 text-[#009856]" />
              <h3 className="mt-4 text-base font-extrabold text-[#101a35]">
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-44 text-sm font-semibold leading-6 text-[#3d4d67]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-9 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl">
        <SectionHeading title="Dibangun Bersama Ekosistem Pendidikan dan Industri" />
        <p className="mt-2 text-center text-sm font-semibold text-[#516078]">
          Kami tumbuh bersama banyak pihak yang memiliki tujuan yang sama.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ecosystemCards.map((card, index) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl border border-[#dbe8df] bg-white text-center shadow-[0_14px_32px_rgba(17,28,51,0.05)]"
            >
              <div className="relative h-36 overflow-hidden bg-[#f4faf6]">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={index === 4 ? 1307 : 500}
                  height={index === 4 ? 1004 : 472}
                  loading="lazy"
                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 30vw, 18vw"
                  className={cn(
                    "h-full w-full object-contain",
                    index === 4 && "scale-150 object-right-bottom",
                  )}
                />
              </div>
              <div className="px-4 py-5">
                <h3 className="text-base font-extrabold text-[#101a35]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#43516b]">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommitmentSection() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-6 pt-3 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-5 overflow-hidden rounded-2xl border border-[#dbe8df] bg-[linear-gradient(90deg,#f4fbf6_0%,#ffffff_48%,#f4fbf6_100%)] px-6 py-6 shadow-[0_14px_36px_rgba(17,28,51,0.04)] md:grid-cols-[auto_1fr_auto] md:items-center md:px-9">
        <div className="grid size-24 place-items-center rounded-full bg-[#e6f7ec] text-[#009856]">
          <ShieldCheck className="size-14" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#101a35]">
            Kami berkomitmen menjaga amanah yang diberikan.
          </h2>
          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-[#33435f]">
            Setiap data, setiap bukti, setiap langkah pendampingan, semuanya
            untuk satu tujuan: masa depan ABK yang lebih mandiri dan bermakna.
          </p>
        </div>
        <div className="relative hidden h-32 w-72 md:block">
          <Image
            src="/landing/beranda/cta-students.png"
            alt="Pelajar dan pendamping SyncVoca"
            width={1307}
            height={1004}
            loading="lazy"
            sizes="288px"
            className="absolute bottom-[-36px] right-[-44px] h-48 w-auto max-w-none object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function AboutCta() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 overflow-hidden rounded-2xl border border-[#dbe8df] bg-white px-6 py-7 shadow-[0_14px_36px_rgba(17,28,51,0.04)] lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div className="relative">
          <Leaf className="absolute -left-2 -top-3 size-24 -rotate-12 text-[#bfe6c8]/55" />
          <h2 className="relative max-w-2xl text-2xl font-extrabold leading-tight text-[#101a35] sm:text-3xl">
            Berjalan bersama menciptakan masa depan yang lebih inklusif dan
            bermakna.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[720px]">
          <Link
            href="/#cara-kerja"
            className="focus-ring inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#009856] px-6 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,152,86,0.18)] transition hover:bg-[#007b45]"
          >
            Lihat Cara Kerja
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="mailto:hello@syncvoca.id"
            className="focus-ring inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#b9dcc7] bg-white px-6 text-sm font-extrabold text-[#101a35] transition hover:bg-[#f4fbf6]"
          >
            Hubungi Kami
            <Mail className="size-4" />
          </a>
          <Link
            href="/login"
            className="focus-ring inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#b9dcc7] bg-white px-6 text-sm font-extrabold text-[#101a35] transition hover:bg-[#f4fbf6]"
          >
            Masuk Portal Demo
            <Send className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <Leaf className="size-5 rotate-45 text-[#00a45d]" />
      <h2 className="text-2xl font-extrabold leading-tight text-[#101a35] sm:text-3xl">
        {title}
      </h2>
      <Leaf className="size-5 -rotate-45 text-[#00a45d]" />
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

function IconBubble({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-full bg-[#eaf8ee] text-[#009856]",
        className,
      )}
    >
      <Icon className="size-7" />
    </span>
  );
}

function IconInfo({ item }: { item: AboutIconItem }) {
  const Icon = item.icon;

  return (
    <article className="text-center">
      <IconBubble icon={Icon} className="mx-auto size-20" />
      <h3 className="mt-4 text-base font-extrabold text-[#101a35]">
        {item.title}
      </h3>
      <p className="mx-auto mt-3 max-w-44 text-sm font-semibold leading-6 text-[#3d4d67]">
        {item.body}
      </p>
    </article>
  );
}

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const pattern = new RegExp(`(${highlights.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        highlights.some(
          (highlight) => highlight.toLowerCase() === part.toLowerCase(),
        ) ? (
          <span key={`${part}-${index}`} className="text-[#009856]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
