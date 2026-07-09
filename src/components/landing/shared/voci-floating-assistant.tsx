"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { demoPortalUrl } from "@/lib/external-links";
import { cn } from "@/lib/utils";

type AnswerKey = "syncvoca" | "siswa" | "data";

const answers: Record<AnswerKey, string> = {
  syncvoca:
    "SyncVoca membantu siswa mengenal potensi, berlatih lewat simulasi, lalu menyusun bukti kerja yang bisa dipahami sekolah, orang tua, dan DUDI.",
  siswa:
    "Untuk siswa ABK, SyncVoca dibuat agar perjalanan belajar terasa bertahap: kenali diri, eksplorasi minat, latihan kerja, internship, lalu siap kerja.",
  data: "Data sensitif tetap dijaga. DUDI hanya melihat informasi publik yang relevan, berbasis consent, dan sudah aman untuk dibagikan.",
};

const quickActions: Array<
  | {
      label: string;
      kind: "answer";
      answer: AnswerKey;
    }
  | {
      label: string;
      kind: "link";
      href: Route;
    }
  | {
      label: string;
      kind: "external";
      href: string;
    }
> = [
  { label: "Apa itu SyncVoca?", kind: "answer", answer: "syncvoca" },
  { label: "Lihat cara kerja", kind: "link", href: "/cara-kerja" as Route },
  { label: "Untuk siswa ABK", kind: "answer", answer: "siswa" },
  { label: "Keamanan data", kind: "answer", answer: "data" },
  { label: "Masuk portal demo", kind: "external", href: demoPortalUrl },
];

