# SyncVoca Journey Prototype Apps

SyncVoca Journey adalah prototype aplikasi web untuk platform transisi vokasi inklusif bagi Anak Berkebutuhan Khusus (ABK). Prototype ini dibuat untuk menjelaskan alur produk, nilai bisnis, batas privasi data, dan pengalaman demo lintas peran sebelum masuk ke pembangunan real apps.

Repo ini bukan aplikasi production final. Repo ini adalah demo MVP/prototype apps yang memakai data lokal di browser untuk membuktikan workflow produk.

## Apa Fungsi Aplikasi Ini?

SyncVoca Journey membantu sekolah, keluarga, dan DUDI membaca potensi ABK melalui bukti kerja, bukan label personal. Alur utamanya:

1. Intake Dukungan
2. Simulasi Kerja
3. Rencana Pendampingan
4. Portofolio Bukti
5. Validasi DUDI

Output yang ingin ditunjukkan:

- journey score siswa
- evidence hasil simulasi kerja
- portofolio kompetensi ABK
- consent sekolah/wali
- privacy wall antara data internal dan data DUDI
- Industry Validation Seal
- DUDI-safe report export
- shortlist dan placement pipeline
- monitoring tindak lanjut sekolah setelah outcome DUDI

## Status Project

Status saat ini: prototype apps/demo MVP untuk lomba dan validasi konsep.

Yang sudah ada:

- landing page dengan narasi ABK
- role workspace untuk Siswa, Guru, Orang Tua, DUDI, dan Admin
- tema visual clean, cerah, hijau-kuning, dengan aksen biru dari logo
- data model demo ABK
- DUDI privacy adapter
- consent gate
- audit log
- export PDF aman untuk DUDI
- Admin governance center
- DUDI shortlist dan placement workflow
- School placement outcome monitoring untuk Guru/Admin
- custom modal/toast agar tidak memakai alert bawaan browser
- privacy test untuk memastikan data privat tidak bocor ke DUDI

Yang belum production:

- backend database produksi
- login multi-user sungguhan
- role-based access control di server
- storage portfolio/evidence production
- deployment production dengan security hardening
- integrasi payment/subscription/placement fee
- audit WCAG formal

## Peran Dalam Demo

### Siswa ABK

Fokus pada latihan simulasi kerja, journey score, bukti kompetensi, dan portofolio.

### Guru

Fokus pada monitoring siswa, catatan pendampingan, consent, dan tindak lanjut outcome DUDI.

### Orang Tua

Fokus pada ringkasan perkembangan, dukungan rumah, dan langkah pendampingan sederhana.

### DUDI

Fokus pada talent pool berbasis bukti, bukan data privat. DUDI hanya melihat:

- kode kandidat pseudonim
- skill
- readiness score
- evidence simulasi
- kebutuhan akomodasi kerja
- consent status
- Industry Validation Seal
- placement pipeline publik

DUDI tidak boleh melihat:

- nama lengkap siswa
- nama sekolah spesifik
- kontak wali
- catatan medis
- latar keluarga
- catatan pendamping internal
- `sensitiveData`

### Admin

Fokus pada governance demo: consent queue, audit trail, validasi yang diblokir, report aman, placement pipeline, dan batas role visibility.

## Prototype vs Real Apps

Repo ini disebut prototype apps.

Untuk real apps nanti, arahnya:

- frontend production web-first
- Siswa dan Orang Tua dibuat mobile-friendly dan PWA-ready
- Guru, Admin, dan DUDI tetap cocok sebagai dashboard web
- backend production wajib untuk auth, database, permission, consent, audit, storage, job, validation, placement, dan report
- Android native belum wajib pada tahap ini
- Android bisa menjadi wrapper/distribution channel nanti jika perlu Play Store

Dengan kata lain, prototype ini menjadi acuan product flow dan UI. Real apps perlu FE production + BE production.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Express server
- Gemini API untuk AI career mentor
- jsPDF untuk export report
- localStorage untuk penyimpanan data demo

## Struktur Penting

```text
docs/
  PRD.md
  TASKS.md
  WEB_DESIGN.md
  *.pdf

src/
  App.tsx
  data.ts
  types.ts
  privacy.ts
  report.ts
  components/
    LandingPage.tsx
    JourneyWorkspace.tsx
    AppFeedback.tsx
    AccessibilityPanel.tsx
  utils/
    scroll.ts

scripts/
  check-dudi-privacy.ts

public/
  syncvoca-logo.png
  manifest.json
  sw.js
```

## Dokumen Acuan

- `docs/README.md`: peta dokumentasi tim dan aturan penempatan panduan.
- `docs/PRD.md`: arah produk, scope MVP, privacy boundary, dan workflow.
- `docs/WEB_DESIGN.md`: aturan desain web, warna, popup, role UI, dan UX.
- `docs/TASKS.md`: task breakdown dan status pengerjaan.
- `docs/REAL_IMPLEMENTATION_PLAN.md`: master plan real apps FE PWA + BE production.
- `docs/prototype-apps/README.md`: panduan batas kerja repo prototype apps.
- `docs/frontend/README.md`: panduan frontend real apps web/PWA.
- `docs/backend/README.md`: panduan backend production.
- `docs/database/README.md`: panduan database schema production.
- `docs/database/ERD.md`: ERD teknis, normalisasi database, dan PostgreSQL Docker local.
- `docs/auth-security/README.md`: panduan auth, RBAC, privacy, consent, dan DUDI visibility.
- `docs/team-execution/README.md`: panduan pembagian kerja dan urutan eksekusi tim.
- `docs/Proposal SyncVoca Journey.pdf`: proposal awal.
- `docs/Revisi Proposal ATM.pdf`: revisi arah ABK.
- `docs/BMC & RAB.pdf`: business model dan anggaran.

