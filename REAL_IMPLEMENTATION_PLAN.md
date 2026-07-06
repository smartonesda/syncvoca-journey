# Real Implementation Plan SyncVoca Journey

Dokumen ini menjelaskan arah implementasi real apps SyncVoca Journey setelah prototype apps di repo `v2` selesai. Repo `v2` tetap diperlakukan sebagai product prototype/demo MVP. Real apps perlu dibangun dengan fondasi production: frontend web/PWA, backend API, database, auth, role-based access, audit, consent, dan storage yang benar.

## Posisi Dokumen

Dokumen ini adalah master plan besar. Untuk eksekusi tim, gunakan panduan modular berikut:

- `docs/README.md`: peta dokumentasi dan aturan penempatan panduan.
- `docs/prototype-apps/README.md`: batas kerja repo prototype apps.
- `docs/frontend/README.md`: panduan frontend web/PWA.
- `docs/backend/README.md`: panduan backend production.
- `docs/database/README.md`: panduan database schema production.
- `docs/auth-security/README.md`: panduan auth, RBAC, privacy, consent, dan DUDI visibility.
- `docs/team-execution/README.md`: urutan kerja tim dan dependency antar fase.

## Ringkasan Keputusan

### Keputusan Utama

1. SyncVoca Journey real apps dibangun dengan strategi web-first.
2. Siswa dan Orang Tua diprioritaskan sebagai mobile-friendly PWA.
3. Guru, Admin, dan DUDI diprioritaskan sebagai dashboard web responsif.
4. Android native tidak wajib di fase awal.
5. Jika butuh distribusi Play Store, gunakan PWA wrapper seperti TWA/Capacitor setelah web app stabil.
6. Backend production wajib sebelum pilot real karena data ABK termasuk data sensitif.
7. Semua akses data harus dikontrol di backend, bukan hanya disembunyikan di UI.
8. Prototype `v2` menjadi acuan product flow, copy, UI direction, dan demo behavior.

### Kenapa Web-First?

Proposal menyebut platform digital, gamifikasi, dashboard, dan distribusi Web App/Play Store. Untuk tahap real pertama, web-first paling masuk akal karena:

- Guru/Admin/DUDI membutuhkan dashboard data, audit, consent, export, dan monitoring.
- Siswa/Orang Tua tetap bisa memakai PWA di HP tanpa install native app.
- Development lebih cepat karena satu codebase frontend dapat dipakai lintas role.
- PWA bisa dipaketkan ke Android wrapper nanti jika perlu.
- Backend dan privacy lebih penting daripada native Android pada fase awal.

## Status Prototype Saat Ini

Prototype apps di repo `v2` sudah membuktikan:

- landing page produk
- role workspace Siswa/Guru/Orang Tua/DUDI/Admin
- alur 5 tahap: Intake Dukungan, Simulasi Kerja, Rencana Pendampingan, Portofolio Bukti, Validasi DUDI
- DUDI privacy boundary
- consent gate
- audit log demo
- DUDI-safe report export
- DUDI shortlist dan placement workflow
- school placement outcome monitoring
- custom modal/toast
- privacy test terhadap data DUDI

Yang masih belum production:

- database production
- login real
- backend API real
- server-side authorization
- file/object storage
- immutable audit log
- deployment security hardening
- real organization/tenant model
- data retention policy
- observability

## Target Real Apps

### Tujuan Produk Real

1. Sekolah dapat memetakan profil dukungan ABK dan progres vokasi secara terstruktur.
2. Siswa dapat mengerjakan latihan/simulasi dan membangun bukti kerja.
3. Guru dapat memberi pendampingan, catatan, consent, dan rekomendasi latihan.
4. Orang tua dapat membaca progres dan tugas pendampingan rumah.
5. DUDI dapat melihat kandidat berbasis bukti tanpa akses ke data sensitif.
6. Admin dapat mengelola sekolah, user, consent, audit, data master, dan governance.
7. Semua aktivitas penting tercatat di audit log.
8. Data sensitif ABK tidak bocor ke pihak yang tidak berhak.

### Non-Goals Fase Awal

Fase real apps awal tidak perlu langsung:

- Android native full custom
- payment/subscription production
- AI recommendation kompleks
- LMS lengkap
- game engine 3D kompleks
- integrasi HRIS DUDI
- multi-region deployment
- SSO enterprise

Fitur tersebut bisa masuk fase lanjutan setelah pilot sekolah dan DUDI tervalidasi.

## Pembagian Aplikasi

### Opsi Struktur Frontend

Ada dua opsi yang realistis.

#### Opsi A - Single Frontend Monorepo Dengan Role Routing

Satu aplikasi frontend dengan route berbeda:

```text
/login
/siswa
/orang-tua
/guru
/dudi
/admin
```

Kelebihan:

- paling cepat untuk MVP production
- design system lebih konsisten
- routing dan auth lebih mudah dimulai
- cocok untuk tim kecil

Kekurangan:

- bundle bisa membesar jika tidak code splitting
- role mobile dan dashboard harus disiplin dipisah
- permission tetap harus kuat di backend

Rekomendasi fase awal: gunakan Opsi A.

#### Opsi B - Multi Frontend Apps

Pisah app:

```text
apps/siswa-pwa
apps/parent-pwa
apps/school-dashboard
apps/dudi-dashboard
apps/admin-dashboard
```

Kelebihan:

- bundle lebih spesifik per persona
- mobile experience bisa lebih fokus
- scaling tim lebih mudah

Kekurangan:

