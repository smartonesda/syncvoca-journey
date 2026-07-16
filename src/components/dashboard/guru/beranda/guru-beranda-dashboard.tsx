"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  Accessibility,
  Bell,
  BookOpenCheck,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gamepad2,
  GraduationCap,
  Home,
  LogOut,
  MessageCircleQuestion,
  Search,
  Settings,
  ShieldCheck,
  UsersRound,
  UserRound,
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
    icon: "bg-[#F34C4C] text-white",
    soft: "bg-[#FFF0F0] text-[#D93030]",
    text: "text-[#D93030]",
    border: "border-[#FFD6D6]",
  },
  gray: {
    icon: "bg-[#E9EDF0] text-[#637083]",
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
  { label: "Beranda", href: "/dashboard/guru" as Route, icon: Home, active: true },
  { label: "Daftar Siswa", href: "/dashboard/guru/siswa" as Route, icon: UsersRound },
  { label: "Detail Siswa", href: "/dashboard/guru/siswa/student-rizky" as Route, icon: UserRound },
  { label: "Simulasi", href: "/dashboard/guru/simulasi" as Route, icon: CalendarCheck2 },
  { label: "Evidence Review", href: "/dashboard/guru/simulasi" as Route, icon: FileText },
  { label: "Consent", href: "/dashboard/guru/consent" as Route, icon: ShieldCheck },
  { label: "Placement", href: "/dashboard/guru/placement" as Route, icon: Building2 },
  { label: "Laporan", href: "/dashboard/guru/laporan" as Route, icon: ClipboardCheck },
];

const quickLinks = [
  { label: "Bantuan Guru", icon: MessageCircleQuestion },
  { label: "Panduan Pengguna", icon: BookOpenCheck },
  { label: "Feedback", icon: CheckCircle2 },
];

const summaryCards: Array<{
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  {
    label: "Siswa Aktif",
    value: "124",
    delta: "8 dari minggu lalu",
    icon: UsersRound,
    tone: "green",
  },
  {
    label: "Sesi Simulasi Selesai",
    value: "86",
    delta: "15 dari minggu lalu",
    icon: Gamepad2,
    tone: "blue",
  },
  {
    label: "Evidence Menunggu Review",
    value: "12",
    delta: "4 dari kemarin",
    icon: ClipboardCheck,
    tone: "yellow",
  },
  {
    label: "Consent Pending",
    value: "7",
    delta: "3 dari kemarin",
    icon: ShieldCheck,
    tone: "purple",
  },
  {
    label: "Kandidat Siap DUDI",
    value: "9",
    delta: "2 dari minggu lalu",
    icon: ShieldCheck,
    tone: "green",
  },
  {
    label: "Placement Perlu Follow-up",
    value: "4",
    delta: "2 dari kemarin",
    icon: Building2,
    tone: "blue",
  },
];

const priorities: Array<{
  title: string;
  desc: string;
  count: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  {
    title: "Evidence menunggu review",
    desc: "Berikan umpan balik sebelum 7 hari",
    count: "12",
    icon: FileCheck2,
    tone: "red",
  },
  {
    title: "Consent perlu diminta",
    desc: "Orang tua belum memberikan persetujuan",
    count: "7",
    icon: ClipboardCheck,
    tone: "yellow",
  },
  {
    title: "Catatan pendampingan belum diperbarui",
    desc: "Perbarui catatan untuk 8 siswa",
    count: "8",
    icon: CalendarCheck2,
    tone: "yellow",
  },
  {
    title: "Placement update dari DUDI",
    desc: "Menunggu kabar dari mitra DUDI",
    count: "4",
    icon: Building2,
    tone: "blue",
  },
];

const journeyStages: Array<{
  title: string;
  count: string;
  percent: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  { title: "Mengenal Diri", count: "24 siswa", percent: "19%", icon: UserRound, tone: "green" },
  { title: "Eksplorasi Minat", count: "36 siswa", percent: "29%", icon: GraduationCap, tone: "green" },
  { title: "Pra-Internship", count: "28 siswa", percent: "23%", icon: ClipboardCheck, tone: "yellow" },
  { title: "Internship", count: "24 siswa", percent: "19%", icon: CalendarCheck2, tone: "blue" },
  { title: "Siap Kerja", count: "12 siswa", percent: "10%", icon: Building2, tone: "gray" },
];

