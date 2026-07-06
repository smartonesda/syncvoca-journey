# Feature Modules

Folder ini memisahkan domain SyncVoca agar implementasi dashboard dan PWA tidak menumpuk di `app/`.

- `auth`: login, forgot password, invite acceptance, role redirect.
- `onboarding`: flow awal pengguna dan preferensi aksesibilitas.
- `student-journey`: dashboard siswa, journey, simulasi, evidence, portofolio.
- `parent-progress`: ringkasan perkembangan, dukungan rumah, persetujuan.
- `teacher-monitoring`: daftar siswa, detail siswa, consent queue, simulasi, placement, laporan.
- `dudi-candidates`: talent pool, kandidat publik, lowongan, validasi, placement.
- `admin-governance`: tenant, user, sekolah, DUDI, consent governance, audit.
- `reports`: report internal dan public payload preview.
- `notifications`: notifikasi role dan PWA permission handling.
