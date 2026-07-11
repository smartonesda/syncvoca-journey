# Voice Landing Pages SyncVoca

Dokumen ini menjadi acuan voice text untuk halaman landing di `frontend/`.
Tujuannya agar setiap halaman punya narasi suara yang konsisten, ramah untuk user awam, dan tetap berkorelasi dengan desain serta alur produk SyncVoca.

Sumber penyusunan:

- Halaman yang sudah dislicing di `frontend/`: Beranda, Cara Kerja, dan Tentang Kami.
- Halaman yang belum dislicing penuh: Bukti Kerja, Keamanan Data, Untuk Siapa, Ekosistem, dan Kontak, mengacu pada `docs/desain/sectionpages.md`.
- Karakter voice assistant: Voci.

Tagline wajib yang boleh muncul pada intro, transisi, atau penutup:

```text
Menghubungkan potensi, mewujudkan mandiri.
```

## Karakter Voci

Voci adalah pemandu ringan SyncVoca. Karakternya berupa kucing mentor yang hangat, ingin membantu, dan mudah didekati. Voci tidak berbicara seperti sistem teknis, tetapi seperti teman pendamping yang menjelaskan halaman dengan pelan dan jelas.

### Peran Voci

- Menyambut user saat membuka halaman.
- Menjelaskan inti halaman dengan bahasa sederhana.
- Membantu user memahami alur SyncVoca tanpa harus membaca semua detail sendiri.
- Mengarahkan user ke aksi berikutnya, seperti melihat cara kerja, memahami keamanan data, atau masuk portal demo.
- Menjaga tone tetap inklusif, tidak menghakimi, dan tidak terlalu formal.

### Gaya Bicara Voci

- Gunakan bahasa Indonesia yang natural.
- Kalimat pendek, satu ide per kalimat.
- Hindari istilah teknis yang terlalu berat.
- Jika istilah teknis perlu dipakai, langsung jelaskan maknanya.
- Tidak perlu terlalu kekanak-kanakan, karena pendengarnya bisa siswa, guru, orang tua, DUDI, admin, dan juri.
- Nada suara hangat, jelas, optimis, dan tenang.
- Beri jeda setelah kalimat penting, terutama saat menjelaskan data sensitif, consent, atau langkah perjalanan siswa.

### Pembuka Global Voci

Teks ini bisa dipakai saat Voci pertama kali muncul di landing page:

```text
Halo, aku Voci. Aku akan membantu kamu memahami SyncVoca dengan cara yang sederhana.
Di sini, kita melihat bagaimana potensi siswa ABK dapat dikenali, dilatih, dibuktikan, dan dijaga dengan aman.
SyncVoca hadir untuk menghubungkan potensi, mewujudkan mandiri.
```

### Penutup Global Voci

Teks ini bisa dipakai sebagai penutup halaman atau saat user selesai membaca satu page:

```text
Terima kasih sudah mengenal SyncVoca bersama Voci.
Jika kamu ingin melihat contoh alurnya secara langsung, kamu bisa masuk ke portal demo.
Kita mulai pelan-pelan, dari potensi kecil hari ini, menuju masa depan yang lebih mandiri.
```

## Aturan Voice Untuk Landing Page

1. Setiap halaman sebaiknya punya intro pendek, narasi per section, dan penutup.
2. Voice tidak perlu membaca semua teks UI secara mentah. Voice harus membantu menjelaskan maksud halaman.
3. Untuk mode aksesibilitas text-to-voice, teks yang sedang dibacakan bisa diberi highlight pada heading, card, atau paragraf terkait.
4. Jika ada CTA, Voci menyebutkan manfaat tombolnya, bukan hanya membaca label tombol.
5. Untuk halaman yang berkaitan dengan DUDI, selalu tekankan bahwa DUDI melihat bukti kompetensi yang aman, bukan data sensitif anak.
6. Untuk halaman yang berkaitan dengan ABK dan disabilitas, gunakan narasi yang menghargai kemampuan, bukan narasi belas kasihan.

## Format Data Voice

Setiap item voice disarankan punya format berikut saat nanti diubah ke data aplikasi:

```text
id: slug unik voice
target: section atau komponen yang disorot
highlight: teks pendek yang ditandai saat voice dibacakan
voice: naskah yang dibacakan Voci
cta: aksi lanjutan jika ada
```

## 1. Beranda

Status slicing: sudah ada di `frontend/src/components/landing/beranda/beranda-landing.tsx`.

Tujuan voice halaman Beranda adalah mengenalkan SyncVoca sebagai pintu pertama. User harus langsung paham bahwa SyncVoca membantu ABK menemukan potensi, berlatih, mengumpulkan bukti kerja, dan terhubung ke ekosistem yang aman.

### Beranda - Intro Halaman

Target: hero section.

Highlight:

```text
Temukan Potensi. Siapkan Masa Depan. Tumbuh Bersama SyncVoca.
```

Voice:

```text
Halo, aku Voci.
Selamat datang di SyncVoca.
Di halaman ini, kita akan melihat bagaimana siswa ABK bisa mengenal diri, mengasah kemampuan, dan menyiapkan masa depan dengan bukti kerja yang jelas.
SyncVoca membantu sekolah, keluarga, dan dunia industri berjalan bersama.
Menghubungkan potensi, mewujudkan mandiri.
```

CTA voice:

```text
Kamu bisa masuk ke portal demo untuk melihat contoh alurnya, atau pelajari cara kerja SyncVoca terlebih dahulu.
```

