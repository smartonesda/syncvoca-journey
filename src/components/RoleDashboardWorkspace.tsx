import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  FileBadge,
  FileText,
  GraduationCap,
  HeartHandshake,
  Home,
  Layers3,
  LockKeyhole,
  MessageSquare,
  Plus,
  Route,
  School,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
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
  UserRole,
} from "../types";
import { getDudiJobMatchScore } from "../privacy";
import { downloadDudiSafePortfolioPdf } from "../report";
import { useAppFeedback } from "./AppFeedback";
import GuidedTour, { GuidedTourStep } from "./GuidedTour";

interface RoleDashboardWorkspaceProps {
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
  onAddNote: (note: Omit<TeacherNote, "id">) => void;
  onAddJob: (job: Omit<JobPosting, "id">) => void;
  onAddValidation: (
    validation: Omit<IndustryValidation, "id">,
    actorRole?: UserRole,
  ) => ValidationActionResult;
  onAddStudent: (student: StudentProfile) => void;
  onUpdateConsent: (
    studentId: string,
    status: ConsentStatus,
    actorRole: Extract<UserRole, "guru" | "admin">,
    note: string,
  ) => StudentConsent;
  onAddPlacement: (
    placement: Omit<DudiPlacementRecord, "id" | "createdAt" | "updatedAt">,
    actorRole?: UserRole,
  ) => PlacementActionResult;
  onUpdatePlacementStatus: (
    placementId: string,
    status: PlacementStatus,
    note: string,
    actorRole?: UserRole,
  ) => PlacementActionResult;
  onDudiReportExport: (candidateId: string, fileName: string) => void;
}

type Tone = "green" | "blue" | "yellow" | "red" | "neutral" | "purple";

const TAGLINE = "Menghubungkan potensi, mewujudkan mandiri";

const toneClass: Record<Tone, string> = {
  green: "border-[#bfe8ca] bg-[#e8f8ee] text-[#0b5d2a]",
  blue: "border-[#cfe1ff] bg-[#eaf4ff] text-[#1768c8]",
  yellow: "border-[#f4df9a] bg-[#fff7d6] text-[#946200]",
  red: "border-[#fecdd3] bg-[#fff1f2] text-[#be123c]",
  neutral: "border-[#dbe7dd] bg-white text-[#17351f]",
  purple: "border-[#e1d5ff] bg-[#f5f0ff] text-[#6d3fd1]",
};

const roleIntro: Record<
  UserRole,
  {
    label: string;
    eyebrow: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    primaryAction: string;
    tone: Tone;
  }
> = {
  siswa: {
    label: "Dashboard Siswa",
    eyebrow: "Ruang latihan siswa",
    title: "Hari ini fokusnya sederhana: lanjutkan misi, kumpulkan bukti.",
    desc: "Siswa melihat perjalanan belajarnya sebagai langkah kecil yang jelas, bukan tabel administrasi yang rumit.",
    icon: UserRound,
    primaryAction: "Mulai simulasi",
    tone: "green",
  },
  orang_tua: {
    label: "Dashboard Orang Tua",
    eyebrow: "Ruang dukungan keluarga",
    title: "Keluarga melihat progres anak dan langkah rumah yang bisa dilakukan.",
    desc: "Orang tua mendapat cerita perkembangan yang mudah dipahami, termasuk catatan guru, consent, dan saran pendampingan.",
    icon: HeartHandshake,
    primaryAction: "Lihat dukungan rumah",
    tone: "yellow",
  },
  guru: {
    label: "Ruang Guru",
    eyebrow: "Meja pendamping sekolah",
    title: "Guru mengubah latihan menjadi rencana pendampingan yang terukur.",
    desc: "Guru melihat pola performa, evidence, consent, dan follow-up placement dalam satu ruang kerja.",
    icon: GraduationCap,
    primaryAction: "Tambah catatan",
    tone: "blue",
  },
  dudi: {
    label: "Ruang DUDI",
    eyebrow: "Talent desk industri",
    title: "DUDI membaca kandidat dari bukti kompetensi, bukan data pribadi.",
    desc: "Kandidat tampil dengan kode aman, ringkasan skill, evidence, akomodasi kerja, dan consent yang relevan.",
    icon: Building2,
    primaryAction: "Validasi kandidat",
    tone: "green",
  },
  admin: {
    label: "Admin Governance",
    eyebrow: "Operator ekosistem",
    title: "Admin menjaga data demo, consent, audit, dan placement tetap terkendali.",
    desc: "Admin memantau kesehatan ekosistem SyncVoca dari sekolah, siswa, DUDI, sampai log keamanan.",
    icon: ShieldCheck,
    primaryAction: "Kelola ekosistem",
    tone: "purple",
  },
};

const roleMenus: Record<
  UserRole,
  Array<{ id: string; label: string; desc: string; icon: LucideIcon }>
> = {
  siswa: [
    { id: "beranda", label: "Beranda", desc: "Misi hari ini", icon: Home },
    { id: "journey", label: "Journey", desc: "Tahap perjalanan", icon: Route },
    { id: "simulasi", label: "Simulasi", desc: "Latihan kerja", icon: Target },
    { id: "portofolio", label: "Portofolio", desc: "Bukti kerja", icon: FileBadge },
    { id: "notifikasi", label: "Notifikasi", desc: "Info terbaru", icon: Bell },
  ],
  orang_tua: [
    { id: "ringkasan", label: "Ringkasan", desc: "Kabar utama", icon: Home },
    { id: "progres", label: "Progres", desc: "Perkembangan", icon: Activity },
    { id: "dukungan", label: "Dukungan", desc: "Latihan rumah", icon: HeartHandshake },
    { id: "persetujuan", label: "Persetujuan", desc: "Batas data", icon: LockKeyhole },
    { id: "pesan", label: "Pesan", desc: "Catatan guru", icon: MessageSquare },
  ],
  guru: [
    { id: "beranda", label: "Beranda", desc: "Kelas & prioritas", icon: Home },
    { id: "siswa", label: "Siswa", desc: "Profil pendampingan", icon: UsersRound },
    { id: "simulasi", label: "Simulasi", desc: "Sesi latihan", icon: Target },
    { id: "evidence", label: "Evidence", desc: "Bukti kerja", icon: ClipboardCheck },
    { id: "consent", label: "Consent", desc: "Izin berbagi", icon: LockKeyhole },
    { id: "placement", label: "Placement", desc: "Follow-up DUDI", icon: BriefcaseBusiness },
    { id: "laporan", label: "Laporan", desc: "Narasi perkembangan", icon: FileText },
  ],
  dudi: [
    { id: "beranda", label: "Beranda", desc: "Ringkasan talent", icon: Home },
    { id: "talent", label: "Talent", desc: "Kandidat aman", icon: Search },
    { id: "lowongan", label: "Lowongan", desc: "Kebutuhan kerja", icon: BriefcaseBusiness },
    { id: "validasi", label: "Validasi", desc: "Seal industri", icon: BadgeCheck },
    { id: "placement", label: "Placement", desc: "Pipeline", icon: CalendarCheck },
    { id: "report", label: "Report", desc: "DUDI-safe PDF", icon: Download },
  ],
  admin: [
    { id: "overview", label: "Overview", desc: "Kesehatan demo", icon: Home },
    { id: "users", label: "Users", desc: "Siswa & role", icon: UsersRound },
    { id: "schools", label: "Schools", desc: "Sekolah mitra", icon: School },
    { id: "dudi", label: "DUDI", desc: "Mitra & jobs", icon: Building2 },
    { id: "consent", label: "Consent", desc: "Governance data", icon: LockKeyhole },
    { id: "audit", label: "Audit", desc: "Jejak aktivitas", icon: Database },
    { id: "reports", label: "Reports", desc: "Insight ekosistem", icon: FileText },
    { id: "placement", label: "Placement", desc: "Pipeline kerja", icon: BriefcaseBusiness },
  ],
};