const activities: Array<{
  title: string;
  desc: string;
  time: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  {
    title: "Andi Pratama menyelesaikan simulasi",
    desc: "Simulasi Administrasi Perkantoran",
    time: "10 menit lalu",
    icon: ShieldCheck,
    tone: "green",
  },
  {
    title: "12 evidence baru terkumpul",
    desc: "Dari 6 siswa",
    time: "35 menit lalu",
    icon: ClipboardCheck,
    tone: "yellow",
  },
  {
    title: "Consent disetujui orang tua",
    desc: "Siti Aisyah - Kelas XI OTKP 1",
    time: "1 jam lalu",
    icon: ShieldCheck,
    tone: "purple",
  },
  {
    title: "Consent ditolak orang tua",
    desc: "Rizky Maulana - Kelas XI OTKP 2",
    time: "2 jam lalu",
    icon: ShieldCheck,
    tone: "red",
  },
  {
    title: "Validation seal diterbitkan",
    desc: "5 evidence tervalidasi DUDI",
    time: "3 jam lalu",
    icon: CheckCircle2,
    tone: "green",
  },
];

const attentionStudents: Array<{
  name: string;
  className: string;
  status: string;
  note: string;
  tone: Tone;
}> = [
  {
    name: "Rizky Maulana",
    className: "XI OTKP 2",
    status: "Butuh Review",
    note: "3 evidence menunggu",
    tone: "red",
  },
  {
    name: "Siti Aisyah",
    className: "XI OTKP 1",
    status: "Consent Pending",
    note: "Menunggu persetujuan",
    tone: "yellow",
  },
  {
    name: "Dewi Lestari",
    className: "XI AKL 1",
    status: "Catatan Belum Update",
    note: "Terakhir update 14 hari lalu",
    tone: "blue",
  },
  {
    name: "Bagas Setiawan",
    className: "XI MPLB 1",
    status: "Siap Placement",
    note: "Menunggu update DUDI",
    tone: "green",
  },
];

const exportItems: Array<{
  label: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  { label: "Laporan Progress", icon: FileText, tone: "green" },
  { label: "Laporan Evidence", icon: ClipboardCheck, tone: "blue" },
  { label: "Laporan Consent", icon: ShieldCheck, tone: "purple" },
  { label: "Laporan Placement", icon: Building2, tone: "yellow" },
];

