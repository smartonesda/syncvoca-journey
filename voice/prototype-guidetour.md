# Prototype Guide Tour Voice Script

Dokumen ini menjadi acuan voice over Voci untuk guide tour di halaman prototype SyncVoca. Teks disusun agar bisa langsung dipakai untuk generate audio, lalu nanti diintegrasikan ke guided tour prototype.

Sumber alur saat ini:

- `prototype/src/components/LandingPage.tsx`
- `prototype/src/components/RoleDashboardWorkspace.tsx`
- `prototype/src/components/GuidedTour.tsx`

Tagline wajib:

```text
Menghubungkan potensi, mewujudkan mandiri
```

## Persona Voci

Nama maskot: **Voci**

Karakter suara:

- Anak laki-laki, sekitar 9 sampai 12 tahun.
- Ceria, ramah, jelas, dan tidak terburu-buru.
- Terasa seperti teman kecil yang memandu, bukan robot.
- Nada antusias, tetapi tetap lembut dan sopan.
- Hindari gaya terlalu formal.

Prompt TTS yang disarankan:

```text
Suara anak laki-laki Indonesia umur 9 sampai 12 tahun. Ceria, ramah, jelas, hangat, tidak terlalu cepat, dan terdengar seperti maskot kecil yang sedang memandu pengguna memahami aplikasi SyncVoca. Gunakan intonasi positif, natural, dan mudah dipahami.
```

Pengaturan audio yang disarankan:

- Format: `mp3` atau `webm`
- Sample rate: `44.1 kHz` atau `48 kHz`
- Loudness: stabil, jangan terlalu kecil
- Durasi ideal per step: 8 sampai 18 detik
- Folder target nanti: `prototype/public/audio/voci/`

Catatan implementasi saat ini:

- Sample audio landing sudah tersedia di `prototype/public/voice/landing-prototype/`.
- Guide tour akan memutar file audio jika `audioSrc` tersedia.
- Jika file audio untuk suatu step belum ada, sistem fallback ke Web Speech API bawaan browser.

Konvensi nama file:

```text
voci-[page-or-role]-[step-number]-[short-name].mp3
```

Contoh:

```text
voci-landing-01-welcome.mp3
voci-siswa-03-ringkasan-cepat.mp3
voci-dudi-05-privacy-wall.mp3
```

## Opening Umum

Script ini bisa dipakai sebagai audio pembuka global sebelum step pertama pada halaman manapun.

**File:** `voci-global-opening.mp3`

```text
Hai, aku Voci. Selamat datang di portal demo SyncVoca. Di sini aku akan bantu kamu memahami alur, fitur, dan bagian penting di setiap halaman. SyncVoca hadir untuk menghubungkan potensi, mewujudkan mandiri.
```

## Landing Prototype

### Landing 1: Selamat Datang Di SyncVoca

**Target selector:** `landing-hero`  
**File rencana:** `voci-landing-01-welcome.mp3`  
**File sample saat ini:** `/voice/landing-prototype/landing-hero.wav`

```text
Hai, aku Voci. Selamat datang di SyncVoca. Di halaman awal ini, kamu akan melihat cerita besar SyncVoca: bagaimana potensi siswa bisa dikenali, dilatih, lalu diubah menjadi bukti kerja yang mudah dipahami.
```

### Landing 2: Masuk Ke Portal Demo

**Target selector:** `landing-portal-cta`  
**File rencana:** `voci-landing-02-portal-demo.mp3`  
**File sample saat ini:** `/voice/landing-prototype/landing-portal-cta.wav`

```text
Tombol ini adalah pintu masuk ke portal demo. Dari sini, kamu bisa mulai melihat SyncVoca dari sudut pandang siswa, guru, orang tua, DUDI, atau admin.
```

### Landing 3: Pilih Mode Cepat

**Target selector:** `landing-role-picker`  
**File rencana:** `voci-landing-03-role-picker.mp3`  
**File sample saat ini:** `/voice/landing-prototype/landing-role-picker.wav`

