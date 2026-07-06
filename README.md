# SyncVoca Frontend

Frontend ini adalah fondasi real apps SyncVoca Journey berdasarkan `docs/frontend/README.md`.
Targetnya satu aplikasi Next.js untuk landing/app shell, PWA mobile Siswa dan Orang Tua, serta dashboard responsif untuk Guru, DUDI, dan Admin.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- TanStack Query untuk data fetching/cache
- TanStack Table dan TanStack Virtual untuk tabel dashboard besar
- React Hook Form + Zod + Hookform Resolvers untuk form
- Zustand untuk UI/client state ringan
- Lucide React untuk ikon
- Serwist packages sudah terpasang untuk opsi PWA lanjutan
- PWA dasar aktif lewat `manifest.ts` dan `public/sw.js`

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run audit
```

## Struktur

```text
src/
  app/                 Next.js routes per role
  components/          layout, feedback, form, data display, navigation, PWA
  features/            domain feature modules
  lib/                 api, auth, privacy, query, routes, utilities
  styles/              ruang untuk style shared tambahan
```

Route awal yang sudah tersedia:

- `/login`, `/forgot-password`, `/accept-invite`
- `/siswa`, `/siswa/journey`, `/siswa/simulasi`, `/siswa/portofolio`, `/siswa/notifikasi`
- `/orang-tua`, `/orang-tua/progres`, `/orang-tua/dukungan-rumah`, `/orang-tua/persetujuan`
- `/guru`, `/guru/siswa`, `/guru/siswa/[studentId]`, `/guru/consent`, `/guru/simulasi`, `/guru/placement`, `/guru/laporan`
- `/dudi`, `/dudi/kandidat`, `/dudi/kandidat/[candidateCode]`, `/dudi/lowongan`, `/dudi/validasi`, `/dudi/placement`
- `/admin`, `/admin/overview`, `/admin/users`, `/admin/schools`, `/admin/dudi`, `/admin/consent`, `/admin/audit`, `/admin/reports`

## PWA Dan Privacy Boundary

PWA minimum sudah disiapkan:

- manifest valid di `src/app/manifest.ts`
- app icon memakai aset prototype `syncvoca-logo.png`
- service worker di `public/sw.js`
- offline fallback di `/offline`
- static asset memakai cache-first
- app shell memakai network-first dengan fallback
- endpoint atau route yang mengandung `api`, `audit`, `consent`, `report`, dan `export` tidak disimpan cache service worker

Untuk implementasi produksi, data role tetap wajib berasal dari backend yang sudah memfilter izin. Frontend tidak boleh menjadikan route guard, hidden component, atau localStorage sebagai lapisan security final.

## Catatan Implementasi Berikutnya

- Ganti route scaffold menjadi layout nyata per role.
- Tambahkan route guard setelah endpoint `/auth/me` tersedia.
- Bentuk API contract untuk payload Siswa, Orang Tua, Guru, DUDI public candidate, dan Admin governance.
- Tambahkan test privacy untuk memastikan route DUDI tidak merender nama siswa, sekolah spesifik, kontak wali, medical notes, atau catatan internal.
- Jika butuh offline strategy lebih kaya, aktifkan integrasi Serwist setelah route dan cache boundary produksi sudah final.
