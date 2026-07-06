# Panduan Frontend Real Apps

Dokumen ini menjadi panduan tim frontend saat membangun SyncVoca Journey real apps. Fokusnya adalah web-first, mobile-friendly PWA untuk Siswa dan Orang Tua, serta dashboard web untuk Guru, Admin, dan DUDI.

## Keputusan Utama

1. Frontend real apps dibangun web-first.
2. Siswa dan Orang Tua harus nyaman dipakai di HP dan PWA-ready.
3. Guru, Admin, dan DUDI memakai dashboard web responsif.
4. Fase awal disarankan memakai satu frontend dengan role routing.
5. Frontend tidak boleh menjadi satu-satunya lapisan security.
6. Semua data role harus berasal dari API yang sudah difilter backend.

## Stack Rekomendasi

Pilihan utama:

- TypeScript
- Next.js atau React + Vite
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Zustand atau Jotai untuk UI state ringan
- PWA plugin sesuai framework

Rekomendasi praktis:

- Gunakan Next.js jika landing, dashboard, auth, dan app ingin ada dalam satu platform production dengan routing kuat.
- Gunakan Vite React jika tim ingin SPA yang sederhana dan cepat.

Untuk MVP production, keduanya bisa. Yang lebih penting adalah API contract, auth, role access, dan privacy boundary tidak ditunda.

## Struktur Aplikasi Frontend

Rekomendasi awal:

```text
apps/web/
  src/
    app/
      login/
      siswa/
      orang-tua/
      guru/
      dudi/
      admin/
    features/
      auth/
      onboarding/
      student-journey/
      parent-progress/
      teacher-monitoring/
      dudi-candidates/
      admin-governance/
      reports/
      notifications/
    components/
      layout/
      feedback/
      forms/
      data-display/
      navigation/
    lib/
      api/
      auth/
      query/
      privacy/
      routes/
    styles/
      globals.css
```

Jika memakai Vite, struktur bisa tetap mirip dengan `src/routes` dan `src/features`.

## Route Utama

```text
/login
/forgot-password
/accept-invite

/siswa
/siswa/journey
/siswa/simulasi
/siswa/portofolio
/siswa/notifikasi

/orang-tua
/orang-tua/progres
/orang-tua/dukungan-rumah
/orang-tua/persetujuan

/guru
/guru/siswa
/guru/siswa/:studentId
/guru/consent
/guru/simulasi
/guru/placement
/guru/laporan

/dudi
/dudi/kandidat
/dudi/kandidat/:candidateCode
/dudi/lowongan
/dudi/validasi
/dudi/placement

/admin
/admin/overview
/admin/users
/admin/schools
/admin/dudi
/admin/consent
/admin/audit
/admin/reports
```

## Role Experience

### Siswa

Prioritas:

- mobile-first
- instruksi singkat
- tombol besar dan jelas
- progress terlihat
- simulasi kerja ringan
- portofolio pribadi
- feedback positif tanpa menghakimi

Fitur utama:

- dashboard hari ini
- latihan/simulasi berikutnya
- progress journey score
- daftar evidence
- portofolio
- notifikasi guru
- mode aksesibilitas

### Orang Tua

Prioritas:

- bahasa sederhana
- ringkasan perkembangan
- rekomendasi dukungan rumah
- consent dan persetujuan yang mudah dipahami
- tidak terlalu banyak istilah teknis

Fitur utama:

- ringkasan progres anak
- tugas dukungan rumah
- status consent
- riwayat update guru
- notifikasi penting

### Guru

Prioritas:

- efisiensi monitoring banyak siswa
- filter dan pencarian cepat
- catatan pendampingan
- consent workflow
- follow-up placement

Fitur utama:

- daftar siswa
- detail siswa
- progress per tahap
- catatan guru
- consent queue
- rekomendasi latihan
- outcome DUDI
- export laporan internal

### DUDI

Prioritas:

- melihat kandidat berbasis bukti
- tidak melihat data sensitif
- shortlist dan validation flow jelas
- report aman

Fitur utama:

- talent pool pseudonim
- detail kandidat publik
- evidence dan skill
- kebutuhan akomodasi kerja
- consent status
- industry validation seal
- shortlist pipeline
- DUDI-safe report

### Admin

Prioritas:

- governance
- user management
- school/DUDI management
- audit
- consent oversight
- data master

Fitur utama:

- overview tenant
- user dan role membership
- school management
- DUDI company management
- consent governance
- audit log
- report center
- system configuration

## Layout Strategy

Gunakan layout berbeda per jenis role.

### Mobile PWA Layout

Untuk Siswa dan Orang Tua:

- bottom navigation maksimal 4-5 item
- header pendek
- CTA utama terlihat di first viewport
- kartu ringkas
- stepper journey
- tidak ada tabel lebar
- gunakan list, progress, dan accordion

### Dashboard Layout

Untuk Guru, Admin, dan DUDI:

- sidebar atau top navigation
- tabel responsif
- filter jelas
- summary metrics
- detail drawer atau detail page
- action button kontekstual
- audit dan status mudah ditemukan

## Design System

Frontend harus mempertahankan arah visual SyncVoca:

- clean
- cerah
- hijau untuk growth/progress
- kuning untuk achievement
- biru sebagai aksen brand
- putih atau off-white sebagai background utama
- teks gelap hanya di background terang
- jangan membuat kombinasi teks hitam di background hijau tua
- gunakan custom modal/toast, bukan native browser alert

Komponen wajib:

- Button
- IconButton
- Input
- Select
- Textarea
- Checkbox
- Toggle
- SegmentedControl
- Modal
- Toast
- Drawer
- Tabs
- Stepper
- DataTable
- EmptyState
- LoadingState
- ErrorState
- StatusBadge
- ConsentBadge
- AuditTimeline

## Data Fetching

Gunakan TanStack Query atau pola setara.

Aturan:

- setiap endpoint punya query key jelas
- mutation invalidates query terkait
- optimistic update hanya untuk aksi rendah risiko
- aksi consent, validation, placement, dan role update tidak boleh optimistic tanpa rollback jelas
- data DUDI harus berasal dari endpoint DUDI public candidate, bukan endpoint internal siswa
- cache harus dibersihkan saat logout atau ganti tenant

Contoh query key:

```text
['me']
['student', studentId]
['student-evidence', studentId]
['teacher-students', schoolId, filters]
['dudi-candidates', companyId, filters]
['admin-audit', tenantId, filters]
```

## Auth Integration

Frontend harus:

- membaca `/auth/me` setelah login
- menyimpan access token sesuai keputusan backend
- memanggil refresh flow jika access token expired
- menghapus cache saat logout
- redirect berdasarkan active role
- menolak route yang tidak sesuai role secara UI
- tetap menganggap backend sebagai sumber izin final

Frontend tidak boleh:

- menampilkan role hanya dari localStorage tanpa validasi server
- mengandalkan hidden component sebagai security
- menyimpan data sensitif siswa di persistent localStorage
- cache report DUDI berisi data privat

## PWA Requirements

PWA wajib untuk Siswa dan Orang Tua.

Minimum requirement:

- manifest valid
- app icon
- theme color sesuai brand
- install prompt friendly
- offline fallback page
- cache static asset
- network-first untuk data user
- clear cache on logout

Caching policy:

| Jenis Data | Policy |
| --- | --- |
| asset public | cache-first |
| app shell | stale-while-revalidate |
| profile user | network-first |
| data siswa | network-first, short cache |
| data DUDI | network-first |
| audit/consent | no-store atau network-only |
| report/export | no-store |

## Accessibility

Minimum:

- keyboard navigable
- visible focus ring
- contrast aman
- teks tidak overlap
- ukuran tombol mobile memadai
- label form jelas
- error form dibaca screen reader
- mode aksesibilitas tetap tersedia
- jangan memakai warna saja untuk status

Untuk real apps, targetkan WCAG 2.2 AA sebagai baseline.

## Performance Budget

Target awal:

- initial JS per role tidak terlalu besar
- code splitting per role
- lazy load dashboard berat
- image optimized
- table virtualized jika data besar
- skeleton loading untuk request lambat
- hindari render ulang besar pada list siswa/kandidat

Rule:

- role Siswa dan Orang Tua harus terasa ringan di HP kelas menengah.
- role dashboard boleh lebih kaya fitur, tetapi tetap perlu pagination/filter server-side.

## Error And Feedback

Gunakan feedback konsisten:

- success toast untuk aksi berhasil
- warning toast untuk aksi yang butuh perhatian
- modal confirmation untuk aksi besar
- inline error untuk form
- empty state untuk data kosong
- retry action untuk fetch gagal

Jangan memakai:

- `alert`
- `confirm`
- `prompt`

## Testing Frontend

Minimum:

- unit test untuk helper privacy dan format data
- component test untuk form kritis
- route guard test
- integration test untuk flow login dan role redirect
- E2E test untuk:
  - siswa menyelesaikan simulasi
  - guru approve consent
  - DUDI melihat kandidat publik
  - DUDI gagal validasi jika consent belum aktif
  - admin melihat audit

Privacy test FE:

- DUDI route tidak render nama siswa
- DUDI route tidak render nama sekolah spesifik
- DUDI route tidak render kontak wali
- DUDI route tidak render medical notes
- export preview DUDI memakai public payload

## Migrasi Dari Prototype

Yang bisa dipakai sebagai referensi:

- alur landing
- copy value proposition
- journey 5 tahap
- custom modal/toast pattern
- visual direction
- DUDI-safe payload concept
- report content concept
- privacy test concept

Yang tidak boleh dipakai mentah-mentah:

- localStorage sebagai data source
- role switch demo sebagai auth
- data demo sebagai production data
- client-side filtering sebagai security

## Deliverable Frontend MVP

Frontend MVP dianggap siap pilot jika:

- login dan role redirect berjalan
- Siswa PWA punya journey dan evidence basic
- Orang Tua bisa membaca progress dan consent
- Guru bisa monitoring siswa dan kelola consent
- DUDI hanya melihat kandidat publik
- Admin bisa melihat governance dan audit
- semua route punya loading, empty, error state
- PWA installable untuk mobile role
- tidak ada native browser alert
- DUDI privacy test lulus
