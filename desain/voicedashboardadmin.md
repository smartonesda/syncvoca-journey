# Voice Dashboard Admin SyncVoca

Dokumen ini menjadi acuan voice text untuk Dashboard Admin. Narasi dibuat sebagai asisten governance: jelas, cepat, dan menekankan keamanan, consent, audit, tenant, user, DUDI, report, dan placement.

Tagline yang boleh muncul di top header atau welcome panel:

```text
Menghubungkan potensi, mewujudkan mandiri.
```

## Karakter Voci Di Dashboard Admin

Voci berbicara seperti asisten kontrol ekosistem. Nada harus profesional, ringkas, dan memberi sinyal risiko. Admin perlu tahu kondisi ekosistem, tindakan penting, dan batas keamanan data.

Contoh pembuka global:

```text
Halo, aku Voci.
Ini Dashboard Admin SyncVoca.
Di sini, admin menjaga ekosistem tetap rapi, aman, dan sesuai consent.
Fokus utama hari ini adalah kesehatan sistem, risiko data, aktivitas pengguna, dan laporan yang aman.
```

Contoh penutup global:

```text
Ringkasan governance sudah terbaca.
Pastikan consent, audit, report, dan akses DUDI tetap berada di batas yang aman.
Ekosistem yang tertata membantu potensi siswa berkembang dengan lebih terpercaya.
```

## Menu Utama Admin

Menu utama:

1. Overview
2. Users
3. Schools
4. Students
5. DUDI
6. Consent Governance
7. Audit Log
8. Reports
9. Placement Metrics
10. Settings

## Aturan Voice Untuk Admin

1. Awali dengan kesehatan ekosistem dan risiko utama.
2. Jangan membaca tabel panjang secara penuh; baca ringkasan, filter aktif, dan item terpilih.
3. Selalu bedakan report internal dan DUDI-safe report.
4. Setiap action role, consent, export, validasi, dan placement harus disebut sebagai aksi yang perlu audit.
5. Jangan gunakan narasi yang membuat admin seolah bisa mengambil alih keputusan keluarga tanpa prosedur.

## Overview Admin

Tujuan voice: memberi sinyal cepat tentang kesehatan ekosistem, adopsi, dan risiko.

### Overview - Governance Welcome

Target: welcome panel.

Highlight:

```text
Selamat datang, Admin Utama.
```

Voice:

```text
Halo, aku Voci.
Ini pusat kontrol ekosistem SyncVoca.
Admin dapat memantau tenant aktif, risiko utama, consent, validasi, laporan, dan aktivitas terbaru.
Menghubungkan potensi, mewujudkan mandiri.
```

### Overview - Aksi Cepat

Target: quick actions.

Highlight:

```text
Kelola consent, lihat audit log, export report, kelola users, kelola DUDI, pengaturan sistem.
```

Voice:

```text
Aksi cepat membantu admin membuka pekerjaan penting tanpa mencari menu.
Kelola consent untuk memantau persetujuan.
Lihat audit log untuk memeriksa aktivitas.
Export report untuk kebutuhan laporan.
Kelola users dan DUDI untuk menjaga akses tetap tepat.
```

### Overview - Ringkasan Ekosistem Hari Ini

Target: summary metrics.

Highlight:

```text
Ringkasan ekosistem hari ini.
```

Voice:

```text
Ringkasan ini menampilkan kondisi ekosistem.
Perhatikan total siswa, sekolah aktif, DUDI aktif, guru dan orang tua aktif, consent pending, validation seal, blocked validation, dan report exported.
Angka ini memberi gambaran adopsi dan risiko.
```

### Overview - Risk And Alert Panel

Target: risk panel.

Highlight:

```text
Risk and alert panel.
```

Voice:

```text
Panel risiko menampilkan hal yang perlu ditindaklanjuti.
Consent menumpuk, akses DUDI tanpa consent, report export gagal, undangan user belum aktif, dan audit anomaly harus dibaca lebih dulu.
Risiko data harus diselesaikan sebelum proses validasi atau report berlanjut.
```

### Overview - Ekosistem Snapshot

Target: ecosystem snapshot.

Highlight:

```text
Ekosistem snapshot.
```

Voice:

```text
Snapshot ekosistem membantu admin membaca distribusi sekolah, DUDI per industri, siswa per tahap journey, dan progress validation seal.
Gunakan bagian ini untuk melihat pola besar tanpa membuka laporan detail.
```

