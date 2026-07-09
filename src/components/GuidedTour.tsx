import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

export interface GuidedTourStep {
  selector: string;
  title: string;
  body: string;
  voice?: string;
  audioSrc?: string;
}

interface GuidedTourProps {
  enabled: boolean;
  storageKey: string;
  playOnceKey?: string;
  replaySignal: number;
  steps: GuidedTourStep[];
  voiceIntro: string;
  voiceEnabled?: boolean;
  onVoiceEnabledChange?: (enabled: boolean) => void;
}

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const getStoredVoicePreference = () => {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem("sv_tour_voice") !== "off";
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const DEFAULT_PLAY_ONCE_KEY = "sv-guide-played-once";

const VOCI_VOICE_PROFILE = {
  lang: "id-ID",
  pitch: 1.42,
  rate: 1.03,
  volume: 1,
};

const getVoiceScore = (voice: SpeechSynthesisVoice) => {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;

  if (lang === "id-id") score += 80;
  else if (lang.startsWith("id")) score += 65;
  else if (lang.startsWith("ms")) score += 24;
  else if (lang.startsWith("en")) score += 8;

  if (name.includes("male") || name.includes("pria") || name.includes("boy")) {
    score += 22;
  }
  if (
    name.includes("child") ||
    name.includes("kid") ||
    name.includes("young") ||
    name.includes("anak")
  ) {
    score += 26;
  }
  if (
    name.includes("female") ||
    name.includes("wanita") ||
    name.includes("girl")
  ) {
    score -= 12;
  }
  if (voice.localService) score += 4;

  return score;
};

const getBestVociVoice = (voices: SpeechSynthesisVoice[]) =>
  voices
    .filter((voice) => voice.lang)
    .sort((first, second) => getVoiceScore(second) - getVoiceScore(first))[0];

export default function GuidedTour({
  enabled,
  storageKey,
  playOnceKey = DEFAULT_PLAY_ONCE_KEY,
  replaySignal,
  steps,
  voiceIntro,
  voiceEnabled,
  onVoiceEnabledChange,
}: GuidedTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [localVoiceEnabled, setLocalVoiceEnabled] = useState(
    getStoredVoicePreference,
  );
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeStep = steps[activeIndex];
  const totalSteps = steps.length;
  const isVoiceActive = voiceEnabled ?? localVoiceEnabled;

  const voiceText = useMemo(() => {
    if (!activeStep) return "";
    return activeIndex === 0
      ? `${voiceIntro} ${activeStep.voice || activeStep.body}`
      : activeStep.voice || activeStep.body;
  }, [activeIndex, activeStep, voiceIntro]);

  const stopCurrentVoice = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis?.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const speakWithBrowserVoice = (text: string) => {
    if (typeof window === "undefined") return;
    const speech = window.speechSynthesis;
    if (!speech || !text) return;

    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOCI_VOICE_PROFILE.lang;
    utterance.rate = VOCI_VOICE_PROFILE.rate;
    utterance.pitch = VOCI_VOICE_PROFILE.pitch;
    utterance.volume = VOCI_VOICE_PROFILE.volume;

    const voices = availableVoices.length
      ? availableVoices
      : speech.getVoices();
    const vociVoice = getBestVociVoice(voices);
    if (vociVoice) {
      utterance.voice = vociVoice;
      utterance.lang = vociVoice.lang || VOCI_VOICE_PROFILE.lang;
    }

    speech.speak(utterance);
  };

  const setTourVoiceEnabled = (nextEnabled: boolean) => {
    setLocalVoiceEnabled(nextEnabled);
    onVoiceEnabledChange?.(nextEnabled);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sv_tour_voice", nextEnabled ? "on" : "off");
    }
    if (!nextEnabled) stopCurrentVoice();
  };

  const speak = (text: string, audioSrc?: string) => {
    if (!isVoiceActive || typeof window === "undefined") return;
    stopCurrentVoice();

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.preload = "auto";
      audioRef.current = audio;

      const fallbackToBrowserVoice = () => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          speakWithBrowserVoice(text);
        }
      };

      audio.addEventListener("error", fallbackToBrowserVoice, { once: true });
      audio.addEventListener(
        "ended",
        () => {
          if (audioRef.current === audio) audioRef.current = null;
        },
        { once: true },
      );

      audio.play().catch(fallbackToBrowserVoice);
      return;
    }

    speakWithBrowserVoice(text);
  };

  const speakCurrentPage = () => {
    if (typeof document === "undefined") return;
    const main = document.querySelector("main");
    if (!main) return;

    const readableNodes = Array.from(
      main.querySelectorAll<HTMLElement>(
        "h1,h2,h3,p,li,dt,dd,[data-voice-readable]",
      ),
    );
    const seen = new Set<string>();
    const readableText = readableNodes
      .map((node) => node.innerText || node.textContent || "")
      .map((text) => text.replace(/\s+/g, " ").trim())
      .filter((text) => {
        if (!text || text.length < 3 || seen.has(text)) return false;
        seen.add(text);
        return true;
      })
      .join(". ")
      .slice(0, 1800);

    if (readableText) {
      speak(`Ringkasan teks pada halaman ini. ${readableText}`);
    }
  };

  const startTour = (force = false) => {
    if (!enabled || !steps.length || typeof window === "undefined") return;
    if (
      !force &&
      (window.localStorage.getItem(playOnceKey) === "done" ||
        window.localStorage.getItem(storageKey) === "done")
    ) {
      return;
    }
    setActiveIndex(0);
    setIsOpen(true);
  };

  const closeTour = (markDone = true) => {
    if (typeof window !== "undefined") {
      stopCurrentVoice();
      if (markDone) {
        window.localStorage.setItem(storageKey, "done");
        window.localStorage.setItem(playOnceKey, "done");
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    startTour(false);
    return () => {
      stopCurrentVoice();
    };
    // Auto-play is global: one guided tour is enough until the user replays it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, storageKey, playOnceKey]);

  useEffect(() => {
    if (replaySignal > 0) startTour(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replaySignal]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const speech = window.speechSynthesis;
    const syncVoices = () => setAvailableVoices(speech.getVoices());

    syncVoices();
    speech.addEventListener?.("voiceschanged", syncVoices);
    return () => {
      speech.removeEventListener?.("voiceschanged", syncVoices);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !activeStep || typeof window === "undefined") return;

    const updateSpotlight = () => {
      const target = document.querySelector(activeStep.selector);
      if (!target) {
        setSpotlight(null);
        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      window.setTimeout(() => {
        const rect = target.getBoundingClientRect();
        const padding = 10;
        setSpotlight({
          top: clamp(rect.top - padding, 12, window.innerHeight - 80),
          left: clamp(rect.left - padding, 12, window.innerWidth - 80),
          width: clamp(rect.width + padding * 2, 56, window.innerWidth - 24),
          height: clamp(rect.height + padding * 2, 56, window.innerHeight - 24),
        });
      }, 280);
    };

    updateSpotlight();
    window.addEventListener("resize", updateSpotlight);
    window.addEventListener("scroll", updateSpotlight, true);
    return () => {
      window.removeEventListener("resize", updateSpotlight);
      window.removeEventListener("scroll", updateSpotlight, true);
    };
  }, [activeStep, isOpen]);

  useEffect(() => {
    if (isOpen) speak(voiceText, activeStep?.audioSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, activeStep?.audioSrc, isOpen, voiceText, isVoiceActive]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sv_tour_voice", isVoiceActive ? "on" : "off");
      if (!isVoiceActive) stopCurrentVoice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoiceActive]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeTour();
        return;
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => Math.max(0, current - 1));
        return;
      }
      if (event.key === "ArrowRight") {
        if (activeIndex >= totalSteps - 1) {
          closeTour();
          return;
        }
        setActiveIndex((current) => current + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isOpen, totalSteps]);

  if (!isOpen || !activeStep) return null;

  const target = spotlight || {
    top: window.innerHeight * 0.22,
    left: window.innerWidth * 0.08,
    width: window.innerWidth * 0.84,
    height: 120,
  };
  const gap = 12;
  const panelWidth = Math.min(420, window.innerWidth - 32);
  const placeBelow = target.top + target.height + 260 < window.innerHeight;
  const panelTop = placeBelow
    ? target.top + target.height + gap
    : Math.max(16, target.top - 250 - gap);
  const panelLeft = clamp(
    target.left + target.width / 2 - panelWidth / 2,
    16,
    window.innerWidth - panelWidth - 16,
  );

  return (
    <div className="fixed inset-0 z-[90] print:hidden" aria-live="polite">
      <div
        className="fixed left-0 top-0 bg-[#07130d]/60 backdrop-blur-[1.5px]"
        style={{ width: "100%", height: target.top }}
      />
      <div
        className="fixed left-0 bg-[#07130d]/60 backdrop-blur-[1.5px]"
        style={{
          top: target.top,
          width: target.left,
          height: target.height,
        }}
      />
      <div
        className="fixed bg-[#07130d]/60 backdrop-blur-[1.5px]"
        style={{
          top: target.top,
          left: target.left + target.width,
          width: `calc(100% - ${target.left + target.width}px)`,
          height: target.height,
        }}
      />
      <div
        className="fixed left-0 bg-[#07130d]/60 backdrop-blur-[1.5px]"
        style={{
          top: target.top + target.height,
          width: "100%",
          height: `calc(100% - ${target.top + target.height}px)`,
        }}
      />

      <div
        className="pointer-events-none fixed rounded-[1.35rem] border-2 border-[#22c55e] shadow-[0_0_0_6px_rgba(34,197,94,0.22),0_24px_70px_rgba(0,0,0,0.22)]"
        style={target}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Tur panduan SyncVoca"
        className="fixed rounded-[1.35rem] border border-[#cfe4d5] bg-white p-4 text-[#10203b] shadow-2xl sm:p-5"
        style={{ top: panelTop, left: panelLeft, width: panelWidth }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#12843a]">
              Panduan {activeIndex + 1}/{totalSteps}
            </p>
            <h2 className="mt-1 font-display text-xl font-black leading-tight">
              {activeStep.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => closeTour()}
            className="rounded-full border border-[#dbe7dd] p-2 text-[#17351f] transition hover:bg-[#eef8f0]"
            aria-label="Tutup tur"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-sm font-medium leading-relaxed text-[#4c6257]">
          {activeStep.body}
        </p>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e8f3ec]">
          <div
            className="h-full rounded-full bg-[#12843a] transition-all"
            style={{ width: `${((activeIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="mt-4 flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTourVoiceEnabled(!isVoiceActive)}
              className="inline-flex items-center gap-2 rounded-full border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
            >
              {isVoiceActive ? (
                <Volume2 className="h-4 w-4 text-[#12843a]" />
              ) : (
                <VolumeX className="h-4 w-4 text-[#61746a]" />
              )}
              {isVoiceActive ? "Suara aktif" : "Suara mati"}
            </button>
            <button
              type="button"
              onClick={() => speak(voiceText, activeStep.audioSrc)}
              disabled={!isVoiceActive}
              className="rounded-full px-3 py-2 text-xs font-black text-[#12843a] transition hover:bg-[#eef8f0] disabled:cursor-not-allowed disabled:text-[#9ba9a1] disabled:hover:bg-transparent"
            >
              Dengar ulang
            </button>
            <button
              type="button"
              onClick={speakCurrentPage}
              disabled={!isVoiceActive}
              className="rounded-full px-3 py-2 text-xs font-black text-[#12843a] transition hover:bg-[#eef8f0] disabled:cursor-not-allowed disabled:text-[#9ba9a1] disabled:hover:bg-transparent"
            >
              Baca halaman
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
              disabled={activeIndex === 0}
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-black text-[#61746a] transition hover:bg-[#f8faf7] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => closeTour()}
              className="rounded-full px-3 py-2 text-xs font-black text-[#61746a] transition hover:bg-[#f8faf7]"
            >
              Lewati
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeIndex >= totalSteps - 1) {
                  closeTour();
                  return;
                }
                setActiveIndex((current) => current + 1);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#12843a] px-4 py-2 text-xs font-black text-white transition hover:bg-[#0b5d2a]"
            >
              {activeIndex >= totalSteps - 1 ? "Selesai" : "Lanjut"}
              {activeIndex >= totalSteps - 1 ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
