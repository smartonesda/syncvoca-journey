# Panduan Backend Production

Dokumen ini menjadi panduan tim backend saat membangun SyncVoca Journey real apps. Backend harus menjadi sumber kebenaran untuk auth, role access, consent, audit, privacy boundary, storage, report, dan workflow DUDI.

## Keputusan Utama

1. Backend production wajib sebelum pilot data real ABK.
2. Backend harus menolak akses yang tidak berhak, bukan hanya mengandalkan UI.
3. DUDI tidak boleh menerima data siswa penuh.
4. Consent, audit, validation, placement, dan report harus diproses di server.
5. Semua event penting harus masuk audit log.
6. File evidence dan report harus memakai object storage, bukan local file random.

## Stack Rekomendasi

Pilihan utama:

- TypeScript
- NestJS atau Express modular
- PostgreSQL
- Prisma ORM
- Zod atau class-validator
- JWT access token + refresh token rotation
- Redis untuk queue/cache/rate limit jika diperlukan
- Object storage: Supabase Storage, S3, R2, atau GCS
- Background job: BullMQ, Cloud Tasks, atau queue sesuai deployment

Rekomendasi praktis:

- Gunakan NestJS jika tim ingin struktur module, guard, pipe, dan DI yang rapi.
- Gunakan Express modular jika tim ingin lebih ringan, tetapi tetap wajib disiplin folder, service, policy, dan test.

## Struktur Backend

```text
apps/api/
  src/
    main.ts
    config/
    common/
      errors/
      guards/
      policies/
      middleware/
      pagination/
    modules/
      auth/
      users/
      organizations/
      schools/
      students/
      guardians/
      teachers/
      dudi/
      jobs/
      simulations/
      evidence/
      portfolio/
      consent/
      validations/
      placements/
      reports/
      audit/
      notifications/
      files/
    jobs/
    workers/
    tests/
```

## Core Module

### Auth Module

Tanggung jawab:

- login
- logout
- refresh token
- invite user
- accept invite
- reset password
- session management
- active role context

Endpoint minimum:

```text
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
POST /auth/invite
POST /auth/accept-invite
POST /auth/forgot-password
POST /auth/reset-password
```

### Users And Roles Module

Tanggung jawab:

- user profile
- membership organization
- role assignment
- active tenant
- deactivate user

Rule:

- satu user bisa punya beberapa membership
- role harus terikat ke organization/school/company context
- tidak boleh hardcode role hanya dari kolom tunggal di users

### Organizations Module

Tanggung jawab:

- tenant root
- plan/subscription status jika nanti dibutuhkan
- organization type: platform, school, dudi, government, partner

### Schools Module

Tanggung jawab:

- data sekolah
- guru
- siswa
- kelas/program
- setting sekolah

### Students Module

Tanggung jawab:

- student profile internal
- support profile
- readiness summary
- assigned teachers
- sensitive record boundary

Rule:

- endpoint internal siswa hanya untuk role sekolah yang berhak
- endpoint DUDI tidak boleh memakai response dari module ini secara langsung

### Consent Module

Tanggung jawab:

- request consent
- approve consent
- revoke consent
- consent scope
- consent history
- expiry jika dibutuhkan

Consent scope awal:

```text
portfolio-sharing
work-accommodation-sharing
industry-validation
placement-follow-up
report-export
```

### Evidence And Portfolio Module

Tanggung jawab:

- evidence dari simulasi
- upload file
- kurasi evidence
- portfolio item
- public portfolio summary

Rule:

- tidak semua evidence otomatis boleh dilihat DUDI
- evidence perlu status publik/internal
- file evidence perlu permission check sebelum download

### DUDI Module

Tanggung jawab:

- company profile
- DUDI users
- candidate public listing
- candidate public detail
- industry validation
- jobs
- placement pipeline

Rule utama:

- DUDI hanya boleh membaca `DudiCandidatePublicDto`
- public candidate harus dibuat server-side dari policy dan consent
- nama siswa, sekolah spesifik, kontak wali, catatan medis, dan catatan guru internal tidak boleh ikut response

### Reports Module

Tanggung jawab:

- generate DUDI-safe report
- generate internal school report
- report audit
- download report dengan permission

Rule:

- DUDI-safe report dibuat dari public candidate payload
- internal report boleh berisi data lebih lengkap sesuai role sekolah
- report export harus mencatat audit event

### Audit Module

Tanggung jawab:

- mencatat event penting
- menyimpan actor, action, target, metadata aman, IP, user agent
- menyediakan query audit untuk Admin
- menyediakan audit surface aman untuk DUDI bila perlu

Audit event awal:

```text
user_login
user_logout
consent_requested
consent_approved
consent_revoked
candidate_public_profile_viewed
industry_validation_issued
industry_validation_blocked
dudi_safe_report_exported
candidate_shortlisted
placement_shortlist_blocked
placement_status_updated
teacher_note_created
file_uploaded
file_downloaded
role_assigned
role_revoked
```