const journeyStages = [
  "Mengenal Diri",
  "Eksplorasi Minat",
  "Pra-Internship",
  "Internship",
  "Siap Kerja",
];

const missions: Array<{
  id: string;
  title: string;
  desc: string;
  gameName: string;
  category: string;
  skill: string;
  minutes: number;
  tone: Tone;
  icon: LucideIcon;
}> = [
  {
    id: "mission-admin",
    title: "Simulasi Administrasi Perkantoran",
    desc: "Melatih ketelitian, urutan kerja, dan pengelolaan dokumen sederhana.",
    gameName: "Data Entry Simulation (Administrasi)",
    category: "Administrasi",
    skill: "Ketelitian data",
    minutes: 25,
    tone: "green",
    icon: ClipboardCheck,
  },
  {
    id: "mission-quality",
    title: "Quality Check Konten Produk",
    desc: "Mencocokkan gambar, deskripsi, dan checklist agar bukti kerja lebih kuat.",
    gameName: "Quality Checker Konten Produk",
    category: "Digital kreatif",
    skill: "Quality checking",
    minutes: 20,
    tone: "blue",
    icon: Search,
  },
  {
    id: "mission-packaging",
    title: "Packaging Flow",
    desc: "Menyusun alur sortir, label, dan pengemasan dengan instruksi visual.",
    gameName: "Package Sorter (Motorik/Gudang)",
    category: "Logistik",
    skill: "Konsistensi kerja",
    minutes: 18,
    tone: "yellow",
    icon: Layers3,
  },
];

const formatShortDate = (date?: string) =>
  date
    ? new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
      }).format(new Date(date))
    : "Belum ada";

const formatDateTime = (date?: string) =>
  date
    ? new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(date))
    : "Belum tercatat";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getLevel = (score: number) => {
  if (score >= 88) return "Level Siap Validasi";
  if (score >= 78) return "Level Mahir";
  if (score >= 68) return "Level Berkembang";
  return "Level Awal";
};

const getConsentTone = (status?: ConsentStatus): Tone => {
  if (status === "approved") return "green";
  if (status === "revoked") return "red";
  return "yellow";
};

const placementTone = (status: PlacementStatus): Tone => {
  if (status === "placed") return "green";
  if (status === "not_ready") return "red";
  if (status === "work_trial") return "yellow";
  return "blue";
};

