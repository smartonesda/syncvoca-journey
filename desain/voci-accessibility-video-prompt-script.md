# Prompt Dan Naskah Video Fitur Inklusi Voci SyncVoca

Dokumen ini menjadi acuan produksi video explainer khusus untuk menjelaskan fitur SyncVoca yang memfasilitasi ABK dan penyandang disabilitas.

Video ini berbeda dari video explainer landing page dan dashboard umum. Fokus video ini adalah menunjukkan bahwa SyncVoca bukan hanya terlihat inklusif secara visual, tetapi juga punya fitur pendukung akses, panduan, suara, kontrol, privasi, dan alur pendampingan yang masuk akal untuk berbagai kebutuhan pengguna.

Tagline utama:

```text
Menghubungkan potensi, mewujudkan mandiri.
```

## Tujuan Video

Video ini harus membuat penonton paham bahwa SyncVoca membantu ABK dan disabilitas melalui:

1. Tampilan yang bisa disesuaikan.
2. Text to Voice untuk membacakan isi halaman.
3. Highlight teks yang sedang dibacakan.
4. Voice Command untuk navigasi dasar tanpa tangan.
5. Tombol next, previous, stop, dan ulang baca untuk user yang memakai tangan.
6. Guided Tour yang menyorot elemen penting satu per satu.
7. Bahasa UI yang sederhana, bertahap, dan tidak menghakimi.
8. Privacy Wall agar data sensitif anak tetap aman.
9. Dashboard per peran agar siswa, orang tua, guru, DUDI, dan admin punya tanggung jawab yang jelas.

## Posisi Video Dalam Materi SyncVoca

Video ini bisa dipakai sebagai:

- video kedua setelah video explainer produk utama,
- video khusus saat presentasi fitur aksesibilitas,
- video demo singkat untuk juri,
- materi onboarding operator/pendamping,
- materi edukasi untuk sekolah, orang tua, dan DUDI.

Durasi rekomendasi:

- Versi utama: 2 menit sampai 2 menit 30 detik.
- Versi singkat: 60 sampai 75 detik.

Format:

- Utama: 16:9 landscape.
- Alternatif: 9:16 vertical.
- Style: clean, putih-hijau, edukatif, ramah, tidak terlalu ramai.

## Asset Yang Disarankan

### Karakter Voci

Gunakan asset Voci berikut:

```text
frontend/public/voci/full-body.png
frontend/public/voci/half-body.png
frontend/public/voci/head.png
frontend/public/voci/raise-hand.png
frontend/public/voci/raise-hand-half.png
```

Rekomendasi:

- Opening: `raise-hand.png`.
- Penjelasan panel fitur: `raise-hand-half.png`.
- Floating assistant: `head.png`.
- Scene voice dan guided tour: `half-body.png`.
- Closing: `full-body.png` atau `raise-hand.png`.

### Screenshot Dan UI Yang Disarankan

Gunakan screenshot atau rekaman dari:

```text
frontend landing page:
- Beranda
- Cara Kerja
- Tentang Kami

prototype demo:
- Landing Prototype
- Dashboard Siswa
- Dashboard Orang Tua
- Dashboard Guru
- Dashboard DUDI
- Dashboard Admin
- Accessibility Panel
- Text to Voice Assistant
- Guided Tour overlay
```

Jika ingin memakai file screenshot desain:

```text
docs/desain/pages/landingpages/beranda/full-page.png
docs/desain/pages/landingpages/cara-kerja/full-page.png
docs/desain/pages/dashboard/siswa/1.png
docs/desain/pages/dashboard/orang-tua/1.png
docs/desain/pages/dashboard/guru/beranda.png
docs/desain/pages/dashboard/DUDI/beranda.png
docs/desain/pages/dashboard/admin/beranda.png
```

Untuk scene fitur aksesibilitas, lebih baik memakai screen recording pendek dari prototype agar toggle dan highlight terlihat hidup.

## Prompt Global Video

Gunakan prompt ini sebagai prompt utama untuk AI video generator atau arahan editor.