## Request Flow

Setiap request penting harus melewati:

1. Auth guard.
2. Tenant resolver.
3. Role resolver.
4. Policy check.
5. DTO validation.
6. Service transaction.
7. Audit event jika action penting.
8. Response serializer.

Contoh DUDI candidate detail:

```text
GET /dudi/candidates/:candidateCode
  -> auth guard
  -> role must be dudi_admin or dudi_reviewer
  -> company membership check
  -> candidate visibility policy
  -> consent scope check
  -> build DudiCandidatePublicDto
  -> audit candidate_public_profile_viewed
  -> return safe DTO
```

## Policy Service

Backend perlu policy service terpusat.

Contoh function:

```text
canReadStudentInternal(user, studentId)
canManageConsent(user, studentId)
canViewDudiCandidate(user, candidateCode)
canIssueIndustryValidation(user, candidateCode)
canShortlistCandidate(user, candidateCode, jobId)
canReadAuditLog(user, organizationId)
canDownloadFile(user, fileId)
```

Policy harus mempertimbangkan:

- role
- organization/tenant
- school relation
- student-teacher assignment
- guardian relation
- DUDI company membership
- consent scope
- resource status

## DTO Boundary

Backend harus membedakan DTO internal dan publik.

Contoh:

```text
StudentInternalDto
StudentSupportProfileDto
StudentSensitiveRecordDto
StudentProgressDto
DudiCandidatePublicDto
DudiCandidateReportDto
TeacherNoteInternalDto
AuditLogAdminDto
AuditLogPublicDto
```

Rule:

- jangan mengembalikan raw Prisma model langsung ke client
- gunakan serializer/mapper
- response DUDI harus deny-by-default untuk field
- field baru tidak otomatis ikut DUDI response

## File And Storage

Jenis file:

- evidence image/video/document
- portfolio artifact
- report PDF
- consent document jika ada

Rule:

- simpan metadata file di database
- simpan binary di object storage
- akses file memakai signed URL pendek atau proxy backend
- file privat tidak boleh public bucket
- download evidence DUDI harus melewati public candidate policy
- upload harus dibatasi ukuran dan tipe file

## Report Generation

DUDI-safe report:

- input: `DudiCandidatePublicDto`
- output: PDF aman
- audit: `dudi_safe_report_exported`
- storage: object storage atau streaming response

Internal school report:

- input: student internal data sesuai role
- output: PDF internal
- audit: `school_internal_report_exported`

## Notifications

Channel awal:

- in-app notification
- email optional
- WhatsApp optional fase lanjutan

Event yang perlu notifikasi:

- invite user
- consent request
- consent approved/revoked
- teacher note for parent
- DUDI validation issued
- candidate shortlisted
- placement status changed

## Error Format

Gunakan error response konsisten:

```json
{
  "error": {
    "code": "CONSENT_REQUIRED",
    "message": "Persetujuan industri belum aktif.",
    "details": {
      "requiredScope": "industry-validation"
    }
  }
}
```

Contoh error code:

```text
UNAUTHENTICATED
FORBIDDEN
ROLE_NOT_ALLOWED
TENANT_NOT_FOUND
CONSENT_REQUIRED
VALIDATION_ERROR
RESOURCE_NOT_FOUND
RATE_LIMITED
FILE_TOO_LARGE
```

## Security Baseline

Minimum:

- password hash dengan Argon2 atau bcrypt
- refresh token rotation
- httpOnly cookie jika memakai cookie session
- CSRF protection jika cookie-based
- rate limit login dan refresh
- request validation
- output serialization
- audit log untuk action penting
- no raw stack trace di production
- secure headers
- CORS explicit
- secret dari environment

## Testing Backend

Minimum:

- unit test policy service
- unit test DTO mapper DUDI
- integration test auth
- integration test consent
- integration test DUDI candidate endpoint
- integration test report export
- integration test placement workflow
- audit log test

Privacy test wajib:

- DUDI candidate response tidak memuat nama siswa
- DUDI candidate response tidak memuat sekolah spesifik
- DUDI candidate response tidak memuat kontak wali
- DUDI candidate response tidak memuat catatan medis
- DUDI report tidak memuat field privat
- DUDI tidak bisa mengakses endpoint siswa internal

## Deployment Backend

Environment:

- development
- staging
- production

Production requirement:

- managed PostgreSQL
- backup database
- object storage private
- logging
- metrics
- error monitoring
- migration pipeline
- seed controlled
- health check

Health endpoint:

```text
GET /health
GET /health/db
```

## Deliverable Backend MVP

Backend MVP dianggap siap pilot jika:

- auth real berjalan
- role membership berjalan
- student internal endpoint aman
- DUDI public candidate endpoint aman
- consent gate berjalan
- audit log berjalan
- evidence upload minimal berjalan
- report DUDI aman bisa dibuat
- placement workflow berjalan
- privacy test backend lulus
- API contract terdokumentasi