### Beranda - Hero Benefit

Target: trust badge di bawah hero.

Highlight:

```text
Aman dan privasi terlindungi. Berbasis bukti dan terukur. Empati, inklusif, dan aksesibel. Siap validasi industri.
```

Voice:

```text
Ada empat hal penting di SyncVoca.
Pertama, data anak dijaga agar tetap aman.
Kedua, kemampuan siswa ditunjukkan lewat bukti yang terukur.
Ketiga, pengalaman belajar dibuat inklusif dan mudah diakses.
Keempat, bukti kerja bisa membantu proses validasi industri dengan lebih adil.
```

### Beranda - Masalah Yang Ingin Diselesaikan

Target: section masalah.

Highlight:

```text
Masalah yang ingin diselesaikan.
```

Voice:

```text
Banyak ABK punya potensi, tetapi potensinya sering belum terlihat dengan jelas.
Sekolah dan orang tua sebenarnya punya catatan perkembangan, tetapi catatan itu belum selalu menjadi portofolio kerja.
Di sisi lain, DUDI membutuhkan bukti kompetensi yang mudah dipahami.
Karena itu, SyncVoca membantu mengubah proses belajar menjadi bukti yang lebih rapi, tetap aman, dan bisa dipercaya.
```

### Beranda - Cara SyncVoca Membantu

Target: journey 5 tahap.

Highlight:

```text
Mengenal Diri, Eksplorasi Minat, Pra-Internship, Internship, Siap Kerja.
```

Voice:

```text
Perjalanan di SyncVoca dibuat bertahap.
Siswa mulai dari mengenal diri.
Lalu mengeksplorasi minat melalui simulasi.
Setelah itu, siswa masuk ke tahap pra-internship untuk mengasah keterampilan kerja.
Jika sudah siap, siswa bisa mencoba pengalaman internship yang terarah.
Pada akhirnya, portofolio siswa siap dibaca untuk peluang kerja yang lebih nyata.
```

### Beranda - Aktivitas Menjadi Bukti Kerja

Target: bukti kerja cards.

Highlight:

```text
Mengubah Aktivitas Menjadi Bukti Kerja.
```

Voice:

```text
Di SyncVoca, aktivitas belajar tidak berhenti sebagai latihan biasa.
Hasil simulasi, dokumen tugas, foto atau video, catatan pendamping, dan refleksi siswa bisa dikumpulkan sebagai evidence.
Evidence ini kemudian disusun menjadi portofolio.
Dengan begitu, kemampuan siswa tidak hanya diceritakan, tetapi bisa dilihat melalui bukti.
```

### Beranda - Keamanan Data Anak

Target: privacy section.

Highlight:

```text
Keamanan Data Anak.
```

Voice:

```text
Bagian ini penting.
SyncVoca membedakan data publik dan data sensitif.
DUDI hanya melihat informasi kompetensi yang relevan dan aman.
Catatan pribadi, kebutuhan dukungan, dan informasi sensitif tetap berada di pihak yang berwenang.
Sebelum validasi atau placement, consent harus jelas terlebih dahulu.
```

### Beranda - Untuk Setiap Peran

Target: role cards.

Highlight:

```text
Untuk Setiap Peran.
```

Voice:

```text
SyncVoca dirancang untuk banyak peran.
Siswa bisa melihat perjalanan dan bukti perkembangannya.
Guru bisa memantau progress dan memberi pendampingan.
Orang tua bisa memahami perkembangan anak dengan bahasa yang lebih sederhana.
DUDI bisa membaca kandidat berdasarkan bukti kerja yang aman.
Admin membantu menjaga alur, data, dan sistem tetap tertata.
```

### Beranda - Ekosistem Kuat, Dampak Nyata

Target: statistik dan logo mitra.

Highlight:

```text
Ekosistem Kuat, Dampak Nyata.
```

Voice:

```text
SyncVoca bukan hanya aplikasi tunggal.
SyncVoca adalah ruang kolaborasi antara siswa, sekolah, keluarga, dan dunia industri.
Semakin banyak pihak yang terhubung, semakin besar peluang ABK untuk menunjukkan potensi dan menyiapkan masa depan.
```

### Beranda - CTA Penutup

Target: CTA bawah halaman.

Highlight:

```text
Mulai lihat perjalanan ABK menuju masa depan yang lebih cerah.
```

Voice:

```text
Sekarang kamu sudah melihat gambaran besar SyncVoca.
Jika ingin mencoba langsung, masuk ke portal demo.
Jika ingin memahami alurnya lebih pelan, buka halaman cara kerja.
Voci siap membantu kamu menjelajah langkah berikutnya.
```

## 2. Cara Kerja

Status slicing: sudah ada di `frontend/src/components/landing/cara-kerja/cara-kerja-landing.tsx`.

Tujuan voice halaman Cara Kerja adalah menjelaskan perjalanan siswa dari potensi awal sampai menjadi bukti kerja, dengan alur yang mudah dipahami dan tidak terasa teknis.

### Cara Kerja - Intro Halaman

Target: hero section.

Highlight:

```text
Dari Potensi Kecil Hari Ini Menjadi Bukti Kerja.
```

Voice:

```text
Halo, aku Voci.
Di halaman ini, aku akan menjelaskan cara SyncVoca bekerja.
Kita mulai dari hal kecil: mengenal potensi siswa.
Dari sana, siswa belajar lewat simulasi, mengumpulkan bukti, didampingi guru dan orang tua, lalu menyiapkan portofolio yang aman untuk dibaca DUDI.
```