## Cara Menjalankan

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

## Environment

Mentor AI memakai Gemini API. Buat `.env` atau `.env.local` sesuai kebutuhan runtime:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="http://localhost:3000"
```

Tanpa `GEMINI_API_KEY`, UI utama tetap bisa dipakai untuk demo, tetapi endpoint mentor AI dapat gagal ketika dipanggil.

## Script

```bash
npm run dev
```

Menjalankan Express + Vite dev server.

```bash
npm run lint
```

Menjalankan TypeScript check tanpa emit.

```bash
npm run test:privacy
```

Memastikan payload DUDI, report DUDI, dan placement surface tidak membocorkan data privat siswa.

```bash
npm run build
```

Build frontend Vite dan bundle Express server ke `dist/`.

```bash
npm run start
```

Menjalankan hasil build production dari `dist/server.cjs`.

## Privacy Test

Privacy test berada di:

```text
scripts/check-dudi-privacy.ts
```

Test ini penting karena SyncVoca membawa data ABK. DUDI hanya boleh menerima payload publik yang sudah dipseudonimkan. Jika ada nama siswa, sekolah spesifik, kontak wali, catatan medis, atau field privat bocor ke surface DUDI, test harus gagal.

## Data Demo

Data demo berada di:

```text
src/data.ts
```

Data disimpan ke localStorage agar demo terasa interaktif. Tombol reset demo akan menghapus localStorage dan mengembalikan seed awal.

Catatan: localStorage hanya untuk prototype. Real apps harus memakai database dan backend permission.

## Fitur Utama

### Landing Page

Menjelaskan value proposition SyncVoca Journey sebagai ekosistem vokasi inklusif ABK.

### Journey Workspace

Satu alur utama lintas role:

- Intake Dukungan
- Simulasi Kerja
- Rencana Pendampingan
- Portofolio Bukti
- Validasi DUDI

### DUDI Privacy Boundary

Data internal siswa diubah menjadi `DudiCandidateProfile` melalui:

```text
src/privacy.ts
```

### DUDI-Safe Report

Report PDF aman dibuat dari payload publik, bukan dari `StudentProfile` penuh:

```text
src/report.ts
```

### Consent Gate

DUDI tidak bisa menerbitkan validation seal atau shortlist placement jika consent belum aktif.

### Audit Log

Action penting dicatat, seperti:

- consent requested
- consent approved
- consent revoked
- industry validation issued
- industry validation blocked
- DUDI-safe report exported
- candidate shortlisted
- placement status updated
- placement shortlist blocked

### Placement Workflow

DUDI dapat memasukkan kandidat ke pipeline:

- Shortlisted
- Interview
- Work Trial
- Placed
- Not Ready

Guru/Admin dapat membaca outcome ini dan membuat catatan follow-up internal.

## Apakah Pengerjaan Repo Prototype Ini Sudah Selesai?

Untuk scope prototype apps di repo `v2`, pekerjaan utama sudah selesai:

- product flow sudah terbentuk
- UI role sudah refactor
- privacy boundary sudah ada
- consent dan audit sudah ada
- DUDI report sudah ada
- placement workflow sudah ada
- monitoring internal Guru/Admin sudah ada
- docs utama sudah tersedia
- validasi build/type/privacy sudah tersedia

Yang tersisa untuk repo prototype ini hanya polishing jika dibutuhkan:

- final demo readiness pass
- cek mobile layout lebih detail
- cek high contrast mode manual
- rapikan copy kecil untuk presentasi
- screenshot/demo script untuk lomba

## Next Step Setelah Prototype

Next step utama bukan menambah banyak fitur demo lagi, tetapi mulai menyiapkan real apps.

Rencana real apps sudah ditulis sebagai master plan di:

```text
docs/REAL_IMPLEMENTATION_PLAN.md
```

Untuk eksekusi tim, gunakan panduan modular:

```text
docs/README.md
docs/prototype-apps/README.md
docs/frontend/README.md
docs/backend/README.md
docs/database/README.md
docs/database/ERD.md
docs/auth-security/README.md
docs/team-execution/README.md
```

Rekomendasi urutan berikutnya:

1. Review dan lock `docs/REAL_IMPLEMENTATION_PLAN.md`.
2. Review panduan modular di `docs/README.md`.
3. Finalkan database schema production dari `docs/database/README.md` dan `docs/database/ERD.md`.
4. Finalkan auth, RBAC, consent, dan DUDI privacy dari `docs/auth-security/README.md`.
5. Finalkan API contract dari `docs/backend/README.md`.
6. Finalkan frontend PWA/dashboard split dari `docs/frontend/README.md`.
7. Mulai implementasi real apps dari R1 di `docs/team-execution/README.md`.

## Catatan Untuk Pengembangan Lanjutan

Jangan jadikan repo ini sebagai backend production dengan localStorage. Pertahankan repo ini sebagai prototype dan product reference. Untuk real apps, bangun fondasi FE/BE yang lebih tepat dengan database, auth, permission, audit, dan storage yang benar.
