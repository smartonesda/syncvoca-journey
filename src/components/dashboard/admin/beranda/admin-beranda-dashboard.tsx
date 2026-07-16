"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  LogOut,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  UserCheck2,
  UsersRound,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  DashboardShell,
  DashboardSidebarToggle,
  SidebarScrollArea,
} from "@/components/dashboard/shared/dashboard-shell";
import { cn } from "@/lib/utils";

type Tone = "green" | "blue" | "yellow" | "purple" | "red" | "orange" | "gray";

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
  orange: {
    icon: "bg-[#FF8A1F] text-white",
    soft: "bg-[#FFF3E8] text-[#C76400]",
    text: "text-[#C76400]",
    border: "border-[#FFDEC1]",
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
  { label: "Overview", href: "/dashboard/admin" as Route, icon: Home, active: true },
  { label: "Users", href: "/dashboard/admin/users" as Route, icon: UsersRound },
  { label: "Schools", href: "/dashboard/admin/schools" as Route, icon: GraduationCap },
  { label: "Students", href: "/dashboard/admin/students" as Route, icon: UsersRound },
  { label: "DUDI", href: "/dashboard/admin/dudi" as Route, icon: Building2 },
  { label: "Consent Governance", href: "/dashboard/admin/consent" as Route, icon: ShieldCheck },
  { label: "Audit Log", href: "/dashboard/admin/audit" as Route, icon: ClipboardCheck },
  { label: "Reports", href: "/dashboard/admin/reports" as Route, icon: FileText },
  { label: "Placement Metrics", href: "/dashboard/admin/placement-metrics" as Route, icon: Building2 },
  { label: "Settings", href: "/dashboard/admin/settings" as Route, icon: Settings },
];

const quickActions: Array<{
  label: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  { label: "Kelola Consent", icon: ClipboardCheck, tone: "green" },
  { label: "Lihat Audit Log", icon: FileText, tone: "blue" },
  { label: "Export Report", icon: FileText, tone: "purple" },
  { label: "Kelola Users", icon: UsersRound, tone: "green" },
  { label: "Kelola DUDI", icon: Settings, tone: "blue" },
  { label: "Pengaturan Sistem", icon: Settings, tone: "gray" },
];

const summaryCards: Array<{
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
  tone: Tone;
}> = [
  { label: "Total Siswa", value: "2.418", delta: "128 dari minggu lalu", trend: "up", icon: GraduationCap, tone: "green" },
  { label: "Sekolah Aktif", value: "48", delta: "3 dari minggu lalu", trend: "up", icon: Building2, tone: "blue" },
  { label: "DUDI Aktif", value: "156", delta: "12 dari minggu lalu", trend: "up", icon: Building2, tone: "purple" },
  { label: "Guru & Ortu Aktif", value: "892", delta: "54 dari minggu lalu", trend: "up", icon: UsersRound, tone: "orange" },
  { label: "Consent Pending", value: "72", delta: "8 dari minggu lalu", trend: "down", icon: ShieldCheck, tone: "yellow" },
  { label: "Validation Seal", value: "342", delta: "26 dari minggu lalu", trend: "up", icon: ShieldCheck, tone: "green" },
  { label: "Blocked Validation", value: "18", delta: "5 dari minggu lalu", trend: "down", icon: XCircle, tone: "red" },
  { label: "Report Exported", value: "27", delta: "10 dari minggu lalu", trend: "up", icon: FileText, tone: "blue" },
];

const risks: Array<{
  title: string;
  desc: string;
  count: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  { title: "Consent menumpuk", desc: "72 consent menunggu lebih dari 3 hari", count: "72", icon: ShieldAlert, tone: "red" },
  { title: "DUDI mencoba akses tanpa consent", desc: "5 percobaan diblokir hari ini", count: "5", icon: ShieldCheck, tone: "orange" },
  { title: "Report export gagal", desc: "3 export report gagal dalam 24 jam terakhir", count: "3", icon: ClipboardCheck, tone: "yellow" },
  { title: "User invite belum aktif", desc: "14 undangan user belum diaktivasi", count: "14", icon: UserCheck2, tone: "blue" },
  { title: "Audit anomaly terdeteksi", desc: "2 aktivitas tidak wajar perlu ditinjau", count: "2", icon: ShieldCheck, tone: "purple" },
];

