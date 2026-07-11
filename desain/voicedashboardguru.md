# Voice Dashboard Guru SyncVoca

Dokumen ini menjadi acuan voice text untuk Dashboard Guru. Narasi dibuat lebih produktif dan efisien, tetapi tetap humanis. Voci membantu guru membaca prioritas, menindaklanjuti evidence, mengelola consent, dan menjaga konteks personal siswa.

Tagline yang boleh muncul di top header atau welcome panel:

```text
Menghubungkan potensi, mewujudkan mandiri.
```

## Karakter Voci Di Dashboard Guru

Voci berbicara seperti asisten kerja guru. Nada harus tenang, ringkas, dan langsung memberi konteks. Karena dashboard guru padat data, voice harus membantu guru memahami mana yang penting dulu.

Contoh pembuka global:

```text
Halo, aku Voci.
Ini adalah ruang guru SyncVoca.
Di sini, Ibu dan Bapak guru bisa membaca progress siswa, meninjau evidence, meminta consent, dan menyiapkan bukti kerja terbaik untuk setiap siswa.
```

Contoh penutup global:

```text
Prioritas utama sudah terbaca.
Lanjutkan dari evidence yang menunggu review, consent yang perlu diminta, atau siswa yang butuh perhatian.
Setiap tindak lanjut membantu potensi siswa menjadi bukti kerja yang lebih kuat.
```

## Menu Utama Guru

Menu utama:

1. Beranda
2. Daftar Siswa
3. Detail Siswa
4. Simulasi
5. Evidence Review
6. Consent
7. Placement
8. Laporan
9. Notifikasi atau Bantuan

## Aturan Voice Untuk Guru

1. Awali halaman dengan ringkasan prioritas.
2. Jelaskan status sebagai tindakan, bukan hanya angka.
3. Bedakan catatan internal, catatan untuk orang tua, dan ringkasan publik untuk DUDI.
4. Setiap aksi consent, evidence publik, dan placement harus mengingatkan batas data.
5. Voice tidak perlu membaca seluruh tabel, cukup membaca filter, ringkasan, dan item terpilih.

## Beranda Guru

Tujuan voice: memberi gambaran kelas hari ini dan prioritas follow-up.

### Beranda - Welcome And Focus Hari Ini

Target: hero panel.

Highlight:

```text
Selamat pagi, Bu Maya.
```

Voice:

```text
Halo, aku Voci.
Ini Dashboard Guru.
Hari ini, fokus utama adalah membaca progress siswa, memberi umpan balik, meninjau evidence, dan menyiapkan bukti kerja yang siap digunakan.
Menghubungkan potensi, mewujudkan mandiri.
```

### Beranda - Fokus Hari Ini

Target: focus card.

Highlight:

```text
Evidence menunggu review. Consent perlu diminta. Kandidat siap untuk DUDI.
```

Voice:

```text
Ada beberapa fokus hari ini.
Evidence yang menunggu review perlu diperiksa.
Consent yang belum diminta perlu ditindaklanjuti.
Kandidat yang siap untuk DUDI perlu dipastikan payload publiknya aman.
Mulai dari item yang paling mendesak.
```

### Beranda - Ringkasan Kelas Hari Ini

Target: summary metrics.

Highlight:

```text
Ringkasan kelas hari ini.
```

Voice:

```text
Ringkasan ini membantu guru membaca kondisi kelas secara cepat.
Perhatikan jumlah siswa aktif, sesi simulasi selesai, evidence yang menunggu review, consent pending, kandidat siap DUDI, dan placement yang perlu follow-up.
Angka ini membantu menentukan pekerjaan berikutnya.
```

### Beranda - Prioritas Tindakan

Target: priority list.

Highlight:

```text
Prioritas tindakan.
```

Voice:

```text
Prioritas tindakan menunjukkan pekerjaan yang perlu diselesaikan lebih dulu.
Evidence menunggu review berarti bukti siswa perlu dicek.
Consent perlu diminta berarti data belum boleh bergerak ke proses validasi.
Catatan pendampingan yang belum diperbarui perlu dilengkapi agar progress siswa tetap jelas.
```

### Beranda - Progress Journey Siswa

Target: journey distribution.

Highlight:

```text
Progress Journey Siswa.
```

Voice:

```text
Bagian ini menunjukkan distribusi siswa di lima tahap journey.
Guru bisa melihat berapa siswa yang berada di tahap mengenal diri, eksplorasi minat, pra-internship, internship, dan siap kerja.
Gunakan filter kelas jika ingin membaca kelompok tertentu.
```

### Beranda - Aktivitas Terbaru

Target: recent activity panel.

Highlight:

```text
Aktivitas terbaru.
```

Voice:

