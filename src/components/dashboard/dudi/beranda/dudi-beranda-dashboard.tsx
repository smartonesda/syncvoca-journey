"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  Accessibility,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Eye,
  FileText,
  GraduationCap,
  Handshake,
  HelpCircle,
  Home,
  LogOut,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  DashboardShell,
  DashboardSidebarToggle,
  SidebarScrollArea,
} from "@/components/dashboard/shared/dashboard-shell";
import { cn } from "@/lib/utils";

type Tone = "green" | "blue" | "yellow" | "purple" | "red" | "gray";

const toneClasses: Record<
  Tone,
  {
    icon: string;
    soft: string;
    text: string;
    border: string;
  }
> = {
  green: {
    icon: "bg-[#009D55] text-white",
    soft: "bg-[#E9F8EF] text-[#058447]",
    text: "text-[#058447]",
    border: "border-[#CFECDC]",
  },
  blue: {
    icon: "bg-[#1976E8] text-white",
    soft: "bg-[#EAF3FF] text-[#1768C8]",
    text: "text-[#1768C8]",
    border: "border-[#D5E7FF]",
  },
  yellow: {
    icon: "bg-[#F7B500] text-white",
    soft: "bg-[#FFF7DF] text-[#B87900]",
    text: "text-[#B87900]",
    border: "border-[#F7E7AE]",
  },
  purple: {
    icon: "bg-[#8750C8] text-white",
    soft: "bg-[#F3ECFF] text-[#7443B6]",
    text: "text-[#7443B6]",
    border: "border-[#E5D8FF]",
  },
  red: {
    icon: "bg-[#F04444] text-white",
    soft: "bg-[#FFF0F0] text-[#D93030]",
    text: "text-[#D93030]",
    border: "border-[#FFD6D6]",
  },
  gray: {
    icon: "bg-[#EEF2F4] text-[#637083]",
    soft: "bg-[#F6F8F9] text-[#637083]",
    text: "text-[#637083]",
    border: "border-[#E3E8EC]",
  },
};

const sidebarMenu: Array<{
  label: string;
  href: Route;
  icon: LucideIcon;
  active?: boolean;
}> = [
  { label: "Beranda", href: "/dashboard/dudi" as Route, icon: Home, active: true },
  { label: "Talent Pool", href: "/dashboard/dudi/kandidat" as Route, icon: UsersRound },
  { label: "Detail Kandidat", href: "/dashboard/dudi/kandidat/VK24-7A91" as Route, icon: UserRound },
  { label: "Lowongan Inklusif", href: "/dashboard/dudi/lowongan" as Route, icon: BriefcaseBusiness },
  { label: "Validasi", href: "/dashboard/dudi/validasi" as Route, icon: ShieldCheck },
  { label: "Placement", href: "/dashboard/dudi/placement" as Route, icon: GraduationCap },
  { label: "Report Aman", href: "/dashboard/dudi/report-aman" as Route, icon: FileText },
  { label: "Profil Perusahaan", href: "/dashboard/dudi/profil-perusahaan" as Route, icon: Building2 },
  { label: "Bantuan", href: "/dashboard/dudi/bantuan" as Route, icon: HelpCircle },
];

const summaryCards: Array<{
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  { label: "Kandidat Eligible", value: "246", delta: "18 dari minggu lalu", icon: UsersRound, tone: "green" },
  { label: "Kandidat Shortlisted", value: "38", delta: "6 dari minggu lalu", icon: UserRound, tone: "blue" },
  { label: "Validation Seal Diterbitkan", value: "51", delta: "12 dari minggu lalu", icon: BadgeCheck, tone: "yellow" },
  { label: "Lowongan Aktif", value: "7", delta: "2 dari minggu lalu", icon: BriefcaseBusiness, tone: "purple" },
  { label: "Placement Berjalan", value: "16", delta: "4 dari minggu lalu", icon: Handshake, tone: "green" },
];