### Cara Kerja - Gambaran 5 Tahap

Target: stepper perjalanan.

Highlight:

```text
Gambaran Perjalanan 5 Tahap.
```

Voice:

```text
SyncVoca memakai lima tahap perjalanan.
Tahap pertama adalah Mengenal Diri.
Tahap kedua adalah Eksplorasi Minat.
Tahap ketiga adalah Pra-Internship.
Tahap keempat adalah Internship.
Tahap kelima adalah Siap Kerja.
Setiap tahap membantu siswa bergerak pelan-pelan, sesuai potensi dan dukungan yang dibutuhkan.
```

### Cara Kerja - Tahap 1 Mengenal Diri

Target: detail tahap pertama.

Highlight:

```text
Mengenal Potensi Siswa.
```

Voice:

```text
Perjalanan dimulai dari mengenal diri.
Di tahap ini, siswa dibantu untuk memahami minat, kemampuan awal, kebutuhan dukungan, dan batas data privat.
Tujuannya bukan memberi label, tetapi memahami apa yang bisa dibantu agar siswa berkembang.
```

### Cara Kerja - Tahap 2 Simulasi Adaptif

Target: detail tahap kedua.

Highlight:

```text
Belajar Lewat Simulasi Adaptif.
```

Voice:

```text
Setelah mengenal diri, siswa mencoba simulasi kerja.
Simulasi dibuat seperti tugas kecil yang dekat dengan dunia kerja.
Sistem bisa membaca skor, akurasi, waktu, dan konsistensi.
Dari sini, guru bisa melihat latihan apa yang perlu diperkuat.
```

### Cara Kerja - Tahap 3 Aktivitas Menjadi Bukti

Target: detail tahap ketiga.

Highlight:

```text
Aktivitas Menjadi Bukti.
```

Voice:

```text
Setiap aktivitas yang bermakna bisa menjadi bukti.
Hasil simulasi, dokumen tugas, foto, video, refleksi, dan catatan pendamping bisa masuk ke evidence stack.
Bukti ini membantu perkembangan siswa terlihat lebih jelas.
```

### Cara Kerja - Tahap 4 Pendampingan

Target: detail tahap keempat.

Highlight:

```text
Guru dan Orang Tua Mendampingi.
```

Voice:

```text
SyncVoca tidak menggantikan guru atau orang tua.
Platform ini membantu mereka melihat progress, membaca catatan, dan menyusun rencana latihan.
Dengan pendampingan yang tepat, siswa tidak berjalan sendiri.
```

### Cara Kerja - Tahap 5 Portofolio DUDI

Target: detail tahap kelima.

Highlight:

```text
Portofolio Siap Dibaca DUDI.
```

Voice:

```text
Setelah bukti terkumpul, portofolio siswa bisa disiapkan.
Portofolio berisi skill utama, journey score, evidence, minat vokasi, dan kesiapan kerja.
DUDI membaca bagian yang relevan dan aman, bukan data pribadi yang sensitif.
```

### Cara Kerja - Validasi Industri Dengan Data Aman

Target: validation section.

Highlight:

```text
Validasi Industri dengan Data Aman.
```

Voice:

```text
Validasi industri dilakukan dengan prinsip aman.
DUDI melihat bukti kompetensi yang sudah dikurasi.
Data sensitif siswa tetap dilindungi.
Jika validasi disetujui, hasilnya bisa menjadi Industry Validation Seal.
Seal ini menunjukkan bahwa kompetensi siswa sudah dibaca oleh pihak industri.
```

### Cara Kerja - Contoh Cerita Siswa

Target: student story.

Highlight:

```text
Contoh Cerita Siswa.
```

Voice:

```text
Contohnya, Rizky mulai dari minat administrasi.
Ia mencoba simulasi data entry.
Hasilnya masuk ke evidence stack.
Guru memberi rencana latihan, orang tua melihat perkembangan, dan portofolio Rizky siap dibaca DUDI tanpa membuka data sensitif.
Cerita seperti ini membantu proses belajar terasa nyata.
```

### Cara Kerja - CTA Penutup

Target: closing CTA.

Highlight:

```text
Mulai lihat perjalanan ABK menuju masa depan yang lebih cerah.
```

Voice:

```text
Itulah cara SyncVoca bekerja.
Perjalanan dimulai dari mengenal potensi, lalu berjalan menuju bukti kerja.
Jika kamu ingin melihat hasil nyatanya, lanjutkan ke bagian bukti kerja atau masuk ke portal demo.
```

## 3. Bukti Kerja

Status slicing: belum menjadi page penuh. Narasi mengacu pada `sectionpages.md` dan sebagian section Beranda.

Tujuan voice halaman Bukti Kerja adalah menjelaskan bahwa potensi ABK perlu dibuktikan lewat aktivitas, evidence, portofolio, dan validasi yang aman.

### Bukti Kerja - Intro Halaman

Target: hero section.

Highlight:

```text
Potensi tidak cukup diceritakan, perlu dibuktikan.
```

Voice:

```text
Halo, aku Voci.
Di halaman ini, kita akan memahami bukti kerja.
Banyak siswa punya kemampuan yang baik, tetapi kemampuan itu sering sulit terlihat jika hanya diceritakan.
SyncVoca membantu mengubah latihan dan simulasi menjadi bukti yang lebih jelas.
```

### Bukti Kerja - Apa Itu Bukti Kerja

Target: definisi bukti kerja.

Highlight:

```text
Apa itu bukti kerja di SyncVoca.
```

