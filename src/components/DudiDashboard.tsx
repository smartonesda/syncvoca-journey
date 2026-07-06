import React, { useState } from 'react';
import { 
  Building2, Users, Search, Filter, Plus, FileText, Printer, 
  CheckCircle2, Sparkles, Send, X, ClipboardList, Briefcase, DollarSign, MapPin
} from 'lucide-react';
import {
  AccessibilityPreferences,
  DudiCandidateProfile,
  GameSession,
  IndustryValidation,
  JobPosting,
  StudentConsent,
  StudentProfile,
  ValidationActionResult
} from '../types';
import { useAppFeedback } from './AppFeedback';
import { createDudiCandidateProfiles } from '../privacy';

interface DudiDashboardProps {
  students: StudentProfile[];
  sessions: GameSession[];
  jobs: JobPosting[];
  validations: IndustryValidation[];
  consents?: StudentConsent[];
  onAddJob: (job: Omit<JobPosting, 'id'>) => void;
  onAddValidation: (val: Omit<IndustryValidation, 'id'>, actorRole?: 'dudi') => ValidationActionResult;
  preferences: AccessibilityPreferences;
}

export default function DudiDashboard({ 
  students, sessions, jobs, validations, consents = [], onAddJob, onAddValidation, preferences 
}: DudiDashboardProps) {
  const { notify } = useAppFeedback();
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs' | 'add-job'>('talent');
  
  // Talent search states
  const [talentSearch, setTalentSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');

  // Modal / Drawer states for Validation
  const dudiCandidates = createDudiCandidateProfiles(students, sessions, validations, consents, jobs);
  const [selectedStudentForValidation, setSelectedStudentForValidation] = useState<DudiCandidateProfile | null>(null);
  const [validatedSkills, setValidatedSkills] = useState<string[]>([]);
  const [validationNote, setValidationNote] = useState('');

  // New job state
  const [newJob, setNewJob] = useState({
    title: '',
    companyName: 'PT Techindo Solusi Digital',
    location: 'Jakarta Selatan',
    accommodationSupports: [] as string[],
    requiredSkills: [] as string[],
    description: '',
    salaryRange: 'Rp 4.000.000 - Rp 5.000.000',
    type: 'Hybrid' as 'Onsite' | 'Remote' | 'Hybrid'
  });

  const textClass = {
    normal: 'text-sm',
    large: 'text-base',
    xlarge: 'text-lg'
  }[preferences.textSize];

  const headingClass = {
    normal: 'text-xl font-bold font-display tracking-tight',
    large: 'text-2xl font-extrabold font-display tracking-tight',
    xlarge: 'text-3xl font-black font-display tracking-normal'
  }[preferences.textSize];

  // Filtering candidates
  const filteredCandidates = dudiCandidates.filter(candidate => {
    const matchesSearch = candidate.displayCode.toLowerCase().includes(talentSearch.toLowerCase()) ||
                          candidate.interest.toLowerCase().includes(talentSearch.toLowerCase()) ||
                          candidate.skills.some((skill) => skill.toLowerCase().includes(talentSearch.toLowerCase()));
    
    const matchesSkill = skillFilter === 'All' || candidate.skills.includes(skillFilter);

    return matchesSearch && matchesSkill;
  });

  // Extract all unique skills across all students for the filter
  const allSkills = Array.from(new Set(dudiCandidates.flatMap(candidate => candidate.skills)));

  // Handle Validation submit
  const handleValidationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForValidation || validatedSkills.length === 0) return;

    const result = onAddValidation({
      studentId: selectedStudentForValidation.studentRef,
      companyId: 'company-techindo',
      companyName: 'PT Techindo Solusi Digital',
      validatedSkills,
      sealIssuedAt: new Date().toISOString(),
      note: validationNote.trim()
    }, 'dudi');

    if (result.ok) {
      setSelectedStudentForValidation(null);
      setValidatedSkills([]);
      setValidationNote('');
    }
    notify({
      title: result.ok ? 'Industry Validation Seal terbit' : 'Consent belum aktif',
      message: result.ok
        ? `${selectedStudentForValidation.displayCode} sudah mendapat validasi kompetensi dari DUDI.`
        : result.message,
      tone: result.ok ? 'success' : 'warning'
    });
  };

  const handleToggleSkillSelection = (skill: string) => {
    setValidatedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Handle New Job submit
  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.description) return;

    onAddJob({
      title: newJob.title,
      companyId: 'company-techindo',
      companyName: newJob.companyName,
      industry: 'Teknologi Informasi & Software',
      location: newJob.location,
      accommodationSupports: newJob.accommodationSupports.length > 0 ? newJob.accommodationSupports : ['Komunikasi tertulis', 'Instruksi visual', 'Checklist kerja bertahap'],
      requiredSkills: newJob.requiredSkills.length > 0 ? newJob.requiredSkills : ['Data Entry', 'Microsoft Excel'],
      description: newJob.description,
      salaryRange: newJob.salaryRange,
      status: 'Active',
      type: newJob.type
    });

    setActiveTab('jobs');
    setNewJob({
      title: '',
      companyName: 'PT Techindo Solusi Digital',
      location: 'Jakarta Selatan',
      accommodationSupports: [],
      requiredSkills: [],
      description: '',
      salaryRange: 'Rp 4.000.000 - Rp 5.000.000',
      type: 'Hybrid'
    });
    notify({
      title: 'Lowongan inklusif diterbitkan',
      message: 'Kebutuhan talenta DUDI sudah tersedia untuk ekosistem SyncVoca.',
      tone: 'success'
    });
  };

  const isHighContrast = preferences.highContrast;

  return (
    <div className={`space-y-6 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
      
      {/* Upper overview header */}
      <div className={`p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border ${
        isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-[#111] border-white/5 bento-glow-indigo'
      }`}>
        <div className="space-y-1">
          <h2 className={`${headingClass} ${isHighContrast ? 'text-black' : 'text-white'} flex items-center gap-2`}>
            <Building2 className="w-6 h-6 text-indigo-400" />
            Portal Rekrutmen & Hub Mitra Industri
          </h2>
          <p className={`text-xs ${isHighContrast ? 'text-neutral-700' : 'text-zinc-400'}`}>
            Mengkoneksikan pencarian talenta ABK berbasis data riil kompetensi bebas bias demi lingkungan kerja inklusif.
          </p>
        </div>

        {/* Bento Pill Navigation */}
        <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl ${
          isHighContrast ? 'bg-zinc-100 border border-black' : 'bg-[#161616] border border-white/5'
        }`}>
          <button
            onClick={() => setActiveTab('talent')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'talent'
                ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
            }`}
          >
            Cari Bakat
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'jobs'
                ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
            }`}
          >
            Kelola Lowongan ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('add-job')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition flex items-center gap-1 ${
              activeTab === 'add-job'
                ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
                : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Buat Lowongan
          </button>
        </div>
      </div>

      {/* Talent Pool Tab */}
      {activeTab === 'talent' && (
        <div className="space-y-6">
          
          {/* Search filters box */}
          <div className={`p-5 rounded-3xl border grid grid-cols-1 md:grid-cols-3 gap-4 items-center ${
            isHighContrast ? 'bg-white text-black border-black' : 'bg-[#111] border-white/5'
          }`}>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Cari keahlian atau minat..."
                value={talentSearch}
                onChange={(e) => setTalentSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-zinc-100 text-black border border-black focus:ring-black' 
                    : 'bg-[#161616] text-zinc-200 border border-white/5 focus:ring-indigo-500'
                }`}
              />
            </div>

            <div>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className={`w-full border rounded-xl p-2.5 text-xs outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-white border-black text-black focus:ring-black' 
                    : 'bg-[#161616] border-white/5 text-zinc-300 focus:ring-indigo-500'
                }`}
              >
                <option value="All">Semua Keterampilan Teruji</option>
                {allSkills.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2 ${
              isHighContrast ? 'bg-zinc-100 border-black' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
            }`}>
              <Sparkles className="w-4 h-4 shrink-0 text-indigo-400" />
              <span className="text-[10px] leading-snug">
                Portal ini menjaga kerahasiaan medis & keluarga siswa. Akses murni berfokus pada kecocokan kompetensi objektif.
              </span>
            </div>
          </div>

          {/* Candidates grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => {
              const isValidated = candidate.validationSeals.length > 0;

              return (
                <div key={candidate.candidateId} className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 hover:shadow-xl transition duration-200 ${
                  isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-[#111] border-white/5 hover:border-white/10'
                }`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className={`font-bold text-xs ${isHighContrast ? 'text-black' : 'text-zinc-200'}`}>{candidate.displayCode}</h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-0.5">{candidate.schoolSegment}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                        isHighContrast ? 'bg-black text-white border-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {candidate.readinessScore}% Kesiapan
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed line-clamp-3 ${isHighContrast ? 'text-neutral-700' : 'text-zinc-400'}`}>
                      {candidate.portfolioSummary}
                    </p>
                    <div className={`w-fit rounded-lg border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                      candidate.consentStatus === 'approved' && candidate.consentScopes.includes('industry-validation')
                        ? (isHighContrast ? 'border-black bg-white text-black' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400')
                        : (isHighContrast ? 'border-black bg-zinc-100 text-black' : 'border-amber-500/20 bg-amber-500/10 text-amber-300')
                    }`}>
                      Consent {candidate.consentStatus}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Keterampilan Kerja Teruji:</span>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill, i) => (
                          <span key={i} className={`px-2 py-1 rounded-md text-[9px] font-bold border ${
                            isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-400'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-wrap justify-between items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedStudentForValidation(candidate);
                        setValidatedSkills([]);
                        setValidationNote(`Telah berhasil menyelesaikan simulasi dengan performa sangat memuaskan dan direkomendasikan magang.`);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Validasi Kompetensi
                    </button>
                    {isValidated && (
                      <span className={`text-[9px] rounded-lg px-2.5 py-1.5 font-bold uppercase flex items-center gap-1 border ${
                        isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Validated
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Validation Drawer popup modal */}
      {selectedStudentForValidation && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className={`rounded-3xl max-w-md w-full p-6 border shadow-2xl space-y-4 ${
            isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-[#111] border-white/5 text-white'
          }`}>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="font-bold font-display text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Rilis Industry Validation Seal
              </h3>
              <button onClick={() => setSelectedStudentForValidation(null)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Pilihlah keahlian yang ingin perusahaan validasi secara resmi untuk <strong>{selectedStudentForValidation.displayCode}</strong> guna mendongkrak skor pencapaian portofolio kerjanya.
            </p>

            <form onSubmit={handleValidationSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Pilih Keahlian Untuk Disahkan:</label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudentForValidation.skills.map((skill) => {
                    const selected = validatedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => handleToggleSkillSelection(skill)}
                        className={`px-3 py-2 rounded-xl border font-bold text-xs transition ${
                          selected 
                            ? (isHighContrast ? 'bg-black text-white border-black' : 'bg-indigo-600 text-white border-indigo-600') 
                            : (isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] text-zinc-400 hover:bg-zinc-800 border-white/5')
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Uraian Evaluasi Industri</label>
                <textarea
                  required
                  rows={3}
                  value={validationNote}
                  onChange={(e) => setValidationNote(e.target.value)}
                  className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-1 text-xs ${
                    isHighContrast 
                      ? 'bg-white border-black text-black focus:ring-black' 
                      : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
                  }`}
                  placeholder="Berikan ulasan singkat mengenai keandalan kerja kandidat..."
                />
              </div>

              <button
                type="submit"
                disabled={validatedSkills.length === 0}
                className={`w-full py-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-40 ${
                  isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                <Send className="w-4 h-4" />
                Terbitkan Seal & Publikasikan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Jobs Management Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className={`rounded-3xl border overflow-hidden ${
            isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-[#111] border-white/5'
          }`}>
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h3 className={`font-bold font-display text-sm flex items-center gap-1.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
                <Briefcase className="w-4 h-4 text-indigo-400" />
                Daftar Lowongan Kerja Inklusif Perusahaan Anda
              </h3>
            </div>

            <div className="divide-y divide-white/5">
              {jobs.map((job) => (
                <div key={job.id} className={`p-5 flex flex-col md:flex-row justify-between md:items-center gap-4 transition ${
                  isHighContrast ? 'hover:bg-zinc-100' : 'hover:bg-white/[0.02]'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-bold text-sm ${isHighContrast ? 'text-black' : 'text-white'}`}>{job.title}</h4>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isHighContrast ? 'bg-black text-white' : 'bg-white/5 text-zinc-400 border border-white/5'
                      }`}>{job.type}</span>
                    </div>
                    <p className={`text-xs max-w-xl ${isHighContrast ? 'text-neutral-700' : 'text-zinc-400'}`}>{job.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salaryRange}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {job.accommodationSupports.map((supp, i) => (
                        <span key={i} className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                          isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        }`}>
                          {supp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      Lowongan Aktif
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add job posting tab */}
      {activeTab === 'add-job' && (
        <form onSubmit={handleJobSubmit} className={`p-6 rounded-3xl space-y-4 max-w-2xl mx-auto border shadow-2xl text-xs font-medium ${
          isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-[#111] border-white/5 text-white'
        }`}>
          <h3 className="font-bold font-display text-sm border-b border-white/5 pb-2 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-indigo-400" />
            Tulis Lowongan Kerja Inklusif Baru
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Judul Posisi Lowongan</label>
              <input
                type="text"
                required
                value={newJob.title}
                onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Contoh: Staff Input Data Administratif"
                className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-white border-black text-black focus:ring-black' 
                    : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Kisaran Gaji Bulanan</label>
              <input
                type="text"
                required
                value={newJob.salaryRange}
                onChange={(e) => setNewJob(prev => ({ ...prev, salaryRange: e.target.value }))}
                placeholder="Contoh: Rp 4.500.000 - Rp 5.500.000"
                className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-white border-black text-black focus:ring-black' 
                    : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Lokasi Penempatan</label>
              <input
                type="text"
                required
                value={newJob.location}
                onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-white border-black text-black focus:ring-black' 
                    : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Tipe Pekerjaan</label>
              <select
                value={newJob.type}
                onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value as any }))}
                className={`w-full border rounded-xl p-2.5 text-xs outline-none focus:ring-1 ${
                  isHighContrast 
                    ? 'bg-white border-black text-black focus:ring-black' 
                    : 'bg-[#161616] border-white/5 text-zinc-300 focus:ring-indigo-500'
                }`}
              >
                <option value="Hybrid">Hybrid (Sebagian Kantor/Sebagian Rumah)</option>
                <option value="Remote">Remote (Kerja 100% Dari Rumah)</option>
                <option value="Onsite">Onsite (Kerja Di Kantor/Gudang Fisik)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Skill Wajib (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={newJob.requiredSkills.join(', ')}
                onChange={(e) => setNewJob(prev => ({
                  ...prev,
                  requiredSkills: e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                }))}
                placeholder="Contoh: Data Entry, Quality Checking, Canva"
                className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast
                    ? 'bg-white border-black text-black focus:ring-black'
                    : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Akomodasi Kerja (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={newJob.accommodationSupports.join(', ')}
                onChange={(e) => setNewJob(prev => ({
                  ...prev,
                  accommodationSupports: e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                }))}
                placeholder="Contoh: Instruksi visual, checklist kerja, job coach"
                className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 ${
                  isHighContrast
                    ? 'bg-white border-black text-black focus:ring-black'
                    : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Uraian Deskripsi & Tanggung Jawab Pekerjaan</label>
            <textarea
              required
              rows={4}
              value={newJob.description}
              onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Deskripsikan secara detail tugas, suasana kerja, dan akomodasi pendampingan yang diberikan di perusahaan..."
              className={`w-full border rounded-xl p-3 text-xs focus:outline-none focus:ring-1 ${
                isHighContrast 
                  ? 'bg-white border-black text-black focus:ring-black' 
                  : 'bg-[#161616] border-white/10 text-white focus:ring-indigo-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
              isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            Terbitkan Lowongan Sekarang
          </button>
        </form>
      )}
    </div>
  );
}