const candidates = [
  {
    code: "VK24-7A91",
    segment: "SMK Umum",
    interest: "Administrasi Perkantoran",
    score: 88,
    skills: ["Administrasi", "Kearsipan", "Pengelolaan Data"],
    match: 92,
  },
  {
    code: "VK24-3B27",
    segment: "SMK Umum",
    interest: "Layanan Pelanggan",
    score: 84,
    skills: ["Komunikasi", "Empati", "Problem Solving"],
    match: 89,
  },
  {
    code: "VK24-9C14",
    segment: "SMK Umum",
    interest: "Pengelolaan Data",
    score: 81,
    skills: ["Microsoft Excel", "Ketelitian", "Analisis Data"],
    match: 87,
  },
  {
    code: "VK24-1D55",
    segment: "SMK Umum",
    interest: "Layanan Operasional",
    score: 79,
    skills: ["Organisasi", "Manajemen Waktu", "Kolaborasi"],
    match: 85,
  },
];

const activities: Array<{
  title: string;
  desc: string;
  time: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  { title: "Kandidat VK24-7A91 dilihat", desc: "oleh Andi Pratama", time: "10 menit lalu", icon: Eye, tone: "green" },
  { title: "Validation seal diterbitkan", desc: "untuk VK24-3B27", time: "1 jam lalu", icon: BadgeCheck, tone: "yellow" },
  { title: "VK24-9C14 masuk shortlist", desc: "untuk posisi Admin Assistant", time: "2 jam lalu", icon: UserRound, tone: "blue" },
  { title: 'Lowongan "Admin Assistant"', desc: "mendapat 12 kandidat baru", time: "3 jam lalu", icon: BriefcaseBusiness, tone: "purple" },
  { title: "Placement status diperbarui", desc: "2 kandidat mulai onboarding", time: "5 jam lalu", icon: Handshake, tone: "green" },
];

const privacyItems = [
  "Tanpa nama lengkap",
  "Tanpa data sensitif",
  "Berbasis bukti kerja",
  "Sesuai kebijakan keamanan SyncVoca",
];

const collaborationPoints: Array<{
  title: string;
  desc: string;
  icon: LucideIcon;
}> = [
  {
    title: "Bukti Kerja Terkurasi",
    desc: "Hanya evidence yang relevan dan tervalidasi.",
    icon: ClipboardCheck,
  },
  {
    title: "Siap Kerja Nyata",
    desc: "Siswa melalui simulasi dan internship terstruktur.",
    icon: UserRound,
  },
  {
    title: "Kolaborasi Aman",
    desc: "Data aman, sesuai kebijakan dan etika inklusif.",
    icon: ShieldCheck,
  },
];

function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[22px] border border-[#E3E9ED] bg-white shadow-[0_18px_60px_rgba(15,31,50,0.045)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function SmallLink({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 text-sm font-black text-[#058447]">
      {children}
      <ChevronRight className="size-4" />
    </button>
  );
}

