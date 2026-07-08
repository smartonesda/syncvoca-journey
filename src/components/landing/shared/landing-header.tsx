"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Menu, X } from "lucide-react";
import { demoPortalUrl } from "@/lib/external-links";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Cara Kerja", href: "/cara-kerja" },
  { label: "Ekosistem", href: "/#ekosistem" },
  { label: "Bukti Kerja", href: "/#bukti-kerja" },
  { label: "Keamanan Data", href: "/#keamanan-data" },
  { label: "Untuk Siapa", href: "/#untuk-siapa" },

  { label: "Kontak", href: "/#kontak" },
];

const compactNavItems = navItems.filter((item) =>
  ["Beranda", "Tentang Kami", "Cara Kerja", "Ekosistem"].includes(item.label),
);
const compactNavLabels = new Set(compactNavItems.map((item) => item.label));

type LandingHeaderProps = {
  activeLabel?: string;
};

export function LandingHeader({ activeLabel = "Beranda" }: LandingHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrolled = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 8);

      if (currentScrollY <= 12) {
        setIsHeaderVisible(true);
      } else if (currentScrollY < lastScrollY - 4) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY + 4) {
        setIsHeaderVisible(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const shouldShowHeader = isHeaderVisible || isOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-[#e5eee8] bg-white/95 shadow-[0_10px_24px_rgba(17,28,51,0.04)] backdrop-blur transition-transform duration-300 ease-out will-change-transform",
          shouldShowHeader ? "translate-y-0" : "-translate-y-full",
          isScrolled && "shadow-[0_12px_30px_rgba(17,28,51,0.08)]",
        )}
      >
        <nav className="mx-auto flex min-h-20 w-full max-w-screen-2xl items-center gap-3 px-4 sm:px-6 lg:px-8 2xl:px-10">
          <Link
            href="/"
            onClick={closeMenu}
            className="focus-ring flex min-w-0 shrink items-center gap-3 rounded-2xl lg:shrink-0"
          >
            <Image
              src="/landing/beranda/syncvoca-mark.webp"
              alt="SyncVoca"
              width={52}
              height={52}
              className="size-10 shrink-0 rounded-xl object-cover sm:size-11"
              priority
            />
            <div className="min-w-0 leading-none">
              <p className="truncate text-xl font-extrabold leading-none tracking-normal text-[#111c33] sm:text-2xl">
                SyncVoca
              </p>
              <p className="mt-1 block truncate text-xs font-semibold text-[#24304b]">
                Bukti Kerja, Masa Depan, Bersama.
              </p>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex 2xl:hidden">
            {compactNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href as Route}
                className={cn(
                  "focus-ring relative whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold text-[#111c33] transition hover:text-[#008a4a]",
                  item.label === activeLabel &&
                    "text-[#008a4a] after:absolute after:inset-x-4 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-[#24bf79]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 2xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href as Route}
                className={cn(
                  "focus-ring relative whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold text-[#111c33] transition hover:text-[#008a4a]",
                  item.label === activeLabel &&
                    "text-[#008a4a] after:absolute after:inset-x-4 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-[#24bf79]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
            <Link
              href="/login"
              className="focus-ring hidden min-h-11 items-center justify-center rounded-xl border border-[#13a966] bg-white px-5 text-sm font-extrabold text-[#008a4a] transition hover:bg-[#effaf4] 2xl:inline-flex"
            >
              Masuk
            </Link>
            <a
              href={demoPortalUrl}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl bg-[#008a4a] px-5 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(0,138,74,0.18)] transition hover:bg-[#006d3b] 2xl:px-6"
            >
              Masuk Portal Demo
            </a>
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="landing-mobile-menu"
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            onClick={() => setIsOpen((value) => !value)}
            className="focus-ring ml-auto inline-flex min-h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#d7e7de] bg-white px-0 text-[#111c33] shadow-sm transition hover:bg-[#effaf4] sm:w-auto sm:px-4 lg:ml-0 2xl:hidden"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="hidden text-sm font-extrabold sm:inline">
              Menu
            </span>
          </button>
        </nav>

        <div
          className={cn(
            "fixed inset-0 top-20 z-40 bg-[#0b1b16]/28 opacity-0 backdrop-blur-sm transition-opacity 2xl:hidden",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none",
          )}
          onClick={closeMenu}
        />

        <div
          id="landing-mobile-menu"
          className={cn(
            "fixed left-3 right-3 top-24 z-50 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-[#dbe9df] bg-white p-3 shadow-[0_24px_70px_rgba(17,28,51,0.18)] transition duration-200 sm:left-auto sm:w-96 lg:w-[22rem] xl:w-[24rem] 2xl:hidden",
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0",
          )}
        >
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href as Route}
                onClick={closeMenu}
                className={cn(
                  "focus-ring flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-extrabold text-[#111c33] transition hover:bg-[#effaf4] hover:text-[#008a4a]",
                  compactNavLabels.has(item.label) && "lg:hidden",
                  item.label === activeLabel && "bg-[#effaf4] text-[#008a4a]",
                )}
              >
                {item.label}
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-3 border-t border-[#e5eee8] pt-4 2xl:hidden">
            <Link
              href="/login"
              onClick={closeMenu}
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl border border-[#13a966] bg-white px-5 text-sm font-extrabold text-[#008a4a] transition hover:bg-[#effaf4]"
            >
              Masuk
            </Link>
            <a
              href={demoPortalUrl}
              onClick={closeMenu}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#008a4a] px-5 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(0,138,74,0.18)] transition hover:bg-[#006d3b] xl:hidden"
            >
              Masuk Portal Demo
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </header>
      <div aria-hidden="true" className="h-20" />
    </>
  );
}