- setup lebih lama
- shared component/design system perlu dikelola
- deployment lebih banyak

Rekomendasi: pertimbangkan setelah MVP production stabil.

## Rekomendasi Struktur Real Apps

Untuk awal production, gunakan monorepo:

```text
syncvoca-real/
  apps/
    web/
      src/
        app/
        features/
        components/
        routes/
        lib/
        styles/
    api/
      src/
        modules/
        common/
        config/
        jobs/
        workers/
  packages/
    ui/
    types/
    validators/
    auth/
    privacy/
  prisma/
    schema.prisma
    migrations/
  docs/
    architecture.md
    api-contract.md
    privacy-policy.md
    deployment.md
```

Alternatif jika ingin tetap sederhana:

```text
syncvoca-real/
  fe/
  be/
  docs/
```

Untuk maintainability jangka panjang, monorepo `apps/` dan `packages/` lebih rapi.

## Tech Stack Rekomendasi

### Frontend

Rekomendasi:

- Next.js atau React + Vite
- TypeScript
- Tailwind CSS
- TanStack Query untuk server state
- Zod untuk validation
- React Hook Form untuk form kompleks
- Zustand/Jotai untuk local UI state ringan
- PWA plugin

Pilihan:

- Jika butuh SEO/landing/public content kuat: Next.js
- Jika app lebih dashboard/PWA dan deployment sederhana: Vite React

Rekomendasi praktis: Next.js untuk real apps jika landing + app + dashboard ingin satu platform production. Vite tetap bisa jika ingin fokus SPA.

### Backend

Rekomendasi:

- NestJS atau Express modular
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod/class-validator untuk request validation
- JWT access token + refresh token rotation
- bcrypt/argon2 untuk password
- object storage S3-compatible/Supabase Storage
- queue untuk job async seperti PDF/export/email

Pilihan backend:

- NestJS jika ingin struktur enterprise dan modular.
- Express modular jika ingin lebih ringan dan cepat.

Rekomendasi: NestJS untuk real apps karena domain SyncVoca cukup kompleks.

### Database

Rekomendasi utama:

- PostgreSQL

Alasan:

- relasi data kuat
- cocok untuk audit log dan role access
- JSONB bisa dipakai untuk rubrik/metadata
- mudah dikembangkan ke reporting

### Storage

Gunakan object storage untuk:

- evidence file
- portfolio attachment
- report export
- avatar/logo sekolah/DUDI
- dokumen consent

Pilihan:

- Supabase Storage
- Cloudflare R2
- AWS S3
- Google Cloud Storage

### Deployment

Pilihan pragmatic:

- FE: Vercel/Netlify/Cloudflare Pages
- BE: Railway/Fly.io/Render/Cloud Run
- DB: Supabase/Postgres managed/Railway Postgres
- Storage: Supabase Storage/R2/S3

Untuk pilot sekolah, Supabase + Vercel/Railway cukup.

## Role Dan Akses

### Role Utama

```text
super_admin
school_admin
teacher
student
parent
dudi_admin
dudi_reviewer
job_coach
auditor
```

### Penjelasan Role

#### super_admin

Operator pusat SyncVoca. Bisa mengelola tenant sekolah, DUDI, konfigurasi global, dan audit lintas tenant.

#### school_admin

Admin sekolah. Bisa mengelola siswa, guru, orang tua, consent, dan data sekolah.

#### teacher

Guru/pendamping. Bisa melihat siswa di sekolahnya, menambah catatan, memberi rekomendasi, dan memproses consent.

#### student

Siswa ABK. Bisa melihat misi, simulasi, progres, portofolio pribadi, dan mentor.

#### parent

Orang tua/wali. Bisa melihat progres anak yang ditautkan, catatan tertentu, checklist rumah, dan consent jika diposisikan sebagai pemberi persetujuan.

#### dudi_admin

Admin perusahaan/DUDI. Bisa mengelola profil perusahaan, lowongan, reviewer, dan pipeline kandidat.

#### dudi_reviewer

Reviewer dari DUDI. Bisa melihat kandidat publik yang sudah eligible, memberi validation seal, shortlist, dan update placement.

#### job_coach

Pendamping transisi kerja. Bisa melihat rencana akomodasi kerja dan monitoring placement untuk siswa yang ditugaskan.

#### auditor

Role read-only untuk melihat audit compliance tanpa membuka data sensitif yang tidak perlu.

## Prinsip Role-Based Access

1. Frontend hanya mengatur tampilan, bukan sumber kebenaran permission.
2. Backend wajib memeriksa role, tenant, relasi user, dan scope data.
3. DUDI tidak boleh menerima `StudentProfile` penuh dari API.
4. Payload DUDI harus dibuat oleh service khusus, bukan hasil filter UI.
5. Data sensitif harus dipisah di tabel/kolom yang aksesnya lebih ketat.
6. Semua aksi penting harus menulis audit log.

## Matrix Akses Ringkas

| Data/Fitur | Student | Parent | Teacher | School Admin | DUDI | Super Admin |
| --- | --- | --- | --- | --- | --- | --- |
| Profil siswa lengkap | self | anak terkait | sekolah terkait | sekolah terkait | tidak | terbatas |
| Sensitive notes | terbatas | terbatas | ya | ya | tidak | audit terbatas |
| Evidence simulasi | self | anak terkait | sekolah terkait | sekolah terkait | publik terkurasi | ya |
| Consent | lihat status | approve/lihat | request/manage | manage | lihat status aman | ya |
| Candidate public profile | tidak utama | tidak utama | preview | preview | ya | ya |
| Validation seal | lihat | lihat | lihat | lihat | create jika consent | ya |
| Placement pipeline | lihat terkait | lihat terkait | sekolah terkait | sekolah terkait | publik DUDI | ya |
| Audit log | tidak | tidak | terbatas | sekolah terkait | terbatas DUDI | ya |
| Master data | tidak | tidak | terbatas | sekolah | perusahaan sendiri | global |

