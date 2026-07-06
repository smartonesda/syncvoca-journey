import type { AuditEvent, DudiCandidateProfile } from './types';

export interface DudiSafeReportPayload {
  title: string;
  generatedAt: string;
  fileName: string;
  candidateCode: string;
  interest: string;
  schoolSegment: string;
  readinessScore: number;
  consent: {
    status: DudiCandidateProfile['consentStatus'];
    scopes: string[];
    updatedAt: string;
    summary: string;
  };
  skills: string[];
  accommodationNeeds: string[];
  evidenceItems: Array<{
    title: string;
    score: number;
    accuracy: number;
    consistency: number;
    completionTime: number;
    date: string;
  }>;
  validationSeals: Array<{
    companyName: string;
    validatedSkills: string[];
    sealIssuedAt: string;
    note: string;
  }>;
  auditTrail: Array<{
    action: AuditEvent['action'];
    actorRole: AuditEvent['actorRole'];
    summary: string;
    createdAt: string;
  }>;
  privacyNotice: string;
}

const formatReportDate = (date: string) =>
  date ? new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date)) : 'Belum tercatat';

const getReportFileName = (candidateCode: string) =>
  `SyncVoca_DUDI_Safe_Report_${candidateCode.replace(/[^A-Z0-9-]/gi, '_')}.pdf`;

const getCandidateAuditEvents = (candidate: DudiCandidateProfile, auditEvents: AuditEvent[]) =>
  auditEvents
    .filter((event) =>
      event.metadata.studentId === candidate.studentRef ||
      event.metadata.candidateId === candidate.displayCode ||
      event.targetId === candidate.studentRef
    )
    .slice(0, 6);

export const buildDudiSafeReportPayload = (
  candidate: DudiCandidateProfile,
  auditEvents: AuditEvent[] = []
): DudiSafeReportPayload => ({
  title: 'SyncVoca Journey - DUDI Safe Candidate Report',
  generatedAt: new Date().toISOString(),
  fileName: getReportFileName(candidate.displayCode),
  candidateCode: candidate.displayCode,
  interest: candidate.interest,
  schoolSegment: candidate.schoolSegment,
  readinessScore: candidate.readinessScore,
  consent: {
    status: candidate.consentStatus,
    scopes: candidate.consentScopes,
    updatedAt: candidate.consentUpdatedAt,
    summary: candidate.consentSummary
  },
  skills: candidate.skills,
  accommodationNeeds: candidate.accommodationNeeds,
  evidenceItems: candidate.evidenceItems.map((item) => ({
    title: item.title,
    score: item.score,
    accuracy: item.accuracy,
    consistency: item.consistency,
    completionTime: item.completionTime,
    date: item.date
  })),
  validationSeals: candidate.validationSeals.map((seal) => ({
    companyName: seal.companyName,
    validatedSkills: seal.validatedSkills,
    sealIssuedAt: seal.sealIssuedAt,
    note: seal.note
  })),
  auditTrail: getCandidateAuditEvents(candidate, auditEvents).map((event) => ({
    action: event.action,
    actorRole: event.actorRole,
    summary: event.summary,
    createdAt: event.createdAt
  })),
  privacyNotice: candidate.privacyNotice
});

export const renderDudiSafeReportText = (payload: DudiSafeReportPayload) => [
  payload.title,
  `Generated: ${formatReportDate(payload.generatedAt)}`,
  `Candidate: ${payload.candidateCode}`,
  `Interest: ${payload.interest}`,
  `School segment: ${payload.schoolSegment}`,
  `Readiness score: ${payload.readinessScore}%`,
  `Consent: ${payload.consent.status}`,
  `Consent scopes: ${payload.consent.scopes.join(', ') || 'Tidak ada scope aktif'}`,
  `Consent summary: ${payload.consent.summary}`,
  `Skills: ${payload.skills.join(', ') || 'Belum ada skill publik'}`,
  `Accommodation needs: ${payload.accommodationNeeds.join(', ') || 'Belum ada akomodasi kerja'}`,
  `Evidence: ${payload.evidenceItems.map((item) => `${item.title} ${item.score}%`).join('; ') || 'Belum ada evidence'}`,
  `Validation seals: ${payload.validationSeals.map((seal) => `${seal.companyName}: ${seal.validatedSkills.join(', ')}`).join('; ') || 'Belum ada seal'}`,
  `Audit: ${payload.auditTrail.map((event) => `${event.action} ${formatReportDate(event.createdAt)}`).join('; ') || 'Belum ada audit publik'}`,
  `Privacy: ${payload.privacyNotice}`
].join('\n');

export const downloadDudiSafePortfolioPdf = async (
  candidate: DudiCandidateProfile,
  auditEvents: AuditEvent[] = []
) => {
  const payload = buildDudiSafeReportPayload(candidate, auditEvents);
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const maxWidth = pageWidth - margin * 2;
  let y = 18;

  const addSection = (title: string, lines: string[]) => {
    if (y > 250) {
      doc.addPage();
      y = 18;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    lines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, maxWidth);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 5 + 2;
    });
    y += 3;
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(payload.title, margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Generated: ${formatReportDate(payload.generatedAt)}`, margin, y);
  y += 10;

  addSection('Candidate Summary', [
    `Candidate code: ${payload.candidateCode}`,
    `Interest: ${payload.interest}`,
    `School segment: ${payload.schoolSegment}`,
    `Readiness score: ${payload.readinessScore}%`,
    payload.privacyNotice
  ]);

  addSection('Consent', [
    `Status: ${payload.consent.status}`,
    `Scopes: ${payload.consent.scopes.join(', ') || 'Tidak ada scope aktif'}`,
    `Updated: ${formatReportDate(payload.consent.updatedAt)}`,
    payload.consent.summary
  ]);

  addSection('Skills And Accommodation', [
    `Skills: ${payload.skills.join(', ') || 'Belum ada skill publik'}`,
    `Akomodasi kerja: ${payload.accommodationNeeds.join(', ') || 'Belum ada akomodasi kerja'}`
  ]);

  addSection('Evidence Simulasi', payload.evidenceItems.length
    ? payload.evidenceItems.map((item) =>
      `${item.title}: skor ${item.score}%, akurasi ${item.accuracy}%, konsistensi ${item.consistency}%, durasi ${item.completionTime} detik.`
    )
    : ['Belum ada evidence simulasi publik.']);

  addSection('Industry Validation Seal', payload.validationSeals.length
    ? payload.validationSeals.map((seal) =>
      `${seal.companyName} (${formatReportDate(seal.sealIssuedAt)}): ${seal.validatedSkills.join(', ')}. ${seal.note}`
    )
    : ['Belum ada Industry Validation Seal.']);

  addSection('Audit Trail Aman', payload.auditTrail.length
    ? payload.auditTrail.map((event) =>
      `${formatReportDate(event.createdAt)} - ${event.actorRole} - ${event.action}: ${event.summary}`
    )
    : ['Belum ada audit publik untuk kandidat ini.']);

  doc.save(payload.fileName);
  return payload;
};
