# Dashboard Section Guide SyncVoca

Dokumen ini menjadi acuan untuk membuat mockup dan slicing dashboard SyncVoca. Fokusnya adalah menjelaskan bagian apa saja yang perlu ada di setiap dashboard role, bagaimana alurnya, data apa yang boleh tampil, dan bagaimana tampilan tetap konsisten dengan landing page SyncVoca yang clean, cerah, naratif, dan berbasis bukti.

Dokumen ini mengacu pada `docs/desain/design.md`, `docs/desain/sectionpages.md`, `docs/PRD.md`, `docs/REAL_IMPLEMENTATION_PLAN.md`, dan struktur route frontend terbaru di `frontend/src/app`.

## Tagline Wajib

Tagline web yang wajib muncul di landing page dan semua dashboard:

```text
Menghubungkan potensi, mewujudkan mandiri
```

Aturan penempatan:

- Landing page: muncul di hero atau dekat brand lockup sebagai kalimat emosional pendukung brand.
- Dashboard siswa dan orang tua: muncul ringan di header/home card agar terasa suportif, bukan seperti slogan formal.
- Dashboard guru, DUDI, dan admin: muncul di top header atau welcome panel sebagai pengingat misi produk.
- Login/auth: muncul di sisi brand atau footer mini.
- Jangan jadikan tagline sebagai judul besar di semua halaman; cukup sebagai brand line yang konsisten.

## Prinsip Umum Semua Dashboard

Semua dashboard harus terasa seperti bagian dari ekosistem yang sama, bukan aplikasi berbeda-beda.

1. Gunakan bahasa sederhana dan naratif.
2. Tampilkan output nyata: journey score, evidence, portofolio, consent, validation seal, placement status, audit.
3. Pastikan setiap role punya next action yang jelas.
4. Hindari dashboard yang hanya berisi tabel; selalu beri konteks cerita dan ringkasan.
5. Gunakan visual hijau-putih sebagai basis, kuning untuk achievement/seal, biru untuk data/DUDI/report, dan merah hanya untuk risiko.
6. Siswa dan Orang Tua harus mobile-first/PWA.
7. Guru, DUDI, dan Admin boleh lebih padat karena mereka bekerja dengan data.
8. Data sensitif tidak boleh tampil di role yang tidak berhak, terutama DUDI.
9. Setiap halaman punya state: loading, empty, error, blocked by consent, dan success feedback.
10. Hindari istilah teknis di headline; simpan istilah teknis sebagai label kecil atau helper text.

## Shared App Shell

### 1. Header Global

Harus ada:

- Logo SyncVoca.
- Nama role aktif, misalnya `Dashboard Siswa`, `Ruang Guru`, `Ruang DUDI`, atau `Admin Governance`.
- Tagline kecil: `Menghubungkan potensi, mewujudkan mandiri`.
- Tombol aksesibilitas.
- Notifikasi.
- Profil pengguna.
- Logout atau switch role untuk mode demo.

Catatan desain:

- Header desktop dapat memakai topbar + sidebar.
- Header mobile dibuat compact.
- Untuk Siswa dan Orang Tua, header jangan terlalu tinggi agar konten utama cepat terlihat.

### 2. Sidebar / Bottom Navigation

Desktop:

- Guru, DUDI, Admin memakai sidebar kiri atau top-sidebar hybrid.
- Sidebar harus menampilkan icon + label.
- Menu aktif memakai aksen hijau.

Mobile:

- Siswa dan Orang Tua memakai bottom navigation.
- Maksimal 4-5 menu utama.
- Menu tambahan seperti profil dan aksesibilitas bisa masuk ke sheet/menu.

### 3. Welcome Panel

Setiap dashboard home harus punya welcome panel yang menjawab:

- user sedang berada di role apa,
- apa yang perlu dilakukan hari ini,
- status penting terbaru,
- CTA utama.

Contoh copy:

```text
Halo, Rizky. Hari ini kamu bisa melanjutkan simulasi administrasi dan melihat bukti kerja yang sudah terkumpul.
```

### 4. Privacy Notice

Harus muncul pada halaman yang menyentuh data sensitif, consent, DUDI, report, dan placement.

Bentuk:

- card kecil,
- icon shield/lock,
- copy pendek,
- link `Pelajari batas data`.

Contoh:

```text
DUDI hanya melihat bukti kerja yang sudah dikurasi dan disetujui. Catatan internal tetap berada di sekolah dan keluarga.
```

### 5. Status Badge

Badge yang wajib tersedia:

- `Selesai`
- `Berjalan`
- `Menunggu`
- `Butuh Review`
- `Consent Pending`
- `Consent Approved`
- `Consent Revoked`
- `Tervalidasi DUDI`
- `Blocked`
- `DUDI-safe`

## Landing Page Reminder

Landing page sudah memiliki dokumen section sendiri di `sectionpages.md`, tetapi untuk konsistensi dashboard, landing tetap harus menyambungkan user ke role.

