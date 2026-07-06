import React, { useState } from 'react';
import { 
  ShieldAlert, Settings, School, Users, Building2, Gamepad2, Plus, 
  Send, Trash2, CheckCircle, Database, LayoutGrid, FileText
} from 'lucide-react';
import { StudentProfile, Company, JobPosting, AccessibilityPreferences, UserRole } from '../types';
import { useAppFeedback } from './AppFeedback';

interface AdminDashboardProps {
  students: StudentProfile[];
  companies: Company[];
  onAddStudent: (student: StudentProfile) => void;
  preferences: AccessibilityPreferences;
}

export default function AdminDashboard({ students, companies, onAddStudent, preferences }: AdminDashboardProps) {
  const { notify } = useAppFeedback();
  const [activeTab, setActiveTab] = useState<'users' | 'schools' | 'companies'>('users');
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Form states
  const [newUser, setNewUser] = useState({
    name: '',
    supportProfile: 'Profil Dukungan Sensorik - komunikasi visual',
    bio: '',
    skills: '',
    interest: 'Administrasi',
    support: ''
  });

  const textClass = {
    normal: 'text-sm',
    large: 'text-base',
    xlarge: 'text-lg'
  }[preferences.textSize];

  const titleClass = {
    normal: 'text-lg font-bold font-display tracking-tight',
    large: 'text-xl font-extrabold font-display tracking-tight',
    xlarge: 'text-2xl font-black font-display tracking-normal'
  }[preferences.textSize];

  // Submit new student profile
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name) return;

    onAddStudent({
      id: `student-${Date.now()}`,
      name: newUser.name,
      schoolId: 'school-slb-1',
      schoolName: 'SLB/Sekolah Inklusi Negeri 1 Jakarta',
      supportProfile: newUser.supportProfile,
      bio: newUser.bio || 'Siswa berdedikasi tinggi yang gemar melatih fokus kognitif harian.',
      skills: newUser.skills.split(',').map(s => s.trim()).filter(Boolean),
      interest: newUser.interest,
      readinessScore: 75,
      supportRequirements: newUser.support.split(',').map(s => s.trim()).filter(Boolean),
      sensitiveData: {
        medicalNotes: 'Kondisi kesehatan prima.',
        guardianContact: 'Ibu Ratna (+62 821-2222-3333)',
        familyBackground: 'Keluarga mendukung penuh kesiapan kerja anak mandiri.',
        privateNotes: 'Bagus dengan instruksi tertulis visual.'
      }
    });

    setIsAddingUser(false);
    setNewUser({
      name: '',
      supportProfile: 'Profil Dukungan Sensorik - komunikasi visual',
      bio: '',
      skills: '',
      interest: 'Administrasi',
      support: ''
    });
    notify({
      title: 'User berhasil didaftarkan',
      message: 'Profil siswa baru sudah masuk ke master data SyncVoca.',
      tone: 'success'
    });
  };

  const isHighContrast = preferences.highContrast;

  return (
    <div className={`space-y-6 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
      
      {/* Bento Grid Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className={`p-6 rounded-3xl border relative overflow-hidden ${
          isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-indigo-950/20 border-indigo-500/10 bento-glow-indigo text-white'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-zinc-500">System Master Console</span>
            </div>
            <p className="text-xl font-black font-display">SyncVoca Cloud</p>
            <p className="text-[10px] font-mono text-zinc-500">ENGINE STATUS: SECURE & ACTIVE</p>
          </div>
          <Database className="w-12 h-12 text-indigo-500/10 absolute right-4 bottom-4" />
        </div>

        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
          isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
        }`}>
          <div className={`p-3 rounded-xl ${isHighContrast ? 'bg-black text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase block tracking-wider">Jumlah Pengguna</span>
            <p className={`text-lg font-black font-display mt-0.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
              {students.length + 4} Pengguna
            </p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
          isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
        }`}>
          <div className={`p-3 rounded-xl ${isHighContrast ? 'bg-black text-white' : 'bg-cyan-500/10 text-cyan-400'}`}>
            <School className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase block tracking-wider">Sekolah Mitra</span>
            <p className={`text-lg font-black font-display mt-0.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
              4 Sekolah Mitra
            </p>
          </div>
        </div>

      </div>

      {/* Main Admin Console Section */}
      <div className={`rounded-3xl border overflow-hidden ${
        isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-[#111] border-white/5 shadow-2xl'
      }`}>
        
        {/* Controls Bar */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center flex-wrap gap-3 bg-white/[0.01]">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/30">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'users'
                  ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                  : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Master Siswa
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'schools'
                  ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                  : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Master Sekolah
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'companies'
                  ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                  : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Master DUDI
            </button>
          </div>

          <button
            onClick={() => setIsAddingUser(!isAddingUser)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
              isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            Tambah Data Siswa
          </button>
        </div>

        {/* User Registration Form */}
        {isAddingUser && (
          <form onSubmit={handleUserSubmit} className={`p-6 border-b border-white/5 space-y-4 text-xs font-medium ${
            isHighContrast ? 'bg-zinc-100 text-black' : 'bg-[#161616] text-white'
          }`}>
            <h4 className="font-bold text-sm font-display">Registrasi Master Siswa Vokasi Baru</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser(p => ({ ...p, name: e.target.value }))}
                  placeholder="Contoh: Rian Hidayat"
                  className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                    isHighContrast 
                      ? 'bg-white border-black text-black focus:ring-black' 
                      : 'bg-[#111] border-white/10 text-white focus:ring-indigo-500'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Profil Dukungan ABK</label>
                <select
                  value={newUser.supportProfile}
                  onChange={(e) => setNewUser(p => ({ ...p, supportProfile: e.target.value }))}
                  className={`w-full border rounded-xl p-2.5 text-xs outline-none focus:ring-1 ${
                    isHighContrast 
                      ? 'bg-white border-black text-black focus:ring-black' 
                      : 'bg-[#111] border-white/10 text-white focus:ring-indigo-500'
                  }`}
                >
                  <option value="Profil Dukungan Sensorik - komunikasi visual">Sensorik - komunikasi visual</option>
                  <option value="Profil Dukungan Mobilitas - akses fisik dan ergonomi">Mobilitas - akses fisik dan ergonomi</option>
                  <option value="Profil Dukungan Kognitif - instruksi bertahap">Kognitif - instruksi bertahap</option>
                  <option value="Profil Dukungan Neurodivergent - fokus bertahap">Neurodivergent - fokus bertahap</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Keterampilan Awal (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={newUser.skills}
                onChange={(e) => setNewUser(p => ({ ...p, skills: e.target.value }))}
                placeholder="Contoh: Data Entry, Input Spreadsheet, Microsoft Excel"
                className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-white border-black text-black focus:ring-black' 
                    : 'bg-[#111] border-white/10 text-white focus:ring-indigo-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Dukungan Akomodasi (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={newUser.support}
                onChange={(e) => setNewUser(p => ({ ...p, support: e.target.value }))}
                placeholder="Contoh: Komunikasi tertulis visual, Akses ramah kursi roda"
                className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-white border-black text-black focus:ring-black' 
                    : 'bg-[#111] border-white/10 text-white focus:ring-indigo-500'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Simpan Master Pengguna
            </button>
          </form>
        )}

        {/* Data Tables */}
        <div className="p-4 overflow-x-auto">
          {activeTab === 'users' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b border-white/5 font-bold ${isHighContrast ? 'bg-zinc-100 text-black border-black' : 'text-zinc-500 bg-white/[0.01]'}`}>
                  <th className="p-3.5">ID Pengguna</th>
                  <th className="p-3.5">Nama Lengkap</th>
                  <th className="p-3.5">Asal Sekolah</th>
                  <th className="p-3.5">Profil Dukungan</th>
                  <th className="p-3.5">Skor Kesiapan</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-white/5 font-medium ${isHighContrast ? 'text-neutral-800' : 'text-zinc-300'}`}>
                {students.map((u) => (
                  <tr key={u.id} className={isHighContrast ? 'hover:bg-zinc-100' : 'hover:bg-white/[0.01]'}>
                    <td className="p-3.5 font-mono text-[10px] text-zinc-500">{u.id}</td>
                    <td className={`p-3.5 font-bold ${isHighContrast ? 'text-black' : 'text-white'}`}>{u.name}</td>
                    <td className="p-3.5">{u.schoolName}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border ${
                        isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-400'
                      }`}>
                        {u.supportProfile}
                      </span>
                    </td>
                    <td className={`p-3.5 font-bold ${isHighContrast ? 'text-black' : 'text-indigo-400'}`}>{u.readinessScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'schools' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b border-white/5 font-bold ${isHighContrast ? 'bg-zinc-100 text-black border-black' : 'text-zinc-500 bg-white/[0.01]'}`}>
                  <th className="p-3.5">ID Sekolah</th>
                  <th className="p-3.5">Nama Institusi</th>
                  <th className="p-3.5">Lokasi</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-white/5 font-medium ${isHighContrast ? 'text-neutral-800' : 'text-zinc-300'}`}>
                <tr className={isHighContrast ? 'hover:bg-zinc-100' : 'hover:bg-white/[0.01]'}>
                  <td className="p-3.5 font-mono text-[10px] text-zinc-500">school-slb-1</td>
                  <td className={`p-3.5 font-bold ${isHighContrast ? 'text-black' : 'text-white'}`}>SLB/Sekolah Inklusi Negeri 1 Jakarta</td>
                  <td className="p-3.5">DKI Jakarta</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border ${
                      isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      MITRA AKTIF
                    </span>
                  </td>
                </tr>
                <tr className={isHighContrast ? 'hover:bg-zinc-100' : 'hover:bg-white/[0.01]'}>
                  <td className="p-3.5 font-mono text-[10px] text-zinc-500">school-slb-2</td>
                  <td className={`p-3.5 font-bold ${isHighContrast ? 'text-black' : 'text-white'}`}>SLB/Sekolah Inklusi Pembina Swasta</td>
                  <td className="p-3.5">Jawa Barat</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border ${
                      isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      MITRA AKTIF
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'companies' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b border-white/5 font-bold ${isHighContrast ? 'bg-zinc-100 text-black border-black' : 'text-zinc-500 bg-white/[0.01]'}`}>
                  <th className="p-3.5">ID DUDI</th>
                  <th className="p-3.5">Nama Perusahaan</th>
                  <th className="p-3.5">Kategori Industri</th>
                  <th className="p-3.5">Lokasi Kantor</th>
                  <th className="p-3.5">Status Sertifikat</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-white/5 font-medium ${isHighContrast ? 'text-neutral-800' : 'text-zinc-300'}`}>
                {companies.map((c) => (
                  <tr key={c.id} className={isHighContrast ? 'hover:bg-zinc-100' : 'hover:bg-white/[0.01]'}>
                    <td className="p-3.5 font-mono text-[10px] text-zinc-500">{c.id}</td>
                    <td className={`p-3.5 font-bold ${isHighContrast ? 'text-black' : 'text-white'}`}>{c.name}</td>
                    <td className="p-3.5">{c.industry}</td>
                    <td className="p-3.5">{c.location}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border ${
                        isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        TERSERTIFIKASI INKLUSI
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
