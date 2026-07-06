# Design Context SyncVoca Journey

Dokumen ini menyimpan konteks analisis desain untuk pembuatan halaman frontend real apps SyncVoca Journey. Gunakan dokumen ini sebagai acuan sebelum slicing UI, terutama agar halaman baru tetap selaras dengan `docs/`, prototype saat ini, dan batas privacy DUDI.

Catatan penamaan: file ini memakai nama `design.md`, bukan `desing.md`, karena `desing` adalah typo. Folder tetap memakai Bahasa Indonesia: `docs/desain/`.

## Tujuan Dokumen

1. Menyatukan arahan desain dari `docs/PRD.md`, `docs/WEB_DESIGN.md`, `docs/frontend/README.md`, `docs/REAL_IMPLEMENTATION_PLAN.md`, dan `prototype/`.
2. Menjadi guardrail saat membuat halaman real apps frontend.
3. Memastikan desain tidak hanya terlihat menarik, tetapi juga menjelaskan alur produk, role access, privacy boundary, dan value lomba.
4. Menjaga agar frontend production tidak menyalin mentah prototype yang masih memakai localStorage dan auth simulasi.

## Prioritas Source Of Truth

Urutan acuan jika ada perbedaan antar dokumen:

1. Dokumen Markdown terbaru di `docs/`, terutama PRD, WEB_DESIGN, frontend guide, auth-security, dan real implementation plan.
2. Prototype current di `prototype/src`, terutama `LandingPage.tsx`, `JourneyWorkspace.tsx`, `privacy.ts`, `report.ts`, `AppFeedback.tsx`, dan `AccessibilityPanel.tsx`.
3. PDF proposal, revisi, BMC/RAB, dan SWOT sebagai konteks narasi lomba, bukan source teknis utama.
4. Screenshot lampiran proposal lama tidak menjadi acuan visual utama karena masih memakai style gelap/biru dan workflow lama.

## Positioning Produk

SyncVoca Journey adalah ekosistem transisi vokasi inklusif untuk Anak Berkebutuhan Khusus (ABK). Produk ini tidak boleh terasa seperti:

- dashboard teknis biasa,
- game edukasi biasa,
- landing page marketing generik,
- aplikasi pencatat disabilitas,
- sistem rekrutmen yang membuka data sensitif anak.

Produk harus terasa seperti jembatan yang menghubungkan sekolah, siswa, orang tua, dan DUDI melalui bukti kerja yang aman.

Narasi inti:

> Bukti kerja ABK, siap dibaca sekolah dan DUDI tanpa membuka data sensitif.

Nilai utama yang harus selalu muncul:

- ABK-first, bukan label-first.
- Proof over claim: skill dan kesiapan kerja dibuktikan lewat simulasi, evidence, portofolio, dan seal.
- Privacy wall: data sensitif siswa tetap internal sekolah/keluarga.
- Four-pillar ecosystem: siswa, guru, orang tua, DUDI.
- Industry Validation Seal sebagai bukti validasi industri.
- UDL, WCAG, dan ICF-WHO sebagai standar pendekatan produk.

## Prinsip Desain Utama

### 1. Clean, Bright, Inclusive

Default UI harus cerah, tenang, dan ramah sekolah. Hindari dominan gelap pada halaman utama. Gunakan ruang putih/off-white agar logo yang penuh warna tetap menjadi aksen, bukan bertabrakan dengan dekorasi.

### 2. Product-Led, Not Generic Marketing

Setiap section harus menunjukkan output produk: journey score, evidence stack, portfolio, consent status, validation seal, talent pool, audit, atau placement status. Hindari section yang hanya berisi klaim umum tanpa artefak produk.

### 3. Role-Aware

Halaman dan komponen harus sadar role. Siswa, Guru, Orang Tua, DUDI, dan Admin boleh melihat data serta CTA yang berbeda.

### 4. Privacy By Interface

Privacy tidak cukup hanya di backend. UI harus ikut menjelaskan:

- data apa yang boleh dilihat DUDI,
- data apa yang tetap internal,
- kenapa kandidat memakai kode pseudonim,
- kenapa consent dibutuhkan sebelum validation/placement/report.

### 5. Accessible By Default

Desain harus keyboard friendly, punya focus ring jelas, kontras aman, teks tidak overlap, tombol mobile cukup besar, dan panel aksesibilitas tetap tersedia. Target real apps: WCAG 2.2 AA.

### 6. Performance-Conscious

Frontend real apps harus memakai route-level code splitting. Role Siswa dan Orang Tua harus ringan di HP kelas menengah. Fitur berat seperti report PDF, chart kompleks, dan dashboard besar harus lazy-loaded atau dipindah ke backend jika memungkinkan.

## Brand Keywords

- Inklusif
- Cerah
- Aman
- Terukur
- Ramah sekolah
- Siap industri
- Optimis tanpa kekanak-kanakan
- Data-driven tanpa terasa dingin
- Profesional SaaS + EdTech + career dashboard

## Visual Language

### Palette

Gunakan warna berikut sebagai token utama.

| Token | Hex | Fungsi |
| --- | --- | --- |
| Brand Green | `#12843A` | CTA utama, progress, success, growth |
| Deep Green | `#0B5D2A` | heading aksen, active state, section gelap terbatas |
| Soft Green | `#E8F8EE` | card soft, selected background, success subtle |
| Brand Yellow | `#F6C343` | achievement, seal, secondary CTA |
| Soft Yellow | `#FFF7D6` | warning/consent pending, proof highlight |
| Warm Orange | `#F59E0B` | badge kecil, attention |
| Sync Blue | `#1768C8` | link, data/analytics, DUDI action |
| Soft Blue | `#EAF4FF` | info surface, data cards |
| Sky Cyan | `#22B8CF` | supporting accent |
| Page Background | `#F8FAF7` | app background |
| Surface | `#FFFFFF` | card/panel utama |
| Border | `#DDE7DD` atau `#DBE7DD` | border halus |
| Text Main | `#17351F` | teks utama |
| Text Muted | `#61746A` | teks sekunder |

### Color Usage Rules

1. Hijau untuk progress, CTA utama, active state, success, dan journey growth.
2. Kuning untuk achievement, validation seal, consent pending, dan highlight yang butuh perhatian.
3. Biru untuk data, analytics, DUDI, report export, dan link.
4. Off-white untuk background utama.
5. Putih untuk cards dan panel.
6. Hindari UI dominan biru gelap seperti prototype lama di lampiran proposal.
7. Hindari gradient berat. Jika perlu, gunakan gradient sangat halus di hero atau top accent saja.
8. Jangan pakai warna saja untuk status; selalu sertakan label/pill/text/icon.

## Typography

Prototype memakai:

- Display: `Space Grotesk`
- Body: `Inter`
- Mono: `JetBrains Mono`

Untuk real apps, gunakan kombinasi yang sama atau setara.

Aturan:

1. Heading landing boleh besar, tetapi dashboard heading harus lebih ringkas.
2. Body text ideal 14-16px dengan line-height lega.
3. Badge boleh uppercase, tetapi jangan terlalu kecil.
4. Hindari teks panjang di tombol.
5. Tidak perlu negative letter spacing.
6. Jangan scale font memakai viewport width.

## Layout System

### App Shell

Header:

- background putih solid atau translucent ringan,
- logo kiri dengan teks `SyncVoca Journey`,
- quick actions kanan seperti aksesibilitas dan user/role action,
- jika berada di dashboard, sediakan tombol kembali/role switch yang jelas.

Main background:

- `#F8FAF7`,
- container max width untuk desktop,
- gutter mobile aman,
- tidak ada horizontal overflow.

### Page Container

Gunakan max width sekitar 1200-1280px untuk landing dan dashboard umum. Untuk role dashboard yang butuh tabel atau data padat, boleh memakai container lebih lebar selama spacing tetap rapi.

