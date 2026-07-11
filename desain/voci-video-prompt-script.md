# Prompt Dan Naskah Video Voci SyncVoca

Dokumen ini menjadi acuan untuk membuat video explainer SyncVoca yang menampilkan karakter Voci sebagai pemandu. Fokus video:

- Menjelaskan landing page secara ringkas, tidak perlu semua halaman.
- Menjelaskan semua dashboard utama: Siswa, Orang Tua, Guru, DUDI, dan Admin.
- Menampilkan screenshot halaman sebagai panel UI yang dizoom, dipan, dan disorot.
- Membuat Voci terlihat hidup: menatap ke arah screenshot, menunjuk bagian penting, lalu kembali menyapa penonton.

Durasi rekomendasi: 2 menit 30 detik sampai 3 menit.

Format rekomendasi:

- Utama: 16:9 landscape untuk presentasi lomba.
- Alternatif: 9:16 vertical untuk teaser media sosial.
- Style: clean, cerah, hijau-putih, edukatif, ramah, tetap profesional.

Tagline utama:

```text
Menghubungkan potensi, mewujudkan mandiri.
```

## Asset Yang Disarankan

### Karakter Voci

Gunakan asset berikut sesuai kebutuhan:

- `frontend/public/voci/full-body.png`
- `frontend/public/voci/half-body.png`
- `frontend/public/voci/head.png`
- `frontend/public/voci/raise-hand.png`
- `frontend/public/voci/raise-hand-half.png`

Rekomendasi pemakaian:

- Opening: `full-body.png` atau `raise-hand.png`.
- Saat menjelaskan UI: `raise-hand-half.png`.
- Floating assistant: `head.png`.
- Closing: `raise-hand.png`.

### Screenshot Landing Page

Gunakan beberapa saja, tidak perlu semua:

- `docs/desain/pages/landingpages/beranda/full-page.png`
- `docs/desain/pages/landingpages/cara-kerja/full-page.png`
- `docs/desain/pages/landingpages/keamanan-data/page.png`
- Opsional: `docs/desain/pages/landingpages/bukti-kerja/page.png`

Landing yang dijelaskan dalam video:

1. Beranda sebagai pengantar produk.
2. Cara Kerja sebagai alur perjalanan.
3. Bukti Kerja dan Keamanan Data sebagai nilai utama.

### Screenshot Dashboard

Dashboard yang wajib masuk:

- `docs/desain/pages/dashboard/siswa/1.png`
- `docs/desain/pages/dashboard/siswa/2.png`
- `docs/desain/pages/dashboard/orang-tua/1.png`
- `docs/desain/pages/dashboard/guru/beranda.png`
- `docs/desain/pages/dashboard/guru/daftar-siswa.png`
- `docs/desain/pages/dashboard/DUDI/beranda.png`
- `docs/desain/pages/dashboard/admin/beranda.png`

## Prompt Global Video

Gunakan prompt ini sebagai prompt utama untuk AI video generator atau sebagai arahan editor.

```text
Buat video explainer produk SyncVoca dengan karakter Voci, seekor kucing oranye berkacamata futuristik, memakai jaket hijau SyncVoca, tampil ramah seperti mentor digital. Voci berada di samping panel UI besar yang berisi screenshot halaman SyncVoca. Voci menatap ke arah screenshot ketika menjelaskan fitur, mengangkat tangan untuk menunjuk bagian penting, lalu sesekali menatap kamera untuk menyapa penonton.

Gaya visual clean, modern, cerah, dominan putih dan hijau SyncVoca, dengan aksen kuning dan biru lembut. Gunakan background studio minimal dengan bentuk daun halus, grid ringan, dan glow hijau tipis. Jangan terlalu ramai. Screenshot UI harus tetap tajam dan terbaca, tidak berubah teksnya, tidak terdistorsi, dan tidak dibuat ulang.

Animasi utama: panel screenshot muncul dengan smooth slide-in, lalu zoom-in pelan ke section penting. Gunakan efek parallax ringan, highlight ring hijau, pointer glow, dan crop zoom ke area yang sedang dijelaskan. Voci bergerak halus: kepala mengikuti arah screenshot, tangan menunjuk, ekspresi ramah, dan ada bounce kecil saat transisi.

Video menjelaskan landing page secara ringkas dan semua dashboard utama: Dashboard Siswa, Orang Tua, Guru, DUDI, dan Admin. Narasi menggunakan bahasa Indonesia yang jelas, hangat, dan mudah dipahami user awam. Tone inklusif, tidak menggurui, tidak terlalu teknis.

Ending menampilkan kolase landing page dan dashboard, Voci melambaikan tangan, lalu muncul teks: "SyncVoca - Menghubungkan potensi, mewujudkan mandiri."
```