function Sidebar({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  return (
    <aside
      className={cn(
        "shrink-0 flex-col bg-white",
        variant === "desktop"
          ? "hidden h-screen w-[228px] border-r border-[#E2E8EC] xl:flex 2xl:w-[292px]"
          : "flex h-full w-full",
      )}
    >
      <div className="shrink-0 px-4 pb-6 pt-5 2xl:px-6 2xl:pb-8 2xl:pt-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/syncvoca-logo.png"
            alt="SyncVoca"
            width={52}
            height={52}
            className="size-11 rounded-full object-cover 2xl:size-[52px]"
            priority
          />
          <div>
            <p className="text-[24px] font-black leading-none tracking-[-0.03em] text-[#0B1531] 2xl:text-[31px]">
              Sync<span className="text-[#009D55]">Voca</span>
            </p>
            <p className="mt-2 text-[10px] font-medium leading-4 text-[#4E5B6E] 2xl:text-[11px]">
              Menghubungkan potensi, mewujudkan mandiri
            </p>
          </div>
        </Link>
      </div>

      <SidebarScrollArea>
        <div className="space-y-2">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex min-h-[52px] items-center gap-3 rounded-xl px-3 text-[14px] font-bold transition 2xl:min-h-[56px] 2xl:gap-4 2xl:px-4 2xl:text-[15px]",
                  item.active
                    ? "bg-[#DDF6E7] text-[#058447]"
                    : "text-[#0E1A34] hover:bg-[#F3F8F5] hover:text-[#058447]",
                )}
              >
                <Icon className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-5 rounded-[18px] border border-[#DCEEE3] bg-white p-4 2xl:p-5">
          <div className="mb-4 flex items-center gap-3 text-[#058447]">
            <ShieldCheck className="size-6" />
            <p className="text-base font-black">Privacy & Data</p>
          </div>
          <p className="text-sm font-medium leading-6 text-[#26344A]">
            Anda hanya melihat data publik yang sudah disetujui. Data sensitif tetap
            berada di sekolah dan keluarga.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#058447]">
            Lihat batas data
            <ChevronRight className="size-4" />
          </button>
        </div>
      </SidebarScrollArea>

      <div className="shrink-0 space-y-3 border-t border-[#E2E8EC] bg-white/95 p-4 2xl:p-5">
        <div className="rounded-[16px] border border-[#E2E8EC] bg-white">
          <button className="flex w-full items-center gap-3 border-b border-[#E2E8EC] p-3 text-left">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1976E8] text-white">
              <Building2 className="size-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-black text-[#0E1A34]">PT Maju Bersama</span>
              <span className="mt-1 block truncate text-xs font-medium text-[#647086]">
                Industri Perkantoran
              </span>
            </span>
            <ChevronDown className="size-4 text-[#0E1A34]" />
          </button>
          <button className="flex w-full items-center gap-3 p-3 text-left">
            <div className="relative size-11 overflow-hidden rounded-full bg-[#DDF6E7]">
              <Image
                src="/landing/beranda/dudi.png"
                alt="Andi Pratama"
                fill
                sizes="44px"
                className="object-cover object-top"
              />
            </div>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-black text-[#0E1A34]">Andi Pratama</span>
              <span className="mt-1 block truncate text-xs font-medium text-[#647086]">HRD Partner</span>
            </span>
            <ChevronDown className="size-4 text-[#0E1A34]" />
          </button>
        </div>

        <button className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#0E1A34] transition hover:bg-[#F3F8F5]">
          <LogOut className="size-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-[#E2E8EC] bg-white/95 px-4 backdrop-blur lg:px-6 2xl:h-[78px] 2xl:px-8">
      <div className="flex min-w-0 items-center gap-4 2xl:gap-6">
        <DashboardSidebarToggle className="inline-flex size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3]" />
        <h1 className="min-w-0 truncate text-[22px] font-black tracking-[-0.02em] text-[#0E1A34] 2xl:text-[26px]">
          Dashboard DUDI
        </h1>
        <span className="hidden size-1.5 rounded-full bg-[#009D55] min-[1700px]:block" />
        <p className="hidden truncate text-sm font-black text-[#058447] min-[1700px]:block">
          Menghubungkan potensi, mewujudkan mandiri
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 2xl:gap-5">
        <button className="hidden size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3] md:inline-flex">
          <Search className="size-6" />
        </button>
        <button className="relative hidden size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3] md:inline-flex">
          <Bell className="size-6" />
          <span className="absolute right-0.5 top-0 flex size-5 items-center justify-center rounded-full bg-[#EF3333] text-[10px] font-black text-white">
            5
          </span>
        </button>
        <button className="hidden size-10 items-center justify-center rounded-full text-[#009D55] transition hover:bg-[#F0F5F3] 2xl:inline-flex">
          <Accessibility className="size-7" />
        </button>
        <span className="hidden h-9 w-px bg-[#E2E8EC] 2xl:block" />
        <button className="flex min-h-11 items-center gap-3 rounded-xl border border-[#DCE5E9] bg-white px-4 text-sm font-black text-[#0E1A34] shadow-sm transition hover:bg-[#F7FAF8]">
          PT Maju Bersama
          <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative hidden h-[254px] lg:block">
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,#DDF2EC)] opacity-80" />
      <div className="absolute bottom-0 left-4 flex items-end gap-2 opacity-45">
        {[72, 116, 88, 148, 104, 134].map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="w-10 rounded-t-lg bg-[#A8D8CE]"
            style={{ height }}
          />
        ))}
      </div>
      <div className="absolute left-[42%] top-[86px] z-20 flex size-20 items-center justify-center rounded-full border-[6px] border-white bg-[#63C58F] text-white shadow-[0_18px_45px_rgba(0,119,72,0.18)]">
        <ShieldCheck className="size-10" />
      </div>
      <div className="absolute bottom-0 left-[16%] h-[235px] w-[200px] overflow-hidden">
        <Image
          src="/landing/beranda/admin.png"
          alt="Perwakilan sekolah SyncVoca"
          fill
          sizes="200px"
          className="object-contain object-bottom"
          priority
        />
      </div>
      <div className="absolute bottom-0 right-[12%] h-[244px] w-[190px] overflow-hidden">
        <Image
          src="/landing/beranda/dudi.png"
          alt="Perwakilan DUDI"
          fill
          sizes="190px"
          className="object-contain object-bottom"
          priority
        />
      </div>
    </div>
  );
}

