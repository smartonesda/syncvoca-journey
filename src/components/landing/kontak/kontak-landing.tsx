"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Camera,
  CheckCircle2,
  ChevronDown,
  Handshake,
  Headphones,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MonitorPlay,
  Phone,
  Play,
  Send,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { LandingFooter } from "@/components/landing/shared/landing-footer";
import { LandingHeader } from "@/components/landing/shared/landing-header";
import { demoPortalUrl } from "@/lib/external-links";
import { cn } from "@/lib/utils";

type Tone = "green" | "blue" | "purple" | "amber";

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
    text: "text-[#8557e8]",
    soft: "bg-[#f2edff]",
    border: "border-[#dfd7f6]",
  },
  amber: {
    text: "text-[#f39a1f]",
    soft: "bg-[#fff3e2]",
    border: "border-[#f2ddbf]",
  },
};

const needs = [
  {
    value: "sekolah",
    icon: Building2,
    title: "Saya dari Sekolah",
    body: "Ingin menggunakan SyncVoca di sekolah inklusi atau SLB.",
    tone: "green",
  },
  {
    value: "dudi",
    icon: BriefcaseBusiness,
    title: "Saya dari DUDI",
    body: "Ingin mencari talenta berbasis bukti dan berkolaborasi.",
    tone: "blue",
  },
  {
    value: "orang-tua",
    icon: UsersRound,
    title: "Saya Orang Tua / Wali",
    body: "Ingin memahami perkembangan dan mendukung anak.",
    tone: "purple",
  },
  {
    value: "mitra",
    icon: Handshake,
    title: "Saya Ingin Menjadi Mitra",
    body: "Ingin berkolaborasi untuk mendukung ekosistem vokasi inklusif.",
    tone: "amber",
  },
  {
    value: "demo",
    icon: MonitorPlay,
    title: "Saya Ingin Tahu Demo",
    body: "Ingin melihat demo SyncVoca terlebih dahulu.",
    tone: "green",
  },
] satisfies Array<{
  value: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}>;

const faqItems = [
  {
    question: "Apakah SyncVoca untuk sekolah inklusi dan SLB?",
    answer:
      "Ya. SyncVoca dirancang untuk membantu sekolah inklusi, SLB, SMK, dan lembaga pendamping mengelola perjalanan vokasi siswa secara bertahap.",
  },
  {
    question: "Apakah bisa mencoba demo dulu?",
    answer:
      "Bisa. Portal demo menyediakan beberapa pilihan peran agar Anda dapat memahami pengalaman siswa, guru, orang tua, DUDI, dan admin.",
  },
  {
    question: "Apakah data anak aman?",
    answer:
      "Data sensitif dilindungi melalui privacy wall, consent, role-based access, dan audit trail. DUDI hanya melihat data publik yang relevan.",
  },
  {
    question: "Apakah bisa menjadi mitra industri?",
    answer:
      "Bisa. Mitra industri dapat berkolaborasi dalam validasi kompetensi, modul vokasi, peluang internship, dan placement yang inklusif.",
  },
  {
    question: "Apakah DUDI bisa melihat data pribadi siswa?",
    answer:
      "Tidak. DUDI tidak mendapat akses ke identitas lengkap, catatan medis, kontak wali, dan catatan pendampingan internal siswa.",
  },
] as const;

export function KontakLanding() {
  const [selectedNeed, setSelectedNeed] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfdfb] text-[#101a35]">
      <LandingHeader activeLabel="Kontak" />
      <ContactHero />
      <NeedSelector
        selectedNeed={selectedNeed}
        onSelect={(value) => {
          setSelectedNeed(value);
          setIsSubmitted(false);
        }}
      />
      <ContactContent
        selectedNeed={selectedNeed}
        isSubmitted={isSubmitted}
        onNeedChange={(value) => {
          setSelectedNeed(value);
          setIsSubmitted(false);
        }}
        onSubmit={handleSubmit}
      />
      <FaqSection />
      <ExploreSection />
      <LandingFooter />
    </main>
  );
}

