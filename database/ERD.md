# ERD Dan Normalisasi Database SyncVoca Journey

Dokumen ini menjadi rancangan teknis database untuk real apps SyncVoca Journey. Fokusnya adalah PostgreSQL untuk semua environment, normalisasi, relasi data, privacy boundary DUDI, consent, audit, dan migration order.

## Keputusan Database

### Production

Gunakan PostgreSQL untuk production.

Alasan:

- cocok untuk relational data yang kuat
- mendukung constraint, transaction, index, JSONB, full text search, dan audit query
- cocok untuk multi-role dan multi-tenant access
- lebih aman untuk data sensitif ABK dibanding penyimpanan lokal/prototype
- mudah dipakai bersama Prisma, NestJS/Express, dan deployment managed database

### Staging

Gunakan PostgreSQL juga untuk staging.

Staging harus semirip mungkin dengan production agar:

- migration diuji di engine yang sama
- query performance bisa dicek lebih realistis
- behavior constraint dan transaction tidak berbeda
- privacy test DUDI memakai behavior database yang sama

### Local Development

Gunakan PostgreSQL lokal via Docker.

Keputusan praktis:

| Environment | Database | Status |
| --- | --- | --- |
| production | PostgreSQL managed | wajib |
| staging | PostgreSQL managed atau Docker server | wajib |
| local dev | PostgreSQL Docker/local | wajib |
| integration test | PostgreSQL Docker/test database | wajib |
| unit test service | mocked repository atau PostgreSQL test database | wajib konsisten |
| prototype apps repo `v2` | localStorage | hanya demo |

Kenapa local dev juga PostgreSQL:

- behavior constraint, transaction, index, JSONB, dan concurrency sama dengan production
- query join dan performance lebih realistis
- PostgreSQL punya fitur yang kemungkinan dibutuhkan: JSONB, partial index, text search, transaction isolation, dan row-level pattern yang lebih matang.
- bug permission, query, migration, dan data integrity bisa terlihat sejak development
- tim tidak perlu memelihara dua mode schema

Kesimpulan:

- Production: PostgreSQL.
- Staging: PostgreSQL.
- Local dev: PostgreSQL via Docker.
- Test integration: PostgreSQL test database.
- SQLite tidak dipakai untuk real apps SyncVoca agar schema dan behavior tidak bercabang.

## Normalisasi Database

Target normalisasi: minimal 3NF untuk data utama.

Artinya:

1. Setiap tabel punya primary key yang stabil.
2. Setiap kolom menyimpan satu nilai atomik, bukan CSV atau string gabungan.
3. Data berulang dipisah ke tabel relasi.
4. Many-to-many selalu memakai junction table.
5. Data sensitif dipisah dari data publik.
6. Data turunan boleh dibuat cache/materialized, tetapi bukan source of truth.

## Aturan Normalisasi

### Jangan Simpan Array Untuk Relasi Penting

Hindari:

```text
students.skillIds = "skill-1,skill-2"
jobs.requiredSkills = ["skill-1", "skill-2"]
consents.scopes = "portfolio-sharing,industry-validation"
```

Gunakan tabel relasi:

```text
student_skills
job_required_skills
consent_scopes
```

### Pisahkan Data Internal Dan Public DUDI

Data internal:

```text
students
student_support_profiles
student_sensitive_records
teacher_notes
guardians
```

Data DUDI public:

```text
candidate_public_profiles
evidence_items dengan visibility = dudi_public
industry_validations
placements dengan candidateCode
```

DUDI tidak boleh query langsung ke sensitive table.

### Gunakan JSONB Hanya Untuk Metadata Fleksibel

JSONB boleh untuk:

- audit metadata aman
- accessibility options template
- report generation snapshot aman
- UI preference non-sensitif

JSONB tidak boleh untuk:

- role
- permission
- consent scope
- skill relation
- guardian relation
- placement status
- data yang sering difilter dan butuh constraint

### Denormalisasi Yang Boleh

Denormalisasi boleh jika sengaja sebagai cache, misalnya:

```text
candidate_public_profiles
```

Tetapi:

- field harus aman untuk DUDI
- regenerasi dari service backend
- bukan sumber kebenaran data siswa
- tidak boleh menyimpan data sensitif
- punya `lastGeneratedAt`

## Naming Convention

Database table: snake_case plural.

Contoh:

```text
user_memberships
student_support_profiles
candidate_public_profiles
industry_validations
```

Kolom database: snake_case jika memakai SQL langsung.

Jika memakai Prisma:

- model bisa PascalCase
- field bisa camelCase
- mapping ke table/column snake_case memakai `@@map` dan `@map` jika diperlukan

ID:

- gunakan UUID untuk production
- PostgreSQL extension: `pgcrypto`
- default: `gen_random_uuid()` atau Prisma `uuid()`

Timestamp:

- `createdAt`
- `updatedAt`
- `deletedAt` optional untuk soft delete

Status:

- gunakan enum atau lookup table sesuai kebutuhan
- untuk status yang stabil, enum cukup
- untuk master data yang berubah oleh admin, gunakan table

## ERD Ringkas

```mermaid
erDiagram
  organizations ||--o{ user_memberships : has
  organizations ||--o{ schools : owns
  organizations ||--o{ dudi_companies : owns
  organizations ||--o{ audit_logs : scopes

  users ||--o{ user_memberships : joins
  roles ||--o{ user_memberships : grants
  users ||--o{ sessions : has
  users ||--o{ invites : receives

  schools ||--o{ students : has
  schools ||--o{ teacher_student_assignments : scopes
  dudi_companies ||--o{ jobs : posts
  dudi_companies ||--o{ industry_validations : issues
  dudi_companies ||--o{ placements : manages

  users ||--o| students : login_profile
  users ||--o| guardians : login_profile

  students ||--o| student_support_profiles : has
  students ||--o| student_sensitive_records : has
  students ||--o{ student_guardians : has
  guardians ||--o{ student_guardians : cares_for
  users ||--o{ teacher_student_assignments : assigned_teacher
  students ||--o{ teacher_student_assignments : assigned_student

  skills ||--o{ student_skills : assessed
  students ||--o{ student_skills : owns
  mission_templates ||--o{ simulation_sessions : used_by
  students ||--o{ simulation_sessions : performs
  simulation_sessions ||--o{ evidence_items : produces
  students ||--o{ evidence_items : owns
  evidence_items ||--o{ portfolio_items : curated_as

  students ||--o{ student_consents : has
  student_consents ||--o{ consent_scopes : scopes
  students ||--o{ candidate_public_profiles : exposes

  jobs ||--o{ job_required_skills : requires
  skills ||--o{ job_required_skills : required_by
  jobs ||--o{ job_accommodation_supports : supports

  students ||--o{ industry_validations : validated
  industry_validations ||--o{ industry_validation_skills : validates
  skills ||--o{ industry_validation_skills : included

  jobs ||--o{ placements : receives
  students ||--o{ placements : candidate
  placements ||--o{ placement_events : history

  students ||--o{ teacher_notes : receives
  users ||--o{ teacher_notes : writes
  files ||--o{ evidence_items : attached
  files ||--o{ reports : output
```

## Tabel Identity

### organizations

Fungsi: tenant root untuk platform, sekolah, DUDI, pemerintah, atau partner.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| name | text | not null |
| type | organization_type | not null |
| status | organization_status | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Index:

- `organizations(type)`
- `organizations(status)`

### users

Fungsi: akun login.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| email | citext | unique, nullable jika phone login dipakai |
| phone | text | unique nullable |
| password_hash | text | nullable untuk SSO/invite pending |
| display_name | text | not null |
| avatar_file_id | uuid | fk files.id nullable |
| status | user_status | not null |
| last_login_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Constraint:

- minimal salah satu dari email atau phone harus ada
- email lowercase/citext agar unique case-insensitive

### roles

Fungsi: master role.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| code | role_code | unique |
| name | text | not null |
| description | text | nullable |

Seed:

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

