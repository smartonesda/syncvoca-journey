# SyncVoca Journey - Backend API

## 1. Tentang Proyek
Repositori ini berisi infrastruktur inti *backend* API dari **SyncVoca Journey**, sebuah platform transisi vokasi berbasis gamifikasi yang dirancang khusus untuk siswa berkebutuhan khusus berlandaskan prinsip *Universal Design for Learning* (UDL). 

Sistem *backend* ini bertugas krusial dalam:
- Mengelola otentikasi multi-peran secara terenkripsi (Siswa, Guru, dan DUDI atau Mitra Industri).
- Memproses, memvalidasi, dan merekam metrik permainan simulasi vokasi secara presisi (seperti metrik akurasi dan kecepatan pada *Logic Quest* atau *Package Sorter*).
- Menyediakan layanan *Dual-Provider AI Career Mentor* yang mendukung interkoneksi ke penyedia model kecerdasan buatan mutakhir (Google Generative AI dan OpenRouter).

## 2. Tumpukan Teknologi
Arsitektur *backend* dibangun secara tangguh menggunakan standar industri modern:
- **Node.js & Express**: Kerangka kerja peladen web berkinerja tinggi.
- **TypeScript**: Sistem pengetikan statis ketat untuk menjamin keamanan dan prediktabilitas kode tingkat komersial.
- **Prisma ORM**: Pemetaan relasional objek untuk manipulasi basis data yang sangat aman dari injeksi (*type-safe*).
- **SQLite**: Sistem manajemen basis data portabel untuk kecepatan pengembangan.
- **JWT (JSON Web Token)**: Standardisasi modern untuk manajemen otorisasi sesi lintas-batas yang *stateless*.
- **Scalar**: Pembangun antarmuka dokumentasi OpenAPI yang indah dan interaktif.
- **Docker**: Teknologi kontainerisasi terisolasi untuk jaminan konsistensi lingkungan penyebaran.

## 3. Persiapan Lingkungan
Sebelum menjalankan aplikasi, konfigurasi lingkungan lokal harus disiapkan dengan benar.
1. Salin berkas templat lingkungan bawaan: Duplikasikan berkas `.env.example` dan ubah namanya menjadi `.env` di dalam direktori `backend`.
2. Konfigurasi Kunci API Kecerdasan Buatan: Buka berkas `.env` dan pilih *provider* AI aktif (Google AI atau OpenRouter). Pastikan untuk menyematkan kredensial rahasia Anda pada `GOOGLE_AI_API_KEY` atau `OPENROUTER_API_KEY`.
3. Konfigurasi URL Frontend: Pastikan nilai `FRONTEND_URL` telah merujuk pada *host* lokal antarmuka pengguna Anda untuk kelancaran koneksi.

## 4. Tata Cara Menjalankan
Jalankan deretan perintah terminal berikut untuk menginisialisasi lingkungan pengembangan secara lokal:

1. Unduh seluruh dependensi repositori:
   ```bash
   pnpm install
   ```

2. Sinkronisasikan skema Prisma terbaru ke struktur basis data SQLite:
   ```bash
   npx prisma db push
   ```

3. Masukkan data tiruan (*dummy data*) yang sangat kaya akan rekaman metrik simulasi, pencapaian *journey*, dan data portofolio siswa untuk keperluan uji coba:
   ```bash
   npx prisma db seed
   ```

4. Jalankan peladen lokal dalam mode pengembangan dinamis:
   ```bash
   pnpm run dev
   ```