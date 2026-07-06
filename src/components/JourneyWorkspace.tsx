import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileBadge,
  FileText,
  GraduationCap,
  HeartHandshake,
  Layers3,
  LockKeyhole,
  Plus,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  UserRoundCheck,
  UsersRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  AccessibilityPreferences,
  AuditEvent,
  Company,
  ConsentStatus,
  DudiCandidateProfile,
  DudiPlacementRecord,
  GameSession,
  IndustryValidation,
  JobPosting,
  PlacementActionResult,
  PlacementStatus,
  StudentConsent,
  StudentProfile,
  TeacherNote,
  ValidationActionResult,
  UserRole
} from '../types';
import { getDudiJobMatchScore } from '../privacy';
import { downloadDudiSafePortfolioPdf } from '../report';
import { useAppFeedback } from './AppFeedback';
import { scrollToTopInstant } from '../utils/scroll';

type StageId = 'intake' | 'simulation' | 'coaching' | 'portfolio' | 'validation';

interface JourneyWorkspaceProps {
  role: UserRole;
  students: StudentProfile[];
  dudiCandidates: DudiCandidateProfile[];
  consents: StudentConsent[];
  placements: DudiPlacementRecord[];
  auditEvents: AuditEvent[];
  sessions: GameSession[];
  teacherNotes: TeacherNote[];
  jobs: JobPosting[];
  validations: IndustryValidation[];
  companies: Company[];
  preferences: AccessibilityPreferences;
  onGameComplete: (session: GameSession) => void;
  onAddNote: (note: Omit<TeacherNote, 'id'>) => void;
  onAddJob: (job: Omit<JobPosting, 'id'>) => void;
  onAddValidation: (validation: Omit<IndustryValidation, 'id'>, actorRole?: UserRole) => ValidationActionResult;
  onAddStudent: (student: StudentProfile) => void;
  onUpdateConsent: (
    studentId: string,
    status: ConsentStatus,
    actorRole: Extract<UserRole, 'guru' | 'admin'>,
    note: string
  ) => StudentConsent;
  onAddPlacement: (
    placement: Omit<DudiPlacementRecord, 'id' | 'createdAt' | 'updatedAt'>,
    actorRole?: UserRole
  ) => PlacementActionResult;
  onUpdatePlacementStatus: (
    placementId: string,
    status: PlacementStatus,
    note: string,
    actorRole?: UserRole
  ) => PlacementActionResult;
  onDudiReportExport: (candidateId: string, fileName: string) => void;
}

const stages: Array<{
  id: StageId;
  title: string;
  short: string;
  outcome: string;
  icon: LucideIcon;
  color: string;
}> = [
  {
    id: 'intake',
    title: 'Intake Dukungan',
    short: 'Intake',
    outcome: 'Minat, profil dukungan, dan batas privasi jelas sejak awal.',
    icon: UserRoundCheck,
    color: 'bg-[#e8f8ee] text-[#12843a]'
  },
  {
    id: 'simulation',
    title: 'Simulasi Kerja',
    short: 'Simulasi',
    outcome: 'Siswa mencoba tugas kerja kecil yang menghasilkan skor kompetensi.',
    icon: Target,
    color: 'bg-[#eaf4ff] text-[#1768c8]'
  },
  {
    id: 'coaching',
    title: 'Rencana Pendampingan',
    short: 'Coach',
    outcome: 'Guru dan orang tua punya action plan yang sama.',
    icon: HeartHandshake,
    color: 'bg-[#fff7d6] text-[#b77900]'
  },
  {
    id: 'portfolio',
    title: 'Portofolio Bukti',
    short: 'Bukti',
    outcome: 'Skill, hasil simulasi, dan catatan pendamping diringkas jadi bukti kerja.',
    icon: FileBadge,
    color: 'bg-[#e8f8ee] text-[#0b5d2a]'
  },
  {
    id: 'validation',
    title: 'Validasi DUDI',
    short: 'Validasi',
    outcome: 'DUDI mencocokkan kebutuhan kerja tanpa melihat data sensitif.',
    icon: BriefcaseBusiness,
    color: 'bg-[#eef2ff] text-[#1768c8]'
  }
];

const roleStartStage: Record<UserRole, StageId> = {
  siswa: 'simulation',
  guru: 'coaching',
  orang_tua: 'coaching',
  dudi: 'validation',
  admin: 'intake'
};

const roleCopy: Record<UserRole, { eyebrow: string; title: string; desc: string; icon: LucideIcon }> = {
  siswa: {
    eyebrow: 'Ruang latihan siswa',
    title: 'Mulai dari misi kecil, berakhir sebagai portofolio kerja.',
    desc: 'Siswa tidak dipaksa memahami seluruh sistem. Yang penting: tahu misi hari ini, melihat progres, dan merasa bukti kerjanya bertambah.',
    icon: Sparkles
  },
  guru: {
    eyebrow: 'Meja pendamping sekolah',
    title: 'Guru mengubah hasil latihan menjadi keputusan pendampingan.',
    desc: 'Fokus guru adalah membaca pola, memilih intervensi berikutnya, dan menjaga data sensitif tetap di ruang sekolah.',
    icon: GraduationCap
  },
  orang_tua: {
    eyebrow: 'Ruang dukungan keluarga',
    title: 'Orang tua mendapat langkah rumah yang kecil dan konkret.',
    desc: 'Keluarga tidak perlu membaca dashboard rumit. Mereka melihat progres, catatan guru, dan latihan rumah yang realistis.',
    icon: HeartHandshake
  },
  dudi: {
    eyebrow: 'Talent desk industri',
    title: 'DUDI melihat kandidat dari bukti kompetensi, bukan label pribadi.',
    desc: 'Mitra industri hanya menerima ringkasan skill, kesiapan kerja, dan kebutuhan akomodasi kerja yang relevan.',
    icon: Building2
  },
  admin: {
    eyebrow: 'Operator ekosistem',
    title: 'Admin menjaga alur data dan kesiapan demo tetap bersih.',
    desc: 'Admin memastikan profil siswa, sekolah, mitra, lowongan, dan validasi berjalan dalam satu pipeline.',
    icon: ShieldCheck
  }
};

const missionTemplates = [
  {
    id: 'logic-sprint',
    name: 'Logic Sprint',
    category: 'Administrasi digital',
    skill: 'Logika sekuensial',
    scoreBump: 6,
    icon: Layers3
  },
  {
    id: 'data-accuracy',
    name: 'Data Accuracy',
    category: 'Input data',
    skill: 'Ketelitian administrasi',
    scoreBump: 4,
    icon: ClipboardCheck
  },
  {
    id: 'packaging-flow',
    name: 'Packaging Flow',
    category: 'Logistik ringan',
    skill: 'Konsistensi kerja',
    scoreBump: 5,
    icon: TimerReset
  }
];

const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short' }).format(new Date(date));

const formatDateTime = (date: string) =>
  date ? new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(date)) : 'Belum tercatat';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getMatchScore = (student: StudentProfile, job: JobPosting) => {
  const lowerSkills = student.skills.map((skill) => skill.toLowerCase());
  const matches = job.requiredSkills.filter((skill) =>
    lowerSkills.some((ownedSkill) => ownedSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(ownedSkill))
  );
  return Math.round((matches.length / Math.max(1, job.requiredSkills.length)) * 100);
};

const getConsentBadgeClass = (status?: ConsentStatus) => {
  if (status === 'approved') return 'border-[#bfe8ca] bg-[#e8f8ee] text-[#0b5d2a]';
  if (status === 'revoked') return 'border-[#fecdd3] bg-[#fff1f2] text-[#be123c]';
  return 'border-[#f6e39f] bg-[#fff7d6] text-[#9a6700]';
};