Fungsi: relasi user, organization, dan role.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| user_id | uuid | fk users.id |
| organization_id | uuid | fk organizations.id |
| role_id | uuid | fk roles.id |
| school_id | uuid | fk schools.id nullable |
| dudi_company_id | uuid | fk dudi_companies.id nullable |
| status | membership_status | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Constraint:

- unique active membership per `user_id`, `organization_id`, `role_id`, `school_id`, `dudi_company_id`
- role sekolah harus punya `school_id`
- role DUDI harus punya `dudi_company_id`

### sessions

Fungsi: refresh session dan revoke session.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| user_id | uuid | fk users.id |
| refresh_token_hash | text | not null |
| user_agent | text | nullable |
| ip_address | inet | nullable |
| expires_at | timestamptz | not null |
| revoked_at | timestamptz | nullable |
| created_at | timestamptz | not null |

Index:

- `sessions(user_id)`
- `sessions(expires_at)`

### invites

Fungsi: undangan user dan membership.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| email | citext | not null |
| token_hash | text | unique |
| organization_id | uuid | fk organizations.id |
| role_id | uuid | fk roles.id |
| school_id | uuid | fk schools.id nullable |
| dudi_company_id | uuid | fk dudi_companies.id nullable |
| invited_by_user_id | uuid | fk users.id |
| accepted_by_user_id | uuid | fk users.id nullable |
| expires_at | timestamptz | not null |
| accepted_at | timestamptz | nullable |
| created_at | timestamptz | not null |

## Tabel Tenant

### schools

Fungsi: data sekolah.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| organization_id | uuid | fk organizations.id |
| name | text | not null |
| type | school_type | not null |
| city | text | nullable |
| province | text | nullable |
| status | school_status | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

### dudi_companies

Fungsi: perusahaan/mitra DUDI.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| organization_id | uuid | fk organizations.id |
| name | text | not null |
| industry | text | nullable |
| city | text | nullable |
| contact_email | citext | nullable |
| status | dudi_company_status | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

## Tabel Student

### students

Fungsi: data siswa internal.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| school_id | uuid | fk schools.id |
| user_id | uuid | fk users.id nullable |
| full_name | text | not null |
| nickname | text | nullable |
| student_code | text | not null |
| birth_date | date | nullable |
| grade_level | text | nullable |
| program | text | nullable |
| status | student_status | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Constraint:

- unique `school_id`, `student_code`
- `full_name` tidak boleh keluar ke response DUDI

### student_support_profiles

Fungsi: profil dukungan dan akomodasi.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id unique |
| support_category | text | nullable |
| support_needs | text | nullable internal |
| accessibility_needs | text | nullable internal |
| learning_preferences | text | nullable internal |
| work_accommodation_summary | text | nullable internal |
| public_accommodation_summary | text | nullable safe for DUDI if consent |
| updated_by_user_id | uuid | fk users.id nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Normalisasi:

- Untuk MVP, ringkasan teks masih boleh.
- Jika support/accommodation butuh filter detail, pecah ke `support_needs` master dan junction table di fase berikutnya.

### student_sensitive_records

Fungsi: data sensitif siswa.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id unique |
| medical_notes | text | nullable sensitive |
| family_background | text | nullable sensitive |
| private_notes | text | nullable sensitive |
| guardian_contact_snapshot | jsonb | nullable sensitive |
| created_by_user_id | uuid | fk users.id |
| updated_by_user_id | uuid | fk users.id nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Rule:

- tidak boleh di-select oleh endpoint DUDI
- akses harus mencatat audit `sensitive_record_accessed`

### guardians

Fungsi: data wali/orang tua.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| user_id | uuid | fk users.id nullable |
| full_name | text | not null |
| phone | text | nullable |
| email | citext | nullable |
| relationship | guardian_relationship | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

### student_guardians

Fungsi: relasi many-to-many siswa dan wali.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| guardian_id | uuid | fk guardians.id |
| is_primary | boolean | not null default false |
| can_approve_consent | boolean | not null default false |
| created_at | timestamptz | not null |

Constraint:

- unique `student_id`, `guardian_id`

### teacher_student_assignments