## Negative Prompt

```text
Jangan mengubah isi screenshot UI. Jangan membuat teks UI menjadi acak atau tidak terbaca. Jangan mengganti logo SyncVoca. Jangan membuat Voci terlihat menyeramkan, marah, atau terlalu kartun berlebihan. Jangan memakai background gelap dominan. Jangan membuat gerakan kamera terlalu cepat. Jangan menampilkan data sensitif siswa. Jangan tampilkan identitas pribadi siswa di panel DUDI. Jangan gunakan glitch, distortion, flicker berlebihan, atau efek yang membuat halaman sulit dipahami.
```

## Arahan Motion Umum

Gunakan pola animasi berikut di setiap scene:

1. Screenshot muncul sebagai panel besar.
2. Voci melihat ke panel.
3. Panel zoom 8 sampai 15 persen ke area penting.
4. Area penting diberi highlight ring hijau atau glow tipis.
5. Voci menunjuk area tersebut.
6. Transisi ke scene berikutnya memakai wipe hijau lembut atau slide panel.

Kecepatan:

- Zoom lambat: 2 sampai 4 detik.
- Pan antar section: 1 sampai 2 detik.
- Highlight muncul: 0,4 detik.
- Gerak Voci: halus, kecil, tidak hiperaktif.

## Struktur Video

Total durasi rekomendasi: 170 detik.

| Scene | Durasi | Fokus | Asset Utama |
| --- | ---: | --- | --- |
| 1 | 0-12s | Opening Voci dan tagline | Voci full/raise hand |
| 2 | 12-32s | Landing Beranda | Beranda full page |
| 3 | 32-52s | Cara Kerja | Cara Kerja full page |
| 4 | 52-70s | Bukti Kerja dan Keamanan Data | Keamanan Data / Bukti Kerja page |
| 5 | 70-92s | Dashboard Siswa | Siswa 1 dan 2 |
| 6 | 92-112s | Dashboard Orang Tua | Orang Tua 1 |
| 7 | 112-135s | Dashboard Guru | Guru Beranda dan Daftar Siswa |
| 8 | 135-153s | Dashboard DUDI | DUDI Beranda |
| 9 | 153-170s | Dashboard Admin dan Closing | Admin Beranda + kolase |

## Shot List, Prompt, Dan Naskah

### Scene 1 - Opening Voci

Durasi: 0 sampai 12 detik.

Visual:

- Background putih-hijau lembut.
- Voci full body berdiri di kanan bawah atau tengah.
- Logo SyncVoca muncul di kiri.
- Panel kecil berisi kolase landing dan dashboard muncul samar di belakang.
- Voci menatap kamera, lalu melambaikan tangan.

Prompt scene:

```text
Voci, orange cat mascot wearing green SyncVoca jacket and futuristic glasses, standing in a clean white and soft green studio. SyncVoca logo appears on the left. Behind Voci, a subtle collage of website and dashboard screenshots floats with soft blur. Voci waves warmly to camera, then looks toward the floating UI panels. Smooth camera push-in, friendly educational tone, bright lighting, professional product explainer.
```

Naskah:

```text
Halo, aku Voci.
Aku akan mengajak kamu melihat SyncVoca.
Sebuah platform vokasi inklusif yang membantu ABK mengenal potensi, membangun bukti kerja, dan terhubung dengan ekosistem yang aman.
SyncVoca hadir untuk menghubungkan potensi, mewujudkan mandiri.
```

Caption:

```text
SyncVoca
Menghubungkan potensi, mewujudkan mandiri
```

### Scene 2 - Landing Beranda

Durasi: 12 sampai 32 detik.

Asset:

```text
docs/desain/pages/landingpages/beranda/full-page.png
frontend/public/voci/raise-hand-half.png
```

Visual:

- Screenshot Beranda menjadi panel besar di sisi kanan.
- Voci di kiri, menatap ke hero section.
- Zoom ke headline: "Temukan Potensi. Siapkan Masa Depan. Tumbuh Bersama SyncVoca."
- Pan ke section masalah, lalu ke section bukti kerja.

Prompt scene:

```text
Show the SyncVoca landing page screenshot as a large floating UI panel on the right. Voci stands on the left, half body, looking at the screenshot and pointing to the hero headline. Smooth zoom into the hero headline, then gentle pan down to problem cards and proof-work cards. Add a subtle green highlight around the active section. Keep UI screenshot sharp and readable. Voci eye direction follows the highlighted area.
```

Naskah:

```text
Di halaman beranda, user langsung melihat cerita utama SyncVoca.
Setiap ABK punya potensi, tetapi potensi itu perlu dikenali, dilatih, dan ditunjukkan lewat bukti.
Karena itu, landing page menjelaskan masalah yang ingin diselesaikan, cara SyncVoca membantu, dan bagaimana aktivitas belajar berubah menjadi bukti kerja.
```

Caption:

```text
Dari potensi menjadi bukti kerja
```

### Scene 3 - Landing Cara Kerja

Durasi: 32 sampai 52 detik.

Asset:

```text
docs/desain/pages/landingpages/cara-kerja/full-page.png
frontend/public/voci/raise-hand-half.png
```

Visual:

- Screenshot Cara Kerja muncul menggantikan panel sebelumnya.
- Voci menoleh ke stepper perjalanan.
- Zoom ke 5 tahap: Mengenal Diri, Eksplorasi Minat, Pra-Internship, Internship, Siap Kerja.
- Setiap tahap menyala satu per satu.

Prompt scene:

```text
Display the Cara Kerja page screenshot as a crisp floating UI panel. Voci is beside the panel, looking at the journey stepper and pointing with one paw. Animate a smooth zoom into the five-step journey. Highlight each step one by one with a green glow: Mengenal Diri, Eksplorasi Minat, Pra-Internship, Internship, Siap Kerja. Use slow parallax and clear readable UI.
```

Naskah:

```text
Cara kerja SyncVoca dibuat bertahap.
Siswa mulai dari mengenal diri, lalu mengeksplorasi minat.
Setelah itu, siswa berlatih di tahap pra-internship, mencoba pengalaman internship, dan menyiapkan portofolio menuju tahap siap kerja.
Perjalanan ini dibuat agar siswa berkembang pelan-pelan, sesuai dukungan yang dibutuhkan.
```

Caption:

```text
5 tahap perjalanan SyncVoca
```

### Scene 4 - Bukti Kerja Dan Keamanan Data

Durasi: 52 sampai 70 detik.

Asset:

```text
docs/desain/pages/landingpages/bukti-kerja/page.png
docs/desain/pages/landingpages/keamanan-data/page.png
frontend/public/voci/half-body.png
```

Visual:

- Split panel: kiri Bukti Kerja, kanan Keamanan Data.
- Voci berada di tengah bawah, melihat bergantian ke kiri dan kanan.
- Zoom ke evidence/portfolio, lalu zoom ke privacy wall/consent.
- Tampilkan shield glow saat membahas data aman.

Prompt scene:

```text
Create a split-screen product UI scene. Left floating panel shows SyncVoca Bukti Kerja page, right floating panel shows SyncVoca Keamanan Data page. Voci is at the bottom center, looking left when explaining evidence and portfolio, then looking right when explaining privacy wall and consent. Smooth zoom into proof-work section, then zoom into privacy and consent section. Add soft shield icon glow, green-white palette, no UI distortion.
```

Naskah:

```text
Di SyncVoca, bukti kerja bukan sekadar klaim.
Hasil simulasi, catatan pendamping, portofolio, dan validasi dapat menjadi evidence yang lebih mudah dipercaya.
Namun data anak tetap dijaga.
DUDI hanya melihat bukti kompetensi yang relevan dan aman, sementara data sensitif tetap berada pada pihak yang berwenang.
```

Caption:

```text
Bukti kerja jelas. Data sensitif tetap aman.
```

### Scene 5 - Dashboard Siswa

Durasi: 70 sampai 92 detik.

Asset:

```text
docs/desain/pages/dashboard/siswa/1.png
docs/desain/pages/dashboard/siswa/2.png
frontend/public/voci/raise-hand-half.png
```