function SectionCard({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-[22px] border border-[#E3E9ED] bg-white shadow-[0_18px_60px_rgba(15,31,50,0.045)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function SmallSelect({ label }: { label: string }) {
  return (
    <button className="inline-flex h-10 min-w-[150px] items-center justify-between gap-3 rounded-xl border border-[#DDE6EC] bg-white px-4 text-xs font-semibold text-[#0E1A34] shadow-sm">
      {label}
      <ChevronDown className="size-4 text-[#637083]" />
    </button>
  );
}

function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-xl border px-3 text-xs font-bold",
        toneClasses[tone].soft,
        toneClasses[tone].border,
      )}
    >
      {children}
    </span>
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

        <div className="mt-5 rounded-[18px] border border-[#E2E8EC] bg-white p-4 2xl:p-5">
          <p className="mb-4 text-[15px] font-black text-[#058447]">Akses Cepat</p>
          <div className="space-y-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex min-h-8 w-full items-center gap-3 text-left text-sm font-medium text-[#344258]"
                >
                  <Icon className="size-4 text-[#0E1A34]" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </SidebarScrollArea>

      <div className="shrink-0 border-t border-[#E2E8EC] bg-white/95 p-4 2xl:p-5">
        <div className="rounded-[16px] border border-[#E2E8EC] bg-white p-3">
          <div className="flex items-center gap-3">
            <div className="relative size-11 overflow-hidden rounded-full bg-[#DDF6E7]">
              <Image
                src="/landing/beranda/guru.png"
                alt="Bu Maya"
                fill
                sizes="44px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-black text-[#0E1A34]">Bu Maya</p>
              <p className="truncate text-xs font-medium text-[#647086]">Guru Produktif</p>
            </div>
            <ChevronDown className="size-4 text-[#0E1A34]" />
          </div>
          <p className="mt-3 truncate border-b border-[#E7ECEF] pb-3 text-sm font-medium text-[#344258]">
            SMK Antartika 1 Sidoarjo
          </p>
          <div className="mt-3 grid gap-2">
            <button className="flex min-h-9 w-full items-center gap-3 rounded-xl px-2 text-left text-sm font-medium text-[#344258] transition hover:bg-[#F3F8F5]">
              <Settings className="size-4 text-[#0E1A34]" />
              Pengaturan
            </button>
            <button className="flex min-h-9 w-full items-center gap-3 rounded-xl px-2 text-left text-sm font-medium text-[#344258] transition hover:bg-[#F3F8F5]">
              <LogOut className="size-4 text-[#0E1A34]" />
              Keluar
            </button>
          </div>
        </div>
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
          Dashboard Guru
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 2xl:gap-5">
        <button className="hidden size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3] md:inline-flex">
          <Search className="size-6" />
        </button>
        <button className="relative hidden size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3] md:inline-flex">
          <Bell className="size-6" />
          <span className="absolute right-0.5 top-0 flex size-5 items-center justify-center rounded-full bg-[#EF3333] text-[10px] font-black text-white">
            12
          </span>
        </button>
        <span className="hidden h-9 w-px bg-[#E2E8EC] 2xl:block" />
        <button className="hidden size-10 items-center justify-center rounded-full border-2 border-[#009D55] text-[#009D55] 2xl:inline-flex">
          <Accessibility className="size-6" />
        </button>
        <span className="hidden h-9 w-px bg-[#E2E8EC] 2xl:block" />
        <button className="flex items-center gap-3 rounded-full px-1 py-1 transition hover:bg-[#F3F8F5]">
          <div className="relative size-11 overflow-hidden rounded-full bg-[#DDF6E7]">
            <Image
              src="/landing/beranda/guru.png"
              alt="Bu Maya"
              fill
              sizes="44px"
              className="object-cover object-top"
            />
          </div>
          <span className="hidden text-sm font-black text-[#0E1A34] 2xl:inline">Bu Maya</span>
          <ChevronDown className="hidden size-4 text-[#0E1A34] sm:block" />
        </button>
      </div>
    </div>
  );
}

function HeroPanel() {
  return (
    <section className="relative overflow-hidden rounded-[20px] border border-[#D5E7DD] bg-gradient-to-r from-[#F6FCF8] via-[#ECF8F2] to-[#F8FCFA] px-6 py-7 shadow-sm lg:px-8">
      <div className="grid min-h-[158px] gap-6 min-[1580px]:grid-cols-[1.04fr_0.78fr_0.48fr] min-[1580px]:items-center">
        <div className="relative z-10">
          <h2 className="text-[29px] font-black leading-tight tracking-[-0.02em] text-[#0E1A34]">
            Selamat pagi, Bu Maya! <span aria-hidden>👋</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-[17px] font-medium leading-8 text-[#26344A]">
            Mari dukung siswa hari ini dengan membaca progress, memberi umpan balik,
            dan menyiapkan bukti kerja terbaik mereka.
          </p>
        </div>

        <div className="relative hidden h-[170px] lg:block">
          <div className="absolute left-4 top-8 h-20 w-28 rounded-lg border border-[#CDE5DA] bg-white/75 shadow-sm">
            <div className="m-4 h-3 rounded-full bg-[#C9E7D5]" />
            <div className="mx-4 mt-3 flex items-end gap-2">
              <span className="h-9 w-4 rounded bg-[#B9E1C7]" />
              <span className="h-12 w-4 rounded bg-[#8CCEA6]" />
              <span className="h-7 w-4 rounded bg-[#D8EFE0]" />
            </div>
          </div>
          <div className="absolute bottom-0 left-12 h-4 w-28 rounded-full bg-[#B7804D]" />
          <div className="absolute bottom-4 left-20 h-3 w-20 rounded-full bg-[#D8A36F]" />
          <div className="absolute bottom-0 right-2 h-28 w-24 rounded-t-full bg-[#CBEED6]/80" />
          <Image
            src="/landing/beranda/guru.png"
            alt="Ilustrasi guru SyncVoca"
            width={230}
            height={230}
            className="absolute bottom-[-22px] left-1/2 h-[210px] w-auto -translate-x-1/2 object-contain"
            priority
          />
        </div>

        <div className="relative z-10 rounded-[18px] bg-white/92 p-5 shadow-[0_20px_55px_rgba(15,31,50,0.08)]">
          <p className="mb-4 text-sm font-black text-[#058447]">Fokus Hari Ini</p>
          <div className="space-y-3">
            {[
              "12 evidence menunggu review",
              "5 consent perlu diminta",
              "3 kandidat siap untuk DUDI",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#0E1A34]">
                <CheckCircle2 className="size-4 text-[#009D55]" />
                {item}
              </div>
            ))}
          </div>
          <Link
            href="#prioritas"
            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#058447]"
          >
            Lihat Prioritas
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SummarySection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
          Ringkasan Kelas Hari Ini
        </h2>
        <SmallSelect label="Kelas: Semua Kelas" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1800px]:grid-cols-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="min-h-[132px] rounded-[18px] border border-[#E2E8EC] bg-white p-5 shadow-[0_12px_40px_rgba(15,31,50,0.035)]"
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
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#4E5B6E]">
                <span className="text-[#009D55]">↗</span>
                {card.delta}
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}

