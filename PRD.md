# PRD SyncVoca Journey

## Ringkasan Produk

SyncVoca Journey adalah platform transisi vokasi inklusif untuk Anak Berkebutuhan Khusus (ABK). Produk ini membantu siswa, guru, orang tua, dan mitra Dunia Usaha/Dunia Industri (DUDI) bekerja dalam satu alur: pemetaan profil dukungan, latihan simulasi vokasi, pemantauan progres, validasi industri, lalu penyusunan portofolio kerja.

Perubahan arah utama: produk tidak lagi hanya mengerucut pada disabilitas. Disabilitas tetap termasuk, tetapi cakupan produk diperluas menjadi ABK, termasuk hambatan fisik, sensorik, intelektual, sosial-emosional, dan neurodivergent seperti autisme, ADHD, dan disleksia.

## Acuan Tambahan 6 Juli 2026

File `Proposal_SyncVoca_Journey_ABK.pdf` dan BMC versi ABK mempertegas bahwa SyncVoca Journey harus diposisikan sebagai ekosistem vokasi-inklusi, bukan hanya aplikasi latihan. Narasi produk perlu menonjolkan gamifikasi UDL, aksesibilitas WCAG 2.2, pemetaan fungsi berbasis ICF-WHO, sinkronisasi empat pilar, ABK Talent Portfolio, Industry Validation Seal, serta model Freemium & Partnership yang tidak membebani ABK atau keluarga sebagai penerima manfaat utama.

Implikasi produk:

1. Landing page harus memperlihatkan output nyata: journey score, sesi bukti, portofolio kompetensi, privacy wall, dan validation seal.
2. BMC harus masuk sebagai sinyal ekosistem: key partners, value proposition, channel/relationship, customer segment, dan revenue stream.
3. Model bisnis yang dikomunikasikan harus etis: SaaS sekolah, subscription DUDI, CSR/grant, validasi modul industri, dan placement fee dari mitra, bukan biaya utama dari siswa/keluarga.
4. Data anak dan kebutuhan dukungan harus mengikuti minimisasi data, persetujuan wali, role-based access, audit log, dan pseudonymized reporting untuk industri.

### Data Boundary DUDI

Role DUDI wajib memakai payload publik khusus, bukan `StudentProfile` penuh. Kontrak data yang boleh tampil:

- kode kandidat pseudonim, misalnya `ABK-01-XXXX`
- segmen sekolah umum, misalnya `SLB/sekolah inklusi mitra`
- minat vokasi, readiness score, skill, evidence simulasi, validation seal, dan kebutuhan akomodasi kerja
- ringkasan portofolio yang tidak menyebut nama siswa, sekolah spesifik, diagnosis, catatan keluarga, atau kontak wali

Data yang tidak boleh masuk ke payload DUDI:

- nama lengkap siswa sebagai identitas utama
- nama sekolah spesifik
- `supportProfile` internal yang dapat memuat label personal
- `bio` mentah dari data siswa
- `sensitiveData`, termasuk medical notes, guardian contact, family background, dan private notes
- catatan guru/orang tua yang belum dikurasi sebagai bukti publik

Implementasi saat ini memakai `createDudiCandidateProfiles` di `src/privacy.ts` sebagai adapter tunggal dari data internal ke data publik DUDI.

### Consent And Audit Log

Setiap penerbitan `Industry Validation Seal` oleh DUDI harus melewati consent gate:

- consent status harus `approved`
- scope wajib mencakup `industry-validation`
- jika consent belum aktif, aksi tidak membuat seal dan harus tercatat sebagai audit event `industry_validation_blocked`
- jika seal berhasil dibuat, sistem mencatat audit event `industry_validation_issued`

Audit log tidak boleh menampilkan data sensitif. Ringkasan audit untuk DUDI memakai kode kandidat pseudonim, status consent, jumlah skill yang divalidasi, company id, dan timestamp. Data seperti nama lengkap siswa, kontak wali, catatan medis, dan catatan keluarga tetap tidak boleh masuk audit surface DUDI.