Voice:

```text
Bukti kerja adalah kumpulan hasil yang menunjukkan kemampuan siswa.
Isinya bisa berupa hasil simulasi, skor, catatan pendamping, dokumen tugas, foto, video, portofolio kompetensi, dan validation seal.
Semua bukti disusun agar mudah dipahami oleh sekolah, keluarga, dan DUDI.
```

### Bukti Kerja - Dari Simulasi Menjadi Evidence

Target: alur evidence.

Highlight:

```text
Dari simulasi menjadi evidence.
```

Voice:

```text
Alurnya sederhana.
Siswa mengerjakan misi simulasi.
Hasilnya menghasilkan skor dan metrik.
Lalu data yang relevan masuk ke evidence stack.
Dari evidence stack, portofolio bisa disusun.
Jika sudah aman dan disetujui, bukti itu bisa digunakan untuk validasi DUDI.
```

### Bukti Kerja - ABK Talent Portfolio

Target: portfolio card.

Highlight:

```text
ABK Talent Portfolio.
```

Voice:

```text
Portofolio menjadi tempat yang merangkum perjalanan siswa.
Di dalamnya ada profil minat, skill utama, journey score, bukti simulasi, kebutuhan akomodasi kerja, dan ringkasan kesiapan.
Portofolio ini membantu siswa terlihat dari bukti, bukan hanya dari cerita.
```

### Bukti Kerja - Evidence Stack

Target: daftar evidence.

Highlight:

```text
Evidence Stack.
```

Voice:

```text
Evidence stack adalah tempat bukti dikumpulkan.
Dokumen tugas, foto, video, hasil simulasi, refleksi diri, dan catatan guru bisa tersusun di satu tempat.
Namun, bukti yang tampil ke DUDI tetap harus dikurasi agar aman.
```

### Bukti Kerja - Industry Validation Seal

Target: validation seal.

Highlight:

```text
Industry Validation Seal.
```

Voice:

```text
Industry Validation Seal adalah tanda bahwa bukti kompetensi sudah dibaca dan divalidasi oleh pihak industri.
Seal ini bukan sekadar badge visual.
Seal membantu menunjukkan bahwa kemampuan siswa punya dasar bukti yang bisa dipercaya.
```

### Bukti Kerja - Manfaat Untuk Setiap Pihak

Target: benefit cards.

Highlight:

```text
Siapa yang mendapat manfaat dari bukti kerja.
```

Voice:

```text
Bukti kerja memberi manfaat untuk banyak pihak.
Siswa bisa lebih percaya diri.
Guru punya dasar pendampingan.
Orang tua bisa melihat perkembangan.
DUDI bisa membaca kandidat berdasarkan bukti.
Sekolah dan admin juga punya laporan yang lebih terstruktur.
```

### Bukti Kerja - CTA Penutup

Target: CTA.

Highlight:

```text
Lihat cara kerja atau masuk portal demo.
```

Voice:

```text
Sekarang kamu sudah tahu mengapa bukti kerja penting.
Jika ingin melihat proses pembentukannya, buka halaman cara kerja.
Jika ingin mencoba langsung, masuk ke portal demo.
```

## 4. Keamanan Data

Status slicing: belum menjadi page penuh. Narasi mengacu pada `sectionpages.md` dan section keamanan di Beranda.

Tujuan voice halaman Keamanan Data adalah membangun rasa aman. User perlu memahami bahwa SyncVoca menjaga data ABK melalui privacy wall, consent, role access, dan audit trail.

### Keamanan Data - Intro Halaman

Target: hero section.

Highlight:

```text
Bukti kerja bisa dibaca, data sensitif tetap aman.
```

Voice:

```text
Halo, aku Voci.
Halaman ini menjelaskan bagaimana SyncVoca menjaga data.
Di SyncVoca, bukti kompetensi bisa dibaca oleh pihak yang tepat, tetapi data sensitif anak tetap dilindungi.
Keamanan data adalah bagian utama dari perjalanan ini.
```

### Keamanan Data - Prinsip Keamanan

Target: security principles.

Highlight:

```text
Data minimization, consent, role-based access, audit log.
```

Voice:

```text
SyncVoca memakai beberapa prinsip keamanan.
Data yang dipakai harus seperlunya.
Consent harus jelas sebelum data digunakan untuk validasi.
Setiap peran hanya melihat data sesuai kebutuhan.
Aktivitas penting dicatat agar alur tetap bisa diawasi.
```

### Keamanan Data - DUDI Melihat Apa

Target: public data list.

Highlight:

```text
DUDI melihat data publik yang relevan.
```

Voice:

```text
DUDI tidak perlu melihat semua data siswa.
DUDI cukup melihat kode kandidat, minat vokasi, readiness score, skill publik, evidence terkurasi, akomodasi kerja yang relevan, status consent, validation seal, dan status placement.
Dengan begitu, proses industri tetap bisa berjalan tanpa membuka data sensitif.
```

### Keamanan Data - Data Yang Tetap Internal

Target: internal data list.

Highlight:

```text
Data sensitif tetap internal.
```

Voice:

```text
Beberapa data tetap berada di sekolah, keluarga, atau pihak yang berwenang.
Misalnya nama lengkap siswa, kontak wali, catatan medis, latar keluarga, private notes, catatan guru internal, dan raw support profile.
Data seperti ini tidak dibuka ke DUDI.
```

### Keamanan Data - Consent Sebelum Validasi

Target: consent flow.

Highlight:

```text
Consent diperlukan sebelum validasi dan placement.
```

Voice:

```text
Sebelum data kandidat dipakai untuk validasi industri atau placement, persetujuan harus diminta terlebih dahulu.
Status consent bisa pending, approved, atau revoked.
Jika consent belum aktif, validasi harus ditahan.
Ini penting agar keluarga dan sekolah tetap memiliki kendali.
```

### Keamanan Data - Audit Trail

Target: audit trail.

Highlight:

```text
Audit trail mencatat aktivitas penting.
```

Voice:

```text
Audit trail membantu sistem tetap transparan.
Request consent, validasi, export report, dan update placement dicatat.
Catatan ini membantu admin dan sekolah memeriksa aktivitas penting jika dibutuhkan.
```

### Keamanan Data - Privacy Wall

Target: comparison view.

Highlight:

```text
DUDI melihat. Tetap internal.
```

Voice:

```text
Privacy wall membantu memisahkan dua jenis informasi.
Di satu sisi, ada data yang aman untuk dibaca DUDI.
Di sisi lain, ada data internal yang tetap dilindungi.
Dengan batas yang jelas, bukti kerja tetap berguna tanpa mengorbankan privasi anak.
```

### Keamanan Data - CTA Penutup

Target: CTA.

Highlight:

```text
Pelajari cara kerja atau lihat bukti kerja.
```

Voice:

```text
Keamanan data membuat perjalanan SyncVoca lebih terpercaya.
Jika kamu ingin tahu bagaimana data digunakan dalam alur siswa, lanjutkan ke halaman cara kerja.
Jika ingin melihat outputnya, buka halaman bukti kerja.
```

## 5. Untuk Siapa

Status slicing: belum menjadi page penuh. Narasi mengacu pada `sectionpages.md` dan role section Beranda.

Tujuan voice halaman Untuk Siapa adalah menjelaskan manfaat SyncVoca untuk setiap role: siswa, guru, orang tua, DUDI, dan admin atau sekolah.

### Untuk Siapa - Intro Halaman

Target: hero section.

Highlight:

```text
Satu platform, banyak peran, satu tujuan.
```

Voice:

```text
Halo, aku Voci.
SyncVoca bukan hanya untuk satu pengguna.
Platform ini menghubungkan siswa, guru, orang tua, DUDI, dan admin sekolah.
Setiap peran punya kebutuhan yang berbeda, tetapi tujuannya sama: membantu potensi siswa terlihat dan berkembang.
```

### Untuk Siapa - Untuk Siswa

Target: student role card.

Highlight:

```text
Untuk siswa.
```

Voice:

```text
Untuk siswa, SyncVoca membantu mengenal potensi dan minat.
Siswa bisa berlatih lewat simulasi, melihat progress, membangun portofolio, dan bersiap menuju peluang kerja nyata.
Perjalanannya dibuat bertahap agar tidak terasa menakutkan.
```

### Untuk Siapa - Untuk Guru

Target: teacher role card.

Highlight:

```text
Untuk guru.
```

Voice:

```text
Untuk guru, SyncVoca membantu memantau perkembangan siswa.
Guru bisa melihat hasil simulasi, membuat catatan pendampingan, menyusun rencana latihan, dan membantu proses consent serta portofolio.
Dengan data yang rapi, pendampingan bisa lebih terarah.
```

### Untuk Siapa - Untuk Orang Tua

Target: parent role card.

Highlight:

```text
Untuk orang tua.
```

Voice:

```text
Untuk orang tua, SyncVoca membantu melihat perkembangan anak dengan bahasa yang lebih sederhana.
Orang tua bisa mendapat rekomendasi dukungan di rumah.
Orang tua juga ikut menjaga persetujuan data agar proses tetap aman.
```

### Untuk Siapa - Untuk DUDI

Target: DUDI role card.

Highlight:

```text
Untuk DUDI.
```

Voice:

```text
Untuk DUDI, SyncVoca membantu menemukan talenta berbasis bukti.
DUDI bisa membaca skill, evidence, kebutuhan akomodasi kerja, dan readiness kandidat.
DUDI juga bisa memberi validation seal, tetapi hanya pada data yang aman dan disetujui.
```

### Untuk Siapa - Untuk Admin atau Sekolah

Target: admin role card.

Highlight:

```text
Untuk admin dan sekolah.
```

Voice:

```text
Untuk admin dan sekolah, SyncVoca membantu mengelola data pengguna, memantau consent, melihat audit, dan menjaga kualitas alur.
Peran admin penting agar ekosistem berjalan rapi, aman, dan bisa dipercaya.
```

### Untuk Siapa - Peran Berbeda Data Berbeda

Target: role access explanation.

Highlight:

```text
Peran berbeda, data berbeda.
```

Voice:

```text
Setiap peran punya hak lihat yang berbeda.
Guru melihat siswa sesuai assignment.
Orang tua melihat anak yang terkait.
DUDI melihat bukti kompetensi yang sudah aman.
Admin menjaga alur dan governance.
Pembatasan ini membuat kolaborasi tetap berjalan tanpa membuka data yang tidak perlu.
```

### Untuk Siapa - CTA Penutup

Target: CTA.

Highlight:

```text
Pilih peran di portal demo.
```

Voice:

```text
Sekarang kamu sudah tahu peran siapa saja yang terhubung di SyncVoca.
Jika ingin merasakan alurnya, pilih peran di portal demo.
Kamu juga bisa membuka halaman cara kerja untuk memahami perjalanan dari awal.
```

## 6. Ekosistem