const placementStatusMeta: Record<PlacementStatus, { label: string; className: string }> = {
  shortlisted: {
    label: 'Shortlisted',
    className: 'border-[#dbe7dd] bg-white text-[#1768c8]'
  },
  interview: {
    label: 'Interview',
    className: 'border-[#c7ddff] bg-[#eaf4ff] text-[#1768c8]'
  },
  work_trial: {
    label: 'Work Trial',
    className: 'border-[#f6e39f] bg-[#fff7d6] text-[#9a6700]'
  },
  placed: {
    label: 'Placed',
    className: 'border-[#bfe8ca] bg-[#e8f8ee] text-[#0b5d2a]'
  },
  not_ready: {
    label: 'Not Ready',
    className: 'border-[#fecdd3] bg-[#fff1f2] text-[#be123c]'
  }
};

const getPlacementStatusNote = (status: PlacementStatus) => {
  if (status === 'interview') return 'DUDI mengundang kandidat ke interview berbasis portfolio evidence.';
  if (status === 'work_trial') return 'Kandidat masuk uji kerja singkat dengan akomodasi kerja yang sudah disepakati.';
  if (status === 'placed') return 'Kandidat dinyatakan siap masuk placement/magang inklusif.';
  if (status === 'not_ready') return 'Kandidat belum dilanjutkan; sekolah perlu memperkuat bukti dan pendampingan.';
  return 'Kandidat masuk shortlist awal berbasis bukti kompetensi publik.';
};

const getSchoolPlacementFollowUp = (status: PlacementStatus, student: StudentProfile) => {
  const primarySupport = student.supportRequirements[0] || 'pendampingan bertahap';

  if (status === 'interview') {
    return `Siapkan simulasi interview singkat, portfolio brief, dan latihan komunikasi berbasis ${primarySupport}.`;
  }
  if (status === 'work_trial') {
    return `Koordinasikan job coach, checklist tugas, dan evaluasi harian berbasis ${primarySupport}.`;
  }
  if (status === 'placed') {
    return `Susun rencana transisi 30 hari, monitoring adaptasi kerja, dan komunikasi rutin sekolah-DUDI.`;
  }
  if (status === 'not_ready') {
    return `Perkuat evidence simulasi, catatan pendamping, dan latihan skill sebelum diajukan ulang ke DUDI.`;
  }
  return `Kurasi ulang portfolio, pastikan consent aktif, dan siapkan ringkasan akomodasi kerja yang relevan.`;
};