function PrioritiesSection() {
  return (
    <SectionCard id="prioritas" className="p-5 lg:p-6">
      <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
        Prioritas Tindakan
      </h2>
      <div className="mt-6 space-y-3">
        {priorities.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              className={cn(
                "flex min-h-[62px] w-full items-center gap-4 rounded-xl border px-4 text-left transition hover:-translate-y-0.5",
                toneClasses[item.tone].soft,
                toneClasses[item.tone].border,
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/70">
                <Icon className={cn("size-5", toneClasses[item.tone].text)} />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-sm font-black", toneClasses[item.tone].text)}>
                  {item.title}
                </span>
                <span className="mt-1 block text-xs font-medium text-[#4E5B6E]">{item.desc}</span>
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/75 text-xs font-black">
                {item.count}
              </span>
              <ChevronRight className="size-4 text-[#0E1A34]" />
            </button>
          );
        })}
      </div>
      <Link
        href={"/dashboard/guru/siswa" as Route}
        className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#058447]"
      >
        Lihat Semua Prioritas
        <ChevronRight className="size-4" />
      </Link>
    </SectionCard>
  );
}

function JourneySection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="mb-8 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
          Progress Journey Siswa
        </h2>
        <Link href={"/dashboard/guru/siswa" as Route} className="inline-flex items-center gap-2 text-sm font-black text-[#058447]">
          Lihat Detail
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 min-[540px]:grid-cols-5">
        {journeyStages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={stage.title} className="relative text-center">
              {index < journeyStages.length - 1 ? (
                <span className="absolute left-[62%] top-6 hidden h-px w-[76%] bg-[#B6CBC2] min-[540px]:block" />
              ) : null}
              <div
                className={cn(
                  "relative z-10 mx-auto flex size-[58px] items-center justify-center rounded-full border-8 border-white shadow-sm",
                  toneClasses[stage.tone].soft,
                )}
              >
                <Icon className={cn("size-6", toneClasses[stage.tone].text)} />
              </div>
              <p className="mt-3 text-sm font-black text-[#0E1A34]">{index + 1}</p>
              <p className="mt-1 min-h-[35px] text-xs font-black leading-tight text-[#0E1A34]">
                {stage.title}
              </p>
              <p className="mt-4 text-sm font-semibold text-[#0E1A34]">{stage.count}</p>
              <p className="mt-1 text-sm font-black text-[#0E1A34]">{stage.percent}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex h-5 overflow-hidden rounded-full bg-[#C8CDD2]">
        <span className="w-[19%] bg-[#009D55]" />
        <span className="w-[29%] bg-[#41D391]" />
        <span className="w-[23%] bg-[#FFC107]" />
        <span className="w-[19%] bg-[#4E95F6]" />
        <span className="w-[10%] bg-[#B8BEC5]" />
      </div>

      <div className="mt-9 flex flex-col gap-3 rounded-xl bg-[#F3FAF6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#344258]">Distribusi per Kelas</p>
        <SmallSelect label="Kelas: Semua Kelas" />
      </div>
    </SectionCard>
  );
}