```text
Bagian ini membantu kamu masuk lebih cepat ke role yang ingin dicoba. Kalau ingin melihat pengalaman siswa, pilih Siswa. Kalau ingin melihat pengelolaan data dan validasi, pilih role lain yang tersedia.
```

### Landing 4: Alur Produk

**Target selector:** `landing-workflow`  
**File rencana:** `voci-landing-04-workflow.mp3`  
**File sample saat ini:** `/voice/landing-prototype/landing-workflow.wav`

```text
Ini adalah alur utama SyncVoca. Perjalanan dimulai dari intake dukungan, lalu simulasi kerja, rencana pendampingan, portofolio bukti, sampai validasi DUDI.
```

### Landing 5: Bukti Produk

**Target selector:** `landing-proof`  
**File rencana:** `voci-landing-05-proof.mp3`  
**File sample saat ini:** `/voice/landing-prototype/landing-proof.wav`

```text
Di bagian ini, SyncVoca menunjukkan bahwa prosesnya bukan hanya klaim. Ada portofolio talenta, validation seal dari DUDI, dan pendekatan aksesibilitas agar bukti kerja siswa bisa dibaca dengan jelas.
```

### Landing 6: Portal Role Demo

**Target selector:** `landing-portal-roles`  
**File rencana:** `voci-landing-06-role-portal.mp3`  
**File sample saat ini:** `/voice/landing-prototype/landing-portal-roles.wav`

```text
Di sini kamu bisa masuk ke dashboard masing-masing role. Setiap role punya menu, tugas, dan batas akses data yang berbeda, supaya pengalaman demo terasa seperti aplikasi sungguhan.
```

## Dashboard Siswa

### Siswa 1: Dashboard Siswa

**Target selector:** `dashboard-hero`  
**File:** `voci-siswa-01-dashboard-siswa.mp3`

```text
Hai, aku Voci. Selamat datang di Dashboard Siswa SyncVoca. Di sini siswa bisa melihat misi hari ini, perjalanan belajarnya, dan bukti kerja yang mulai terkumpul. Fokusnya sederhana: lanjutkan misi, kumpulkan bukti, dan tumbuh lebih mandiri.
```

### Siswa 2: Menu Role Siswa

**Target selector:** `role-menu`  
**File:** `voci-siswa-02-menu-role.mp3`

```text
Menu ini berisi bagian penting untuk siswa. Ada Beranda, Journey, Simulasi, Portofolio, dan Notifikasi. Semua dibuat agar siswa mudah tahu langkah berikutnya tanpa merasa sedang membaca sistem yang rumit.
```

### Siswa 3: Ringkasan Cepat

**Target selector:** `metric-grid`  
**File:** `voci-siswa-03-ringkasan-cepat.mp3`

```text
Kartu ringkasan ini menunjukkan kondisi terbaru siswa. Ada journey score, jumlah evidence, validation seal, dan status consent. Jadi progres bisa dipahami cepat tanpa membaca banyak tabel.
```

### Siswa 4: Ruang Kerja Utama

**Target selector:** `main-content`  
**File:** `voci-siswa-04-ruang-kerja.mp3`

```text
Ini adalah ruang kerja utama siswa. Di bagian ini, siswa bisa memulai simulasi, melihat feedback guru, mengikuti tahap journey, dan membuka portofolio bukti kerja yang sudah terkumpul.
```

### Siswa 5: Privacy Wall

**Target selector:** `privacy-wall`  
**File:** `voci-siswa-05-privacy-wall.mp3`

```text
Bagian Privacy Wall menjelaskan bahwa data sensitif tetap aman. DUDI hanya boleh melihat bukti kerja yang sudah dikurasi, bukan catatan pribadi siswa.
```

### Siswa 6: Pindah Role Demo

**Target selector:** `role-switcher`  
**File:** `voci-siswa-06-role-switcher.mp3`

```text
Navigator bawah ini dipakai untuk pindah role demo. Kamu bisa kembali ke landing, atau mencoba dashboard guru, orang tua, DUDI, dan admin untuk melihat alur SyncVoca dari sisi lain.
```

