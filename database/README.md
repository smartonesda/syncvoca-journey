# Panduan Database Production

Dokumen ini menjadi panduan schema database SyncVoca Journey real apps. Database harus mendukung multi-role, sekolah, DUDI, consent, audit, evidence, validation, placement, dan privacy boundary.

## Keputusan Utama

1. Gunakan PostgreSQL untuk semua environment real apps: production, staging, local dev, dan integration test.
2. Gunakan Prisma atau migration tool setara agar schema versioned.
3. Pisahkan data internal siswa dari data publik DUDI.
4. Sensitive record tidak boleh tercampur dengan public candidate data.
5. Consent dan audit harus menjadi entity utama, bukan field tempelan.
6. Semua table penting perlu `createdAt`, `updatedAt`, dan soft delete jika relevan.
7. Local development menjalankan PostgreSQL via Docker.
8. SQLite tidak dipakai agar schema, migration, constraint, dan query behavior tidak bercabang.

## Dokumen Teknis

- `docs/database/ERD.md`: ERD, normalisasi, tabel, relasi, index, migration order, privacy guardrail, dan setup PostgreSQL lokal via Docker.

## Prinsip Schema

- Tenant-aware: data sekolah dan DUDI harus jelas organization-nya.
- Relationship-based access: akses guru, orang tua, dan DUDI ditentukan relasi, bukan role global saja.
- Data minimization: field privat tidak berada di table yang dipakai DUDI.
- Audit-ready: action penting punya target dan metadata aman.
- Migration-friendly: schema bisa berkembang tanpa rewrite besar.
- Report-safe: data untuk report DUDI bisa diambil dari DTO publik yang jelas.

## Kelompok Data

```text
Identity:
  users
  roles
  user_memberships
  sessions
  invites

Tenant:
  organizations
  schools
  dudi_companies

Student:
  students
  student_support_profiles
  student_sensitive_records
  guardians
  student_guardians
  teacher_student_assignments

Learning/Journey:
  skills
  student_skills
  mission_templates
  simulation_sessions
  evidence_items
  portfolio_items

Consent/Privacy:
  student_consents
  consent_scopes
  candidate_public_profiles

DUDI:
  jobs
  job_required_skills
  job_accommodation_supports
  industry_validations
  industry_validation_skills
  placements
  placement_events

Governance:
  teacher_notes
  reports
  audit_logs
  notifications
  files
```

## Core Tables

### organizations

Fungsi: root tenant.

Kolom utama:

- `id`
- `name`
- `type`: `platform`, `school`, `dudi`, `government`, `partner`
- `status`: `active`, `inactive`, `trial`
- `createdAt`
- `updatedAt`

### users

Fungsi: identitas login.

Kolom utama:

- `id`
- `email`
- `phone`
- `passwordHash`
- `displayName`
- `avatarFileId`
- `status`
- `lastLoginAt`
- `createdAt`
- `updatedAt`

Catatan:

- jangan taruh role utama langsung di users
- role harus lewat membership

### roles

Fungsi: daftar role sistem.

Seed awal:

- `super_admin`
- `school_admin`
- `teacher`
- `student`
- `parent`
- `dudi_admin`
- `dudi_reviewer`
- `job_coach`
- `auditor`

### user_memberships

Fungsi: relasi user dengan organization dan role.

Kolom utama:

- `id`
- `userId`
- `organizationId`
- `roleId`
- `schoolId`
- `dudiCompanyId`
- `status`
- `createdAt`
- `updatedAt`

Rule:

- `schoolId` diisi untuk role sekolah
- `dudiCompanyId` diisi untuk role DUDI
- satu user bisa punya lebih dari satu membership

### schools

Fungsi: data sekolah.

Kolom utama:

- `id`
- `organizationId`
- `name`
- `type`: `slb`, `inclusive_school`, `vocational_school`, `other`
- `city`
- `province`
- `status`

### dudi_companies

Fungsi: data perusahaan/mitra DUDI.

Kolom utama:

- `id`
- `organizationId`
- `name`
- `industry`
- `city`
- `contactEmail`
- `status`

## Student Tables

### students

Fungsi: profil siswa internal.

Kolom utama:

- `id`
- `schoolId`
- `userId`
- `fullName`
- `nickname`
- `studentCode`
- `birthDate`
- `gradeLevel`
- `program`
- `status`
- `createdAt`
- `updatedAt`

Rule:

- `fullName` tidak boleh keluar ke DUDI.
- DUDI memakai candidate code, bukan studentCode internal.

### student_support_profiles

Fungsi: profil dukungan dan akomodasi.

Kolom utama:

- `id`
- `studentId`
- `supportCategory`
- `supportNeeds`
- `accessibilityNeeds`
- `learningPreferences`
- `workAccommodationSummary`
- `publicAccommodationSummary`
- `updatedByUserId`

Rule:

- `supportNeeds` internal.
- `publicAccommodationSummary` boleh dipakai untuk DUDI jika consent aktif.

### student_sensitive_records

Fungsi: catatan sensitif.

Kolom utama:

- `id`
- `studentId`
- `medicalNotes`
- `familyBackground`
- `privateNotes`
- `guardianContactSnapshot`
- `createdByUserId`
- `updatedByUserId`

Rule:

- table ini tidak boleh join ke DUDI query.
- endpoint DUDI tidak boleh select table ini.

### guardians

Fungsi: data wali/orang tua.

Kolom utama:

- `id`
- `userId`
- `fullName`
- `phone`
- `email`
- `relationship`

### student_guardians

Fungsi: relasi siswa dan wali.

Kolom utama:

- `id`
- `studentId`
- `guardianId`
- `isPrimary`
- `canApproveConsent`

### teacher_student_assignments

Fungsi: relasi guru dan siswa.

Kolom utama:

- `id`
- `teacherUserId`
- `studentId`
- `schoolId`
- `assignmentType`
- `status`

Rule:

- guru hanya boleh akses siswa yang terhubung lewat sekolah atau assignment.

## Journey Tables

### skills

Fungsi: master skill.

Kolom utama:

- `id`
- `name`
- `category`
- `description`
- `isPublicForDudi`

### student_skills

Fungsi: progress skill siswa.

Kolom utama:

- `id`
- `studentId`
- `skillId`
- `level`
- `confidenceScore`
- `evidenceCount`
- `lastAssessedAt`

### mission_templates

Fungsi: template simulasi/latihan.

Kolom utama:

- `id`
- `title`
- `vocationalArea`
- `difficulty`
- `instructions`
- `accessibilityOptions`
- `status`

### simulation_sessions

Fungsi: sesi siswa menjalankan simulasi.

Kolom utama:

- `id`
- `studentId`
- `missionTemplateId`
- `status`
- `score`
- `startedAt`
- `completedAt`
- `teacherReviewStatus`

### evidence_items

Fungsi: bukti kerja.

Kolom utama:

- `id`
- `studentId`
- `simulationSessionId`
- `title`
- `description`
- `fileId`
- `visibility`: `internal`, `portfolio`, `dudi_public`
- `curationStatus`: `draft`, `approved`, `rejected`
- `approvedByUserId`
- `approvedAt`

Rule:

- hanya evidence `visibility = dudi_public` dan `curationStatus = approved` yang boleh masuk DUDI.

### portfolio_items

Fungsi: item portofolio siswa.

Kolom utama:

- `id`
- `studentId`
- `evidenceItemId`
- `title`
- `summary`
- `visibility`
- `order`

## Consent And Privacy Tables

### student_consents

Fungsi: status persetujuan siswa/wali/sekolah.

Kolom utama:

- `id`
- `studentId`
- `status`: `missing`, `requested`, `approved`, `revoked`, `expired`
- `requestedByUserId`
- `approvedByUserId`
- `approvedAt`
- `revokedAt`
- `expiresAt`
- `notes`

### consent_scopes

Fungsi: scope spesifik dari consent.

Kolom utama:

- `id`
- `consentId`
- `scope`

Scope awal:

- `portfolio-sharing`
- `work-accommodation-sharing`
- `industry-validation`
- `placement-follow-up`
- `report-export`

### candidate_public_profiles

Fungsi: materialized public candidate profile untuk DUDI jika dibutuhkan.

Kolom utama:

- `id`
- `studentId`
- `candidateCode`
- `schoolSegment`
- `vocationalInterests`
- `readinessScore`
- `publicAccommodationSummary`
- `publicSkillSummary`
- `status`
- `lastGeneratedAt`

Catatan:

- Bisa dibuat on-demand dari service, atau disimpan sebagai cache/materialized view.
- Jangan menyimpan data privat di table ini.

## DUDI Tables

### jobs

Fungsi: lowongan/posisi DUDI.

Kolom utama:

- `id`
- `dudiCompanyId`
- `title`
- `description`
- `workMode`
- `location`
- `status`

### job_required_skills

Fungsi: skill yang dibutuhkan job.

Kolom utama:

- `id`
- `jobId`
- `skillId`
- `requiredLevel`

### job_accommodation_supports

Fungsi: dukungan kerja yang tersedia dari DUDI.

Kolom utama:

- `id`
- `jobId`
- `supportType`
- `description`

### industry_validations

Fungsi: validation seal dari DUDI.

Kolom utama:

- `id`
- `studentId`
- `candidateCode`
- `dudiCompanyId`
- `validatedByUserId`
- `status`
- `summary`
- `issuedAt`

Rule:

- wajib consent `industry-validation`.

### industry_validation_skills

Fungsi: skill yang divalidasi oleh DUDI.

Kolom utama:

- `id`
- `industryValidationId`
- `skillId`
- `level`
- `notes`

### placements

Fungsi: pipeline kandidat ke job.

Kolom utama:

- `id`
- `studentId`
- `candidateCode`
- `jobId`
- `dudiCompanyId`
- `status`: `shortlisted`, `interview`, `work_trial`, `placed`, `not_ready`
- `createdByUserId`
- `updatedAt`

Rule:

- wajib consent `industry-validation` minimal untuk shortlist.
- DUDI response tetap memakai candidateCode.

### placement_events

Fungsi: riwayat status placement.