function ContactHero() {
  return (
    <section className="mb-15 border-[#e9f0eb] bg-[radial-gradient(circle_at_82%_20%,rgba(219,244,225,0.7),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)]">
      <div className="sv-hero-grid mx-auto grid w-full max-w-screen-2xl gap-6 px-5 pb-7 pt-7 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-5 lg:pt-8 xl:px-10 2xl:gap-7 2xl:pb-0 2xl:pt-9">
        <div className="relative z-10 w-full min-w-0 max-w-3xl overflow-hidden">
          <Kicker icon={ShieldCheck}>Siap Berkolaborasi Bersama Anda</Kicker>
          <h1 className="mt-6 max-w-[680px] text-3xl font-extrabold leading-[1.14] text-[#111c33] sm:text-4xl lg:text-[2.7rem] xl:text-[3.15rem] 2xl:text-[3.5rem]">
            Mari Bangun
            <br />
            Perjalanan Vokasi
            <br />
            <span className="text-[#009856]">Yang Lebih Inklusif</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm font-semibold leading-7 text-[#3d4d67] sm:text-base sm:leading-8">
            SyncVoca terbuka untuk sekolah, keluarga, DUDI, komunitas, dan mitra
            yang ingin membantu ABK mengenal potensi, mengasah kemampuan, dan
            menyiapkan masa depan yang lebih mandiri.
          </p>
        </div>

        <div className="relative mt-8 mx-auto min-w-0 w-full max-w-2xl self-end lg:mx-0 lg:self-center 2xl:max-w-3xl scale-[1.1] lg:scale-[1.2] lg:translate-[-30px,0]">
          <Image
            src="/landing/kontak/hero-section.png"
            alt="Kolaborator SyncVoca"
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

function NeedSelector({
  selectedNeed,
  onSelect,
}: {
  selectedNeed: string;
  onSelect: (value: string) => void;
}) {
  const selectedOption = needs.find((need) => need.value === selectedNeed);

  return (
    <PageBand
      title="1. Pilih Kebutuhan Anda"
      subtitle="Pilih kebutuhan Anda agar kami dapat menyiapkan informasi yang paling tepat."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {needs.map((need) => {
          const active = need.value === selectedNeed;
          return (
            <button
              key={need.value}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(need.value)}
              className={cn(
                "focus-ring flex min-h-60 flex-col items-center rounded-2xl border bg-white px-5 py-6 text-center transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(17,28,51,0.08)]",
                active
                  ? `${toneClasses[need.tone].border} shadow-[0_14px_30px_rgba(17,28,51,0.07)]`
                  : "border-[#dce8e0]",
              )}
            >
              <IconBubble icon={need.icon} tone={need.tone} />
              <h3 className="mt-5 text-base font-extrabold leading-6 text-[#111c33]">
                {need.title}
              </h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#536178]">
                {need.body}
              </p>
              {active ? (
                <CheckCircle2
                  className={cn("mt-auto size-5", toneClasses[need.tone].text)}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className={cn(
          "mt-5 flex flex-col items-start justify-between gap-4 rounded-xl border px-5 py-4 sm:flex-row sm:items-center",
          selectedOption
            ? "border-[#bfe3ce] bg-[#eff9f3]"
            : "border-[#dce8e0] bg-[#f8fbf9]",
        )}
      >
        {selectedOption ? (
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-[#009856]" />
            <div>
              <p className="text-sm font-extrabold text-[#176a45]">
                Pilihan Anda: {selectedOption.title}
              </p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#607267]">
                Pilihan ini otomatis mengisi field Kebutuhan Anda pada form.
                Data kontak dan informasi lainnya tetap Anda isi sendiri.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 size-6 shrink-0 text-[#009856]" />
            <div>
              <p className="text-sm font-extrabold text-[#263550]">
                Belum yakin memilih kebutuhan?
              </p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#647188]">
                Tidak masalah. Kartu ini bersifat opsional. Anda tetap bisa
                lanjut dan memilih kebutuhan langsung di dalam form.
              </p>
            </div>
          </div>
        )}

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
          {selectedOption ? (
            <button
              type="button"
              onClick={() => onSelect("")}
              className="focus-ring inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-xs font-extrabold text-[#526278] transition hover:bg-white"
            >
              Hapus Pilihan
            </button>
          ) : null}
          <a
            href="#form-kontak"
            className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#009856] px-5 text-xs font-extrabold text-white shadow-[0_10px_22px_rgba(0,152,86,0.16)] transition hover:bg-[#007b45]"
          >
            Lanjut Isi Form
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </PageBand>
  );
}

function ContactContent({
  selectedNeed,
  isSubmitted,
  onNeedChange,
  onSubmit,
}: {
  selectedNeed: string;
  isSubmitted: boolean;
  onNeedChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const selectedOption = needs.find((need) => need.value === selectedNeed);
  const messagePlaceholder = selectedOption
    ? `Ceritakan kebutuhan Anda terkait "${selectedOption.title}"...`
    : "Ceritakan kebutuhan Anda atau hal yang ingin ditanyakan...";

  return (
    <section className="bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <article
          id="form-kontak"
          className="scroll-mt-28 rounded-2xl border border-[#dbe8df] bg-white p-5 shadow-[0_16px_42px_rgba(17,28,51,0.035)] sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-[#111c33] sm:text-2xl">
            2. Form Kontak
          </h2>
          <p className="mt-2 text-sm font-semibold text-[#647188]">
            Isi form berikut, tim kami akan menghubungi Anda secepatnya.
          </p>
          <div
            className={cn(
              "mt-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-xs font-semibold leading-5",
              selectedOption
                ? "border-[#cfe7d8] bg-[#eff9f3] text-[#35654d]"
                : "border-[#e0e8e3] bg-[#f8fbf9] text-[#647188]",
            )}
          >
            {selectedOption ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#009856]" />
            ) : (
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-[#009856]" />
            )}
            <p>
              {selectedOption
                ? `Kebutuhan terpilih: ${selectedOption.title}. Anda masih dapat mengubahnya melalui dropdown di bawah.`
                : "Belum ada kebutuhan yang dipilih. Pilih melalui dropdown Kebutuhan Anda sebelum mengirim form."}
            </p>
          </div>
          <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
            <Field label="Nama Lengkap">
              <input
                required
                name="name"
                placeholder="Contoh: Budi Santoso"
                className={inputClass}
              />
            </Field>
            <Field label="Email / WhatsApp">
              <input
                required
                name="contact"
                placeholder="Contoh: budi@mail.com / 0812-3456-7890"
                className={inputClass}
              />
            </Field>
            <Field label="Instansi / Organisasi" className="sm:col-span-2">
              <input
                required
                name="organization"
                placeholder="Contoh: SLB Negeri 1 Sidoarjo"
                className={inputClass}
              />
            </Field>
            <Field label="Peran Anda" className="sm:col-span-2">
              <select
                required
                name="role"
                className={inputClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih peran Anda
                </option>
                <option>Kepala Sekolah</option>
                <option>Guru / Pendamping</option>
                <option>HRD / Mitra Industri</option>
                <option>Orang Tua / Wali</option>
                <option>Komunitas / Lembaga</option>
                <option>Lainnya</option>
              </select>
            </Field>
            <Field label="Kebutuhan Anda" className="sm:col-span-2">
              <select
                required
                name="need"
                className={inputClass}
                value={selectedNeed}
                onChange={(event) => onNeedChange(event.target.value)}
              >
                <option value="" disabled>
                  Pilih kebutuhan utama Anda
                </option>
                {needs.map((need) => (
                  <option key={need.value} value={need.value}>
                    {need.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Pesan" className="sm:col-span-2">
              <textarea
                required
                name="message"
                rows={5}
                placeholder={messagePlaceholder}
                className={cn(inputClass, "resize-y py-3")}
              />
            </Field>
            <button
              type="submit"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009856] px-6 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,152,86,0.18)] transition hover:bg-[#007b45] sm:col-span-2"
            >
              <Send className="size-4" />
              Kirim Pesan
            </button>
            {isSubmitted ? (
              <div
                role="status"
                className="flex items-center gap-3 rounded-xl border border-[#cfe7d8] bg-[#eff9f3] px-4 py-3 text-sm font-extrabold text-[#26724d] sm:col-span-2"
              >
                <CheckCircle2 className="size-5" />
                Pesan demo sudah dicatat. Integrasi pengiriman akan dihubungkan
                saat backend tersedia.
              </div>
            ) : null}
          </form>
        </article>

        <ContactInformation />
      </div>
    </section>
  );
}

function ContactInformation() {
  return (
    <aside className="rounded-2xl border border-[#dbe8df] bg-white p-5 shadow-[0_16px_42px_rgba(17,28,51,0.035)] sm:p-7">
      <h2 className="text-xl font-extrabold text-[#111c33] sm:text-2xl">
        3. Informasi Kontak
      </h2>
      <p className="mt-2 text-sm font-semibold text-[#647188]">
        Anda juga dapat menghubungi kami melalui saluran berikut.
      </p>
      <div className="mt-7 space-y-5">
        <ContactLine
          icon={Mail}
          label="Email"
          value="hello@syncvoca.id"
          href="mailto:hello@syncvoca.id"
        />
        <ContactLine
          icon={Phone}
          label="Telepon / WhatsApp"
          value="+62 21 1234 5678"
          href="https://wa.me/622112345678"
        />
        <ContactLine
          icon={MapPin}
          label="Alamat"
          value={
            <>
              Jl. Pendidikan No.1
              <br />
              Jakarta, Indonesia
            </>
          }
        />
      </div>
      <div className="mt-7 border-t border-[#e2ebe5] pt-6">
        <p className="text-sm font-extrabold text-[#111c33]">Ikuti Kami</p>
        <div className="mt-4 flex items-center gap-3">
          {[Camera, Link2, Play, MessageCircle].map((Icon, index) => (
            <a
              key={index}
              href="#"
              aria-label="Media sosial SyncVoca"
              className="grid size-10 place-items-center rounded-full bg-[#f3f6f4] text-[#111c33] transition hover:bg-[#e7f7ed] hover:text-[#009856]"
            >
              <Icon className="size-5" />
            </a>
          ))}
          <span className="ml-2 text-xs font-bold text-[#647188]">
            @syncvoca.id
          </span>
        </div>
      </div>
      <div className="mt-7 grid min-h-48 grid-cols-[120px_1fr] items-end overflow-hidden rounded-2xl border border-[#cfe7d8] bg-[#f1faf4] px-4 pt-5">
        <div className="relative h-full">
          <Image
            src="/voci/full-body.png"
            alt="Voci siap membantu"
            width={1024}
            height={1024}
            loading="lazy"
            sizes="120px"
            className="absolute bottom-0 left-1/2 h-40 w-auto -translate-x-1/2 object-contain"
          />
        </div>
        <blockquote className="self-center pb-5 text-sm font-semibold leading-7 text-[#34445f]">
          Kami siap membantu menjawab pertanyaan Anda dan mendukung perjalanan
          vokasi inklusif anak bangsa.
          <span className="mt-2 block font-extrabold">- Voci</span>
        </blockquote>
      </div>
    </aside>
  );
}

function FaqSection() {
  return (
    <PageBand
      id="faq"
      title="4. FAQ Singkat"
      subtitle="Jawaban cepat untuk pertanyaan yang sering diajukan."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-[#dce8e0] bg-white px-4 py-1"
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold text-[#111c33] [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown className="size-5 shrink-0 transition group-open:rotate-180" />
            </summary>
            <p className="border-t border-[#edf2ef] pb-4 pt-3 text-sm font-semibold leading-7 text-[#536178]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
      <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#cfe7d8] bg-[#eff9f3] px-5 py-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <Headphones className="size-9 text-[#009856]" />
          <div>
            <p className="text-sm font-extrabold text-[#008a4a]">
              Masih ada pertanyaan?
            </p>
            <p className="mt-1 text-xs font-semibold text-[#647188]">
              Tim kami siap membantu Anda menemukan solusi terbaik.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/622112345678"
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-3 rounded-xl border border-[#d6e4dc] bg-white px-6 text-sm font-extrabold text-[#111c33]"
        >
          Hubungi Kami Langsung
          <MessageCircle className="size-5 text-[#009856]" />
        </a>
      </div>
    </PageBand>
  );
}

function ExploreSection() {
  return (
    <section className="bg-[#fbfdfb] px-5 pb-8 pt-2 sm:px-8">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-5 rounded-2xl border border-[#cfe7d8] bg-[linear-gradient(100deg,#f4fbf6_0%,#ffffff_55%,#f4fbf6_100%)] px-6 py-6 lg:grid-cols-[1fr_1.25fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-[#111c33]">
            5. Jelajahi SyncVoca Lebih Lanjut
          </h2>
          <p className="mt-2 text-sm font-semibold text-[#647188]">
            Temukan informasi lain yang mungkin Anda butuhkan.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={demoPortalUrl}
            className="focus-ring rounded-xl bg-[#009856] px-5 py-4 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,152,86,0.18)]"
          >
            <span className="block">Masuk Portal Demo</span>
            <span className="mt-1 block text-xs font-semibold text-white/80">
              Lihat demo langsung
            </span>
          </a>
          <Link
            href={"/cara-kerja" as Route}
            className="focus-ring rounded-xl border border-[#dce8e0] bg-white px-5 py-4 text-sm font-extrabold text-[#111c33]"
          >
            <span className="block">Pelajari Cara Kerja</span>
            <span className="mt-1 block text-xs font-semibold text-[#647188]">
              Pahami alur SyncVoca
            </span>
          </Link>
          <Link
            href={"/keamanan-data" as Route}
            className="focus-ring rounded-xl border border-[#dce8e0] bg-white px-5 py-4 text-sm font-extrabold text-[#111c33]"
          >
            <span className="block">Lihat Keamanan Data</span>
            <span className="mt-1 block text-xs font-semibold text-[#647188]">
              Pelajari proteksi data
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "min-h-12 w-full rounded-xl border border-[#dce6e0] bg-white px-4 text-sm font-semibold text-[#263550] outline-none transition placeholder:text-[#9aa5b4] focus:border-[#55bd84] focus:ring-4 focus:ring-[#dff5e8]";

function PageBand({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 bg-[#fbfdfb] px-5 py-2 sm:px-8">
      <div className="mx-auto w-full max-w-screen-2xl rounded-2xl border border-[#dbe8df] bg-white px-5 py-7 shadow-[0_16px_42px_rgba(17,28,51,0.035)] sm:px-7">
        <h2 className="text-xl font-extrabold text-[#111c33] sm:text-2xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm font-semibold leading-6 text-[#647188]">
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

function IconBubble({ icon: Icon, tone }: { icon: LucideIcon; tone: Tone }) {
  return (
    <span
      className={cn(
        "grid size-16 shrink-0 place-items-center rounded-full",
        toneClasses[tone].soft,
        toneClasses[tone].text,
      )}
    >
      <Icon className="size-8" />
    </span>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "grid gap-2 text-sm font-extrabold text-[#34445f]",
        className,
      )}
    >
      <span>{label}</span>
      {children}
    </label>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#eaf8ee] text-[#009856]">
        <Icon className="size-6" />
      </span>
      <span>
        <span className="block text-sm font-extrabold text-[#111c33]">
          {label}
        </span>
        <span className="mt-1 block text-sm font-bold leading-6 text-[#34445f]">
          {value}
        </span>
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      className="flex items-center gap-4 rounded-xl transition hover:bg-[#f7fbf8]"
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
  );
}
