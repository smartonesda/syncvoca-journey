"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getVociDestination,
  isVociDestination,
  vociDestinations,
  type VociDestinationHref,
} from "@/lib/voci";

type PanelMode = "quick" | "chat";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  destination?: VociDestinationHref;
};

type VociApiResponse = {
  answer?: unknown;
  destination?: unknown;
  error?: unknown;
};

type VociPersistedState = {
  isOpen: boolean;
  mode: PanelMode;
  messages: ChatMessage[];
};

const sessionStorageKey = "sv_voci_session";
const stateStorageKey = "sv_voci_state";

const quickActions = vociDestinations.filter((destination) =>
  [
    "/tentang-kami",
    "/cara-kerja",
    "/bukti-kerja",
    "/untuk-siapa",
    "/keamanan-data",
    "/kontak",
  ].includes(destination.href),
);

const initialChat: ChatMessage[] = [
  {
    id: "voci-welcome",
    role: "assistant",
    content:
      "Halo, aku Voci! Tanya apa saja tentang SyncVoca, cara kerja, bukti kerja, peran pengguna, atau keamanan data.",
  },
];

function getSessionId() {
  const currentSessionId = window.sessionStorage.getItem(sessionStorageKey);
  if (currentSessionId) return currentSessionId;

  const sessionId = crypto.randomUUID();
  window.sessionStorage.setItem(sessionStorageKey, sessionId);
  return sessionId;
}

function loadPersistedState(): Partial<VociPersistedState> {
  try {
    const raw = window.sessionStorage.getItem(stateStorageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const state: Partial<VociPersistedState> = {};
    if (typeof parsed.isOpen === "boolean") state.isOpen = parsed.isOpen;
    if (parsed.mode === "quick" || parsed.mode === "chat")
      state.mode = parsed.mode;
    if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
      state.messages = parsed.messages as ChatMessage[];
    }
    return state;
  } catch {
    return {};
  }
}

function persistState(state: VociPersistedState) {
  try {
    window.sessionStorage.setItem(stateStorageKey, JSON.stringify(state));
  } catch {
    /* storage full — ignore */
  }
}