## Dashboard Orang Tua

### Orang Tua 1: Dashboard Orang Tua

**Target selector:** `dashboard-hero`  
**File:** `voci-orang-tua-01-dashboard-orang-tua.mp3`

```text
Hai, aku Voci. Selamat datang di Dashboard Orang Tua SyncVoca. Di sini keluarga bisa melihat perkembangan anak, membaca catatan guru, memahami consent, dan menemukan langkah kecil yang bisa dilakukan di rumah.
```

### Orang Tua 2: Menu Role Orang Tua

**Target selector:** `role-menu`  
**File:** `voci-orang-tua-02-menu-role.mp3`

```text
Menu orang tua dibuat sederhana. Ada Ringkasan, Progres, Dukungan, Persetujuan, dan Pesan. Tujuannya agar keluarga mudah memahami apa yang sedang terjadi dan apa yang bisa dibantu dari rumah.
```

### Orang Tua 3: Ringkasan Cepat

**Target selector:** `metric-grid`  
**File:** `voci-orang-tua-03-ringkasan-cepat.mp3`

```text
Kartu ini membantu orang tua melihat kondisi anak secara cepat. Ada score, evidence, validation seal, dan status consent. Semuanya diringkas agar mudah dipahami tanpa istilah yang terlalu teknis.
```

### Orang Tua 4: Ruang Kerja Utama

**Target selector:** `main-content`  
**File:** `voci-orang-tua-04-ruang-kerja.mp3`

```text
Di ruang utama ini, orang tua bisa membaca perkembangan anak, melihat catatan guru, mengecek dukungan rumah, dan memahami batas persetujuan data sebelum portofolio dibagikan ke pihak luar.
```

### Orang Tua 5: Privacy Wall

**Target selector:** `privacy-wall`  
**File:** `voci-orang-tua-05-privacy-wall.mp3`

```text
Privacy Wall membantu keluarga memahami data mana yang aman dibagikan dan data mana yang tetap privat. SyncVoca menjaga agar informasi sensitif anak tidak terbuka ke pihak yang tidak berhak.
```

### Orang Tua 6: Pindah Role Demo

**Target selector:** `role-switcher`  
**File:** `voci-orang-tua-06-role-switcher.mp3`

```text
Gunakan navigator bawah ini untuk berpindah role demo. Dengan begitu, kamu bisa melihat bagaimana informasi dari keluarga tersambung dengan siswa, guru, DUDI, dan admin.
```

## Dashboard Guru

### Guru 1: Ruang Guru

**Target selector:** `dashboard-hero`  
**File:** `voci-guru-01-ruang-guru.mp3`

```text
Hai, aku Voci. Selamat datang di Ruang Guru SyncVoca. Di sini guru bisa membaca pola latihan siswa, melihat evidence, menambah catatan pendampingan, mengatur consent, dan menyiapkan tindak lanjut menuju DUDI.
```

### Guru 2: Menu Role Guru

**Target selector:** `role-menu`  
**File:** `voci-guru-02-menu-role.mp3`

```text
Menu guru lebih padat karena guru bekerja dengan data pendampingan. Ada Beranda, Siswa, Simulasi, Evidence, Consent, Placement, dan Laporan. Setiap menu membantu guru mengambil keputusan berikutnya.
```

### Guru 3: Ringkasan Cepat

**Target selector:** `metric-grid`  
**File:** `voci-guru-03-ringkasan-cepat.mp3`

```text
Kartu ringkasan ini membantu guru melihat kondisi siswa aktif. Guru bisa memantau journey score, jumlah evidence, validation seal, dan status consent sebelum membuat catatan atau tindak lanjut.
```

### Guru 4: Ruang Kerja Utama

**Target selector:** `main-content`  
**File:** `voci-guru-04-ruang-kerja.mp3`

```text
Ini adalah ruang kerja utama guru. Dari sini guru bisa memilih siswa, melihat profil pendampingan, menjalankan simulasi demo, mengkurasi evidence, memperbarui consent, dan menyusun laporan perkembangan.
```