### Card And Panel

Prototype memakai radius sekitar 16-28px. Untuk real apps, gunakan radius konsisten:

- panel besar: 24px,
- card: 16px,
- chip/pill: 999px,
- input/button: 12-999px sesuai konteks.

Shadow harus halus. Hindari glow gelap dan orb dekoratif.

## Komponen Wajib

Komponen minimum untuk design system:

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
- MetricCard
- EvidenceCard
- PortfolioSummary
- PrivacyNotice
- AccessibilityPanel

Gunakan lucide icons untuk icon button dan icon UI. Jangan mengandalkan emoji sebagai elemen utama.

## Feedback Pattern

Prototype sudah punya `AppFeedbackProvider` untuk modal/toast. Pattern ini harus dipertahankan.

Aturan:

1. Jangan memakai native `alert`, `confirm`, atau `prompt`.
2. Success ringan memakai toast.
3. Warning consent memakai toast warning.
4. Aksi destruktif memakai confirmation modal branded.
5. Copy harus spesifik terhadap aksi, misalnya `Consent disetujui` atau `Report aman diekspor`.
6. Toast desktop di kanan atas; mobile full-width aman.

## Accessibility Pattern

Prototype menyediakan panel aksesibilitas dengan:

- text size,
- high contrast,
- dyslexia/helper font,
- reduced motion,
- audio assist.

Untuk real apps, panel ini perlu dirapikan menjadi komponen design system. Targetkan:

- label form jelas,
- focus visible,
- role/aria untuk modal dan toast,
- navigasi keyboard,
- error form bisa dibaca screen reader,
- reduced motion benar-benar mengurangi animasi,
- high contrast tetap usable.

Catatan: prototype masih menyebut WCAG 2.1 di panel, sedangkan dokumen frontend menargetkan WCAG 2.2 AA. Real apps sebaiknya memakai copy WCAG 2.2 AA.

## Product Flow

Alur utama yang harus konsisten di semua halaman produk:

1. Intake Dukungan
2. Simulasi Kerja
3. Rencana Pendampingan
4. Portofolio Bukti
5. Validasi DUDI

Prototype lama di proposal memakai istilah Inisiasi, Evaluasi, Sinkronisasi, Validasi, Outcome. Istilah itu sudah diganti di dokumen terbaru. Gunakan alur 5 tahap versi terbaru.

## Role Experience

### Siswa

Prioritas:

1. Misi hari ini.
2. Journey score.
3. Progress dan badge.
4. Evidence/portofolio.
5. Mentor atau bantuan singkat.

Layout:

- mobile-first,
- bottom nav 4-5 item,
- tombol besar,
- instruksi pendek,
- tidak ada tabel lebar.

### Orang Tua

Prioritas:

1. Ringkasan progres anak.
2. Aktivitas terbaru.
3. Checklist dukungan rumah.
4. Pesan/catatan guru yang parent-visible.
5. Consent jika wali menjadi approver.

Bahasa harus sederhana dan tidak terlalu teknis.

### Guru

Prioritas:

1. Daftar siswa.
2. Detail siswa.
3. Progress per tahap.
4. Catatan pendampingan.
5. Consent workflow.
6. Placement outcome monitoring.

Guru boleh melihat data internal sesuai assignment/sekolah, tetapi tetap perlu UI yang memisahkan data internal dari data publik DUDI.

### DUDI

Prioritas:

1. Talent pool pseudonim.
2. Detail kandidat publik.
3. Evidence dan skill.
4. Akomodasi kerja.
5. Consent status.
6. Industry Validation Seal.
7. Shortlist pipeline.
8. DUDI-safe report.

DUDI hanya boleh melihat:

- kode kandidat,
- school segment umum,
- minat vokasi,
- readiness score,
- public skill summary,
- public evidence,
- public accommodation summary,
- consent status,
- validation seal,
- placement status.

DUDI tidak boleh melihat:

- nama lengkap siswa,
- nama sekolah spesifik,
- kontak wali,
- medical notes,
- family background,
- private notes,
- teacher internal notes,
- raw support profile,
- entity `Student` mentah.

### Admin

Prioritas:

1. Governance overview.
2. Consent queue.
3. Audit trail.
4. User/school/DUDI management.
5. Report center.
6. Placement metric.

Admin harus terlihat sebagai pusat kontrol privacy, consent, dan audit, bukan hanya master data.

## Privacy And Security UX

UI real apps harus selalu mengingatkan batas DUDI:

- gunakan `ConsentBadge`,
- gunakan `PrivacyNotice`,
- tampilkan `candidateCode`,
- jelaskan payload publik,
- tampilkan blocked state saat consent belum aktif,
- jangan render data privat lalu disembunyikan dengan CSS.

Frontend route guard hanya UX. Security final harus datang dari backend.

## Mapping Prototype Ke Real Frontend

| Prototype | Dipakai Sebagai | Real Apps |
| --- | --- | --- |
| `LandingPage.tsx` | Narasi landing, section order, visual proof | Public landing modular |
| `JourneyWorkspace.tsx` | Flow 5 tahap dan role behavior | Route/feature per role |
| `AppFeedback.tsx` | Toast/modal pattern | Shared feedback package |
| `AccessibilityPanel.tsx` | Konsep aksesibilitas | Shared accessibility component |
| `privacy.ts` | Konsep DUDI public mapper | Backend service + FE DTO type |
| `report.ts` | Konsep report aman | Backend report service / lazy action |
| `data.ts` | Seed demo dan fixture | Seed staging atau mock contract |
| localStorage | Demo only | API + database |
| role switch demo | Demo only | Auth session + role membership |

## Hal Yang Jangan Dipakai Mentah Dari Prototype

1. localStorage sebagai data source real.
2. Client-side filtering sebagai security.
3. Single component besar seperti `JourneyWorkspace.tsx` tanpa modularisasi.
4. PDF generation berat di initial bundle.
5. Dashboard lama yang tidak dirender oleh `App.tsx` sebagai sumber utama.
6. Global CSS override besar untuk menetralkan style lama.

## Frontend Production Recommendation

Stack yang cocok:

- TypeScript
- Next.js atau React + Vite
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Zustand/Jotai untuk UI state ringan
- PWA plugin

Struktur feature yang disarankan:

```text
src/
  app/
  features/
    landing/
    auth/
    student-journey/
    parent-progress/
    teacher-monitoring/
    dudi-candidates/
    admin-governance/
    reports/
  components/
    layout/
    feedback/
    forms/
    data-display/
    navigation/
  lib/
    api/
    auth/
    privacy/
    routes/
  styles/
```

## Slicing Rules

1. Pecah page menjadi section components.
2. Jangan simpan semua UI dalam satu page file besar.
3. Buat tokens warna dan spacing dari awal.
4. Buat component untuk status/consent/metric/evidence agar tidak duplikatif.
5. Gunakan real copy dari docs, bukan placeholder generic.
6. Siapkan loading, empty, dan error state bahkan saat data masih mocked.
7. DUDI route harus memakai DTO publik sejak mock contract pertama.
8. Gunakan route-level lazy loading untuk role dashboard.

## Acceptance Criteria Umum

Frontend real apps dianggap selaras desain jika:

1. First viewport langsung menjelaskan ABK, 4 pilar, portofolio kerja, dan privacy wall.
2. Semua role punya CTA utama yang jelas.
3. DUDI tidak pernah melihat data privat.
4. Alur 5 tahap konsisten di landing dan role pages.
5. High contrast dan accessibility panel tetap usable.
6. Tidak ada native browser alert/confirm/prompt.
7. Mobile tidak overflow.
8. Visual terasa clean, cerah, profesional, dan berkorelasi dengan prototype current.
9. Build/typecheck lulus.
10. Privacy regression test tersedia untuk DUDI surfaces.

