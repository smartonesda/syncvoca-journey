import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Volume2, VolumeX, X } from "lucide-react";

export interface GuidedTourStep {
  selector: string;
  title: string;
  body: string;
  voice?: string;
}

interface GuidedTourProps {
  enabled: boolean;
  storageKey: string;
  replaySignal: number;
  steps: GuidedTourStep[];
  voiceIntro: string;
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

export default function GuidedTour({
  enabled,
  storageKey,
  replaySignal,
  steps,
  voiceIntro,
}: GuidedTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(getStoredVoicePreference);
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);

  const activeStep = steps[activeIndex];
  const totalSteps = steps.length;

  const voiceText = useMemo(() => {
    if (!activeStep) return "";
    return activeIndex === 0
      ? `${voiceIntro} ${activeStep.voice || activeStep.body}`
      : activeStep.voice || activeStep.body;
  }, [activeIndex, activeStep, voiceIntro]);

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;
    const speech = window.speechSynthesis;
    if (!speech || !text) return;

    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    const voices = speech.getVoices();
    const idVoice = voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("id"),
    );
    if (idVoice) utterance.voice = idVoice;

    speech.speak(utterance);
  };

  const startTour = (force = false) => {
    if (!enabled || !steps.length || typeof window === "undefined") return;
    if (!force && window.localStorage.getItem(storageKey) === "done") return;
    setActiveIndex(0);
    setIsOpen(true);
  };

  const closeTour = (markDone = true) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
      if (markDone) window.localStorage.setItem(storageKey, "done");
    }
    setIsOpen(false);
  };

  useEffect(() => {
    startTour(false);
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
    // storageKey intentionally drives the first-run behavior per dashboard role.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, storageKey]);

  useEffect(() => {
    if (replaySignal > 0) startTour(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replaySignal]);

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
    if (isOpen) speak(voiceText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isOpen, voiceText]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sv_tour_voice", voiceEnabled ? "on" : "off");
      if (!voiceEnabled) window.speechSynthesis?.cancel();
    }
  }, [voiceEnabled]);

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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVoiceEnabled((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
            >
              {voiceEnabled ? (
                <Volume2 className="h-4 w-4 text-[#12843a]" />
              ) : (
                <VolumeX className="h-4 w-4 text-[#61746a]" />
              )}
              {voiceEnabled ? "Suara aktif" : "Suara mati"}
            </button>
            <button
              type="button"
              onClick={() => speak(voiceText)}
              className="rounded-full px-3 py-2 text-xs font-black text-[#12843a] transition hover:bg-[#eef8f0]"
            >
              Dengar ulang
            </button>
          </div>

          <div className="flex items-center gap-2">
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
