import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Gamepad2, CheckCircle2, AlertTriangle, Play, RotateCcw, 
  ArrowRight, Key, Keyboard, Clipboard, Check, Package, Sparkles, ShieldCheck
} from 'lucide-react';
import { database } from '../data';
import { GameSession } from '../types';
import { useAppFeedback } from './AppFeedback';

interface GameProps {
  studentId: string;
  studentName: string;
  onGameComplete: (session: GameSession) => void;
  preferences: {
    textSize: 'normal' | 'large' | 'xlarge';
    highContrast: boolean;
    dyslexiaFont: boolean;
    reducedMotion: boolean;
    simplifiedLayout: boolean;
    audioAssist: boolean;
  };
}

export default function Games({ studentId, studentName, onGameComplete, preferences }: GameProps) {
  const [activeGame, setActiveGame] = useState<'logic' | 'data-entry' | 'sorter' | null>(null);

  const textClass = {
    normal: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  }[preferences.textSize];

  const titleClass = {
    normal: 'text-2xl font-bold',
    large: 'text-3xl font-extrabold',
    xlarge: 'text-4xl font-black'
  }[preferences.textSize];

  return (
    <div className={`space-y-6 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logic Quest Card */}
          <div className={`rounded-xl border p-6 bg-white flex flex-col justify-between transition-all duration-300 ${
            preferences.highContrast ? 'border-neutral-900 shadow-none' : 'border-slate-200 shadow-sm hover:shadow-md'
          }`}>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit">
                <Key className="w-8 h-8" />
              </div>
              <h3 className={`${titleClass} text-slate-800`}>Logic Quest</h3>
              <p className={`text-slate-600 ${textClass}`}>
                Melatih kemampuan <strong>kognitif</strong>, <strong>logika sekuensial</strong>, dan <strong>ketelitian</strong> melalui pemecahan pola sandi akses logis komputer.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">Aspek Logika</span>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">Kecepatan Kognitif</span>
              </div>
            </div>
            <button
              onClick={() => setActiveGame('logic')}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                preferences.highContrast 
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-900' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              Mulai Simulasi
            </button>
          </div>

          {/* Data Entry Card */}
          <div className={`rounded-xl border p-6 bg-white flex flex-col justify-between transition-all duration-300 ${
            preferences.highContrast ? 'border-neutral-900 shadow-none' : 'border-slate-200 shadow-sm hover:shadow-md'
          }`}>
            <div className="space-y-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-lg w-fit">
                <Keyboard className="w-8 h-8" />
              </div>
              <h3 className={`${titleClass} text-slate-800`}>Data Entry Specialist</h3>
              <p className={`text-slate-600 ${textClass}`}>
                Simulasi kerja administrasi perkantoran nyata. Melatih <strong>akurasi ketik</strong>, <strong>ketelitian dokumen</strong>, dan <strong>daya tahan kerja</strong>.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded font-medium">Akurasi Ketik</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-medium">Sertifikasi Admin</span>
              </div>
            </div>
            <button
              onClick={() => setActiveGame('data-entry')}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                preferences.highContrast 
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-900' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              Mulai Simulasi
            </button>
          </div>

          {/* Package Sorter Card */}
          <div className={`rounded-xl border p-6 bg-white flex flex-col justify-between transition-all duration-300 ${
            preferences.highContrast ? 'border-neutral-900 shadow-none' : 'border-slate-200 shadow-sm hover:shadow-md'
          }`}>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg w-fit">
                <Package className="w-8 h-8" />
              </div>
              <h3 className={`${titleClass} text-slate-800`}>Package Sorter</h3>
              <p className={`text-slate-600 ${textClass}`}>
                Simulasi operasional pergudangan dan logistik. Melatih <strong>motorik halus/kasar</strong>, <strong>kategorisasi cepat</strong>, dan <strong>refleks</strong>.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-medium">Motorik Halus</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">Operasi Logistik</span>
              </div>
            </div>
            <button
              onClick={() => setActiveGame('sorter')}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                preferences.highContrast 
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-900' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              Mulai Simulasi
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setActiveGame(null)}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950 transition"
          >
            ← Kembali ke Pilihan Simulasi
          </button>

          {activeGame === 'logic' && (
            <LogicQuestGame 
              studentId={studentId} 
              studentName={studentName} 
              onComplete={(session) => {
                onGameComplete(session);
                setActiveGame(null);
              }}
              preferences={preferences}
            />
          )}

          {activeGame === 'data-entry' && (
            <DataEntryGame 
              studentId={studentId} 
              studentName={studentName} 
              onComplete={(session) => {
                onGameComplete(session);
                setActiveGame(null);
              }}
              preferences={preferences}
            />
          )}

          {activeGame === 'sorter' && (
            <PackageSorterGame 
              studentId={studentId} 
              studentName={studentName} 
              onComplete={(session) => {
                onGameComplete(session);
                setActiveGame(null);
              }}
              preferences={preferences}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ==========================================
   1. LOGIC QUEST GAME IMPLEMENTATION
   ========================================== */
function LogicQuestGame({ studentId, studentName, onComplete, preferences }: {
  studentId: string;
  studentName: string;
  onComplete: (session: GameSession) => void;
  preferences: any;
}) {
  const { notify } = useAppFeedback();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [stage, setStage] = useState(1);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const OPTIONS = ['▲', '■', '●', '★'];
  const OPTION_COLORS = {
    '▲': 'bg-blue-500 hover:bg-blue-600 border-blue-600 text-white',
    '■': 'bg-rose-500 hover:bg-rose-600 border-rose-600 text-white',
    '●': 'bg-emerald-500 hover:bg-emerald-600 border-emerald-600 text-white',
    '★': 'bg-amber-500 hover:bg-amber-600 border-amber-600 text-white'
  };

  const highContrastColors = {
    '▲': 'bg-black text-white hover:bg-neutral-800 border-2 border-double border-white',
    '■': 'bg-white text-black hover:bg-neutral-100 border-2 border-black',
    '●': 'bg-black text-white hover:bg-neutral-800 border-2 border-dotted border-white',
    '★': 'bg-white text-black hover:bg-neutral-100 border-2 border-dashed border-black'
  };

  const playSound = (type: string) => {
    if (!preferences.audioAssist) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'flash') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'correct') {
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'error') {
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // low
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {
      console.log('Audio Context not allowed yet');
    }
  };

  const generatePattern = (len: number) => {
    const nextPattern = [];
    for (let i = 0; i < len; i++) {
      const randomOption = OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
      nextPattern.push(randomOption);
    }
    setPattern(nextPattern);
    showPattern(nextPattern);
  };

  const showPattern = (targetPattern: string[]) => {
    setIsVerifying(true);
    let index = 0;
    setFlashIndex(null);

    const interval = setInterval(() => {
      if (index < targetPattern.length) {
        setFlashIndex(index);
        playSound('flash');
        index++;
      } else {
        clearInterval(interval);
        setFlashIndex(null);
        setIsVerifying(false);
      }
    }, preferences.reducedMotion ? 1000 : 600);
  };

  const handleStartGame = () => {
    setIsPlaying(true);
    setStage(1);
    setErrors(0);
    setGameFinished(false);
    setPlayerInput([]);
    startTimeRef.current = Date.now();
    generatePattern(3); // Start with pattern length 3
  };

  const handleInput = (char: string) => {
    if (isVerifying || gameFinished) return;
    
    playSound('flash');
    const nextInput = [...playerInput, char];
    setPlayerInput(nextInput);

    // Verify input instantly
    const currentIndex = nextInput.length - 1;
    if (nextInput[currentIndex] !== pattern[currentIndex]) {
      playSound('error');
      setErrors(e => e + 1);
      setPlayerInput([]);
      notify({
        title: 'Pola belum sesuai',
        message: 'Perhatikan ulang urutan simbol yang muncul, lalu coba lagi.',
        tone: 'warning'
      });
      showPattern(pattern);
      return;
    }

    if (nextInput.length === pattern.length) {
      playSound('correct');
      if (stage < 5) {
        setStage(s => s + 1);
        setPlayerInput([]);
        setTimeout(() => {
          generatePattern(pattern.length + 1);
        }, 1000);
      } else {
        // Complete Game
        const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
        timerRef.current = timeTaken;
        
        // Final score algorithm
        const penalty = errors * 5;
        const calculatedScore = Math.max(50, 100 - penalty);
        setScore(calculatedScore);
        setGameFinished(true);
      }
    }
  };

  const handleSubmitResults = () => {
    const accuracy = Math.round(((pattern.length * 5) / ((pattern.length * 5) + errors)) * 100);
    const session: GameSession = {
      id: '',
      studentId,
      studentName,
      gameId: 'game-logic',
      gameName: 'Logic Quest (Kognitif)',
      score,
      date: new Date().toISOString(),
      metrics: {
        accuracy: isNaN(accuracy) ? 90 : accuracy,
        completionTime: timerRef.current,
        errorCount: errors,
        consistency: Math.max(70, 100 - (errors * 3))
      }
    };
    onComplete(session);
  };

  return (
    <div className={`border p-6 rounded-xl bg-slate-50 space-y-6 ${
      preferences.highContrast ? 'border-2 border-black bg-white text-black' : 'border-slate-200'
    }`}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 text-slate-800">
            <Key className="w-6 h-6 text-blue-600" />
            Simulasi Vokasi: Logic Quest
          </h2>
          <p className="text-sm text-slate-500">Mempelajari dan merekam logika verifikasi sekuensial kantor digital</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-md">Tahap {stage}/5</span>
          <span className="bg-rose-100 text-rose-800 px-3 py-1.5 rounded-md">Kesalahan: {errors}</span>
        </div>
      </div>

      {!isPlaying ? (
        <div className="text-center py-8 space-y-4">
          <p className="max-w-md mx-auto text-slate-600">
            Perhatikan pola simbol yang menyala satu per satu. Klik tombol simbol di bawah sesuai urutan flash yang ditunjukkan untuk menyelesaikan kode akses data.
          </p>
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            Mulai Sekarang
          </button>
        </div>
      ) : gameFinished ? (
        <div className="text-center py-8 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg max-w-md mx-auto space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Simulasi Berhasil Diselesaikan!</h3>
            <p className="text-sm text-slate-600">
              Selamat {studentName}, kamu telah menyelesaikan 5 tingkat dengan luar biasa.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-left border-t border-emerald-100">
              <div>
                <span className="text-xs text-slate-400">Total Waktu:</span>
                <p className="font-mono font-bold text-slate-800">{timerRef.current} Detik</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Skor Logika:</span>
                <p className="font-mono font-bold text-slate-800">{score} Poin</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmitResults}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow"
          >
            Simpan Hasil ke Portofolio
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center text-sm font-semibold text-slate-500">
            {isVerifying ? "MENGIRIMKAN POLA... PERHATIKAN BAIK-BAIK" : "SEKARANG GILIRANMU! KLIK SESUAI URUTAN"}
          </div>

          {/* Flash Screens */}
          <div className="flex justify-center gap-4">
            {pattern.map((char, idx) => (
              <motion.div
                key={idx}
                animate={flashIndex === idx ? { scale: 1.15, opacity: 1 } : { scale: 1, opacity: 0.6 }}
                className={`w-14 h-14 flex items-center justify-center rounded-xl text-2xl font-bold font-mono transition ${
                  flashIndex === idx 
                    ? (preferences.highContrast ? 'bg-black text-white ring-4 ring-neutral-900' : 'bg-blue-600 text-white ring-4 ring-blue-300')
                    : 'bg-white border text-slate-400'
                }`}
              >
                {flashIndex === idx ? char : (idx < playerInput.length ? pattern[idx] : '?')}
              </motion.div>
            ))}
          </div>

          {/* Input Buttons */}
          <div className="max-w-xs mx-auto grid grid-cols-2 gap-4 pt-4">
            {OPTIONS.map((char) => (
              <button
                key={char}
                onClick={() => handleInput(char)}
                disabled={isVerifying}
                className={`py-4 rounded-xl text-xl font-bold border-b-4 font-mono transition-all duration-150 ${
                  preferences.highContrast 
                    ? highContrastColors[char as '▲' | '■' | '●' | '★'] 
                    : OPTION_COLORS[char as '▲' | '■' | '●' | '★']
                } disabled:opacity-50 active:translate-y-1 active:border-b-0`}
              >
                {char}
              </button>
            ))}
          </div>

          <div className="text-center text-xs text-slate-400 pt-2">
            Tip Aksesibilitas: Tombol dirancang besar untuk memudahkan ketukan dan navigasi.
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   2. DATA ENTRY SPECIALIST GAME IMPLEMENTATION
   ========================================== */
interface InvoiceData {
  nama: string;
  invoiceNo: string;
  nominal: string;
  divisi: string;
}

const INVOICE_TEMPLATES: InvoiceData[] = [
  { nama: 'Budi Santoso', invoiceNo: 'INV-2026-089A', nominal: '1250000', divisi: 'Teknologi' },
  { nama: 'Amelia Putri', invoiceNo: 'INV-2026-104B', nominal: '3400000', divisi: 'Pemasaran' },
  { nama: 'Rudi Hermawan', invoiceNo: 'INV-2026-112C', nominal: '850000', divisi: 'Gudang' },
  { nama: 'Siti Rahma', invoiceNo: 'INV-2026-140D', nominal: '4500000', divisi: 'Sumber Daya Manusia' },
  { nama: 'Taufik Hidayat', invoiceNo: 'INV-2026-155E', nominal: '1950000', divisi: 'Keuangan' }
];

function DataEntryGame({ studentId, studentName, onComplete, preferences }: {
  studentId: string;
  studentName: string;
  onComplete: (session: GameSession) => void;
  preferences: any;
}) {
  const { notify } = useAppFeedback();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    nama: '',
    invoiceNo: '',
    nominal: '',
    divisi: ''
  });
  const [errors, setErrors] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState(false);

  const activeInvoice = INVOICE_TEMPLATES[currentIndex];

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentIndex(0);
    setErrors(0);
    setTotalAttempts(0);
    setGameFinished(false);
    setFormData({ nama: '', invoiceNo: '', nominal: '', divisi: '' });
    setStartTime(Date.now());
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setTotalAttempts(t => t + 1);

    // Validate fields exactly
    let currentInvoiceErrors = 0;
    if (formData.nama.trim().toLowerCase() !== activeInvoice.nama.toLowerCase()) currentInvoiceErrors++;
    if (formData.invoiceNo.trim().toUpperCase() !== activeInvoice.invoiceNo.toUpperCase()) currentInvoiceErrors++;
    if (formData.nominal.trim() !== activeInvoice.nominal) currentInvoiceErrors++;
    if (formData.divisi.trim().toLowerCase() !== activeInvoice.divisi.toLowerCase()) currentInvoiceErrors++;

    if (currentInvoiceErrors > 0) {
      setErrors(e => e + currentInvoiceErrors);
      notify({
        title: `${currentInvoiceErrors} data belum sesuai`,
        message: 'Periksa kembali kartu invoice dan samakan input berkas digital.',
        tone: 'warning'
      });
      return;
    }

    // Success invoice entry
    if (currentIndex < INVOICE_TEMPLATES.length - 1) {
      setCurrentIndex(c => c + 1);
      setFormData({ nama: '', invoiceNo: '', nominal: '', divisi: '' });
    } else {
      // Completed all
      setGameFinished(true);
    }
  };

  const handleCompleteAndSave = () => {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    
    // score computation
    const totalFields = INVOICE_TEMPLATES.length * 4;
    const accuracy = Math.round(((totalFields - errors) / totalFields) * 100);
    const finalScore = Math.max(50, Math.min(100, Math.round(accuracy - (elapsedSeconds * 0.05))));

    const session: GameSession = {
      id: '',
      studentId,
      studentName,
      gameId: 'game-data-entry',
      gameName: 'Data Entry Simulation (Administrasi)',
      score: finalScore,
      date: new Date().toISOString(),
      metrics: {
        accuracy: isNaN(accuracy) ? 90 : Math.max(10, accuracy),
        completionTime: elapsedSeconds,
        errorCount: errors,
        consistency: Math.max(60, 100 - (errors * 4))
      }
    };
    onComplete(session);
  };

  return (
    <div className={`border p-6 rounded-xl bg-slate-50 space-y-6 ${
      preferences.highContrast ? 'border-2 border-black bg-white text-black' : 'border-slate-200'
    }`}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 text-slate-800">
            <Keyboard className="w-6 h-6 text-teal-600" />
            Simulasi Vokasi: Data Entry Specialist
          </h2>
          <p className="text-sm text-slate-500">Input transaksi perkantoran secara presisi ke platform administrasi</p>
        </div>
        {isPlaying && !gameFinished && (
          <div className="flex items-center gap-2 text-sm font-semibold bg-teal-50 text-teal-800 px-3 py-1.5 rounded-md border">
            Dokumen {currentIndex + 1} dari {INVOICE_TEMPLATES.length}
          </div>
        )}
      </div>

      {!isPlaying ? (
        <div className="text-center py-8 space-y-4">
          <p className="max-w-md mx-auto text-slate-600">
            Kamu akan disajikan lembaran berkas invoice fisik virtual di sisi kiri layar. Tugasmu adalah menyalin berkas tersebut secara persis ke form digital di sisi kanan.
          </p>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 shadow flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            Mulai Penginputan
          </button>
        </div>
      ) : gameFinished ? (
        <div className="text-center py-8 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg max-w-md mx-auto space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Input Data Administrasi Berhasil!</h3>
            <p className="text-sm text-slate-600">
              Kamu berhasil menyalin semua Invoice dengan tingkat ketelitian tinggi.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-left border-t border-emerald-100 font-mono">
              <div>
                <span className="text-xs text-slate-400 font-sans">Kesalahan Ketik:</span>
                <p className="font-bold text-slate-800">{errors} Karakter</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-sans">Durasi Sesi:</span>
                <p className="font-bold text-slate-800">{Math.round((Date.now() - startTime) / 1000)} Detik</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleCompleteAndSave}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow"
          >
            Simpan Portofolio Administrasi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Virtual Invoice Paper */}
          <div className="border border-slate-300 p-6 rounded-xl bg-amber-50/50 shadow-inner space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] uppercase font-bold px-3 py-1 rotate-12 translate-x-3 translate-y-2">
              BERKAS FISIK
            </div>
            <div className="border-b border-dashed border-slate-300 pb-3 flex justify-between items-center">
              <span className="font-bold text-xs uppercase text-slate-500 font-mono">PT. MAJU SEJAHTERA INDONESIA</span>
              <span className="text-xs text-slate-400 font-mono">Inv No: {activeInvoice.invoiceNo}</span>
            </div>
            <div className="space-y-3 font-mono">
              <div>
                <span className="text-xs text-slate-400 font-sans">Nama Penerima Pembayaran:</span>
                <p className="font-bold text-slate-800 text-lg border-b border-amber-200">{activeInvoice.nama}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-sans">Nomor Dokumen Invoice:</span>
                <p className="font-bold text-slate-800 text-lg border-b border-amber-200">{activeInvoice.invoiceNo}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-sans">Nominal Tagihan (Rp):</span>
                <p className="font-bold text-slate-800 text-lg border-b border-amber-200">{activeInvoice.nominal}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-sans">Divisi Penanggung Jawab:</span>
                <p className="font-bold text-slate-800 text-lg border-b border-amber-200">{activeInvoice.divisi}</p>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-sans text-center border-t border-slate-200 pt-3">
              Catatan: Pastikan huruf kapital dan nomor invoice dimasukkan secara akurat tanpa meleset.
            </div>
          </div>

          {/* Digital Entry Web Form */}
          <form onSubmit={handleSubmitInvoice} className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold uppercase text-slate-600 border-b pb-2 flex items-center gap-1.5">
              <Clipboard className="w-4 h-4 text-teal-600" />
              Sistem Input Digital
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => handleFieldChange('nama', e.target.value)}
                placeholder="Salin nama lengkap"
                className="w-full border rounded px-3 py-2 text-sm focus:outline-teal-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Nomor Invoice</label>
              <input
                type="text"
                required
                value={formData.invoiceNo}
                onChange={(e) => handleFieldChange('invoiceNo', e.target.value)}
                placeholder="Salin nomor invoice"
                className="w-full border rounded px-3 py-2 text-sm focus:outline-teal-500 font-mono uppercase"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Nominal Tagihan (Angka Saja)</label>
              <input
                type="text"
                required
                value={formData.nominal}
                onChange={(e) => handleFieldChange('nominal', e.target.value)}
                placeholder="Salin nominal, contoh: 1250000"
                className="w-full border rounded px-3 py-2 text-sm focus:outline-teal-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Divisi</label>
              <input
                type="text"
                required
                value={formData.divisi}
                onChange={(e) => handleFieldChange('divisi', e.target.value)}
                placeholder="Salin divisi"
                className="w-full border rounded px-3 py-2 text-sm focus:outline-teal-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              Kirim Dokumen
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   3. PACKAGE SORTER GAME IMPLEMENTATION
   ========================================== */
interface SorterPackage {
  id: string;
  label: string;
  type: 'Fragile' | 'Hazardous' | 'Normal';
  icon: string;
}

const PACKAGES_MOCK: SorterPackage[] = [
  { id: 'p1', label: 'Lampu Bohlam Kaca', type: 'Fragile', icon: '🥛' },
  { id: 'p2', label: 'Baterai Lithium-Ion', type: 'Hazardous', icon: '🔋' },
  { id: 'p3', label: 'Sepatu Olahraga Running', type: 'Normal', icon: '👟' },
  { id: 'p4', label: 'Botol Parfum Spray', type: 'Fragile', icon: '🧴' },
  { id: 'p5', label: 'Cairan Pembersih Asam', type: 'Hazardous', icon: '🧪' },
  { id: 'p6', label: 'Paket Buku Novel', type: 'Normal', icon: '📚' }
];

function PackageSorterGame({ studentId, studentName, onComplete, preferences }: {
  studentId: string;
  studentName: string;
  onComplete: (session: GameSession) => void;
  preferences: any;
}) {
  const { notify } = useAppFeedback();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState(false);

  const activePackage = PACKAGES_MOCK[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameFinished) return;
      if (e.key === '1') handleSort('Normal');
      if (e.key === '2') handleSort('Fragile');
      if (e.key === '3') handleSort('Hazardous');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentIndex, gameFinished]);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentIndex(0);
    setScore(0);
    setErrors(0);
    setCorrectCount(0);
    setGameFinished(false);
    setStartTime(Date.now());
  };

  const handleSort = (binType: 'Fragile' | 'Hazardous' | 'Normal') => {
    if (activePackage.type === binType) {
      setCorrectCount(c => c + 1);
      setScore(s => s + 15);
    } else {
      setErrors(e => e + 1);
      notify({
        title: 'Kategori belum tepat',
        message: `"${activePackage.label}" termasuk kargo "${activePackage.type}".`,
        tone: 'warning'
      });
    }

    if (currentIndex < PACKAGES_MOCK.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setGameFinished(true);
    }
  };

  const handleCompleteAndSave = () => {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const totalPkg = PACKAGES_MOCK.length;
    const accuracy = Math.round((correctCount / totalPkg) * 100);
    const finalScore = Math.max(50, Math.min(100, Math.round(accuracy)));

    const session: GameSession = {
      id: '',
      studentId,
      studentName,
      gameId: 'game-package',
      gameName: 'Package Sorter (Motorik/Gudang)',
      score: finalScore,
      date: new Date().toISOString(),
      metrics: {
        accuracy: isNaN(accuracy) ? 90 : accuracy,
        completionTime: elapsedSeconds,
        errorCount: errors,
        consistency: Math.max(60, 100 - (errors * 8))
      }
    };
    onComplete(session);
  };

  return (
    <div className={`border p-6 rounded-xl bg-slate-50 space-y-6 ${
      preferences.highContrast ? 'border-2 border-black bg-white text-black' : 'border-slate-200'
    }`}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 text-slate-800">
            <Package className="w-6 h-6 text-amber-600" />
            Simulasi Vokasi: Package Sorter
          </h2>
          <p className="text-sm text-slate-500">Pilah kargo logistik pergudangan berdasarkan atribut penanganan keamanan</p>
        </div>
        {isPlaying && !gameFinished && (
          <div className="flex items-center gap-2 text-sm font-semibold bg-amber-50 text-amber-800 px-3 py-1.5 rounded-md border">
            Barang ke {currentIndex + 1} dari {PACKAGES_MOCK.length}
          </div>
        )}
      </div>

      {!isPlaying ? (
        <div className="text-center py-8 space-y-4">
          <p className="max-w-md mx-auto text-slate-600">
            Pilah barang-barang logistik yang muncul di conveyor menuju kardus klasifikasi yang sesuai. Kamu bisa klik langsung tombol kategori atau tekan tombol keyboard:
            <br />
            <strong>[1]</strong> untuk Normal, <strong>[2]</strong> untuk Fragile (Pecah Belah), <strong>[3]</strong> untuk Hazardous (Bahan Berbahaya).
          </p>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 shadow flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            Mulai Menyortir
          </button>
        </div>
      ) : gameFinished ? (
        <div className="text-center py-8 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg max-w-md mx-auto space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Penyortiran Selesai!</h3>
            <p className="text-sm text-slate-600">
              Barang logistik berhasil ditempatkan ke wadah pengiriman yang tepat.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-left border-t border-emerald-100 font-mono">
              <div>
                <span className="text-xs text-slate-400 font-sans">Akurasi Sortir:</span>
                <p className="font-bold text-slate-800">{Math.round((correctCount / PACKAGES_MOCK.length) * 100)} %</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-sans">Kesalahan Sortir:</span>
                <p className="font-bold text-slate-800">{errors} Item</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleCompleteAndSave}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow"
          >
            Simpan Hasil Sesi Logistik
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Active Package on Conveyor Belt */}
          <div className="bg-white border rounded-xl p-8 max-w-sm mx-auto shadow-sm flex flex-col items-center text-center space-y-4 border-slate-300">
            <span className="text-5xl animate-bounce">{activePackage.icon}</span>
            <div>
              <h4 className="text-lg font-extrabold text-slate-800">{activePackage.label}</h4>
              <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full ${
                activePackage.type === 'Fragile' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                activePackage.type === 'Hazardous' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                'bg-slate-100 text-slate-800 border border-slate-300'
              }`}>
                Pilah Sekarang
              </span>
            </div>
          </div>

          {/* Sorter Bins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Bin 1 */}
            <button
              onClick={() => handleSort('Normal')}
              className="border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-xl p-5 bg-white text-center hover:bg-slate-50 transition-all flex flex-col items-center justify-center space-y-2"
            >
              <Package className="w-8 h-8 text-slate-500" />
              <span className="font-bold text-slate-800">1. Kargo Normal</span>
              <p className="text-xs text-slate-400">Tekan [1] pada keyboard</p>
            </button>

            {/* Bin 2 */}
            <button
              onClick={() => handleSort('Fragile')}
              className="border-2 border-dashed border-rose-300 hover:border-rose-800 rounded-xl p-5 bg-white text-center hover:bg-rose-50 transition-all flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-3xl">🥛</span>
              <span className="font-bold text-rose-800">2. Pecah Belah (Fragile)</span>
              <p className="text-xs text-slate-400">Tekan [2] pada keyboard</p>
            </button>

            {/* Bin 3 */}
            <button
              onClick={() => handleSort('Hazardous')}
              className="border-2 border-dashed border-amber-300 hover:border-amber-800 rounded-xl p-5 bg-white text-center hover:bg-amber-50 transition-all flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-3xl">⚡</span>
              <span className="font-bold text-amber-800">3. Berbahaya (Hazardous)</span>
              <p className="text-xs text-slate-400">Tekan [3] pada keyboard</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