Kolom utama:

- `id`
- `placementId`
- `fromStatus`
- `toStatus`
- `notes`
- `createdByUserId`
- `createdAt`

## Governance Tables

### teacher_notes

Fungsi: catatan internal guru.

Kolom utama:

- `id`
- `studentId`
- `teacherUserId`
- `category`
- `content`
- `visibility`: `internal`, `parent_visible`
- `createdAt`

Rule:

- tidak boleh muncul di DUDI.

### files

Fungsi: metadata file object storage.

Kolom utama:

- `id`
- `ownerType`
- `ownerId`
- `bucket`
- `objectKey`
- `mimeType`
- `sizeBytes`
- `visibility`
- `uploadedByUserId`
- `createdAt`

### reports

Fungsi: riwayat report/export.

Kolom utama:

- `id`
- `type`: `dudi_safe`, `school_internal`, `admin_summary`
- `targetType`
- `targetId`
- `fileId`
- `generatedByUserId`
- `generatedAt`

### audit_logs

Fungsi: immutable event log.

Kolom utama:

- `id`
- `organizationId`
- `actorUserId`
- `actorRole`
- `action`
- `targetType`
- `targetId`
- `safeSummary`
- `metadataJson`
- `ipAddress`
- `userAgent`
- `createdAt`

Rule:

- metadata untuk DUDI-safe event tidak boleh berisi data privat.
- audit log sebaiknya append-only.

### notifications

Fungsi: notifikasi in-app.

Kolom utama:

- `id`
- `recipientUserId`
- `type`
- `title`
- `body`
- `readAt`
- `createdAt`

## Enum Awal

```text
OrganizationType:
  platform
  school
  dudi
  government
  partner

RoleCode:
  super_admin
  school_admin
  teacher
  student
  parent
  dudi_admin
  dudi_reviewer
  job_coach
  auditor

ConsentStatus:
  missing
  requested
  approved
  revoked
  expired

EvidenceVisibility:
  internal
  portfolio
  dudi_public

CurationStatus:
  draft
  approved
  rejected

PlacementStatus:
  shortlisted
  interview
  work_trial
  placed
  not_ready
```

## Index Rekomendasi

Minimum:

```text
users.email unique
user_memberships.userId
user_memberships.organizationId
user_memberships.schoolId
user_memberships.dudiCompanyId
students.schoolId
students.studentCode unique per school
student_guardians.studentId
student_guardians.guardianId
teacher_student_assignments.teacherUserId
teacher_student_assignments.studentId
student_consents.studentId
consent_scopes.consentId
candidate_public_profiles.candidateCode unique
evidence_items.studentId
evidence_items.visibility
industry_validations.candidateCode
placements.candidateCode
placements.jobId
audit_logs.organizationId
audit_logs.actorUserId
audit_logs.targetType,targetId
audit_logs.createdAt
```

## Migration Order

Urutan migration awal:

1. organizations
2. roles
3. users
4. user_memberships
5. schools
6. dudi_companies
7. students
8. guardians dan student_guardians
9. teacher_student_assignments
10. support dan sensitive records
11. skills dan mission templates
12. simulation sessions
13. files
14. evidence dan portfolio
15. consent dan scopes
16. jobs dan job skill/support
17. validations
18. placements
19. teacher notes
20. reports
21. audit logs
22. notifications

## Seed Data Awal

Seed minimal untuk staging:

- 1 platform admin
- 1 sekolah SLB/sekolah inklusi
- 2 guru
- 3 siswa dummy ABK
- 3 wali dummy
- 1 DUDI company
- 2 user DUDI
- 5 skill
- 3 mission template
- 3 evidence curated
- consent dengan status approved, requested, revoked
- 1 job DUDI
- 1 validation issued
- 1 placement pipeline

Seed tidak boleh memakai data anak asli.

## Data Classification

| Kelas Data | Contoh | Akses |
| --- | --- | --- |
| Public app | landing content | semua |
| Internal school | nama siswa, progres, catatan guru | sekolah terkait |
| Parent scoped | progress anak, dukungan rumah | wali terkait |
| DUDI public | candidate code, skill, evidence curated | DUDI berizin |
| Sensitive | catatan medis, keluarga, kontak wali | sangat terbatas |
| Audit | event, actor, target, safe summary | admin/auditor |

## Rule Anti Bocor DUDI

Endpoint DUDI tidak boleh melakukan select terhadap:

- `students.fullName`
- `schools.name`
- `guardians.phone`
- `guardians.email`
- `student_sensitive_records.*`
- `teacher_notes.content`

Jika butuh data turunan untuk DUDI, buat mapper di backend:

```text
StudentInternal -> DudiCandidatePublicDto
```

Mapper harus deny-by-default.

## Deliverable Database MVP

Database MVP dianggap siap jika:

- schema identity, role, school, DUDI, student, consent, evidence, validation, placement, audit sudah ada
- migration bisa dijalankan dari nol
- seed staging tersedia
- relation untuk guru, wali, dan DUDI jelas
- field privat terpisah dari public candidate
- index utama tersedia
- schema sudah direview oleh FE dan BE sebelum coding besar
