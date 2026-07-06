# Web Design Direction SyncVoca Journey

## Design Goal

Desain baru harus terasa clean, cerah, edukatif, dan ramah ABK. Produk ini bukan sekadar dashboard teknis, tetapi jembatan antara sekolah, keluarga, dan industri. Karena logo sudah penuh warna dan ilustratif, UI harus lebih tenang agar brand tetap terlihat profesional.

## Brand Keywords

- Inklusif
- Cerah
- Aman
- Terukur
- Ramah sekolah
- Siap industri
- Optimis tanpa terasa kekanak-kanakan

## Logo Usage

Logo yang diupload digunakan sebagai identitas utama SyncVoca Journey.

Rencana pemakaian:

1. Header desktop: logo kecil kiri, teks "SyncVoca Journey" di sampingnya.
2. Landing hero: logo sebagai visual utama, tidak perlu ilustrasi tambahan.
3. PWA/icon reference: gunakan versi logo jika nanti dibuat favicon atau app icon.
4. Dashboard header: gunakan logo compact agar tidak menghabiskan ruang kerja.

Path aset yang disiapkan:

`public/syncvoca-logo.png`

## Color Palette

### Primary

- Brand Green: `#12843A` (dipilih agar teks putih di atas tombol hijau tetap lolos kontras)
- Soft Green: `#E8F8EE`
- Deep Green: `#0B5D2A`

### Secondary

- Brand Yellow: `#F6C343`
- Soft Yellow: `#FFF7D6`
- Warm Orange: `#F59E0B`

### Support

- Sync Blue: `#1768C8`
- Soft Blue: `#EAF4FF`
- Sky Cyan: `#22B8CF`

### Neutral

- Page Background: `#F8FAF7`
- Surface: `#FFFFFF`
- Border: `#DDE7DD`
- Text Main: `#17351F`
- Text Muted: `#61746A`

## Visual Rules

1. Hindari dominan gelap untuk mode default.
2. Gunakan putih dan hijau lembut sebagai permukaan utama.
3. Kuning dipakai untuk achievement, badge, seal, dan CTA sekunder.
4. Biru dipakai sebagai warna brand support, link, dan data/analytics.
5. Card radius cukup `16px` untuk dashboard, tidak terlalu bulat.
6. Shadow harus halus, bukan glow gelap.
7. Jangan pakai terlalu banyak gradient. Jika perlu, gunakan gradient halus hijau ke kuning hanya di hero atau CTA.
8. Jangan mengandalkan emoji untuk UI utama; gunakan lucide icons.

## Typography

Gunakan gaya yang mudah dibaca:

- Heading: tebal, bersih, tidak terlalu besar di dashboard.
- Body: 14-16px, line-height lega.
- Badge: uppercase seperlunya, jangan terlalu kecil.
- Hindari teks panjang di tombol.

## Layout Direction

### App Shell

Header baru:

- background putih translucent atau solid
- logo kiri
- quick actions kanan: reset demo, aksesibilitas
- jika masuk dashboard, tampilkan tombol kembali yang jelas

Main container:

- background `#F8FAF7`
- max width tetap untuk desktop
- gutter cukup di mobile

### Feedback, Popup, And Toast

Aturan untuk semua alert/konfirmasi:

1. Jangan gunakan native browser `alert`, `confirm`, atau `prompt`.
2. Semua feedback aksi harus memakai `AppFeedbackProvider` di `src/components/AppFeedback.tsx`.
3. Konfirmasi destruktif atau reset memakai branded confirmation modal:
   - background overlay gelap transparan dengan blur ringan
   - modal putih, radius sedang, border `#DDE7DD`
   - ikon sesuai tone: success, warning, danger, atau info
   - tombol utama memakai warna brand, bukan style browser default
4. Feedback sukses/peringatan ringan memakai toast:
   - posisi kanan atas desktop, full-width aman di mobile
   - role aksesibilitas `status` atau `alert`
   - tidak menutup workflow utama secara blocking
5. Copy harus spesifik terhadap aksi, misalnya "Data demo direset" atau "Catatan guru tersimpan", bukan "Sukses" saja.
6. Tetap jaga kontras: teks utama `#17351F`, muted `#61746A`, tombol hijau harus memakai teks putih.

