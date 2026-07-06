import { useState } from 'react';
import { 
  Heart, Star, BookOpen, Clock, Activity, MessageSquare, 
  CheckSquare, Calendar, Smile, ShieldCheck, HelpCircle
} from 'lucide-react';
import { StudentProfile, GameSession, TeacherNote, AccessibilityPreferences } from '../types';

interface OrangTuaDashboardProps {
  students: StudentProfile[];
  sessions: GameSession[];
  teacherNotes: TeacherNote[];
  preferences: AccessibilityPreferences;
}

export default function OrangTuaDashboard({ students, sessions, teacherNotes, preferences }: OrangTuaDashboardProps) {
  const defaultStudent = students[0]; // Nadia Saputri
  const [selectedStudentId, setSelectedStudentId] = useState<string>(defaultStudent?.id || '');

  const textClass = {
    normal: 'text-sm',
    large: 'text-base',
    xlarge: 'text-lg'
  }[preferences.textSize];

  const titleClass = {
    normal: 'text-xl font-bold font-display',
    large: 'text-2xl font-extrabold font-display',
    xlarge: 'text-3xl font-black font-display'
  }[preferences.textSize];

  const activeStudent = students.find(s => s.id === selectedStudentId) || defaultStudent;
  const childSessions = sessions.filter(s => s.studentId === activeStudent?.id);
  const childNotes = teacherNotes.filter(n => n.studentId === activeStudent?.id);

  // Recommendations for home based on child type
  const homeRecommendations = [
    { id: 'rec-1', task: 'Buat daftar tugas harian tertulis bergambar (Checklist visual)', done: false },
    { id: 'rec-2', task: 'Dampingi anak latihan simulasi "Data Entry" selama 10 menit', done: true },
    { id: 'rec-3', task: 'Berikan apresiasi verbal hangat atas ketekunan belajarnya hari ini', done: false }
  ];

  const isHighContrast = preferences.highContrast;

  return (
    <div className={`space-y-6 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
      
      {/* Header Bento Box with dropdown selector */}
      <div className={`p-6 sm:p-8 rounded-3xl space-y-6 border ${
        isHighContrast 
          ? 'bg-white text-black border-4 border-black' 
          : 'bg-[#111] border-white/5 bento-glow-indigo'
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">Sinergi Keluarga & Sekolah</span>
            </div>
            <h2 className={`${titleClass} ${isHighContrast ? 'text-black' : 'text-white'}`}>
              Laporan Kolaborasi Orang Tua
            </h2>
            <p className={`text-xs ${isHighContrast ? 'text-neutral-700' : 'text-zinc-400'}`}>
              Dukung perkembangan karir, kemandirian, dan ketekunan belajar ananda langsung dari rumah.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Pilih Akun Anak</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className={`border rounded-xl px-3.5 py-2 text-xs font-bold outline-none cursor-pointer focus:ring-1 ${
                isHighContrast 
                  ? 'bg-white border-black text-black focus:ring-black' 
                  : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
              }`}
            >
              {students.map(s => (
                <option key={s.id} value={s.id} className="text-slate-800">{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Micro-Bento grid for child metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
          <div className={`p-4 rounded-2xl text-center border ${isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5'}`}>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Kesiapan Kerja Terhitung</span>
            <p className={`text-2xl font-black font-display mt-1 ${isHighContrast ? 'text-black' : 'text-indigo-400'}`}>
              {activeStudent?.readinessScore}%
            </p>
          </div>
          
          <div className={`p-4 rounded-2xl text-center border ${isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5'}`}>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Lencana Keberhasilan</span>
            <p className={`text-2xl font-black font-display mt-1 ${isHighContrast ? 'text-black' : 'text-emerald-400'}`}>
              4 Terbuka
            </p>
          </div>

          <div className={`p-4 rounded-2xl text-center border ${isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5'}`}>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Ketekunan Belajar</span>
            <p className={`text-2xl font-black font-display mt-1 ${isHighContrast ? 'text-black' : 'text-amber-400'}`}>
              Sangat Aktif
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Child Development Highlights */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-3xl space-y-6 border ${
            isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
          }`}>
            <h3 className={`font-bold font-display text-sm flex items-center gap-1.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
              <Activity className="w-5 h-5 text-indigo-400" />
              Perkembangan Keterampilan Ananda
            </h3>

            {/* Custom styled evaluation categories */}
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border ${isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5'}`}>
                <span className={`text-xs font-bold uppercase block mb-1.5 ${isHighContrast ? 'text-black' : 'text-indigo-400'}`}>
                  Logika Sekuensial & Kemandirian Belajar
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed print:text-neutral-700">
                  Ananda Nadia menunjukkan kepatuhan luar biasa terhadap urutan instruksi visual, dan tekun memecahkan sekuens rumit di simulasi Logic Quest.
                </p>
                <div className="flex gap-1.5 mt-3">
                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded ${isHighContrast ? 'bg-black text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>Sangat Baik</span>
                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded ${isHighContrast ? 'bg-black text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>Fokus Tinggi</span>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border ${isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5'}`}>
                <span className={`text-xs font-bold uppercase block mb-1.5 ${isHighContrast ? 'text-black' : 'text-emerald-400'}`}>
                  Akurasi Input Administrasi
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed print:text-neutral-700">
                  Kemampuan motorik mengetik atau input berkas fisik ananda Nadia berkembang secara positif, dengan akurasi pengerjaan yang terus meningkat stabil.
                </p>
                <div className="flex gap-1.5 mt-3">
                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded ${isHighContrast ? 'bg-black text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>Progres Positif</span>
                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded ${isHighContrast ? 'bg-black text-white' : 'bg-cyan-500/10 text-cyan-400'}`}>Sangat Teliti</span>
                </div>
              </div>
            </div>

            {/* Child session logs inside parent portal */}
            <div className="space-y-3 pt-2">
              <h4 className={`font-bold text-xs ${isHighContrast ? 'text-black' : 'text-white'}`}>Aktivitas Game & Skor Terbaru Ananda</h4>
              {childSessions.length === 0 ? (
                <p className="text-xs text-zinc-500 py-2">Belum ada aktivitas latihan terdeteksi.</p>
              ) : (
                <div className="space-y-2">
                  {childSessions.slice(0, 3).map((se, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3.5 rounded-2xl border ${
                      isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Smile className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="font-bold text-xs">{se.gameName}</p>
                          <p className="text-[10px] text-zinc-500">{new Date(se.date).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                      <span className={`font-bold text-xs ${isHighContrast ? 'text-black' : 'text-indigo-400'}`}>Akurasi {se.metrics.accuracy}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Home activity checklists & Guru advisory notes */}
        <div className="space-y-6">
          
          {/* Daily Checklist */}
          <div className={`p-6 rounded-3xl space-y-4 border ${
            isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
          }`}>
            <h3 className={`font-bold font-display text-sm flex items-center gap-1.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
              <CheckSquare className="w-4 h-4 text-indigo-400" />
              Latihan Mandiri di Rumah
            </h3>
            <p className="text-xs text-zinc-500">Rencana kecil pendampingan bersama orang tua.</p>

            <div className="space-y-3 pt-2">
              {homeRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-start gap-3 text-xs">
                  <input
                    type="checkbox"
                    defaultChecked={rec.done}
                    className="mt-0.5 h-4 w-4 text-indigo-600 border-zinc-700 bg-zinc-800 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className={`leading-tight ${rec.done ? 'line-through text-zinc-500' : 'text-zinc-300'}`}>
                    {rec.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher advise notes specifically for parents */}
          <div className={`p-6 rounded-3xl space-y-4 border ${
            isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
          }`}>
            <h3 className={`font-bold font-display text-sm flex items-center gap-1.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Rekomendasi dari Bapak/Ibu Guru
            </h3>

            <div className="space-y-3">
              {childNotes.length === 0 ? (
                <p className="text-xs text-zinc-500 py-3">Belum ada catatan guru baru.</p>
              ) : (
                childNotes.map((note) => (
                  <div key={note.id} className={`p-4 rounded-2xl border space-y-2 text-xs ${
                    isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-300'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase ${
                        isHighContrast ? 'bg-black text-white' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>{note.focusCategory}</span>
                      <span className="text-zinc-500 text-[10px]">{new Date(note.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    <p className={`leading-relaxed italic ${isHighContrast ? 'text-neutral-800' : 'text-zinc-400'}`}>"{note.noteText}"</p>
                    <p className="text-[10px] text-zinc-500 font-bold text-right">— {note.teacherName}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
