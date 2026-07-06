# Task Breakdown SyncVoca Journey

## Phase 0 - Goal Lock

- [x] Pahami dokumen proposal, SWOT, BMC/RAB, dan revisi ATM.
- [x] Tetapkan arah baru dari disabilitas menjadi ABK.
- [x] Siapkan PRD, task breakdown, dan design direction.
- [x] Review cepat bersama user sebelum refactor besar.

## Phase 1 - Brand And Content Alignment

- [x] Simpan logo resmi ke aset publik dan gunakan di header/landing.
- [x] Update metadata app dan PWA manifest ke narasi ABK.
- [x] Ganti istilah utama:
  - "siswa disabilitas" -> "siswa ABK"
  - "jenis disabilitas" -> "profil dukungan" atau "kebutuhan dukungan"
  - "SLB" saja -> "SLB/sekolah inklusi"
  - "ramah difabel" -> "ramah ABK dan aksesibel"
- [x] Pastikan disabilitas tetap disebut sebagai bagian cakupan ABK, bukan dihapus total.
- [x] Update copy landing page agar langsung menjelaskan nilai produk.

## Phase 2 - Product Flow Refactor

- [x] Sederhanakan landing page menjadi 4 bagian utama:
  - Hero brand dan value proposition
  - Alur 5 tahap transisi vokasi
  - Preview portofolio dan validation seal
  - Pilihan portal role demo
- [x] Jadikan CTA utama "Mulai Demo" atau "Masuk Portal Demo".
- [x] Buat portal role lebih jelas:
  - Siswa: latihan dan portofolio
  - Guru: monitoring dan catatan
  - Orang Tua: pendampingan rumah
  - DUDI: talent pool dan validasi
  - Admin: data master demo
- [x] Kurangi istilah teknis di layar awal, pindahkan detail teknis ke badge atau section sekunder.

## Phase 2A - Landing Conversion And Demo Clarity

- [x] Analisis `Proposal_SyncVoca_Journey_ABK.pdf` sebagai acuan narasi ABK terbaru.
- [x] Analisis BMC versi ABK sebagai acuan ecosystem proof, partner, customer segment, dan revenue sustainability.
- [x] Ubah hero menjadi output-oriented: bukti kerja ABK, portofolio, validation seal, dan privacy wall.
- [x] Tambahkan quick role entry di first viewport agar demo lebih cepat dicoba.
- [x] Samakan nama tahap landing dengan `JourneyWorkspace`:
  - Intake Dukungan
  - Simulasi Kerja
  - Rencana Pendampingan
  - Portofolio Bukti
  - Validasi DUDI
- [x] Tambahkan proof section berbasis artefak produk:
  - ABK Talent Portfolio
  - Industry Validation Seal
  - UDL + WCAG 2.2 + ICF-WHO
- [x] Tambahkan BMC ecosystem signal tanpa membuat ABK/keluarga terlihat sebagai objek komersial.

## Phase 3 - Data Model And Demo Data

- [x] Rename konsep `disabilityType` menjadi konsep yang lebih tepat, misalnya `supportProfile`.
- [x] Rename `disabilitySupports` pada lowongan menjadi `accommodationSupports` atau `supportedProfiles`.
- [x] Update seed data agar mencakup:
  - hambatan pendengaran/wicara
  - hambatan mobilitas
  - hambatan intelektual ringan
  - neurodivergent seperti autisme/ADHD/disleksia
- [x] Pisahkan data:
  - publik untuk DUDI: skill, minat, skor, kebutuhan akomodasi kerja
  - privat: catatan medis, keluarga, catatan pendamping sensitif
- [x] Audit semua tampilan DUDI agar tidak menampilkan data privat.

## Phase 3A - DUDI Privacy And Role Visibility Hardening

- [x] Tambahkan tipe `DudiCandidateProfile` sebagai payload publik khusus DUDI.
- [x] Tambahkan `createDudiCandidateProfiles` di `src/privacy.ts` sebagai adapter dari data internal ke data DUDI.
- [x] Pseudonimkan identitas kandidat dengan kode `ABK-XX-XXXX`.
- [x] Hilangkan nama siswa, sekolah spesifik, `supportProfile`, `bio`, dan `sensitiveData` dari payload DUDI.
- [x] Batasi role DUDI di `JourneyWorkspace` hanya ke `Portofolio Bukti` dan `Validasi DUDI`.
- [x] Update `DudiDashboard` legacy agar tetap memakai payload publik.
- [x] Tambahkan `npm run test:privacy` untuk memastikan payload DUDI tidak membocorkan field privat.

