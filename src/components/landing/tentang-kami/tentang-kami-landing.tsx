import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowRight,
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
  Send,
  ShieldCheck,
  Sprout,
  Target,
  UsersRound,
} from "lucide-react";
import { LandingFooter } from "@/components/landing/shared/landing-footer";
import { LandingHeader } from "@/components/landing/shared/landing-header";
import { demoPortalUrl } from "@/lib/external-links";
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
    image: "/landing/tentang-kami/3.png",
    title: "Tim Pengembang",
    body: "Membangun teknologi dengan hati dan fokus pada dampak nyata.",
  },
  {
    image: "/landing/tentang-kami/4.png",
    title: "Sekolah & Guru",
    body: "Mitra utama dalam pendampingan dan pengembangan siswa.",
  },
  {
    image: "/landing/tentang-kami/7.png",
    title: "Pembimbing & Ahli",
    body: "PLB, psikolog, dan praktisi vokasi yang menjadi penasihat kami.",
  },
  {
    image: "/landing/tentang-kami/8.png",
    title: "Mitra Industri (DUDI)",
    body: "Memberi kesempatan, validasi, dan membuka peluang kerja.",
  },
  {
    image: "/landing/tentang-kami/6.png",
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
    <section className=" pt-0 lg:pt-10 border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 px-5 pb-10 pt-9 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-10 xl:px-10">
        <div className="relative z-10 min-w-0">
          <Kicker icon={Heart}>Tentang SyncVoca</Kicker>

          <h1 className="mt-6 max-w-full break-words text-3xl font-extrabold leading-tight tracking-normal text-[#111c33] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15] 2xl:mt-7 2xl:text-5xl 2xl:leading-tight">
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

        <div className="relative mx-auto mt-8 min-w-0 w-full max-w-2xl self-end lg:mx-0 lg:mt-0 lg:self-center lg:scale-[1.2] lg:translate-[-30px,0] 2xl:max-w-3xl">
          <Image
            src="/landing/tentang-kami/hero-section-2.png"
            alt="Siswa dan pendamping SyncVoca menggunakan tablet"
            width={1593}
            height={987}
            priority
            sizes="(max-width: 1024px) 92vw, 58vw"
            className="relative z-10 h-auto w-full  object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  return (
    <section className="bg-[#fbfdfb] px-5 py-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 rounded-2xl border border-[#dbe8df] bg-white px-6 py-7 shadow-[0_18px_48px_rgba(17,28,51,0.04)]  lg:grid-cols-[1.18fr_0.82fr] lg:px-10 lg:py-9">
        <div className="order-2 lg:order-1 relative mx-auto min-w-0 w-full max-w-2xl self-center lg:scale-[1.08] lg:translate-x-[-10px] 2xl:max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] bottom-[8%] top-0 rounded-[42%]"
          />
          <Image
            src="/landing/tentang-kami/2.png"
            alt="Siswa dan pendamping SyncVoca menggunakan tablet"
            width={1672}
            height={941}
            priority
            sizes="(max-width: 1024px) 92vw, 58vw"
            className="relative z-10 h-auto w-full object-contain"
          />
        </div>
        <div className="order-1 lg:order-2">
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
      </div>
    </section>
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
            <div className="flex sm:flex-row flex-col items-center sm:items-start sm:text-left text-center gap-5">
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
          {ecosystemCards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl border border-[#dbe8df] bg-white text-center shadow-[0_14px_32px_rgba(17,28,51,0.05)]"
            >
              <div className="relative min-h-36 max-h-56 overflow-hidden bg-[#f4faf6]">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={500}
                  height={472}
                  loading="lazy"
                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 30vw, 18vw"
                  className="h-full w-full object-cover object-center"
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
      <div className="mx-auto grid w-full max-w-screen-2xl gap-5 overflow-hidden rounded-2xl border border-[#dbe8df]  px-6 py-6 shadow-[0_14px_36px_rgba(17,28,51,0.04)] md:grid-cols-[auto_1fr_auto] md:items-center md:px-9">
        <div className="ml-auto mr-auto grid size-24 place-items-center rounded-full bg-[#e6f7ec] text-[#009856]">
          <ShieldCheck className="size-14" />
        </div>
        <div className="md:text-left text-center">
          <h2 className="text-2xl  font-extrabold text-[#101a35]">
            Kami berkomitmen menjaga amanah yang diberikan.
          </h2>
          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-[#33435f]">
            Setiap data, setiap bukti, setiap langkah pendampingan, semuanya
            untuk satu tujuan: masa depan ABK yang lebih mandiri dan bermakna.
          </p>
        </div>
        <div className="relative  md:w-120 w-full full block">
          <Image
            src="/landing/tentang-kami/1.png"
            alt="Pelajar dan pendamping SyncVoca"
            width={1307}
            height={1004}
            loading="lazy"
            sizes="288px"
            className=""
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
            href={"/cara-kerja" as Route}
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
          <a
            href={demoPortalUrl}
            className="focus-ring inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#b9dcc7] bg-white px-6 text-sm font-extrabold text-[#101a35] transition hover:bg-[#f4fbf6]"
          >
            Masuk Portal Demo
            <Send className="size-4" />
          </a>
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