```text
Aktivitas terbaru menunjukkan perubahan yang baru terjadi.
Misalnya simulasi selesai, evidence baru terkumpul, consent disetujui atau ditolak, dan validation seal diterbitkan.
Gunakan bagian ini untuk memahami apa yang baru berubah tanpa membuka semua halaman.
```

### Beranda - Siswa Butuh Perhatian

Target: attention students.

Highlight:

```text
Siswa butuh perhatian.
```

Voice:

```text
Bagian ini membantu guru menemukan siswa yang perlu ditindaklanjuti.
Ada siswa yang butuh review evidence, menunggu persetujuan, catatannya belum diperbarui, atau siap placement.
Pilih siswa untuk melihat detail dan langkah berikutnya.
```

### Beranda - Export Cepat

Target: export panel.

Highlight:

```text
Export cepat.
```

Voice:

```text
Export cepat membantu guru mengunduh ringkasan data untuk kebutuhan sekolah.
Pastikan jenis laporan sesuai tujuan.
Report internal boleh lebih detail, tetapi tetap harus mengikuti izin dan batas akses.
```

## Daftar Siswa

Tujuan voice: membantu guru menemukan siswa dengan cepat.

### Daftar Siswa - Filter Dan Search

Target: filter panel.

Highlight:

```text
Filter dan pencarian.
```

Voice:

```text
Gunakan filter untuk menemukan siswa lebih cepat.
Guru bisa memfilter berdasarkan kelas, tahap journey, status consent, status evidence, minat vokasi, atau kebutuhan follow-up.
Pencarian membantu jika guru sudah tahu nama siswa yang ingin dibuka.
```

### Daftar Siswa - Student Table Atau Card List

Target: student list.

Highlight:

```text
Daftar siswa.
```

Voice:

```text
Daftar siswa menampilkan informasi utama yang perlu dipindai.
Perhatikan nama siswa, kelas, tahap journey, readiness score, jumlah evidence, status consent, dan aksi berikutnya.
Pada layar kecil, daftar sebaiknya tampil sebagai kartu agar tetap mudah dibaca.
```

### Daftar Siswa - Bulk Action Aman

Target: bulk action.

Highlight:

```text
Bulk action aman.
```

Voice:

```text
Bulk action digunakan jika guru ingin melakukan aksi ke beberapa siswa sekaligus.
Misalnya request consent, assign simulasi, atau export internal report.
Sebelum dikirim, sistem harus menampilkan konfirmasi dan jumlah siswa yang terdampak.
```

## Detail Siswa

Tujuan voice: membantu guru membaca satu siswa secara utuh.

### Detail Siswa - Header Profil

Target: student profile header.

Highlight:

```text
Header profil siswa.
```

Voice:

```text
Header profil menampilkan identitas dasar siswa, kelas, minat vokasi, journey score, status consent, dan next action.
Gunakan bagian ini untuk memahami konteks siswa sebelum membaca evidence atau catatan.
```

### Detail Siswa - Tab Ringkasan

Target: summary tab.

Highlight:

```text
Ringkasan siswa.
```

Voice:

```text
Tab ringkasan membantu guru melihat tahap journey, kekuatan siswa, area dukungan, dan rekomendasi berikutnya.
Bagian ini sebaiknya dibaca sebelum memberi tugas atau catatan baru.
```

### Detail Siswa - Tab Evidence

Target: evidence tab.

Highlight:

```text
Evidence siswa.
```

Voice:

```text
Tab evidence menampilkan bukti kerja siswa.
Guru bisa melihat tipe evidence, status review, dan apakah bukti ini layak masuk portofolio.
Jika evidence akan ditandai publik untuk DUDI, pastikan consent dan ringkasan publik sudah aman.
```

### Detail Siswa - Tab Catatan Guru

Target: teacher notes tab.

Highlight:

```text
Catatan guru.
```

Voice:

```text
Catatan guru bisa berisi catatan internal dan catatan yang boleh dibaca orang tua.
Pisahkan keduanya dengan jelas.
Catatan internal tidak boleh masuk ke payload DUDI.
Gunakan bahasa yang objektif dan membantu tindak lanjut.
```

### Detail Siswa - Tab Consent

Target: consent tab.

Highlight:

```text
Status consent.
```

Voice:

```text
Tab consent menunjukkan scope, status, dan riwayat persetujuan.
Jika consent belum aktif, data belum boleh dipakai untuk validasi industri atau placement.
Jika perlu, guru bisa mengirim request consent dengan alasan yang mudah dipahami keluarga.
```

### Detail Siswa - Tab Placement

Target: placement tab.

Highlight:

```text
Placement siswa.
```

Voice:

```text
Tab placement membantu guru melihat status pipeline siswa.
Guru bisa menyiapkan latihan interview, portfolio brief, job coach checklist, dan follow-up transisi kerja.
Catatan placement harus tetap aman dan relevan.
```

## Simulasi Guru

### Simulasi - Katalog Simulasi

Voice:

```text
Katalog simulasi membantu guru memilih latihan yang sesuai dengan tahap journey dan kompetensi siswa.
Gunakan filter durasi, tingkat kesulitan, dan bidang kompetensi agar pilihan lebih tepat.
```

### Simulasi - Assign Simulasi

Voice:

```text
Saat assign simulasi, pilih siswa atau kelas, tulis alasan rekomendasi, dan tentukan deadline jika diperlukan.
Preview instruksi sebelum dikirim agar siswa menerima arahan yang jelas.
```

### Simulasi - Hasil Simulasi

Voice:

```text
Hasil simulasi menampilkan score, akurasi, waktu, evidence otomatis, dan status review.
Gunakan hasil ini untuk memberi feedback dan menentukan latihan berikutnya.
```

## Evidence Review Guru

### Evidence Review - Queue Evidence

Voice:

```text
Queue evidence menunjukkan bukti yang menunggu review, perlu revisi, sudah tervalidasi internal, atau siap masuk portofolio.
Mulai dari evidence yang paling lama menunggu atau yang dibutuhkan untuk portofolio.
```

### Evidence Review - Detail Evidence

Voice:

```text
Detail evidence menampilkan tipe bukti, preview hasil, kompetensi terkait, komentar guru, dan flag public for DUDI.
Sebelum flag publik dinyalakan, pastikan isi evidence aman dan tidak memuat data sensitif.
```

### Evidence Review - Curate To Portfolio

Voice:

```text
Kurasi portofolio berarti memilih bukti yang paling representatif.
Tentukan skill terkait, tulis ringkasan publik, lalu cek status consent.
Bukti yang dipilih harus mudah dipahami dan aman dibagikan.
```

## Consent Guru

### Consent - Consent Queue

Voice:

```text
Consent queue menampilkan permintaan persetujuan yang perlu dipantau.
Perhatikan nama siswa, scope, status, peminta, tanggal, dan aksi berikutnya.
Consent yang tertunda terlalu lama perlu diingatkan dengan cara yang sopan.
```

### Consent - Request Consent

Voice:

```text
Saat meminta consent, jelaskan alasannya dengan bahasa sederhana.
Sebutkan data apa yang akan dibagikan, untuk tujuan apa, dan siapa yang akan melihat.
Keluarga harus memahami keputusan ini sebelum menyetujui.
```

### Consent - Consent History

Voice:

```text
Riwayat consent menampilkan status requested, approved, revoked, expired, dan ringkasan audit.
Gunakan riwayat ini untuk memastikan data tidak bergerak tanpa persetujuan yang valid.
```

## Placement Guru

### Placement - Outcome Dari DUDI

Voice:

```text
Outcome dari DUDI menunjukkan status kandidat.
Status bisa shortlisted, interview, work trial, placed, atau not ready.
Setiap status membantu guru menentukan follow-up sekolah.
```

### Placement - Follow-Up Sekolah

Voice:

```text
Follow-up sekolah membantu siswa menyiapkan tahap berikutnya.
Guru bisa membuat rencana latihan interview, portfolio brief, job coach checklist, transisi tiga puluh hari, dan penguatan evidence.
```

### Placement - Placement Detail

Voice:

```text
Placement detail menampilkan siswa, perusahaan, lowongan, status, tanggal update, dan catatan aman.
Pastikan catatan tidak memuat data sensitif yang tidak diperlukan.
```

## Laporan Guru

### Laporan - Internal Report

Voice:

```text
Laporan internal membantu sekolah membaca progres siswa, evidence, catatan pendampingan, consent, dan outcome placement.
Laporan ini boleh lebih detail daripada laporan untuk DUDI, tetapi tetap harus mengikuti role dan izin.
```

### Laporan - Filter Report

Voice:

```text
Gunakan filter kelas, tahap, periode, status consent, dan status placement.
Filter membantu laporan tetap fokus dan tidak memuat data yang tidak diperlukan.
```

### Laporan - Export Aman

Voice:

```text
Sebelum export, pastikan tujuan laporan sudah benar.
Export harus tercatat audit dan tidak boleh tersimpan sebagai cache publik.
```

## Perintah Suara Rekomendasi Untuk Guru

- `Voci, baca prioritas hari ini.`
- `Voci, buka daftar siswa.`
- `Voci, buka siswa butuh perhatian.`
- `Voci, baca evidence berikutnya.`
- `Voci, request consent.`
- `Voci, buka placement.`
- `Voci, berhenti membaca.`

