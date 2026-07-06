# Panduan Eksekusi Tim Real Apps

Dokumen ini membagi pekerjaan real apps SyncVoca Journey agar tim frontend, backend, database, product, QA, dan DevOps bisa berjalan terarah.

## Tujuan

Membangun real apps production-ready dari prototype SyncVoca Journey dengan fokus:

- FE web/PWA
- BE API production
- PostgreSQL schema
- auth dan role access
- DUDI privacy boundary
- consent dan audit
- evidence/portfolio
- validation dan placement workflow

## Prinsip Eksekusi

1. Jangan langsung coding semua fitur tanpa lock schema dan auth.
2. Backend policy harus siap sebelum data real ABK dipakai.
3. Frontend boleh mulai shell dan design system sambil API contract dikunci.
4. Database dan auth menjadi dependency utama.
5. Privacy DUDI wajib dites sejak awal, bukan di akhir.
6. Prototype apps menjadi referensi alur, bukan fondasi production mentah.

## Pembagian Tim

### Product / Lead

Tanggung jawab:

- lock MVP scope
- menjaga narasi ABK dan privacy
- memutuskan prioritas fitur
- review flow lintas role
- memastikan DUDI tidak menjadi user yang melihat data sensitif

Dokumen utama:

- `docs/PRD.md`
- `docs/REAL_IMPLEMENTATION_PLAN.md`
- `docs/team-execution/README.md`

### Frontend Team

Tanggung jawab:

- app shell
- route per role
- design system
- PWA Siswa/Orang Tua
- dashboard Guru/Admin/DUDI
- API integration
- loading/empty/error state
- accessibility

Dokumen utama:

- `docs/frontend/README.md`
- `docs/auth-security/README.md`
- `docs/WEB_DESIGN.md`

### Backend Team

Tanggung jawab:

- API module
- auth/session
- role membership
- policy service
- consent service
- DUDI public candidate service
- report service
- audit service
- storage service

Dokumen utama:

- `docs/backend/README.md`
- `docs/database/README.md`
- `docs/auth-security/README.md`

### Database Team

Tanggung jawab:

- ERD final
- Prisma schema/migration
- seed staging
- indexing
- data classification
- migration order

Dokumen utama:

- `docs/database/README.md`
- `docs/auth-security/README.md`

### QA / Security

Tanggung jawab:

- test plan
- privacy regression
- RBAC regression
- E2E lintas role
- accessibility smoke test
- report/export test

Dokumen utama:

- `docs/auth-security/README.md`
- `docs/prototype-apps/README.md`
- `docs/backend/README.md`
- `docs/frontend/README.md`

### DevOps

Tanggung jawab:

- environment setup
- CI/CD
- database migration pipeline
- object storage
- secrets
- logging/monitoring
- backup

Dokumen utama:

- `docs/backend/README.md`
- `docs/database/README.md`

## Urutan Eksekusi Rekomendasi

### R0 - Architecture Lock

Output:

- keputusan stack
- repo structure final
- API contract draft
- ERD draft
- auth strategy
- role matrix
- deployment target

Owner:

- lead
- FE lead
- BE lead
- DB lead

Definition of done:

- semua tim setuju struktur aplikasi
- tidak ada konflik besar soal Next.js/Vite, NestJS/Express, PostgreSQL/Prisma
- DUDI privacy boundary disepakati

### R1 - Database And Auth Foundation

Output:

- PostgreSQL schema awal
- PostgreSQL Docker local/test setup
- migration awal
- seed roles
- users dan memberships
- auth login/logout/refresh
- `/auth/me`
- policy service skeleton

Owner:

- backend
- database

Dependency:

- R0 selesai

Definition of done:

- user bisa login
- role membership terbaca
- local dev dan integration test memakai PostgreSQL
- route API bisa menolak user tanpa izin
- test auth dasar lulus

### R2 - Frontend Shell And Design System

Output:

- frontend app shell
- login page
- role redirect
- layout mobile PWA
- layout dashboard
- modal/toast custom
- route guard UX
- token/query setup

Owner:

- frontend

Dependency:

- API auth minimal tersedia atau mocked contract tersedia

Definition of done:

- user masuk dashboard sesuai role
- nav per role jelas
- PWA manifest awal tersedia
- UI tidak memakai native alert/confirm/prompt

### R3 - Core School Data

Output:

- school management
- student internal profile
- guardian relation
- teacher assignment
- support profile
- sensitive record boundary
- teacher monitoring list

Owner:

- backend
- frontend
- database

Dependency:

- R1 dan R2

Definition of done:

- guru melihat siswa sesuai assignment/sekolah
- parent hanya melihat anak terkait
- sensitive records tidak keluar ke role yang tidak berhak

### R4 - Journey, Simulation, Evidence, Portfolio

Output:

- mission template
- simulation session
- evidence upload
- evidence curation
- portfolio item
- siswa progress
- parent progress