Menu landing:

- Beranda
- Cara Kerja
- Bukti Kerja
- Keamanan Data
- Untuk Siapa
- Ekosistem
- Tentang Kami
- Kontak

Section landing minimum:

- Hero dengan tagline `Menghubungkan potensi, mewujudkan mandiri`.
- Masalah yang ingin diselesaikan.
- Cara SyncVoca membantu.
- Aktivitas menjadi bukti kerja.
- Keamanan data anak.
- Untuk setiap peran.
- Ekosistem dan dampak.
- Mitra.
- CTA portal demo.

Landing harus menjadi pintu cerita, sedangkan dashboard harus membuktikan cerita tersebut lewat UI produk.

---

# Dashboard Siswa

## Karakter Pengalaman

Dashboard siswa adalah ruang mobile-first yang ringan, suportif, dan tidak menghakimi. Siswa tidak boleh merasa sedang membaca sistem administrasi. Mereka perlu tahu langkah kecil berikutnya, bukti yang sudah terkumpul, dan progress yang bisa dibanggakan.

Tagline placement:

- Di welcome card: `Menghubungkan potensi, mewujudkan mandiri`.
- Bisa ditampilkan sebagai subcopy kecil di bawah sapaan.

## Menu Utama Siswa

Rekomendasi bottom navigation:

1. Beranda
2. Journey
3. Simulasi
4. Portofolio
5. Notifikasi

Menu tambahan di profile sheet:

- Profil Saya
- Aksesibilitas
- Bantuan
- Keluar

## Beranda Siswa

Tujuan:

Menjawab pertanyaan siswa: "Hari ini aku harus melakukan apa?"

Section yang harus ada:

### 1. Sapaan Dan Misi Hari Ini

Isi:

- Nama/panggilan siswa.
- Tagline SyncVoca.
- Tahap journey saat ini.
- CTA utama: `Mulai Simulasi Berikutnya` atau `Lanjutkan Journey`.

Visual:

- Card hijau lembut.
- Ilustrasi siswa atau icon target.
- Progress mini.

### 2. Journey Score

Isi:

- Score, misalnya `82/100`.
- Level, misalnya `Level Mahir`.
- Perubahan mingguan.
- Penjelasan sederhana: score berasal dari latihan, bukti, dan progress.

Visual:

- Ring/progress bar.
- Badge level.
- Microcopy positif.

### 3. Tahap Saat Ini

Isi:

- Tahap aktif dari 5 tahap:
  - Mengenal Diri
  - Eksplorasi Minat
  - Pra-Internship
  - Internship
  - Siap Kerja
- Persentase penyelesaian.
- Aktivitas berikutnya.

### 4. Simulasi Disarankan

Isi:

- 1-3 rekomendasi simulasi.
- Estimasi waktu.
- Tingkat kesulitan.
- Kompetensi yang dilatih.
- CTA `Mulai`.

Contoh:

```text
Simulasi Administrasi Perkantoran
Latih ketelitian, urutan kerja, dan pengelolaan dokumen.
Estimasi 25 menit.
```

### 5. Bukti Terkumpul

Isi:

- Jumlah evidence.
- Evidence terbaru.
- Status review guru.
- CTA `Lihat Portofolio`.

### 6. Feedback Terbaru

Isi:

- Catatan singkat guru yang aman untuk siswa.
- Tone suportif.
- CTA `Baca Detail`.

### 7. Aksesibilitas Cepat

Isi:

- Perbesar teks.
- Mode kontras.
- Kurangi animasi.
- Audio assist jika ada.

## Journey Siswa

Tujuan:

Membuat perjalanan terasa bertahap, bukan tes panjang.

Section yang harus ada:

### 1. Stepper 5 Tahap

Isi:

- status tiap tahap,
- ikon tiap tahap,
- progress,
- aktivitas yang sudah selesai.

### 2. Cerita Tahap Aktif

Isi:

- penjelasan tahap dalam bahasa sederhana,
- mengapa tahap ini penting,
- apa hasil yang akan didapat siswa.

### 3. Checklist Aktivitas

Isi:

- tugas pendek,
- status selesai/belum,
- CTA lanjut.

### 4. Evidence Yang Terhubung

Isi:

- evidence dari tahap tersebut,
- status review,
- badge jika sudah masuk portofolio.

### 5. Bantuan Saat Bingung

Isi:

- tombol `Minta Bantuan Guru`,
- pertanyaan singkat,
- tips belajar.

## Simulasi Siswa

Tujuan:

Membantu siswa berlatih lewat aktivitas kecil yang terasa dekat dengan dunia kerja.

Section yang harus ada:

### 1. Daftar Simulasi

Filter sederhana:

- Semua
- Direkomendasikan
- Mudah
- Sedang
- Selesai

Card simulasi:

- nama simulasi,
- kompetensi,
- estimasi durasi,
- status,
- CTA.

### 2. Detail Simulasi

Isi:

- konteks kerja,
- tugas yang harus dilakukan,
- hasil yang diharapkan,
- bantuan visual/audio jika ada.

### 3. Instruksi Bertahap

Isi:

- satu instruksi per langkah,
- progress langkah,
- tombol `Lanjut`,
- autosave status.

### 4. Hasil Simulasi

Isi:

- score,
- akurasi,
- waktu penyelesaian,
- skill yang terlatih,
- evidence yang dibuat otomatis.

### 5. Refleksi Singkat

Isi:

- siswa memilih apa yang mudah/sulit,
- opsi jawaban sederhana,
- hasil masuk evidence/refleksi.

## Portofolio Siswa

Tujuan:

Menunjukkan bahwa latihan siswa sudah menjadi cerita bukti kerja.

Section yang harus ada:

### 1. Ringkasan Portofolio

Isi:

- minat vokasi,
- skill utama,
- journey score,
- evidence terkumpul,
- validation seal jika ada.

### 2. Evidence Stack

Kategori:

- hasil simulasi,
- dokumen tugas,
- foto/video,
- refleksi diri,
- catatan guru yang boleh tampil.

### 3. Skill Yang Terbukti

Isi:

- skill,
- evidence pendukung,
- level penguasaan,
- status review.

### 4. Validasi DUDI

Isi:

- seal,
- skill yang divalidasi,
- tanggal validasi,
- status consent.

### 5. Mode Berbagi Aman

Isi:

- penjelasan bahwa versi publik dibatasi,
- CTA `Lihat Versi Publik`,
- status consent.

## Notifikasi Siswa

Tujuan:

Menampilkan pesan yang langsung bisa ditindaklanjuti.

Kategori:

- Tugas baru
- Feedback guru
- Portofolio
- Consent/validasi
- Placement

Setiap notifikasi harus punya:

- judul pendek,
- waktu,
- status dibaca,
- CTA jika perlu.

---

# Dashboard Orang Tua

## Karakter Pengalaman

Dashboard orang tua harus menenangkan, mudah dipahami, dan tidak terlalu teknis. Orang tua perlu melihat perkembangan anak, tahu dukungan kecil apa yang bisa dilakukan di rumah, dan memahami persetujuan data sebelum data dibagikan.

Tagline placement:

- Di welcome panel sebagai penguat misi keluarga dan sekolah.

## Menu Utama Orang Tua

Rekomendasi bottom navigation:

1. Ringkasan
2. Progres
3. Dukungan Rumah
4. Persetujuan
5. Pesan

Menu tambahan:

- Profil Anak
- Bantuan
- Aksesibilitas
- Keluar

## Ringkasan Orang Tua

Tujuan:

Menjawab pertanyaan: "Anak saya sedang berkembang di bagian apa?"

Section yang harus ada:

### 1. Sapaan Dan Ringkasan Anak

Isi:

- nama anak,
- tahap journey,
- tagline,
- kondisi progress minggu ini.

### 2. Perkembangan Minggu Ini

Isi:

- 3 highlight perkembangan,
- simulasi yang diselesaikan,
- evidence baru,
- feedback guru.

### 3. Kekuatan Anak

Isi:

- skill yang mulai terlihat,
- minat vokasi,
- contoh bukti.

### 4. Butuh Dukungan Berikutnya

Isi:

- area yang perlu dilatih,
- rekomendasi guru,
- aktivitas rumah.

### 5. Status Persetujuan Data

Isi:

- consent pending/approved/revoked,
- scope,
- CTA `Tinjau Persetujuan`.

## Progres Anak

Section yang harus ada:

### 1. Timeline Perkembangan

Isi:

- tanggal,
- aktivitas,
- hasil,
- catatan singkat.

### 2. Journey 5 Tahap

Isi:

- status tiap tahap,
- progress,
- evidence terkait.

### 3. Evidence Yang Bisa Dilihat Orang Tua

Isi:

- evidence yang aman dibaca keluarga,
- catatan guru yang parent-visible,
- status review.

### 4. Catatan Guru

Aturan:

- hanya catatan yang memang boleh dibaca orang tua,
- bahasa suportif,
- tidak berisi catatan internal sensitif.

## Dukungan Rumah

Section yang harus ada:

### 1. Aktivitas Rumah Hari Ini

Isi:

- aktivitas pendek,
- estimasi waktu,
- tujuan aktivitas,
- tombol selesai.

### 2. Panduan Pendampingan

Isi:

- langkah-langkah sederhana,
- tips komunikasi,
- tanda jika anak butuh istirahat.

### 3. Checklist Dukungan

Isi:

- tugas rumah,
- status,
- catatan opsional.

### 4. Minta Bantuan Guru

Isi:

- pertanyaan singkat,
- kategori bantuan,
- CTA kirim pesan.