Status slicing: sebagian ada sebagai anchor di Beranda, belum menjadi page penuh. Narasi mengacu pada `sectionpages.md`.

Tujuan voice halaman Ekosistem adalah menjelaskan bahwa SyncVoca menghubungkan sekolah, keluarga, industri, komunitas, dan standar aksesibilitas untuk membantu transisi ABK ke dunia kerja.

### Ekosistem - Intro Halaman

Target: hero section.

Highlight:

```text
Membangun jembatan sekolah, keluarga, dan industri.
```

Voice:

```text
Halo, aku Voci.
Masalah transisi kerja ABK tidak bisa diselesaikan oleh satu pihak saja.
Karena itu, SyncVoca dibangun sebagai ekosistem.
Di sini, siswa, sekolah, keluarga, dan DUDI bisa bergerak bersama.
```

### Ekosistem - Empat Pilar SyncVoca

Target: four pillars.

Highlight:

```text
Siswa, guru atau sekolah, orang tua, dan DUDI.
```

Voice:

```text
Ekosistem SyncVoca punya empat pilar utama.
Siswa menjadi pusat perjalanan.
Guru dan sekolah mendampingi proses belajar.
Orang tua ikut memahami perkembangan dan menjaga consent.
DUDI membaca bukti kompetensi yang aman dan memberi peluang validasi.
```

### Ekosistem - Partner Kunci

Target: partner list.

Highlight:

```text
Partner kunci.
```

Voice:

```text
SyncVoca dapat tumbuh bersama banyak partner.
Sekolah inklusi, SLB, SMK, DUDI, dinas, komunitas ABK, ahli PLB, psikolog, dan mitra sertifikasi bisa terlibat.
Setiap partner membantu membuka jalan yang lebih luas untuk siswa.
```

### Ekosistem - Nilai Ekosistem

Target: value proposition.

Highlight:

```text
Simulasi vokasi adaptif, portofolio digital, privacy wall, validation seal, talent pool aman.
```

Voice:

```text
Nilai utama SyncVoca ada pada keterhubungan.
Siswa berlatih lewat simulasi vokasi adaptif.
Bukti disusun menjadi portofolio kompetensi digital.
Data dijaga melalui privacy wall.
DUDI membaca talent pool yang aman dan berbasis bukti.
```

### Ekosistem - Model Berkelanjutan

Target: sustainability model.

Highlight:

```text
Model berkelanjutan.
```

Voice:

```text
SyncVoca dirancang agar akses untuk ABK tetap inklusif.
Keberlanjutan platform dapat dibangun lewat kemitraan sekolah, industri, CSR, grant, dan validasi modul.
Prinsipnya, platform tidak membebankan biaya utama kepada ABK dan keluarga.
```

### Ekosistem - Dampak Yang Dicapai

Target: impact cards.

Highlight:

```text
Dampak yang ingin dicapai.
```

Voice:

```text
Dampak yang ingin dibangun sederhana tetapi penting.
Potensi ABK lebih terlihat.
Guru punya data pendampingan.
Keluarga lebih memahami perkembangan.
DUDI lebih percaya karena ada bukti.
Transisi dari sekolah ke dunia kerja menjadi lebih terarah.
```

### Ekosistem - Statistik dan Trust Signal

Target: statistics.

Highlight:

```text
Siswa aktif, sekolah bergabung, DUDI mitra, berbasis bukti, aman dan terpercaya.
```

Voice:

```text
Angka dan trust signal membantu menunjukkan skala dampak.
Namun yang paling penting bukan hanya jumlahnya.
Yang penting adalah bagaimana setiap siswa mendapat kesempatan untuk terlihat, didampingi, dan dihargai melalui bukti yang aman.
```

### Ekosistem - CTA Penutup

Target: CTA.

Highlight:

```text
Bergabung sebagai mitra.
```

Voice:

```text
Jika kamu berasal dari sekolah, industri, komunitas, atau lembaga pendukung, kamu bisa menjadi bagian dari ekosistem ini.
Bersama SyncVoca, kita membangun jalur vokasi yang lebih inklusif.
```

## 7. Tentang Kami

Status slicing: sudah ada di `frontend/src/components/landing/tentang-kami/tentang-kami-landing.tsx`.

Tujuan voice halaman Tentang Kami adalah membangun kepercayaan. User perlu memahami alasan SyncVoca dibuat, nilai yang dipegang, dan cara produk ini menjaga amanah data serta masa depan ABK.

### Tentang Kami - Intro Halaman

Target: hero section.

Highlight:

```text
Kami percaya, potensi ABK perlu diberi ruang untuk terlihat.
```

Voice:

```text
Halo, aku Voci.
Di halaman ini, kita mengenal alasan SyncVoca dibuat.
Kami percaya potensi ABK perlu diberi ruang untuk terlihat.
SyncVoca hadir untuk membantu siswa membangun bukti kerja yang aman, terukur, dan dihargai dunia kerja.
```

### Tentang Kami - Cerita Awal SyncVoca

Target: story section.

Highlight:

```text
Cerita Awal SyncVoca.
```

Voice:

```text
SyncVoca berangkat dari satu masalah nyata.
Banyak ABK memiliki potensi luar biasa, tetapi transisi dari sekolah ke dunia kerja masih penuh tantangan.
Bukti kemampuan sering belum terukur, belum terdokumentasi, dan belum sampai ke pihak yang tepat.
Karena itu, SyncVoca membantu membuat perjalanan siswa lebih terlihat dan lebih dipercaya.
```

