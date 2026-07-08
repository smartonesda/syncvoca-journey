import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Building2,
  GraduationCap,
  Heart,
  Home,
  RotateCcw,
  ShieldCheck,
  User,
} from "lucide-react";
import { database } from "./data";
import {
  AccessibilityPreferences,
  AuditEvent,
  ConsentStatus,
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
} from "./types";
import AccessibilityPanel from "./components/AccessibilityPanel";
import { AppFeedbackProvider, useAppFeedback } from "./components/AppFeedback";
import LandingPage from "./components/LandingPage";
import RoleDashboardWorkspace from "./components/RoleDashboardWorkspace";
import { createDudiCandidateProfiles } from "./privacy";
import { scrollToTopInstant } from "./utils/scroll";

const roleMeta: Record<
  UserRole,
  { label: string; short: string; icon: any; desc: string }
> = {
  siswa: {
    label: "Siswa ABK",
    short: "S",
    icon: User,
    desc: "Latihan simulasi, mentor AI, dan portofolio kompetensi",
  },
  guru: {
    label: "Guru",
    short: "G",
    icon: GraduationCap,
    desc: "Monitoring progres, catatan pendampingan, dan rekomendasi latihan",
  },
  orang_tua: {
    label: "Orang Tua",
    short: "O",
    icon: Heart,
    desc: "Ringkasan perkembangan dan checklist pendampingan rumah",
  },
  dudi: {
    label: "DUDI",
    short: "D",
    icon: Building2,
    desc: "Talent pool, lowongan inklusif, dan Industry Validation Seal",
  },
  admin: {
    label: "Admin",
    short: "A",
    icon: ShieldCheck,
    desc: "Master data demo untuk siswa, sekolah, dan mitra industri",
  },
};

const roleOrder: Array<UserRole | null> = [
  null,
  "siswa",
  "guru",
  "orang_tua",
  "dudi",
  "admin",
];