## Persetujuan Orang Tua

Section yang harus ada:

### 1. Penjelasan Persetujuan

Isi:

- data apa yang diminta,
- untuk tujuan apa,
- siapa yang akan melihat,
- sampai kapan berlaku.

### 2. Scope Consent

Scope:

- portfolio-sharing,
- work-accommodation-sharing,
- industry-validation,
- placement-followup,
- report-export.

### 3. Aksi Persetujuan

Aksi:

- Setujui
- Tolak
- Cabut persetujuan
- Minta penjelasan

### 4. Riwayat Persetujuan

Isi:

- tanggal,
- status,
- aktor,
- scope,
- catatan aman.

## Pesan Orang Tua

Isi:

- pesan dari guru,
- notifikasi consent,
- update validasi,
- update placement.

---

# Dashboard Guru

## Karakter Pengalaman

Dashboard guru adalah ruang kerja utama untuk memantau siswa, membaca evidence, memberi catatan, mengatur consent, dan menindaklanjuti placement. UI boleh lebih padat, tetapi tetap harus mudah dipindai.

Tagline placement:

- Di top header atau welcome panel.
- Contoh: `Menghubungkan potensi, mewujudkan mandiri - ruang guru untuk membaca progress dan menyiapkan bukti kerja siswa.`

## Menu Utama Guru

Rekomendasi sidebar:

1. Beranda
2. Daftar Siswa
3. Detail Siswa
4. Simulasi
5. Evidence Review
6. Consent
7. Placement
8. Laporan
9. Notifikasi

Jika sidebar perlu disederhanakan:

- Beranda
- Siswa
- Simulasi
- Consent
- Placement
- Laporan

## Beranda Guru

Tujuan:

Memberi gambaran kelas/sekolah hari ini dan prioritas follow-up.

Section yang harus ada:

### 1. Welcome And Focus Hari Ini

Isi:

- sapaan guru,
- tagline,
- jumlah siswa aktif,
- follow-up paling penting.

### 2. Summary Metrics

Metric:

- siswa aktif,
- sesi simulasi selesai,
- evidence menunggu review,
- consent pending,
- kandidat siap DUDI,
- placement perlu follow-up.

### 3. Prioritas Tindakan

Isi:

- siswa butuh review,
- consent harus diminta,
- catatan pendampingan belum diperbarui,
- placement update dari DUDI.

### 4. Progress Journey Siswa

Visual:

- bar/tahap 5 journey,
- distribusi siswa per tahap,
- filter kelas.

### 5. Aktivitas Terbaru

Isi:

- simulasi selesai,
- evidence baru,
- consent approved/revoked,
- validation seal terbit.

## Daftar Siswa

Section yang harus ada:

### 1. Filter Dan Search

Filter:

- kelas,
- tahap journey,
- status consent,
- status evidence,
- minat vokasi,
- butuh follow-up.

### 2. Student Table/List

Kolom utama:

- nama siswa,
- kelas,
- tahap,
- readiness score,
- evidence,
- consent,
- next action.

Mobile/tablet:

- pakai card list, bukan tabel lebar.

### 3. Bulk Action Aman

Aksi:

- request consent,
- assign simulasi,
- export internal report.

Catatan:

- bulk action harus menampilkan konfirmasi dan jumlah siswa terdampak.

## Detail Siswa

Section yang harus ada:

### 1. Header Profil Siswa

Isi:

- nama siswa,
- kelas,
- minat vokasi,
- journey score,
- status consent,
- next action.

### 2. Tab Ringkasan

Isi:

- tahap journey,
- kekuatan,
- area dukungan,
- rekomendasi berikutnya.

### 3. Tab Evidence

Isi:

- evidence stack,
- status review,
- curated/public flag,
- catatan review.

### 4. Tab Catatan Guru

Isi:

- catatan internal,
- catatan parent-visible,
- kategori catatan,
- tanggal.

Aturan:

- catatan internal tidak boleh masuk payload DUDI.

### 5. Tab Consent

Isi:

- status consent,
- scope,
- history,
- CTA request/approve/revoke sesuai role.

### 6. Tab Placement

Isi:

- status pipeline,
- follow-up sekolah,
- rencana dukungan,
- catatan job coach jika ada.

## Simulasi Guru

Section yang harus ada:

### 1. Katalog Simulasi

Filter:

- tahap journey,
- kompetensi,
- durasi,
- tingkat kesulitan.

### 2. Assign Simulasi

Isi:

- pilih siswa/kelas,
- alasan rekomendasi,
- deadline opsional,
- preview instruksi.

### 3. Hasil Simulasi

Isi:

- score,
- akurasi,
- waktu,
- evidence otomatis,
- status review.

## Evidence Review Guru

Section yang harus ada:

### 1. Queue Evidence

Status:

- menunggu review,
- perlu revisi,
- sudah tervalidasi internal,
- siap portofolio.

