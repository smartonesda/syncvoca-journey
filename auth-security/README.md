# Panduan Auth, Role Access, Privacy, Dan Security

Dokumen ini menjadi acuan lintas frontend, backend, database, dan QA untuk auth, role-based access control, consent, privacy boundary, dan security SyncVoca Journey real apps.

## Keputusan Utama

1. Auth dan authorization wajib ditegakkan di backend.
2. Role saja tidak cukup; akses juga harus melihat tenant, relasi, dan consent.
3. DUDI hanya boleh membaca public candidate profile.
4. Data sensitif siswa harus deny-by-default.
5. Semua action penting harus tercatat di audit log.
6. Frontend route guard hanya UX, bukan security final.

## Role Awal

```text
super_admin
school_admin
teacher
student
parent
dudi_admin
dudi_reviewer
job_coach
auditor
```

## Definisi Role

### super_admin

Untuk pengelola platform.

Boleh:

- mengelola tenant
- mengelola admin platform
- melihat konfigurasi sistem
- melihat audit lintas tenant sesuai policy

Tidak boleh sembarangan:

- membuka data sensitif siswa tanpa alasan dan audit

### school_admin

Untuk admin sekolah.

Boleh:

- mengelola user sekolah
- melihat siswa sekolahnya
- mengelola guru
- mengelola consent
- melihat audit sekolah
- export laporan internal

### teacher

Untuk guru/pendamping.

Boleh:

- melihat siswa yang diassign atau berada di sekolahnya sesuai policy
- membuat catatan pendampingan
- mengelola progres/simulasi
- request consent
- melihat placement outcome

### student

Untuk siswa.

Boleh:

- melihat profil dan progress miliknya
- mengerjakan simulasi
- melihat portofolio
- menerima notifikasi

Tidak boleh:

- melihat data siswa lain
- mengubah consent sendiri tanpa mekanisme wali/sekolah

### parent

Untuk orang tua/wali.

Boleh:

- melihat ringkasan progress anak yang terhubung
- melihat rekomendasi dukungan rumah
- menyetujui atau menolak consent jika diberi kewenangan
- melihat notifikasi terkait anak

Tidak boleh:

- melihat siswa lain
- melihat catatan guru internal yang tidak parent-visible

### dudi_admin

Untuk admin perusahaan DUDI.

Boleh:

- mengelola user DUDI
- membuat lowongan
- melihat kandidat publik sesuai policy
- melakukan validation/shortlist jika consent aktif
- melihat placement pipeline perusahaan
- export DUDI-safe report

Tidak boleh:

- melihat data privat siswa
- melihat nama sekolah spesifik jika tidak diizinkan
- melihat kontak wali
- melihat catatan medis/keluarga

### dudi_reviewer

Untuk reviewer/HR dari DUDI.

Boleh:

- melihat kandidat publik
- memberi validation sesuai permission
- update placement sesuai permission

Tidak boleh:

- mengelola user perusahaan jika tidak diberi permission
- melihat data privat siswa

### job_coach

Untuk pendamping kerja internal/sekolah/mitra.

Boleh:

- melihat siswa/kandidat yang ditugaskan
- membuat follow-up placement
- melihat akomodasi kerja sesuai kebutuhan tugas

### auditor

Untuk reviewer governance.

Boleh:

- melihat audit log sesuai tenant dan scope
- melihat policy evidence

Tidak boleh:

- mengubah data operasional

## Access Model

Gunakan kombinasi:

1. Authentication: user terverifikasi.
2. Tenant scope: user berada di organization yang relevan.
3. Role-based access: role punya izin action.
4. Relationship-based access: user punya relasi ke resource.
5. Consent-based access: data boleh dibuka karena consent aktif.
6. Resource state: status resource memungkinkan action.

Contoh:

```text
DUDI ingin shortlist kandidat:
  user authenticated
  role = dudi_admin atau dudi_reviewer
  user membership aktif di dudiCompanyId
  candidate public profile tersedia
  consent status approved
  consent scope mencakup industry-validation
  job milik company user
  action dicatat ke audit
```

## Permission Matrix Ringkas

| Resource/Action | Student | Parent | Teacher | School Admin | DUDI | Admin |
| --- | --- | --- | --- | --- | --- | --- |
| Lihat profil internal siswa | sendiri terbatas | anak terkait ringkas | assigned/school | school | tidak | policy |
| Lihat sensitive records | tidak | sangat terbatas | policy | policy | tidak | policy |
| Lihat public candidate | sendiri jika ada | anak terkait | school | school | ya, publik | ya |
| Kelola consent | tidak | jika wali berwenang | request | approve/revoke | tidak | oversight |
| Upload evidence | ya | tidak | ya | ya | tidak | policy |
| Kurasi evidence DUDI | tidak | tidak | ya | ya | tidak | policy |
| Issue industry validation | tidak | tidak | tidak | tidak | ya jika consent | tidak |
| Shortlist placement | tidak | tidak | tidak | tidak | ya jika consent | tidak |
| Lihat audit | tidak | tidak | terbatas | school | terbatas publik | ya |
| Export DUDI-safe report | tidak | tidak | school copy | ya | ya | ya |

## Session Design

Pilihan rekomendasi:

- access token pendek
- refresh token rotation
- session table
- refresh token hash disimpan di database
- revoke session saat logout
- revoke semua session saat password reset

Jika memakai cookie:

- httpOnly
- secure di production
- sameSite sesuai deployment
- CSRF protection