function ResetDemoButton({ isHighContrast }: { isHighContrast: boolean }) {
  const { requestConfirm, notify } = useAppFeedback();

  const handleResetData = async () => {
    const shouldReset = await requestConfirm({
      title: "Reset data demo?",
      message:
        "Semua progres demo lokal akan dikembalikan ke data ABK bawaan SyncVoca. Data ini hanya tersimpan di browser perangkat ini.",
      confirmLabel: "Reset Demo",
      cancelLabel: "Batalkan",
      tone: "warning",
    });

    if (!shouldReset) return;

    localStorage.clear();
    notify({
      title: "Data demo direset",
      message: "SyncVoca akan memuat ulang data ABK bawaan.",
      tone: "success",
      durationMs: 1200,
    });
    window.setTimeout(() => window.location.reload(), 700);
  };

  return (
    <button
      onClick={handleResetData}
      title="Ulang data demo"
      aria-label="Reset data demo SyncVoca"
      className={`rounded-full p-2 transition ${
        isHighContrast
          ? "text-black hover:bg-zinc-100"
          : "text-[#61746a] hover:bg-[#fff7d6] hover:text-[#0b5d2a]"
      }`}
    >
      <RotateCcw className="h-4 w-4" />
    </button>
  );
}

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [teacherNotes, setTeacherNotes] = useState<TeacherNote[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [validations, setValidations] = useState<IndustryValidation[]>([]);
  const [consents, setConsents] = useState<StudentConsent[]>([]);
  const [placements, setPlacements] = useState<DudiPlacementRecord[]>([]);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);

  const [accessibility, setAccessibility] = useState<AccessibilityPreferences>({
    textSize: "normal",
    highContrast: false,
    dyslexiaFont: false,
    reducedMotion: false,
    simplifiedLayout: false,
    audioAssist: false,
  });

  const handleRoleChange = (role: UserRole | null) => {
    if (role && typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(
        null,
        document.title,
        `${window.location.pathname}${window.location.search}`,
      );
    }

    setCurrentRole(role);
    scrollToTopInstant();
  };

  useEffect(() => {
    setStudents(database.getStudents());
    setSessions(database.getSessions());
    setTeacherNotes(database.getTeacherNotes());
    setJobPostings(database.getJobs());
    setValidations(database.getValidations());
    setConsents(database.getConsents());
    setPlacements(database.getPlacements());
    setAuditEvents(database.getAuditEvents());
  }, []);

  useLayoutEffect(() => {
    scrollToTopInstant();
  }, [currentRole]);

  const dudiCandidates = useMemo(
    () =>
      createDudiCandidateProfiles(
        students,
        sessions,
        validations,
        consents,
        jobPostings,
      ),
    [students, sessions, validations, consents, jobPostings],
  );

  const handleGameComplete = (newSession: GameSession) => {
    database.addSession(newSession);
    setSessions(database.getSessions());
    setStudents(database.getStudents());
  };

  const handleAddTeacherNote = (note: Omit<TeacherNote, "id">) => {
    database.addTeacherNote(note);
    setTeacherNotes(database.getTeacherNotes());
  };

  const handleAddJob = (job: Omit<JobPosting, "id">) => {
    const newJob = database.addJob(job);
    setJobPostings(database.getJobs());

    if (currentRole === "dudi") {
      database.addAuditEvent({
        actorRole: "dudi",
        action: "inclusive_job_created",
        targetType: "job",
        targetId: newJob.id,
        summary: `DUDI membuat lowongan inklusif: ${newJob.title}.`,
        metadata: {
          jobId: newJob.id,
          companyId: newJob.companyId,
          requiredSkillCount: newJob.requiredSkills.length,
        },
      });
      setAuditEvents(database.getAuditEvents());
    }
  };

  const handleAddValidation = (
    val: Omit<IndustryValidation, "id">,
    actorRole: UserRole = currentRole || "admin",
  ): ValidationActionResult => {
    const consent = consents.find((item) => item.studentId === val.studentId);
    const candidate = dudiCandidates.find(
      (item) => item.studentRef === val.studentId,
    );
    const hasIndustryConsent =
      consent?.status === "approved" &&
      consent.scopes.includes("industry-validation");

    if (actorRole === "dudi" && !hasIndustryConsent) {
      database.addAuditEvent({
        actorRole,
        action: "industry_validation_blocked",
        targetType: "student",
        targetId: val.studentId,
        summary: `Industry Validation Seal diblokir untuk ${candidate?.displayCode || "kandidat"} karena consent belum aktif.`,
        metadata: {
          studentId: val.studentId,
          candidateId: candidate?.displayCode || "unknown",
          consentStatus: consent?.status || "missing",
          requestedSkillCount: val.validatedSkills.length,
        },
      });
      setAuditEvents(database.getAuditEvents());
      return {
        ok: false,
        reason: "consent_required",
        message: "Consent sekolah/wali belum aktif untuk validasi industri.",
      };
    }

    const validation = database.addValidation(val);
    setValidations(database.getValidations());

    const currentStudents = database.getStudents();
    const target = currentStudents.find(
      (student) => student.id === val.studentId,
    );
    if (target) {
      target.readinessScore = Math.min(100, target.readinessScore + 5);
      database.saveStudents(currentStudents);
      setStudents(currentStudents);
    }

    database.addAuditEvent({
      actorRole,
      action: "industry_validation_issued",
      targetType: "validation",
      targetId: validation.id,
      summary: `Industry Validation Seal diterbitkan untuk ${candidate?.displayCode || "kandidat"} berbasis consent ${hasIndustryConsent ? "aktif" : "internal"}.`,
      metadata: {
        studentId: val.studentId,
        candidateId: candidate?.displayCode || "internal",
        companyId: val.companyId,
        consentStatus: consent?.status || "not-required",
        validatedSkillCount: val.validatedSkills.length,
      },
    });
    setAuditEvents(database.getAuditEvents());

    return {
      ok: true,
      reason: "created",
      message: "Industry Validation Seal berhasil diterbitkan.",
      validation,
    };
  };

  const handleAddStudent = (student: StudentProfile) => {
    const currentStudents = database.getStudents();
    currentStudents.push(student);
    database.saveStudents(currentStudents);
    setStudents(currentStudents);
  };

  const handleUpdateConsent = (
    studentId: string,
    status: ConsentStatus,
    actorRole: Extract<UserRole, "guru" | "admin">,
    note: string,
  ): StudentConsent => {
    const currentConsents = database.getConsents();
    const existingConsent = currentConsents.find(
      (consent) => consent.studentId === studentId,
    );
    const targetStudent = database
      .getStudents()
      .find((student) => student.id === studentId);
    const candidate = dudiCandidates.find(
      (item) => item.studentRef === studentId,
    );
    const now = new Date().toISOString();
    const fullScopes = [
      "portfolio-sharing",
      "work-accommodation-sharing",
      "industry-validation",
    ];
    const pendingScopes = ["portfolio-sharing", "work-accommodation-sharing"];
    const nextConsent: StudentConsent = {
      id: existingConsent?.id || `consent-${studentId}-${Date.now()}`,
      studentId,
      status,
      scopes:
        status === "approved"
          ? fullScopes
          : status === "pending"
            ? pendingScopes
            : [],
      requestedBy:
        existingConsent?.requestedBy ||
        targetStudent?.schoolName ||
        "Sekolah mitra SyncVoca",
      approvedBy:
        status === "approved"
          ? actorRole === "admin"
            ? "Admin SyncVoca"
            : "Guru Pendamping SyncVoca"
          : undefined,
      updatedAt: now,
      validUntil: status === "approved" ? "2026-12-31T16:59:59Z" : undefined,
      note,
    };

    const nextConsents = existingConsent
      ? currentConsents.map((consent) =>
          consent.id === existingConsent.id ? nextConsent : consent,
        )
      : [nextConsent, ...currentConsents];

    database.saveConsents(nextConsents);
    setConsents(nextConsents);

    const action =
      status === "approved"
        ? "consent_approved"
        : status === "revoked"
          ? "consent_revoked"
          : "consent_requested";

    database.addAuditEvent({
      actorRole,
      action,
      targetType: "consent",
      targetId: nextConsent.id,
      summary: `${candidate?.displayCode || "Kandidat"} consent ${status} untuk validasi industri.`,
      metadata: {
        studentId,
        candidateId: candidate?.displayCode || "internal",
        consentStatus: status,
        scopeCount: nextConsent.scopes.length,
      },
    });
    setAuditEvents(database.getAuditEvents());

    return nextConsent;
  };

  const handleDudiReportExport = (candidateId: string, fileName: string) => {
    const candidate = dudiCandidates.find(
      (item) => item.candidateId === candidateId,
    );
    database.addAuditEvent({
      actorRole: "dudi",
      action: "dudi_safe_report_exported",
      targetType: "student",
      targetId: candidate?.studentRef || candidateId,
      summary: `DUDI-safe report diekspor untuk ${candidate?.displayCode || candidateId}.`,
      metadata: {
        studentId: candidate?.studentRef || "unknown",
        candidateId: candidate?.displayCode || candidateId,
        fileName,
        consentStatus: candidate?.consentStatus || "unknown",
        evidenceCount: candidate?.evidenceItems.length || 0,
        sealCount: candidate?.validationSeals.length || 0,
      },
    });
    setAuditEvents(database.getAuditEvents());
  };

  const handleAddPlacement = (
    placement: Omit<DudiPlacementRecord, "id" | "createdAt" | "updatedAt">,
    actorRole: UserRole = currentRole || "dudi",
  ): PlacementActionResult => {
    const consent = consents.find(
      (item) => item.studentId === placement.studentId,
    );
    const candidate = dudiCandidates.find(
      (item) => item.studentRef === placement.studentId,
    );
    const hasIndustryConsent =
      consent?.status === "approved" &&
      consent.scopes.includes("industry-validation");

    if (actorRole === "dudi" && !hasIndustryConsent) {
      database.addAuditEvent({
        actorRole,
        action: "placement_shortlist_blocked",
        targetType: "student",
        targetId: placement.studentId,
        summary: `Shortlist placement diblokir untuk ${candidate?.displayCode || placement.candidateCode} karena consent belum aktif.`,
        metadata: {
          studentId: placement.studentId,
          candidateId: candidate?.displayCode || placement.candidateCode,
          jobId: placement.jobId,
          consentStatus: consent?.status || "missing",
        },
      });
      setAuditEvents(database.getAuditEvents());
      return {
        ok: false,
        reason: "consent_required",
        message:
          "Consent validasi industri belum aktif untuk membuka pipeline placement.",
      };
    }

    const existingPlacement = placements.find(
      (item) =>
        item.studentId === placement.studentId &&
        item.jobId === placement.jobId,
    );

    if (existingPlacement) {
      return {
        ok: true,
        reason: "created",
        message: `${existingPlacement.candidateCode} sudah ada di pipeline ${existingPlacement.jobTitle}.`,
        placement: existingPlacement,
      };
    }

    const newPlacement = database.addPlacement(placement);
    setPlacements(database.getPlacements());

    database.addAuditEvent({
      actorRole,
      action: "candidate_shortlisted",
      targetType: "placement",
      targetId: newPlacement.id,
      summary: `${newPlacement.candidateCode} masuk shortlist ${newPlacement.jobTitle}.`,
      metadata: {
        studentId: newPlacement.studentId,
        candidateId: newPlacement.candidateCode,
        jobId: newPlacement.jobId,
        companyId: newPlacement.companyId,
        status: newPlacement.status,
      },
    });
    setAuditEvents(database.getAuditEvents());

    return {
      ok: true,
      reason: "created",
      message: `${newPlacement.candidateCode} masuk shortlist placement.`,
      placement: newPlacement,
    };
  };

  const handleUpdatePlacementStatus = (
    placementId: string,
    status: PlacementStatus,
    note: string,
    actorRole: UserRole = currentRole || "dudi",
  ): PlacementActionResult => {
    const placement = database.updatePlacement(placementId, { status, note });

    if (!placement) {
      return {
        ok: false,
        reason: "not_found",
        message: "Placement record tidak ditemukan.",
      };
    }

    setPlacements(database.getPlacements());
    database.addAuditEvent({
      actorRole,
      action: "placement_status_updated",
      targetType: "placement",
      targetId: placement.id,
      summary: `${placement.candidateCode} diperbarui ke status ${status.replaceAll("_", " ")}.`,
      metadata: {
        studentId: placement.studentId,
        candidateId: placement.candidateCode,
        jobId: placement.jobId,
        companyId: placement.companyId,
        status,
      },
    });
    setAuditEvents(database.getAuditEvents());

    return {
      ok: true,
      reason: "updated",
      message: `Status placement menjadi ${status.replaceAll("_", " ")}.`,
      placement,
    };
  };

  const isHighContrast = accessibility.highContrast;

  return (
    <div
      className={`sv-app ${isHighContrast ? "sv-high-contrast bg-white text-black border-4 border-black" : "bento-bg text-[#17351f]"} ${accessibility.dyslexiaFont ? "font-serif" : "font-sans"} min-h-screen pb-24`}
    >
      <AppFeedbackProvider>
        <header
          className={`sticky top-0 z-40 border-b px-4 py-3 backdrop-blur-xl sm:px-8 ${
            isHighContrast
              ? "border-b-4 border-black bg-white text-black"
              : "border-[#dbe7dd] bg-white/90 shadow-sm"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={() => handleRoleChange(null)}
              className="flex min-w-0 items-center gap-3 text-left"
              aria-label="Kembali ke landing page SyncVoca"
            >
              <img
                src="/syncvoca-logo.png"
                alt="SyncVoca Journey"
                className={`h-12 w-12 shrink-0 rounded-2xl object-cover ${isHighContrast ? "border-2 border-black" : "border border-[#dbe7dd] shadow-sm"}`}
              />
              <div className="min-w-0 max-w-[12rem] sm:max-w-none">
                <p className="truncate font-display text-base font-black leading-none tracking-tight text-[#0b5d2a] sm:text-lg">
                  SyncVoca Journey
                </p>
                <span className="mt-1 block truncate text-[10px] font-bold uppercase tracking-[0.18em] text-[#1768c8]">
                  Menghubungkan potensi, mewujudkan mandiri
                </span>
              </div>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {currentRole && (
                <button
                  onClick={() => handleRoleChange(null)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition ${
                    isHighContrast
                      ? "bg-black text-white"
                      : "border border-[#dbe7dd] bg-white text-[#17351f] hover:bg-[#eef8f0]"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Landing</span>
                </button>
              )}

              <ResetDemoButton isHighContrast={isHighContrast} />

              <AccessibilityPanel
                preferences={accessibility}
                onPreferencesChange={setAccessibility}
              />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-3 py-5 sm:px-8 sm:py-8">
          {!currentRole ? (
            <LandingPage
              onEnterPortal={handleRoleChange}
              preferences={accessibility}
            />
          ) : (
            <RoleDashboardWorkspace
              role={currentRole}
              students={currentRole === "dudi" ? [] : students}
              dudiCandidates={dudiCandidates}
              consents={consents}
              placements={placements}
              auditEvents={auditEvents}
              sessions={sessions}
              teacherNotes={teacherNotes}
              jobs={jobPostings}
              validations={validations}
              companies={database.getCompanies()}
              preferences={accessibility}
              onGameComplete={handleGameComplete}
              onAddNote={handleAddTeacherNote}
              onAddJob={handleAddJob}
              onAddValidation={handleAddValidation}
              onAddStudent={handleAddStudent}
              onUpdateConsent={handleUpdateConsent}
              onAddPlacement={handleAddPlacement}
              onUpdatePlacementStatus={handleUpdatePlacementStatus}
              onDudiReportExport={handleDudiReportExport}
            />
          )}
        </main>

        <nav
          data-tour="role-switcher"
          className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-2 shadow-2xl print:hidden sm:gap-2 sm:px-3 ${
            isHighContrast
              ? "border-2 border-black bg-white text-black"
              : "border-[#dbe7dd] bg-white/95 text-[#17351f] backdrop-blur"
          }`}
          aria-label="Pindah mode demo"
        >
          {roleOrder.map((role) => {
            const active = currentRole === role;
            const meta = role ? roleMeta[role] : null;
            const Icon = meta?.icon || Home;
            return (
              <button
                key={role || "landing"}
                onClick={() => handleRoleChange(role)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-black transition sm:min-w-10 ${
                  active
                    ? isHighContrast
                      ? "bg-black text-white"
                      : "bg-[#12843a] text-white"
                    : isHighContrast
                      ? "text-black hover:bg-zinc-100"
                      : "text-[#61746a] hover:bg-[#eef8f0] hover:text-[#0b5d2a]"
                }`}
                title={meta?.label || "Landing"}
              >
                <Icon className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">{meta?.short || "L"}</span>
              </button>
            );
          })}
        </nav>
      </AppFeedbackProvider>
    </div>
  );
}