### 2. Detail Evidence

Isi:

- tipe evidence,
- preview file/hasil,
- kompetensi terkait,
- komentar guru,
- flag `public for DUDI`.

### 3. Curate To Portfolio

Isi:

- pilih evidence,
- tentukan skill terkait,
- tulis ringkasan publik,
- cek consent.

## Consent Guru

Section yang harus ada:

### 1. Consent Queue

Kolom/card:

- nama siswa,
- scope,
- status,
- diminta oleh,
- tanggal,
- next action.

### 2. Request Consent

Isi:

- alasan,
- scope,
- data yang akan dibagikan,
- siapa yang melihat.

### 3. Consent History

Isi:

- requested,
- approved,
- revoked,
- expired,
- audit summary.

## Placement Guru

Section yang harus ada:

### 1. Outcome Dari DUDI

Status:

- shortlisted,
- interview,
- work_trial,
- placed,
- not_ready.

### 2. Follow-Up Sekolah

Isi:

- rencana latihan interview,
- portfolio brief,
- job coach checklist,
- transisi 30 hari,
- penguatan evidence.

### 3. Placement Detail

Isi:

- siswa,
- perusahaan,
- lowongan,
- status,
- tanggal update,
- catatan aman.

## Laporan Guru

Section yang harus ada:

### 1. Internal Report

Isi:

- progres siswa,
- evidence,
- catatan pendampingan,
- consent,
- placement outcome.

### 2. Filter Report

Filter:

- kelas,
- tahap,
- periode,
- status consent,
- status placement.

### 3. Export Aman

Aturan:

- report internal boleh lebih detail daripada DUDI report,
- tetap tidak boleh dicache publik,
- export harus tercatat audit.

---

# Dashboard DUDI

## Karakter Pengalaman

Dashboard DUDI harus profesional, data-driven, dan sangat jelas soal batas data. DUDI melihat kandidat berbasis bukti, bukan profil pribadi siswa.

Tagline placement:

- Di welcome panel sebagai konteks kolaborasi industri.
- Contoh: `Menghubungkan potensi, mewujudkan mandiri - ruang industri untuk membaca kompetensi yang sudah terbukti.`

## Data Yang Boleh Tampil Untuk DUDI

Boleh tampil:

- candidate code pseudonim,
- segmen sekolah umum,
- minat vokasi,
- readiness score,
- skill publik,
- evidence terkurasi,
- kebutuhan akomodasi kerja,
- consent status aman,
- validation seal,
- job match score,
- placement status.

Tidak boleh tampil:

- nama lengkap siswa,
- nama sekolah spesifik jika belum disetujui,
- kontak wali,
- catatan medis,
- latar keluarga,
- catatan guru internal,
- raw support profile,
- dokumen consent asli.

## Menu Utama DUDI

Rekomendasi sidebar:

1. Beranda
2. Talent Pool
3. Detail Kandidat
4. Lowongan Inklusif
5. Validasi
6. Placement
7. Report Aman
8. Profil Perusahaan
9. Bantuan

Jika disederhanakan:

- Beranda
- Kandidat
- Lowongan
- Validasi
- Placement
- Report

## Beranda DUDI

Tujuan:

Memberi ringkasan kandidat yang siap dibaca dan aksi industri berikutnya.

Section yang harus ada:

### 1. Welcome Company Panel

Isi:

- nama perusahaan,
- tagline,
- jumlah kandidat eligible,
- lowongan aktif,
- CTA `Lihat Talent Pool`.

### 2. Privacy Wall Notice

Isi:

- penegasan data yang tampil sudah dipublikasi aman,
- DUDI tidak melihat data sensitif,
- link `Lihat batas data`.

### 3. Summary Metrics

Metric:

- kandidat eligible,
- kandidat shortlisted,
- validation seal diterbitkan,
- lowongan aktif,
- placement berjalan.

### 4. Kandidat Direkomendasikan

Isi:

- candidate code,
- minat vokasi,
- readiness score,
- skill utama,
- consent status,
- CTA detail.

### 5. Aktivitas Terbaru

Isi:

- kandidat dilihat,
- validasi diterbitkan,
- shortlist,
- status placement berubah.

## Talent Pool DUDI

Section yang harus ada:

### 1. Filter Kandidat Aman

Filter:

- minat vokasi,
- skill,
- readiness score,
- kebutuhan akomodasi,
- validation status,
- consent status,
- job match.

Filter tidak boleh:

- diagnosis,
- nama siswa,
- nama wali,
- data keluarga.

### 2. Candidate Cards

Card kandidat:

- candidate code,
- segmen sekolah umum,
- minat,
- score,
- skill chips,
- evidence count,
- consent badge,
- validation seal.

### 3. Comparison Mode

Isi:

- bandingkan 2-3 kandidat,
- skill,
- readiness,
- akomodasi kerja,
- status validasi.