export default function JourneyWorkspace({
  role,
  students,
  dudiCandidates,
  consents,
  placements,
  auditEvents,
  sessions,
  teacherNotes,
  jobs,
  validations,
  companies,
  preferences,
  onGameComplete,
  onAddNote,
  onAddJob,
  onAddValidation,
  onAddStudent,
  onUpdateConsent,
  onAddPlacement,
  onUpdatePlacementStatus,
  onDudiReportExport
}: JourneyWorkspaceProps) {
  const { notify } = useAppFeedback();
  const [activeStage, setActiveStage] = useState<StageId>(roleStartStage[role]);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || dudiCandidates[0]?.candidateId || '');
  const [noteDraft, setNoteDraft] = useState('');

  const isHighContrast = preferences.highContrast;
  const isDudiRole = role === 'dudi';
  const visibleStages = isDudiRole
    ? stages.filter((stage) => stage.id === 'portfolio' || stage.id === 'validation')
    : stages;

  const handleStageChange = (stageId: StageId) => {
    setActiveStage(stageId);
    scrollToTopInstant();
  };

  const handleSelectedProfileChange = (profileId: string) => {
    setSelectedStudentId(profileId);
    scrollToTopInstant();
  };

  useLayoutEffect(() => {
    scrollToTopInstant();
  }, [role, activeStage, selectedStudentId]);

  useEffect(() => {
    if (isDudiRole) {
      const nextId = dudiCandidates.some((candidate) => candidate.candidateId === selectedStudentId)
        ? selectedStudentId
        : dudiCandidates[0]?.candidateId || '';
      setSelectedStudentId(nextId);
      if (activeStage !== 'portfolio' && activeStage !== 'validation') setActiveStage('validation');
      return;
    }

    const nextId = students.some((student) => student.id === selectedStudentId)
      ? selectedStudentId
      : students[0]?.id || '';
    setSelectedStudentId(nextId);
  }, [activeStage, dudiCandidates, isDudiRole, selectedStudentId, students]);

  const selectedStudent = useMemo(
    () => (isDudiRole ? undefined : students.find((student) => student.id === selectedStudentId) || students[0]),
    [isDudiRole, selectedStudentId, students]
  );
  const selectedDudiCandidate = useMemo(
    () => dudiCandidates.find((candidate) => candidate.candidateId === selectedStudentId) || dudiCandidates[0],
    [dudiCandidates, selectedStudentId]
  );
  const studentSessions = useMemo(
    () => sessions.filter((session) => session.studentId === selectedStudent?.id),
    [sessions, selectedStudent?.id]
  );
  const studentNotes = useMemo(
    () => teacherNotes.filter((note) => note.studentId === selectedStudent?.id),
    [teacherNotes, selectedStudent?.id]
  );
  const studentValidations = useMemo(
    () => validations.filter((validation) => validation.studentId === selectedStudent?.id),
    [validations, selectedStudent?.id]
  );
  const selectedConsent = useMemo(
    () => consents.find((consent) => consent.studentId === selectedStudent?.id),
    [consents, selectedStudent?.id]
  );
  const selectedStudentAuditEvents = useMemo(
    () => auditEvents
      .filter((event) => event.metadata.studentId === selectedStudent?.id || event.targetId === selectedStudent?.id)
      .slice(0, 4),
    [auditEvents, selectedStudent?.id]
  );
  const studentById = useMemo(() => new Map(students.map((student) => [student.id, student])), [students]);
  const selectedStudentPlacements = useMemo(
    () => placements.filter((placement) => placement.studentId === selectedStudent?.id),
    [placements, selectedStudent?.id]
  );
  const recentPlacementOutcomes = useMemo(() => placements.slice(0, 5), [placements]);
  const placementOutcomeSummary = useMemo(() => ({
    active: placements.filter((placement) =>
      placement.status === 'shortlisted' || placement.status === 'interview' || placement.status === 'work_trial'
    ).length,
    placed: placements.filter((placement) => placement.status === 'placed').length,
    needsSupport: placements.filter((placement) => placement.status === 'not_ready').length
  }), [placements]);
  const governanceSummary = useMemo(() => {
    const consentStudentIds = new Set(consents.map((consent) => consent.studentId));
    const missingConsentCount = students.filter((student) => !consentStudentIds.has(student.id)).length;
    const approvedIndustryConsent = consents.filter(
      (consent) => consent.status === 'approved' && consent.scopes.includes('industry-validation')
    ).length;
    const needsActionConsent = consents.filter(
      (consent) => consent.status !== 'approved' || !consent.scopes.includes('industry-validation')
    ).length + missingConsentCount;

    return {
      approvedIndustryConsent,
      needsActionConsent,
      blockedValidations: auditEvents.filter((event) => event.action === 'industry_validation_blocked').length,
      issuedValidations: auditEvents.filter((event) => event.action === 'industry_validation_issued').length,
      safeReportExports: auditEvents.filter((event) => event.action === 'dudi_safe_report_exported').length,
      placementPipeline: placements.length
    };
  }, [auditEvents, consents, placements.length, students]);
  const adminConsentQueue = useMemo(() => {
    const consentByStudent = new Map(consents.map((consent) => [consent.studentId, consent]));

    return students
      .map((student) => ({ student, consent: consentByStudent.get(student.id) }))
      .filter(({ consent }) => !consent || consent.status !== 'approved' || !consent.scopes.includes('industry-validation'))
      .slice(0, 6);
  }, [consents, students]);
  const recentGovernanceEvents = useMemo(() => auditEvents.slice(0, 8), [auditEvents]);
  const averageScore = studentSessions.length
    ? Math.round(studentSessions.reduce((sum, session) => sum + session.score, 0) / studentSessions.length)
    : selectedStudent?.readinessScore || 0;
  const journeyScore = selectedStudent ? Math.round((selectedStudent.readinessScore + averageScore + studentValidations.length * 8) / (studentValidations.length ? 2.15 : 2)) : 0;
  const RoleIcon = roleCopy[role].icon;

  const runMission = (mission: (typeof missionTemplates)[number]) => {
    if (!selectedStudent) return;
    const score = clamp(selectedStudent.readinessScore + mission.scoreBump + Math.round(Math.random() * 5), 72, 99);
    onGameComplete({
      id: `session-${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      gameId: mission.id,
      gameName: mission.name,
      score,
      date: new Date().toISOString(),
      metrics: {
        accuracy: clamp(score + 2, 0, 100),
        completionTime: 120 + Math.round(Math.random() * 55),
        errorCount: score > 90 ? 1 : 3,
        consistency: clamp(score - 1, 0, 100)
      }
    });
    handleStageChange('portfolio');
  };

  const addQuickNote = () => {
    if (!selectedStudent || !noteDraft.trim()) return;
    onAddNote({
      studentId: selectedStudent.id,
      teacherName: role === 'orang_tua' ? 'Orang Tua/Wali' : 'Guru Pendamping SyncVoca',
      noteText: noteDraft.trim(),
      date: new Date().toISOString(),
      focusCategory: role === 'orang_tua' ? 'Saran' : 'Kognitif'
    });
    setNoteDraft('');
  };

  const addPlacementSupportNote = (placement: DudiPlacementRecord) => {
    if (!selectedStudent || (role !== 'guru' && role !== 'admin')) return;

    const followUp = getSchoolPlacementFollowUp(placement.status, selectedStudent);
    onAddNote({
      studentId: selectedStudent.id,
      teacherName: role === 'admin' ? 'Admin SyncVoca' : 'Guru Pendamping SyncVoca',
      noteText: `${placementStatusMeta[placement.status].label} - ${placement.jobTitle}: ${followUp}`,
      date: new Date().toISOString(),
      focusCategory: 'Saran'
    });

    notify({
      title: 'Follow-up placement tersimpan',
      message: `${selectedStudent.name}: catatan tindak lanjut ${placementStatusMeta[placement.status].label.toLowerCase()} ditambahkan.`,
      tone: 'success'
    });
  };

  const addValidationSeal = () => {
    if (!selectedStudent || !companies[0]) return;
    const result = onAddValidation({
      studentId: selectedStudent.id,
      companyId: companies[0].id,
      companyName: companies[0].name,
      validatedSkills: selectedStudent.skills.slice(0, 3),
      sealIssuedAt: new Date().toISOString(),
      note: `Validasi berbasis portofolio SyncVoca. Kandidat memenuhi kebutuhan awal untuk ${selectedStudent.interest}.`
    }, role);

    notify({
      title: result.ok ? 'Seal validasi terbit' : 'Consent belum aktif',
      message: result.message,
      tone: result.ok ? 'success' : 'warning'
    });
  };

  const addInclusiveJob = () => {
    if (!companies[0]) return;
    onAddJob({
      title: 'Magang Operasional Inklusif',
      companyId: companies[0].id,
      companyName: companies[0].name,
      industry: companies[0].industry,
      location: companies[0].location,
      accommodationSupports: ['Checklist kerja visual', 'Feedback tertulis', 'Target harian bertahap'],
      requiredSkills: ['Ketelitian', 'Input Data', 'Konsistensi Kerja'],
      description: 'Program magang berbasis tugas kecil untuk kandidat ABK dengan portofolio kompetensi terverifikasi.',
      salaryRange: 'Rp 2.500.000 - Rp 3.500.000',
      status: 'Draft',
      type: 'Hybrid'
    });
  };

  const addDemoLearner = () => {
    const next = students.length + 1;
    onAddStudent({
      id: `student-demo-${Date.now()}`,
      name: `Siswa Demo ${next}`,
      schoolId: 'school-inklusi-demo',
      schoolName: 'Sekolah Inklusi Mitra',
      supportProfile: 'Profil Dukungan ABK - observasi awal sekolah',
      bio: 'Profil demo untuk menguji alur intake, simulasi, pendampingan, portofolio, dan validasi.',
      skills: ['Ketelitian', 'Komunikasi Tertulis', 'Konsistensi Kerja'],
      interest: 'Administrasi Operasional',
      readinessScore: 76,
      supportRequirements: ['Instruksi visual', 'Checklist harian', 'Feedback tertulis'],
      sensitiveData: {
        medicalNotes: 'Data privat hanya untuk sekolah.',
        guardianContact: 'Kontak wali demo',
        familyBackground: 'Latar keluarga demo.',
        privateNotes: 'Catatan internal demo.'
      }
    });
  };

  const updateConsentForStudent = (student: StudentProfile, status: ConsentStatus) => {
    if (role !== 'guru' && role !== 'admin') return;

    const note = status === 'approved'
      ? 'Consent disetujui untuk portofolio, akomodasi kerja, dan validasi industri.'
      : status === 'revoked'
        ? 'Consent dicabut sampai ada persetujuan ulang dari sekolah/wali.'
        : 'Consent diminta untuk portofolio dan akomodasi kerja; validasi industri menunggu persetujuan.';

    const consent = onUpdateConsent(
      student.id,
      status,
      role === 'admin' ? 'admin' : 'guru',
      note
    );

    notify({
      title: status === 'approved' ? 'Consent disetujui' : status === 'revoked' ? 'Consent dicabut' : 'Consent diminta',
      message: `${student.name}: status consent sekarang ${consent.status}.`,
      tone: status === 'approved' ? 'success' : 'warning'
    });
  };

  const updateSelectedConsent = (status: ConsentStatus) => {
    if (!selectedStudent) return;
    updateConsentForStudent(selectedStudent, status);
  };

  const panelClass = isHighContrast
    ? 'border-2 border-black bg-white text-black'
    : 'border border-[#dbe7dd] bg-white text-[#17351f] shadow-sm';

  const renderSchoolPlacementMonitoring = () => {
    if (role !== 'guru' && role !== 'admin') return null;

    return (
      <section className={`space-y-5 rounded-[1.75rem] p-5 sm:p-6 ${panelClass}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#eaf4ff] p-3 text-[#1768c8]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1768c8]">Placement outcome monitoring</p>
                <h3 className="mt-1 font-display text-2xl font-black leading-tight">Sekolah membaca outcome DUDI dan menyiapkan dukungan berikutnya.</h3>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[#61746a]">
              Guru/Admin melihat pipeline DUDI sebagai sinyal tindak lanjut internal: interview, uji kerja, placement, atau penguatan ulang. Data privat tetap berada di sekolah.
            </p>
          </div>
          <div className="grid w-full gap-2 sm:grid-cols-3 lg:w-auto">
            {[
              ['Aktif', placementOutcomeSummary.active],
              ['Placed', placementOutcomeSummary.placed],
              ['Butuh dukungan', placementOutcomeSummary.needsSupport]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{label}</p>
                <p className="mt-1 font-display text-2xl font-black text-[#0b5d2a]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[1.25rem] border border-[#dbe7dd] bg-white p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Siswa terpilih</p>
                <h4 className="font-display text-lg font-black">{selectedStudent?.name}</h4>
              </div>
              <span className="w-fit rounded-full bg-[#fff7d6] px-3 py-1 text-[11px] font-black text-[#9a6700]">
                {selectedStudentPlacements.length} outcome
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {selectedStudentPlacements.map((placement) => {
                const supportPlan = selectedStudent ? getSchoolPlacementFollowUp(placement.status, selectedStudent) : '';

                return (
                  <div key={placement.id} className="rounded-2xl bg-[#f8faf7] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-black text-[#17351f]">{placement.jobTitle}</p>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">
                          {placement.companyName} - kode publik {placement.candidateCode}
                        </p>
                        <p className="mt-1 text-[11px] font-bold text-[#61746a]">
                          Update: {formatDateTime(placement.updatedAt)}
                        </p>
                      </div>
                      <span className={`w-fit rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${placementStatusMeta[placement.status].className}`}>
                        {placementStatusMeta[placement.status].label}
                      </span>
                    </div>
                    <div className="mt-3 rounded-2xl border border-[#dbe7dd] bg-white p-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#12843a]">Rencana tindak lanjut sekolah</p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-[#17351f]">{supportPlan}</p>
                    </div>
                    <button
                      onClick={() => addPlacementSupportNote(placement)}
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#12843a] px-4 py-2 text-xs font-black text-white transition hover:bg-[#0b5d2a]"
                    >
                      <BookOpenCheck className="h-4 w-4" />
                      Catat Follow-up
                    </button>
                  </div>
                );
              })}
              {selectedStudentPlacements.length === 0 && (
                <p className="rounded-2xl bg-[#f8faf7] p-4 text-sm font-semibold leading-relaxed text-[#61746a]">
                  Belum ada outcome DUDI untuk siswa ini. Setelah DUDI shortlist atau update status, rencana dukungan akan muncul di sini.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.25rem] border border-[#dbe7dd] bg-white p-4">
              <div className="flex items-center gap-3">
                <TimerReset className="h-5 w-5 text-[#1768c8]" />
                <h4 className="font-display text-lg font-black">Pipeline snapshot</h4>
              </div>
              <div className="mt-4 space-y-2">
                {recentPlacementOutcomes.map((placement) => {
                  const student = studentById.get(placement.studentId);

                  return (
                    <div key={placement.id} className="rounded-2xl bg-[#f8faf7] p-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-black leading-relaxed text-[#17351f]">{student?.name || placement.candidateCode}</p>
                          <p className="mt-1 text-[11px] font-bold text-[#61746a]">{placement.jobTitle}</p>
                        </div>
                        <span className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${placementStatusMeta[placement.status].className}`}>
                          {placementStatusMeta[placement.status].label}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {recentPlacementOutcomes.length === 0 && (
                  <p className="text-xs font-semibold text-[#61746a]">Belum ada pipeline placement dari DUDI.</p>
                )}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-[#dbe7dd] bg-[#fff7d6] p-4">
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-[#9a6700]" />
                <h4 className="font-display text-lg font-black">Boundary internal</h4>
              </div>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#17351f]">
                Nama siswa, catatan pendamping, dan kebutuhan dukungan detail hanya muncul di ruang Guru/Admin. DUDI tetap memakai kode kandidat dan evidence publik.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderAdminGovernanceCenter = () => {
    if (role !== 'admin') return null;

    const metricCards = [
      {
        label: 'Consent validasi aktif',
        value: governanceSummary.approvedIndustryConsent,
        desc: 'Kandidat siap dibaca dan divalidasi DUDI.'
      },
      {
        label: 'Butuh tindak lanjut',
        value: governanceSummary.needsActionConsent,
        desc: 'Pending, revoked, atau belum mencakup validasi industri.'
      },
      {
        label: 'Validasi diblokir',
        value: governanceSummary.blockedValidations,
        desc: 'Aksi DUDI yang dihentikan oleh consent gate.'
      },
      {
        label: 'Report aman diekspor',
        value: governanceSummary.safeReportExports,
        desc: 'PDF DUDI-safe yang tercatat di audit log.'
      },
      {
        label: 'Placement pipeline',
        value: governanceSummary.placementPipeline,
        desc: 'Shortlist, interview, trial, atau placement aktif.'
      }
    ];

    return (
      <section className={`space-y-5 rounded-[1.75rem] p-5 sm:p-6 ${panelClass}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#e8f8ee] p-3 text-[#12843a]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#12843a]">Admin governance center</p>
                <h3 className="mt-1 font-display text-2xl font-black leading-tight">Kontrol privacy, consent, dan audit operasional demo.</h3>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[#61746a]">
              Admin melihat status gate sebelum data publik dibaca DUDI: consent, aksi validasi, export report aman, dan batas field yang boleh keluar.
            </p>
          </div>
          <div className="rounded-2xl border border-[#dbe7dd] bg-[#fff7d6] px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9a6700]">Seal terbit</p>
            <p className="mt-1 font-display text-3xl font-black text-[#0b5d2a]">{governanceSummary.issuedValidations}</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {metricCards.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{metric.label}</p>
              <p className="mt-2 font-display text-3xl font-black text-[#0b5d2a]">{metric.value}</p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">{metric.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.25rem] border border-[#dbe7dd] bg-white p-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-[#1768c8]" />
              <h4 className="font-display text-lg font-black">Consent queue</h4>
            </div>
            <div className="mt-4 space-y-3">
              {adminConsentQueue.map(({ student, consent }) => (
                <div key={student.id} className="rounded-2xl bg-[#f8faf7] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#17351f]">{student.name}</p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">{student.interest}</p>
                      <p className="mt-1 text-[11px] font-bold text-[#61746a]">
                        Update: {formatDateTime(consent?.updatedAt || '')}
                      </p>
                    </div>
                    <span className={`w-fit shrink-0 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${getConsentBadgeClass(consent?.status)}`}>
                      {consent?.status || 'missing'}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(consent?.scopes.length ? consent.scopes : ['scope belum tersedia']).map((scope) => (
                      <span key={scope} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#61746a]">
                        {scope}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <button
                      onClick={() => updateConsentForStudent(student, 'pending')}
                      className="rounded-full border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
                    >
                      Request
                    </button>
                    <button
                      onClick={() => updateConsentForStudent(student, 'approved')}
                      className="rounded-full bg-[#12843a] px-3 py-2 text-xs font-black text-white transition hover:bg-[#0b5d2a]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateConsentForStudent(student, 'revoked')}
                      className="rounded-full bg-[#fff1f2] px-3 py-2 text-xs font-black text-[#be123c] transition hover:bg-[#ffe4e6]"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
              {adminConsentQueue.length === 0 && (
                <p className="rounded-2xl bg-[#f8faf7] p-4 text-sm font-semibold text-[#61746a]">
                  Semua siswa demo sudah memiliki consent validasi industri aktif.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.25rem] border border-[#dbe7dd] bg-white p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#12843a]" />
                <h4 className="font-display text-lg font-black">Recent audit trail</h4>
              </div>
              <div className="mt-4 space-y-2">
                {recentGovernanceEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl bg-[#f8faf7] p-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <p className="text-xs font-black leading-relaxed text-[#17351f]">{event.summary}</p>
                      <span className="w-fit shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#1768c8]">
                        {event.actorRole}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-[#61746a]">
                      {formatDateTime(event.createdAt)} - {event.action.replaceAll('_', ' ')}
                    </p>
                  </div>
                ))}
                {recentGovernanceEvents.length === 0 && (
                  <p className="text-xs font-semibold text-[#61746a]">Belum ada audit event operasional.</p>
                )}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-[#12843a]" />
                <h4 className="font-display text-lg font-black">Role visibility policy</h4>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {[
                  ['DUDI boleh', 'Kode kandidat, skill, skor, evidence, akomodasi kerja, consent, seal.'],
                  ['Internal saja', 'Nama siswa, sekolah spesifik, catatan guru, wali, medis, keluarga.'],
                  ['Kontrol', 'Semua validasi dan export report harus tercatat di audit log.']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#12843a]">{label}</p>
                    <p className="mt-1 text-xs font-black leading-relaxed text-[#17351f]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const addDudiValidationSeal = () => {
    if (!selectedDudiCandidate || !companies[0]) return;
    const result = onAddValidation({
      studentId: selectedDudiCandidate.studentRef,
      companyId: companies[0].id,
      companyName: companies[0].name,
      validatedSkills: selectedDudiCandidate.skills.slice(0, 3),
      sealIssuedAt: new Date().toISOString(),
      note: `Validasi berbasis portofolio SyncVoca untuk ${selectedDudiCandidate.displayCode}. Kandidat memenuhi kebutuhan awal jalur ${selectedDudiCandidate.interest}.`
    }, 'dudi');

    notify({
      title: result.ok ? 'Seal DUDI terbit' : 'Consent belum aktif',
      message: result.ok
        ? `${selectedDudiCandidate.displayCode} sudah mendapat Industry Validation Seal.`
        : result.message,
      tone: result.ok ? 'success' : 'warning'
    });
  };

  if (isDudiRole) {
    if (!selectedDudiCandidate) {
      return (
        <section className="rounded-[1.5rem] border border-[#dbe7dd] bg-white p-6 text-sm font-bold text-[#61746a]">
          Data kandidat publik belum tersedia untuk DUDI.
        </section>
      );
    }

    const dudiActiveStage = activeStage === 'portfolio' ? 'portfolio' : 'validation';
    const candidateAverageScore = selectedDudiCandidate.evidenceItems.length
      ? Math.round(selectedDudiCandidate.evidenceItems.reduce((sum, item) => sum + item.score, 0) / selectedDudiCandidate.evidenceItems.length)
      : selectedDudiCandidate.readinessScore;
    const hasIndustryConsent = selectedDudiCandidate.consentStatus === 'approved' && selectedDudiCandidate.consentScopes.includes('industry-validation');
    const consentBadgeClass = hasIndustryConsent
      ? 'bg-[#e8f8ee] text-[#0b5d2a] border-[#bfe8ca]'
      : selectedDudiCandidate.consentStatus === 'revoked'
        ? 'bg-[#fff1f2] text-[#be123c] border-[#fecdd3]'
        : 'bg-[#fff7d6] text-[#9a6700] border-[#f6e39f]';
    const candidateAuditEvents = auditEvents
      .filter((event) =>
        event.metadata.studentId === selectedDudiCandidate.studentRef ||
        event.metadata.candidateId === selectedDudiCandidate.displayCode ||
        event.targetId === selectedDudiCandidate.studentRef
      )
      .slice(0, 5);
    const candidatePlacements = placements
      .filter((placement) => placement.studentId === selectedDudiCandidate.studentRef)
      .slice(0, 4);
    const primaryJob = jobs.find((job) => job.status === 'Active') || jobs[0];

    const addDudiShortlist = () => {
      if (!primaryJob) {
        notify({
          title: 'Lowongan belum tersedia',
          message: 'Buat lowongan inklusif terlebih dahulu sebelum shortlist kandidat.',
          tone: 'warning'
        });
        return;
      }

      const result = onAddPlacement({
        studentId: selectedDudiCandidate.studentRef,
        candidateCode: selectedDudiCandidate.displayCode,
        companyId: primaryJob.companyId,
        companyName: primaryJob.companyName,
        jobId: primaryJob.id,
        jobTitle: primaryJob.title,
        status: 'shortlisted',
        note: `Shortlist berbasis readiness ${selectedDudiCandidate.readinessScore}% dan evidence publik ${selectedDudiCandidate.displayCode}.`
      }, 'dudi');

      notify({
        title: result.ok ? 'Kandidat masuk pipeline' : 'Shortlist diblokir',
        message: result.message,
        tone: result.ok ? 'success' : 'warning'
      });
    };

    const updateDudiPlacementStatus = (placement: DudiPlacementRecord, status: PlacementStatus) => {
      const result = onUpdatePlacementStatus(
        placement.id,
        status,
        getPlacementStatusNote(status),
        'dudi'
      );

      notify({
        title: result.ok ? 'Status placement diperbarui' : 'Update placement gagal',
        message: result.message,
        tone: result.ok ? 'success' : 'warning'
      });
    };

    const exportDudiSafeReport = async () => {
      try {
        const payload = await downloadDudiSafePortfolioPdf(selectedDudiCandidate, candidateAuditEvents);
        onDudiReportExport(selectedDudiCandidate.candidateId, payload.fileName);
        notify({
          title: 'Report aman diekspor',
          message: `${payload.fileName} hanya berisi payload publik DUDI.`,
          tone: 'success'
        });
      } catch (error) {
        console.error('Failed to export DUDI-safe report', error);
        notify({
          title: 'Report gagal diekspor',
          message: 'Coba ulangi export report kandidat.',
          tone: 'warning'
        });
      }
    };

    const renderDudiStage = () => {
      if (dudiActiveStage === 'portfolio') {
        return (
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#12843a]">Pseudonymized portfolio</p>
              <h3 className="mt-2 font-display text-2xl font-black">{selectedDudiCandidate.displayCode}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
                {selectedDudiCandidate.portfolioSummary}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['Readiness', `${selectedDudiCandidate.readinessScore}%`],
                  ['Avg simulasi', `${candidateAverageScore}%`],
                  ['Seal', `${selectedDudiCandidate.validationSeals.length}`]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#f8faf7] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{label}</p>
                    <p className="mt-2 font-display text-3xl font-black text-[#0b5d2a]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dbe7dd] bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Skill terbukti</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedDudiCandidate.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-[#e8f8ee] px-3 py-1.5 text-xs font-bold text-[#0b5d2a]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#dbe7dd] bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Akomodasi kerja</p>
                  <div className="mt-3 space-y-2">
                    {selectedDudiCandidate.accommodationNeeds.map((need) => (
                      <div key={need} className="flex gap-2 text-xs font-bold text-[#17351f]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#12843a]" />
                        <span>{need}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#1768c8]" />
                <h3 className="font-display text-xl font-black">Evidence stack publik</h3>
              </div>
              <div className="mt-4 space-y-3">
                {selectedDudiCandidate.evidenceItems.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-[#f8faf7] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-black">{item.title}</h4>
                        <p className="mt-1 text-xs font-semibold text-[#61746a]">
                          Akurasi {item.accuracy}% - konsistensi {item.consistency}% - {item.completionTime} detik
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#12843a]">{item.score}%</span>
                    </div>
                  </div>
                ))}
                {selectedDudiCandidate.evidenceItems.length === 0 && (
                  <p className="rounded-2xl bg-[#f8faf7] p-4 text-sm font-semibold text-[#61746a]">
                    Kandidat belum memiliki evidence simulasi yang siap dibaca DUDI.
                  </p>
                )}
              </div>
            </section>
          </div>
        );
      }

      return (
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1768c8]">Talent match</p>
            <h3 className="mt-2 font-display text-2xl font-black">Cocokkan lowongan tanpa membuka data sensitif.</h3>
            <div className="mt-5 space-y-3">
              {jobs.slice(0, 4).map((job) => (
                <div key={job.id} className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-black">{job.title}</h4>
                      <p className="mt-1 text-xs font-semibold text-[#61746a]">{job.companyName} - {job.type}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#12843a]">
                      {getDudiJobMatchScore(selectedDudiCandidate, job)}%
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.accommodationSupports.slice(0, 3).map((support) => (
                      <span key={support} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#61746a]">{support}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#12843a]" />
              <h3 className="font-display text-xl font-black">Industry validation seal</h3>
            </div>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
              {selectedDudiCandidate.privacyNotice}
            </p>
            <div className="mt-4 rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Consent sekolah/wali</p>
                  <p className="mt-1 text-sm font-black leading-relaxed">{selectedDudiCandidate.consentSummary}</p>
                </div>
                <span className={`w-fit rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${consentBadgeClass}`}>
                  {selectedDudiCandidate.consentStatus}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedDudiCandidate.consentScopes.map((scope) => (
                  <span key={scope} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#61746a]">
                    {scope}
                  </span>
                ))}
                {selectedDudiCandidate.consentScopes.length === 0 && (
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#61746a]">scope belum tersedia</span>
                )}
              </div>
              <p className="mt-3 text-[11px] font-bold text-[#61746a]">
                Update: {formatDateTime(selectedDudiCandidate.consentUpdatedAt)}
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {selectedDudiCandidate.validationSeals.map((validation) => (
                <div key={validation.id} className="rounded-2xl bg-[#e8f8ee] p-4">
                  <p className="text-sm font-black text-[#0b5d2a]">{validation.companyName}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">{validation.note}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {validation.validatedSkills.map((skill) => (
                      <span key={skill} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#0b5d2a]">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
              {selectedDudiCandidate.validationSeals.length === 0 && (
                <p className="rounded-2xl bg-[#f8faf7] p-4 text-sm font-semibold text-[#61746a]">
                  Belum ada seal dari DUDI untuk kandidat ini.
                </p>
              )}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={addDudiValidationSeal}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black ${
                  hasIndustryConsent ? 'bg-[#12843a] text-white' : 'bg-[#f6c343] text-[#17351f]'
                }`}
              >
                <BadgeCheck className="h-4 w-4" />
                {hasIndustryConsent ? 'Terbitkan Seal' : 'Cek Consent'}
              </button>
              <button
                onClick={addInclusiveJob}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#dbe7dd] bg-white px-4 py-3 text-sm font-black text-[#17351f]"
              >
                <Plus className="h-4 w-4" />
                Buat Lowongan
              </button>
              <button
                onClick={addDudiShortlist}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1768c8] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0d4f9e]"
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Shortlist
              </button>
            </div>
            <div className="mt-5 rounded-2xl border border-[#dbe7dd] bg-white p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Shortlist & placement pipeline</p>
                  <h4 className="mt-1 text-sm font-black">Follow-up DUDI berbasis bukti aman</h4>
                </div>
                {primaryJob && (
                  <span className="w-fit rounded-full bg-[#eaf4ff] px-3 py-1 text-[11px] font-black text-[#1768c8]">
                    Target: {primaryJob.title}
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-3">
                {candidatePlacements.map((placement) => (
                  <div key={placement.id} className="rounded-2xl bg-[#f8faf7] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-black text-[#17351f]">{placement.candidateCode}</p>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">
                          {placement.jobTitle} - {placement.companyName}
                        </p>
                        <p className="mt-1 text-[11px] font-bold text-[#61746a]">
                          Update: {formatDateTime(placement.updatedAt)}
                        </p>
                      </div>
                      <span className={`w-fit rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${placementStatusMeta[placement.status].className}`}>
                        {placementStatusMeta[placement.status].label}
                      </span>
                    </div>
                    <p className="mt-3 text-xs font-semibold leading-relaxed text-[#61746a]">{placement.note}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-4">
                      {(['interview', 'work_trial', 'placed', 'not_ready'] as PlacementStatus[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateDudiPlacementStatus(placement, status)}
                          disabled={placement.status === status}
                          className={`rounded-full px-3 py-2 text-[11px] font-black transition ${
                            placement.status === status
                              ? 'cursor-not-allowed bg-[#e8f8ee] text-[#0b5d2a]'
                              : 'border border-[#dbe7dd] bg-white text-[#17351f] hover:bg-[#eef8f0]'
                          }`}
                        >
                          {placementStatusMeta[status].label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {candidatePlacements.length === 0 && (
                  <p className="rounded-2xl bg-[#f8faf7] p-4 text-sm font-semibold leading-relaxed text-[#61746a]">
                    Kandidat belum masuk pipeline. Gunakan Shortlist setelah consent aktif agar follow-up tetap tercatat.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-[#dbe7dd] bg-white p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Audit trail kandidat</p>
              <div className="mt-3 space-y-2">
                {candidateAuditEvents.map((event) => (
                  <div key={event.id} className="rounded-xl bg-[#f8faf7] p-3">
                    <p className="text-xs font-black text-[#17351f]">{event.summary}</p>
                    <p className="mt-1 text-[11px] font-bold text-[#61746a]">{formatDateTime(event.createdAt)} - {event.actorRole}</p>
                  </div>
                ))}
                {candidateAuditEvents.length === 0 && (
                  <p className="text-xs font-semibold text-[#61746a]">Belum ada audit event untuk kandidat ini.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      );
    };

    return (
      <div className={`space-y-5 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
        <section className={`overflow-hidden rounded-[1.75rem] ${panelClass}`}>
          <div className="grid gap-0 lg:grid-cols-[1fr_18rem]">
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#e8f8ee] p-3 text-[#12843a]">
                  <RoleIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#12843a]">{roleCopy.dudi.eyebrow}</p>
                  <h2 className="mt-2 max-w-3xl font-display text-2xl font-black leading-tight sm:text-4xl">{roleCopy.dudi.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-[#61746a]">
                    DUDI menerima data publik yang sudah dipseudonimkan: kode kandidat, skill, skor, evidence, kebutuhan akomodasi kerja, dan seal.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Readiness', `${selectedDudiCandidate.readinessScore}%`],
                  ['Sesi bukti', `${selectedDudiCandidate.evidenceItems.length}`],
                  ['Seal industri', `${selectedDudiCandidate.validationSeals.length}`]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#f8faf7] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{label}</p>
                    <p className="mt-1 font-display text-3xl font-black text-[#0b5d2a]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={exportDudiSafeReport}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1768c8] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0d4f9e] sm:w-auto"
                >
                  <Download className="h-4 w-4" />
                  Export Report Aman
                </button>
                <p className="text-xs font-semibold leading-relaxed text-[#61746a]">
                  PDF hanya memakai kode kandidat, evidence, akomodasi kerja, consent, seal, dan audit publik.
                </p>
              </div>
            </div>

            <aside className="border-t border-[#dbe7dd] bg-[#f8faf7] p-5 lg:border-l lg:border-t-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#61746a]">Pilih kandidat</p>
              <div className="mt-3 space-y-2">
                {dudiCandidates.map((candidate) => (
                  <button
                    key={candidate.candidateId}
                    onClick={() => handleSelectedProfileChange(candidate.candidateId)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                      selectedDudiCandidate.candidateId === candidate.candidateId
                        ? 'bg-[#12843a] text-white'
                        : 'bg-white text-[#17351f] hover:bg-[#eef8f0]'
                    }`}
                  >
                    {candidate.displayCode}
                    <span className={`mt-1 block text-[11px] font-semibold ${selectedDudiCandidate.candidateId === candidate.candidateId ? 'text-white/75' : 'text-[#61746a]'}`}>
                      {candidate.interest}
                    </span>
                    <span className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.1em] ${selectedDudiCandidate.candidateId === candidate.candidateId ? 'text-white/60' : 'text-[#61746a]'}`}>
                      {candidate.schoolSegment}
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className={`rounded-[1.75rem] p-3 sm:p-4 ${panelClass}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {visibleStages.map((stage, index) => {
              const Icon = stage.icon;
              const active = dudiActiveStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageChange(stage.id)}
                  className={`rounded-2xl p-4 text-left transition ${
                    active
                      ? 'bg-[#0b5d2a] text-white shadow-lg shadow-green-900/10'
                      : 'bg-[#f8faf7] text-[#17351f] hover:bg-[#eef8f0]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className={`rounded-xl p-2 ${active ? 'bg-white/15 text-white' : stage.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className={`font-mono text-xs font-black ${active ? 'text-white/55' : 'text-[#c4d7c9]'}`}>0{index + 1}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-black leading-tight">{stage.title}</h3>
                  <p className={`mt-1 text-[11px] font-semibold leading-relaxed ${active ? 'text-white/75' : 'text-[#61746a]'}`}>
                    {stage.outcome}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {renderDudiStage()}

        <section className={`grid gap-4 rounded-[1.75rem] p-5 lg:grid-cols-[0.9fr_1.1fr] ${panelClass}`}>
          <div>
            <div className="flex items-center gap-3">
              <LockKeyhole className="h-5 w-5 text-[#12843a]" />
              <h3 className="font-display text-xl font-black">Role visibility boundary</h3>
            </div>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
              DUDI tidak menerima nama lengkap siswa, sekolah spesifik, profil dukungan internal, catatan guru, kontak wali, rekam medis, atau latar keluarga.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Dibuka', 'Skill, skor, bukti simulasi, akomodasi kerja.'],
              ['Ditutup', 'Data medis, keluarga, kontak wali, catatan internal.'],
              ['Tujuan', 'Matching kerja inklusif tanpa bias dan tanpa stigma.']
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[#f8faf7] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#12843a]">{label}</p>
                <p className="mt-2 text-sm font-black leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (!selectedStudent) {
    return (
      <section className="rounded-[1.5rem] border border-[#dbe7dd] bg-white p-6 text-sm font-bold text-[#61746a]">
        Data siswa belum tersedia.
      </section>
    );
  }

  const renderStage = () => {
    switch (activeStage) {
      case 'intake':
        return (
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#12843a]">Intake profile</p>
                  <h3 className="mt-2 font-display text-2xl font-black">{selectedStudent.name}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">{selectedStudent.bio}</p>
                </div>
                <div className="rounded-2xl bg-[#e8f8ee] p-3 text-[#12843a]">
                  <UserRoundCheck className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f8faf7] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Minat vokasi</p>
                  <p className="mt-1 text-sm font-black">{selectedStudent.interest}</p>
                </div>
                <div className="rounded-2xl bg-[#f8faf7] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Profil dukungan</p>
                  <p className="mt-1 text-sm font-black">{selectedStudent.supportProfile}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Skill awal</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedStudent.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-[#e8f8ee] px-3 py-1.5 text-xs font-bold text-[#0b5d2a]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-[#12843a]" />
                <h3 className="font-display text-xl font-black">Privacy wall</h3>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ['DUDI boleh lihat', 'Skill, readiness score, kebutuhan akomodasi kerja, portofolio.'],
                  ['Sekolah saja', 'Catatan sensitif, kontak wali, kondisi personal, strategi internal.'],
                  ['Output intake', 'Profil dukungan kerja yang aman dipakai untuk matching lowongan.']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{label}</p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
              {(role === 'guru' || role === 'admin') && (
                <div className="mt-4 rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Consent management</p>
                      <h4 className="mt-1 text-sm font-black">Izin portofolio dan validasi DUDI</h4>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">
                        Guru/Admin mengelola status persetujuan sebelum bukti kandidat bisa divalidasi industri.
                      </p>
                    </div>
                    <span className={`w-fit rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${getConsentBadgeClass(selectedConsent?.status)}`}>
                      {selectedConsent?.status || 'pending'}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(selectedConsent?.scopes.length ? selectedConsent.scopes : ['scope belum tersedia']).map((scope) => (
                      <span key={scope} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#61746a]">
                        {scope}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-[11px] font-bold text-[#61746a]">
                    Update: {formatDateTime(selectedConsent?.updatedAt || '')}
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <button
                      onClick={() => updateSelectedConsent('pending')}
                      className="rounded-full border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
                    >
                      Request Consent
                    </button>
                    <button
                      onClick={() => updateSelectedConsent('approved')}
                      className="rounded-full bg-[#12843a] px-3 py-2 text-xs font-black text-white transition hover:bg-[#0b5d2a]"
                    >
                      Approve Validasi
                    </button>
                    <button
                      onClick={() => updateSelectedConsent('revoked')}
                      className="rounded-full bg-[#fff1f2] px-3 py-2 text-xs font-black text-[#be123c] transition hover:bg-[#ffe4e6]"
                    >
                      Revoke
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#dbe7dd] bg-white p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">Audit consent</p>
                    <div className="mt-2 space-y-2">
                      {selectedStudentAuditEvents.map((event) => (
                        <div key={event.id} className="rounded-xl bg-[#f8faf7] p-3">
                          <p className="text-xs font-black text-[#17351f]">{event.summary}</p>
                          <p className="mt-1 text-[11px] font-bold text-[#61746a]">{formatDateTime(event.createdAt)} - {event.actorRole}</p>
                        </div>
                      ))}
                      {selectedStudentAuditEvents.length === 0 && (
                        <p className="text-xs font-semibold text-[#61746a]">Belum ada audit event untuk consent siswa ini.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {role === 'admin' && (
                <button
                  onClick={addDemoLearner}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white"
                >
                  <Plus className="h-4 w-4" />
                  Tambah Siswa Demo
                </button>
              )}
            </section>
          </div>
        );

      case 'simulation':
        return (
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1768c8]">Mission board</p>
              <h3 className="mt-2 font-display text-2xl font-black">Latihan dibuat seperti tugas kerja kecil.</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
                Setiap misi menghasilkan bukti: skor, akurasi, waktu kerja, error count, dan konsistensi.
              </p>
              <div className="mt-5 space-y-3">
                {missionTemplates.map((mission) => {
                  const Icon = mission.icon;
                  return (
                    <div key={mission.id} className="flex flex-col gap-3 rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-white p-3 text-[#1768c8] shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black">{mission.name}</h4>
                          <p className="text-xs font-semibold text-[#61746a]">{mission.category} - {mission.skill}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => runMission(mission)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12843a] px-4 py-2 text-xs font-black text-white"
                      >
                        Jalankan
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#61746a]">Riwayat simulasi</p>
                  <h3 className="mt-2 font-display text-2xl font-black">{studentSessions.length} sesi tercatat</h3>
                </div>
                <div className="rounded-2xl bg-[#fff7d6] px-4 py-3 text-center">
                  <p className="font-display text-2xl font-black text-[#0b5d2a]">{averageScore}%</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#61746a]">Avg</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {studentSessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="rounded-2xl bg-[#f8faf7] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-black">{session.gameName}</h4>
                        <p className="text-xs font-semibold text-[#61746a]">{formatShortDate(session.date)} - akurasi {session.metrics.accuracy}%</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#12843a]">{session.score}%</span>
                    </div>
                  </div>
                ))}
                {studentSessions.length === 0 && <p className="text-sm font-semibold text-[#61746a]">Belum ada sesi. Jalankan satu misi untuk membuat bukti pertama.</p>}
              </div>
            </section>
          </div>
        );

      case 'coaching':
        return (
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b77900]">Action plan</p>
              <h3 className="mt-2 font-display text-2xl font-black">Satu rencana untuk sekolah dan rumah.</h3>
              <div className="mt-5 grid gap-3">
                {selectedStudent.supportRequirements.map((support) => (
                  <div key={support} className="flex gap-3 rounded-2xl border border-[#dbe7dd] bg-[#fffdf4] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#12843a]" />
                    <p className="text-sm font-semibold leading-relaxed">{support}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#61746a]">Catatan pendamping</p>
                  <h3 className="mt-2 font-display text-2xl font-black">Log keputusan berikutnya</h3>
                </div>
                <BookOpenCheck className="h-6 w-6 text-[#12843a]" />
              </div>
              {(role === 'guru' || role === 'orang_tua' || role === 'admin') && (
                <div className="mt-4 rounded-2xl bg-[#f8faf7] p-3">
                  <textarea
                    value={noteDraft}
                    onChange={(event) => setNoteDraft(event.target.value)}
                    rows={3}
                    placeholder="Tulis observasi atau langkah pendampingan berikutnya..."
                    className="w-full resize-none rounded-xl border border-[#dbe7dd] bg-white p-3 text-sm font-semibold outline-none focus:border-[#12843a]"
                  />
                  <button
                    onClick={addQuickNote}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#12843a] px-4 py-2 text-xs font-black text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Simpan Catatan
                  </button>
                </div>
              )}
              <div className="mt-4 space-y-3">
                {studentNotes.slice(0, 4).map((note) => (
                  <div key={note.id} className="rounded-2xl border border-[#dbe7dd] bg-white p-4">
                    <p className="text-xs font-black text-[#17351f]">{note.focusCategory} - {note.teacherName}</p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-[#61746a]">{note.noteText}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'portfolio':
        return (
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#12843a]">Portfolio brief</p>
              <h3 className="mt-2 font-display text-2xl font-black">Bukti yang siap dibaca juri dan DUDI.</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['Readiness', `${selectedStudent.readinessScore}%`],
                  ['Avg simulasi', `${averageScore}%`],
                  ['Validasi', `${studentValidations.length} seal`]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#f8faf7] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{label}</p>
                    <p className="mt-2 font-display text-3xl font-black text-[#0b5d2a]">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-[#dbe7dd] bg-white p-4">
                <h4 className="text-sm font-black">Ringkasan kandidat</h4>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
                  {selectedStudent.name} cocok untuk jalur {selectedStudent.interest}. Bukti terkuat saat ini adalah {selectedStudent.skills.slice(0, 3).join(', ')} dengan kebutuhan dukungan kerja berupa {selectedStudent.supportRequirements.slice(0, 2).join(' dan ')}.
                </p>
              </div>
            </section>

            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#1768c8]" />
                <h3 className="font-display text-xl font-black">Evidence stack</h3>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  `${studentSessions.length} hasil simulasi tersimpan`,
                  `${studentNotes.length} catatan pendamping aktif`,
                  `${selectedStudent.skills.length} skill awal terpetakan`,
                  `${studentValidations.length} validasi industri`
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f8faf7] p-4">
                    <BadgeCheck className="h-5 w-5 text-[#12843a]" />
                    <p className="text-sm font-black">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'validation':
        return (
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1768c8]">Talent match</p>
              <h3 className="mt-2 font-display text-2xl font-black">Lowongan dicocokkan ke skill dan akomodasi kerja.</h3>
              <div className="mt-5 space-y-3">
                {jobs.slice(0, 4).map((job) => (
                  <div key={job.id} className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-black">{job.title}</h4>
                        <p className="mt-1 text-xs font-semibold text-[#61746a]">{job.companyName} - {job.type}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#12843a]">{getMatchScore(selectedStudent, job)}%</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.accommodationSupports.slice(0, 3).map((support) => (
                        <span key={support} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#61746a]">{support}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={`rounded-[1.5rem] p-5 ${panelClass}`}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#12843a]" />
                <h3 className="font-display text-xl font-black">Industry validation seal</h3>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
                Validasi baru hanya memakai portofolio, skill, dan kebutuhan akomodasi kerja. Data sensitif tidak ikut terkirim ke DUDI.
              </p>
              <div className="mt-5 space-y-3">
                {studentValidations.map((validation) => (
                  <div key={validation.id} className="rounded-2xl bg-[#e8f8ee] p-4">
                    <p className="text-sm font-black text-[#0b5d2a]">{validation.companyName}</p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">{validation.note}</p>
                  </div>
                ))}
              </div>
              {role === 'admin' && (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={addValidationSeal}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white"
                  >
                    <BadgeCheck className="h-4 w-4" />
                    Terbitkan Seal
                  </button>
                  <button
                    onClick={addInclusiveJob}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#dbe7dd] bg-white px-4 py-3 text-sm font-black text-[#17351f]"
                  >
                    <Plus className="h-4 w-4" />
                    Buat Lowongan
                  </button>
                </div>
              )}
            </section>
          </div>
        );
    }
  };

  return (
    <div className={`space-y-5 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
      <section className={`overflow-hidden rounded-[1.75rem] ${panelClass}`}>
        <div className="grid gap-0 lg:grid-cols-[1fr_18rem]">
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-[#e8f8ee] p-3 text-[#12843a]">
                <RoleIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#12843a]">{roleCopy[role].eyebrow}</p>
                <h2 className="mt-2 max-w-3xl font-display text-2xl font-black leading-tight sm:text-4xl">{roleCopy[role].title}</h2>
                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-[#61746a]">{roleCopy[role].desc}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ['Journey score', `${clamp(journeyScore, 0, 100)}%`],
                ['Sesi bukti', `${studentSessions.length}`],
                ['Seal industri', `${studentValidations.length}`]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#f8faf7] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{label}</p>
                  <p className="mt-1 font-display text-3xl font-black text-[#0b5d2a]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border-t border-[#dbe7dd] bg-[#f8faf7] p-5 lg:border-l lg:border-t-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#61746a]">Pilih siswa</p>
            <div className="mt-3 space-y-2">
              {students.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleSelectedProfileChange(student.id)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    selectedStudent.id === student.id
                      ? 'bg-[#12843a] text-white'
                      : 'bg-white text-[#17351f] hover:bg-[#eef8f0]'
                  }`}
                >
                  {student.name}
                  <span className={`mt-1 block text-[11px] font-semibold ${selectedStudent.id === student.id ? 'text-white/75' : 'text-[#61746a]'}`}>
                    {student.interest}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={`rounded-[1.75rem] p-3 sm:p-4 ${panelClass}`}>
        <div className="grid gap-3 sm:grid-cols-5">
          {visibleStages.map((stage, index) => {
            const Icon = stage.icon;
            const active = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => handleStageChange(stage.id)}
                className={`rounded-2xl p-4 text-left transition ${
                  active
                    ? 'bg-[#0b5d2a] text-white shadow-lg shadow-green-900/10'
                    : 'bg-[#f8faf7] text-[#17351f] hover:bg-[#eef8f0]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`rounded-xl p-2 ${active ? 'bg-white/15 text-white' : stage.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`font-mono text-xs font-black ${active ? 'text-white/55' : 'text-[#c4d7c9]'}`}>0{index + 1}</span>
                </div>
                <h3 className="mt-3 text-sm font-black leading-tight">{stage.title}</h3>
                <p className={`mt-1 text-[11px] font-semibold leading-relaxed ${active ? 'text-white/75' : 'text-[#61746a]'}`}>
                  {stage.outcome}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {renderStage()}
      {renderSchoolPlacementMonitoring()}
      {renderAdminGovernanceCenter()}

      <section className={`grid gap-4 rounded-[1.75rem] p-5 lg:grid-cols-[0.9fr_1.1fr] ${panelClass}`}>
        <div>
          <div className="flex items-center gap-3">
            <Route className="h-5 w-5 text-[#12843a]" />
            <h3 className="font-display text-xl font-black">Demo storyline</h3>
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
            Narasi utama: ABK, termasuk siswa dengan disabilitas, masuk lewat profil dukungan, membangun bukti lewat simulasi, didampingi sekolah-keluarga, lalu divalidasi DUDI memakai data yang aman.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Masalah', 'Transisi vokasi sering berhenti di data siswa, bukan bukti kerja.'],
            ['Solusi', 'SyncVoca membuat bukti kerja kecil yang bisa dikurasi pendamping.'],
            ['Pembeda', 'DUDI mendapat match berbasis skill tanpa akses ke data sensitif.']
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#f8faf7] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#12843a]">{label}</p>
              <p className="mt-2 text-sm font-black leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