Consent dikelola oleh role sekolah:

- Guru/Admin dapat request consent saat persetujuan belum lengkap.
- Guru/Admin dapat approve consent untuk scope `portfolio-sharing`, `work-accommodation-sharing`, dan `industry-validation`.
- Guru/Admin dapat revoke consent jika wali/sekolah mencabut izin.
- Setiap perubahan consent wajib mencatat audit event: `consent_requested`, `consent_approved`, atau `consent_revoked`.
- DUDI hanya melihat status consent dan ringkasan aman, bukan nama wali, sekolah spesifik peminta izin, atau catatan privat.

### DUDI-Safe Report Export

Report/PDF untuk DUDI harus dibuat dari `DudiCandidateProfile`, bukan `StudentProfile`. Isi report yang boleh keluar:

- kode kandidat pseudonim
- segmen sekolah umum
- minat vokasi dan readiness score
- skill publik dan kebutuhan akomodasi kerja
- evidence simulasi
- consent status dan scope aman
- Industry Validation Seal
- audit trail publik yang memakai kode kandidat

Report tidak boleh memuat nama siswa, nama sekolah spesifik, kontak wali, catatan medis, family background, private notes, catatan guru mentah, atau field internal `sensitiveData`. Setiap export report harus mencatat audit event `dudi_safe_report_exported`.

### Admin Governance Center

Role Admin perlu menjadi pusat kontrol demo untuk privacy dan consent, bukan hanya master data. Admin harus bisa melihat:

- jumlah consent `industry-validation` yang sudah aktif
- antrean siswa yang masih pending, revoked, missing, atau belum punya scope validasi industri
- jumlah validasi DUDI yang diblokir consent gate
- jumlah `Industry Validation Seal` yang terbit
- jumlah DUDI-safe report yang diekspor
- audit trail terbaru tanpa membuka data privat ke role DUDI

Admin boleh melakukan `request`, `approve`, dan `revoke` consent dari antrean operasional. Setiap perubahan tetap memakai handler audit yang sama dengan panel consent Guru/Admin agar tidak ada jalur bypass.

### DUDI Shortlist And Placement Workflow

Setelah DUDI membaca kandidat dari payload publik dan consent sudah aktif, DUDI perlu punya alur follow-up yang realistis:

- shortlist kandidat ke lowongan aktif
- update status ke `interview`
- update status ke `work_trial`
- update status ke `placed`
- tandai `not_ready` jika kandidat belum dilanjutkan

Shortlist placement oleh DUDI harus melewati consent gate yang sama dengan validasi industri. Jika consent belum `approved` atau belum punya scope `industry-validation`, shortlist harus diblokir dan dicatat sebagai audit event `placement_shortlist_blocked`.

Jika shortlist berhasil, sistem mencatat audit event `candidate_shortlisted`. Setiap perubahan status placement mencatat audit event `placement_status_updated`. Surface DUDI hanya boleh menampilkan kode kandidat, lowongan, perusahaan, status, timestamp, dan catatan pipeline yang tidak memuat nama siswa, sekolah spesifik, kontak wali, atau catatan medis.

### School Placement Outcome Monitoring

Guru/Admin perlu membaca outcome dari pipeline DUDI sebagai dasar tindak lanjut internal sekolah. Surface ini berbeda dari surface DUDI:

- Guru/Admin boleh melihat nama siswa, lowongan, perusahaan, status placement, dan rencana dukungan internal.
- Guru/Admin dapat membuat catatan follow-up berbasis status DUDI.
- Status `interview` memicu rencana latihan interview dan portfolio brief.
- Status `work_trial` memicu rencana job coach, checklist tugas, dan evaluasi harian.
- Status `placed` memicu rencana transisi 30 hari dan monitoring adaptasi.
- Status `not_ready` memicu penguatan evidence, simulasi, dan pendampingan ulang.