## Detail Kandidat DUDI

Section yang harus ada:

### 1. Candidate Public Header

Isi:

- candidate code,
- minat vokasi,
- readiness score,
- status consent,
- privacy notice.

### 2. Skill Summary

Isi:

- skill publik,
- level,
- evidence pendukung,
- catatan ringkas aman.

### 3. Evidence Terpilih

Isi:

- hasil simulasi,
- dokumen/foto/video yang sudah dikurasi,
- ringkasan performa,
- tanggal.

### 4. Akomodasi Kerja

Isi:

- kebutuhan dukungan kerja yang aman,
- preferensi lingkungan,
- catatan adaptasi yang relevan.

### 5. Validation Seal

Isi:

- status seal,
- skill yang divalidasi,
- catatan validasi DUDI,
- timestamp.

### 6. CTA DUDI

Aksi:

- `Validasi Kompetensi`
- `Shortlist Kandidat`
- `Export DUDI-Safe Report`

Semua aksi harus memeriksa consent.

## Lowongan Inklusif DUDI

Section yang harus ada:

### 1. Daftar Lowongan

Isi:

- judul,
- status,
- skill dibutuhkan,
- akomodasi tersedia,
- kandidat cocok.

### 2. Form Lowongan

Field:

- judul posisi,
- deskripsi pekerjaan,
- skill,
- lingkungan kerja,
- dukungan/akomodasi yang tersedia,
- lokasi,
- status.

### 3. Matching Kandidat

Isi:

- kandidat cocok,
- match score,
- gap skill,
- rekomendasi.

## Validasi DUDI

Section yang harus ada:

### 1. Queue Validasi

Isi:

- kandidat yang siap divalidasi,
- skill,
- evidence,
- consent.

### 2. Form Validasi

Isi:

- pilih skill,
- status validasi,
- catatan singkat,
- seal preview.

### 3. Blocked State

Jika consent belum aktif:

```text
Validasi belum bisa dilakukan karena consent industri belum aktif.
```

CTA:

- `Minta sekolah melengkapi consent`

### 4. Riwayat Validasi

Isi:

- candidate code,
- skill,
- status,
- tanggal,
- actor DUDI.

## Placement DUDI

Section yang harus ada:

### 1. Pipeline Board

Kolom:

- Shortlisted
- Interview
- Work Trial
- Placed
- Not Ready

### 2. Placement Detail

Isi:

- candidate code,
- lowongan,
- status,
- update terakhir,
- catatan aman.

### 3. Update Status

Aturan:

- status update harus audited,
- catatan tidak boleh berisi data sensitif,
- jika consent tidak aktif, aksi diblokir.

## Report Aman DUDI

Section yang harus ada:

### 1. Report Preview

Isi:

- candidate code,
- readiness,
- skill,
- evidence,
- akomodasi kerja,
- seal,
- audit publik.

### 2. Data Yang Dikeluarkan

Checklist:

- data publik saja,
- tidak ada nama siswa,
- tidak ada kontak wali,
- tidak ada catatan medis.

### 3. Export Action

CTA:

- `Export Report Aman`

State:

- success,
- blocked by consent,
- audit logged.

## Profil Perusahaan

Section yang harus ada:

- profil perusahaan,
- bidang industri,
- lokasi,
- user DUDI,
- lowongan aktif,
- komitmen inklusi.

---

# Dashboard Admin

## Karakter Pengalaman

Dashboard admin adalah pusat governance. Admin bukan hanya mengelola data master, tetapi memastikan consent, privacy, audit, user, sekolah, DUDI, report, dan placement berjalan aman.

Tagline placement:

- Di welcome panel sebagai pengingat misi tata kelola.
- Contoh: `Menghubungkan potensi, mewujudkan mandiri - pusat kontrol ekosistem SyncVoca.`

## Menu Utama Admin

Rekomendasi sidebar:

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

Jika disederhanakan mengikuti route saat ini:

- Overview
- Users
- Schools
- DUDI
- Consent
- Audit
- Reports

## Overview Admin

Tujuan:

Memberi sinyal cepat tentang kesehatan ekosistem, adopsi, dan risiko.

Section yang harus ada:

### 1. Governance Welcome

Isi:

- sapaan admin,
- tagline,
- tenant aktif,
- risiko utama hari ini.

### 2. Summary Metrics

Metric:

- total siswa,
- sekolah aktif,
- DUDI aktif,
- guru/orang tua aktif,
- consent pending,
- validation seal,
- blocked validation,
- report exported,
- placement aktif.

### 3. Risk And Alert Panel

Alert:

- consent menumpuk,
- DUDI mencoba aksi tanpa consent,
- report export gagal,
- user invite belum aktif,
- audit anomaly.

### 4. Ekosistem Snapshot

Isi:

- distribusi sekolah,
- DUDI per industri,
- siswa per tahap journey,
- validation progress.

### 5. Aktivitas Terbaru