```text
Buat video explainer fitur inklusi SyncVoca dengan karakter Voci, seekor kucing oranye berkacamata futuristik dan memakai jaket hijau SyncVoca. Voci tampil sebagai mentor digital yang hangat, jelas, dan mudah dipahami. Voci menjelaskan fitur-fitur yang membantu ABK dan penyandang disabilitas memakai SyncVoca dengan lebih mandiri, tetap didampingi guru atau operator bila dibutuhkan.

Gaya visual clean, modern, putih-hijau, edukatif, ramah, dan profesional. Gunakan studio digital minimalis dengan daun lembut, grid tipis, glow hijau, dan panel UI glassmorphism. Screenshot UI harus tetap tajam, tidak boleh berubah teksnya, tidak boleh terdistorsi, dan tidak boleh menampilkan data sensitif.

Video harus memperlihatkan Voci menatap ke arah panel UI, menunjuk fitur yang sedang dijelaskan, lalu panel UI melakukan zoom pelan ke area fitur. Setiap fitur diberi highlight hijau atau kuning lembut. Saat menjelaskan text-to-voice, tampilkan teks halaman yang dibacakan dengan mark/highlight aktif mengikuti suara. Saat menjelaskan voice command, tampilkan mikrofon aktif dan contoh command seperti "baca halaman", "lanjut", "sebelumnya", "berhenti membaca", "scroll bawah", dan "buka siswa".

Fokus video: personalisasi tampilan, font besar, kontras tinggi, font bantu disleksia, reduced motion, text to voice, voice command, guided tour, next/previous controls, stop voice, privacy wall, consent, dan dashboard per role. Narasi bahasa Indonesia, kalimat pendek, tidak terlalu teknis, menghargai ABK, tidak memakai nada belas kasihan, dan menekankan potensi serta kemandirian.

Ending menampilkan Voci di tengah, kolase fitur aksesibilitas dan dashboard di belakang, lalu teks: "SyncVoca - Menghubungkan potensi, mewujudkan mandiri."
```

## Negative Prompt

```text
Jangan membuat ABK terlihat lemah atau dikasihani. Jangan memakai tone sedih. Jangan menampilkan diagnosis, catatan medis, kontak wali, atau data sensitif anak. Jangan membuat UI terlalu gelap atau terlalu ramai. Jangan mengubah isi screenshot. Jangan membuat teks UI menjadi acak. Jangan membuat gerakan kamera terlalu cepat. Jangan memakai flicker, glitch, atau efek yang bisa mengganggu pengguna sensitif gerakan. Jangan menjanjikan aksesibilitas sempurna tanpa pendampingan. Jangan mengganti logo SyncVoca.
```

## Aturan Narasi

1. Gunakan kata "membantu", bukan "menyembuhkan".
2. Gunakan kata "kebutuhan dukungan", bukan hanya "kekurangan".
3. Jelaskan fitur dengan contoh nyata.
4. Untuk pengguna tanpa tangan, tekankan voice command.
5. Untuk pengguna tunanetra atau low vision, tekankan text-to-voice, kontras, dan ukuran huruf.
6. Untuk pengguna disleksia atau neurodivergent, tekankan font bantu baca, guided tour, langkah bertahap, dan reduced motion.
7. Untuk pengguna yang tidak dapat memakai suara, tekankan tombol next, previous, stop, dan kontrol manual.
8. Untuk orang tua/guru/operator, tekankan pendampingan tetap penting.
9. Untuk DUDI, tekankan data publik aman, bukan data sensitif anak.

## Struktur Video Utama

Total durasi rekomendasi: 135 detik.