Jika memakai bearer token:

- jangan simpan access token jangka panjang di localStorage
- pertimbangkan memory storage + refresh cookie

## Invite And Onboarding

Alur invite:

1. Admin/Guru mengundang user.
2. Server membuat invite token hash.
3. User menerima link invite.
4. User set password.
5. Server membuat membership sesuai invite.
6. Audit mencatat invite accepted.

Invite harus punya:

- expiry
- single-use
- target email
- target role
- target organization

## Route Guard Frontend

Frontend harus:

- redirect user belum login ke `/login`
- redirect user tanpa role ke onboarding/error
- menampilkan navigation sesuai role
- menyembunyikan menu yang tidak relevan
- menghapus cache saat logout

Frontend tidak boleh:

- menganggap route guard sudah cukup aman
- memuat data lalu menyembunyikan field privat di UI
- menyimpan sensitive data di localStorage

## DUDI Privacy Boundary

Backend harus menyediakan endpoint khusus:

```text
GET /dudi/candidates
GET /dudi/candidates/:candidateCode
POST /dudi/candidates/:candidateCode/validations
POST /dudi/candidates/:candidateCode/placements
POST /dudi/reports/candidate/:candidateCode
```

Response DUDI hanya boleh memuat:

- candidateCode
- schoolSegment
- vocationalInterests
- readinessScore
- publicSkillSummary
- publicEvidence
- publicAccommodationSummary
- consentStatus
- validationSeal
- placementStatus

Response DUDI tidak boleh memuat:

- studentId jika tidak diperlukan
- fullName
- birthDate detail
- schoolName spesifik
- guardianName
- guardianContact
- medicalNotes
- familyBackground
- privateNotes
- teacherInternalNotes
- raw support profile

## Consent Rules

Consent status:

```text
missing
requested
approved
revoked
expired
```

Scope:

```text
portfolio-sharing
work-accommodation-sharing
industry-validation
placement-follow-up
report-export
```

Rules:

- DUDI validation butuh `industry-validation`.
- DUDI shortlist minimal butuh `industry-validation`.
- DUDI report butuh `report-export` atau policy yang disepakati.
- Portfolio sharing ke DUDI butuh `portfolio-sharing`.
- Akomodasi kerja ke DUDI butuh `work-accommodation-sharing`.
- Revoked consent harus langsung memblokir aksi baru.

## Audit Rules

Action wajib audit:

- login/logout
- invite accepted
- role assigned/revoked
- consent requested/approved/revoked
- candidate public profile viewed
- industry validation issued/blocked
- DUDI-safe report exported
- candidate shortlisted
- placement status updated
- sensitive record accessed
- file downloaded

Audit metadata harus aman.

Untuk DUDI-visible audit, gunakan:

- candidateCode
- action
- status
- timestamp
- companyId

Jangan gunakan:

- fullName
- guardianContact
- medicalNotes
- familyBackground
- privateNotes

## Data Classification

### Public

Contoh:

- landing content
- public product info

### Internal School

Contoh:

- nama siswa
- progress internal
- teacher note internal

### Parent Scoped

Contoh:

- ringkasan progress anak
- rekomendasi dukungan rumah

### DUDI Public

Contoh:

- candidate code
- skill publik
- evidence curated
- public accommodation summary

### Sensitive

Contoh:

- medical notes
- guardian contact
- family background
- private notes
- raw support profile yang terlalu personal

### Audit

Contoh:

- actor
- action
- target
- safe summary
- IP/user agent

## Security Test Cases

Minimum test:

1. Student tidak bisa melihat student lain.
2. Parent tidak bisa melihat anak yang tidak terhubung.
3. Teacher tidak bisa melihat siswa sekolah lain.
4. DUDI tidak bisa memanggil endpoint internal siswa.
5. DUDI candidate response tidak memuat field privat.
6. DUDI validation gagal saat consent missing/requested/revoked.
7. DUDI shortlist gagal saat consent tidak valid.
8. Admin audit mencatat action penting.
9. Revoked consent langsung memblokir report baru.
10. File evidence privat tidak bisa diunduh role yang tidak berhak.

## Backend Guardrail

- Jangan return raw database model.
- Jangan pakai `include: true` besar untuk response DUDI.
- Buat mapper khusus public DTO.
- Terapkan deny-by-default untuk field baru.
- Semua endpoint mutasi harus punya policy check.
- Semua action sensitif harus dalam transaction jika mengubah banyak table.

## Frontend Guardrail

- Jangan cache data sensitif di localStorage.
- Bersihkan query cache saat logout.
- Jangan render data privat di route DUDI.
- Jangan membuat report client-side dari student internal object.
- Jangan memakai native alert/confirm/prompt.
- Tampilkan error consent dengan bahasa jelas.

## Database Guardrail

- Pisahkan `student_sensitive_records`.
- Jangan gabungkan guardian contact ke candidate public table.
- Gunakan index untuk audit dan relationship lookup.
- Simpan consent scope sebagai relasi jelas.
- Simpan candidate public profile hanya dari field aman.

## Definition Of Done Security MVP

Security MVP dianggap siap jika:

- auth real berjalan
- session bisa dicabut
- membership multi-role berjalan
- RBAC dan relationship policy berjalan
- DUDI endpoint memakai public DTO
- consent gate berjalan
- audit event tercatat
- privacy test backend dan frontend lulus
- DUDI report aman
- revoked consent memblokir action baru
- tidak ada sensitive data di response DUDI