### Tentang Kami - Misi dan Visi

Target: mission vision cards.

Highlight:

```text
Misi kami. Visi kami.
```

Voice:

```text
Misi SyncVoca adalah membantu ABK membangun bukti kerja yang aman, terukur, dan dapat dipahami oleh sekolah, keluarga, serta dunia industri.
Visinya adalah menjadi ekosistem vokasi inklusif yang membuka jalan menuju kemandirian ekonomi ABK.
```

### Tentang Kami - Nilai Yang Dipegang

Target: values section.

Highlight:

```text
Inklusi, keamanan data, bukti nyata, kolaborasi, aksesibilitas, keberlanjutan.
```

Voice:

```text
Ada beberapa nilai yang dijaga SyncVoca.
Inklusi, agar setiap anak mendapat kesempatan.
Keamanan data, agar privasi tetap terlindungi.
Bukti nyata, agar keputusan tidak hanya berdasarkan asumsi.
Kolaborasi, karena siswa perlu didukung banyak pihak.
Aksesibilitas, agar platform mudah digunakan.
Dan keberlanjutan, agar dampaknya bisa terus berjalan.
```

### Tentang Kami - Pendekatan Produk

Target: approach section.

Highlight:

```text
Pendekatan Produk Kami.
```

Voice:

```text
Produk SyncVoca dirancang dengan prinsip yang humanis.
Ada pendekatan UDL untuk pengalaman belajar yang inklusif.
Ada standar aksesibilitas agar aplikasi lebih mudah digunakan.
Ada privacy wall dan role-based access agar data hanya dibuka sesuai kebutuhan.
Semua pendekatan ini dibuat agar teknologi tetap berpihak pada manusia.
```

### Tentang Kami - Ekosistem Pendidikan dan Industri

Target: ecosystem cards.

Highlight:

```text
Dibangun bersama ekosistem pendidikan dan industri.
```

Voice:

```text
SyncVoca tidak dibangun sendirian.
Ada tim pengembang, sekolah, guru, pembimbing, ahli, mitra industri, orang tua, dan komunitas.
Setiap pihak punya peran dalam membantu ABK menyiapkan masa depan yang lebih mandiri.
```

### Tentang Kami - Komitmen

Target: commitment section.

Highlight:

```text
Kami berkomitmen menjaga amanah yang diberikan.
```

Voice:

```text
Setiap data, setiap bukti, dan setiap langkah pendampingan adalah amanah.
Karena itu, SyncVoca berkomitmen menjaga proses dengan hati-hati.
Tujuannya sederhana: masa depan ABK yang lebih mandiri dan bermakna.
```

### Tentang Kami - CTA Penutup

Target: about CTA.

Highlight:

```text
Berjalan bersama menciptakan masa depan yang lebih inklusif dan bermakna.
```

Voice:

```text
Sekarang kamu sudah mengenal alasan SyncVoca hadir.
Jika ingin tahu alurnya, buka halaman cara kerja.
Jika ingin berdiskusi, hubungi kami.
Jika ingin mencoba langsung, masuk ke portal demo.
```

## 8. Kontak

Status slicing: belum menjadi page penuh. Narasi mengacu pada `sectionpages.md`.

Tujuan voice halaman Kontak adalah mengajak sekolah, DUDI, orang tua, komunitas, dan calon mitra untuk mulai berkomunikasi dengan SyncVoca.

### Kontak - Intro Halaman

Target: hero section.

Highlight:

```text
Mari bangun perjalanan vokasi yang lebih inklusif.
```

Voice:

```text
Halo, aku Voci.
Halaman kontak adalah tempat untuk mulai terhubung dengan SyncVoca.
Jika kamu berasal dari sekolah, DUDI, keluarga, komunitas, atau calon mitra, kamu bisa menyampaikan kebutuhanmu di sini.
Kita bisa mulai dari percakapan kecil untuk membangun perjalanan vokasi yang lebih inklusif.
```

### Kontak - Pilih Kebutuhan

Target: need selection cards.

Highlight:

```text
Pilih kebutuhan Anda.
```

Voice:

```text
Setiap pengunjung bisa datang dengan kebutuhan yang berbeda.
Ada yang dari sekolah.
Ada yang dari DUDI.
Ada orang tua atau wali.
Ada calon mitra.
Ada juga yang ingin melihat demo terlebih dahulu.
Pilih kebutuhan yang paling sesuai agar tim SyncVoca bisa membantu dengan tepat.
```

### Kontak - Form Kontak

Target: contact form.

Highlight:

```text
Form kontak.
```

Voice:

```text
Di form kontak, isi nama, email atau WhatsApp, instansi, peran, kebutuhan, dan pesan.
Gunakan bahasa yang sederhana.
Ceritakan apa yang ingin kamu bangun bersama SyncVoca.
```

### Kontak - Informasi Kontak

Target: contact information.

Highlight:

```text
Informasi kontak.
```

Voice:

```text
Jika kamu ingin menghubungi langsung, gunakan informasi kontak yang tersedia.
Kamu juga bisa melihat kanal sosial media untuk mengikuti kabar terbaru SyncVoca.
```

### Kontak - FAQ Singkat

Target: FAQ section.

Highlight:

```text
FAQ singkat.
```

Voice:

```text
Bagian FAQ membantu menjawab pertanyaan umum.
Misalnya, apakah SyncVoca bisa digunakan oleh sekolah inklusi dan SLB.
Apakah data anak aman.
Apakah DUDI bisa melihat data pribadi siswa.
Apakah demo bisa dicoba dulu.
Dan apakah industri bisa bergabung sebagai mitra.
```