## Boundary Data DUDI

### Data Yang Boleh Ke DUDI

- candidate public code
- school segment umum
- vocational interest
- readiness score
- skill publik
- evidence simulasi terkurasi
- accommodation needs untuk kerja
- consent status aman
- validation seal
- job match score
- placement pipeline publik

### Data Yang Tidak Boleh Ke DUDI

- nama siswa
- nama sekolah spesifik jika belum disetujui
- kontak wali
- catatan medis
- latar keluarga
- private notes
- raw teacher notes
- profil dukungan internal yang terlalu personal
- dokumen consent asli

### Implementasi Teknis

Backend harus punya service seperti:

```text
DudiCandidateProfileService
```

Service ini hanya mengembalikan DTO publik:

```ts
type DudiCandidateProfileDto = {
  candidateCode: string;
  schoolSegment: string;
  interest: string;
  readinessScore: number;
  skills: string[];
  accommodationNeeds: string[];
  evidenceItems: PublicEvidenceDto[];
  validationSeals: PublicValidationDto[];
  consentStatus: 'approved' | 'pending' | 'revoked';
  consentScopes: string[];
  privacyNotice: string;
};
```

Jangan pernah mengirim entity `Student` mentah ke endpoint DUDI.

## Arsitektur Frontend

### Pembagian Route

```text
/                     landing
/login                login
/register/school      onboarding sekolah
/register/dudi        onboarding DUDI
/siswa                siswa home
/siswa/misi           misi/simulasi
/siswa/portfolio      portofolio
/orang-tua            parent home
/orang-tua/progres    progres anak
/guru                 guru dashboard
/guru/siswa/:id       detail siswa
/guru/consent         consent queue
/guru/placement       placement monitoring
/dudi                 DUDI dashboard
/dudi/talent          talent pool
/dudi/jobs            job posting
/dudi/placement       placement pipeline
/admin                admin dashboard
/admin/schools        sekolah
/admin/users          user
/admin/governance     governance
```

### Siswa PWA

Fokus:

- mobile-first
- instruksi sederhana
- misi hari ini
- progres
- badge/achievement
- portofolio
- mentor AI

Navigation:

- Home
- Misi
- Portofolio
- Mentor
- Profil

UI requirements:

- tombol besar
- teks ringkas
- progress visual
- mode aksesibilitas
- reduced motion
- offline friendly untuk halaman terakhir yang dibuka

### Orang Tua PWA

Fokus:

- progres anak
- catatan guru yang boleh dibaca
- checklist pendampingan rumah
- consent action jika wali menjadi approver
- notifikasi sederhana

Navigation:

- Ringkasan
- Aktivitas
- Tugas Rumah
- Consent
- Pesan

### Guru Dashboard

Fokus:

- daftar siswa
- detail siswa
- evidence simulasi
- catatan pendamping
- rencana intervensi
- consent queue
- placement outcome monitoring

Layout:

- sidebar atau top nav desktop
- table/list untuk siswa
- detail panel untuk selected student
- filter kelas/sekolah/profil dukungan

### Admin Dashboard

Fokus:

- tenant sekolah
- user management
- master data
- consent governance
- audit trail
- placement metric
- data export internal
- konfigurasi role

### DUDI Dashboard

Fokus:

- company profile
- job posting
- candidate public pool
- evidence summary
- validation seal
- shortlist
- placement pipeline
- safe report export

Rule utama:

- DUDI UI tidak boleh punya route yang memanggil endpoint siswa internal.
- Semua data kandidat harus lewat endpoint public candidate profile.

## PWA Requirements

### Siswa dan Orang Tua

PWA wajib mendukung:

- installable manifest
- app icon
- splash screen
- responsive mobile layout
- offline fallback page
- cache static assets
- cache last successful dashboard response secara aman
- push notification opsional

### Cache Policy

Karena ada data sensitif:

- jangan cache data medis/private notes
- jangan cache dokumen consent asli
- cache minimal untuk ringkasan non-sensitif
- gunakan clear cache saat logout
- encrypt local storage jika menyimpan data sensitif sementara

### Offline Mode Awal

Fase awal cukup:

- app shell offline
- halaman fallback
- last viewed summary untuk siswa/orang tua
- queue aksi belum wajib

Offline action queue bisa masuk fase lanjutan.

## Backend Modules

Rekomendasi modul backend:

```text
auth
users
roles
schools
students
guardians
teachers
dudi
jobs
simulations
evidence
portfolio
consents
validations
placements
reports
audit
notifications
files
ai-mentor
```

### Auth Module

Fungsi:

- login
- logout
- refresh token
- password reset
- email/phone verification
- session management
- invite user

### Users/Roles Module

Fungsi:

- user profile
- role assignment
- organization membership
- permission check

### Schools Module

Fungsi:

- school profile
- class/group
- teacher assignment
- student enrollment

### Students Module

Fungsi:

- student profile
- support profile
- readiness score
- internal sensitive data
- relationship to parent/guardian

### Simulations Module

Fungsi:

- mission templates
- simulation sessions
- scoring metrics
- achievement
- recommendation seed

### Evidence/Portfolio Module

Fungsi:

- evidence item
- curated evidence
- portfolio summary
- public/private flag
- attachment

### Consents Module

Fungsi:

- request consent
- approve consent
- revoke consent
- consent scope
- consent validity
- consent document upload
- consent audit

### DUDI/Jobs Module

Fungsi:

- company profile
- DUDI user management
- job posting
- accommodation support
- required skill
- candidate matching

### Validations Module

Fungsi:

- issue validation seal
- block if consent missing
- validation skill
- validation note
- validation audit

### Placements Module

Fungsi:

- shortlist
- interview
- work trial
- placed
- not ready
- school follow-up note
- placement audit

### Reports Module

Fungsi:

- DUDI-safe report
- school internal report
- PDF export
- export audit

### Audit Module

Fungsi:

- append-only audit log
- actor
- action
- target
- metadata
- IP/device metadata
- export for admin/auditor

## Database Schema Draft

Ini draft awal untuk PostgreSQL. Nama field dapat disesuaikan saat implementasi.

### organizations

Menyimpan tenant utama.

```sql
id uuid primary key
type varchar -- syncvoca, school, dudi
name varchar
slug varchar unique
status varchar -- active, suspended, pending
created_at timestamptz
updated_at timestamptz
```

### users

```sql
id uuid primary key
email varchar unique
phone varchar
password_hash varchar
full_name varchar
status varchar -- active, invited, disabled
last_login_at timestamptz
created_at timestamptz
updated_at timestamptz
```

### roles

```sql
id uuid primary key
code varchar unique
name varchar
description text
```

### user_memberships

Relasi user ke organisasi dan role.

```sql
id uuid primary key
user_id uuid references users(id)
organization_id uuid references organizations(id)
role_id uuid references roles(id)
status varchar
created_at timestamptz
updated_at timestamptz
unique(user_id, organization_id, role_id)
```

### schools

```sql
id uuid primary key
organization_id uuid references organizations(id)
name varchar
npsn varchar
type varchar -- SLB, SMA_INKLUSI, SMK_INKLUSI, OTHER
city varchar
province varchar
address text
contact_email varchar
contact_phone varchar
created_at timestamptz
updated_at timestamptz
```

### dudi_companies

```sql
id uuid primary key
organization_id uuid references organizations(id)
name varchar
industry varchar
city varchar
province varchar
address text
verified boolean
description text
created_at timestamptz
updated_at timestamptz
```

### students

Profil utama siswa.

```sql
id uuid primary key
school_id uuid references schools(id)
student_code varchar unique
full_name varchar
birth_date date
gender varchar
class_name varchar
interest varchar
readiness_score int
status varchar -- active, graduated, inactive
created_at timestamptz
updated_at timestamptz
```

### student_support_profiles

Profil dukungan internal.

```sql
id uuid primary key
student_id uuid references students(id)
support_profile text
support_requirements jsonb
learning_preferences jsonb
accessibility_needs jsonb
created_at timestamptz
updated_at timestamptz
```

### student_sensitive_records

Data sangat privat. Akses ketat.

```sql
id uuid primary key
student_id uuid references students(id)
medical_notes text
guardian_contact text
family_background text
private_notes text
encrypted_payload jsonb
created_at timestamptz
updated_at timestamptz
```

Catatan: field ini bisa dienkripsi di application layer sebelum masuk DB.

### guardians

```sql
id uuid primary key
user_id uuid references users(id)
full_name varchar
phone varchar
email varchar
relationship varchar
created_at timestamptz
updated_at timestamptz
```

### student_guardians

```sql
id uuid primary key
student_id uuid references students(id)
guardian_id uuid references guardians(id)
is_primary boolean
can_approve_consent boolean
created_at timestamptz
```

### teacher_student_assignments

```sql
id uuid primary key
teacher_user_id uuid references users(id)
student_id uuid references students(id)
school_id uuid references schools(id)
role varchar -- homeroom, counselor, job_coach
created_at timestamptz
```

### skills

```sql
id uuid primary key
name varchar unique
category varchar
description text
created_at timestamptz
```

### student_skills

```sql
id uuid primary key
student_id uuid references students(id)
skill_id uuid references skills(id)
source varchar -- intake, simulation, teacher, validation
level int
created_at timestamptz
updated_at timestamptz
```

### mission_templates

```sql
id uuid primary key
name varchar
category varchar
description text
target_skills jsonb
accessibility_config jsonb
status varchar
created_at timestamptz
updated_at timestamptz
```

### simulation_sessions

```sql
id uuid primary key
student_id uuid references students(id)
mission_template_id uuid references mission_templates(id)
score int
accuracy int
completion_time_seconds int
error_count int
consistency int
raw_metrics jsonb
started_at timestamptz
completed_at timestamptz
created_at timestamptz
```

### evidence_items

```sql
id uuid primary key
student_id uuid references students(id)
simulation_session_id uuid references simulation_sessions(id)
title varchar
summary text
score int
is_public_for_dudi boolean
curated_by uuid references users(id)
created_at timestamptz
updated_at timestamptz
```

### portfolio_items

```sql
id uuid primary key
student_id uuid references students(id)
title varchar
description text
visibility varchar -- internal, guardian, dudi_public
created_by uuid references users(id)
created_at timestamptz
updated_at timestamptz
```

### files

```sql
id uuid primary key
owner_type varchar -- student, school, dudi, report
owner_id uuid
bucket varchar
path text
mime_type varchar
size_bytes bigint
checksum varchar
visibility varchar -- private, internal, public_report
uploaded_by uuid references users(id)
created_at timestamptz
```