function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
  key?: string | number;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-black ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#e8f3ec]">
      <div
        className="h-full rounded-full bg-[#12843a] transition-all"
        style={{ width: `${clamp(value, 0, 100)}%` }}
      />
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "green",
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  detail: string;
  tone?: Tone;
  key?: string | number;
}) {
  return (
    <article className="rounded-[1.25rem] border border-[#dbe7dd] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#61746a]">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-black leading-none text-[#10203b]">
            {value}
          </p>
        </div>
        <span className={`rounded-2xl border p-2 ${toneClass[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-[#61746a]">
        {detail}
      </p>
    </article>
  );
}

function Panel({
  icon: Icon,
  eyebrow,
  title,
  desc,
  children,
  tone = "green",
  className = "",
}: {
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  desc?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.35rem] border border-[#dbe7dd] bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#12843a]">
              {eyebrow}
            </p>
          )}
          <h3 className="mt-1 font-display text-xl font-black leading-tight text-[#10203b]">
            {title}
          </h3>
          {desc && (
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-[#61746a]">
              {desc}
            </p>
          )}
        </div>
        {Icon && (
          <span className={`hidden rounded-2xl border p-3 sm:inline-flex ${toneClass[tone]}`}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#cfe4d5] bg-[#f8faf7] p-5 text-sm font-bold text-[#61746a]">
      {text}
    </div>
  );
}

export default function RoleDashboardWorkspace({
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
  onDudiReportExport,
}: RoleDashboardWorkspaceProps) {
  const { notify } = useAppFeedback();
  const [activeMenu, setActiveMenu] = useState(roleMenus[role][0].id);
  const [selectedStudentId, setSelectedStudentId] = useState(
    students[0]?.id || "",
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState(
    dudiCandidates[0]?.candidateId || "",
  );
  const [noteDraft, setNoteDraft] = useState("");
  const [tourReplay, setTourReplay] = useState(0);

  const menuItems = roleMenus[role];
  const intro = roleIntro[role];
  const IntroIcon = intro.icon;
  const isHighContrast = preferences.highContrast;

  useEffect(() => {
    setActiveMenu(roleMenus[role][0].id);
    setTourReplay(0);
  }, [role]);

  useEffect(() => {
    if (!students.length) return;
    if (!students.some((student) => student.id === selectedStudentId)) {
      setSelectedStudentId(students[0].id);
    }
  }, [selectedStudentId, students]);

  useEffect(() => {
    if (!dudiCandidates.length) return;
    if (
      !dudiCandidates.some(
        (candidate) => candidate.candidateId === selectedCandidateId,
      )
    ) {
      setSelectedCandidateId(dudiCandidates[0].candidateId);
    }
  }, [dudiCandidates, selectedCandidateId]);

  const selectedStudent = useMemo(
    () =>
      students.find((student) => student.id === selectedStudentId) ||
      students[0],
    [selectedStudentId, students],
  );

  const selectedCandidate = useMemo(
    () =>
      dudiCandidates.find(
        (candidate) => candidate.candidateId === selectedCandidateId,
      ) || dudiCandidates[0],
    [dudiCandidates, selectedCandidateId],
  );

  const candidateForStudent = useMemo(
    () =>
      selectedStudent
        ? dudiCandidates.find(
            (candidate) => candidate.studentRef === selectedStudent.id,
          )
        : undefined,
    [dudiCandidates, selectedStudent],
  );

  const studentSessions = useMemo(
    () =>
      selectedStudent
        ? sessions.filter((session) => session.studentId === selectedStudent.id)
        : [],
    [selectedStudent, sessions],
  );

  const studentNotes = useMemo(
    () =>
      selectedStudent
        ? teacherNotes.filter((note) => note.studentId === selectedStudent.id)
        : [],
    [selectedStudent, teacherNotes],
  );

  const studentConsent = useMemo(
    () =>
      selectedStudent
        ? consents.find((consent) => consent.studentId === selectedStudent.id)
        : undefined,
    [consents, selectedStudent],
  );

  const studentValidations = useMemo(
    () =>
      selectedStudent
        ? validations.filter(
            (validation) => validation.studentId === selectedStudent.id,
          )
        : [],
    [selectedStudent, validations],
  );

  const studentPlacements = useMemo(
    () =>
      selectedStudent
        ? placements.filter(
            (placement) => placement.studentId === selectedStudent.id,
          )
        : [],
    [placements, selectedStudent],
  );

  const candidatePlacements = useMemo(
    () =>
      selectedCandidate
        ? placements.filter(
            (placement) =>
              placement.studentId === selectedCandidate.studentRef ||
              placement.candidateCode === selectedCandidate.displayCode,
          )
        : [],
    [placements, selectedCandidate],
  );

  const approvedConsents = consents.filter(
    (consent) => consent.status === "approved",
  ).length;
  const activeJobs = jobs.filter((job) => job.status === "Active");
  const cohortAverage = students.length
    ? Math.round(
        students.reduce((total, student) => total + student.readinessScore, 0) /
          students.length,
      )
    : 0;

  const tourSteps: GuidedTourStep[] = [
    {
      selector: '[data-tour="dashboard-hero"]',
      title: intro.label,
      body: `Ini adalah pintu masuk ${intro.label}. Tagline ${TAGLINE} muncul sebagai pengingat bahwa dashboard ini berfokus pada potensi dan kemandirian.`,
      voice: `Selamat datang di ${intro.label} SyncVoca. Di sini kamu bisa melihat konteks utama, aksi berikutnya, dan ringkasan perjalanan sesuai role.`,
    },
    {
      selector: '[data-tour="role-menu"]',
      title: "Menu role",
      body: "Menu ini berubah sesuai role. Siswa melihat journey dan simulasi, guru melihat evidence dan consent, DUDI melihat talent, validasi, placement, dan report.",
    },
    {
      selector: '[data-tour="metric-grid"]',
      title: "Ringkasan cepat",
      body: "Kartu angka membantu user awam memahami kondisi terbaru tanpa harus membaca tabel panjang.",
    },
    {
      selector: '[data-tour="main-content"]',
      title: "Ruang kerja utama",
      body: "Bagian ini menampilkan cerita dan aksi utama dari menu aktif, misalnya mulai simulasi, tambah catatan, validasi kandidat, atau cek audit.",
    },
    {
      selector: '[data-tour="privacy-wall"]',
      title: "Privacy wall",
      body: "SyncVoca membedakan data internal sekolah dan data yang aman untuk DUDI. Ini penting agar bukti kerja tetap bisa dibagikan tanpa membuka data sensitif.",
    },
    {
      selector: '[data-tour="role-switcher"]',
      title: "Pindah role demo",
      body: "Gunakan navigator bawah untuk berpindah antara landing, siswa, guru, orang tua, DUDI, dan admin ketika menjelaskan alur demo.",
    },
  ];

  const runMission = (mission = missions[0]) => {
    if (!selectedStudent) return;
    const score = clamp(
      selectedStudent.readinessScore + 2 + Math.round(Math.random() * 6),
      65,
      99,
    );

    onGameComplete({
      id: `session-preview-${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      gameId: mission.id,
      gameName: mission.gameName,
      score,
      date: new Date().toISOString(),
      metrics: {
        accuracy: clamp(score + 2, 70, 99),
        completionTime: mission.minutes * 60,
        errorCount: Math.max(0, Math.round((100 - score) / 12)),
        consistency: clamp(score - 1, 68, 98),
      },
    });

    notify({
      title: "Simulasi tersimpan",
      message: `${mission.title} menjadi evidence baru untuk ${selectedStudent.name}.`,
      tone: "success",
    });
  };

  const submitNote = () => {
    if (!selectedStudent) return;
    const noteText =
      noteDraft.trim() ||
      `Rencana pendampingan berikutnya: lanjutkan latihan ${selectedStudent.interest} dengan checklist visual dan target kecil.`;

    onAddNote({
      studentId: selectedStudent.id,
      teacherName:
        role === "orang_tua"
          ? "Orang Tua/Wali"
          : role === "admin"
            ? "Admin SyncVoca"
            : "Guru Pendamping SyncVoca",
      noteText,
      date: new Date().toISOString(),
      focusCategory: role === "orang_tua" ? "Saran" : "Kognitif",
    });

    setNoteDraft("");
    notify({
      title: "Catatan ditambahkan",
      message: "Catatan baru masuk ke riwayat pendampingan.",
      tone: "success",
    });
  };

  const updateConsent = (status: ConsentStatus) => {
    if (!selectedStudent || (role !== "guru" && role !== "admin")) return;
    onUpdateConsent(
      selectedStudent.id,
      status,
      role === "admin" ? "admin" : "guru",
      status === "approved"
        ? "Disetujui untuk portofolio, akomodasi kerja, dan validasi industri."
        : status === "pending"
          ? "Menunggu persetujuan wali/sekolah sebelum validasi industri."
          : "Consent dicabut, akses DUDI dibatasi.",
    );

    notify({
      title: "Consent diperbarui",
      message: `${selectedStudent.name} sekarang berstatus ${status}.`,
      tone: status === "approved" ? "success" : "warning",
    });
  };

  const issueValidation = (candidate?: DudiCandidateProfile) => {
    const targetCandidate = candidate || selectedCandidate || candidateForStudent;
    const company = companies[0];
    if (!targetCandidate || !company) return;

    const result = onAddValidation(
      {
        studentId: targetCandidate.studentRef,
        companyId: company.id,
        companyName: company.name,
        validatedSkills: targetCandidate.skills.slice(0, 3),
        sealIssuedAt: new Date().toISOString(),
        note: `${targetCandidate.displayCode} divalidasi berdasarkan evidence simulasi, readiness score, dan consent yang tersedia.`,
      },
      role,
    );

    notify({
      title: result.ok ? "Validation Seal dibuat" : "Validasi ditahan",
      message: result.message,
      tone: result.ok ? "success" : "warning",
    });
  };

  const addInclusiveJob = () => {
    const company = companies[0];
    if (!company) return;

    onAddJob({
      title: "Asisten Administrasi Inklusif",
      companyId: company.id,
      companyName: company.name,
      industry: company.industry,
      location: company.location,
      accommodationSupports: [
        "Instruksi tertulis",
        "Checklist visual",
        "Feedback mingguan",
      ],
      requiredSkills: ["Data Entry", "Ketelitian", "Microsoft Excel"],
      description:
        "Lowongan demo untuk menguji alur matching kandidat ABK berbasis evidence dan akomodasi kerja.",
      salaryRange: "Rp 3.800.000 - Rp 5.000.000",
      status: "Active",
      type: "Hybrid",
    });

    notify({
      title: "Lowongan demo dibuat",
      message: "Lowongan baru langsung masuk ke talent matching DUDI.",
      tone: "success",
    });
  };

  const shortlistCandidate = (
    candidate = selectedCandidate,
    job = activeJobs[0],
  ) => {
    if (!candidate || !job) return;
    const result = onAddPlacement(
      {
        studentId: candidate.studentRef,
        candidateCode: candidate.displayCode,
        companyId: job.companyId,
        companyName: job.companyName,
        jobId: job.id,
        jobTitle: job.title,
        status: "shortlisted",
        note: `${candidate.displayCode} masuk shortlist berdasarkan match ${getDudiJobMatchScore(candidate, job)}% dan consent ${candidate.consentStatus}.`,
      },
      role,
    );

    notify({
      title: result.ok ? "Kandidat masuk pipeline" : "Shortlist ditahan",
      message: result.message,
      tone: result.ok ? "success" : "warning",
    });
  };

  const movePlacement = (
    placement: DudiPlacementRecord,
    status: PlacementStatus,
  ) => {
    const result = onUpdatePlacementStatus(
      placement.id,
      status,
      `Status diubah ke ${status.replaceAll("_", " ")} dari dashboard ${roleIntro[role].label}.`,
      role,
    );
    notify({
      title: result.ok ? "Placement diperbarui" : "Placement gagal",
      message: result.message,
      tone: result.ok ? "success" : "warning",
    });
  };

  const exportDudiReport = async () => {
    if (!selectedCandidate) return;
    const payload = await downloadDudiSafePortfolioPdf(
      selectedCandidate,
      auditEvents,
    );
    onDudiReportExport(selectedCandidate.candidateId, payload.fileName);
    notify({
      title: "Report DUDI-safe diekspor",
      message: `${payload.fileName} dibuat tanpa data sensitif siswa.`,
      tone: "success",
    });
  };

  const addSampleStudent = () => {
    const suffix = Date.now().toString(36).slice(-4).toUpperCase();
    const student: StudentProfile = {
      id: `student-demo-${suffix.toLowerCase()}`,
      name: `Demo Talenta ${suffix}`,
      schoolId: "school-demo",
      schoolName: "Sekolah Inklusi Demo SyncVoca",
      supportProfile: "Profil Dukungan Vokasi - instruksi visual dan ritme kerja stabil",
      bio: "Profil demo untuk menguji flow intake, simulasi, consent, dan matching DUDI.",
      skills: ["Data Entry", "Checklist Digital", "Ketelitian"],
      interest: "Administrasi Digital",
      readinessScore: 72,
      supportRequirements: [
        "Instruksi tertulis",
        "Checklist visual",
        "Feedback bertahap",
      ],
      sensitiveData: {
        medicalNotes: "Data privat demo, hanya untuk sekolah dan keluarga.",
        guardianContact: "Wali Demo (+62 800-0000-0000)",
        familyBackground: "Catatan keluarga demo untuk kebutuhan pendampingan.",
        privateNotes: "Tidak tampil untuk DUDI.",
      },
    };
    onAddStudent(student);
    notify({
      title: "Siswa demo ditambahkan",
      message: `${student.name} masuk ke data admin dan guru.`,
      tone: "success",
    });
  };

  const renderProfileSwitcher = () => {
    if (role === "dudi") {
      return (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#61746a]">
            Kandidat DUDI-safe
          </p>
          {dudiCandidates.map((candidate) => (
            <button
              key={candidate.candidateId}
              type="button"
              onClick={() => setSelectedCandidateId(candidate.candidateId)}
              className={`w-full rounded-2xl border p-3 text-left transition ${
                selectedCandidateId === candidate.candidateId
                  ? "border-[#12843a] bg-[#e8f8ee]"
                  : "border-[#dbe7dd] bg-white hover:bg-[#f8faf7]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-black text-[#10203b]">
                  {candidate.displayCode}
                </p>
                <StatusBadge tone={getConsentTone(candidate.consentStatus)}>
                  {candidate.consentStatus}
                </StatusBadge>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#61746a]">
                {candidate.interest}
              </p>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#61746a]">
          Profil aktif
        </p>
        {students.map((student) => (
          <button
            key={student.id}
            type="button"
            onClick={() => setSelectedStudentId(student.id)}
            className={`w-full rounded-2xl border p-3 text-left transition ${
              selectedStudentId === student.id
                ? "border-[#12843a] bg-[#e8f8ee]"
                : "border-[#dbe7dd] bg-white hover:bg-[#f8faf7]"
            }`}
          >
            <p className="font-black text-[#10203b]">{student.name}</p>
            <p className="mt-1 text-xs font-semibold text-[#61746a]">
              {student.interest}
            </p>
          </button>
        ))}
      </div>
    );
  };

  const metricCards = () => {
    if (role === "dudi") {
      return [
        {
          icon: UsersRound,
          label: "Talent aman",
          value: `${dudiCandidates.length}`,
          detail: "Kandidat tampil dengan kode, bukan identitas pribadi.",
          tone: "green" as Tone,
        },
        {
          icon: LockKeyhole,
          label: "Consent aktif",
          value: `${dudiCandidates.filter((candidate) => candidate.consentStatus === "approved").length}`,
          detail: "Hanya kandidat berizin yang bisa divalidasi/di-shortlist.",
          tone: "yellow" as Tone,
        },
        {
          icon: BriefcaseBusiness,
          label: "Lowongan aktif",
          value: `${activeJobs.length}`,
          detail: "Lowongan inklusif menjadi dasar matching talenta.",
          tone: "blue" as Tone,
        },
        {
          icon: CalendarCheck,
          label: "Pipeline",
          value: `${placements.length}`,
          detail: "Shortlist, interview, work trial, dan placement tercatat.",
          tone: "purple" as Tone,
        },
      ];
    }

    if (role === "admin") {
      return [
        {
          icon: UsersRound,
          label: "Siswa",
          value: `${students.length}`,
          detail: "Profil demo lintas sekolah inklusi dan SLB.",
          tone: "green" as Tone,
        },
        {
          icon: Building2,
          label: "DUDI",
          value: `${companies.length}`,
          detail: "Mitra industri terverifikasi dan siap validasi.",
          tone: "blue" as Tone,
        },
        {
          icon: LockKeyhole,
          label: "Consent approved",
          value: `${approvedConsents}/${consents.length}`,
          detail: "Governance data sebelum report dan placement.",
          tone: "yellow" as Tone,
        },
        {
          icon: Database,
          label: "Audit",
          value: `${auditEvents.length}`,
          detail: "Jejak tindakan penting untuk transparansi demo.",
          tone: "purple" as Tone,
        },
      ];
    }

    return [
      {
        icon: Trophy,
        label: "Journey score",
        value: selectedStudent ? `${selectedStudent.readinessScore}/100` : "0/100",
        detail: selectedStudent
          ? getLevel(selectedStudent.readinessScore)
          : "Belum ada profil aktif.",
        tone: "green" as Tone,
      },
      {
        icon: FileBadge,
        label: "Evidence",
        value: `${studentSessions.length}`,
        detail: "Bukti dari simulasi yang bisa masuk portofolio.",
        tone: "blue" as Tone,
      },
      {
        icon: BadgeCheck,
        label: "Validation seal",
        value: `${studentValidations.length}`,
        detail: "Validasi skill dari mitra DUDI.",
        tone: "yellow" as Tone,
      },
      {
        icon: LockKeyhole,
        label: "Consent",
        value: studentConsent?.status || "pending",
        detail: "Batas berbagi data untuk portofolio dan DUDI.",
        tone: getConsentTone(studentConsent?.status),
      },
    ];
  };

  const renderEvidenceList = (items = studentSessions) => (
    <div className="space-y-3">
      {items.length ? (
        items.slice(0, 5).map((session) => (
          <div
            key={session.id}
            className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-[#10203b]">{session.gameName}</p>
                <p className="mt-1 text-xs font-semibold text-[#61746a]">
                  {formatShortDate(session.date)} - akurasi{" "}
                  {session.metrics.accuracy}% - konsistensi{" "}
                  {session.metrics.consistency}%
                </p>
              </div>
              <StatusBadge tone="green">{session.score}%</StatusBadge>
            </div>
            <div className="mt-3">
              <ProgressBar value={session.score} />
            </div>
          </div>
        ))
      ) : (
        <EmptyState text="Belum ada evidence. Jalankan simulasi pertama untuk membuat bukti kerja." />
      )}
    </div>
  );

  const renderJourney = () => {
    const score = selectedStudent?.readinessScore || 0;
    const activeIndex = clamp(Math.floor(score / 22), 0, journeyStages.length - 1);
    return (
      <div className="grid gap-3 md:grid-cols-5">
        {journeyStages.map((stage, index) => {
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;
          return (
            <article
              key={stage}
              className={`rounded-[1.15rem] border p-4 ${
                isDone
                  ? "border-[#bfe8ca] bg-[#e8f8ee]"
                  : isActive
                    ? "border-[#f4df9a] bg-[#fff7d6]"
                    : "border-[#dbe7dd] bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-black text-[#12843a] shadow-sm">
                  {index + 1}
                </span>
                {isDone && <CheckCircle2 className="h-5 w-5 text-[#12843a]" />}
              </div>
              <p className="mt-4 font-black text-[#10203b]">{stage}</p>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-[#61746a]">
                {isDone
                  ? "Evidence tahap ini sudah cukup kuat."
                  : isActive
                    ? "Tahap aktif. Lanjutkan latihan dan catatan pendamping."
                    : "Menunggu evidence berikutnya."}
              </p>
            </article>
          );
        })}
      </div>
    );
  };

  const renderMissionCards = () => (
    <div className="grid gap-3 lg:grid-cols-3">
      {missions.map((mission) => {
        const Icon = mission.icon;
        return (
          <article
            key={mission.id}
            className="rounded-[1.25rem] border border-[#dbe7dd] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`rounded-2xl border p-3 ${toneClass[mission.tone]}`}>
                <Icon className="h-5 w-5" />
              </span>
              <StatusBadge tone={mission.tone}>{mission.minutes} menit</StatusBadge>
            </div>
            <h4 className="mt-4 font-display text-lg font-black leading-tight text-[#10203b]">
              {mission.title}
            </h4>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#61746a]">
              {mission.desc}
            </p>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[#12843a]">
              {mission.skill}
            </p>
            <button
              type="button"
              onClick={() => runMission(mission)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
            >
              Mulai
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        );
      })}
    </div>
  );

  const renderNoteComposer = () => (
    <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-3">
      <textarea
        value={noteDraft}
        onChange={(event) => setNoteDraft(event.target.value)}
        rows={4}
        placeholder="Tulis catatan pendampingan, saran rumah, atau follow-up berikutnya..."
        className="min-h-28 w-full resize-none rounded-2xl border border-[#dbe7dd] bg-white p-3 text-sm font-semibold outline-none transition focus:border-[#12843a] focus:ring-4 focus:ring-green-100"
      />
      <button
        type="button"
        onClick={submitNote}
        className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
      >
        Simpan catatan
        <Send className="h-4 w-4" />
      </button>
    </div>
  );

  const renderPrivacyWall = () => (
    <section
      data-tour="privacy-wall"
      className="rounded-[1.35rem] border border-[#cfe4d5] bg-[#eef8f0] p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#12843a] shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-lg font-black text-[#10203b]">
              Privacy Wall: data sensitif tetap aman
            </p>
            <p className="mt-1 max-w-4xl text-sm font-semibold leading-relaxed text-[#4c6257]">
              DUDI hanya melihat bukti kerja, skor kesiapan, kebutuhan
              akomodasi kerja, consent, dan kode kandidat. Nama siswa, catatan
              medis, kontak wali, dan catatan internal tetap berada di sekolah
              serta keluarga.
            </p>
          </div>
        </div>
        <StatusBadge tone="green">DUDI-safe</StatusBadge>
      </div>
    </section>
  );

  const renderStudentDashboard = () => {
    if (!selectedStudent) return <EmptyState text="Belum ada profil siswa." />;

    if (activeMenu === "journey") {
      return (
        <Panel
          icon={Route}
          title="Alur perjalanan siswa"
          desc="Siswa melihat tahapnya sebagai cerita progres, bukan daftar administrasi."
        >
          {renderJourney()}
        </Panel>
      );
    }

    if (activeMenu === "simulasi") {
      return (
        <Panel
          icon={Target}
          title="Simulasi yang disarankan"
          desc="Setiap simulasi menghasilkan evidence baru untuk portofolio."
        >
          {renderMissionCards()}
        </Panel>
      );
    }

    if (activeMenu === "portofolio") {
      return (
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <Panel
            icon={FileBadge}
            title="Portofolio kompetensi"
            desc={`${selectedStudent.name} memiliki ringkasan skill, evidence simulasi, dan validation seal yang bisa dikurasi.`}
          >
            <div className="space-y-3">
              <p className="rounded-2xl bg-[#f8faf7] p-4 text-sm font-semibold leading-relaxed text-[#61746a]">
                {selectedStudent.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.skills.map((skill) => (
                  <StatusBadge key={skill} tone="green">
                    {skill}
                  </StatusBadge>
                ))}
              </div>
              {renderEvidenceList()}
            </div>
          </Panel>
          <Panel icon={BadgeCheck} title="Validasi DUDI" tone="yellow">
            <div className="space-y-3">
              {studentValidations.length ? (
                studentValidations.map((validation) => (
                  <div
                    key={validation.id}
                    className="rounded-2xl border border-[#f4df9a] bg-[#fff7d6] p-4"
                  >
                    <p className="font-black text-[#10203b]">
                      {validation.companyName}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#61746a]">
                      {validation.validatedSkills.join(", ")}
                    </p>
                    <p className="mt-2 text-xs font-bold text-[#946200]">
                      {formatShortDate(validation.sealIssuedAt)}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyState text="Belum ada validation seal. Evidence perlu dikurasi guru dan DUDI." />
              )}
            </div>
          </Panel>
        </div>
      );
    }

    if (activeMenu === "notifikasi") {
      const notifications = [
        `${studentNotes[0]?.teacherName || "Guru"} memberi catatan terbaru: ${studentNotes[0]?.noteText || "lanjutkan latihan bertahap."}`,
        `Consent saat ini: ${studentConsent?.status || "pending"}.`,
        studentPlacements[0]
          ? `Placement ${studentPlacements[0].jobTitle} berada di tahap ${studentPlacements[0].status}.`
          : "Belum ada placement aktif. Bangun evidence dulu.",
      ];
      return (
        <Panel icon={Bell} title="Notifikasi perjalanan">
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
              >
                <Bell className="mt-0.5 h-5 w-5 shrink-0 text-[#12843a]" />
                <p className="text-sm font-semibold leading-relaxed text-[#61746a]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      );
    }

    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <Panel
          icon={Sparkles}
          title={`Halo, ${selectedStudent.name}.`}
          desc={`${TAGLINE}. Hari ini kamu bisa melanjutkan simulasi dan melihat bukti kerja yang sudah terkumpul.`}
        >
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm font-black">
                <span>{getLevel(selectedStudent.readinessScore)}</span>
                <span>{selectedStudent.readinessScore}%</span>
              </div>
              <ProgressBar value={selectedStudent.readinessScore} />
            </div>
            <button
              data-tour="primary-action"
              type="button"
              onClick={() => runMission(missions[0])}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12843a] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
            >
              Mulai simulasi berikutnya
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Panel>
        <Panel
          icon={MessageSquare}
          title="Feedback terbaru"
          desc="Catatan dibuat singkat agar mudah dipahami siswa dan keluarga."
        >
          {studentNotes[0] ? (
            <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <p className="text-sm font-semibold leading-relaxed text-[#61746a]">
                {studentNotes[0].noteText}
              </p>
              <p className="mt-3 text-xs font-black text-[#12843a]">
                {studentNotes[0].teacherName} -{" "}
                {formatShortDate(studentNotes[0].date)}
              </p>
            </div>
          ) : (
            <EmptyState text="Belum ada feedback guru." />
          )}
        </Panel>
        <Panel
          icon={FileBadge}
          title="Bukti terkumpul"
          desc="Evidence terbaru dari simulasi langsung masuk ke portofolio."
          className="lg:col-span-2"
        >
          {renderEvidenceList(studentSessions.slice(0, 3))}
        </Panel>
      </div>
    );
  };

  const renderParentDashboard = () => {
    if (!selectedStudent) return <EmptyState text="Belum ada profil anak." />;

    if (activeMenu === "progres") {
      return (
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <Panel icon={Activity} title="Perkembangan latihan">
            {renderEvidenceList()}
          </Panel>
          <Panel icon={MessageSquare} title="Catatan guru">
            <div className="space-y-3">
              {studentNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
                >
                  <p className="text-sm font-semibold leading-relaxed text-[#61746a]">
                    {note.noteText}
                  </p>
                  <p className="mt-3 text-xs font-black text-[#12843a]">
                    {note.teacherName} - {formatShortDate(note.date)}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      );
    }

    if (activeMenu === "dukungan") {
      return (
        <Panel
          icon={HeartHandshake}
          title="Dukungan rumah minggu ini"
          desc="Langkah kecil yang bisa dilakukan keluarga tanpa terasa seperti tugas tambahan yang berat."
        >
          <div className="grid gap-3 md:grid-cols-3">
            {selectedStudent.supportRequirements.map((support, index) => (
              <div
                key={support}
                className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-black text-[#12843a] shadow-sm">
                  {index + 1}
                </span>
                <p className="mt-3 text-sm font-black leading-relaxed text-[#10203b]">
                  {support}
                </p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-[#61746a]">
                  Jadikan latihan sebagai rutinitas pendek, bukan tekanan.
                </p>
              </div>
            ))}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "persetujuan") {
      return (
        <Panel
          icon={LockKeyhole}
          title="Persetujuan data anak"
          desc="Orang tua melihat batas data secara jelas sebelum portofolio dibagikan ke DUDI."
        >
          <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-black text-[#10203b]">
                  Status consent: {studentConsent?.status || "pending"}
                </p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[#61746a]">
                  {studentConsent?.note ||
                    "Menunggu persetujuan wali/sekolah untuk validasi industri."}
                </p>
              </div>
              <StatusBadge tone={getConsentTone(studentConsent?.status)}>
                {studentConsent?.status || "pending"}
              </StatusBadge>
            </div>
          </div>
        </Panel>
      );
    }

    if (activeMenu === "pesan") {
      return (
        <Panel
          icon={MessageSquare}
          title="Pesan dan catatan keluarga"
          desc="Prototype ini mencontohkan ruang komunikasi ringan antara keluarga dan pendamping."
        >
          {renderNoteComposer()}
        </Panel>
      );
    }

    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <Panel
          icon={HeartHandshake}
          title={`Perkembangan ${selectedStudent.name}`}
          desc={`${TAGLINE}. Fokus keluarga adalah memahami progress, bukan membaca istilah teknis.`}
        >
          <div className="space-y-4">
            <p className="rounded-2xl bg-[#f8faf7] p-4 text-sm font-semibold leading-relaxed text-[#61746a]">
              {selectedStudent.name} sedang bergerak di jalur{" "}
              {selectedStudent.interest}. Bukti terkuat saat ini berasal dari{" "}
              {studentSessions[0]?.gameName || "simulasi awal"}.
            </p>
            <ProgressBar value={selectedStudent.readinessScore} />
          </div>
        </Panel>
        <Panel icon={CalendarCheck} title="Yang bisa dilakukan di rumah">
          <div className="space-y-3">
            {selectedStudent.supportRequirements.slice(0, 3).map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-[#f8faf7] p-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#12843a]" />
                <p className="text-sm font-semibold leading-relaxed text-[#61746a]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderTeacherDashboard = () => {
    if (!selectedStudent) return <EmptyState text="Belum ada siswa aktif." />;

    if (activeMenu === "siswa") {
      return (
        <Panel
          icon={UsersRound}
          title="Profil pendampingan siswa"
          desc="Guru dapat melihat data internal sekolah yang tidak tampil di DUDI."
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <p className="font-display text-2xl font-black text-[#10203b]">
                {selectedStudent.name}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#61746a]">
                {selectedStudent.bio}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedStudent.skills.map((skill) => (
                  <StatusBadge key={skill} tone="green">
                    {skill}
                  </StatusBadge>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#fecdd3] bg-[#fff1f2] p-4">
              <div className="flex items-center gap-2 font-black text-[#be123c]">
                <AlertTriangle className="h-5 w-5" />
                Data internal sekolah
              </div>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[#7f1d1d]">
                {selectedStudent.supportProfile}. Catatan privat seperti kontak
                wali dan informasi medis tidak dikirim ke DUDI.
              </p>
            </div>
          </div>
        </Panel>
      );
    }

    if (activeMenu === "simulasi") {
      return (
        <Panel icon={Target} title="Simulasi dan rekomendasi latihan">
          <div className="space-y-4">
            {renderMissionCards()}
            {renderEvidenceList()}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "evidence") {
      return (
        <Panel
          icon={ClipboardCheck}
          title="Evidence stack"
          desc="Guru mengurasi hasil simulasi menjadi bukti kerja yang siap dipahami keluarga dan DUDI."
        >
          {renderEvidenceList()}
        </Panel>
      );
    }

    if (activeMenu === "consent") {
      return (
        <Panel icon={LockKeyhole} title="Consent dan batas berbagi data">
          <div className="grid gap-3 md:grid-cols-3">
            {(["pending", "approved", "revoked"] as ConsentStatus[]).map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => updateConsent(status)}
                  className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${toneClass[getConsentTone(status)]}`}
                >
                  <p className="font-black capitalize">{status}</p>
                  <p className="mt-2 text-xs font-semibold leading-relaxed">
                    Ubah status consent {selectedStudent.name} menjadi {status}.
                  </p>
                </button>
              ),
            )}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "placement") {
      return (
        <Panel icon={BriefcaseBusiness} title="Follow-up placement">
          <div className="space-y-3">
            {studentPlacements.length ? (
              studentPlacements.map((placement) => (
                <div
                  key={placement.id}
                  className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-black text-[#10203b]">
                        {placement.jobTitle}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#61746a]">
                        {placement.companyName} - {placement.note}
                      </p>
                    </div>
                    <StatusBadge tone={placementTone(placement.status)}>
                      {placement.status.replaceAll("_", " ")}
                    </StatusBadge>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState text="Belum ada placement. Perkuat evidence dan consent terlebih dahulu." />
            )}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "laporan") {
      return (
        <Panel
          icon={FileText}
          title="Laporan pendampingan"
          desc="Catatan ini menjadi bahan ringkasan untuk keluarga, sekolah, dan persiapan DUDI."
        >
          {renderNoteComposer()}
        </Panel>
      );
    }

    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Panel
          icon={GraduationCap}
          title="Prioritas pendampingan hari ini"
          desc={`Rata-rata readiness kelas demo ${cohortAverage}/100. Pilih siswa, baca evidence, lalu tentukan next action.`}
        >
          <div className="space-y-3">
            {students.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedStudentId(student.id)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4 text-left transition hover:bg-[#eef8f0]"
              >
                <div>
                  <p className="font-black text-[#10203b]">{student.name}</p>
                  <p className="mt-1 text-xs font-semibold text-[#61746a]">
                    {student.interest}
                  </p>
                </div>
                <StatusBadge tone="green">{student.readinessScore}%</StatusBadge>
              </button>
            ))}
          </div>
        </Panel>
        <Panel icon={MessageSquare} title="Catatan cepat">
          {renderNoteComposer()}
        </Panel>
      </div>
    );
  };

  const renderDudiDashboard = () => {
    if (!selectedCandidate) {
      return <EmptyState text="Belum ada kandidat DUDI-safe." />;
    }

    if (activeMenu === "talent") {
      return (
        <Panel
          icon={Search}
          title="Talent pool DUDI-safe"
          desc="Kandidat tampil sebagai kode aman dengan skill, evidence, dan akomodasi kerja yang relevan."
        >
          <div className="grid gap-3 lg:grid-cols-2">
            {dudiCandidates.map((candidate) => (
              <button
                key={candidate.candidateId}
                type="button"
                onClick={() => setSelectedCandidateId(candidate.candidateId)}
                className="rounded-[1.2rem] border border-[#dbe7dd] bg-[#f8faf7] p-4 text-left transition hover:border-[#12843a] hover:bg-[#eef8f0]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl font-black text-[#10203b]">
                      {candidate.displayCode}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#61746a]">
                      {candidate.schoolSegment} - {candidate.interest}
                    </p>
                  </div>
                  <StatusBadge tone={getConsentTone(candidate.consentStatus)}>
                    {candidate.consentStatus}
                  </StatusBadge>
                </div>
                <div className="mt-4">
                  <ProgressBar value={candidate.readinessScore} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill) => (
                    <StatusBadge key={skill} tone="green">
                      {skill}
                    </StatusBadge>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "lowongan") {
      return (
        <Panel
          icon={BriefcaseBusiness}
          title="Lowongan inklusif"
          desc="Lowongan menjelaskan skill dan akomodasi kerja agar matching tidak sekadar berdasarkan label."
        >
          <div className="mb-4">
            <button
              type="button"
              onClick={addInclusiveJob}
              className="inline-flex items-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
            >
              Tambah lowongan demo
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-[1.2rem] border border-[#dbe7dd] bg-[#f8faf7] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-[#10203b]">{job.title}</p>
                    <p className="mt-1 text-sm font-semibold text-[#61746a]">
                      {job.companyName} - {job.type}
                    </p>
                  </div>
                  <StatusBadge tone={job.status === "Active" ? "green" : "neutral"}>
                    {job.status}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[#61746a]">
                  Match kandidat aktif: {getDudiJobMatchScore(selectedCandidate, job)}%
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.accommodationSupports.slice(0, 3).map((support) => (
                    <StatusBadge key={support} tone="blue">
                      {support}
                    </StatusBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "validasi") {
      return (
        <Panel
          icon={BadgeCheck}
          title="Industry Validation Seal"
          desc="DUDI dapat menerbitkan seal jika consent validasi industri sudah aktif."
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <p className="font-display text-2xl font-black text-[#10203b]">
                {selectedCandidate.displayCode}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#61746a]">
                {selectedCandidate.portfolioSummary}
              </p>
              <div className="mt-4 space-y-3">
                {selectedCandidate.evidenceItems.length ? (
                  selectedCandidate.evidenceItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-black text-[#10203b]">{item.title}</p>
                        <StatusBadge tone="green">{item.score}%</StatusBadge>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState text="Belum ada evidence publik untuk kandidat ini." />
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <StatusBadge tone={getConsentTone(selectedCandidate.consentStatus)}>
                {selectedCandidate.consentStatus}
              </StatusBadge>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[#61746a]">
                {selectedCandidate.consentSummary}
              </p>
              <button
                data-tour="primary-action"
                type="button"
                onClick={() => issueValidation(selectedCandidate)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
              >
                Terbitkan seal
                <BadgeCheck className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Panel>
      );
    }

    if (activeMenu === "placement") {
      return (
        <Panel icon={CalendarCheck} title="Pipeline placement">
          <div className="mb-4">
            <button
              type="button"
              onClick={() => shortlistCandidate()}
              className="inline-flex items-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
            >
              Shortlist kandidat aktif
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {candidatePlacements.length ? (
              candidatePlacements.map((placement) => (
                <div
                  key={placement.id}
                  className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-black text-[#10203b]">
                        {placement.jobTitle}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#61746a]">
                        {placement.companyName} - {placement.note}
                      </p>
                    </div>
                    <StatusBadge tone={placementTone(placement.status)}>
                      {placement.status.replaceAll("_", " ")}
                    </StatusBadge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(["interview", "work_trial", "placed", "not_ready"] as PlacementStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => movePlacement(placement, status)}
                          className="rounded-full border border-[#dbe7dd] bg-white px-3 py-2 text-xs font-black text-[#17351f] transition hover:bg-[#eef8f0]"
                        >
                          {status.replaceAll("_", " ")}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState text="Belum ada placement untuk kandidat aktif." />
            )}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "report") {
      return (
        <Panel
          icon={Download}
          title="DUDI-safe report"
          desc="Report PDF hanya berisi kode kandidat, evidence, skill, akomodasi kerja, consent, dan audit publik."
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
            <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <p className="font-black text-[#10203b]">
                {selectedCandidate.displayCode}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#61746a]">
                {selectedCandidate.privacyNotice}
              </p>
              <button
                type="button"
                onClick={exportDudiReport}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
              >
                Export PDF
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {auditEvents.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-[#dbe7dd] bg-white p-3"
                >
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#12843a]">
                    {event.action}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-[#61746a]">
                    {event.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      );
    }

    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Panel
          icon={Building2}
          title="Ringkasan talent untuk DUDI"
          desc="DUDI melihat kandidat yang sudah dipseudonimkan dan bisa langsung memahami bukti kompetensi."
        >
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <p className="font-display text-2xl font-black text-[#10203b]">
                {selectedCandidate.displayCode}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#61746a]">
                {selectedCandidate.portfolioSummary}
              </p>
              <div className="mt-4">
                <ProgressBar value={selectedCandidate.readinessScore} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCandidate.skills.map((skill) => (
                <StatusBadge key={skill} tone="green">
                  {skill}
                </StatusBadge>
              ))}
            </div>
          </div>
        </Panel>
        <Panel icon={LockKeyhole} title="Batas data yang terlihat">
          <div className="space-y-3">
            {selectedCandidate.accommodationNeeds.map((need) => (
              <div key={need} className="rounded-2xl bg-[#f8faf7] p-3">
                <p className="text-sm font-semibold leading-relaxed text-[#61746a]">
                  {need}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderAdminDashboard = () => {
    if (activeMenu === "users") {
      return (
        <Panel
          icon={UsersRound}
          title="User dan profil demo"
          desc="Admin dapat menyiapkan data demo untuk sekolah, siswa, dan role terkait."
        >
          <div className="mb-4">
            <button
              type="button"
              onClick={addSampleStudent}
              className="inline-flex items-center gap-2 rounded-full bg-[#12843a] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0b5d2a]"
            >
              Tambah siswa demo
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
              >
                <p className="font-black text-[#10203b]">{student.name}</p>
                <p className="mt-1 text-sm font-semibold text-[#61746a]">
                  {student.schoolName}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge tone="green">{student.readinessScore}%</StatusBadge>
                  <StatusBadge tone={getConsentTone(consents.find((item) => item.studentId === student.id)?.status)}>
                    {consents.find((item) => item.studentId === student.id)?.status || "pending"}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "schools") {
      const schools = Array.from(new Set(students.map((student) => student.schoolName)));
      return (
        <Panel icon={School} title="Sekolah mitra">
          <div className="grid gap-3 md:grid-cols-2">
            {schools.map((school) => (
              <div
                key={school}
                className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
              >
                <p className="font-black text-[#10203b]">{school}</p>
                <p className="mt-2 text-sm font-semibold text-[#61746a]">
                  {students.filter((student) => student.schoolName === school).length} siswa aktif dalam demo.
                </p>
              </div>
            ))}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "dudi") {
      return (
        <Panel icon={Building2} title="Mitra DUDI dan lowongan">
          <div className="grid gap-3 lg:grid-cols-2">
            {companies.map((company) => (
              <div
                key={company.id}
                className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-[#10203b]">{company.name}</p>
                    <p className="mt-1 text-sm font-semibold text-[#61746a]">
                      {company.industry} - {company.location}
                    </p>
                  </div>
                  <StatusBadge tone={company.isVerified ? "green" : "yellow"}>
                    {company.isVerified ? "Verified" : "Review"}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "consent") {
      return (
        <Panel icon={LockKeyhole} title="Consent governance">
          <div className="space-y-3">
            {students.map((student) => {
              const consent = consents.find((item) => item.studentId === student.id);
              return (
                <div
                  key={student.id}
                  className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-black text-[#10203b]">{student.name}</p>
                      <p className="mt-1 text-sm font-semibold text-[#61746a]">
                        {consent?.note || "Consent belum tercatat lengkap."}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(["approved", "pending", "revoked"] as ConsentStatus[]).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            setSelectedStudentId(student.id);
                            onUpdateConsent(
                              student.id,
                              status,
                              "admin",
                              `Admin mengubah consent ${student.name} menjadi ${status}.`,
                            );
                            notify({
                              title: "Consent admin diperbarui",
                              message: `${student.name} sekarang ${status}.`,
                              tone: status === "approved" ? "success" : "warning",
                            });
                          }}
                          className={`rounded-full border px-3 py-2 text-xs font-black ${toneClass[getConsentTone(status)]}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "audit") {
      return (
        <Panel icon={Database} title="Audit trail">
          <div className="space-y-3">
            {auditEvents.length ? (
              auditEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-black text-[#10203b]">{event.action}</p>
                    <StatusBadge tone="blue">{event.actorRole}</StatusBadge>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[#61746a]">
                    {event.summary}
                  </p>
                  <p className="mt-2 text-xs font-black text-[#12843a]">
                    {formatDateTime(event.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <EmptyState text="Belum ada audit event." />
            )}
          </div>
        </Panel>
      );
    }

    if (activeMenu === "reports") {
      return (
        <Panel
          icon={FileText}
          title="Insight ekosistem"
          desc="Ringkasan untuk menjelaskan dampak demo kepada sekolah, keluarga, DUDI, dan juri."
        >
          <div className="grid gap-3 md:grid-cols-3">
            <MetricCard
              icon={CheckCircle2}
              label="Berbasis bukti"
              value={`${sessions.length}`}
              detail="Evidence simulasi yang sudah tercatat."
              tone="green"
            />
            <MetricCard
              icon={BadgeCheck}
              label="Seal"
              value={`${validations.length}`}
              detail="Validasi skill oleh mitra industri."
              tone="yellow"
            />
            <MetricCard
              icon={CalendarCheck}
              label="Placement"
              value={`${placements.length}`}
              detail="Pipeline transisi ke dunia kerja."
              tone="blue"
            />
          </div>
        </Panel>
      );
    }

    if (activeMenu === "placement") {
      return (
        <Panel icon={BriefcaseBusiness} title="Placement monitor">
          <div className="space-y-3">
            {placements.map((placement) => (
              <div
                key={placement.id}
                className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-black text-[#10203b]">
                      {placement.candidateCode} - {placement.jobTitle}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#61746a]">
                      {placement.companyName}
                    </p>
                  </div>
                  <StatusBadge tone={placementTone(placement.status)}>
                    {placement.status.replaceAll("_", " ")}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      );
    }

    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Panel
          icon={ShieldCheck}
          title="Kesehatan demo SyncVoca"
          desc={`${TAGLINE}. Admin melihat apakah data, consent, DUDI, report, dan placement siap dipresentasikan.`}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <p className="text-sm font-black text-[#10203b]">
                Completeness score
              </p>
              <p className="mt-2 font-display text-4xl font-black text-[#12843a]">
                94%
              </p>
              <p className="mt-2 text-xs font-semibold text-[#61746a]">
                Data demo sudah memuat siswa, consent, evidence, DUDI, dan placement.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
              <p className="text-sm font-black text-[#10203b]">
                Risiko utama
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#61746a]">
                Kandidat dengan consent pending tidak boleh divalidasi oleh DUDI.
                Prototype sengaja menampilkan guardrail ini.
              </p>
            </div>
          </div>
        </Panel>
        <Panel icon={Database} title="Audit terbaru">
          <div className="space-y-3">
            {auditEvents.slice(0, 4).map((event) => (
              <div key={event.id} className="rounded-2xl bg-[#f8faf7] p-3">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#12843a]">
                  {event.actorRole}
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-[#61746a]">
                  {event.summary}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderRoleContent = () => {
    if (role === "siswa") return renderStudentDashboard();
    if (role === "orang_tua") return renderParentDashboard();
    if (role === "guru") return renderTeacherDashboard();
    if (role === "dudi") return renderDudiDashboard();
    return renderAdminDashboard();
  };

  return (
    <div
      className={`space-y-5 ${preferences.dyslexiaFont ? "font-serif" : "font-sans"}`}
    >
      <GuidedTour
        enabled
        storageKey={`sv-guide-${role}`}
        replaySignal={tourReplay}
        steps={tourSteps}
        voiceIntro={`Selamat datang di halaman portal demo SyncVoca. ${TAGLINE}.`}
      />

      <section
        data-tour="dashboard-hero"
        className={`relative overflow-hidden rounded-[1.5rem] border p-4 shadow-sm sm:p-6 ${
          isHighContrast
            ? "border-4 border-black bg-white text-black"
            : "border-[#dbe7dd] bg-white text-[#17351f]"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1768c8] via-[#12843a] to-[#f6c343]" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex gap-4">
            <span className={`mt-1 hidden rounded-[1.2rem] border p-4 sm:inline-flex ${toneClass[intro.tone]}`}>
              <IntroIcon className="h-8 w-8" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={intro.tone}>{intro.eyebrow}</StatusBadge>
                <StatusBadge tone="neutral">{TAGLINE}</StatusBadge>
              </div>
              <h1 className="mt-4 max-w-4xl font-display text-3xl font-black leading-tight tracking-tight text-[#10203b] sm:text-4xl lg:text-5xl">
                {intro.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-[#61746a] sm:text-base">
                {intro.desc}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
            <button
              type="button"
              onClick={() => setTourReplay((value) => value + 1)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dbe7dd] bg-white px-4 py-3 text-sm font-black text-[#17351f] transition hover:bg-[#eef8f0]"
            >
              Mulai guide tour
              <Sparkles className="h-4 w-4 text-[#12843a]" />
            </button>
            <button
              data-tour="primary-action"
              type="button"
              onClick={() => {
                if (role === "dudi") issueValidation(selectedCandidate);
                else if (role === "admin") addSampleStudent();
                else if (role === "guru") submitNote();
                else if (role === "orang_tua") setActiveMenu("dukungan");
                else runMission(missions[0]);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12843a] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/10 transition hover:bg-[#0b5d2a]"
            >
              {intro.primaryAction}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside
          data-tour="role-menu"
          className="h-fit rounded-[1.35rem] border border-[#dbe7dd] bg-white p-3 shadow-sm lg:sticky lg:top-24"
        >
          <div className="grid gap-2 min-[560px]:grid-cols-2 lg:grid-cols-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                    isActive
                      ? "border-[#12843a] bg-[#e8f8ee] text-[#0b5d2a]"
                      : "border-transparent bg-white text-[#17351f] hover:bg-[#f8faf7]"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-black">{item.label}</span>
                    <span className="block truncate text-xs font-semibold text-[#61746a]">
                      {item.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 border-t border-[#dbe7dd] pt-4">
            {renderProfileSwitcher()}
          </div>
        </aside>

        <main data-tour="main-content" className="min-w-0 space-y-5">
          <section
            data-tour="metric-grid"
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            {metricCards().map((card) => (
              <MetricCard key={card.label} {...card} />
            ))}
          </section>

          {renderRoleContent()}
          {renderPrivacyWall()}
        </main>
      </div>
    </div>
  );
}
