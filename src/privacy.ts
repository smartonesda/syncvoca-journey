import {
  DudiCandidateProfile,
  GameSession,
  IndustryValidation,
  JobPosting,
  StudentConsent,
  StudentProfile
} from './types';

export const DUDI_VISIBLE_FIELDS = [
  'displayCode',
  'schoolSegment',
  'interest',
  'readinessScore',
  'skills',
  'accommodationNeeds',
  'portfolioSummary',
  'evidenceItems',
  'validationSeals',
  'consentStatus',
  'consentScopes',
  'consentUpdatedAt',
  'consentSummary'
] as const;

export const DUDI_RESTRICTED_FIELDS = [
  'name',
  'schoolName',
  'supportProfile',
  'bio',
  'sensitiveData',
  'medicalNotes',
  'guardianContact',
  'familyBackground',
  'privateNotes',
  'teacherNotes',
  'requestedBy',
  'approvedBy',
  'validUntil'
] as const;

const PRIVACY_NOTICE =
  'Data DUDI dipseudonimkan. Mitra hanya melihat bukti kompetensi, skor kesiapan, dan kebutuhan akomodasi kerja.';

const hashText = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(0, 4);
};

const getDisplayCode = (student: StudentProfile, index: number) =>
  `ABK-${String(index + 1).padStart(2, '0')}-${hashText(student.id)}`;

const getSchoolSegment = (schoolName: string) => {
  const normalized = schoolName.toLowerCase();
  if (normalized.includes('smk') || normalized.includes('sma')) return 'SMK/SMA inklusi mitra';
  if (normalized.includes('slb')) return 'SLB/sekolah inklusi mitra';
  return 'Sekolah inklusi mitra';
};

const sanitizeAccommodation = (support: string) =>
  support
    .replace(/untuk terapi[^,.;]*/gi, 'untuk kebutuhan penyesuaian berkala')
    .replace(/ADHD|autisme|disleksia|hearing aid|diagnosis|medis/gi, 'kebutuhan dukungan')
    .trim();

const redactStudentReferences = (text: string, student: StudentProfile) => {
  const escapedName = student.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(escapedName, 'gi'), 'Kandidat');
};

export const getDudiJobMatchScore = (candidate: DudiCandidateProfile, job: JobPosting) => {
  const lowerSkills = candidate.skills.map((skill) => skill.toLowerCase());
  const matches = job.requiredSkills.filter((skill) =>
    lowerSkills.some((ownedSkill) => ownedSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(ownedSkill))
  );
  return Math.round((matches.length / Math.max(1, job.requiredSkills.length)) * 100);
};

const getConsentSummary = (consent?: StudentConsent) => {
  if (!consent) return 'Consent belum tercatat. Seal industri harus menunggu persetujuan sekolah/wali.';
  if (consent.status === 'approved' && consent.scopes.includes('industry-validation')) {
    return 'Consent aktif untuk portofolio, akomodasi kerja, dan validasi industri.';
  }
  if (consent.status === 'revoked') {
    return 'Consent dicabut. DUDI tidak boleh menerbitkan seal baru.';
  }
  return 'Consent belum mencakup validasi industri. Seal baru harus ditahan.';
};

export const createDudiCandidateProfiles = (
  students: StudentProfile[],
  sessions: GameSession[],
  validations: IndustryValidation[],
  consents: StudentConsent[] = [],
  _jobs: JobPosting[] = []
): DudiCandidateProfile[] =>
  students.map((student, index) => {
    const studentSessions = sessions.filter((session) => session.studentId === student.id);
    const studentValidations = validations.filter((validation) => validation.studentId === student.id);
    const consent = consents.find((item) => item.studentId === student.id);
    const displayCode = getDisplayCode(student, index);
    const topSkills = student.skills.slice(0, 5);

    return {
      candidateId: displayCode,
      studentRef: student.id,
      displayCode,
      schoolSegment: getSchoolSegment(student.schoolName),
      interest: student.interest,
      readinessScore: student.readinessScore,
      skills: topSkills,
      accommodationNeeds: student.supportRequirements.map(sanitizeAccommodation).slice(0, 4),
      portfolioSummary: [
        `${displayCode} cocok untuk jalur ${student.interest}.`,
        `Bukti terkuat: ${topSkills.slice(0, 3).join(', ') || 'skill awal belum lengkap'}.`,
        `Kebutuhan kerja: ${student.supportRequirements.map(sanitizeAccommodation).slice(0, 2).join(' dan ') || 'akomodasi belum dipetakan'}.`
      ].join(' '),
      evidenceItems: studentSessions.slice(0, 5).map((session) => ({
        id: session.id,
        title: session.gameName,
        score: session.score,
        accuracy: session.metrics.accuracy,
        consistency: session.metrics.consistency,
        completionTime: session.metrics.completionTime,
        date: session.date
      })),
      validationSeals: studentValidations.map((validation) => ({
        id: validation.id,
        companyName: validation.companyName,
        validatedSkills: validation.validatedSkills,
        sealIssuedAt: validation.sealIssuedAt,
        note: redactStudentReferences(validation.note, student)
      })),
      consentStatus: consent?.status || 'pending',
      consentScopes: consent?.scopes || [],
      consentUpdatedAt: consent?.updatedAt || '',
      consentSummary: getConsentSummary(consent),
      privacyNotice: PRIVACY_NOTICE
    };
  });