const regionDistribution = [
  { label: "Sidoarjo", value: "18 (37%)", color: "#1E9FEA" },
  { label: "Surabaya", value: "12 (25%)", color: "#00A86B" },
  { label: "Gresik", value: "8 (17%)", color: "#F7B500" },
  { label: "Malang", value: "6 (13%)", color: "#FF8A1F" },
  { label: "Lainnya", value: "4 (8%)", color: "#74B6FF" },
];

const dudiIndustries = [
  { label: "Administrasi & Perkantoran", value: 42 },
  { label: "Ritel & Layanan", value: 31 },
  { label: "Manufaktur", value: 27 },
  { label: "Teknologi Informasi", value: 19 },
  { label: "Pariwisata", value: 15 },
  { label: "Lainnya", value: 22 },
];

const journeyDistribution = [
  { label: "Mengenal Diri", value: "412 (17%)", color: "#009D55" },
  { label: "Eksplorasi Minat", value: "578 (24%)", color: "#F7B500" },
  { label: "Pra-Internship", value: "566 (23%)", color: "#FF8A1F" },
  { label: "Internship", value: "542 (22%)", color: "#8750C8" },
  { label: "Siap Kerja", value: "320 (14%)", color: "#4FA7E8" },
];

const activities: Array<{
  title: string;
  desc: string;
  time: string;
  icon: LucideIcon;
  tone: Tone;
}> = [
  { title: "User login", desc: "Guru - Siti Aisyah (SMK Antartika 1)", time: "10 menit lalu", icon: UsersRound, tone: "green" },
  { title: "Consent approved", desc: "Siswa - Kode S-2418 oleh Orang Tua", time: "25 menit lalu", icon: ShieldCheck, tone: "yellow" },
  { title: "Consent revoked", desc: "Siswa - Kode S-1987 oleh Orang Tua", time: "1 jam lalu", icon: ShieldCheck, tone: "red" },
  { title: "Validation seal issued", desc: "Kandidat - Kode V-2491 oleh DUDI PT Maju Bersama", time: "2 jam lalu", icon: Settings, tone: "green" },
  { title: "Report exported", desc: "Laporan Bulanan - Juni 2025", time: "3 jam lalu", icon: FileText, tone: "blue" },
  { title: "Placement updated", desc: "Kandidat - Kode V-2310 status Onboarding", time: "5 jam lalu", icon: Building2, tone: "green" },
];

const healthCards = [
  { label: "Data System", value: "Aman" },
  { label: "Consent Compliance", value: "Baik" },
  { label: "Validation Flow", value: "Sehat" },
  { label: "Audit Integrity", value: "Aman" },
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
      </SidebarScrollArea>

      <div className="shrink-0 space-y-3 border-t border-[#E2E8EC] bg-white/95 p-4 2xl:p-5">
        <div className="rounded-[16px] border border-[#E2E8EC] bg-white p-4">
          <p className="text-xs font-medium text-[#647086]">Tenant Aktif</p>
          <p className="mt-2 text-sm font-black leading-5 text-[#0E1A34]">SMK Antartika 1 Sidoarjo</p>
          <button className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#058447]">
            Ganti Tenant
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="rounded-[16px] border border-[#E2E8EC] bg-white p-3">
          <div className="flex items-center gap-3">
            <div className="relative size-11 overflow-hidden rounded-full bg-[#DDF6E7]">
              <Image
                src="/landing/beranda/admin.png"
                alt="Admin Utama"
                fill
                sizes="44px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-black text-[#0E1A34]">Admin Utama</p>
              <p className="truncate text-xs font-medium text-[#647086]">Super Admin</p>
            </div>
            <ChevronDown className="size-4 text-[#0E1A34]" />
          </div>
        </div>

        <button className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#0E1A34] transition hover:bg-[#F3F8F5]">
          <LogOut className="size-5" />
          Logout
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
          Dashboard Admin
        </h1>
        <p className="hidden truncate text-base font-black text-[#058447] min-[1700px]:block">
          Menghubungkan potensi, mewujudkan mandiri - pusat kontrol ekosistem SyncVoca
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 2xl:gap-5">
        <button className="hidden size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3] md:inline-flex">
          <Search className="size-6" />
        </button>
        <button className="relative hidden size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3] md:inline-flex">
          <Bell className="size-6" />
          <span className="absolute right-0.5 top-0 flex size-5 items-center justify-center rounded-full bg-[#EF3333] text-[10px] font-black text-white">
            8
          </span>
        </button>
        <button className="hidden size-10 items-center justify-center rounded-full text-[#009D55] transition hover:bg-[#F0F5F3] 2xl:inline-flex">
          <ShieldCheck className="size-7" />
        </button>
        <span className="hidden h-9 w-px bg-[#E2E8EC] 2xl:block" />
        <button className="hidden size-10 items-center justify-center rounded-full text-[#0E1A34] transition hover:bg-[#F0F5F3] 2xl:inline-flex">
          <HelpCircle className="size-6" />
        </button>
        <span className="hidden h-9 w-px bg-[#E2E8EC] 2xl:block" />
        <button className="flex items-center gap-3 rounded-full px-1 py-1 transition hover:bg-[#F3F8F5]">
          <div className="relative size-11 overflow-hidden rounded-full bg-[#DDF6E7]">
            <Image
              src="/landing/beranda/admin.png"
              alt="Admin Utama"
              fill
              sizes="44px"
              className="object-cover object-top"
            />
          </div>
          <span className="hidden text-sm font-black text-[#0E1A34] 2xl:inline">Admin Utama</span>
          <ChevronDown className="hidden size-4 text-[#0E1A34] sm:block" />
        </button>
      </div>
    </div>
  );
}