Isi:

- user login,
- consent approved/revoked,
- validation issued,
- report exported,
- placement updated.

## Users Admin

Section yang harus ada:

### 1. User List

Kolom:

- nama,
- email/phone,
- role,
- organisasi,
- status,
- last active,
- action.

### 2. Invite User

Field:

- nama,
- email/phone,
- role,
- organisasi,
- akses awal,
- expired date.

### 3. Role Membership

Isi:

- role aktif,
- organisasi terkait,
- status,
- audit history.

### 4. Deactivate User

Aturan:

- butuh confirmation modal,
- jelaskan dampak,
- tulis audit log.

## Schools Admin

Section yang harus ada:

### 1. School List

Kolom:

- nama sekolah,
- tipe,
- kota/provinsi,
- jumlah siswa,
- jumlah guru,
- status.

### 2. School Detail

Isi:

- profil sekolah,
- kelas/program,
- guru,
- siswa,
- consent status,
- report.

### 3. Program Config

Isi:

- tahap journey aktif,
- kategori simulasi,
- default consent scope,
- branding sekolah opsional.

## Students Admin

Catatan:

Jika route belum dibuat, tetap perlu masuk sebagai rencana desain karena admin real app perlu kontrol siswa.

Section yang harus ada:

### 1. Student Registry

Kolom:

- nama,
- student code,
- sekolah,
- kelas,
- tahap,
- status aktif.

### 2. Data Boundary Indicator

Isi:

- internal profile,
- sensitive records,
- public candidate readiness,
- consent state.

### 3. Import/Export Internal

Aturan:

- hanya untuk admin berhak,
- tidak untuk DUDI,
- export tercatat audit.

## DUDI Admin

Section yang harus ada:

### 1. Company List

Kolom:

- nama perusahaan,
- industri,
- status verifikasi,
- lowongan aktif,
- reviewer,
- placement.

### 2. Company Detail

Isi:

- profil,
- user DUDI,
- lowongan,
- validation history,
- report export history.

### 3. DUDI Access Control

Isi:

- role dudi_admin,
- role dudi_reviewer,
- permission,
- active/suspended.

## Consent Governance Admin

Section yang harus ada:

### 1. Consent Summary

Metric:

- approved,
- pending,
- revoked,
- expired,
- missing scope.

### 2. Consent Queue

Kolom:

- siswa,
- sekolah,
- scope,
- status,
- peminta,
- tanggal,
- aksi.

### 3. Consent Detail

Isi:

- scope,
- alasan,
- data yang dibagikan,
- pihak yang melihat,
- history.

### 4. Action Panel

Aksi:

- request,
- approve,
- revoke,
- remind parent/school.

Catatan:

- Admin boleh mengelola consent operasional, tetapi UI harus tetap menjelaskan bahwa keputusan keluarga/sekolah tidak boleh diambil alih tanpa prosedur.

## Audit Log Admin

Section yang harus ada:

### 1. Audit Filter

Filter:

- waktu,
- actor,
- role,
- organisasi,
- action,
- target type,
- risk level.

### 2. Audit Table

Kolom:

- waktu,
- actor,
- role,
- action,
- target,
- summary,
- risk.

### 3. Audit Detail Drawer

Isi:

- detail event,
- metadata aman,
- IP/device jika tersedia,
- related events.

Aturan:

- audit tidak boleh membuka data sensitif berlebih,
- DUDI audit surface berbeda dari admin audit.

## Reports Admin

Section yang harus ada:

### 1. Report Center

Jenis report:

- school internal report,
- DUDI-safe report,
- consent report,
- placement report,
- adoption report.

### 2. Report Filters

Filter:

- sekolah,
- DUDI,
- periode,
- status consent,
- tahap journey,
- report type.

### 3. Export Rules

Aturan:

- report internal dan DUDI-safe dibedakan jelas,
- setiap export ditulis ke audit,
- link download expired,
- jangan cache publik.

## Placement Metrics Admin

Section yang harus ada:

### 1. Pipeline Summary

Metric:

- shortlisted,
- interview,
- work trial,
- placed,
- not ready.

### 2. Placement By DUDI

Isi:

- perusahaan,
- lowongan,
- jumlah kandidat,
- outcome.

### 3. School Follow-Up

Isi:

- siswa butuh latihan ulang,
- siswa dalam transisi kerja,
- follow-up guru.

## Settings Admin

Section yang harus ada:

- konfigurasi tenant,
- role permission,
- default consent scope,
- notification template,
- PWA/app branding,
- data retention policy.

---

# Auth And Entry Pages

Walaupun bukan dashboard utama, halaman auth perlu konsisten karena menjadi pintu masuk semua role.

## Login

Section yang harus ada:

- brand SyncVoca,
- tagline `Menghubungkan potensi, mewujudkan mandiri`,
- form email/password,
- tombol masuk,
- lupa password,
- role demo shortcut jika mode demo,
- trust line tentang data aman.