Catatan follow-up masuk sebagai `TeacherNote` internal dengan kategori `Saran`. Catatan ini tidak menjadi bagian dari payload publik DUDI dan tidak boleh muncul di `DudiCandidateProfile`, report aman DUDI, atau audit trail DUDI.

### Navigation Reset

Setiap pergantian role, tahap journey, atau siswa/kandidat terpilih harus langsung memindahkan posisi scroll ke top tanpa animasi smooth. Ini menjaga demo tetap jelas: saat user berpindah konteks, halaman baru langsung dimulai dari header dan ringkasan utama, bukan tersisa di posisi scroll lama.

## Masalah Yang Diselesaikan

1. Sekolah dan orang tua sulit menerjemahkan potensi ABK menjadi bukti kompetensi kerja yang mudah dipercaya industri.
2. DUDI sering ragu merekrut kandidat ABK karena tidak memiliki data performa yang objektif, praktis, dan relevan dengan pekerjaan.
3. Data pendampingan siswa tersebar antara sekolah, orang tua, dan pihak industri sehingga perkembangan anak tidak terlihat utuh.
4. Desain produk yang terlalu teknis atau terlalu gelap membuat pesan inklusi terasa berat dan kurang ramah bagi audiens sekolah.

## Tujuan Produk

1. Membuat alur transisi vokasi ABK yang mudah dipahami dari landing page sampai dashboard per peran.
2. Mengubah latihan game menjadi portofolio kompetensi yang dapat dibaca guru, orang tua, dan DUDI.
3. Memisahkan data sensitif siswa dari data kandidat yang boleh dilihat DUDI.
4. Menampilkan identitas visual SyncVoca Journey yang clean, cerah, ramah, dan selaras dengan logo.
5. Menyiapkan UI yang lebih masuk akal untuk demo lomba: cepat dimengerti, tidak terlalu banyak istilah, dan jelas outcome-nya.

## Target Pengguna

### Siswa ABK

Butuh latihan yang terasa seperti game, instruksi sederhana, dukungan aksesibilitas, dan motivasi yang tidak menghakimi.

### Guru atau Pendamping

Butuh dashboard untuk melihat progres siswa, menambah catatan pendampingan, dan menyesuaikan latihan dengan kebutuhan dukungan.

### Orang Tua

Butuh ringkasan perkembangan anak, rekomendasi latihan di rumah, dan bahasa yang mudah dipahami.

### DUDI

Butuh daftar kandidat yang sudah memiliki bukti kompetensi, ringkasan dukungan kerja, dan alat untuk memberikan validasi industri.

### Admin

Butuh manajemen data demo, master sekolah, master DUDI, dan konfigurasi konten dasar tanpa membuat alur terlalu kompleks.

## Prinsip Produk

1. ABK-first, bukan label-first: sistem fokus pada kebutuhan dukungan dan potensi, bukan hanya jenis diagnosis.
2. Realistic demo flow: setiap halaman harus menjawab "apa yang harus dilakukan user berikutnya?"
3. Data minimization: DUDI hanya melihat data kesiapan kerja, portofolio, skill, dan kebutuhan akomodasi kerja. Catatan medis dan keluarga tetap privat.
4. Accessible by default: teks mudah dibaca, kontras cukup, navigasi jelas, dan tetap ada panel aksesibilitas.
5. Proof over claim: klaim inklusi harus ditunjukkan lewat skor, simulasi, catatan guru, dan validation seal.

## Scope MVP

### In Scope

1. Landing page baru dengan narasi ABK dan brand logo.
2. Alur 5 tahap yang lebih sederhana:
   - Intake Dukungan
   - Simulasi Kerja
   - Rencana Pendampingan
   - Portofolio Bukti
   - Validasi DUDI
