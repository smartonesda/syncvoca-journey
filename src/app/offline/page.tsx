import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <section className="w-full max-w-xl rounded-[28px] border border-border-soft bg-surface p-8 text-center shadow-[0_24px_70px_rgba(18,32,51,0.08)]">
        <div className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <WifiOff className="size-8" />
        </div>
        <p className="text-sm font-semibold text-brand-700">Mode offline</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground">
          Koneksi belum tersedia.
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-muted">
          Shell aplikasi masih bisa dibuka, tetapi data siswa, consent, audit, dan report
          membutuhkan koneksi karena tidak disimpan offline.
        </p>
        <Link
          href="/"
          className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white"
        >
          Kembali ke Beranda
        </Link>
      </section>
    </main>
  );
}