### Guru 5: Privacy Wall

**Target selector:** `privacy-wall`  
**File:** `voci-guru-05-privacy-wall.mp3`

```text
Privacy Wall mengingatkan bahwa guru memiliki akses ke data internal sekolah, tetapi data itu tidak otomatis tampil ke DUDI. Data sensitif tetap berada di ruang sekolah dan keluarga.
```

### Guru 6: Pindah Role Demo

**Target selector:** `role-switcher`  
**File:** `voci-guru-06-role-switcher.mp3`

```text
Navigator bawah ini memudahkan kamu berpindah role. Setelah melihat Ruang Guru, kamu bisa mencoba Dashboard Siswa, Orang Tua, DUDI, atau Admin untuk memahami alur ekosistem secara utuh.
```

## Dashboard DUDI

### DUDI 1: Ruang DUDI

**Target selector:** `dashboard-hero`  
**File:** `voci-dudi-01-ruang-dudi.mp3`

```text
Hai, aku Voci. Selamat datang di Ruang DUDI SyncVoca. Di sini mitra industri melihat kandidat dari bukti kompetensi, bukan dari data pribadi. Kandidat tampil dengan kode aman, skill, evidence, akomodasi kerja, dan status consent.
```

### DUDI 2: Menu Role DUDI

**Target selector:** `role-menu`  
**File:** `voci-dudi-02-menu-role.mp3`

```text
Menu DUDI berisi Beranda, Talent, Lowongan, Validasi, Placement, dan Report. Alurnya membantu industri membaca kandidat, membuat lowongan inklusif, menerbitkan validation seal, dan mengelola pipeline kerja.
```

### DUDI 3: Ringkasan Cepat

**Target selector:** `metric-grid`  
**File:** `voci-dudi-03-ringkasan-cepat.mp3`

```text
Kartu ringkasan ini menunjukkan jumlah talent aman, consent aktif, lowongan aktif, dan pipeline placement. DUDI bisa melihat kondisi ekosistem tanpa membuka data sensitif siswa.
```

### DUDI 4: Ruang Kerja Utama

**Target selector:** `main-content`  
**File:** `voci-dudi-04-ruang-kerja.mp3`

```text
Di ruang utama ini, DUDI bisa melihat talent pool, mengecek kecocokan lowongan, menerbitkan Industry Validation Seal, melakukan shortlist, memperbarui placement, dan mengekspor DUDI-safe report.
```

### DUDI 5: Privacy Wall

**Target selector:** `privacy-wall`  
**File:** `voci-dudi-05-privacy-wall.mp3`

```text
Privacy Wall sangat penting untuk DUDI. Di sini dijelaskan bahwa DUDI hanya melihat data yang relevan untuk kerja, seperti skill, evidence, score, akomodasi kerja, consent, dan kode kandidat. Nama siswa dan catatan sensitif tidak ditampilkan.
```

### DUDI 6: Pindah Role Demo

**Target selector:** `role-switcher`  
**File:** `voci-dudi-06-role-switcher.mp3`

```text
Gunakan navigator bawah ini untuk berpindah role. Setelah melihat sisi DUDI, kamu bisa melihat bagaimana guru, siswa, orang tua, dan admin menyiapkan data yang aman sebelum masuk ke industri.
```

## Dashboard Admin

### Admin 1: Admin Governance

**Target selector:** `dashboard-hero`  
**File:** `voci-admin-01-admin-governance.mp3`

```text
Hai, aku Voci. Selamat datang di Admin Governance SyncVoca. Di sini admin menjaga data demo, role pengguna, sekolah, mitra DUDI, consent, audit, report, dan placement agar alur prototype tetap rapi.
```

### Admin 2: Menu Role Admin

**Target selector:** `role-menu`  
**File:** `voci-admin-02-menu-role.mp3`

```text
Menu admin berisi Overview, Users, Schools, DUDI, Consent, Audit, Reports, dan Placement. Menu ini membantu admin melihat kesehatan ekosistem dan memastikan semua data demo siap dipresentasikan.
```