| Scene | Durasi | Fokus | Visual Utama |
| --- | ---: | --- | --- |
| 1 | 0-12s | Opening Voci dan janji fitur inklusi | Voci + kolase fitur |
| 2 | 12-30s | Tampilan dapat disesuaikan | Accessibility Panel |
| 3 | 30-52s | Text to Voice dan highlight bacaan | Halaman dibacakan + mark teks |
| 4 | 52-72s | Voice Command dan navigasi tanpa tangan | Mic aktif + command bubbles |
| 5 | 72-92s | Guided Tour dan step-by-step | Overlay highlight elemen |
| 6 | 92-112s | Dashboard per peran mendukung kolaborasi | Siswa, orang tua, guru |
| 7 | 112-126s | Privacy Wall, consent, dan DUDI-safe data | DUDI/Admin panel |
| 8 | 126-135s | Closing dan tagline | Voci + kolase produk |

## Shot List, Prompt, Dan Naskah

### Scene 1 - Opening: SyncVoca Dibuat ABK-First

Durasi: 0 sampai 12 detik.

Visual:

- Background putih dengan glow hijau lembut.
- Voci melambaikan tangan di sisi kanan.
- Di belakang Voci muncul kolase kecil: accessibility panel, guided tour, text-to-voice, dashboard siswa, dashboard guru, dashboard DUDI.
- Teks utama muncul: "Fitur Inklusi SyncVoca".

Prompt scene:

```text
Voci, orange cat mascot with futuristic glasses and green SyncVoca jacket, waves warmly in a clean white and green digital studio. Behind Voci, small floating UI panels show accessibility settings, text-to-voice, guided tour, student dashboard, teacher dashboard, and DUDI privacy panel. Soft green glow, subtle leaves, professional educational style. Voci looks at camera, then turns to the UI panels.
```

Naskah:

```text
Halo, aku Voci.
Di video ini, kita akan melihat fitur SyncVoca yang membantu ABK dan penyandang disabilitas memakai platform dengan lebih nyaman.
Fokusnya bukan hanya tampilan yang bagus.
Fokusnya adalah akses, pendampingan, privasi, dan langkah belajar yang mudah diikuti.
```

Caption:

```text
Fitur Inklusi SyncVoca
Menghubungkan potensi, mewujudkan mandiri
```

### Scene 2 - Tampilan Yang Bisa Disesuaikan

Durasi: 12 sampai 30 detik.

Visual:

- Panel Accessibility muncul besar.
- Voci menunjuk toggle dan pilihan:
  - Ukuran Huruf: Normal, Besar, Sangat Besar.
  - Kontras Tinggi.
  - Font Disleksia.
  - Kurangi Gerakan.
  - Text to Voice.
- Setiap fitur aktif satu per satu.
- UI halaman berubah secara visual: teks membesar, kontras meningkat, gerakan menjadi lebih tenang.

Prompt scene:

```text
Show a SyncVoca accessibility settings panel as a floating UI card. Voci stands beside it and points to each option. Animate the controls one by one: font size normal to large to extra large, high contrast toggle, dyslexia helper font toggle, reduced motion toggle, and text-to-voice toggle. In the background, a sample page updates subtly to show larger text, clearer contrast, and calmer motion. Keep design bright, readable, and clean.
```

Naskah:

```text
Pertama, SyncVoca menyediakan mode aksesibilitas.
Pengguna bisa memperbesar huruf, mengaktifkan kontras tinggi, memakai font bantu baca untuk disleksia, dan mengurangi gerakan animasi.
Ini membantu user dengan low vision, disleksia, sensitivitas gerakan, atau kebutuhan baca yang berbeda.
Setiap pengguna bisa memakai tampilan yang paling nyaman untuk dirinya.
```

Caption:

```text
Tampilan bisa disesuaikan dengan kebutuhan dukungan
```

### Scene 3 - Text to Voice Dengan Highlight Teks

Durasi: 30 sampai 52 detik.

Visual:

- Screenshot halaman prototype atau landing page muncul.
- Panel Text to Voice muncul di kanan bawah.
- Voci menekan tombol "Baca".
- Halaman mulai dibacakan.
- Setiap heading, paragraf, atau tombol yang dibaca diberi highlight hijau-kuning.
- Kamera zoom ke teks aktif.
- Tampilkan indikator: "Membaca 3/24".

Prompt scene:

```text
Show a SyncVoca page with text-to-voice assistant panel. Voci clicks the read button. The page text is read aloud and the active paragraph gets a soft green-yellow highlight that moves from section to section in sync with the narration. Add a small progress indicator "Membaca 3/24". Camera slowly follows the highlighted text. Voci looks at the highlighted section and nods gently.
```

Naskah:

```text
Untuk pengguna yang sulit membaca teks panjang, SyncVoca punya Text to Voice.
Saat fitur ini aktif, sistem membacakan isi halaman.
Teks yang sedang dibacakan diberi tanda.
Jadi pengguna tahu bagian mana yang sedang dijelaskan oleh suara.
Fitur ini membantu pengguna tunanetra, low vision, atau pengguna yang lebih mudah memahami informasi lewat audio.
```

Caption:

```text
Teks dibacakan dan ditandai sesuai suara
```

### Scene 4 - Voice Command Untuk Navigasi Tanpa Tangan

Durasi: 52 sampai 72 detik.

Visual:

- Voci menunjuk ikon mikrofon.
- Mic aktif dengan animasi pulse hijau.
- Muncul bubble command:
  - "baca halaman"
  - "lanjut"
  - "sebelumnya"
  - "berhenti membaca"
  - "scroll bawah"
  - "buka siswa"
- UI merespons command:
  - berpindah ke teks berikutnya,
  - berhenti membaca,
  - scroll ke bawah,
  - membuka dashboard siswa.
- Di layar ada catatan kecil: "Butuh izin mikrofon browser".

Prompt scene:

```text
Show Voci next to the Text to Voice panel with a microphone button. The microphone turns green and pulse animation appears. Floating speech bubbles show Indonesian voice commands: "baca halaman", "lanjut", "sebelumnya", "berhenti membaca", "scroll bawah", "buka siswa". The UI responds to each command with smooth movements: next text highlight, previous text, stop reading, scroll down, and open student dashboard. Add a small note: "Butuh izin mikrofon browser".
```

Naskah:

```text
Untuk pengguna yang sulit memakai tangan, SyncVoca menyiapkan Voice Command.
Pengguna bisa mengucapkan perintah sederhana.
Misalnya, baca halaman, lanjut, sebelumnya, scroll bawah, buka siswa, atau berhenti membaca.
Jika pengguna tidak dapat memakai suara, kontrol manual tetap tersedia melalui tombol next, previous, stop, dan ulang.
Jadi akses tidak bergantung pada satu cara saja.
```

Caption:

```text
Voice Command untuk navigasi dasar tanpa tangan
```

### Scene 5 - Guided Tour Yang Menyorot Elemen Penting

Durasi: 72 sampai 92 detik.

Visual:

- Dashboard prototype muncul.
- Guided Tour overlay aktif.
- Area lain blur atau gelap tipis.
- Satu elemen disorot, misalnya:
  - ringkasan progres,
  - tombol aksi utama,
  - portofolio,
  - privacy wall.
- Voci berdiri di samping panel tour dan menunjuk target.
- Tombol "Lanjut" dan "Sebelumnya" terlihat.
- Ada indikator "Langkah 2 dari 5".

Prompt scene:

```text
Show a SyncVoca dashboard with guided tour overlay. The background UI is slightly dimmed while one important element is highlighted with a green focus ring. Voci stands beside the tour card and points to the highlighted element. The tour card shows "Langkah 2 dari 5", with Previous and Next buttons. Animate the highlight moving from progress card to primary action to portfolio card. Keep motion smooth and calm.
```

Naskah:

```text
SyncVoca juga punya Guided Tour.
Fitur ini menyorot bagian penting satu per satu.
Pengguna tidak dipaksa memahami semua menu sekaligus.
Mereka bisa mengikuti langkah kecil, membaca penjelasan, mendengar suara Voci, lalu lanjut ketika sudah siap.
Ini membantu pengguna yang mudah terdistraksi, pengguna neurodivergent, atau user baru yang butuh arahan pelan-pelan.
```

