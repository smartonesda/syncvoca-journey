# Peta Dokumentasi SyncVoca Journey

Dokumen di folder ini dibagi agar eksekusi tim tidak bercampur antara prototype apps dan real apps production.

## Struktur Folder

```text
docs/
  README.md
  REAL_IMPLEMENTATION_PLAN.md
  PRD.md
  TASKS.md
  WEB_DESIGN.md

  prototype-apps/
    README.md

  frontend/
    README.md

  backend/
    README.md

  database/
    README.md

  auth-security/
    README.md

  team-execution/
    README.md
```

## Fungsi Tiap Dokumen

### Master Product dan Planning

- `PRD.md`: arah produk, target pengguna, scope MVP prototype, dan prinsip produk.
- `TASKS.md`: histori task prototype apps yang sudah dieksekusi.
- `WEB_DESIGN.md`: aturan UI prototype, visual, popup/toast, dan workflow web.
- `REAL_IMPLEMENTATION_PLAN.md`: master plan real apps end-to-end.

### Panduan Per Tim

- `prototype-apps/README.md`: batas kerja repo prototype `v2`, cara validasi, dan apa yang boleh/tidak boleh diubah.
- `frontend/README.md`: panduan FE production web/PWA, role routing, UX per role, PWA, state, performance, dan testing.
- `backend/README.md`: panduan BE production API, module boundary, service, audit, storage, report, dan deployment.
- `database/README.md`: panduan schema production, relasi data, enum, index, migration order, dan seed.
- `database/ERD.md`: ERD teknis, normalisasi, dan setup PostgreSQL lokal via Docker.
- `auth-security/README.md`: panduan auth, RBAC, role visibility, consent, DUDI privacy, dan security testing.
- `team-execution/README.md`: urutan kerja tim, dependency antar area, definition of done, dan rekomendasi sprint.

## Cara Membaca Untuk Tim

### Product Owner / Lead

1. Baca `PRD.md`.
2. Baca `REAL_IMPLEMENTATION_PLAN.md`.
3. Baca `team-execution/README.md`.
4. Lock keputusan scope MVP real apps sebelum FE/BE mulai coding.

### Frontend Team

1. Baca `frontend/README.md`.
2. Baca `auth-security/README.md` bagian FE responsibility.
3. Baca `WEB_DESIGN.md` untuk arah visual dan interaksi.
4. Gunakan prototype apps sebagai referensi alur, bukan sebagai source of truth data production.

### Backend Team

1. Baca `backend/README.md`.
2. Baca `database/README.md`.
3. Baca `auth-security/README.md`.
4. Pastikan semua access control diterapkan di backend, bukan hanya di UI.

### Database / Data Engineer

1. Baca `database/README.md`.
2. Cocokkan dengan `auth-security/README.md` untuk data classification dan consent.
3. Finalkan Prisma schema atau SQL schema sebelum API core dibangun.

### QA / Security Reviewer

1. Baca `auth-security/README.md`.
2. Baca `prototype-apps/README.md` untuk privacy test prototype.
3. Baca `backend/README.md` untuk API test dan audit expectation.
4. Prioritaskan test kebocoran data DUDI.

## Aturan Dokumentasi Ke Depan

1. Jangan menaruh semua rencana baru di root `docs/` jika area kerjanya spesifik.
2. Jika dokumen membahas prototype, simpan di `docs/prototype-apps/`.
3. Jika dokumen membahas FE/PWA, simpan di `docs/frontend/`.
4. Jika dokumen membahas API/server/job/storage, simpan di `docs/backend/`.
5. Jika dokumen membahas schema, migration, dan seed, simpan di `docs/database/`.
6. Jika dokumen membahas auth, RBAC, privacy, consent, dan DUDI visibility, simpan di `docs/auth-security/`.
7. Jika dokumen membahas pembagian kerja, sprint, DoD, dan handoff, simpan di `docs/team-execution/`.

## Guardrail Utama

- Prototype boleh memakai localStorage untuk demo.
- Real apps tidak boleh memakai localStorage sebagai sumber data utama.
- DUDI tidak boleh menerima data sensitif siswa.
- Consent dan audit wajib berjalan di backend.
- FE hanya menyembunyikan tampilan; BE tetap harus menolak request yang tidak berhak.
- Semua report DUDI harus dibuat dari public candidate payload, bukan data siswa penuh.