Owner:

- frontend
- backend
- database

Dependency:

- R3

Definition of done:

- siswa bisa membuat evidence dari simulasi
- guru bisa kurasi evidence
- portfolio publik hanya memakai evidence approved

### R5 - Consent And DUDI Public Candidate

Output:

- consent request/approve/revoke
- consent scope
- DUDI public candidate listing
- DUDI candidate detail
- privacy tests

Owner:

- backend
- frontend
- QA/security

Dependency:

- R4

Definition of done:

- DUDI hanya melihat public candidate DTO
- consent gate berjalan
- DUDI response tidak memuat data privat
- privacy test lulus

### R6 - Industry Validation, Report, Placement

Output:

- industry validation seal
- validation blocked if consent invalid
- DUDI-safe report
- shortlist placement
- placement status update
- school placement outcome monitoring

Owner:

- backend
- frontend
- QA/security

Dependency:

- R5

Definition of done:

- DUDI validation membutuhkan consent aktif
- report dibuat dari public DTO
- placement pipeline mencatat audit
- guru/admin bisa melihat outcome internal

### R7 - Admin Governance And Audit

Output:

- admin dashboard
- consent queue
- audit log
- user/role management
- school/DUDI management
- report center

Owner:

- frontend
- backend

Dependency:

- R1 sampai R6

Definition of done:

- admin bisa review governance tanpa membuka data yang tidak perlu
- audit event penting tercatat
- role assignment aman

### R8 - Pilot Hardening

Output:

- E2E flow
- accessibility pass
- performance pass
- security regression
- backup setup
- staging deployment
- production readiness checklist

Owner:

- semua tim

Dependency:

- R7

Definition of done:

- pilot sekolah/DUDI bisa jalan dengan data dummy/staging
- data real belum dipakai sebelum security sign-off
- privacy regression lulus

## Dependency Map

```text
R0 Architecture Lock
  -> R1 Database/Auth
  -> R2 Frontend Shell
  -> R3 Core School Data
  -> R4 Journey/Evidence
  -> R5 Consent/DUDI Public Candidate
  -> R6 Validation/Report/Placement
  -> R7 Admin Governance/Audit
  -> R8 Pilot Hardening
```

## Task Breakdown Awal

### Product

- finalkan MVP real apps
- finalkan copy role
- finalkan consent scope
- finalkan DUDI allowed data
- finalkan pilot scenario

### Frontend

- setup app
- setup design tokens
- setup auth route
- setup role layout
- setup PWA baseline
- build Siswa shell
- build Orang Tua shell
- build Guru dashboard shell
- build DUDI dashboard shell
- build Admin dashboard shell

### Backend

- setup API
- setup config/env
- setup Prisma
- setup auth
- setup membership
- setup policy service
- setup audit middleware
- setup consent service
- setup DUDI candidate service
- setup report service

### Database

- final ERD
- setup PostgreSQL Docker local/test
- create schema
- create migration
- create seed roles
- create seed staging
- review indexes
- review sensitive data separation

### QA

- create privacy test checklist
- create RBAC test checklist
- create E2E critical path
- create accessibility smoke checklist
- create API regression tests

## Branch / PR Rule

Saran:

- satu PR per vertical slice kecil
- jangan campur schema besar, UI besar, dan auth besar dalam satu PR
- setiap PR yang menyentuh DUDI data wajib menyertakan privacy test
- setiap PR yang menyentuh consent wajib menyertakan audit test
- setiap PR yang menyentuh schema wajib menyertakan migration dan seed impact

## Definition Of Done Umum

Sebuah task real apps dianggap selesai jika:

- kode sesuai dokumen area terkait
- API contract jelas
- role access diuji
- error/loading/empty state tersedia untuk UI
- audit event tersedia untuk action penting
- tidak ada data privat bocor ke DUDI
- test minimal berjalan
- dokumentasi diperbarui jika ada perubahan keputusan

## Risiko Utama

### Scope terlalu besar

Mitigasi:

- lock MVP
- kerjakan vertical slice
- tunda fitur native Android, payment, AI kompleks

### Privacy DUDI bocor

Mitigasi:

- public DTO khusus
- backend policy
- privacy test
- deny-by-default field mapper

### Database berubah di tengah

Mitigasi:

- final ERD dulu
- migration order
- review FE/BE sebelum implementasi besar

### FE dan BE tidak sinkron

Mitigasi:

- API contract ditulis awal
- mock server atau typed client
- DTO shared package

## Rekomendasi Next Execution

Urutan paling aman setelah dokumen ini:

1. Buat `docs/database/ERD.md` atau langsung `prisma/schema.prisma` draft.
2. Buat `docs/backend/API_CONTRACT.md`.
3. Buat `docs/auth-security/RBAC_MATRIX.md`.
4. Lock repo structure real apps.
5. Mulai implementasi R1: database, auth, role membership, dan policy service.