Visual:

- Panel mobile dashboard siswa muncul seperti layar ponsel.
- Voci di samping ponsel, menatap progress/journey.
- Zoom ke welcome card, journey score, simulasi berikutnya, dan portofolio.
- Gunakan motion ringan seperti app preview.

Prompt scene:

```text
Show Dashboard Siswa screenshots inside a modern smartphone mockup. Voci stands next to the phone, looking at the screen and pointing to journey score and next simulation card. Animate smooth vertical scrolling and zoom into welcome card, journey score, recommended simulation, evidence collected, and portfolio area. Friendly mobile-first PWA feel, soft green accents, readable UI.
```

Naskah:

```text
Di Dashboard Siswa, tampilan dibuat ringan dan suportif.
Siswa bisa melihat misi hari ini, journey score, tahap yang sedang berjalan, simulasi yang disarankan, dan bukti yang sudah terkumpul.
Tujuannya sederhana: siswa tahu langkah kecil berikutnya tanpa merasa sedang diuji.
```

Caption:

```text
Dashboard Siswa: langkah kecil berikutnya
```

### Scene 6 - Dashboard Orang Tua

Durasi: 92 sampai 112 detik.

Asset:

```text
docs/desain/pages/dashboard/orang-tua/1.png
frontend/public/voci/half-body.png
```

Visual:

- Dashboard orang tua tampil sebagai panel mobile/tablet.
- Voci melihat ke card progress anak.
- Zoom ke ringkasan anak, perkembangan minggu ini, dukungan rumah, dan persetujuan data.
- Tone visual lebih hangat dan menenangkan.

Prompt scene:

```text
Display Dashboard Orang Tua screenshot as a clean mobile-tablet UI panel. Voci is beside it, calm and friendly, looking at the child progress summary. Smooth zoom into progress summary, weekly development, home support recommendations, and consent status. Add warm soft green lighting and gentle motion, reassuring family-focused tone.
```

Naskah:

```text
Untuk orang tua, SyncVoca menyajikan perkembangan anak dengan bahasa yang mudah dipahami.
Orang tua dapat melihat progress, kekuatan anak, dukungan yang bisa dilakukan di rumah, dan status persetujuan data.
Dengan begitu, keluarga ikut mendampingi tanpa harus membaca laporan yang rumit.
```

Caption:

```text
Dashboard Orang Tua: progress yang mudah dipahami
```

### Scene 7 - Dashboard Guru

Durasi: 112 sampai 135 detik.

Asset:

```text
docs/desain/pages/dashboard/guru/beranda.png
docs/desain/pages/dashboard/guru/daftar-siswa.png
frontend/public/voci/raise-hand-half.png
```

Visual:

- Screenshot dashboard guru tampil di desktop monitor.
- Voci di kanan monitor, menatap ke prioritas tindakan.
- Zoom ke focus hari ini, ringkasan kelas, prioritas tindakan, progress journey siswa.
- Cut singkat ke daftar siswa, zoom ke filter dan status.

Prompt scene:

```text
Show Dashboard Guru screenshot on a large desktop monitor. Voci stands beside the monitor, looking at the priority panel and pointing to key metrics. Smooth zoom into focus today, class summary metrics, priority actions, student journey progress, and recent activities. Then quick transition to Daftar Siswa screenshot, zoom into filters and student status list. Productive teacher workspace, clean UI, sharp text.
```

Naskah:

```text
Untuk guru, dashboard menjadi ruang kerja utama.
Guru bisa membaca ringkasan kelas, melihat evidence yang menunggu review, memantau consent, dan menemukan siswa yang butuh perhatian.
Di daftar siswa, guru dapat memfilter berdasarkan kelas, tahap journey, status bukti, dan tindak lanjut berikutnya.
```

Caption:

```text
Dashboard Guru: prioritas kelas dan evidence
```

### Scene 8 - Dashboard DUDI

Durasi: 135 sampai 153 detik.

Asset:

```text
docs/desain/pages/dashboard/DUDI/beranda.png
frontend/public/voci/half-body.png
```

Visual:

- Dashboard DUDI tampil sebagai panel desktop.
- Voci menatap ke privacy wall, lalu ke kandidat direkomendasikan.
- Zoom ke privacy wall, kandidat eligible, candidate card DUDI-safe, readiness score, consent approved.