Caption:

```text
Panduan bertahap, satu fokus dalam satu waktu
```

### Scene 6 - Dashboard Per Peran Untuk Pendampingan

Durasi: 92 sampai 112 detik.

Visual:

- Tiga panel UI muncul seperti carousel:
  1. Dashboard Siswa.
  2. Dashboard Orang Tua.
  3. Dashboard Guru.
- Voci menunjuk masing-masing panel.
- Highlight:
  - siswa: journey/progress dan latihan,
  - orang tua: ringkasan perkembangan dan dukungan rumah,
  - guru: siswa butuh perhatian, evidence review, consent.
- Transisi halus antar panel.

Prompt scene:

```text
Show three floating dashboard panels in a carousel: student dashboard, parent dashboard, and teacher dashboard. Voci points to each dashboard as it moves to the center. Highlight student progress and training cards, parent summary and home support cards, then teacher attention list, evidence review, and consent cards. Use smooth green highlight rings and readable UI.
```

Naskah:

```text
Aksesibilitas tidak berhenti di tombol.
SyncVoca juga membagi peran dengan jelas.
Siswa mendapat ruang latihan dan portofolio.
Orang tua mendapat ringkasan perkembangan dengan bahasa yang mudah dipahami.
Guru mendapat dashboard untuk melihat siswa yang perlu perhatian, meninjau bukti, dan menyiapkan pendampingan.
Dengan begitu, siswa tidak berjalan sendirian.
```

Caption:

```text
Siswa, keluarga, dan guru bergerak bersama
```

### Scene 7 - Privacy Wall Dan Data Aman Untuk DUDI

Durasi: 112 sampai 126 detik.

Visual:

- Panel Dashboard DUDI dan Admin muncul berdampingan.
- Voci menunjuk "Privacy Wall".
- Highlight:
  - DUDI hanya melihat kandidat pseudonim,
  - readiness score,
  - skill,
  - evidence,
  - akomodasi kerja,
  - consent approved,
  - validation seal.
- Data sensitif seperti diagnosis, kontak wali, catatan medis, dan catatan keluarga diberi ikon lock dan tidak terlihat.
- Admin panel menunjukkan audit log dan consent governance.

Prompt scene:

```text
Show DUDI dashboard and Admin governance dashboard side by side. Voci points to a "Privacy Wall" shield icon between them. Highlight DUDI-safe candidate data: pseudonym code, readiness score, skills, evidence, work accommodation, consent approved, and validation seal. Sensitive data like diagnosis, guardian contact, medical notes, and family notes are locked behind a privacy wall and not visible. Admin panel shows consent governance and audit log.
```

Naskah:

```text
Untuk DUDI, SyncVoca memakai Privacy Wall.
Industri melihat bukti kompetensi yang relevan, bukan data sensitif anak.
Nama lengkap, diagnosis, kontak keluarga, dan catatan privat tetap terlindungi.
Validasi industri hanya berjalan ketika consent sudah sesuai.
Admin dan sekolah bisa memantau consent serta audit log agar proses tetap aman.
```

Caption:

```text
Bukti kerja bisa dibaca. Data sensitif tetap dijaga.
```

### Scene 8 - Closing: Inklusif, Aman, Dan Bertahap

Durasi: 126 sampai 135 detik.

Visual:

- Semua panel mengecil menjadi kolase rapi.
- Voci berdiri di tengah atau kanan bawah.
- Voci melambaikan tangan.
- Muncul teks:
  - "Aksesibel"
  - "Berbasis bukti"
  - "Aman"
  - "Kolaboratif"
- Closing logo SyncVoca.

Prompt scene:

```text
All UI panels shrink into a clean collage behind Voci. Voci stands in front, waves warmly, and smiles. Words appear one by one: "Aksesibel", "Berbasis Bukti", "Aman", "Kolaboratif". End with SyncVoca logo and tagline. White-green bright background, subtle leaf shapes, professional and warm.
```

Naskah:

```text
SyncVoca dirancang agar akses lebih ramah, proses lebih jelas, dan data tetap aman.
Dengan Voci, pengguna bisa dibantu membaca, mengikuti panduan, memakai perintah suara, atau tetap memakai tombol manual.
Karena setiap anak punya cara belajar yang berbeda.
SyncVoca - Menghubungkan potensi, mewujudkan mandiri.
```

Caption:

```text
SyncVoca
Menghubungkan potensi, mewujudkan mandiri
```

## Naskah Voice Over Utuh

Gunakan ini jika ingin langsung generate audio voice over.

```text
Halo, aku Voci.
Di video ini, kita akan melihat fitur SyncVoca yang membantu ABK dan penyandang disabilitas memakai platform dengan lebih nyaman.
Fokusnya bukan hanya tampilan yang bagus.
Fokusnya adalah akses, pendampingan, privasi, dan langkah belajar yang mudah diikuti.

Pertama, SyncVoca menyediakan mode aksesibilitas.
Pengguna bisa memperbesar huruf, mengaktifkan kontras tinggi, memakai font bantu baca untuk disleksia, dan mengurangi gerakan animasi.
Ini membantu user dengan low vision, disleksia, sensitivitas gerakan, atau kebutuhan baca yang berbeda.
Setiap pengguna bisa memakai tampilan yang paling nyaman untuk dirinya.

Untuk pengguna yang sulit membaca teks panjang, SyncVoca punya Text to Voice.
Saat fitur ini aktif, sistem membacakan isi halaman.
Teks yang sedang dibacakan diberi tanda.
Jadi pengguna tahu bagian mana yang sedang dijelaskan oleh suara.
Fitur ini membantu pengguna tunanetra, low vision, atau pengguna yang lebih mudah memahami informasi lewat audio.

Untuk pengguna yang sulit memakai tangan, SyncVoca menyiapkan Voice Command.
Pengguna bisa mengucapkan perintah sederhana.
Misalnya, baca halaman, lanjut, sebelumnya, scroll bawah, buka siswa, atau berhenti membaca.
Jika pengguna tidak dapat memakai suara, kontrol manual tetap tersedia melalui tombol next, previous, stop, dan ulang.
Jadi akses tidak bergantung pada satu cara saja.

SyncVoca juga punya Guided Tour.
Fitur ini menyorot bagian penting satu per satu.
Pengguna tidak dipaksa memahami semua menu sekaligus.
Mereka bisa mengikuti langkah kecil, membaca penjelasan, mendengar suara Voci, lalu lanjut ketika sudah siap.
Ini membantu pengguna yang mudah terdistraksi, pengguna neurodivergent, atau user baru yang butuh arahan pelan-pelan.

Aksesibilitas tidak berhenti di tombol.
SyncVoca juga membagi peran dengan jelas.
Siswa mendapat ruang latihan dan portofolio.
Orang tua mendapat ringkasan perkembangan dengan bahasa yang mudah dipahami.
Guru mendapat dashboard untuk melihat siswa yang perlu perhatian, meninjau bukti, dan menyiapkan pendampingan.
Dengan begitu, siswa tidak berjalan sendirian.

Untuk DUDI, SyncVoca memakai Privacy Wall.
Industri melihat bukti kompetensi yang relevan, bukan data sensitif anak.
Nama lengkap, diagnosis, kontak keluarga, dan catatan privat tetap terlindungi.
Validasi industri hanya berjalan ketika consent sudah sesuai.
Admin dan sekolah bisa memantau consent serta audit log agar proses tetap aman.

SyncVoca dirancang agar akses lebih ramah, proses lebih jelas, dan data tetap aman.
Dengan Voci, pengguna bisa dibantu membaca, mengikuti panduan, memakai perintah suara, atau tetap memakai tombol manual.
Karena setiap anak punya cara belajar yang berbeda.
SyncVoca - Menghubungkan potensi, mewujudkan mandiri.
```

## Versi Naskah Singkat 60 Detik