function HeroAndPrivacy() {
  return (
    <div className="grid gap-5 2xl:grid-cols-[1fr_0.4fr]">
      <section className="relative overflow-hidden rounded-[20px] border border-[#D5E7DD] bg-gradient-to-r from-[#F8FCFA] via-[#EEF9F2] to-[#F8FCFA] px-6 py-7 shadow-sm lg:px-8">
        <div className="grid min-h-[264px] gap-6 lg:grid-cols-[0.92fr_0.9fr] lg:items-center">
          <div className="relative z-10">
            <h2 className="text-[31px] font-black leading-tight tracking-[-0.02em] text-[#0E1A34]">
              Selamat datang, PT Maju Bersama! <span aria-hidden>👋</span>
            </h2>
            <p className="mt-4 max-w-[620px] text-[17px] font-medium leading-8 text-[#26344A]">
              Menghubungkan potensi, mewujudkan mandiri ruang industri untuk
              membaca kompetensi yang sudah terbukti.
            </p>

            <div className="mt-7 grid max-w-[470px] gap-4 sm:grid-cols-2">
              <div className="border-r border-[#D9E8DF] pr-6">
                <p className="text-[35px] font-black leading-none tracking-[-0.03em] text-[#0E1A34]">
                  246
                </p>
                <p className="mt-2 text-base font-black text-[#0E1A34]">Kandidat Eligible</p>
                <p className="mt-4 text-sm font-semibold text-[#4E5B6E]">
                  <span className="text-[#009D55]">↗</span> 18 dari minggu lalu
                </p>
              </div>
              <div className="pl-1 sm:pl-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1976E8]">
                    <UserRound className="size-5" />
                  </span>
                  <p className="text-[35px] font-black leading-none tracking-[-0.03em] text-[#0E1A34]">
                    7
                  </p>
                </div>
                <p className="text-base font-black text-[#0E1A34]">Lowongan Aktif</p>
                <p className="mt-4 text-sm font-semibold text-[#4E5B6E]">
                  <span className="text-[#009D55]">↗</span> 2 dari minggu lalu
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href={"/dashboard/dudi/kandidat" as Route}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#009D55] px-7 text-sm font-black text-white shadow-[0_18px_42px_rgba(0,157,85,0.2)] transition hover:bg-[#058447]"
              >
                Lihat Talent Pool
                <span className="flex size-7 items-center justify-center rounded-full border border-white/40">
                  <ChevronRight className="size-4" />
                </span>
              </Link>
              <Link
                href={"/dashboard/dudi/lowongan" as Route}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D7E2E6] bg-white px-7 text-sm font-black text-[#0E1A34] shadow-sm transition hover:bg-[#F7FAF8]"
              >
                Kelola Lowongan
              </Link>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <SectionCard className="p-6">
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E9F8EF] text-[#058447]">
            <ShieldCheck className="size-7" />
          </span>
          <h2 className="text-2xl font-black tracking-[-0.01em] text-[#0E1A34]">Privacy Wall</h2>
        </div>
        <p className="mt-6 text-base font-medium leading-8 text-[#26344A]">
          Anda hanya melihat data publik yang sudah dipublikasi aman oleh sekolah dan
          disetujui oleh siswa/keluarga.
        </p>
        <div className="mt-6 space-y-3">
          {privacyItems.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#26344A]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2DBE74] text-white">
                <ShieldCheck className="size-4" />
              </span>
              {item}
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <SmallLink>Lihat batas data</SmallLink>
        </div>
      </SectionCard>
    </div>
  );
}

function SummarySection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <h2 className="mb-5 text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
        Ringkasan Hari Ini
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1800px]:grid-cols-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="min-h-[124px] rounded-[18px] border border-[#E2E8EC] bg-white p-5 shadow-[0_12px_40px_rgba(15,31,50,0.035)]"
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "inline-flex size-[54px] shrink-0 items-center justify-center rounded-full",
                    toneClasses[card.tone].icon,
                  )}
                >
                  <Icon className="size-7" />
                </span>
                <div className="min-w-0">
                  <p className="text-[31px] font-black leading-none tracking-[-0.03em] text-[#0E1A34]">
                    {card.value}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold leading-4 text-[#172136]">
                    {card.label}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-xs font-semibold text-[#4E5B6E]">
                <span className="text-[#009D55]">↗</span> {card.delta}
              </p>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}

function CandidateCard({ candidate }: { candidate: (typeof candidates)[number] }) {
  return (
    <article className="rounded-[18px] border border-[#E1E8EC] bg-white p-4 shadow-[0_14px_42px_rgba(15,31,50,0.035)]">
      <span className="inline-flex min-h-6 items-center rounded-md bg-[#CFF2DC] px-2 text-[11px] font-black text-[#058447]">
        DUDI-SAFE
      </span>
      <div className="mt-4 flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[#CDECDC] bg-[#E9F8EF] text-[#058447]">
          <UserRound className="size-8" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xl font-black text-[#0E1A34]">{candidate.code}</p>
          <p className="mt-1 text-sm font-semibold text-[#4E5B6E]">Segmen: {candidate.segment}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-[#4E5B6E]">Minat Vokasi</p>
        <p className="mt-1 text-base font-black text-[#0E1A34]">{candidate.interest}</p>
      </div>

      <div className="mt-4 rounded-xl border border-[#E5ECEF] p-3">
        <p className="text-sm font-semibold text-[#4E5B6E]">Readiness Score</p>
        <p className="mt-1 text-2xl font-black text-[#0E1A34]">
          {candidate.score}<span className="text-base font-semibold text-[#4E5B6E]">/100</span>
        </p>
        <span className="mt-3 block h-2.5 overflow-hidden rounded-full bg-[#E9EEF1]">
          <span
            className="block h-full rounded-full bg-[#009D55]"
            style={{ width: `${candidate.score}%` }}
          />
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-[#4E5B6E]">Skill Utama</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-[#F2F6F8] px-2 py-1 text-[10px] font-black text-[#26344A]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-6 text-[#009D55]" />
          <p className="text-xs font-semibold text-[#4E5B6E]">
            Consent
            <span className="block text-sm font-black text-[#058447]">Approved</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-[#4E5B6E]">Job Match</p>
          <p className="text-lg font-black text-[#058447]">{candidate.match}%</p>
        </div>
      </div>

      <Link
        href={`/dashboard/dudi/kandidat/${candidate.code}` as Route}
        className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#E0E8EC] bg-white text-sm font-black text-[#058447] transition hover:bg-[#F4FBF7]"
      >
        Lihat Detail
        <ChevronRight className="size-4" />
      </Link>
    </article>
  );
}

function CandidateSection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
          Kandidat Direkomendasikan untuk Anda
        </h2>
        <SmallLink>Lihat Semua</SmallLink>
      </div>
      <div className="grid gap-4 md:grid-cols-2 min-[1800px]:grid-cols-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.code} candidate={candidate} />
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-2">
        <span className="size-2.5 rounded-full bg-[#009D55]" />
        <span className="size-2.5 rounded-full bg-[#D8E3E7]" />
        <span className="size-2.5 rounded-full bg-[#D8E3E7]" />
        <span className="size-2.5 rounded-full bg-[#D8E3E7]" />
      </div>
    </SectionCard>
  );
}

function ActivityPanel() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
          Aktivitas Terbaru
        </h2>
        <SmallLink>Lihat Semua</SmallLink>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#E7ECEF]">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.title}
              className={cn(
                "flex min-h-[84px] items-center gap-4 bg-white px-4 py-3",
                index > 0 && "border-t border-[#E7ECEF]",
              )}
            >
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-xl border",
                  toneClasses[activity.tone].soft,
                  toneClasses[activity.tone].border,
                )}
              >
                <Icon className={cn("size-6", toneClasses[activity.tone].text)} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-[#0E1A34]">{activity.title}</p>
                <p className="mt-1 text-sm font-medium leading-5 text-[#4E5B6E]">{activity.desc}</p>
              </div>
              <p className="shrink-0 text-xs font-medium text-[#4E5B6E]">{activity.time}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-7 text-center">
        <SmallLink>Lihat Semua Aktivitas</SmallLink>
      </div>
    </SectionCard>
  );
}