Prompt scene:

```text
Display Dashboard DUDI screenshot as a professional desktop UI panel. Voci looks at the Privacy Wall card first, then points toward recommended candidate cards. Smooth zoom into Privacy Wall, eligible candidates metric, DUDI-SAFE candidate card, readiness score, skill chips, and consent approved badge. Emphasize secure industry collaboration, no sensitive data, clean green-white interface.
```

Naskah:

```text
Untuk DUDI, SyncVoca menampilkan kandidat berbasis bukti, bukan data pribadi.
DUDI melihat candidate code, minat vokasi, readiness score, skill publik, evidence terkurasi, dan status consent.
Privacy wall memastikan industri hanya membaca data yang relevan dan aman.
```

Caption:

```text
Dashboard DUDI: kandidat aman berbasis bukti
```

### Scene 9 - Dashboard Admin Dan Closing

Durasi: 153 sampai 170 detik.

Asset:

```text
docs/desain/pages/dashboard/admin/beranda.png
frontend/public/voci/raise-hand.png
```

Visual:

- Dashboard Admin tampil besar.
- Zoom ke ringkasan ekosistem, risk alert, audit/consent, kesehatan ekosistem.
- Setelah itu, semua screenshot landing dan dashboard menjadi kolase.
- Voci muncul di depan, melambaikan tangan.
- Tagline muncul di akhir.

Prompt scene:

```text
Show Dashboard Admin screenshot as a large governance control panel. Voci points to ecosystem summary, risk alerts, audit, consent governance, and ecosystem health indicators. Smooth zoom and highlight key cards. Then transition into a final collage of landing page and all dashboard screenshots behind Voci. Voci waves to camera. End with SyncVoca logo and text: "Menghubungkan potensi, mewujudkan mandiri." Bright, polished, professional ending.
```

Naskah:

```text
Untuk admin, SyncVoca menyediakan pusat kontrol ekosistem.
Admin dapat memantau users, sekolah, DUDI, consent governance, audit log, report, dan placement metrics.
Semua dirancang agar ekosistem tetap rapi, aman, dan bisa dipertanggungjawabkan.

Inilah SyncVoca.
Platform yang membantu potensi ABK terlihat, dibuktikan, didampingi, dan terhubung ke masa depan yang lebih mandiri.
```

Caption akhir:

```text
SyncVoca
Menghubungkan potensi, mewujudkan mandiri
```

## Naskah Voice Over Full

Gunakan naskah ini jika ingin merekam voice over satu kali secara utuh.

```text
Halo, aku Voci.
Aku akan mengajak kamu melihat SyncVoca.
Sebuah platform vokasi inklusif yang membantu ABK mengenal potensi, membangun bukti kerja, dan terhubung dengan ekosistem yang aman.
SyncVoca hadir untuk menghubungkan potensi, mewujudkan mandiri.

Di halaman beranda, user langsung melihat cerita utama SyncVoca.
Setiap ABK punya potensi, tetapi potensi itu perlu dikenali, dilatih, dan ditunjukkan lewat bukti.
Karena itu, landing page menjelaskan masalah yang ingin diselesaikan, cara SyncVoca membantu, dan bagaimana aktivitas belajar berubah menjadi bukti kerja.

Cara kerja SyncVoca dibuat bertahap.
Siswa mulai dari mengenal diri, lalu mengeksplorasi minat.
Setelah itu, siswa berlatih di tahap pra-internship, mencoba pengalaman internship, dan menyiapkan portofolio menuju tahap siap kerja.
Perjalanan ini dibuat agar siswa berkembang pelan-pelan, sesuai dukungan yang dibutuhkan.

Di SyncVoca, bukti kerja bukan sekadar klaim.
Hasil simulasi, catatan pendamping, portofolio, dan validasi dapat menjadi evidence yang lebih mudah dipercaya.
Namun data anak tetap dijaga.
DUDI hanya melihat bukti kompetensi yang relevan dan aman, sementara data sensitif tetap berada pada pihak yang berwenang.

Di Dashboard Siswa, tampilan dibuat ringan dan suportif.
Siswa bisa melihat misi hari ini, journey score, tahap yang sedang berjalan, simulasi yang disarankan, dan bukti yang sudah terkumpul.
Tujuannya sederhana: siswa tahu langkah kecil berikutnya tanpa merasa sedang diuji.

Untuk orang tua, SyncVoca menyajikan perkembangan anak dengan bahasa yang mudah dipahami.
Orang tua dapat melihat progress, kekuatan anak, dukungan yang bisa dilakukan di rumah, dan status persetujuan data.
Dengan begitu, keluarga ikut mendampingi tanpa harus membaca laporan yang rumit.

Untuk guru, dashboard menjadi ruang kerja utama.
Guru bisa membaca ringkasan kelas, melihat evidence yang menunggu review, memantau consent, dan menemukan siswa yang butuh perhatian.
Di daftar siswa, guru dapat memfilter berdasarkan kelas, tahap journey, status bukti, dan tindak lanjut berikutnya.

Untuk DUDI, SyncVoca menampilkan kandidat berbasis bukti, bukan data pribadi.
DUDI melihat candidate code, minat vokasi, readiness score, skill publik, evidence terkurasi, dan status consent.
Privacy wall memastikan industri hanya membaca data yang relevan dan aman.

Untuk admin, SyncVoca menyediakan pusat kontrol ekosistem.
Admin dapat memantau users, sekolah, DUDI, consent governance, audit log, report, dan placement metrics.
Semua dirancang agar ekosistem tetap rapi, aman, dan bisa dipertanggungjawabkan.

Inilah SyncVoca.
Platform yang membantu potensi ABK terlihat, dibuktikan, didampingi, dan terhubung ke masa depan yang lebih mandiri.
```

