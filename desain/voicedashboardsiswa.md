# Voice Dashboard Siswa SyncVoca

Dokumen ini menjadi acuan voice text untuk Dashboard Siswa. Narasi dibuat mobile-first, suportif, sederhana, dan tidak menghakimi. Voci berperan sebagai teman pemandu yang membantu siswa memahami langkah berikutnya tanpa merasa sedang diuji.

Tagline yang boleh muncul di sapaan atau welcome card:

```text
Menghubungkan potensi, mewujudkan mandiri.
```

## Karakter Voci Di Dashboard Siswa

Voci berbicara seperti pendamping kecil yang ramah. Kalimat harus pendek, jelas, dan memberi rasa aman. Hindari kata yang terasa menilai seperti gagal, buruk, atau lemah. Gunakan kata seperti lanjutkan, coba lagi, sudah berkembang, dan langkah berikutnya.

Contoh pembuka global:

```text
Halo, aku Voci.
Aku akan menemani kamu melihat perjalanan hari ini.
Kita mulai pelan-pelan. Lihat langkah berikutnya, lanjutkan latihan, dan kumpulkan bukti kerja dari aktivitasmu.
```

Contoh penutup global:

```text
Bagus, kamu sudah melihat bagian penting hari ini.
Kalau masih bingung, kamu bisa minta bantuan guru.
Kamu tidak harus menyelesaikan semuanya sekaligus. Kita lanjut satu langkah dulu.
```

## Menu Utama Siswa

Menu utama:

1. Beranda
2. Journey
3. Simulasi
4. Portofolio
5. Notifikasi

Menu tambahan:

- Profil Saya
- Aksesibilitas
- Bantuan
- Keluar

## Aturan Voice Untuk Siswa

1. Satu voice item menjelaskan satu tujuan kecil.
2. Selalu beri arahan aksi berikutnya.
3. Jika ada score, jelaskan sebagai penanda progress, bukan nilai akhir.
4. Jika ada evidence, jelaskan sebagai bukti latihan yang sudah dibuat.
5. Jika ada consent atau validasi DUDI, gunakan bahasa sederhana dan tenang.
6. Jika user mengaktifkan text-to-voice, highlight diarahkan ke card atau teks yang sedang dibacakan.

## Beranda Siswa

Tujuan voice: menjawab pertanyaan siswa, "Hari ini aku harus melakukan apa?"

### Beranda - Sapaan Dan Misi Hari Ini

Target: welcome card.

Highlight:

```text
Halo, Rizky. Hari ini kamu bisa melanjutkan simulasi berikutnya.
```

Voice:

```text
Halo, aku Voci.
Ini adalah beranda kamu.
Hari ini kamu bisa melihat tahap perjalananmu, latihan berikutnya, dan bukti kerja yang sudah terkumpul.
SyncVoca membantu menghubungkan potensi, mewujudkan mandiri.
```

CTA voice:

```text
Tekan tombol lanjutkan journey atau mulai simulasi berikutnya jika kamu sudah siap.
```

### Beranda - Journey Score

Target: card journey score.

Highlight:

```text
Journey Score.
```

Voice:

```text
Journey score menunjukkan perkembangan perjalananmu.
Angka ini berasal dari latihan, bukti yang terkumpul, dan progress yang sudah kamu selesaikan.
Score bukan untuk menghakimi. Score membantu kamu tahu bagian mana yang sudah kuat dan bagian mana yang bisa dilatih lagi.
```

### Beranda - Tahap Saat Ini

Target: current stage card.

Highlight:

```text
Tahap saat ini.
```

Voice:

```text
Di sini kamu bisa melihat tahap perjalananmu sekarang.
Tahapnya dimulai dari mengenal diri, eksplorasi minat, pra-internship, internship, lalu siap kerja.
Fokus dulu pada tahap yang sedang terbuka. Satu langkah kecil sudah cukup untuk mulai berkembang.
```

### Beranda - Simulasi Disarankan

Target: recommended simulation card.

Highlight:

```text
Simulasi disarankan.
```

Voice:

```text
Bagian ini menampilkan latihan yang disarankan untuk kamu.
Setiap simulasi punya tujuan, estimasi waktu, dan kemampuan yang dilatih.
Pilih satu simulasi yang paling siap kamu kerjakan hari ini.
```

### Beranda - Bukti Terkumpul

Target: evidence summary card.

Highlight:

```text
Bukti terkumpul.
```

Voice:

```text
Setiap latihan yang kamu kerjakan bisa menjadi bukti kerja.
Di sini kamu bisa melihat jumlah bukti yang sudah terkumpul dan status review dari guru.
Bukti ini nanti membantu portofoliomu menjadi lebih jelas.
```