```text
Halo, aku Voci.
Aku akan menunjukkan fitur SyncVoca yang membantu ABK dan penyandang disabilitas.

Di mode aksesibilitas, pengguna bisa memperbesar huruf, memakai kontras tinggi, mengaktifkan font bantu baca, dan mengurangi gerakan animasi.
Tampilan bisa disesuaikan dengan kebutuhan dukungan masing-masing.

Dengan Text to Voice, halaman dapat dibacakan.
Teks yang sedang dibaca diberi tanda, agar pengguna tahu bagian mana yang sedang dijelaskan.

Untuk pengguna yang sulit memakai tangan, Voice Command membantu menjalankan perintah seperti baca halaman, lanjut, sebelumnya, scroll bawah, buka siswa, dan berhenti membaca.
Untuk pengguna yang tidak dapat memakai suara, tombol next, previous, stop, dan ulang tetap tersedia.

Guided Tour membantu pengguna memahami halaman satu langkah demi satu langkah.
Sementara Privacy Wall memastikan DUDI hanya melihat bukti kompetensi yang aman, bukan data sensitif anak.

SyncVoca membantu siswa, keluarga, guru, DUDI, dan admin bergerak bersama.
SyncVoca - Menghubungkan potensi, mewujudkan mandiri.
```

## Prompt Storyboard Grid 3x3

Jika AI agent ingin membuat visual storyboard terlebih dahulu, gunakan prompt ini.

```text
Create a 3x3 storyboard grid for a SyncVoca accessibility explainer video featuring Voci, an orange cat mascot with futuristic glasses and green SyncVoca jacket. Style is clean white-green digital studio, educational, professional, soft leaf elements, subtle green glow.

Panel 1: Voci introduces "Fitur Inklusi SyncVoca" with floating UI panels behind.
Panel 2: Accessibility settings panel, Voci points to font size, high contrast, dyslexia font, reduced motion.
Panel 3: Text-to-voice feature, active paragraph highlighted while Voci listens.
Panel 4: Voice command feature, microphone active, command bubbles "baca halaman", "lanjut", "stop", "scroll bawah".
Panel 5: Guided tour overlay, one dashboard element highlighted, Voci points to it.
Panel 6: Student and parent dashboard, Voci shows progress and family support.
Panel 7: Teacher dashboard, Voci points to evidence review and students needing attention.
Panel 8: DUDI and Admin dashboards, Privacy Wall shield protects sensitive data.
Panel 9: Closing, Voci waves with SyncVoca tagline: "Menghubungkan potensi, mewujudkan mandiri."

Keep all UI panels readable, avoid distorted text, avoid dark mood, avoid pity tone, show empowerment and accessibility.
```

## Visual Cue Per Fitur

| Fitur | Visual Yang Harus Terlihat | Pesan Utama |
| --- | --- | --- |
| Ukuran huruf | Text Normal, Besar, Sangat Besar | User bisa memilih kenyamanan baca |
| Kontras tinggi | Toggle aktif, warna lebih tegas | Membantu low vision dan fokus baca |
| Font disleksia | Bentuk font berubah lebih terbaca | Membantu user yang kesulitan membaca pola huruf |
| Reduced motion | Animasi menjadi lebih pelan atau berhenti | Mengurangi distraksi dan motion sensitivity |
| Text to Voice | Panel baca, tombol Baca, Stop, Ulang | Halaman bisa didengar |
| Highlight bacaan | Paragraf aktif diberi mark | Suara dan teks tetap sinkron |
| Voice Command | Mic aktif dan command bubbles | User bisa navigasi tanpa tangan |
| Next/Previous | Tombol prev/next terlihat jelas | Alternatif untuk user yang tidak bisa memakai suara |
| Guided Tour | Spotlight elemen dan langkah 1/5 | User paham satu fokus dalam satu waktu |
| Privacy Wall | Shield dan lock data sensitif | DUDI melihat bukti, bukan data privat |
| Consent | Badge approved / pending | Data dibagikan hanya jika izin sesuai |
| Dashboard per role | Siswa, orang tua, guru, DUDI, admin | Pendampingan dilakukan bersama |