export function VociFloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState<AnswerKey>("syncvoca");

  return (
    <div className="fixed bottom-3 right-3 z-40 sm:bottom-5 sm:right-5">
      <section
        aria-label="Chatbot Voci"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "absolute bottom-0 right-0 flex max-h-[min(82dvh,560px)] w-[min(calc(100vw-1.5rem),340px)] origin-bottom-right flex-col overflow-hidden rounded-[22px] border border-[#CFECDC] bg-white shadow-[0_24px_70px_rgba(4,41,27,0.22)] transition duration-300 ease-out sm:max-h-[min(80dvh,580px)] sm:w-[352px] sm:rounded-[24px]",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-95 opacity-0",
        )}
      >
        <div className="relative shrink-0 overflow-hidden bg-[linear-gradient(135deg,#EAF8EF_0%,#FFFFFF_58%,#DDF6E7_100%)] px-3.5 pb-3.5 pt-3.5 sm:px-4">
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-black text-[#058447] shadow-sm sm:text-xs">
                <Sparkles className="size-3.5" />
                Voci Assistant
              </div>
              <h2 className="mt-2.5 text-xl font-black tracking-[-0.03em] text-[#0E1A34] sm:mt-3 sm:text-2xl">
                Hai, aku Voci.
              </h2>
              <p className="mt-1.5 max-w-[188px] text-xs font-semibold leading-5 text-[#43526A] sm:mt-2 sm:max-w-[218px] ">
                Aku bantu kamu memahami perjalanan di SyncVoca.
              </p>
            </div>

            <button
              type="button"
              aria-label="Tutup Voci"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-[#D9E7DE] bg-white text-[#0E1A34] shadow-sm transition hover:bg-[#F3FBF6] sm:size-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>

          <Image
            src="/voci/raise-hand-half.png"
            alt="Voci menyapa"
            width={248}
            height={163}
            sizes="248px"
            className="sv-voci-wave pointer-events-none absolute -bottom-3 h-[7.5rem] w-auto select-none sm:-right-8 sm:h-[8.5rem]"
            priority={false}
            style={{
              right: "-3px",
            }}
          />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-y border-[#E2ECE6] bg-[#F8FCFA] px-3.5 py-2.5">
          <div className="flex items-center gap-2 text-[11px] font-black text-[#058447] sm:text-xs">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0A9B58] opacity-35" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#0A9B58]" />
            </span>
            Voci siap membantu
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[#0A9B58] px-3 py-1.5 text-[10px] font-black text-white">
            online
            <span className="sv-voci-dot" />
            <span className="sv-voci-dot sv-voci-dot-2" />
            <span className="sv-voci-dot sv-voci-dot-3" />
          </div>
        </div>

        <div className="sv-scrollbar-hidden min-h-0 flex-1 space-y-3 overflow-y-auto px-3.5 py-3 sm:px-4 sm:py-4">
          <div
            key={activeAnswer}
            className="sv-voci-message sv-voci-delay-1 rounded-2xl rounded-tl-md bg-[#F1F8F4] px-3.5 py-2.5 text-xs font-semibold leading-5 text-[#24304B] sm:px-4 sm:py-3 sm:text-sm sm:leading-6"
          >
            {answers[activeAnswer]}
          </div>

          <div className="sv-voci-message sv-voci-delay-2 rounded-2xl border border-[#E1EEE6] bg-white px-3.5 py-3 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#708093] sm:text-xs">
              Pilih bantuan cepat
            </p>
            <div className="mt-2 grid gap-1.5">
              {quickActions.map((item) => {
                if (item.kind === "answer") {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className={cn(
                        "flex min-h-10 w-full items-center justify-between gap-3 rounded-xl border px-3.5 text-left text-sm font-black transition",
                        activeAnswer === item.answer
                          ? "border-[#BDE8D0] bg-[#ECFAF2] text-[#058447]"
                          : "border-[#E2ECE6] bg-white text-[#0E1A34] hover:border-[#BDE8D0] hover:bg-[#F5FCF8]",
                      )}
                      onClick={() => setActiveAnswer(item.answer)}
                    >
                      {item.label}
                      <ArrowRight className="size-4 shrink-0" />
                    </button>
                  );
                }

                if (item.kind === "external") {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      data-page-transition="off"
                      className="flex min-h-10 w-full items-center justify-between gap-3 rounded-xl bg-[#009D55] px-3.5 text-left text-sm font-black text-white shadow-[0_12px_28px_rgba(0,157,85,0.2)] transition hover:bg-[#058447]"
                    >
                      {item.label}
                      <ArrowRight className="size-4 shrink-0" />
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex min-h-10 w-full items-center justify-between gap-3 rounded-xl border border-[#E2ECE6] bg-white px-3.5 text-left text-sm font-black text-[#0E1A34] transition hover:border-[#BDE8D0] hover:bg-[#F5FCF8]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t border-[#E2ECE6] bg-[#F8FCFA] px-3.5 py-2.5 text-[11px] font-bold leading-5 text-[#66758A] sm:px-4 sm:py-3 sm:text-xs">
          <ShieldCheck className="size-4 text-[#058447]" />
          Assistant ringan untuk panduan awal, bukan pengganti pendamping.
        </div>
      </section>

      <div
        className={cn(
          "flex items-end gap-2 transition duration-300 sm:gap-3",
          isOpen
            ? "pointer-events-none translate-y-3 scale-90 opacity-0"
            : "translate-y-0 scale-100 opacity-100",
        )}
      >
        <button
          type="button"
          aria-label="Buka chatbot Voci"
          className="sv-voci-float sv-voci-glow group relative grid size-14 place-items-center rounded-full border-[4px] border-white bg-[linear-gradient(135deg,#008A4A,#005D3A)] shadow-[0_18px_42px_rgba(0,72,43,0.28)] transition hover:-translate-y-1 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A9B58] sm:size-16 xl:size-[68px]"
          onClick={() => {
            setIsOpen(true);
            setActiveAnswer("syncvoca");
          }}
        >
          <Image
            src="/voci/head.png"
            alt="Voci"
            width={88}
            height={88}
            sizes="(max-width: 640px) 56px, 68px"
            className="size-full rounded-full object-cover transition duration-300 group-hover:scale-105"
            priority={false}
          />
          <span className="absolute -right-1 bottom-0 grid size-7 place-items-center rounded-full border-2 border-white bg-[#10A765] text-white shadow-lg sm:size-8">
            <MessageCircle className="size-3.5 sm:size-4" />
          </span>
          <span className="absolute -left-2 bottom-2 hidden max-w-[138px] -translate-x-full rounded-2xl rounded-br-sm border border-[#DCEEE3] bg-white px-3 py-2 text-left text-xs font-black leading-4 text-[#0E1A34] shadow-[0_14px_34px_rgba(4,41,27,0.12)] min-[1420px]:block">
            Tanya Voci
            <span className="mt-0.5 block font-semibold text-[#66758A]">
              Aku siap bantu.
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