Fungsi: relasi guru/pendamping dan siswa.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| teacher_user_id | uuid | fk users.id |
| student_id | uuid | fk students.id |
| school_id | uuid | fk schools.id |
| assignment_type | assignment_type | not null |
| status | assignment_status | not null |
| created_at | timestamptz | not null |

Constraint:

- unique active `teacher_user_id`, `student_id`, `assignment_type`

## Tabel Journey Dan Evidence

### skills

Fungsi: master skill vokasi.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| name | text | not null |
| category | text | not null |
| description | text | nullable |
| is_public_for_dudi | boolean | default false |
| created_at | timestamptz | not null |

### student_skills

Fungsi: skill yang dimiliki siswa.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| skill_id | uuid | fk skills.id |
| level | skill_level | not null |
| confidence_score | int | 0-100 |
| evidence_count | int | default 0 |
| last_assessed_at | timestamptz | nullable |

Constraint:

- unique `student_id`, `skill_id`

### mission_templates

Fungsi: template simulasi kerja.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| title | text | not null |
| vocational_area | text | not null |
| difficulty | mission_difficulty | not null |
| instructions | text | not null |
| accessibility_options | jsonb | nullable |
| status | template_status | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

### simulation_sessions

Fungsi: sesi simulasi siswa.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| mission_template_id | uuid | fk mission_templates.id |
| status | simulation_status | not null |
| score | int | nullable 0-100 |
| started_at | timestamptz | nullable |
| completed_at | timestamptz | nullable |
| teacher_review_status | review_status | not null |
| created_at | timestamptz | not null |

### files

Fungsi: metadata object storage.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| owner_type | file_owner_type | not null |
| owner_id | uuid | nullable |
| bucket | text | not null |
| object_key | text | not null |
| mime_type | text | not null |
| size_bytes | bigint | not null |
| visibility | file_visibility | not null |
| uploaded_by_user_id | uuid | fk users.id |
| created_at | timestamptz | not null |

Constraint:

- unique `bucket`, `object_key`

### evidence_items

Fungsi: bukti kerja siswa.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| simulation_session_id | uuid | fk simulation_sessions.id nullable |
| title | text | not null |
| description | text | nullable |
| file_id | uuid | fk files.id nullable |
| visibility | evidence_visibility | not null |
| curation_status | curation_status | not null |
| approved_by_user_id | uuid | fk users.id nullable |
| approved_at | timestamptz | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Rule:

- DUDI hanya boleh melihat evidence dengan `visibility = dudi_public` dan `curation_status = approved`.

### portfolio_items

Fungsi: item portofolio siswa.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| evidence_item_id | uuid | fk evidence_items.id nullable |
| title | text | not null |
| summary | text | nullable |
| visibility | portfolio_visibility | not null |
| sort_order | int | not null default 0 |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

## Tabel Consent Dan Privacy

### student_consents

Fungsi: consent utama untuk siswa.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| status | consent_status | not null |
| requested_by_user_id | uuid | fk users.id nullable |
| approved_by_user_id | uuid | fk users.id nullable |
| approved_at | timestamptz | nullable |
| revoked_at | timestamptz | nullable |
| expires_at | timestamptz | nullable |
| notes | text | nullable |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Rule:

- consent terbaru per siswa dibaca berdasarkan status aktif dan timestamp.
- histori consent tetap disimpan untuk audit.

### consent_scopes

Fungsi: scope detail dari consent.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| consent_id | uuid | fk student_consents.id |
| scope | consent_scope | not null |

Constraint:

- unique `consent_id`, `scope`

Scope awal:

- `portfolio-sharing`
- `work-accommodation-sharing`
- `industry-validation`
- `placement-follow-up`
- `report-export`

### candidate_public_profiles

Fungsi: cache/materialized public profile untuk DUDI.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| candidate_code | text | unique |
| school_segment | text | not null |
| vocational_interests | text | nullable |
| readiness_score | int | 0-100 |
| public_accommodation_summary | text | nullable |
| public_skill_summary | jsonb | nullable safe only |
| status | candidate_public_status | not null |
| last_generated_at | timestamptz | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Rule:

- tidak menyimpan nama siswa
- tidak menyimpan nama sekolah spesifik
- tidak menyimpan kontak wali
- tidak menyimpan catatan medis
- tidak menyimpan catatan guru internal

## Tabel DUDI

### jobs

Fungsi: lowongan/posisi DUDI.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| dudi_company_id | uuid | fk dudi_companies.id |
| title | text | not null |
| description | text | nullable |
| work_mode | work_mode | nullable |
| location | text | nullable |
| status | job_status | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

### job_required_skills

Fungsi: skill requirement job.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| job_id | uuid | fk jobs.id |
| skill_id | uuid | fk skills.id |
| required_level | skill_level | nullable |

Constraint:

- unique `job_id`, `skill_id`

### job_accommodation_supports

Fungsi: dukungan kerja yang disediakan DUDI.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| job_id | uuid | fk jobs.id |
| support_type | text | not null |
| description | text | nullable |

### industry_validations

Fungsi: validasi industri.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| candidate_code | text | not null |
| dudi_company_id | uuid | fk dudi_companies.id |
| validated_by_user_id | uuid | fk users.id |
| status | validation_status | not null |
| summary | text | nullable |
| issued_at | timestamptz | nullable |
| created_at | timestamptz | not null |

Rule:

- insert harus melewati consent `industry-validation`
- DUDI response memakai `candidate_code`, bukan nama siswa

### industry_validation_skills

Fungsi: skill yang divalidasi.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| industry_validation_id | uuid | fk industry_validations.id |
| skill_id | uuid | fk skills.id |
| level | skill_level | nullable |
| notes | text | nullable safe |

Constraint:

- unique `industry_validation_id`, `skill_id`

### placements

Fungsi: pipeline placement kandidat.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| candidate_code | text | not null |
| job_id | uuid | fk jobs.id |
| dudi_company_id | uuid | fk dudi_companies.id |
| status | placement_status | not null |
| created_by_user_id | uuid | fk users.id |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Rule:

- insert shortlist harus melewati consent.
- DUDI tidak menerima `student_id` di response kecuali endpoint internal admin/sekolah.

### placement_events

Fungsi: riwayat perubahan placement.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| placement_id | uuid | fk placements.id |
| from_status | placement_status | nullable |
| to_status | placement_status | not null |
| notes | text | nullable safe |
| created_by_user_id | uuid | fk users.id |
| created_at | timestamptz | not null |

## Tabel Governance

### teacher_notes

Fungsi: catatan pendampingan internal.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| student_id | uuid | fk students.id |
| teacher_user_id | uuid | fk users.id |
| category | teacher_note_category | not null |
| content | text | not null |
| visibility | teacher_note_visibility | not null |
| created_at | timestamptz | not null |
| updated_at | timestamptz | not null |

Rule:

- `visibility = internal` tidak boleh terlihat orang tua atau DUDI.
- `teacher_notes` tidak boleh muncul di DUDI.

### reports

Fungsi: riwayat report/export.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| type | report_type | not null |
| target_type | report_target_type | not null |
| target_id | uuid | not null |
| file_id | uuid | fk files.id nullable |
| generated_by_user_id | uuid | fk users.id |
| generated_at | timestamptz | not null |

Rule:

- report DUDI harus dibuat dari `DudiCandidatePublicDto`.

### audit_logs

Fungsi: append-only audit trail.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| organization_id | uuid | fk organizations.id nullable |
| actor_user_id | uuid | fk users.id nullable |
| actor_role | role_code | nullable |
| action | audit_action | not null |
| target_type | text | not null |
| target_id | uuid | nullable |
| safe_summary | text | nullable |
| metadata_json | jsonb | nullable safe only |
| ip_address | inet | nullable |
| user_agent | text | nullable |
| created_at | timestamptz | not null |

Rule:

- append-only
- jangan update/delete audit normal
- metadata untuk action DUDI tidak boleh berisi data privat

### notifications

Fungsi: notifikasi in-app.

Kolom:

| Kolom | Tipe | Constraint |
| --- | --- | --- |
| id | uuid | pk |
| recipient_user_id | uuid | fk users.id |
| type | notification_type | not null |
| title | text | not null |
| body | text | not null |
| read_at | timestamptz | nullable |
| created_at | timestamptz | not null |

