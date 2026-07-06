export type UserRole = 'siswa' | 'guru' | 'orang_tua' | 'dudi' | 'admin';
export type ConsentStatus = 'approved' | 'pending' | 'revoked';
export type PlacementStatus = 'shortlisted' | 'interview' | 'work_trial' | 'placed' | 'not_ready';

export interface AccessibilityPreferences {
  textSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  simplifiedLayout: boolean;
  audioAssist: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  schoolId: string;
  schoolName: string;
  supportProfile: string; // ABK support profile, not a public medical diagnosis
  bio: string;
  skills: string[];
  interest: string;
  readinessScore: number; // 0 - 100 based on validation & simulations
  supportRequirements: string[]; // support or accommodation needed at work
  // Sensitive/Private data - NOT visible to DUDI
  sensitiveData: {
    medicalNotes: string;
    guardianContact: string;
    familyBackground: string;
    privateNotes: string;
  };
}

export interface DudiEvidenceItem {
  id: string;
  title: string;
  score: number;
  accuracy: number;
  consistency: number;
  completionTime: number;
  date: string;
}

export interface DudiValidationSeal {
  id: string;
  companyName: string;
  validatedSkills: string[];
  sealIssuedAt: string;
  note: string;
}

export interface DudiCandidateProfile {
  candidateId: string;
  studentRef: string; // internal write key for validation actions, never render as identity
  displayCode: string;
  schoolSegment: string;
  interest: string;
  readinessScore: number;
  skills: string[];
  accommodationNeeds: string[];
  portfolioSummary: string;
  evidenceItems: DudiEvidenceItem[];
  validationSeals: DudiValidationSeal[];
  consentStatus: ConsentStatus;
  consentScopes: string[];
  consentUpdatedAt: string;
  consentSummary: string;
  privacyNotice: string;
}

export interface StudentConsent {
  id: string;
  studentId: string;
  status: ConsentStatus;
  scopes: string[];
  requestedBy: string;
  approvedBy?: string;
  updatedAt: string;
  validUntil?: string;
  note: string;
}

export interface AuditEvent {
  id: string;
  actorRole: UserRole;
  action:
    | 'industry_validation_issued'
    | 'industry_validation_blocked'
    | 'inclusive_job_created'
    | 'consent_requested'
    | 'consent_approved'
    | 'consent_revoked'
    | 'dudi_safe_report_exported'
    | 'candidate_shortlisted'
    | 'placement_status_updated'
    | 'placement_shortlist_blocked';
  targetType: 'student' | 'job' | 'validation' | 'consent' | 'placement';
  targetId: string;
  summary: string;
  createdAt: string;
  metadata: Record<string, string | number | boolean>;
}

export interface ValidationActionResult {
  ok: boolean;
  reason?: 'consent_required' | 'created';
  message: string;
  validation?: IndustryValidation;
}

export interface PlacementActionResult {
  ok: boolean;
  reason?: 'consent_required' | 'created' | 'updated' | 'missing_job' | 'not_found';
  message: string;
  placement?: DudiPlacementRecord;
}

export interface CompetencyMatrix {
  logika: number; // 0 - 100
  ketelitian: number; // 0 - 100
  konsistensi: number; // 0 - 100
  ketahananKerja: number; // 0 - 100
  motorikKasar: number; // 0 - 100
}

export interface Game {
  id: string;
  name: string;
  description: string;
  vocationCategory: string;
  minDurationMinutes: number;
}

export interface GameSession {
  id: string;
  studentId: string;
  studentName: string;
  gameId: string;
  gameName: string;
  score: number;
  date: string;
  metrics: {
    accuracy: number; // %
    completionTime: number; // seconds
    errorCount: number;
    consistency: number; // %
  };
}

export interface TeacherNote {
  id: string;
  studentId: string;
  teacherName: string;
  noteText: string;
  date: string;
  focusCategory: 'Kognitif' | 'Motorik' | 'Sosial-Emosional' | 'Kehadiran' | 'Saran';
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  isVerified: boolean;
  description: string;
}

export interface JobPosting {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  industry: string;
  location: string;
  accommodationSupports: string[]; // workplace supports provided by the employer
  requiredSkills: string[];
  description: string;
  salaryRange: string;
  status: 'Active' | 'Draft' | 'Closed';
  type: 'Onsite' | 'Remote' | 'Hybrid';
}

export interface IndustryValidation {
  id: string;
  studentId: string;
  companyId: string;
  companyName: string;
  validatedSkills: string[];
  sealIssuedAt: string;
  note: string;
}

export interface DudiPlacementRecord {
  id: string;
  studentId: string;
  candidateCode: string;
  companyId: string;
  companyName: string;
  jobId: string;
  jobTitle: string;
  status: PlacementStatus;
  createdAt: string;
  updatedAt: string;
  note: string;
}