## Forgot Password

Section yang harus ada:

- input email/nomor akun,
- instruksi sederhana,
- status terkirim,
- link kembali login.

## Accept Invite

Section yang harus ada:

- konteks undangan,
- role yang diberikan,
- organisasi pengundang,
- form password awal,
- expiry/invalid state.

---

# Cross-Role Flow Yang Harus Terlihat Di Mockup

## 1. Dari Simulasi Ke Evidence

Alur:

```text
Siswa mengerjakan simulasi
  -> hasil menjadi evidence
  -> guru review
  -> evidence masuk portofolio
  -> jika consent aktif, versi publik bisa dibaca DUDI
```

Dashboard yang terlibat:

- Siswa: Simulasi dan Portofolio.
- Guru: Evidence Review dan Detail Siswa.
- Orang Tua: Progres Anak.
- DUDI: Detail Kandidat.
- Admin: Audit dan Reports.

## 2. Dari Consent Ke Validasi DUDI

Alur:

```text
Guru/Admin request consent
  -> Orang Tua/Sekolah menyetujui
  -> DUDI membaca kandidat publik
  -> DUDI memberi validation seal
  -> audit mencatat aksi
```

Dashboard yang terlibat:

- Orang Tua: Persetujuan.
- Guru: Consent Queue.
- DUDI: Validasi.
- Admin: Consent Governance dan Audit Log.

## 3. Dari Shortlist Ke Placement

Alur:

```text
DUDI shortlist kandidat
  -> status interview/work trial/placed/not ready
  -> guru melihat outcome
  -> sekolah membuat follow-up
  -> admin membaca placement metrics
```

Dashboard yang terlibat:

- DUDI: Placement Pipeline.
- Guru: Placement Follow-Up.
- Admin: Placement Metrics.
- Orang Tua/Siswa: notifikasi yang disederhanakan.

---

# Visual Direction Per Role

## Siswa

- Mobile card besar.
- Banyak progress visual.
- Copy pendek.
- CTA besar.
- Warna hijau lembut dan kuning achievement.
- Hindari tabel.

## Orang Tua

- Mobile card tenang.
- Timeline dan checklist.
- Bahasa sederhana.
- Consent dibuat seperti keputusan yang jelas, bukan dokumen legal panjang.

## Guru

- Dashboard desktop.
- Kombinasi metric, table, drawer, tab detail.
- Search/filter kuat.
- Evidence dan consent dibuat cepat diproses.

## DUDI

- Professional talent dashboard.
- Candidate card pseudonim.
- Skill chips, score, evidence summary, validation seal.
- Privacy wall selalu terlihat.

## Admin

- Governance dashboard.
- Metric dan alert kuat.
- Audit, consent, report, dan tenant management.
- Lebih padat, tetapi tetap clean.

---

# Komponen Yang Perlu Disiapkan Untuk Mockup

Komponen shared:

- AppHeader
- Sidebar
- BottomNavigation
- RoleBadge
- MetricCard
- JourneyStepper
- EvidenceCard
- PortfolioSummary
- ConsentBadge
- PrivacyNotice
- ValidationSeal
- PlacementPipeline
- AuditTimeline
- DataTable
- FilterBar
- DetailDrawer
- ConfirmModal
- Toast
- EmptyState
- LoadingState
- ErrorState
- AccessibilityPanel

Komponen siswa/orang tua:

- TodayMissionCard
- ProgressRing
- HomeSupportChecklist
- ParentConsentCard
- StudentFeedbackCard

Komponen guru:

- StudentTable
- EvidenceReviewQueue
- StudentDetailTabs
- ConsentQueue
- TeacherNoteComposer

Komponen DUDI:

- CandidatePublicCard
- CandidatePrivacyBoundary
- JobPostingCard
- ValidationForm
- DudiSafeReportPreview

Komponen admin:

- GovernanceMetricGrid
- RiskAlertPanel
- UserRoleManager
- TenantSwitcher
- AuditLogTable
- ReportCenterPanel

---

# Checklist Sebelum Generate Mockup

Gunakan checklist ini sebelum membuat mockup per dashboard.

1. Apakah tagline `Menghubungkan potensi, mewujudkan mandiri` sudah muncul?
2. Apakah role user langsung jelas dari first viewport?
3. Apakah next action terlihat?
4. Apakah dashboard menunjukkan output produk, bukan hanya menu kosong?
5. Apakah data DUDI sudah aman dan pseudonim?
6. Apakah consent status terlihat di flow yang membutuhkan data sharing?
7. Apakah ada empty/loading/error/blocked state?
8. Apakah siswa dan orang tua mobile-first?
9. Apakah guru/DUDI/admin cukup efisien untuk kerja data?
10. Apakah visual masih konsisten dengan landing SyncVoca: cerah, hijau-putih, ramah, berbasis bukti?