### Landing Page

Urutan section setelah conversion + demo clarity pass:

1. Hero
   - logo besar atau medium
   - headline output-oriented, misalnya "Bukti kerja ABK, siap dibaca sekolah dan DUDI"
   - subcopy menjelaskan misi simulasi adaptif, portofolio kompetensi, rencana pendampingan, Industry Validation Seal, dan privacy wall
   - CTA: "Masuk Portal Demo"
   - quick role entry langsung di first viewport

2. Alur 5 Tahap
   - Intake Dukungan
   - Simulasi Kerja
   - Rencana Pendampingan
   - Portofolio Bukti
   - Validasi DUDI

3. Proof Section
   - live demo output: journey score, sesi bukti, validation seal
   - ABK Talent Portfolio
   - privacy boundary
   - UDL + WCAG 2.2 + ICF-WHO as product standard

4. BMC/Ecosystem Signal
   - key partners
   - value proposition
   - Freemium & Partnership sustainability
   - avoid implying monetization burden on ABK/family

5. Role Portal
   - Siswa
   - Guru
   - Orang Tua
   - DUDI
   - Admin

6. Footer singkat

### Journey Workspace

Experience utama setelah user memilih role bukan lagi dashboard terpisah yang lepas-lepas, tetapi satu journey yang sama dengan sudut pandang role berbeda.

Tahap utama:

1. Intake Dukungan
2. Simulasi Kerja
3. Rencana Pendampingan
4. Portofolio Bukti
5. Validasi DUDI

### Dashboard Siswa

Prioritas visual di role siswa:

1. Journey score
2. Mission board atau latihan berikutnya
3. Evidence stack/portofolio
4. Validasi yang sudah didapat

### Dashboard Guru

Prioritas visual di role guru:

1. daftar siswa
2. ringkasan progres
3. catatan pendampingan
4. rekomendasi latihan
5. consent management untuk validasi DUDI

Consent management guru/admin:

1. Letakkan di konteks `Intake Dukungan` agar terlihat sebelum data dikirim ke DUDI.
2. Status utama berupa pill `approved`, `pending`, atau `revoked`.
3. Tampilkan scope consent sebagai chip kecil.
4. Aksi utama: `Request Consent`, `Approve Validasi`, dan `Revoke`.
5. Sertakan audit consent ringkas tanpa membuka data wali atau data medis.

Placement outcome monitoring guru/admin:

1. Letakkan setelah stage aktif agar Guru/Admin tetap membaca outcome DUDI dalam konteks siswa yang sedang dipilih.
2. Ringkasan utama berisi pipeline aktif, placed, dan butuh dukungan.
3. Untuk siswa terpilih, tampilkan lowongan, perusahaan, kode kandidat publik, status placement, update time, dan rencana tindak lanjut sekolah.
4. Aksi `Catat Follow-up` membuat catatan pendamping internal dengan kategori `Saran`.
5. Sertakan snapshot pipeline lintas siswa untuk Admin/Guru, tetapi tetap tampilkan sebagai monitoring internal, bukan payload DUDI.
6. Gunakan warna status yang sama dengan pipeline DUDI agar alur interview, work trial, placed, dan not ready mudah dipindai.
7. Boundary copy wajib menjelaskan bahwa nama siswa dan catatan pendamping hanya muncul di ruang Guru/Admin.

### Dashboard Orang Tua

Prioritas visual di role orang tua:

1. progress anak
2. aktivitas terbaru
3. checklist pendampingan rumah
4. pesan guru

### Dashboard DUDI

Prioritas visual di role DUDI:

1. talent pool
2. filter skill/profil dukungan
3. detail kandidat
4. validation seal action
5. lowongan inklusif

Aturan visibilitas DUDI:

1. Identitas utama kandidat adalah kode pseudonim, bukan nama siswa.
2. DUDI hanya mendapat dua stage: `Portofolio Bukti` dan `Validasi DUDI`.
3. Jangan tampilkan intake, catatan pendamping, catatan guru/orang tua, kontak wali, sekolah spesifik, atau data medis di role DUDI.
4. Gunakan label `Akomodasi kerja`, bukan diagnosis atau profil personal.
5. Setiap card kandidat perlu menyertakan privacy signal singkat agar juri memahami bahwa matching dilakukan tanpa membuka data sensitif.
6. Panel `Validasi DUDI` wajib menampilkan status consent sekolah/wali sebelum tombol seal.
7. Jika consent belum aktif, tombol utama berubah menjadi `Cek Consent` dan feedback memakai toast warning, bukan menerbitkan seal.
8. Audit trail DUDI ditampilkan ringkas dengan kode kandidat, aksi, aktor, dan waktu. Jangan tampilkan nama siswa atau detail privat di audit trail.
9. Tombol `Export Report Aman` berada di header role DUDI dan menghasilkan PDF yang memakai payload publik saja.
10. Copy pendamping export harus menyebut bahwa report hanya berisi kode kandidat, evidence, akomodasi kerja, consent, seal, dan audit publik.
11. Panel `Shortlist & placement pipeline` berada di stage `Validasi DUDI` setelah aksi seal/lowongan.
12. Aksi `Shortlist` harus memakai consent gate; jika consent belum aktif, feedback memakai toast warning dan audit event blocked.
13. Status pipeline DUDI hanya boleh menampilkan `Shortlisted`, `Interview`, `Work Trial`, `Placed`, dan `Not Ready`.
14. Catatan placement tidak boleh menyebut nama siswa, sekolah spesifik, kontak wali, catatan medis, atau profil dukungan internal.

### Dashboard Admin

Prioritas visual di role admin:

1. statistik demo
2. master siswa
3. master sekolah
4. master DUDI
5. konfigurasi data
6. override/approval consent demo dengan audit log

Admin governance center:

1. Letakkan setelah stage aktif agar admin tetap melihat konteks journey, lalu langsung mendapat panel kontrol operasional.
2. Ringkasan utama harus berupa metrik consent validasi aktif, consent yang butuh tindak lanjut, validasi diblokir, seal terbit, dan report aman diekspor.
3. Consent queue menampilkan nama siswa internal, minat vokasi, status consent, scope, dan aksi `Request`, `Approve`, `Revoke`.
4. Audit trail terbaru menampilkan ringkasan aman, aktor, action, dan timestamp.
5. Role visibility policy harus selalu mengingatkan bahwa DUDI hanya mendapat payload publik, sedangkan data siswa lengkap tetap internal.
6. Panel harus tetap clean dan cerah: gunakan surface putih, soft green, soft yellow, dan teks utama `#17351F`; jangan pakai teks gelap di background hijau tua kecuali teksnya putih.
7. Metrik placement pipeline masuk ke governance center agar Admin bisa melihat dampak bisnis tanpa membuka data privat ke DUDI.

## UX Rules

1. Setiap role harus punya satu CTA utama.
2. Hindari istilah "diagnosis" di UI publik.
3. Gunakan "Profil Dukungan ABK" atau "Kebutuhan Dukungan" untuk field yang sebelumnya "Jenis Disabilitas".
4. DUDI hanya boleh melihat kebutuhan akomodasi kerja dan bukti kompetensi.
5. Data privat harus tetap berada di area guru/admin/orang tua sesuai kebutuhan demo.
6. High contrast mode tetap harus tersedia dan tidak rusak oleh tema baru.
7. Setiap pergantian role, stage, atau siswa/kandidat harus langsung reset ke top tanpa smooth scroll/transisi agar user tidak tersisa di posisi scroll halaman sebelumnya.

## Current Flow Issues To Fix

1. Landing page terlalu gelap untuk karakter brand baru.
2. Istilah disabilitas masih dominan dan belum konsisten dengan arah ABK.
3. CTA dan alur role sudah ada, tetapi belum cukup menjelaskan output akhir produk.
4. Dashboard punya fitur cukup banyak, tetapi perlu penataan ulang agar next action jelas.
5. Logo belum menjadi bagian dari identitas UI.

## Acceptance Criteria Design

1. User langsung melihat logo SyncVoca Journey di first viewport.
2. First viewport menjelaskan ABK, 4 pilar, dan portofolio kerja.
3. Nuansa default clean, cerah, hijau-kuning, dengan aksen biru dari logo.
4. Tidak ada teks penting yang overlap di mobile.
5. Semua role tetap bisa diakses dari landing page.
6. Mode high contrast tetap usable.