## Phase 3B - Consent Gate And Audit Log

- [x] Tambahkan model `StudentConsent` untuk status persetujuan sekolah/wali.
- [x] Tambahkan model `AuditEvent` untuk mencatat aksi penting DUDI.
- [x] Seed consent demo: kandidat approved dan pending agar alur validasi/blocked bisa didemokan.
- [x] Tambahkan status consent ke `DudiCandidateProfile` tanpa membawa data wali/sekolah spesifik ke DUDI.
- [x] Enforce `industry-validation` consent sebelum DUDI menerbitkan `Industry Validation Seal`.
- [x] Catat audit event `industry_validation_issued` saat seal berhasil terbit.
- [x] Catat audit event `industry_validation_blocked` saat consent belum aktif.
- [x] Tampilkan consent status dan audit trail ringkas di role DUDI.
- [x] Perluas `npm run test:privacy` agar ikut mengecek data consent tidak bocor ke payload DUDI.

## Phase 3C - Admin/Guru Consent Management UI

- [x] Tambahkan handler `onUpdateConsent` untuk request, approve, dan revoke consent.
- [x] Simpan perubahan consent ke localStorage demo.
- [x] Catat audit event `consent_requested`, `consent_approved`, dan `consent_revoked`.
- [x] Tampilkan panel consent management di stage `Intake Dukungan` untuk Guru/Admin.
- [x] Tampilkan status consent, scope, update time, dan audit consent per siswa.
- [x] Pastikan ringkasan audit tetap memakai kode kandidat/payload aman saat dapat terlihat oleh DUDI.

## Phase 3D - DUDI-Safe Report Export

- [x] Tambahkan helper `src/report.ts` untuk membangun report dari `DudiCandidateProfile`.
- [x] Tambahkan payload report yang hanya berisi kode kandidat, evidence, akomodasi kerja, consent, seal, dan audit publik.
- [x] Tambahkan export PDF dengan `jspdf`.
- [x] Tambahkan tombol `Export Report Aman` di header role DUDI.
- [x] Catat audit event `dudi_safe_report_exported` saat report diekspor.
- [x] Perluas `npm run test:privacy` agar teks report juga dicek dari field privat.

## Phase 3E - Admin Governance And Audit Center

- [x] Tambahkan pusat governance khusus Admin setelah stage aktif di `JourneyWorkspace`.
- [x] Tampilkan metrik consent validasi aktif, consent butuh tindak lanjut, validasi diblokir, seal terbit, dan report aman diekspor.
- [x] Tambahkan consent queue lintas siswa dengan aksi `Request`, `Approve`, dan `Revoke`.
- [x] Tampilkan recent audit trail dengan ringkasan aman, aktor, action, dan timestamp.
- [x] Dokumentasikan role visibility policy di panel Admin supaya batas data DUDI tetap jelas.
- [x] Gunakan data turunan berbasis `useMemo` agar panel governance tetap ringan.

## Phase 3F - DUDI Shortlist And Placement Workflow

- [x] Tambahkan model `DudiPlacementRecord` dan status pipeline `shortlisted`, `interview`, `work_trial`, `placed`, dan `not_ready`.
- [x] Tambahkan seed placement awal agar demo langsung menunjukkan pipeline follow-up DUDI.
- [x] Tambahkan storage local demo untuk placement pipeline.
- [x] Tambahkan consent gate untuk aksi shortlist DUDI.
- [x] Catat audit event `placement_shortlist_blocked` saat consent belum aktif.
- [x] Catat audit event `candidate_shortlisted` saat kandidat masuk pipeline.
- [x] Catat audit event `placement_status_updated` saat status pipeline berubah.
- [x] Tambahkan panel `Shortlist & placement pipeline` di stage `Validasi DUDI`.
- [x] Tambahkan metrik placement pipeline di Admin governance center.
- [x] Perluas `npm run test:privacy` agar surface placement ikut dicek dari data privat.

## Phase 3G - School Placement Outcome Monitoring

- [x] Tambahkan panel `Placement outcome monitoring` untuk Guru/Admin setelah stage aktif.
- [x] Tampilkan ringkasan pipeline aktif, placed, dan butuh dukungan.
- [x] Tampilkan outcome DUDI untuk siswa terpilih: lowongan, perusahaan, kode kandidat publik, status, update time, dan rencana tindak lanjut sekolah.
- [x] Tambahkan aksi `Catat Follow-up` yang menyimpan `TeacherNote` internal kategori `Saran`.
- [x] Tambahkan snapshot pipeline lintas siswa untuk monitoring Guru/Admin.
- [x] Tambahkan boundary copy bahwa nama siswa dan catatan pendamping tetap internal Guru/Admin.
- [x] Gunakan `useMemo` untuk turunan placement agar panel tetap ringan.