### student_consents

```sql
id uuid primary key
student_id uuid references students(id)
status varchar -- pending, approved, revoked, expired
requested_by uuid references users(id)
approved_by uuid references users(id)
valid_until timestamptz
note text
created_at timestamptz
updated_at timestamptz
```

### consent_scopes

```sql
id uuid primary key
consent_id uuid references student_consents(id)
scope varchar -- portfolio-sharing, work-accommodation-sharing, industry-validation, placement-followup
created_at timestamptz
```

### jobs

```sql
id uuid primary key
dudi_company_id uuid references dudi_companies(id)
title varchar
industry varchar
location varchar
type varchar -- onsite, remote, hybrid
description text
salary_range varchar
status varchar -- draft, active, closed
created_by uuid references users(id)
created_at timestamptz
updated_at timestamptz
```

### job_required_skills

```sql
id uuid primary key
job_id uuid references jobs(id)
skill_id uuid references skills(id)
importance int
created_at timestamptz
```

### job_accommodation_supports

```sql
id uuid primary key
job_id uuid references jobs(id)
support_text text
created_at timestamptz
```

### candidate_public_profiles

Materialized/cache table opsional untuk mempercepat DUDI view.

```sql
id uuid primary key
student_id uuid references students(id)
candidate_code varchar unique
school_segment varchar
public_payload jsonb
generated_at timestamptz
expires_at timestamptz
```

Catatan: table ini opsional. Bisa juga generate on-demand lewat service.

### industry_validations

```sql
id uuid primary key
student_id uuid references students(id)
dudi_company_id uuid references dudi_companies(id)
job_id uuid references jobs(id)
issued_by uuid references users(id)
note text
issued_at timestamptz
created_at timestamptz
```

### industry_validation_skills

```sql
id uuid primary key
validation_id uuid references industry_validations(id)
skill_id uuid references skills(id)
created_at timestamptz
```

### placements

```sql
id uuid primary key
student_id uuid references students(id)
dudi_company_id uuid references dudi_companies(id)
job_id uuid references jobs(id)
candidate_code varchar
status varchar -- shortlisted, interview, work_trial, placed, not_ready
note text
created_by uuid references users(id)
created_at timestamptz
updated_at timestamptz
```

### placement_events

Event history status placement.

```sql
id uuid primary key
placement_id uuid references placements(id)
status varchar
note text
actor_user_id uuid references users(id)
created_at timestamptz
```

### teacher_notes

```sql
id uuid primary key
student_id uuid references students(id)
teacher_user_id uuid references users(id)
focus_category varchar
note_text text
visibility varchar -- internal, guardian_visible
created_at timestamptz
updated_at timestamptz
```

### reports

```sql
id uuid primary key
type varchar -- dudi_safe, school_internal
student_id uuid references students(id)
generated_by uuid references users(id)
file_id uuid references files(id)
metadata jsonb
created_at timestamptz
```

### audit_logs

Append-only.

```sql
id uuid primary key
actor_user_id uuid references users(id)
actor_role varchar
organization_id uuid references organizations(id)
action varchar
target_type varchar
target_id uuid
summary text
metadata jsonb
ip_address inet
user_agent text
created_at timestamptz
```

### notifications

```sql
id uuid primary key
user_id uuid references users(id)
type varchar
title varchar
message text
read_at timestamptz
metadata jsonb
created_at timestamptz
```

## Database Index Rekomendasi

```sql
create index idx_students_school_id on students(school_id);
create index idx_simulation_sessions_student_id on simulation_sessions(student_id);
create index idx_evidence_items_student_public on evidence_items(student_id, is_public_for_dudi);
create index idx_student_consents_student_status on student_consents(student_id, status);
create index idx_jobs_company_status on jobs(dudi_company_id, status);
create index idx_placements_student_status on placements(student_id, status);
create index idx_placements_company_status on placements(dudi_company_id, status);
create index idx_audit_logs_target on audit_logs(target_type, target_id);
create index idx_audit_logs_actor on audit_logs(actor_user_id, created_at);
create index idx_audit_logs_org_created on audit_logs(organization_id, created_at);
```

## Auth Dan Session

### Login Methods

Fase awal:

- email + password
- invite link untuk guru/admin/DUDI
- parent invite oleh sekolah
- student account dibuat/dibantu sekolah

Fase lanjutan:

- magic link
- OTP WhatsApp/email
- SSO sekolah

### Token Strategy

Gunakan:

- short-lived access token
- refresh token rotation
- refresh token disimpan hashed di DB
- revoke all sessions
- session device tracking

Tabel:

```sql
user_sessions
id uuid primary key
user_id uuid references users(id)
refresh_token_hash varchar
device_name varchar
ip_address inet
user_agent text
expires_at timestamptz
revoked_at timestamptz
created_at timestamptz
updated_at timestamptz
```

### Password Security

- argon2id atau bcrypt cost memadai
- password minimum policy
- rate limit login
- lockout sementara
- audit failed login

## Authorization Design

Gunakan kombinasi:

- RBAC untuk role dasar
- tenant scoping untuk school/DUDI
- relationship-based access untuk siswa-orang tua-guru
- policy service untuk kasus sensitif

Contoh policy:

```ts
canViewStudentSensitiveData(user, student)
canManageConsent(user, student)
canViewDudiCandidate(user, candidate)
canIssueValidation(user, candidate)
canUpdatePlacement(user, placement)
```

### Middleware/Guard

Backend harus punya guard:

```text
AuthGuard
RoleGuard
OrganizationGuard
PolicyGuard
```

