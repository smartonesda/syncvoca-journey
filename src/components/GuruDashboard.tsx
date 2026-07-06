import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, BookOpen, Clock, AlertCircle, 
  CheckCircle2, ChevronRight, MessageSquare, ClipboardList, Send, X, Star, Calendar
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import { StudentProfile, GameSession, TeacherNote, AccessibilityPreferences } from '../types';
import { useAppFeedback } from './AppFeedback';

interface GuruDashboardProps {
  students: StudentProfile[];
  sessions: GameSession[];
  teacherNotes: TeacherNote[];
  onAddNote: (note: Omit<TeacherNote, 'id'>) => void;
  preferences: AccessibilityPreferences;
}

export default function GuruDashboard({ students, sessions, teacherNotes, onAddNote, preferences }: GuruDashboardProps) {
  const { notify } = useAppFeedback();
  const [searchTerm, setSearchTerm] = useState('');
  const [supportFilter, setSupportFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'score'>('name');
  
  // Selection state for viewing/editing notes
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(students[0]?.id || null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({
    teacherName: 'Dra. Endang Wardhani',
    noteText: '',
    focusCategory: 'Kognitif' as 'Kognitif' | 'Motorik' | 'Sosial-Emosional' | 'Kehadiran' | 'Saran'
  });

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

  // Filtering list
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSupport = supportFilter === 'All' ||
                              student.supportProfile.toLowerCase().includes(supportFilter.toLowerCase());

    return matchesSearch && matchesSupport;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return b.readinessScore - a.readinessScore;
  });

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const selectedStudentNotes = teacherNotes.filter(n => n.studentId === selectedStudentId);
  const selectedStudentSessions = sessions.filter(s => s.studentId === selectedStudentId);

  // Competency calculations for selected student
  const logicSessions = selectedStudentSessions.filter(s => s.gameName.toLowerCase().includes('logic') || s.gameId === 'game-logic');
  const entrySessions = selectedStudentSessions.filter(s => s.gameName.toLowerCase().includes('data entry') || s.gameId === 'game-data-entry' || s.gameName.toLowerCase().includes('administrasi'));
  const packageSessions = selectedStudentSessions.filter(s => s.gameName.toLowerCase().includes('package') || s.gameId === 'game-package' || s.gameName.toLowerCase().includes('gudang') || s.gameName.toLowerCase().includes('sort'));

  const logicScore = logicSessions.length > 0 
    ? Math.round(logicSessions.reduce((acc, s) => acc + s.score, 0) / logicSessions.length)
    : (selectedStudent?.skills.includes('Logika Pemrograman') ? 90 : 75);

  const accuracyScore = entrySessions.length > 0
    ? Math.round(entrySessions.reduce((acc, s) => acc + s.metrics.accuracy, 0) / entrySessions.length)
    : (selectedStudent?.skills.includes('Data Entry') ? 85 : 70);

  const motoricScore = packageSessions.length > 0
    ? Math.round(packageSessions.reduce((acc, s) => acc + s.metrics.accuracy, 0) / packageSessions.length)
    : (selectedStudent?.skills.includes('Penyortiran Barang') || selectedStudent?.skills.includes('Perakitan Komponen') ? 80 : 65);

  const consistencyScore = selectedStudentSessions.length > 0
    ? Math.round(selectedStudentSessions.reduce((acc, s) => acc + s.metrics.consistency, 0) / selectedStudentSessions.length)
    : Math.round((selectedStudent?.readinessScore || 75) * 0.95);

  const speedScore = selectedStudentSessions.length > 0
    ? Math.round(Math.max(40, Math.min(100, 100 - (selectedStudentSessions.reduce((acc, s) => acc + s.metrics.completionTime, 0) / selectedStudentSessions.length) / 5)))
    : Math.round((selectedStudent?.readinessScore || 75) * 0.9);

  const selectedCompetencyData = [
    { subject: 'Logika Sekuensial', A: logicScore, fullMark: 100 },
    { subject: 'Akurasi Administrasi', A: accuracyScore, fullMark: 100 },
    { subject: 'Kecepatan Kerja', A: speedScore, fullMark: 100 },
    { subject: 'Konsistensi Fokus', A: consistencyScore, fullMark: 100 },
    { subject: 'Motorik & Penyortiran', A: motoricScore, fullMark: 100 },
  ];

  // Handle note submit
  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.noteText.trim() || !selectedStudentId) return;

    onAddNote({
      studentId: selectedStudentId,
      teacherName: newNote.teacherName,
      noteText: newNote.noteText.trim(),
      date: new Date().toISOString(),
      focusCategory: newNote.focusCategory
    });

    setNewNote(prev => ({ ...prev, noteText: '' }));
    setIsAddingNote(false);
    notify({
      title: 'Catatan guru tersimpan',
      message: 'Rencana pendampingan siswa sudah diperbarui.',
      tone: 'success'
    });
  };

  const isHighContrast = preferences.highContrast;

  return (
    <div className={`space-y-6 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
      
      {/* Bento Grid Metrics Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className={`p-5 rounded-2xl border ${
          isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5 hover:border-indigo-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isHighContrast ? 'bg-black text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase block tracking-wider">Siswa Terpantau</span>
              <p className={`text-lg font-black font-display ${isHighContrast ? 'text-black' : 'text-white'}`}>{students.length} Siswa</p>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${
          isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5 hover:border-emerald-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isHighContrast ? 'bg-black text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase block tracking-wider">Sesi Terkumpul</span>
              <p className={`text-lg font-black font-display ${isHighContrast ? 'text-black' : 'text-white'}`}>{sessions.length} Sesi</p>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${
          isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5 hover:border-cyan-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isHighContrast ? 'bg-black text-white' : 'bg-cyan-500/10 text-cyan-400'}`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase block tracking-wider">Catatan Konseling</span>
              <p className={`text-lg font-black font-display ${isHighContrast ? 'text-black' : 'text-white'}`}>{teacherNotes.length} Berkas</p>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${
          isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5 hover:border-amber-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isHighContrast ? 'bg-black text-white' : 'bg-amber-500/10 text-amber-400'}`}>
              <Star className="w-5 h-5 fill-amber-500/20" />
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase block tracking-wider">Rerata Kesiapan</span>
              <p className={`text-lg font-black font-display ${isHighContrast ? 'text-black' : 'text-white'}`}>83% (Tinggi)</p>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Students Filterable Bento List */}
        <div className="lg:col-span-1">
          <div className={`p-5 rounded-3xl space-y-4 border h-full ${
            isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className={`font-bold font-display text-sm ${isHighContrast ? 'text-black' : 'text-white'}`}>Siswa Sekolah Mitra</h3>
              <button
                onClick={() => setSortBy(sortBy === 'name' ? 'score' : 'name')}
                className={`text-[10px] font-bold ${isHighContrast ? 'text-black underline' : 'text-indigo-400 hover:text-indigo-300'}`}
              >
                Urut: {sortBy === 'name' ? 'A-Z' : 'Skor Kesiapan'}
              </button>
            </div>

            {/* Search Input styled like terminal input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari nama siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 transition ${
                  isHighContrast 
                    ? 'bg-zinc-100 text-black border border-black focus:ring-black' 
                    : 'bg-[#161616] text-zinc-200 border border-white/5 focus:ring-indigo-500 focus:border-indigo-500/30'
                }`}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-white/5">
              <button
                onClick={() => setSupportFilter('All')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition ${
                  supportFilter === 'All'
                    ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                    : (isHighContrast ? 'bg-zinc-100 text-zinc-600 border border-black' : 'bg-[#1a1a1a] text-zinc-400 hover:bg-zinc-800')
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSupportFilter('Sensorik')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition ${
                  supportFilter === 'Sensorik'
                    ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                    : (isHighContrast ? 'bg-[#1a1a1a] text-zinc-400 hover:bg-zinc-800' : 'bg-white/5 text-zinc-300 hover:bg-white/10')
                }`}
              >
                Sensorik
              </button>
              <button
                onClick={() => setSupportFilter('Mobilitas')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition ${
                  supportFilter === 'Mobilitas'
                    ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                    : (isHighContrast ? 'bg-[#1a1a1a] text-zinc-400 hover:bg-zinc-800' : 'bg-white/5 text-zinc-300 hover:bg-white/10')
                }`}
              >
                Mobilitas
              </button>
              <button
                onClick={() => setSupportFilter('Kognitif')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition ${
                  supportFilter === 'Kognitif'
                    ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                    : (isHighContrast ? 'bg-[#1a1a1a] text-zinc-400 hover:bg-zinc-800' : 'bg-white/5 text-zinc-300 hover:bg-white/10')
                }`}
              >
                Kognitif
              </button>
              <button
                onClick={() => setSupportFilter('Neurodivergent')}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition ${
                  supportFilter === 'Neurodivergent'
                    ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                    : (isHighContrast ? 'bg-[#1a1a1a] text-zinc-400 hover:bg-zinc-800' : 'bg-white/5 text-zinc-300 hover:bg-white/10')
                }`}
              >
                Neurodivergent
              </button>
            </div>

            {/* Student list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <p className="text-center text-xs text-zinc-500 py-6">Siswa tidak ditemukan.</p>
              ) : (
                filteredStudents.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStudentId(st.id);
                      setIsAddingNote(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between ${
                      selectedStudentId === st.id 
                        ? (isHighContrast ? 'border-2 border-black bg-zinc-200 text-black font-black' : 'border-indigo-500/55 bg-indigo-500/10 text-white') 
                        : (isHighContrast ? 'border-zinc-200 text-neutral-800 hover:bg-zinc-100' : 'border-white/5 text-zinc-300 hover:bg-white/5')
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-xs">{st.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate w-32">{st.supportProfile}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold ${isHighContrast ? 'text-black' : 'text-indigo-400'}`}>{st.readinessScore}%</span>
                      <p className="text-[9px] text-zinc-500">Kesiapan</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Monitor / Counseling Notes Panel */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <div className={`p-6 rounded-3xl space-y-6 border ${
              isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
            }`}>
              
              {/* Patient/Student metadata */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className={`${titleClass} ${isHighContrast ? 'text-black' : 'text-white'}`}>{selectedStudent.name}</h3>
                  <p className="text-xs text-zinc-500">{selectedStudent.schoolName} • {selectedStudent.supportProfile}</p>
                </div>
                <button
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-center ${
                    isHighContrast ? 'bg-black text-white hover:bg-zinc-800' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Tambah Catatan
                </button>
              </div>

              {/* Add Note Drawer Form */}
              {isAddingNote && (
                <form onSubmit={handleNoteSubmit} className={`p-5 rounded-2xl space-y-4 border ${
                  isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5'
                }`}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-zinc-300">Tulis Catatan Pendampingan Vokasi</h4>
                    <button type="button" onClick={() => setIsAddingNote(false)} className="text-zinc-500 hover:text-zinc-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 block uppercase">Fokus Kategori</label>
                      <select
                        value={newNote.focusCategory}
                        onChange={(e) => setNewNote(prev => ({ ...prev, focusCategory: e.target.value as any }))}
                        className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                          isHighContrast 
                            ? 'bg-white border-black text-black focus:ring-black' 
                            : 'bg-[#111] border-white/10 text-white focus:ring-indigo-500'
                        }`}
                      >
                        <option value="Kognitif">Kognitif (Logika & Konsentrasi)</option>
                        <option value="Motorik">Motorik (Ketangkasan tangan)</option>
                        <option value="Sosial-Emosional">Sosial-Emosional (Komunikasi)</option>
                        <option value="Kehadiran">Kehadiran & Sikap</option>
                        <option value="Saran">Saran Rumah / Orang Tua</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 block uppercase">Nama Guru Pengampu</label>
                      <input
                        type="text"
                        required
                        value={newNote.teacherName}
                        onChange={(e) => setNewNote(prev => ({ ...prev, teacherName: e.target.value }))}
                        className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                          isHighContrast 
                            ? 'bg-white border-black text-black focus:ring-black' 
                            : 'bg-[#111] border-white/10 text-white focus:ring-indigo-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400 block uppercase">Ulasan Uraian Catatan</label>
                    <textarea
                      required
                      placeholder="Masukkan ulasan pendampingan detail mengenai kemajuan belajar siswa..."
                      rows={3}
                      value={newNote.noteText}
                      onChange={(e) => setNewNote(prev => ({ ...prev, noteText: e.target.value }))}
                      className={`w-full border rounded-xl p-3 text-xs focus:outline-none focus:ring-1 ${
                        isHighContrast 
                          ? 'bg-white border-black text-black focus:ring-black' 
                          : 'bg-[#111] border-white/10 text-white focus:ring-indigo-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Simpan & Publish Catatan
                  </button>
                </form>
              )}

              {/* Private sensitive guardian details - shown to teachers only */}
              <div className={`p-4 rounded-2xl space-y-2 border ${
                isHighContrast ? 'bg-zinc-100 border-black' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              }`}>
                <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${
                  isHighContrast ? 'bg-black text-white' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  <AlertCircle className="w-3 h-3" />
                  DATA SENSITIF KELUARGA (RAHASIA GURU & ORANG TUA)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Kondisi Kesehatan / Medis:</span>
                    <p className={`font-bold mt-0.5 ${isHighContrast ? 'text-black' : 'text-zinc-200'}`}>{selectedStudent.sensitiveData.medicalNotes}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Kontak Utama Wali (Orang Tua):</span>
                    <p className={`font-bold mt-0.5 ${isHighContrast ? 'text-black' : 'text-zinc-200'}`}>{selectedStudent.sensitiveData.guardianContact}</p>
                  </div>
                </div>
              </div>

              {/* Radar Chart of Skills */}
              <div className="space-y-3 pt-2">
                <h4 className={`font-bold font-display text-xs ${isHighContrast ? 'text-black' : 'text-white'}`}>Radar Kompetensi & Kesiapan Kerja</h4>
                <div className={`p-4 rounded-2xl border ${
                  isHighContrast ? 'bg-zinc-100 border-black' : 'bg-indigo-950/10 border-indigo-500/15'
                } flex flex-col md:flex-row items-center gap-6`}>
                  {/* Radar visualizer */}
                  <div className="h-[200px] w-full md:w-1/2 flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={selectedCompetencyData}>
                        <PolarGrid stroke={isHighContrast ? "#4b5563" : "#cfe1d2"} />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ 
                            fill: isHighContrast ? "#000000" : "#61746a", 
                            fontSize: 8,
                            fontWeight: 600
                          }} 
                        />
                        <PolarRadiusAxis 
                          angle={30} 
                          domain={[0, 100]} 
                          tick={{ fill: isHighContrast ? "#000000" : "#61746a", fontSize: 7 }}
                        />
                        <Radar
                          name={selectedStudent.name}
                          dataKey="A"
                          stroke={isHighContrast ? "#000000" : "#12843a"}
                          fill={isHighContrast ? "rgba(0,0,0,0.2)" : "rgba(19, 138, 61, 0.18)"}
                          fillOpacity={0.6}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isHighContrast ? '#ffffff' : '#ffffff',
                            borderColor: isHighContrast ? '#000000' : '#dbe7dd',
                            color: isHighContrast ? '#000000' : '#17351f',
                            borderRadius: '12px',
                            fontSize: '10px'
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Quantitative mini summary */}
                  <div className="w-full md:w-1/2 space-y-2.5 text-[11px] font-semibold text-zinc-400">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Logika Sekuensial:</span>
                      <span className={isHighContrast ? 'text-black font-bold' : 'text-indigo-400'}>{logicScore}%</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Akurasi Administrasi:</span>
                      <span className={isHighContrast ? 'text-black font-bold' : 'text-emerald-400'}>{accuracyScore}%</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Ketangkasan Motorik:</span>
                      <span className={isHighContrast ? 'text-black font-bold' : 'text-amber-400'}>{motoricScore}%</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Konsistensi Fokus:</span>
                      <span className={isHighContrast ? 'text-black font-bold' : 'text-cyan-400'}>{consistencyScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kecepatan Kerja:</span>
                      <span className={isHighContrast ? 'text-black font-bold' : 'text-rose-400'}>{speedScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game sessions results */}
              <div className="space-y-3">
                <h4 className={`font-bold font-display text-xs ${isHighContrast ? 'text-black' : 'text-white'}`}>Hasil Simulasi Kognitif Mandiri</h4>
                {selectedStudentSessions.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-1">Siswa belum memiliki riwayat pengerjaan simulasi.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {selectedStudentSessions.map((se) => (
                      <div key={se.id} className={`p-3.5 rounded-2xl border flex justify-between items-center ${
                        isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5 text-zinc-300'
                      }`}>
                        <div>
                          <p className={`font-bold ${isHighContrast ? 'text-black' : 'text-zinc-200'}`}>{se.gameName}</p>
                          <p className="text-[10px] text-zinc-500">Akurasi {se.metrics.accuracy}% | Konsistensi {se.metrics.consistency}%</p>
                        </div>
                        <span className={`font-mono font-bold ${isHighContrast ? 'text-black' : 'text-emerald-400'}`}>{se.score} Pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Teacher counseling logs */}
              <div className="space-y-3">
                <h4 className={`font-bold font-display text-xs ${isHighContrast ? 'text-black' : 'text-white'}`}>Ulasan Catatan Konseling & Rumah (Terbaru)</h4>
                {selectedStudentNotes.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center border border-dashed border-white/10 rounded-2xl">
                    Belum ada catatan yang ditulis. Klik tombol "Tambah Catatan" di atas untuk mengisi ulasan pertama.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {selectedStudentNotes.map((note) => (
                      <div key={note.id} className={`p-4 rounded-2xl border space-y-2 text-xs ${
                        isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-300'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isHighContrast ? 'bg-black text-white' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                          }`}>{note.focusCategory}</span>
                          <span className="text-zinc-500 text-[10px]">{new Date(note.date).toLocaleDateString('id-ID')}</span>
                        </div>
                        <p className={`leading-relaxed ${isHighContrast ? 'text-neutral-800' : 'text-zinc-300'}`}>{note.noteText}</p>
                        <p className="text-[10px] text-zinc-500 font-bold text-right">— {note.teacherName}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center py-16 text-zinc-500 bg-[#111] border border-white/5 rounded-3xl">
              <Users className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
              Pilih siswa di daftar sebelah kiri untuk memantau kemajuan belajar.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