function VociAvatar({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/voci/head.png"
      alt="Voci"
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

export function VociFloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PanelMode>("quick");
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat);
  const [hydrated, setHydrated] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = loadPersistedState();
    if (saved.isOpen !== undefined) setIsOpen(saved.isOpen);
    if (saved.mode) setMode(saved.mode);
    if (saved.messages) setMessages(saved.messages);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistState({ isOpen, mode, messages });
  }, [hydrated, isOpen, mode, messages]);

  useEffect(() => {
    if (isOpen && mode === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isOpen, isSending, messages, mode]);

  useEffect(() => {
    if (isOpen && mode === "chat") {
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, mode]);

  const closeAssistant = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = draft.trim();
    if (!content || isSending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setDraft("");
    setIsSending(true);

    try {
      const response = await fetch("/api/voci", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          messages: nextMessages.slice(-8).map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });
      const payload = (await response.json()) as VociApiResponse;
      const answer = payload.answer;

      if (!response.ok || typeof answer !== "string") {
        throw new Error(
          typeof payload.error === "string"
            ? payload.error
            : "Voci sedang tidak tersedia. Coba lagi sebentar.",
        );
      }

      const destination =
        typeof payload.destination === "string" &&
        isVociDestination(payload.destination)
          ? payload.destination
          : undefined;

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer,
          destination,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Voci sedang tidak tersedia. Coba lagi sebentar.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const isChat = mode === "chat";

  return (
    <div className="fixed bottom-3 right-3 z-40 sm:bottom-5 sm:right-5">
      <section
        aria-label="Voci Assistant"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "absolute bottom-0 right-0 flex h-[min(82dvh,610px)] w-[min(calc(100vw-1.5rem),340px)] origin-bottom-right flex-col overflow-hidden rounded-[22px] border border-[#CFECDC] bg-white shadow-[0_24px_70px_rgba(4,41,27,0.22)] transition duration-300 ease-out sm:h-[min(80dvh,630px)] sm:w-[370px] sm:rounded-[24px]",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-95 opacity-0",
        )}
      >
        {/* Header: full in quick, compact in chat */}
        <div
          className={cn(
            "relative shrink-0 overflow-hidden transition-all duration-300 ease-out",
            isChat
              ? "border-b border-[#E2ECE6] bg-white px-3 py-2.5"
              : "bg-[linear-gradient(135deg,#EAF8EF_0%,#FFFFFF_58%,#DDF6E7_100%)] px-3.5 pb-3.5 pt-3.5 sm:px-4",
          )}
        >
          {isChat ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Kembali ke bantuan cepat"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-[#D9E7DE] bg-white text-[#43526A] transition hover:bg-[#F3FBF6]"
                onClick={() => setMode("quick")}
              >
                <ArrowLeft className="size-4" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <VociAvatar size={34} />
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-[#0A9B58]" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#0E1A34]">Voci</p>
                  <p className="text-[10px] font-semibold text-[#058447]">
                    online
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Tutup Voci"
                className="ml-auto grid size-8 shrink-0 place-items-center rounded-full border border-[#D9E7DE] bg-white text-[#0E1A34] transition hover:bg-[#F3FBF6]"
                onClick={closeAssistant}
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-black text-[#058447] shadow-sm sm:text-xs">
                    <Sparkles className="size-3.5" />
                    Voci Assistant
                  </div>
                  <h2 className="mt-2.5 text-xl font-black tracking-[-0.03em] text-[#0E1A34] sm:mt-3 sm:text-2xl">
                    Hai, aku Voci.
                  </h2>
                  <p className="mt-1.5 max-w-[188px] text-xs font-semibold leading-5 text-[#43526A] sm:mt-2 sm:max-w-[200px]">
                    Aku bantu memahami perjalanan di SyncVoca.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Tutup Voci"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-[#D9E7DE] bg-white text-[#0E1A34] shadow-sm transition hover:bg-[#F3FBF6] sm:size-10"
                  onClick={closeAssistant}
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
                style={{ right: "-3px" }}
              />
            </>
          )}
        </div>

        {/* Status bar: only in quick mode */}
        <div
          className={cn(
            "shrink-0 overflow-hidden transition-all duration-300 ease-out",
            isChat
              ? "max-h-0 border-y-0 py-0 opacity-0"
              : "max-h-16 border-y border-[#E2ECE6] bg-[#F8FCFA] px-3.5 py-2.5 opacity-100",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-black text-[#058447] sm:text-xs">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0A9B58] opacity-35" />
                <span className="relative inline-flex size-2.5 rounded-full bg-[#0A9B58]" />
              </span>
              Voci siap membantu
            </div>
            <span className="rounded-full bg-[#0A9B58] px-3 py-1.5 text-[10px] font-black text-white">
              online
            </span>
          </div>
        </div>

        {/* Mode tabs: only in quick mode */}
        <div
          className={cn(
            "shrink-0 overflow-hidden transition-all duration-300 ease-out",
            isChat
              ? "max-h-0 border-b-0 p-0 opacity-0"
              : "max-h-16 border-b border-[#E2ECE6] bg-white p-2 opacity-100",
          )}
        >
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              className={cn(
                "rounded-xl px-3 py-2 text-xs font-black transition",
                mode === "quick"
                  ? "bg-[#EAF8EF] text-[#058447]"
                  : "text-[#66758A] hover:bg-[#F5FCF8]",
              )}
              onClick={() => setMode("quick")}
            >
              Bantuan cepat
            </button>
            <button
              type="button"
              className={cn(
                "rounded-xl px-3 py-2 text-xs font-black transition",
                mode === "chat"
                  ? "bg-[#EAF8EF] text-[#058447]"
                  : "text-[#66758A] hover:bg-[#F5FCF8]",
              )}
              onClick={() => setMode("chat")}
            >
              Chat dengan Voci
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="relative min-h-0 flex-1">
          {/* Quick mode */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col transition-all duration-300 ease-out",
              isChat
                ? "pointer-events-none -translate-x-3 opacity-0"
                : "pointer-events-auto translate-x-0 opacity-100",
            )}
          >
            <div
              data-lenis-prevent
              className="sv-scrollbar-hidden min-h-0 flex-1 space-y-3 overflow-y-auto px-3.5 py-3 sm:px-4 sm:py-4"
            >
              <div className="sv-voci-message sv-voci-delay-1 rounded-2xl rounded-tl-md bg-[#F1F8F4] px-3.5 py-2.5 text-sm font-semibold leading-6 text-[#24304B]">
                Pilih topik, nanti aku arahkan ke halaman SyncVoca yang sesuai.
              </div>

              <div className="sv-voci-message sv-voci-delay-2 rounded-2xl border border-[#E1EEE6] bg-white px-3.5 py-3 shadow-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#708093] sm:text-xs">
                  Pilih bantuan cepat
                </p>
                <div className="mt-2 grid gap-1.5">
                  {quickActions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Route}
                      className="flex min-h-10 w-full items-center justify-between gap-3 rounded-xl border border-[#E2ECE6] bg-white px-3.5 text-left text-sm font-black text-[#0E1A34] transition hover:border-[#BDE8D0] hover:bg-[#F5FCF8]"
                      onClick={closeAssistant}
                    >
                      {item.label}
                      <ArrowRight className="size-4 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-[#009D55] px-3.5 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(0,157,85,0.2)] transition hover:bg-[#058447]"
                onClick={() => setMode("chat")}
              >
                Tanya Voci lewat chat
              </button>
            </div>
          </div>

          {/* Chat mode */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col transition-all duration-300 ease-out",
              isChat
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none translate-x-3 opacity-0",
            )}
          >
            <div
              data-lenis-prevent
              className="sv-scrollbar-hidden min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#FAFCFB] px-3.5 py-3 sm:px-4 sm:py-4"
            >
              {messages.map((message) => {
                const destination = message.destination
                  ? getVociDestination(message.destination)
                  : undefined;

                if (message.role === "assistant") {
                  return (
                    <div key={message.id} className="flex items-end gap-2">
                      <VociAvatar size={26} />
                      <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-[#F1F8F4] px-3.5 py-2.5 text-sm font-semibold leading-6 text-[#24304B]">
                        <p>{message.content}</p>
                        {destination ? (
                          <Link
                            href={destination.href as Route}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-black text-[#058447] transition hover:bg-[#EAF8EF]"
                            onClick={closeAssistant}
                          >
                            Buka {destination.label}
                            <ArrowRight className="size-3.5" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[82%] rounded-2xl rounded-br-md bg-[#0A9B58] px-3.5 py-2.5 text-sm font-semibold leading-6 text-white">
                      <p>{message.content}</p>
                    </div>
                  </div>
                );
              })}

              {isSending ? (
                <div className="flex items-end gap-2">
                  <VociAvatar size={26} />
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[#F1F8F4] px-4 py-3">
                    <span className="sv-voci-dot size-1.5 rounded-full bg-[#66758A]" />
                    <span className="sv-voci-dot sv-voci-dot-2 size-1.5 rounded-full bg-[#66758A]" />
                    <span className="sv-voci-dot sv-voci-dot-3 size-1.5 rounded-full bg-[#66758A]" />
                  </div>
                </div>
              ) : null}
              <div ref={chatEndRef} />
            </div>

            <form
              className="shrink-0 border-t border-[#E2ECE6] bg-[#F8FCFA] p-2.5"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="voci-chat-input">
                Tulis pesan untuk Voci
              </label>
              <div className="flex items-end gap-2 rounded-2xl border border-[#D8E9DE] bg-white p-1.5 focus-within:border-[#82CDA1] focus-within:ring-2 focus-within:ring-[#DDF4E7]">
                <textarea
                  ref={inputRef}
                  id="voci-chat-input"
                  value={draft}
                  maxLength={400}
                  rows={1}
                  placeholder="Tulis pesan..."
                  className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm font-medium text-[#0E1A34] outline-none placeholder:text-[#93A2B5]"
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || isSending}
                  aria-label="Kirim pesan ke Voci"
                  className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#009D55] text-white transition hover:bg-[#058447] disabled:cursor-not-allowed disabled:bg-[#A8CDB6]"
                >
                  <SendHorizontal className="size-4" />
                </button>
              </div>
              <p className="mt-1.5 px-1 text-[10px] font-semibold text-[#78879A]">
                Hanya untuk panduan SyncVoca. Jangan kirim data pribadi.
              </p>
            </form>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="flex shrink-0 items-center gap-2 border-t border-[#E2ECE6] bg-[#F8FCFA] px-3.5 py-2.5 text-[11px] font-bold leading-5 text-[#66758A] sm:px-4 sm:py-3 sm:text-xs">
          <ShieldCheck className="size-4 shrink-0 text-[#058447]" />
          Panduan awal, bukan pengganti pendamping atau layanan profesional.
        </div>
      </section>

      {/* Floating button */}
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
          onClick={() => setIsOpen(true)}
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
          <span className="absolute -right-4 bottom-0 grid size-7 place-items-center rounded-full border-2 border-white bg-[#10A765] text-white shadow-lg sm:size-8">
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