### Kontak - CTA Penutup

Target: alternative CTA.

Highlight:

```text
Masuk portal demo, pelajari cara kerja, atau lihat keamanan data.
```

Voice:

```text
Jika belum siap mengirim pesan, kamu tetap bisa menjelajah.
Masuk ke portal demo untuk mencoba.
Pelajari cara kerja untuk memahami alurnya.
Atau lihat keamanan data untuk mengetahui bagaimana privasi anak dijaga.
```

## Quick Action Voci Untuk Landing Page

Quick action ini bisa dipakai di floating assistant Voci agar konsisten dengan voice text halaman.

### Apa itu SyncVoca?

```text
SyncVoca adalah platform vokasi inklusif yang membantu siswa ABK mengenal potensi, berlatih lewat simulasi, mengumpulkan bukti kerja, dan menyiapkan portofolio yang aman untuk dibaca sekolah, keluarga, dan DUDI.
```

### Bagaimana cara kerjanya?

```text
Cara kerjanya bertahap.
Siswa mengenal diri, mengeksplorasi minat, berlatih di tahap pra-internship, mencoba pengalaman internship, lalu menyiapkan portofolio untuk peluang kerja.
```

### Untuk siapa SyncVoca?

```text
SyncVoca membantu siswa, guru, orang tua, DUDI, dan admin sekolah.
Setiap peran punya tampilan dan akses data yang berbeda sesuai kebutuhannya.
```

### Apakah data anak aman?

```text
Data sensitif anak tetap dilindungi.
DUDI hanya melihat bukti kompetensi yang relevan, sudah dikurasi, dan sesuai consent.
```

### Apa itu Voci?

```text
Aku Voci, pemandu ringan SyncVoca.
Tugasku membantu kamu memahami halaman, menjelaskan alur, dan memberi arahan berikutnya dengan bahasa yang mudah dipahami.
```

### Ajak Masuk Portal Demo

```text
Kalau kamu ingin melihat contoh langsung, kamu bisa masuk ke portal demo.
Di sana, kamu bisa mencoba alur sesuai peran, seperti siswa, guru, orang tua, DUDI, atau admin.
```

## Catatan Implementasi Audio

Gunakan catatan ini saat teks diubah menjadi file audio atau TTS:

1. Gunakan tempo pelan sampai sedang.
2. Beri jeda pendek setelah heading dan kalimat penting.
3. Untuk kata seperti ABK, DUDI, consent, evidence, portfolio, dan validation seal, pastikan pengucapan konsisten.
4. Jika TTS terasa terlalu teknis, ganti `evidence` menjadi `bukti`, tetapi tetap boleh menampilkan istilah aslinya di UI.
5. Untuk user tunanetra, voice harus menyebut konteks section sebelum menjelaskan detail.
6. Untuk user dengan kesulitan kognitif, hindari kalimat panjang dan pecah informasi menjadi beberapa kalimat pendek.
7. Untuk user yang menggunakan guided navigation, setiap voice item sebaiknya bisa diputar ulang, dihentikan, lanjut, dan kembali ke item sebelumnya.

## Urutan Rekomendasi Voice Per Halaman

### Beranda

1. Intro halaman.
2. Hero benefit.
3. Masalah yang ingin diselesaikan.
4. Cara SyncVoca membantu.
5. Aktivitas menjadi bukti kerja.
6. Keamanan data anak.
7. Untuk setiap peran.
8. Ekosistem kuat.
9. CTA penutup.

### Cara Kerja

1. Intro halaman.
2. Gambaran 5 tahap.
3. Tahap mengenal diri.
4. Tahap simulasi adaptif.
5. Tahap aktivitas menjadi bukti.
6. Tahap pendampingan.
7. Tahap portofolio DUDI.
8. Validasi industri dengan data aman.
9. Contoh cerita siswa.
10. CTA penutup.

### Bukti Kerja

1. Intro halaman.
2. Apa itu bukti kerja.
3. Dari simulasi menjadi evidence.
4. ABK Talent Portfolio.
5. Evidence Stack.
6. Industry Validation Seal.
7. Manfaat untuk setiap pihak.
8. CTA penutup.

### Keamanan Data

1. Intro halaman.
2. Prinsip keamanan.
3. DUDI melihat apa.
4. Data yang tetap internal.
5. Consent sebelum validasi.
6. Audit trail.
7. Privacy wall.
8. CTA penutup.

### Untuk Siapa

1. Intro halaman.
2. Untuk siswa.
3. Untuk guru.
4. Untuk orang tua.
5. Untuk DUDI.
6. Untuk admin atau sekolah.
7. Peran berbeda data berbeda.
8. CTA penutup.

### Ekosistem

1. Intro halaman.
2. Empat pilar SyncVoca.
3. Partner kunci.
4. Nilai ekosistem.
5. Model berkelanjutan.
6. Dampak yang dicapai.
7. Statistik dan trust signal.
8. CTA penutup.

### Tentang Kami

1. Intro halaman.
2. Cerita awal SyncVoca.
3. Misi dan visi.
4. Nilai yang dipegang.
5. Pendekatan produk.
6. Ekosistem pendidikan dan industri.
7. Komitmen.
8. CTA penutup.

### Kontak

1. Intro halaman.
2. Pilih kebutuhan.
3. Form kontak.
4. Informasi kontak.
5. FAQ singkat.
6. CTA penutup.
