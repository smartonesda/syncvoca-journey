import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Mail, MapPin, Send } from "lucide-react";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Untuk Siswa", href: "/#untuk-siapa" },
      { label: "Untuk Guru", href: "/#untuk-siapa" },
      { label: "Untuk Orang Tua", href: "/#untuk-siapa" },
      { label: "Untuk DUDI", href: "/#untuk-siapa" },
      { label: "Untuk Admin", href: "/#untuk-siapa" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Cara Kerja", href: "/#cara-kerja" },
      { label: "Bukti Kerja", href: "/#bukti-kerja" },
      { label: "Keamanan Data", href: "/#keamanan-data" },
      { label: "Untuk Siapa", href: "/#untuk-siapa" },
      { label: "Ekosistem", href: "/#ekosistem" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Pusat Bantuan", href: "/#kontak" },
      { label: "Panduan Pengguna", href: "/#cara-kerja" },
      { label: "Video Tutorial", href: "/#cara-kerja" },
      { label: "FAQ", href: "/#kontak" },
    ],
  },
] as const;

export function LandingFooter() {
  return (
    <footer
      id="kontak"
      className="bg-[linear-gradient(135deg,#00603b_0%,#003f2a_100%)] text-white"
    >
      <div className="mx-auto grid w-full max-w-screen-2xl gap-9 px-5 py-10 sm:px-8 lg:grid-cols-6 xl:px-12">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/landing/beranda/syncvoca-mark.webp"
              alt="SyncVoca"
              width={54}
              height={54}
              className="size-12 rounded-xl object-cover"
            />
            <div>
              <p className="text-2xl font-extrabold leading-none">SyncVoca</p>
              <p className="mt-1 text-xs font-semibold text-white/78">
                Bukti Kerja, Masa Depan, Bersama.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm font-medium leading-7 text-white/82">
            Platform vokasi inklusif yang membantu ABK mengembangkan potensi,
            membangun portofolio kerja, dan terhubung dengan dunia industri
            secara aman.
          </p>
          <div className="mt-6 flex gap-4 text-white/90">
            {["ig", "wa", "yt", "in"].map((item) => (
              <span
                key={item}
                className="grid size-8 place-items-center rounded-full bg-white/8 text-xs font-bold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-base font-extrabold">{column.title}</h3>
            <ul className="mt-4 space-y-2">
              {column.links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as Route}
                    className="text-sm font-medium text-white/82 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-base font-extrabold">Kontak</h3>
          <div className="mt-4 space-y-3 text-sm font-medium leading-6 text-white/82">
            <p className="flex gap-2">
              <MapPin className="mt-1 size-4 shrink-0" />
              Jl. Pendidikan No. 1 Jakarta, Indonesia
            </p>
            <p className="flex gap-2">
              <Mail className="mt-1 size-4 shrink-0" />
              hello@syncvoca.id
            </p>
            <p>+62 21 1234 5678</p>
          </div>
        </div>

        <div>
          <h3 className="text-base font-extrabold">Dapatkan Update Terbaru</h3>
          <p className="mt-4 text-sm font-medium leading-6 text-white/82">
            Berlangganan untuk mendapatkan informasi terkini dari SyncVoca
            Journey.
          </p>
          <form className="mt-5 flex overflow-hidden rounded-xl border border-white/35 bg-white">
            <input
              type="email"
              aria-label="Email"
              placeholder="Masukkan email Anda"
              className="min-h-12 min-w-0 flex-1 px-4 text-sm font-medium text-[#111c33] outline-none"
            />
            <button
              type="submit"
              aria-label="Kirim email"
              className="grid min-h-12 w-14 place-items-center bg-[#009856] text-white"
            >
              <Send className="size-5" />
            </button>
          </form>
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-5 text-center text-xs font-medium text-white/75">
        &copy; 2025 SyncVoca Journey. All rights reserved.
      </p>
    </footer>
  );
}