Setiap endpoint wajib jelas:

- siapa aktornya
- role apa yang boleh
- organisasi mana
- target resource apa
- relasi apa yang dibutuhkan

## API Contract Draft

### Auth

```http
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
```

### Schools

```http
GET    /api/schools
POST   /api/schools
GET    /api/schools/:schoolId
PATCH  /api/schools/:schoolId
```

### Students

```http
GET    /api/students
POST   /api/students
GET    /api/students/:studentId
PATCH  /api/students/:studentId
GET    /api/students/:studentId/summary
GET    /api/students/:studentId/sensitive
PATCH  /api/students/:studentId/support-profile
```

Endpoint `/sensitive` hanya untuk role internal yang berhak.

### Simulation

```http
GET  /api/missions
GET  /api/students/:studentId/sessions
POST /api/students/:studentId/sessions
GET  /api/students/:studentId/evidence
POST /api/students/:studentId/evidence/curate
```

### Teacher Notes

```http
GET  /api/students/:studentId/teacher-notes
POST /api/students/:studentId/teacher-notes
PATCH /api/teacher-notes/:noteId
DELETE /api/teacher-notes/:noteId
```

### Parent

```http
GET /api/parent/children
GET /api/parent/children/:studentId/progress
GET /api/parent/children/:studentId/home-tasks
GET /api/parent/children/:studentId/consents
POST /api/parent/consents/:consentId/approve
POST /api/parent/consents/:consentId/revoke
```

### Consents

```http
GET  /api/consents
POST /api/students/:studentId/consents/request
POST /api/consents/:consentId/approve
POST /api/consents/:consentId/revoke
GET  /api/students/:studentId/consents
```

### DUDI

```http
GET   /api/dudi/company
PATCH /api/dudi/company
GET   /api/dudi/jobs
POST  /api/dudi/jobs
PATCH /api/dudi/jobs/:jobId
GET   /api/dudi/candidates
GET   /api/dudi/candidates/:candidateCode
POST  /api/dudi/candidates/:candidateCode/validate
POST  /api/dudi/candidates/:candidateCode/shortlist
GET   /api/dudi/placements
PATCH /api/dudi/placements/:placementId/status
POST  /api/dudi/candidates/:candidateCode/report
```

### Admin Governance

```http
GET /api/admin/governance/summary
GET /api/admin/governance/consent-queue
GET /api/admin/governance/audit
GET /api/admin/governance/placements
```

### Reports

```http
POST /api/reports/dudi-safe/:candidateCode
GET  /api/reports/:reportId/download
POST /api/reports/school-internal/:studentId
```

### Audit

```http
GET /api/audit
GET /api/audit/:auditId
```

## DTO Penting

### Student Internal Summary

```ts
type StudentInternalSummaryDto = {
  id: string;
  fullName: string;
  schoolId: string;
  schoolName: string;
  supportProfile: string;
  interest: string;
  readinessScore: number;
  skills: string[];
  supportRequirements: string[];
  latestSessions: SimulationSessionDto[];
  latestNotes: TeacherNoteDto[];
  consentStatus: ConsentStatus;
};
```

### DUDI Candidate Public

```ts
type DudiCandidatePublicDto = {
  candidateCode: string;
  schoolSegment: string;
  interest: string;
  readinessScore: number;
  skills: string[];
  accommodationNeeds: string[];
  portfolioSummary: string;
  evidenceItems: PublicEvidenceDto[];
  validationSeals: PublicValidationSealDto[];
  consentStatus: ConsentStatus;
  consentScopes: string[];
  privacyNotice: string;
};
```

### Placement

```ts
type PlacementDto = {
  id: string;
  candidateCode: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  status: 'shortlisted' | 'interview' | 'work_trial' | 'placed' | 'not_ready';
  note: string;
  updatedAt: string;
};
```

### Audit

```ts
type AuditLogDto = {
  id: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  summary: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};
```

## Privacy Dan Security

### Data Classification

#### Public

- landing content
- general product explanation
- company public profile if approved

#### Internal

- student profile
- support profile
- teacher notes
- school data
- placement monitoring

#### Restricted/Sensitive

- medical notes
- guardian contact
- family background
- private notes
- consent documents
- raw assessment detail

#### DUDI Public Candidate

Data khusus hasil transformasi:

- candidate code
- evidence curated
- work accommodation needs
- readiness score
- skill summary

### Security Controls

Minimal production:

- HTTPS only
- secure cookies
- CSRF protection jika cookie auth
- rate limiting
- request validation
- file upload validation
- antivirus/malware scanning untuk upload jika memungkinkan
- encrypted secrets
- database backup
- audit log append-only
- role guard
- tenant scoping
- least privilege DB user

### Encryption

Rekomendasi:

- TLS in transit
- DB encryption at rest dari provider
- application-level encryption untuk `student_sensitive_records.encrypted_payload`
- signed URL untuk file privat

### Retention Policy

Perlu ditentukan:

- berapa lama audit disimpan
- kapan data siswa inactive diarsipkan
- kapan report export expired
- siapa yang bisa request deletion/anonymization

Draft:

- audit log: minimal 2-5 tahun untuk compliance internal
- report export: link signed URL 15-60 menit
- candidate cache: regenerate berkala
- revoked consent: tidak menghapus audit, tetapi menghentikan akses DUDI

## Consent Design

### Scope Consent

```text
portfolio-sharing
work-accommodation-sharing
industry-validation
placement-followup
report-export
```

### State

```text
pending
approved
revoked
expired
```

