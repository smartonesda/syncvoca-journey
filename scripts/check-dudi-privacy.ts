import { INITIAL_CONSENTS, INITIAL_JOBS, INITIAL_PLACEMENTS, INITIAL_SESSIONS, INITIAL_STUDENTS, INITIAL_VALIDATIONS } from '../src/data';
import { createDudiCandidateProfiles, DUDI_RESTRICTED_FIELDS } from '../src/privacy';
import { buildDudiSafeReportPayload, renderDudiSafeReportText } from '../src/report';

const candidates = createDudiCandidateProfiles(
  INITIAL_STUDENTS,
  INITIAL_SESSIONS,
  INITIAL_VALIDATIONS,
  INITIAL_CONSENTS,
  INITIAL_JOBS
);

const serializedCandidates = JSON.stringify(candidates);
const serializedReports = candidates
  .map((candidate) => renderDudiSafeReportText(buildDudiSafeReportPayload(candidate)))
  .join('\n---REPORT---\n');
const serializedPlacementSurface = INITIAL_PLACEMENTS
  .map((placement) => [
    placement.candidateCode,
    placement.companyName,
    placement.jobTitle,
    placement.status,
    placement.note
  ].join(' '))
  .join('\n---PLACEMENT---\n');
const forbiddenValues = INITIAL_STUDENTS.flatMap((student) => [
  student.name,
  student.schoolName,
  student.supportProfile,
  student.bio,
  student.sensitiveData.medicalNotes,
  student.sensitiveData.guardianContact,
  student.sensitiveData.familyBackground,
  student.sensitiveData.privateNotes
]).concat(
  INITIAL_CONSENTS.flatMap((consent) => [
    consent.requestedBy,
    consent.approvedBy || '',
    consent.validUntil || ''
  ])
).filter(Boolean);

const combinedPublicSurface = `${serializedCandidates}\n${serializedReports}\n${serializedPlacementSurface}`;
const leakedValues = forbiddenValues.filter((value) => combinedPublicSurface.includes(value));
const leakedKeys = DUDI_RESTRICTED_FIELDS.filter((field) => combinedPublicSurface.includes(`"${field}"`));

if (leakedValues.length > 0 || leakedKeys.length > 0) {
  console.error('DUDI privacy check failed.');
  console.error(JSON.stringify({ leakedValues, leakedKeys }, null, 2));
  process.exit(1);
}

console.log(`DUDI privacy check passed for ${candidates.length} public candidate profiles.`);