### Beranda - Feedback Terbaru

Target: teacher feedback card.

Highlight:

```text
Feedback terbaru.
```

Voice:

```text
Feedback dari guru membantu kamu tahu langkah berikutnya.
Baca dengan tenang.
Feedback bukan untuk menyalahkan, tetapi untuk membantu kamu berkembang.
Jika kurang paham, kamu bisa minta bantuan guru.
```

### Beranda - Aksesibilitas Cepat

Target: accessibility shortcut.

Highlight:

```text
Aksesibilitas cepat.
```

Voice:

```text
Kamu bisa menyesuaikan tampilan agar lebih nyaman.
Perbesar teks, aktifkan kontras tinggi, kurangi gerakan, atau nyalakan bantuan suara.
Pilih yang paling membantumu belajar.
```

## Journey Siswa

Tujuan voice: membuat perjalanan terasa bertahap, bukan seperti tes panjang.

### Journey - Stepper 5 Tahap

Target: journey stepper.

Highlight:

```text
Mengenal Diri, Eksplorasi Minat, Pra-Internship, Internship, Siap Kerja.
```

Voice:

```text
Ini adalah perjalanan lima tahap.
Tahap pertama, mengenal diri.
Tahap kedua, eksplorasi minat.
Tahap ketiga, pra-internship.
Tahap keempat, internship.
Tahap kelima, siap kerja.
Lihat tahap yang sedang aktif, lalu lanjutkan aktivitas kecil yang tersedia.
```

### Journey - Cerita Tahap Aktif

Target: active stage explanation.

Highlight:

```text
Tahap aktif.
```

Voice:

```text
Bagian ini menjelaskan tahap yang sedang kamu jalani.
Kamu akan tahu kenapa tahap ini penting, apa yang perlu dilakukan, dan bukti apa yang bisa dibuat.
Tidak perlu terburu-buru. Ikuti langkahnya satu per satu.
```

### Journey - Checklist Aktivitas

Target: activity checklist.

Highlight:

```text
Checklist aktivitas.
```

Voice:

```text
Checklist ini membantu kamu melihat aktivitas yang sudah selesai dan yang belum.
Jika satu aktivitas sudah selesai, kamu bisa lanjut ke aktivitas berikutnya.
Jika belum, kamu bisa mulai dari tugas yang paling mudah.
```

### Journey - Evidence Yang Terhubung

Target: connected evidence.

Highlight:

```text
Evidence yang terhubung.
```

Voice:

```text
Bukti yang muncul di sini terhubung dengan tahap perjalananmu.
Jika evidence sudah direview guru, bukti itu bisa masuk ke portofolio.
Ini membantu perjalananmu terlihat lebih nyata.
```

### Journey - Bantuan Saat Bingung

Target: help panel.

Highlight:

```text
Minta bantuan guru.
```

Voice:

```text
Kalau kamu bingung, kamu tidak sendirian.
Tekan tombol minta bantuan guru.
Tuliskan atau pilih bagian yang membuatmu bingung, lalu guru bisa membantumu.
```

## Simulasi Siswa

Tujuan voice: membantu siswa berlatih lewat aktivitas kecil yang dekat dengan dunia kerja.

### Simulasi - Daftar Simulasi

Target: simulation list.

Highlight:

```text
Daftar simulasi.
```

Voice:

```text
Di sini kamu bisa memilih simulasi.
Ada simulasi yang direkomendasikan, mudah, sedang, atau sudah selesai.
Pilih simulasi yang sesuai dengan kondisi kamu hari ini.
```

### Simulasi - Detail Simulasi

Target: simulation detail.

Highlight:

```text
Detail simulasi.
```

Voice:

```text
Detail simulasi menjelaskan situasi kerja, tugas yang perlu dilakukan, dan hasil yang diharapkan.
Baca atau dengarkan dulu instruksinya.
Jika sudah siap, mulai dari langkah pertama.
```

### Simulasi - Instruksi Bertahap

Target: step instruction.

Highlight:

```text
Instruksi bertahap.
```

Voice:

```text
Ikuti satu instruksi saja setiap kali.
Setelah selesai, tekan lanjut.
Progress kamu akan tersimpan, jadi kamu bisa berhenti dulu jika perlu istirahat.
```

### Simulasi - Hasil Simulasi

Target: simulation result.

Highlight:

```text
Hasil simulasi.
```

Voice:

```text
Ini adalah hasil latihanmu.
Kamu bisa melihat score, akurasi, waktu penyelesaian, dan skill yang terlatih.
Hasil ini bisa menjadi evidence untuk portofolio.
```

### Simulasi - Refleksi Singkat

Target: reflection form.

Highlight:

```text
Refleksi singkat.
```

Voice:

```text
Refleksi membantu kamu mengenal proses belajarmu.
Pilih bagian yang terasa mudah dan bagian yang terasa sulit.
Jawabanmu membantu guru memberi dukungan yang lebih tepat.
```

## Portofolio Siswa

Tujuan voice: menunjukkan bahwa latihan siswa sudah menjadi cerita bukti kerja.

### Portofolio - Ringkasan Portofolio

Target: portfolio summary.

Highlight:

```text
Ringkasan portofolio.
```

Voice:

```text
Portofolio merangkum perjalanan latihanmu.
Di sini ada minat vokasi, skill utama, journey score, evidence terkumpul, dan validasi jika sudah ada.
Portofolio membantu orang lain memahami kemampuanmu lewat bukti.
```

### Portofolio - Evidence Stack

Target: evidence stack.

Highlight:

```text
Evidence stack.
```

Voice:

```text
Evidence stack adalah kumpulan bukti dari latihanmu.
Buktinya bisa berasal dari hasil simulasi, dokumen tugas, foto, video, refleksi, atau catatan guru yang boleh tampil.
Semua disusun agar mudah dibaca.
```

### Portofolio - Skill Yang Terbukti

Target: proven skills.

Highlight:

```text
Skill yang terbukti.
```

Voice:

```text
Bagian ini menunjukkan skill yang sudah mulai terlihat.
Setiap skill didukung oleh evidence.
Jadi kemampuanmu tidak hanya disebutkan, tetapi ditunjukkan melalui bukti.
```

### Portofolio - Validasi DUDI

Target: industry validation.

Highlight:

```text
Validasi DUDI.
```

Voice:

```text
Jika ada validasi DUDI, artinya bukti kompetensimu sudah dibaca oleh pihak industri.
Validasi ini hanya bisa dilakukan jika data yang dibagikan sudah aman dan disetujui.
```

### Portofolio - Mode Berbagi Aman

Target: safe sharing mode.

Highlight:

```text
Mode berbagi aman.
```

Voice:

```text
Portofolio bisa punya versi publik yang aman.
Versi publik hanya menampilkan informasi yang diperlukan.
Data pribadi dan catatan sensitif tetap dilindungi.
```

## Notifikasi Siswa

Tujuan voice: membantu siswa memahami pesan penting dan tindakan berikutnya.

### Notifikasi - Daftar Pesan

Target: notification list.

Highlight:

```text
Notifikasi.
```

Voice:

```text
Di sini kamu melihat pesan penting.
Pesan bisa berisi tugas baru, feedback guru, update portofolio, kabar consent, atau informasi placement.
Buka pesan yang paling baru atau yang diberi tanda penting.
```

### Notifikasi - Aksi Pesan

Target: notification action.

Highlight:

```text
Aksi berikutnya.
```

Voice:

```text
Beberapa pesan punya tombol aksi.
Misalnya mulai latihan, baca feedback, lihat portofolio, atau minta bantuan.
Pilih aksi yang sesuai dengan pesan tersebut.
```

## Profil, Aksesibilitas, Dan Bantuan

### Profil Saya

Voice:

```text
Di profil, kamu bisa melihat informasi dasar akun dan preferensi belajar.
Jaga informasi ini tetap benar agar guru bisa mendampingimu dengan tepat.
```

### Aksesibilitas

Voice:

```text
Di pengaturan aksesibilitas, kamu bisa mengubah ukuran huruf, kontras, gerakan, dan bantuan suara.
Pilih pengaturan yang paling nyaman untukmu.
```

### Bantuan

Voice:

```text
Jika ada bagian yang sulit dipahami, buka bantuan.
Kamu bisa membaca panduan pendek atau meminta bantuan guru.
```

### Keluar

Voice:

```text
Jika sudah selesai menggunakan SyncVoca, kamu bisa keluar dari akun.
Pastikan aktivitasmu sudah tersimpan.
```

## Perintah Suara Rekomendasi Untuk Siswa

Perintah ini bisa dipakai jika fitur voice command aktif:

- `Voci, baca halaman ini.`
- `Voci, lanjut.`
- `Voci, ulangi.`
- `Voci, berhenti membaca.`
- `Voci, buka journey.`
- `Voci, buka simulasi.`
- `Voci, buka portofolio.`
- `Voci, minta bantuan guru.`

