# Panduan Prototype Apps

Dokumen ini menjelaskan batas kerja repo `v2` sebagai prototype apps SyncVoca Journey. Repo ini dipakai untuk demo, validasi konsep, presentasi lomba, dan referensi product flow sebelum real apps production dibangun.

## Status Repo

Status: prototype apps/demo MVP.

Repo ini sudah cukup untuk menjelaskan:

- value proposition SyncVoca Journey versi ABK
- alur 5 tahap transisi vokasi
- landing page conversion dan demo entry
- role workspace untuk Siswa, Guru, Orang Tua, DUDI, dan Admin
- privacy boundary untuk DUDI
- consent gate
- audit log demo
- DUDI-safe report export
- placement pipeline
- school placement outcome monitoring
- custom modal/toast
- privacy test untuk DUDI

Repo ini belum boleh dianggap production karena masih memakai localStorage, data demo, dan auth simulasi.

## Fungsi Prototype

Prototype dipakai untuk menjawab pertanyaan berikut:

1. Apakah alur produk mudah dipahami oleh juri, sekolah, dan DUDI?
2. Apakah role Siswa, Guru, Orang Tua, DUDI, dan Admin punya tugas yang jelas?
3. Apakah value utama terlihat: bukti kerja ABK, portofolio, privacy wall, dan validasi industri?
4. Apakah batas data DUDI bisa dijelaskan lewat UI dan test?
5. Apakah narasi ABK sudah lebih general dibanding fokus disabilitas saja?

## Batas Yang Boleh Dikerjakan Di Prototype

Perubahan yang boleh dilakukan:

- polishing copy untuk presentasi
- perbaikan visual dan responsif
- penyesuaian warna agar tetap cerah dan terbaca
- penambahan data demo yang membantu cerita produk
- perbaikan alur demo jika membingungkan
- perbaikan custom modal/toast
- penambahan privacy test
- penambahan screenshot/demo script
- perbaikan bug build, lint, dan runtime

Perubahan yang sebaiknya tidak dilakukan di prototype:

- membangun auth production di repo ini
- menjadikan localStorage sebagai model data real
- menambah database production langsung ke prototype
- membuat fake security yang terlihat production tetapi tidak aman
- menambah fitur besar yang tidak membantu demo atau real-app planning
- membuka data privat ke role DUDI demi demo cepat

## Struktur Prototype Yang Relevan

```text
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

## Alur Demo Utama

1. Landing page menjelaskan output produk.
2. User masuk ke portal demo.
3. User memilih role cepat:
   - Siswa
   - Guru
   - Orang Tua
   - DUDI
   - Admin
4. User melihat journey 5 tahap:
   - Intake Dukungan
   - Simulasi Kerja
   - Rencana Pendampingan
   - Portofolio Bukti
   - Validasi DUDI
5. DUDI hanya melihat public candidate profile.
6. Guru/Admin mengelola consent dan follow-up.
7. Admin melihat governance center dan audit.

## Boundary Data DUDI Di Prototype

DUDI hanya boleh melihat:

- kode kandidat pseudonim
- segmen sekolah umum
- minat vokasi
- readiness score
- skill publik
- evidence simulasi yang sudah dikurasi
- kebutuhan akomodasi kerja
- status consent
- validation seal
- placement pipeline publik

DUDI tidak boleh melihat:

- nama lengkap siswa
- sekolah spesifik
- kontak wali
- catatan medis
- latar keluarga
- catatan guru internal
- `sensitiveData`
- `supportProfile` internal yang bisa terlalu personal

Adapter utama:

```text
src/privacy.ts
```

Report utama:

```text
src/report.ts
```

Privacy test:

```text
scripts/check-dudi-privacy.ts
```

## Validasi Prototype

Jalankan validasi berikut sebelum demo atau handoff:

```bash
npm run lint
npm run test:privacy
npm run build
```

Checklist manual:

- landing page langsung menjelaskan output produk
- CTA demo terlihat di first viewport
- role Siswa mudah masuk ke latihan/portofolio
- role Guru mudah melihat monitoring, consent, dan follow-up
- role Orang Tua memakai bahasa sederhana
- role DUDI tidak melihat data privat
- role Admin bisa melihat governance dan audit
- modal dan toast tidak memakai browser default alert
- scroll reset langsung ke top saat pindah role/stage/siswa
- mobile layout tidak overflow

## Mapping Ke Real Apps

Prototype menjadi referensi untuk real apps, tetapi tidak dipindah mentah-mentah.

| Prototype | Real Apps |
| --- | --- |
| `src/data.ts` | seed data, fixture, dan referensi schema |
| `src/privacy.ts` | backend privacy adapter dan policy service |
| `src/report.ts` | backend report generator |
| `JourneyWorkspace.tsx` | feature flow lintas role |
| `LandingPage.tsx` | public landing dan conversion copy |
| localStorage | database production |
| role switch demo | auth session dan role membership |
| audit demo | immutable audit log backend |

## Definition Of Done Untuk Perubahan Prototype

Perubahan prototype dianggap selesai jika:

- tidak merusak alur demo 5 tahap
- role DUDI tetap aman dari data privat
- `npm run test:privacy` tetap lulus
- UI tetap cerah, clean, dan terbaca
- tidak memakai native `alert`, `confirm`, atau `prompt`
- dokumentasi terkait diperbarui jika ada perubahan alur
- perubahan tidak mengaburkan batas prototype vs real apps

## Rekomendasi Penggunaan

Gunakan prototype ini sebagai:

- bahan presentasi
- demo juri
- proof of concept product flow
- referensi UI dan copy
- referensi test privacy DUDI
- bahan diskusi dengan sekolah/DUDI

Jangan gunakan prototype ini sebagai:

- aplikasi production
- backend data real siswa
- sistem consent legal final
- sistem audit resmi
- storage evidence asli