### Rules

1. DUDI tidak dapat melihat kandidat tanpa minimal consent portfolio/accommodation.
2. DUDI tidak dapat menerbitkan seal tanpa `industry-validation`.
3. DUDI tidak dapat shortlist placement tanpa `industry-validation` atau `placement-followup`.
4. Export report membutuhkan `report-export` atau ikut scope industry validation sesuai kebijakan.
5. Revoke consent langsung menutup akses DUDI untuk tindakan baru.
6. Audit lama tetap tersimpan, tapi data detail tidak ditampilkan ulang ke DUDI.

## Audit Event Design

Action awal:

```text
user_login
user_invited
student_created
student_updated
teacher_note_created
consent_requested
consent_approved
consent_revoked
candidate_public_profile_viewed
industry_validation_issued
industry_validation_blocked
dudi_safe_report_exported
candidate_shortlisted
placement_status_updated
placement_shortlist_blocked
file_uploaded
report_downloaded
```

Audit metadata tidak boleh menyimpan data sensitif mentah.

Contoh metadata aman:

```json
{
  "candidateCode": "ABK-01-XDZF",
  "studentId": "uuid",
  "consentStatus": "approved",
  "jobId": "uuid",
  "status": "interview"
}
```

## AI Mentor Plan

Fase awal:

- AI mentor hanya untuk siswa
- prompt mengambil context minimum
- tidak mengirim sensitive records
- log chat harus hati-hati
- parental/school consent untuk AI jika perlu

Context yang boleh dikirim:

- nama panggilan atau first name
- minat vokasi
- skills
- readiness score
- support requirements yang aman
- session summary

Context yang tidak boleh:

- medical notes
- guardian contact
- family background
- private notes
- raw diagnosis sensitif

## Notification Plan

Fase awal:

- in-app notification
- email optional

Event notifikasi:

- consent requested
- consent approved/revoked
- DUDI validation issued
- candidate shortlisted
- placement status changed
- teacher follow-up note created

Push notification PWA bisa fase berikutnya.

## Testing Strategy

### Backend Tests

- unit test policy service
- unit test DUDI candidate mapper
- unit test consent gate
- integration test API auth/RBAC
- integration test placement workflow
- integration test audit logging

### Frontend Tests

- role route guard test
- component test untuk role surfaces
- mobile layout snapshot untuk siswa/orang tua
- accessibility smoke test
- form validation test

### Privacy Tests

Wajib ada test seperti prototype:

- DUDI candidate DTO tidak mengandung field privat
- report DUDI tidak mengandung field privat
- placement DUDI tidak mengandung nama siswa
- audit DUDI tidak mengandung catatan sensitif

### E2E Tests

Skenario minimal:

1. School admin invite guru.
2. Guru membuat siswa.
3. Guru request consent.
4. Parent/Admin approve consent.
5. Siswa menjalankan simulasi.
6. Guru curate evidence.
7. DUDI melihat public candidate.
8. DUDI issue validation seal.
9. DUDI shortlist placement.
10. Guru membuat follow-up placement.

## Observability

Production minimal:

- structured logging
- request id
- error tracking
- audit event dashboard
- API latency metrics
- failed login metrics
- file upload failure metrics

Tools:

- Sentry untuk FE/BE error
- OpenTelemetry optional
- provider logs untuk awal

## Deployment Environments

### Local

- FE local
- BE local
- PostgreSQL local/docker
- storage mock/local

### Staging

- staging DB
- staging storage
- test users
- seeded fake data

### Production

- production DB
- production storage
- strict env
- backup
- monitoring
- domain HTTPS

## Environment Variables

Backend:

```env
NODE_ENV=production
APP_URL=https://app.syncvoca.example
API_URL=https://api.syncvoca.example
DATABASE_URL=postgresql://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
COOKIE_SECRET=...
STORAGE_ENDPOINT=...
STORAGE_BUCKET=...
STORAGE_ACCESS_KEY=...
STORAGE_SECRET_KEY=...
GEMINI_API_KEY=...
SMTP_HOST=...
SMTP_USER=...
SMTP_PASS=...
```

Frontend:

```env
NEXT_PUBLIC_APP_URL=https://app.syncvoca.example
NEXT_PUBLIC_API_URL=https://api.syncvoca.example
NEXT_PUBLIC_ENABLE_PWA=true
```

## Migration Dari Prototype Ke Real Apps

### Yang Bisa Dipakai Ulang

- product flow
- role behavior
- copy utama
- UI direction
- privacy adapter concept
- report payload concept
- task docs
- seed data sebagai fake demo data

### Yang Jangan Dipakai Mentah

- localStorage sebagai database
- frontend-only permission
- mock audit sebagai compliance final
- raw seed sensitive data untuk production
- single component yang terlalu besar tanpa modularisasi

### Mapping Prototype Ke Real

| Prototype | Real Apps |
| --- | --- |
| `src/data.ts` localStorage | PostgreSQL + API service |
| `src/privacy.ts` adapter | backend DUDI Candidate Profile Service |
| `src/report.ts` jsPDF client | backend report worker/service |
| `JourneyWorkspace` role demo | route-based role apps |
| `AppFeedback` | shared UI package |
| `check-dudi-privacy.ts` | privacy regression tests FE/BE |

## Phase Plan

### Phase R0 - Architecture Lock

Output:

- final tech stack
- FE/BE repo structure
- database schema v1
- API contract v1
- RBAC matrix
- privacy policy internal

Acceptance:

- semua role punya data boundary jelas
- DUDI payload tidak memakai student entity mentah
- consent scopes disepakati