3. Dashboard siswa dengan fokus pada latihan, portofolio, mentor AI, dan progress.
4. Dashboard guru untuk memantau siswa, menambah catatan, dan melihat rekomendasi intervensi.
5. Dashboard orang tua untuk ringkasan progres dan tugas pendampingan rumah.
6. Dashboard DUDI untuk melihat kandidat, kebutuhan akomodasi, dan menerbitkan Industry Validation Seal.
7. Dashboard admin untuk data siswa, sekolah inklusi/SLB, dan DUDI.
8. Copywriting dan data model yang memakai bahasa ABK secara konsisten.
9. Logo SyncVoca Journey sebagai aset utama.

### Out of Scope Untuk Tahap Ini

1. Backend database produksi.
2. Login multi-user sungguhan.
3. Integrasi payment, subscription, atau job placement fee.
4. AI rekomendasi karier yang benar-benar berbasis model data panjang.
5. Audit WCAG formal oleh pihak ketiga.

## Alur Produk Yang Diusulkan

### 1. Landing Page

Landing page harus langsung menjelaskan:

1. Ini platform transisi vokasi ABK.
2. Ada empat aktor utama: siswa, guru, orang tua, DUDI.
3. Output akhirnya adalah portofolio kerja dan validasi industri.
4. Pengguna bisa masuk demo sebagai salah satu peran.

### 2. Role Workspace

Setelah memilih role, user masuk ke workspace journey yang sama, bukan dashboard yang sepenuhnya terpisah. Tahapnya konsisten: Intake Dukungan, Simulasi Kerja, Rencana Pendampingan, Portofolio Bukti, dan Validasi DUDI. Perbedaan role ada pada copy, prioritas aksi, dan hak melihat data.

### 3. Siswa

Siswa membuka dashboard yang memprioritaskan:

1. Status kesiapan kerja.
2. Simulasi yang direkomendasikan.
3. Portofolio kompetensi.
4. Mentor AI.
5. Validasi yang sudah didapat.

### 4. Guru

Guru memantau daftar siswa, memilih satu siswa, melihat riwayat simulasi, lalu menambah catatan pendampingan dan rekomendasi latihan.

### 5. Orang Tua

Orang tua melihat ringkasan anak, progres terbaru, dan tugas pendampingan rumah. Dashboard orang tua tidak perlu terlalu teknis.

### 6. DUDI

DUDI melihat kandidat dalam format talent pool. Informasi yang tampil harus berupa skill, skor kesiapan, hasil simulasi, kebutuhan akomodasi kerja, dan portofolio. Data medis tidak boleh tampil.

### 7. Admin

Admin mengatur data master untuk demo: siswa, sekolah, DUDI, dan lowongan. Admin tidak menjadi pusat pengalaman utama lomba, hanya pendukung.

## Indikator Keberhasilan

1. Pengunjung memahami produk dalam 10 detik pertama.
2. Istilah "ABK" konsisten di landing, dashboard, prompt AI, data demo, dan dokumen export.
3. DUDI tidak melihat data sensitif siswa.
4. Setiap role punya next action yang jelas.
5. Tampilan terasa clean, cerah, ramah, dan cocok dengan logo SyncVoca Journey.
6. Build dan typecheck lolos setelah refactor.

## Risiko

1. Cakupan ABK terlalu luas sehingga copy menjadi tidak spesifik. Solusi: gunakan "profil dukungan" dan "kebutuhan akomodasi" sebagai bahasa utama.
2. UI menjadi terlalu ramai karena logo berwarna kuat. Solusi: logo menjadi aksen utama, sedangkan permukaan UI tetap putih, hijau lembut, dan kuning lembut.
3. Data sensitif bocor ke tampilan DUDI. Solusi: pisahkan field privat dan field publik sejak model data.
4. Demo terlalu kompleks. Solusi: pertahankan mode demo role-based, tetapi sederhanakan CTA dan navigasi.
