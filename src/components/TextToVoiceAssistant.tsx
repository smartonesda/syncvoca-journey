import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from "lucide-react";
import type { UserRole } from "../types";

interface TextToVoiceAssistantProps {
  enabled: boolean;
  currentRole: UserRole | null;
  reducedMotion: boolean;
  onRoleChange: (role: UserRole | null) => void;
  onEnabledChange: (enabled: boolean) => void;
}

interface ReadableSegment {
  element: HTMLElement;
  text: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionResultListLike {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike {
  error?: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type WindowWithSpeechRecognition = Window &
  typeof globalThis & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

const COMMAND_HINTS = [
  "baca halaman",
  "berhenti baca",
  "lanjut",
  "sebelumnya",
  "scroll bawah",
  "scroll atas",
  "buka siswa",
  "buka dudi",
];

const READABLE_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "dt",
  "dd",
  "button",
  "a",
  "[data-voice-readable]",
].join(",");

const VOCI_VOICE_PROFILE = {
  lang: "id-ID",
  pitch: 1.28,
  rate: 0.98,
  volume: 1,
};

const normalizeCommand = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const hasCommand = (transcript: string, phrases: string[]) =>
  phrases.some((phrase) => transcript.includes(phrase));

const getVoiceScore = (voice: SpeechSynthesisVoice) => {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;

  if (lang === "id-id") score += 80;
  else if (lang.startsWith("id")) score += 65;
  else if (lang.startsWith("ms")) score += 22;
  else if (lang.startsWith("en")) score += 6;

  if (name.includes("male") || name.includes("pria") || name.includes("boy")) {
    score += 18;
  }
  if (
    name.includes("child") ||
    name.includes("kid") ||
    name.includes("young") ||
    name.includes("anak")
  ) {
    score += 20;
  }
  if (
    name.includes("female") ||
    name.includes("wanita") ||
    name.includes("girl")
  ) {
    score -= 10;
  }
  if (voice.localService) score += 4;

  return score;
};

const getBestVoice = (voices: SpeechSynthesisVoice[]) =>
  voices
    .filter((voice) => voice.lang)
    .sort((first, second) => getVoiceScore(second) - getVoiceScore(first))[0];

const isElementVisible = (element: HTMLElement) => {
  if (element.closest('[data-voice-ignore="true"], [aria-hidden="true"]')) {
    return false;
  }

  const style = window.getComputedStyle(element);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    Number(style.opacity) !== 0 &&
    element.getClientRects().length > 0
  );
};

const clickVisibleByText = (labels: string[]) => {
  const normalizedLabels = labels.map(normalizeCommand);
  const candidates = Array.from(
    document.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>(
      "button,a",
    ),
  );

  const target = candidates.find((candidate) => {
    if (!isElementVisible(candidate)) return false;
    const text = normalizeCommand(candidate.innerText || candidate.textContent || "");
    return normalizedLabels.some((label) => text.includes(label));
  });

  target?.click();
  return Boolean(target);
};

const dispatchKeyboard = (key: string) => {
  window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
};

export default function TextToVoiceAssistant({
  enabled,
  currentRole,
  reducedMotion,
  onRoleChange,
  onEnabledChange,
}: TextToVoiceAssistantProps) {
  const [isReading, setIsReading] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSegments, setTotalSegments] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [commandMode, setCommandMode] = useState(false);
  const [commandStatus, setCommandStatus] = useState(
    "Aktifkan mic untuk perintah suara.",
  );
  const [supportsCommand, setSupportsCommand] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);

  const segmentsRef = useRef<ReadableSegment[]>([]);
  const activeSegmentIndexRef = useRef(0);
  const readSessionRef = useRef(0);
  const highlightedElementRef = useRef<HTMLElement | null>(null);
  const stoppedRef = useRef(true);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const restartRecognitionRef = useRef(false);

  const clearHighlight = () => {
    highlightedElementRef.current?.classList.remove("sv-voice-reading");
    highlightedElementRef.current = null;
  };

  const collectReadableSegments = () => {
    const root = document.querySelector<HTMLElement>("main");
    if (!root) return [];

    const seen = new Set<string>();
    return Array.from(root.querySelectorAll<HTMLElement>(READABLE_SELECTOR))
      .filter(isElementVisible)
      .map((element) => ({
        element,
        text: (element.innerText || element.textContent || "")
          .replace(/\s+/g, " ")
          .trim(),
      }))
      .filter((segment) => {
        if (segment.text.length < 3 || segment.text.length > 900) return false;
        if (seen.has(segment.text)) return false;
        seen.add(segment.text);
        return true;
      })
      .slice(0, 90);
  };

  const markSegment = (segment: ReadableSegment) => {
    clearHighlight();
    segment.element.classList.add("sv-voice-reading");
    highlightedElementRef.current = segment.element;
    segment.element.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const stopReading = () => {
    stoppedRef.current = true;
    readSessionRef.current += 1;
    window.speechSynthesis?.cancel();
    clearHighlight();
    setIsReading(false);
    setCurrentText("Pembacaan dihentikan.");
  };

  const speakSegment = (index: number, sessionId = readSessionRef.current) => {
    if (!enabled || stoppedRef.current || sessionId !== readSessionRef.current) {
      return;
    }

    const speech = window.speechSynthesis;
    const segment = segmentsRef.current[index];
    if (!speech || !segment) {
      clearHighlight();
      setIsReading(false);
      setCurrentText("Selesai membaca halaman.");
      return;
    }

    activeSegmentIndexRef.current = index;
    markSegment(segment);
    setCurrentIndex(index + 1);
    setCurrentText(segment.text);

    const utterance = new SpeechSynthesisUtterance(segment.text);
    utterance.lang = VOCI_VOICE_PROFILE.lang;
    utterance.rate = VOCI_VOICE_PROFILE.rate;
    utterance.pitch = VOCI_VOICE_PROFILE.pitch;
    utterance.volume = VOCI_VOICE_PROFILE.volume;

    const voice = getBestVoice(
      availableVoices.length ? availableVoices : speech.getVoices(),
    );
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || VOCI_VOICE_PROFILE.lang;
    }

    utterance.onend = () => {
      if (stoppedRef.current || sessionId !== readSessionRef.current) return;
      window.setTimeout(() => speakSegment(index + 1, sessionId), 140);
    };
    utterance.onerror = () => {
      if (stoppedRef.current || sessionId !== readSessionRef.current) return;
      window.setTimeout(() => speakSegment(index + 1, sessionId), 140);
    };

    speech.speak(utterance);
  };

  const ensureReadableSegments = () => {
    let segments = segmentsRef.current;
    if (!segments.length) {
      segments = collectReadableSegments();
      segmentsRef.current = segments;
      setTotalSegments(segments.length);
    }
    return segments;
  };

  const jumpToSegment = (index: number) => {
    if (!enabled || typeof window === "undefined") return;

    const segments = ensureReadableSegments();
    if (!segments.length) {
      setCurrentText("Belum ada teks utama yang bisa dibacakan.");
      return;
    }

    const targetIndex = Math.min(Math.max(index, 0), segments.length - 1);
    window.speechSynthesis?.cancel();
    clearHighlight();
    readSessionRef.current += 1;
    stoppedRef.current = false;
    setIsReading(true);
    setTotalSegments(segments.length);
    speakSegment(targetIndex, readSessionRef.current);
  };

  const readNextSegment = () => {
    jumpToSegment(activeSegmentIndexRef.current + 1);
  };

  const readPreviousSegment = () => {
    jumpToSegment(activeSegmentIndexRef.current - 1);
  };

  const startReading = (force = false) => {
    if (!enabled || typeof window === "undefined") return;
    if (!force && document.querySelector('[data-tour-dialog="true"]')) return;

    const segments = collectReadableSegments();
    if (!segments.length) {
      setCurrentText("Belum ada teks utama yang bisa dibacakan.");
      return;
    }

    window.speechSynthesis?.cancel();
    clearHighlight();
    segmentsRef.current = segments;
    activeSegmentIndexRef.current = 0;
    readSessionRef.current += 1;
    stoppedRef.current = false;
    setTotalSegments(segments.length);
    setIsReading(true);
    speakSegment(0, readSessionRef.current);
  };

  const handleCommand = (rawTranscript: string) => {
    const transcript = normalizeCommand(rawTranscript);
    if (!transcript) return;

    setCommandStatus(`Perintah diterima: "${transcript}"`);

    if (
      hasCommand(transcript, [
        "berhenti baca",
        "berhenti membaca",
        "stop baca",
        "stop membaca",
        "hentikan baca",
        "hentikan membaca",
        "hentikan suara",
        "jeda baca",
        "pause baca",
        "cukup baca",
        "cukup",
        "diam",
        "stop",
        "berhenti",
      ])
    ) {
      stopReading();
      return;
    }

    if (
      hasCommand(transcript, [
        "baca halaman",
        "bacakan halaman",
        "mulai baca",
        "mulai membaca",
        "ulang baca",
        "baca ulang",
        "ulangi bacaan",
      ])
    ) {
      startReading(true);
      return;
    }

    if (
      hasCommand(transcript, [
        "matikan suara",
        "nonaktifkan suara",
        "matikan text to voice",
        "matikan pembaca",
      ])
    ) {
      stopReading();
      onEnabledChange(false);
      return;
    }

    if (transcript.includes("buka siswa")) {
      onRoleChange("siswa");
      return;
    }
    if (transcript.includes("buka guru")) {
      onRoleChange("guru");
      return;
    }
    if (transcript.includes("buka orang tua") || transcript.includes("buka ortu")) {
      onRoleChange("orang_tua");
      return;
    }
    if (transcript.includes("buka dudi") || transcript.includes("buka industri")) {
      onRoleChange("dudi");
      return;
    }
    if (transcript.includes("buka admin")) {
      onRoleChange("admin");
      return;
    }
    if (transcript.includes("beranda") || transcript.includes("landing")) {
      onRoleChange(null);
      return;
    }

    if (hasCommand(transcript, ["scroll bawah", "turun halaman", "geser bawah"])) {
      window.scrollBy({
        top: Math.round(window.innerHeight * 0.72),
        behavior: reducedMotion ? "auto" : "smooth",
      });
      return;
    }
    if (hasCommand(transcript, ["scroll atas", "naik halaman", "geser atas"])) {
      window.scrollBy({
        top: -Math.round(window.innerHeight * 0.72),
        behavior: reducedMotion ? "auto" : "smooth",
      });
      return;
    }
    if (transcript.includes("ke atas") || transcript.includes("paling atas")) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    if (transcript.includes("tutup panduan") || transcript.includes("keluar panduan")) {
      dispatchKeyboard("Escape");
      return;
    }
    if (transcript.includes("buka panduan") || transcript.includes("mulai panduan")) {
      clickVisibleByText(["panduan demo", "mulai guide tour", "panduan"]);
      return;
    }
    if (
      hasCommand(transcript, [
        "lanjut",
        "selanjutnya",
        "berikutnya",
        "next",
        "baca lanjut",
        "lanjut baca",
        "baca berikutnya",
        "teks berikutnya",
        "blok berikutnya",
      ])
    ) {
      if (document.querySelector('[data-tour-dialog="true"]')) {
        dispatchKeyboard("ArrowRight");
      } else {
        readNextSegment();
      }
      return;
    }
    if (
      hasCommand(transcript, [
        "sebelumnya",
        "previous",
        "prev",
        "mundur",
        "baca sebelumnya",
        "teks sebelumnya",
        "blok sebelumnya",
      ])
    ) {
      if (document.querySelector('[data-tour-dialog="true"]')) {
        dispatchKeyboard("ArrowLeft");
      } else {
        readPreviousSegment();
      }
      return;
    }
    if (transcript.includes("masuk portal")) {
      clickVisibleByText(["masuk portal demo"]);
      return;
    }

    if (
      hasCommand(transcript, [
        "aksi utama",
        "klik aksi",
        "jalankan aksi",
        "tombol utama",
        "mulai aksi",
      ])
    ) {
      const primaryAction = document.querySelector<HTMLButtonElement>(
        '[data-tour="primary-action"]',
      );
      if (primaryAction && isElementVisible(primaryAction)) primaryAction.click();
      return;
    }

    setCommandStatus(
      `Belum mengenali: "${transcript}". Coba ucapkan "baca halaman" atau "buka siswa".`,
    );
  };

  const stopCommandMode = () => {
    restartRecognitionRef.current = false;
    setCommandMode(false);
    setIsListening(false);
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  };

  const startCommandMode = () => {
    if (typeof window === "undefined") return;
    const speechWindow = window as WindowWithSpeechRecognition;
    const RecognitionApi =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!RecognitionApi) {
      setCommandStatus("Voice command belum didukung browser ini. Gunakan Chrome atau Edge.");
      setSupportsCommand(false);
      return;
    }

    recognitionRef.current?.abort();
    const recognition = new RecognitionApi();
    recognition.lang = "id-ID";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    restartRecognitionRef.current = true;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        if (result?.isFinal) transcript += ` ${result[0]?.transcript || ""}`;
      }
      handleCommand(transcript);
    };

    recognition.onerror = (event) => {
      setCommandStatus(
        event.error === "not-allowed"
          ? "Izin mikrofon ditolak. Aktifkan permission mic di browser."
          : "Voice command sempat berhenti. Coba aktifkan lagi.",
      );
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!restartRecognitionRef.current || !enabled) return;
      window.setTimeout(() => {
        try {
          recognition.start();
          setIsListening(true);
        } catch {
          setIsListening(false);
        }
      }, 420);
    };

    try {
      recognition.start();
      setSupportsCommand(true);
      setCommandMode(true);
      setIsListening(true);
      setCommandStatus("Voice command aktif. Ucapkan: baca halaman, buka siswa, atau scroll bawah.");
    } catch {
      setCommandStatus("Voice command belum bisa dimulai. Coba klik mic sekali lagi.");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const speech = window.speechSynthesis;
    if (!speech) return;

    const syncVoices = () => setAvailableVoices(speech.getVoices());
    syncVoices();
    speech.addEventListener?.("voiceschanged", syncVoices);
    return () => speech.removeEventListener?.("voiceschanged", syncVoices);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const speechWindow = window as WindowWithSpeechRecognition;
    setSupportsCommand(Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition));
  }, []);

  useEffect(() => {
    if (!enabled) {
      stopReading();
      stopCommandMode();
      return;
    }

    const timeout = window.setTimeout(() => startReading(), 720);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, currentRole]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const handlePageReady = () => {
      window.setTimeout(() => startReading(), 260);
    };

    window.addEventListener("sv:text-to-voice:page-ready", handlePageReady);
    return () => window.removeEventListener("sv:text-to-voice:page-ready", handlePageReady);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, currentRole]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const root = document.querySelector("main");
    if (!root) return;

    let timer: number | undefined;
    const observer = new MutationObserver((mutations) => {
      const hasContentChange = mutations.some(
        (mutation) => mutation.type === "childList" || mutation.type === "characterData",
      );
      if (!hasContentChange) return;

      window.clearTimeout(timer);
      timer = window.setTimeout(() => startReading(), 980);
    });

    observer.observe(root, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, currentRole]);

  useEffect(() => {
    return () => {
      stopReading();
      stopCommandMode();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <aside
      data-voice-ignore="true"
      className="fixed bottom-20 right-3 z-[70] w-[min(22rem,calc(100vw-1.5rem))] rounded-[1.25rem] border border-[#cfe4d5] bg-white/95 p-3 text-[#10203b] shadow-2xl backdrop-blur print:hidden sm:right-5"
      aria-label="Text to Voice dan Voice Command"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#e8f8ee] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#12843a]">
            <Volume2 className="h-3.5 w-3.5" />
            Text to Voice
          </p>
          <p className="mt-2 text-sm font-black">
            {isReading ? `Membaca ${currentIndex}/${totalSegments}` : "Siap membaca halaman"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onEnabledChange(false)}
          className="rounded-full border border-[#dbe7dd] px-3 py-2 text-xs font-black text-[#61746a] transition hover:bg-[#f8faf7]"
        >
          Matikan
        </button>
      </div>

      <p className="mt-3 max-h-[3.4rem] overflow-hidden rounded-2xl bg-[#f8faf7] px-3 py-2 text-xs font-bold leading-relaxed text-[#4c6257]">
        {currentText || "Saat aktif, teks utama pada halaman akan dibacakan dan diberi tanda hijau-kuning."}
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => startReading(true)}
          className="inline-flex items-center justify-center gap-1 rounded-2xl bg-[#12843a] px-3 py-2 text-xs font-black text-white transition hover:bg-[#0b5d2a]"
        >
          <Play className="h-4 w-4" />
          Baca
        </button>
        <button
          type="button"
          onClick={stopReading}
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
        >
          <Square className="h-4 w-4" />
          Stop
        </button>
        <button
          type="button"
          onClick={() => startReading(true)}
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
        >
          <RotateCcw className="h-4 w-4" />
          Ulang
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={readPreviousSegment}
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev teks
        </button>
        <button
          type="button"
          onClick={readNextSegment}
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
        >
          Next teks
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() =>
            window.scrollBy({
              top: Math.round(window.innerHeight * 0.72),
              behavior: reducedMotion ? "auto" : "smooth",
            })
          }
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
        >
          <ArrowDown className="h-4 w-4" />
          Bawah
        </button>
        <button
          type="button"
          onClick={() =>
            window.scrollBy({
              top: -Math.round(window.innerHeight * 0.72),
              behavior: reducedMotion ? "auto" : "smooth",
            })
          }
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
        >
          <ArrowUp className="h-4 w-4" />
          Atas
        </button>
      </div>

      <div className="mt-3 rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-black text-[#17351f]">Voice Command</p>
            <p className="text-[11px] font-semibold text-[#61746a]">
              {supportsCommand ? commandStatus : "Butuh Chrome/Edge dan izin mikrofon."}
            </p>
          </div>
          <button
            type="button"
            onClick={commandMode ? stopCommandMode : startCommandMode}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition ${
              commandMode && isListening ? "bg-[#12843a]" : "bg-[#61746a]"
            }`}
            aria-label={commandMode ? "Matikan voice command" : "Aktifkan voice command"}
          >
            {commandMode && isListening ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {COMMAND_HINTS.slice(0, 4).map((command) => (
            <span
              key={command}
              className="rounded-full bg-white px-2 py-1 text-[10px] font-black text-[#12843a]"
            >
              {command}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