## Prompt Ringkas Untuk Generator Video

Jika tool AI video hanya menerima satu prompt pendek, gunakan ini:

```text
Create a 3-minute Indonesian product explainer video for SyncVoca. Use Voci, an orange cat mascot with green SyncVoca jacket and futuristic glasses, as the narrator. Voci stands beside floating UI screenshots, looks at each screenshot, points to important areas, and sometimes looks back to camera. Show landing page overview, how it works, proof-work and data privacy, then all dashboards: student, parent, teacher, DUDI, and admin. Animate screenshots with smooth zoom-in, pan, green highlight rings, and readable UI. Keep brand colors white and green, friendly inclusive tone, professional EdTech style. End with SyncVoca logo and tagline: "Menghubungkan potensi, mewujudkan mandiri." Do not alter UI text, do not distort screenshots, do not show sensitive student data.
```

## Prompt Per Screenshot

Gunakan template ini jika generate video per scene:

```text
Use [SCREENSHOT_PATH] as a sharp floating UI panel. Place Voci using [VOCI_ASSET_PATH] beside the panel. Voci looks toward [TARGET_SECTION], points to it with one paw, then looks back to camera. Animate a smooth zoom into [TARGET_SECTION], add a soft green highlight ring, and keep all UI text readable. Use bright white-green SyncVoca style, clean product explainer lighting, no distortion, no fake UI text.
```

Contoh:

```text
Use docs/desain/pages/dashboard/DUDI/beranda.png as a sharp floating UI panel. Place Voci using frontend/public/voci/half-body.png beside the panel. Voci looks toward the Privacy Wall card, points to it with one paw, then looks back to camera. Animate a smooth zoom into Privacy Wall and candidate cards, add a soft green highlight ring, and keep all UI text readable. Use bright white-green SyncVoca style, clean product explainer lighting, no distortion, no fake UI text.
```

## Catatan Editing

1. Jangan tampilkan terlalu banyak screenshot sekaligus sebelum closing.
2. Tiap scene cukup fokus ke 1 sampai 3 area UI.
3. Saat VO menyebut dashboard tertentu, langsung tampilkan screenshot dashboard tersebut.
4. Saat VO menyebut data aman, tampilkan shield glow, privacy wall, atau consent badge.
5. Saat VO menyebut bukti kerja, tampilkan evidence, portfolio, journey score, atau validation seal.
6. Saat VO menyebut Voci, tampilkan Voci menatap kamera.
7. Jika durasi terlalu panjang, potong bagian landing menjadi 2 scene saja: Beranda dan Cara Kerja plus Privacy.
8. Jika durasi ingin lebih detail, tambahkan scene khusus untuk Bukti Kerja sebelum Keamanan Data.