function ActivitySection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
          Aktivitas Terbaru
        </h2>
        <SmallSelect label="Semua Aktivitas" />
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E7ECEF]">
        {activities.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={cn(
                "flex min-h-[74px] items-center gap-4 bg-white px-4 py-3",
                index > 0 && "border-t border-[#E7ECEF]",
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl border",
                  toneClasses[item.tone].soft,
                  toneClasses[item.tone].border,
                )}
              >
                <Icon className={cn("size-5", toneClasses[item.tone].text)} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#0E1A34]">{item.title}</p>
                <p className="mt-1 truncate text-xs font-medium text-[#4E5B6E]">{item.desc}</p>
              </div>
              <p className="shrink-0 text-xs font-medium text-[#4E5B6E]">{item.time}</p>
            </div>
          );
        })}
      </div>

      <Link
        href={"/dashboard/guru/laporan" as Route}
        className="mx-auto mt-5 flex w-fit items-center gap-2 text-sm font-black text-[#058447]"
      >
        Lihat Semua Aktivitas
        <ChevronRight className="size-4" />
      </Link>
    </SectionCard>
  );
}

function StudentsAttentionSection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
        Siswa Butuh Perhatian
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 min-[1760px]:grid-cols-5">
        {attentionStudents.map((student) => (
          <article
            key={student.name}
            className="rounded-[18px] border border-[#E2E8EC] bg-white p-4 shadow-[0_12px_35px_rgba(15,31,50,0.035)]"
          >
            <div className="flex items-center gap-3">
              <div className="relative size-[52px] overflow-hidden rounded-full bg-[#DDF6E7]">
                <Image
                  src="/landing/beranda/guru.png"
                  alt={student.name}
                  fill
                  sizes="52px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-sm font-black text-[#0E1A34]">{student.name}</p>
                <p className="mt-1 text-xs font-medium text-[#4E5B6E]">{student.className}</p>
              </div>
            </div>
            <div className="mt-4">
              <StatusPill tone={student.tone}>{student.status}</StatusPill>
            </div>
            <p className="mt-4 text-sm font-medium text-[#4E5B6E]">{student.note}</p>
          </article>
        ))}

        <Link
          href={"/dashboard/guru/siswa" as Route}
          className="flex min-h-[158px] flex-col items-center justify-center rounded-[18px] border border-dashed border-[#C9D3DA] bg-white text-center transition hover:bg-[#F3F8F5]"
        >
          <UsersRound className="size-8 text-[#0E1A34]" />
          <span className="mt-3 text-sm font-semibold text-[#0E1A34]">Lihat Semua</span>
        </Link>
      </div>
    </SectionCard>
  );
}

function ExportSection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
        Export Cepat
      </h2>
      <p className="mt-4 text-sm font-medium leading-6 text-[#4E5B6E]">
        Unduh laporan dan ringkasan data untuk kebutuhan sekolah.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {exportItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={cn(
                "flex min-h-[94px] flex-col items-center justify-center rounded-xl border text-center text-xs font-black transition hover:-translate-y-0.5",
                toneClasses[item.tone].soft,
                toneClasses[item.tone].border,
              )}
            >
              <Icon className={cn("mb-2 size-5", toneClasses[item.tone].text)} />
              {item.label}
            </button>
          );
        })}
      </div>
      <Link
        href={"/dashboard/guru/laporan" as Route}
        className="mx-auto mt-6 flex w-fit items-center gap-2 text-sm font-black text-[#058447]"
      >
        Lihat Semua Laporan
        <ChevronRight className="size-4" />
      </Link>
    </SectionCard>
  );
}

export function GuruBerandaDashboard() {
  return (
    <DashboardShell desktopSidebar={<Sidebar />} mobileSidebar={<Sidebar variant="mobile" />}>
      <TopBar />

      <div
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-5 px-4 py-5 sm:px-6 2xl:px-8">
          <HeroPanel />
          <SummarySection />

          <div className="grid gap-5 min-[1760px]:grid-cols-[0.86fr_1.22fr_1.05fr]">
            <PrioritiesSection />
            <JourneySection />
            <ActivitySection />
          </div>

          <div className="grid gap-5 2xl:grid-cols-[1.72fr_1fr]">
            <StudentsAttentionSection />
            <ExportSection />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