### Phase R1 - Backend Foundation

Output:

- project backend
- PostgreSQL + Prisma
- auth login/refresh
- users/roles/organizations
- school and DUDI tenant
- audit log base

Acceptance:

- user bisa login
- role bisa dibaca dari token/session
- audit login tercatat
- tenant scoping berjalan

### Phase R2 - Core School Data

Output:

- students
- support profiles
- guardians
- teacher assignments
- teacher notes
- consent request/approve/revoke

Acceptance:

- guru hanya melihat siswa sekolahnya
- parent hanya melihat anak terkait
- consent state tersimpan dan audited

### Phase R3 - Siswa/Orang Tua PWA

Output:

- siswa mobile home
- mission list
- progress
- portfolio summary
- parent progress
- parent consent view
- PWA manifest/service worker

Acceptance:

- mobile layout usable
- installable PWA
- no sensitive data cached incorrectly

### Phase R4 - Simulation And Evidence

Output:

- mission template
- session submit
- scoring metrics
- evidence item
- curate evidence

Acceptance:

- siswa dapat membuat evidence
- guru dapat curate evidence untuk portfolio
- readiness score terupdate

### Phase R5 - DUDI Public Candidate And Validation

Output:

- DUDI login
- company profile
- job posting
- public candidate endpoint
- validation seal
- DUDI-safe report

Acceptance:

- DUDI tidak bisa akses student internal endpoint
- validation butuh consent
- report aman lolos privacy test

### Phase R6 - Placement Workflow

Output:

- shortlist
- interview/work trial/placed/not ready
- placement events
- school placement monitoring
- follow-up notes

Acceptance:

- placement butuh consent
- status update audited
- guru melihat outcome internal

### Phase R7 - Admin Governance

Output:

- admin dashboard
- consent queue
- audit trail
- blocked validations
- report exports
- placement metrics

Acceptance:

- admin bisa membaca compliance status
- audit dapat difilter
- tidak ada data sensitif di DUDI audit surface

### Phase R8 - Hardening Pilot

Output:

- rate limiting
- backup
- logging
- error tracking
- access review
- privacy regression tests
- staging deployment

Acceptance:

- siap pilot 1 sekolah + 1 DUDI
- data dummy/staging jelas
- deployment reproducible

## MVP Real Apps Scope

### Must Have

- auth + roles
- school tenant
- student profile
- support profile
- teacher notes
- parent link
- consent workflow
- simulation session basic
- evidence portfolio
- DUDI public candidate
- validation seal
- placement pipeline
- audit log
- PWA mobile for siswa/orang tua

### Should Have

- PDF report
- notification
- admin governance dashboard
- file upload evidence
- job matching score

### Could Have

- AI mentor production
- push notification
- Android wrapper
- advanced analytics
- gamification badge system

### Won't Have First

- payment
- full LMS
- native Android rewrite
- complex game engine
- SSO enterprise

## Risiko Dan Mitigasi

### Risiko: Data ABK Bocor Ke DUDI

Mitigasi:

- DUDI DTO service khusus
- privacy regression tests
- backend policy guard
- audit endpoint DUDI terpisah

### Risiko: Scope Terlalu Besar

Mitigasi:

- build per phase
- mulai dari auth + schema + consent
- jangan mulai dari Android native

### Risiko: UI Mobile Siswa Terlalu Rumit

Mitigasi:

- PWA siswa dibuat simple
- 3-5 menu utama
- teks pendek
- action jelas

### Risiko: Consent Tidak Dipahami Pengguna

Mitigasi:

- copy consent sederhana
- scope visual
- status pill
- audit trail internal

### Risiko: Backend Permission Lemah

Mitigasi:

- policy tests
- no raw student object for DUDI
- endpoint-per-role review

## Definition Of Done Real MVP

Real MVP dianggap siap pilot jika:

1. Semua user login dengan role masing-masing.
2. Guru hanya melihat siswa di sekolahnya.
3. Parent hanya melihat anak terkait.
4. DUDI hanya melihat public candidate DTO.
5. Consent gate berjalan di validation dan placement.
6. Audit log tercatat untuk aksi penting.
7. Siswa/Orang Tua mobile PWA usable.
8. DUDI-safe report tidak bocor data privat.
9. Admin bisa melihat governance summary.
10. Build, tests, dan privacy regression lolos.

## Rekomendasi Next Execution

Setelah dokumen ini, langkah berikutnya:

1. Buat struktur repo real apps.
2. Pilih stack final: Next.js/NestJS/PostgreSQL/Prisma atau Vite/Express/PostgreSQL/Prisma.
3. Tulis `docs/DATABASE_SCHEMA.md` lebih formal dari draft ini.
4. Tulis `docs/API_CONTRACT.md`.
5. Implement backend foundation: auth, roles, organizations, audit.
6. Implement FE shell role routing dan PWA baseline.

Rekomendasi teknis paling aman untuk mulai:

```text
Frontend: Next.js + TypeScript + Tailwind + TanStack Query
Backend: NestJS + TypeScript + Prisma
Database: PostgreSQL
Storage: Supabase Storage atau S3/R2
Deployment awal: Vercel + Railway/Supabase
```

Jika ingin lebih cepat dan sederhana:

```text
Frontend: Vite React + TypeScript + Tailwind
Backend: Express modular + Prisma
Database: PostgreSQL
Storage: Supabase Storage
```

Untuk SyncVoca, prioritas teknis awal tetap: backend permission, consent, audit, dan DUDI privacy boundary.