function HeroAndActions() {
  return (
    <div className="grid gap-5 2xl:grid-cols-[1fr_0.4fr]">
      <section className="relative overflow-hidden rounded-[20px] border border-[#D5E7DD] bg-gradient-to-r from-[#F6FCF8] via-[#ECF8F2] to-[#F8FCFA] px-6 py-7 shadow-sm lg:px-8">
        <div className="grid min-h-[216px] gap-6 lg:grid-cols-[1fr_0.56fr] lg:items-center">
          <div className="relative z-10">
            <h2 className="text-[31px] font-black leading-tight tracking-[-0.02em] text-[#0E1A34]">
              Selamat datang, Admin Utama! <span aria-hidden>👋</span>
            </h2>
            <p className="mt-5 max-w-[720px] text-[17px] font-medium leading-8 text-[#26344A]">
              Anda berada di pusat kontrol ekosistem SyncVoca. Pastikan data aman,
              consent terkelola, dan peluang inklusif terus terbuka.
            </p>

            <div className="mt-9 grid max-w-[580px] gap-4 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[#DDECE2] bg-white/90 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <UsersRound className="size-6 text-[#058447]" />
                  <div>
                    <p className="text-xs font-black text-[#058447]">Tenant Aktif</p>
                    <p className="mt-1 text-sm font-black text-[#0E1A34]">
                      SMK Antartika 1 Sidoarjo
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[16px] border border-[#FFD6D6] bg-[#FFF0F0] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#F04444] text-white">
                    <ShieldAlert className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-black text-[#D93030]">Risiko Utama Hari Ini</p>
                    <p className="mt-1 text-sm font-black text-[#D93030]">
                      12 consent pending perlu ditindaklanjuti
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden h-[230px] lg:block">
            <div className="absolute right-2 top-4 h-40 w-72 rounded-xl border border-[#CDE5DA] bg-white/80 p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="size-14 rounded-full bg-[#DDF6E7]" />
                <div className="space-y-2">
                  <div className="h-3 w-28 rounded bg-[#C9E7D5]" />
                  <div className="h-3 w-40 rounded bg-[#E4F1EA]" />
                  <div className="h-3 w-24 rounded bg-[#E4F1EA]" />
                </div>
              </div>
              <div className="mt-6 flex items-end gap-3">
                <span className="h-10 w-4 rounded bg-[#B9E1C7]" />
                <span className="h-16 w-4 rounded bg-[#8CCEA6]" />
                <span className="h-8 w-4 rounded bg-[#D8EFE0]" />
                <ShieldCheck className="ml-5 size-16 text-[#9ECDB1]" />
              </div>
            </div>
            <div className="absolute bottom-0 left-3 h-24 w-40 rounded-t-full bg-[#CBEED6]/80" />
            <Image
              src="/landing/beranda/admin.png"
              alt="Ilustrasi admin SyncVoca"
              width={240}
              height={240}
              className="absolute bottom-[-18px] left-0 h-[235px] w-auto object-contain"
              priority
            />
            <div className="absolute bottom-2 left-28 rounded-lg bg-[#1D2430] px-7 py-4 text-lg font-black text-white shadow-lg">
              SyncVoca
            </div>
          </div>
        </div>
      </section>

      <SectionCard className="p-5 lg:p-6">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">Aksi Cepat</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className={cn(
                  "flex min-h-[86px] flex-col items-center justify-center rounded-xl border text-center text-sm font-black transition hover:-translate-y-0.5",
                  toneClasses[action.tone].soft,
                  toneClasses[action.tone].border,
                )}
              >
                <Icon className={cn("mb-2 size-6", toneClasses[action.tone].text)} />
                {action.label}
              </button>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

function SummarySection() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <h2 className="mb-5 text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
        Ringkasan Ekosistem Hari Ini
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 min-[1800px]:grid-cols-8">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="min-h-[132px] rounded-[18px] border border-[#E2E8EC] bg-white p-5 shadow-[0_12px_40px_rgba(15,31,50,0.035)] min-[1800px]:p-4 2xl:p-5"
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
                <span className={card.trend === "up" ? "text-[#009D55]" : "text-[#EF3333]"}>
                  {card.trend === "up" ? "↗" : "↓"}
                </span>
                {card.delta}
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}

function RiskPanel() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
          Risk & Alert Panel
        </h2>
        <SmallLink>Lihat Semua</SmallLink>
      </div>
      <div className="space-y-3">
        {risks.map((risk) => {
          const Icon = risk.icon;
          return (
            <button
              key={risk.title}
              className={cn(
                "flex min-h-[64px] w-full items-center gap-4 rounded-xl border px-4 text-left transition hover:-translate-y-0.5",
                toneClasses[risk.tone].soft,
                toneClasses[risk.tone].border,
              )}
            >
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", toneClasses[risk.tone].icon)}>
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-sm font-black", toneClasses[risk.tone].text)}>
                  {risk.title}
                </span>
                <span className="mt-1 block text-xs font-medium text-[#4E5B6E]">{risk.desc}</span>
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/75 text-xs font-black">
                {risk.count}
              </span>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}

function Donut({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "relative flex size-[142px] items-center justify-center rounded-full",
          className,
        )}
      >
        <div className="flex size-[82px] flex-col items-center justify-center rounded-full bg-white shadow-sm">
          <p className="text-2xl font-black text-[#0E1A34]">{value}</p>
          <p className="text-xs font-semibold text-[#4E5B6E]">{label}</p>
        </div>
      </div>
    </div>
  );
}

function EcosystemSnapshot() {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black tracking-[-0.01em] text-[#0E1A34]">
          Ekosistem Snapshot
        </h2>
        <SmallLink>Lihat Detail</SmallLink>
      </div>
      <div className="grid gap-4 min-[1500px]:grid-cols-2">
        <div className="rounded-xl border border-[#E2E8EC] bg-white p-5">
          <p className="text-sm font-black text-[#0E1A34]">Distribusi Sekolah per Wilayah</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[0.9fr_1fr] sm:items-center">
            <Donut
              value="48"
              label="Sekolah"
              className="bg-[conic-gradient(#1E9FEA_0_37%,#00A86B_37%_62%,#F7B500_62%_79%,#FF8A1F_79%_92%,#74B6FF_92%_100%)]"
            />
            <div className="space-y-2">
              {regionDistribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 text-xs font-semibold text-[#0E1A34]">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8EC] bg-white p-5">
          <p className="text-sm font-black text-[#0E1A34]">DUDI per Industri</p>
          <div className="mt-5 space-y-3">
            {dudiIndustries.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_120px_28px] items-center gap-3 text-xs font-semibold">
                <span className="truncate text-[#0E1A34]">{item.label}</span>
                <span className="h-3 overflow-hidden rounded-full bg-[#EDF2F4]">
                  <span
                    className="block h-full rounded-full bg-[#7AA09B]"
                    style={{ width: `${Math.max(24, (item.value / 42) * 100)}%` }}
                  />
                </span>
                <span className="text-right text-[#0E1A34]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8EC] bg-white p-5">
          <p className="text-sm font-black text-[#0E1A34]">Siswa per Tahap Journey</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[0.9fr_1fr] sm:items-center">
            <Donut
              value="2.418"
              label="Siswa"
              className="bg-[conic-gradient(#009D55_0_17%,#F7B500_17%_41%,#FF8A1F_41%_64%,#8750C8_64%_86%,#4FA7E8_86%_100%)]"
            />
            <div className="space-y-2">
              {journeyDistribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 text-xs font-semibold text-[#0E1A34]">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8EC] bg-white p-5">
          <p className="text-sm font-black text-[#0E1A34]">Progress Validation Seal</p>
          <div className="relative mt-6 h-[150px] overflow-hidden rounded-xl bg-[linear-gradient(to_right,#E6ECEF_1px,transparent_1px),linear-gradient(to_bottom,#E6ECEF_1px,transparent_1px)] bg-[size:20%_33%]">
            <svg viewBox="0 0 300 140" className="absolute inset-0 h-full w-full" role="img" aria-label="Progress validation seal">
              <polyline
                points="15,105 58,78 100,62 142,54 184,45 226,25 285,18"
                fill="none"
                stroke="#009D55"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {[ [15,105], [58,78], [100,62], [142,54], [184,45], [226,25], [285,18] ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#009D55" stroke="white" strokeWidth="3" />
              ))}
            </svg>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-[#E9F8EF] px-5 py-4 text-center text-[#058447]">
              <p className="text-2xl font-black">342</p>
              <p className="text-xs font-black">Total Seal</p>
            </div>
          </div>
          <div className="mt-2 flex justify-between px-1 text-xs font-medium text-[#647086]">
            {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
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
                "flex min-h-[76px] items-center gap-4 bg-white px-4 py-3",
                index > 0 && "border-t border-[#E7ECEF]",
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border",
                  toneClasses[activity.tone].soft,
                  toneClasses[activity.tone].border,
                )}
              >
                <Icon className={cn("size-5", toneClasses[activity.tone].text)} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#0E1A34]">{activity.title}</p>
                <p className="mt-1 truncate text-xs font-medium text-[#4E5B6E]">{activity.desc}</p>
              </div>
              <p className="shrink-0 text-xs font-medium text-[#4E5B6E]">{activity.time}</p>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function HealthSection() {
  return (
    <section className="rounded-[22px] border border-[#DCEEE3] bg-gradient-to-r from-[#EEF9F2] via-white to-[#F6FCF8] p-6 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1fr_2.2fr] lg:items-center">
        <div className="flex items-center gap-5">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#009D55] text-white">
            <ShieldCheck className="size-9" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-[#058447]">Kesehatan Ekosistem</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-[#26344A]">
              Ekosistem SyncVoca berjalan aman dan sehat. Terus jaga consent,
              validasi, dan kolaborasi inklusif.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1760px]:grid-cols-5">
          {healthCards.map((item) => (
            <div key={item.label} className="rounded-xl border border-[#DDECE2] bg-white/85 p-4">
              <p className="text-xs font-medium text-[#4E5B6E]">{item.label}</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-black text-[#058447]">
                <CheckIcon />
                {item.value}
              </p>
            </div>
          ))}
          <div className="rounded-xl border border-[#DDECE2] bg-white/85 p-4">
            <p className="text-xs font-medium text-[#4E5B6E]">Last Sync</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-[#0E1A34]">12 Jun 2025, 08:45 WIB</p>
              <RefreshCw className="size-5 text-[#058447]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="inline-flex size-5 items-center justify-center rounded-full border border-[#009D55] text-[#009D55]">
      <span className="size-2 rounded-full bg-[#009D55]" />
    </span>
  );
}

export function AdminBerandaDashboard() {
  return (
    <DashboardShell desktopSidebar={<Sidebar />} mobileSidebar={<Sidebar variant="mobile" />}>
      <TopBar />
      <div
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-5 px-4 py-5 sm:px-6 2xl:px-8">
          <HeroAndActions />
          <SummarySection />
          <div className="grid gap-5 min-[1760px]:grid-cols-[0.75fr_1.18fr_1fr]">
            <RiskPanel />
            <EcosystemSnapshot />
            <ActivityPanel />
          </div>
          <HealthSection />
        </div>
      </div>
    </DashboardShell>
  );
}