## Phase 4 - Dashboard Refactor

- [x] Siswa Dashboard:
  - fokuskan top area pada skor kesiapan, latihan berikutnya, dan portofolio
  - update mentor AI welcome message ke bahasa ABK
  - update suggested questions
  - update PDF export label
- [x] Guru Dashboard:
  - ubah filter dari disabilitas ke profil dukungan
  - tampilkan rekomendasi latihan dan catatan pendampingan
  - gunakan bahasa sekolah inklusi/SLB
- [x] Orang Tua Dashboard:
  - sederhanakan istilah
  - tampilkan tugas rumah sebagai checklist praktis
  - tampilkan progres dengan bahasa yang lebih empatik
- [x] DUDI Dashboard:
  - ubah narasi menjadi pencarian talenta ABK berbasis bukti
  - tampilkan kebutuhan akomodasi kerja, bukan diagnosis privat
  - pertegas validation seal sebagai bukti kompetensi
- [x] Admin Dashboard:
  - ubah label Master SLB menjadi Master Sekolah
  - ubah field Jenis Disabilitas menjadi Profil Dukungan ABK
  - tambah opsi profil neurodivergent

Catatan implementasi: experience utama tidak lagi memakai dashboard lama sebagai alur utama. `src/components/JourneyWorkspace.tsx` menggantikan role dashboard dengan satu alur journey: Intake Dukungan -> Simulasi Kerja -> Rencana Pendampingan -> Portofolio Bukti -> Validasi DUDI.

## Phase 5 - Visual Design Refactor

- [x] Ubah tema utama dari dark bento menjadi clean bright dashboard.
- [x] Gunakan palet:
  - putih sebagai background utama
  - hijau sebagai warna growth/progress
  - kuning sebagai aksen achievement
  - biru dari logo sebagai warna link/brand support
- [x] Gunakan card ringan, radius sedang, shadow halus, dan border tipis.
- [x] Pastikan layout tidak terlalu ramai walaupun logo penuh warna.
- [x] Pertahankan high contrast mode untuk aksesibilitas.
- [x] Pastikan tampilan mobile tidak overflow.

## Phase 5A - Feedback And Popup Consistency

- [x] Hilangkan native browser `alert`, `confirm`, dan `prompt` dari UI.
- [x] Tambahkan `AppFeedbackProvider` sebagai standar feedback global.
- [x] Ganti reset demo menjadi branded confirmation modal.
- [x] Ganti feedback sukses dashboard menjadi toast SyncVoca.
- [x] Ganti peringatan game/PWA menjadi toast warning yang tidak memakai desain browser default.
- [x] Dokumentasikan aturan popup/toast di `docs/WEB_DESIGN.md`.

## Phase 5B - Navigation State And Scroll Reset

- [x] Tambahkan helper `scrollToTopInstant` untuk memaksa scroll top tanpa smooth transition.
- [x] Reset posisi scroll saat user pindah role dari bottom navigation atau header.
- [x] Reset posisi scroll saat user pindah stage journey.
- [x] Reset posisi scroll saat user memilih siswa/kandidat lain.
- [x] Dokumentasikan aturan top reset di PRD dan design direction.

## Phase 6 - QA And Validation

- [x] Jalankan `npm run lint`.
- [x] Jalankan `npm run build`.
- [x] Cek hasil source search untuk istilah lama:
  - `disabilitas`
  - `disabilityType`
  - `disabilitySupports`
  - `SLB` yang harusnya jadi `SLB/sekolah inklusi`
- [x] Cek manual alur demo per role.
- [x] Jika diminta, jalankan browser QA untuk screenshot desktop dan mobile.

Catatan QA: kata "disabilitas" boleh muncul hanya sebagai cakupan ABK. Istilah teknis lama `disabilityType` dan `disabilitySupports` hanya boleh tersisa pada migrasi localStorage legacy yang tersembunyi dari UI.

## Priority Order

1. Brand, copy, dan aset logo.
2. Landing page dan alur role.
3. Data model ABK dan seed data.
4. Dashboard siswa, guru, orang tua, DUDI, admin.
5. Build/typecheck dan QA.