### Admin 3: Ringkasan Cepat

**Target selector:** `metric-grid`  
**File:** `voci-admin-03-ringkasan-cepat.mp3`

```text
Kartu ringkasan admin menampilkan jumlah siswa, mitra DUDI, consent approved, dan audit event. Dari sini admin bisa cepat mengetahui apakah demo sudah lengkap dan aman.
```

### Admin 4: Ruang Kerja Utama

**Target selector:** `main-content`  
**File:** `voci-admin-04-ruang-kerja.mp3`

```text
Ini adalah ruang kerja utama admin. Admin bisa menambah siswa demo, melihat sekolah mitra, mengecek DUDI, mengatur consent, membaca audit trail, melihat report, dan memantau pipeline placement.
```

### Admin 5: Privacy Wall

**Target selector:** `privacy-wall`  
**File:** `voci-admin-05-privacy-wall.mp3`

```text
Privacy Wall membantu admin memastikan aturan data tetap konsisten. Data sensitif siswa tidak boleh bocor ke role yang tidak berhak, terutama saat DUDI melihat kandidat atau mengekspor report.
```

### Admin 6: Pindah Role Demo

**Target selector:** `role-switcher`  
**File:** `voci-admin-06-role-switcher.mp3`

```text
Navigator bawah ini membantu admin atau presenter berpindah role demo. Kamu bisa mengecek apakah pengalaman siswa, guru, orang tua, DUDI, dan admin sudah saling terhubung.
```

## Script Tambahan Untuk Aksi Penting

Bagian ini opsional. Bisa dipakai sebagai sound cue pendek ketika user menekan aksi tertentu.

### Aksi: Mulai Simulasi

**File:** `voci-action-start-simulation.mp3`

```text
Oke, kita mulai simulasi. Setiap latihan akan menjadi evidence baru untuk portofolio kerja.
```

### Aksi: Catatan Ditambahkan

**File:** `voci-action-note-added.mp3`

```text
Catatan pendampingan sudah tersimpan. Catatan ini membantu siswa, keluarga, dan sekolah punya arah latihan yang sama.
```

### Aksi: Consent Diperbarui

**File:** `voci-action-consent-updated.mp3`

```text
Status consent sudah diperbarui. Ini penting supaya data yang dibagikan tetap sesuai izin dan batas akses.
```

### Aksi: Validation Seal Dibuat

**File:** `voci-action-validation-created.mp3`

```text
Validation seal berhasil dibuat. Artinya, bukti kompetensi kandidat sudah mendapat pengakuan dari DUDI.
```

### Aksi: Shortlist Placement

**File:** `voci-action-placement-shortlist.mp3`

```text
Kandidat sudah masuk pipeline placement. Selanjutnya, DUDI dan sekolah bisa memantau proses interview, work trial, sampai placement.
```

### Aksi: Report Diekspor

**File:** `voci-action-report-exported.mp3`

```text
Report DUDI-safe berhasil diekspor. Report ini hanya berisi data yang aman dan relevan untuk kebutuhan industri.
```

## Catatan Integrasi Nanti

Saat audio sudah tersedia, mapping bisa dibuat seperti ini:

```ts
const audioMap = {
  "sv-guide-landing:0": "/audio/voci/voci-landing-01-welcome.mp3",
  "sv-guide-landing:1": "/audio/voci/voci-landing-02-portal-demo.mp3",
  "sv-guide-siswa:0": "/audio/voci/voci-siswa-01-dashboard-siswa.mp3",
  "sv-guide-guru:0": "/audio/voci/voci-guru-01-ruang-guru.mp3",
  "sv-guide-dudi:0": "/audio/voci/voci-dudi-01-ruang-dudi.mp3",
};
```

Prioritas implementasi:

1. Generate dulu audio landing dan dashboard siswa.
2. Lanjutkan guru dan DUDI karena paling penting untuk demo alur produk.
3. Lengkapi orang tua dan admin.
4. Setelah semua file audio siap, ubah `GuidedTour.tsx` agar memutar file audio sebelum fallback ke Web Speech API.