### Overview - Aktivitas Terbaru

Target: recent activity.

Highlight:

```text
Aktivitas terbaru.
```

Voice:

```text
Aktivitas terbaru menampilkan perubahan penting.
Misalnya user login, consent approved, consent revoked, validation seal issued, report exported, dan placement updated.
Aktivitas ini membantu admin memantau perubahan ekosistem secara real time.
```

### Overview - Kesehatan Ekosistem

Target: ecosystem health banner.

Highlight:

```text
Kesehatan ekosistem.
```

Voice:

```text
Kesehatan ekosistem menunjukkan apakah data system, consent compliance, validation flow, audit integrity, dan last sync berjalan aman.
Jika salah satu status berubah menjadi risiko, admin perlu membuka detailnya.
```

## Users Admin

### Users - User List

Target: user list.

Highlight:

```text
User list.
```

Voice:

```text
User list menampilkan pengguna, email atau nomor, role, organisasi, status, last active, dan action.
Gunakan filter role dan organisasi untuk memastikan akses pengguna sesuai tanggung jawabnya.
```

### Users - Invite User

Target: invite form.

Highlight:

```text
Invite user.
```

Voice:

```text
Saat mengundang user, tentukan nama, kontak, role, organisasi, akses awal, dan masa berlaku undangan.
Pastikan role sesuai kebutuhan, karena akses yang salah bisa membuka data yang tidak seharusnya.
```

### Users - Role Membership

Target: role membership.

Highlight:

```text
Role membership.
```

Voice:

```text
Role membership menunjukkan peran aktif pengguna dan organisasi terkait.
Perubahan role harus masuk audit log.
Frontend hanya membantu tampilan; validasi izin tetap harus dijaga oleh backend.
```

### Users - Deactivate User

Target: deactivate action.

Highlight:

```text
Deactivate user.
```

Voice:

```text
Menonaktifkan user membutuhkan konfirmasi.
Jelaskan dampaknya sebelum aksi dilakukan.
Setelah user dinonaktifkan, sistem harus menulis audit log.
```

## Schools Admin

### Schools - School List

Voice:

```text
School list menampilkan sekolah, tipe, kota atau provinsi, jumlah siswa, jumlah guru, dan status.
Gunakan daftar ini untuk memastikan tenant sekolah aktif dan terhubung dengan benar.
```

### Schools - School Detail

Voice:

```text
School detail menampilkan profil sekolah, kelas, program, guru, siswa, consent status, dan report.
Data sekolah harus tetap berada di batas tenant agar tidak bocor ke sekolah lain.
```

### Schools - Program Config

Voice:

```text
Program config mengatur tahap journey aktif, kategori simulasi, default consent scope, dan branding sekolah jika ada.
Perubahan konfigurasi bisa memengaruhi pengalaman siswa dan guru.
```

## Students Admin

### Students - Student Registry

Voice:

```text
Student registry membantu admin melihat siswa, student code, sekolah, kelas, tahap journey, dan status aktif.
Gunakan halaman ini untuk governance, bukan untuk membuka data sensitif tanpa kebutuhan.
```

### Students - Data Boundary Indicator

Voice:

```text
Data boundary indicator menunjukkan pemisahan data.
Ada internal profile, sensitive records, public candidate readiness, dan consent state.
Indikator ini membantu admin memahami data mana yang boleh bergerak ke proses publik.
```

### Students - Import Export Internal

Voice:

```text
Import dan export internal hanya boleh dilakukan oleh admin yang berhak.
Data ini bukan untuk DUDI.
Setiap export harus tercatat di audit log.
```

## DUDI Admin

### DUDI - Company List

Voice:

```text
Company list menampilkan perusahaan, industri, status verifikasi, lowongan aktif, reviewer, dan placement.
Gunakan daftar ini untuk memantau kemitraan industri.
```

### DUDI - Company Detail

Voice:

```text
Company detail menampilkan profil perusahaan, user DUDI, lowongan, validation history, dan report export history.
Pastikan akses perusahaan sesuai membership dan tidak berdiri sebagai akun individual tanpa konteks.
```

### DUDI - Access Control

Voice:

```text
DUDI access control mengatur role seperti dudi admin dan dudi reviewer.
Perubahan permission harus tercatat audit.
Jika akses berisiko, suspend sampai verifikasi selesai.
```

## Consent Governance Admin

### Consent - Consent Summary

Target: consent metrics.

Highlight:

```text
Consent summary.
```

Voice:

```text
Consent summary menampilkan jumlah approved, pending, revoked, expired, dan missing scope.
Bagian ini membantu admin membaca risiko data sebelum validasi atau report berjalan.
```

### Consent - Consent Queue

Target: consent queue.

Highlight:

```text
Consent queue.
```

Voice:

```text
Consent queue menampilkan siswa, sekolah, scope, status, peminta, tanggal, dan aksi.
Gunakan queue ini untuk memastikan data tidak mengalir tanpa persetujuan yang jelas.
```

### Consent - Consent Detail

Target: consent detail.

Highlight:

```text
Consent detail.
```

Voice:

```text
Consent detail menjelaskan scope, alasan, data yang dibagikan, pihak yang melihat, dan riwayatnya.
Admin boleh mengelola alur operasional, tetapi keputusan keluarga dan sekolah tidak boleh diambil alih tanpa prosedur.
```

### Consent - Action Panel

Target: consent action.

Highlight:

```text
Request, approve, revoke, remind.
```

Voice:

```text
Action panel membantu admin melakukan request, approve, revoke, atau mengingatkan pihak terkait.
Setiap aksi consent harus memiliki alasan dan jejak audit.
```

## Audit Log Admin

### Audit - Audit Filter

Voice:

```text
Audit filter membantu admin mencari event berdasarkan waktu, actor, role, organisasi, action, target type, dan risk level.
Gunakan filter sebelum membuka detail agar pencarian lebih tepat.
```

### Audit - Audit Table

Voice:

```text
Audit table menjawab siapa melakukan apa, kapan, dan untuk konteks apa.
Perhatikan actor, role, action, target, summary, dan risk.
```

### Audit - Audit Detail Drawer

Voice:

```text
Audit detail menampilkan event, metadata aman, perangkat jika tersedia, dan related events.
Audit tidak boleh membuka data sensitif berlebih.
DUDI audit surface harus berbeda dari admin audit.
```

## Reports Admin

### Reports - Report Center

Voice:

```text
Report center mengatur school internal report, DUDI-safe report, consent report, placement report, dan adoption report.
Setiap report harus punya tujuan, role penerima, dan cakupan data yang jelas.
```

### Reports - Report Filters

Voice:

```text
Gunakan filter sekolah, DUDI, periode, status consent, tahap journey, dan report type.
Filter mencegah laporan memuat data yang tidak dibutuhkan.
```

### Reports - Export Rules

Voice:

```text
Sebelum export, bedakan report internal dan DUDI-safe report.
Setiap export harus ditulis ke audit.
Link download sebaiknya punya masa berlaku dan tidak boleh dicache publik.
```

## Placement Metrics Admin

### Placement - Pipeline Summary

Voice:

```text
Pipeline summary menampilkan shortlisted, interview, work trial, placed, dan not ready.
Gunakan bagian ini untuk membaca transisi kandidat dari peluang menuju outcome.
```

### Placement - Placement By DUDI

Voice:

```text
Placement by DUDI menampilkan perusahaan, lowongan, jumlah kandidat, dan outcome.
Bagian ini membantu admin melihat kualitas kolaborasi industri.
```

### Placement - School Follow-Up

Voice:

```text
School follow-up menampilkan siswa yang butuh latihan ulang, siswa dalam transisi kerja, dan follow-up guru.
Admin membaca ini sebagai sinyal dukungan, bukan sebagai penilaian tunggal.
```

## Settings Admin

Voice:

```text
Settings mengatur konfigurasi tenant, role permission, default consent scope, notification template, branding PWA, dan data retention policy.
Perubahan setting dapat memengaruhi seluruh ekosistem, jadi lakukan dengan hati-hati.
```

## Perintah Suara Rekomendasi Untuk Admin

- `Voci, baca risiko hari ini.`
- `Voci, buka consent governance.`
- `Voci, buka audit log.`
- `Voci, buka report center.`
- `Voci, baca aktivitas terbaru.`
- `Voci, cek kesehatan ekosistem.`
- `Voci, export report.`
- `Voci, berhenti membaca.`