function CollaborationBanner() {
  return (
    <section className="rounded-[22px] border border-[#DCEEE3] bg-gradient-to-r from-[#EEF9F2] via-white to-[#F6FCF8] p-6 shadow-sm">
      <div className="grid gap-6 2xl:grid-cols-[1.25fr_2fr_0.9fr] 2xl:items-center">
        <div className="flex items-center gap-5">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#009D55] text-white">
            <GraduationCap className="size-9" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-[#058447]">
              Bersama Membangun Talenta Inklusif
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-[#26344A]">
              SyncVoca membantu industri menemukan talenta siap kerja berdasarkan bukti,
              bukan label.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {collaborationPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E9F8EF] text-[#058447]">
                  <Icon className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-black text-[#0E1A34]">{point.title}</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#4E5B6E]">{point.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href={"/cara-kerja" as Route}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#D7E2E6] bg-white px-5 text-sm font-black text-[#0E1A34] shadow-sm transition hover:bg-[#F7FAF8]"
        >
          Pelajari Kolaborasi SyncVoca
          <ChevronRight className="size-5" />
        </Link>
      </div>
    </section>
  );
}

export function DudiBerandaDashboard() {
  return (
    <DashboardShell desktopSidebar={<Sidebar />} mobileSidebar={<Sidebar variant="mobile" />}>
      <TopBar />
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-5 px-4 py-5 sm:px-6 2xl:px-8">
          <HeroAndPrivacy />
          <SummarySection />
          <div className="grid gap-5 2xl:grid-cols-[1fr_0.4fr]">
            <CandidateSection />
            <ActivityPanel />
          </div>
          <CollaborationBanner />
        </div>
      </div>
    </DashboardShell>
  );
}
