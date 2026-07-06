import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  LockKeyhole,
  Route,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import type { AppRole, PageSpec, PageSurface } from "@/lib/routes";
import { cn } from "@/lib/utils";

const surfaceCopy: Record<PageSurface, string> = {
  auth: "Auth flow",
  dashboard: "Dashboard web",
  governance: "Governance dashboard",
  landing: "Landing",
  "mobile-pwa": "Mobile PWA",
};

const roleAccent: Record<AppRole, string> = {
  admin: "text-danger bg-red-50 border-red-100",
  auth: "text-accent-blue bg-blue-50 border-blue-100",
  dudi: "text-achievement bg-amber-50 border-amber-100",
  guru: "text-accent-blue bg-blue-50 border-blue-100",
  "orang-tua": "text-purple-700 bg-purple-50 border-purple-100",
  public: "text-brand-700 bg-brand-50 border-brand-100",
  siswa: "text-brand-700 bg-brand-50 border-brand-100",
};

const surfaceIcon: Record<PageSurface, typeof LayoutDashboard> = {
  auth: LockKeyhole,
  dashboard: LayoutDashboard,
  governance: ShieldCheck,
  landing: Route,
  "mobile-pwa": Smartphone,
};

type RoutePlaceholderPageProps = {
  page: PageSpec;
};

export function RoutePlaceholderPage({ page }: RoutePlaceholderPageProps) {
  const Icon = surfaceIcon[page.surface];

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-6 sm:px-8 lg:py-10">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-border-soft bg-surface px-4 text-sm font-semibold text-foreground shadow-sm"
          >
            <ArrowRight className="size-4 rotate-180 text-brand-600" />
            Beranda
          </Link>
          <span
            className={cn(
              "inline-flex min-h-9 items-center rounded-full border px-3 text-xs font-semibold",
              roleAccent[page.role],
            )}
          >
            {surfaceCopy[page.surface]}
          </span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-[28px] border border-border-soft bg-surface p-6 shadow-[0_24px_70px_rgba(18,32,51,0.08)] sm:p-8">
            <div className="mb-7 inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon className="size-7" />
            </div>
            <p className="mb-3 text-sm font-semibold text-brand-700">{page.eyebrow}</p>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              {page.description}
            </p>

            {page.primaryAction ? (
              <Link
                href={page.primaryAction.href}
                className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(11,111,49,0.22)] transition hover:bg-brand-700"
              >
                {page.primaryAction.label}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>

          <aside className="rounded-[28px] border border-border-soft bg-surface p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold text-foreground">Checkpoint implementasi</p>
            <div className="mt-4 grid gap-3">
              {page.checkpoints.map((checkpoint) => (
                <div
                  key={checkpoint}
                  className="flex items-start gap-3 rounded-2xl border border-border-soft bg-background p-3"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" />
                  <span className="text-sm leading-6 text-ink-muted">{checkpoint}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {page.narrative.map((item, index) => (
            <article
              key={item}
              className="rounded-[24px] border border-border-soft bg-surface p-5 shadow-sm"
            >
              <span className="mb-4 inline-flex size-9 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                {index + 1}
              </span>
              <p className="text-sm leading-7 text-ink-muted">{item}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