## Contoh Command Yang Bisa Ditampilkan Di Video

Command utama:

```text
baca halaman
berhenti membaca
lanjut
sebelumnya
scroll bawah
scroll atas
buka siswa
buka guru
buka orang tua
buka DUDI
buka admin
masuk portal
mulai panduan
tutup panduan
```

Catatan visual:

- Command tidak perlu semuanya dibacakan.
- Tampilkan 5 sampai 7 command saja agar tidak ramai.
- Untuk command "berhenti membaca", beri efek suara berhenti dan highlight teks hilang.
- Untuk command "lanjut", highlight pindah ke teks berikutnya.
- Untuk command "buka siswa", panel dashboard siswa muncul.

## Catatan Etika Dan Teknis

1. Video boleh menyebut fitur ini membantu ABK dan penyandang disabilitas, tetapi jangan menyebut fitur ini menggantikan pendamping.
2. Untuk anak dengan kebutuhan dukungan tinggi, operator/guru/orang tua tetap perlu membantu onboarding awal.
3. Voice Command membutuhkan izin mikrofon dari browser.
4. Text to Voice mengikuti dukungan browser dan pilihan voice yang tersedia.
5. Jika memakai suara Voci custom, pastikan tetap jelas, tidak terlalu cepat, dan artikulasi bahasa Indonesia mudah dipahami.
6. Jika memakai AI video, screenshot UI sebaiknya dijadikan overlay asli di editor, bukan sepenuhnya digenerate ulang, agar teks tidak rusak.
7. Jika video dipakai untuk lomba, sisipkan satu kalimat bahwa fitur ini masih bisa dikembangkan melalui audit aksesibilitas formal.

## Prompt Pendek Untuk AI Video Generator

Gunakan prompt ini jika tool video hanya menerima prompt pendek.

```text
Create a clean white-green product explainer video for SyncVoca accessibility features. Voci, an orange cat mascot with futuristic glasses and green jacket, explains features for ABK and disabilities. Show real UI screenshots as floating panels: accessibility settings, text-to-voice with highlighted active text, voice command with microphone and commands, guided tour spotlight, role dashboards, privacy wall, and consent. Voci points to UI, looks at camera, and moves smoothly. Tone empowering, not pity. Indonesian narration. End with "SyncVoca - Menghubungkan potensi, mewujudkan mandiri." Keep UI readable and do not distort text.
```

## Catatan Editing

Untuk hasil yang rapi:

1. Pakai screenshot UI asli sebagai layer statis.
2. Tambahkan highlight, pointer, zoom, dan glow di editor.
3. Pisahkan Voci sebagai PNG transparent agar bisa digerakkan dengan keyframe.
4. Gunakan zoom 8 sampai 12 persen saja agar teks tetap terbaca.
5. Saat voice menjelaskan satu fitur, jangan tampilkan terlalu banyak panel sekaligus.
6. Gunakan jeda 0,3 sampai 0,6 detik setelah istilah penting seperti "Text to Voice", "Voice Command", "Privacy Wall", dan "Consent".
7. Untuk versi lomba, pastikan semua caption cukup besar agar terbaca dari proyektor.
8. Untuk versi sosial media, pecah video menjadi beberapa klip:
   - aksesibilitas tampilan,
   - text-to-voice,
   - voice command,
   - privacy wall.

## Checklist Final

- Voci muncul sejak opening dan closing.
- Fitur aksesibilitas tampil sebagai demo, bukan hanya disebut.
- Text-to-voice memperlihatkan highlight teks aktif.
- Voice command memperlihatkan contoh command dan respons UI.
- Ada tombol manual untuk user yang tidak bisa memakai suara.
- Guided tour memperlihatkan spotlight elemen.
- Dashboard per role tersambung dengan kebutuhan pendampingan.
- Privacy Wall dan consent terlihat jelas.
- Tidak ada data sensitif anak yang tampil.
- Tagline muncul di akhir.