## Enum Awal

```text
organization_type:
  platform
  school
  dudi
  government
  partner

role_code:
  super_admin
  school_admin
  teacher
  student
  parent
  dudi_admin
  dudi_reviewer
  job_coach
  auditor

consent_status:
  missing
  requested
  approved
  revoked
  expired

consent_scope:
  portfolio-sharing
  work-accommodation-sharing
  industry-validation
  placement-follow-up
  report-export

evidence_visibility:
  internal
  portfolio
  dudi_public

curation_status:
  draft
  approved
  rejected

placement_status:
  shortlisted
  interview
  work_trial
  placed
  not_ready
```

## Index Dan Constraint

### Identity

```text
users.email unique
users.phone unique
sessions.user_id
sessions.expires_at
invites.token_hash unique
invites.email
user_memberships.user_id
user_memberships.organization_id
user_memberships.school_id
user_memberships.dudi_company_id
```

### Student

```text
students.school_id
students.school_id, students.student_code unique
student_guardians.student_id, student_guardians.guardian_id unique
teacher_student_assignments.teacher_user_id
teacher_student_assignments.student_id
student_support_profiles.student_id unique
student_sensitive_records.student_id unique
```

### Journey

```text
student_skills.student_id, student_skills.skill_id unique
simulation_sessions.student_id
simulation_sessions.mission_template_id
evidence_items.student_id
evidence_items.visibility
evidence_items.curation_status
portfolio_items.student_id
```

### Consent Dan DUDI

```text
student_consents.student_id
student_consents.status
consent_scopes.consent_id, consent_scopes.scope unique
candidate_public_profiles.candidate_code unique
candidate_public_profiles.student_id
jobs.dudi_company_id
job_required_skills.job_id, job_required_skills.skill_id unique
industry_validations.candidate_code
industry_validations.dudi_company_id
placements.candidate_code
placements.job_id
placements.dudi_company_id
```

### Governance

```text
teacher_notes.student_id
teacher_notes.teacher_user_id
reports.type
reports.generated_by_user_id
audit_logs.organization_id
audit_logs.actor_user_id
audit_logs.action
audit_logs.target_type, audit_logs.target_id
audit_logs.created_at
notifications.recipient_user_id
notifications.read_at
```

## Migration Order

Urutan migration awal:

1. Enable PostgreSQL extension: `pgcrypto`, optional `citext`.
2. Create enum types.
3. Create `organizations`.
4. Create `roles`.
5. Create `files` tanpa avatar FK jika ingin menghindari circular dependency, atau avatar FK ditambah migration berikutnya.
6. Create `users`.
7. Add `users.avatar_file_id` FK jika belum.
8. Create `schools`.
9. Create `dudi_companies`.
10. Create `user_memberships`.
11. Create `sessions`.
12. Create `invites`.
13. Create `students`.
14. Create `guardians`.
15. Create `student_guardians`.
16. Create `teacher_student_assignments`.
17. Create `student_support_profiles`.
18. Create `student_sensitive_records`.
19. Create `skills`.
20. Create `student_skills`.
21. Create `mission_templates`.
22. Create `simulation_sessions`.
23. Create `evidence_items`.
24. Create `portfolio_items`.
25. Create `student_consents`.
26. Create `consent_scopes`.
27. Create `candidate_public_profiles`.
28. Create `jobs`.
29. Create `job_required_skills`.
30. Create `job_accommodation_supports`.
31. Create `industry_validations`.
32. Create `industry_validation_skills`.
33. Create `placements`.
34. Create `placement_events`.
35. Create `teacher_notes`.
36. Create `reports`.
37. Create `audit_logs`.
38. Create `notifications`.
39. Add remaining indexes.
40. Seed roles and initial system data.

## Seed Data Development

Seed dev/staging minimal:

- 1 platform organization
- 1 platform admin
- 1 school organization
- 1 school
- 1 school admin
- 2 teachers
- 3 students dummy ABK
- 3 guardians dummy
- 1 DUDI organization
- 1 DUDI company
- 1 DUDI admin
- 1 DUDI reviewer
- 5 skills
- 3 mission templates
- 3 simulation sessions
- 3 evidence items curated
- consent approved, requested, revoked
- 1 job
- 1 validation
- 1 placement
- audit sample

Rule:

- jangan seed data anak asli
- gunakan nama dummy yang jelas palsu
- gunakan email domain dummy
- jangan simpan kontak wali real

## Privacy Query Guardrail

Endpoint DUDI harus mengambil data dari service khusus.

Allowed source:

```text
candidate_public_profiles
student_consents
consent_scopes
evidence_items filtered dudi_public + approved
student_skills joined skills is_public_for_dudi
industry_validations
placements
jobs
```

Forbidden source untuk DUDI:

```text
students.full_name
schools.name
guardians.full_name
guardians.phone
guardians.email
student_sensitive_records.*
teacher_notes.content
student_support_profiles.support_needs
student_support_profiles.accessibility_needs
student_support_profiles.learning_preferences
```

Jika perlu school context untuk DUDI, gunakan:

```text
school_segment = "SLB/sekolah inklusi mitra"
```

bukan nama sekolah spesifik.

## Prisma Planning Notes

Jika memakai Prisma:

- gunakan `provider = "postgresql"` untuk semua environment real apps.
- jangan siapkan SQLite fallback agar schema tidak bercabang.
- gunakan migration dari PostgreSQL local/staging.
- buat seed script idempotent.
- mapping table snake_case bisa memakai `@@map`.

Contoh datasource Prisma:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Contoh env lokal:

```env
DATABASE_URL="postgresql://syncvoca:syncvoca@localhost:5432/syncvoca_dev?schema=public"
```

Contoh env test integration:

```env
TEST_DATABASE_URL="postgresql://syncvoca:syncvoca@localhost:5433/syncvoca_test?schema=public"
```

## Local PostgreSQL Via Docker

Saat real apps mulai dibuat, siapkan PostgreSQL lokal via Docker Compose.

Contoh `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: syncvoca-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: syncvoca_dev
      POSTGRES_USER: syncvoca
      POSTGRES_PASSWORD: syncvoca
    ports:
      - "5432:5432"
    volumes:
      - syncvoca_pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U syncvoca -d syncvoca_dev"]
      interval: 10s
      timeout: 5s
      retries: 5

  postgres_test:
    image: postgres:16-alpine
    container_name: syncvoca-postgres-test
    restart: unless-stopped
    environment:
      POSTGRES_DB: syncvoca_test
      POSTGRES_USER: syncvoca
      POSTGRES_PASSWORD: syncvoca
    ports:
      - "5433:5432"
    tmpfs:
      - /var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U syncvoca -d syncvoca_test"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  syncvoca_pg_data:
```

Command lokal:

```bash
docker compose up -d postgres postgres_test
```

Env lokal:

```env
DATABASE_URL="postgresql://syncvoca:syncvoca@localhost:5432/syncvoca_dev?schema=public"
TEST_DATABASE_URL="postgresql://syncvoca:syncvoca@localhost:5433/syncvoca_test?schema=public"
```

Catatan:

- `postgres` menyimpan data di volume Docker.
- `postgres_test` memakai `tmpfs` agar test database bersih dan cepat.
- Migration development dan test tetap berjalan di PostgreSQL.
- Jangan menambahkan SQLite mode di real apps.

## Definition Of Done Database Design

Database design dianggap siap untuk mulai implementasi backend jika:

- keputusan PostgreSQL untuk production, staging, local dev, dan integration test sudah diterima
- ERD sudah direview FE/BE/Auth
- semua tabel core punya primary key dan foreign key
- many-to-many sudah memakai junction table
- consent scope sudah dinormalisasi
- skill/job/evidence/placement sudah dinormalisasi
- sensitive data terpisah dari DUDI public data
- candidate public profile jelas sebagai cache aman, bukan source of truth
- index utama sudah didefinisikan
- migration order sudah jelas
- seed dev/staging tidak memakai data asli
- privacy query guardrail sudah disepakati
