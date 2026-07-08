import type { Route } from "next";

export type AppRole =
  | "public"
  | "auth"
  | "siswa"
  | "orang-tua"
  | "guru"
  | "dudi"
  | "admin";

export type PageSurface = "landing" | "mobile-pwa" | "dashboard" | "governance" | "auth";

export type PageSpec = {
  path: string;
  role: AppRole;
  surface: PageSurface;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: Route;
  };
  narrative: string[];
  checkpoints: string[];
};

export type RoleSummary = {
  role: Exclude<AppRole, "public" | "auth">;
  href: Route;
  label: string;
  title: string;
  description: string;
  proofPoint: string;
};

export const publicNavigation = [
  { href: "/" as Route, label: "Beranda" },
  { href: "/login" as Route, label: "Masuk" },
  { href: "/siswa" as Route, label: "Siswa" },
  { href: "/dashboard/guru" as Route, label: "Guru" },
  { href: "/dashboard/dudi" as Route, label: "DUDI" },
  { href: "/dashboard/admin" as Route, label: "Admin" },
] as const;

export const roleSummaries: RoleSummary[] = [
  {
    role: "siswa",
    href: "/siswa" as Route,
    label: "Mobile PWA",
    title: "Siswa",
    description:
      "Alur ringan untuk mengenal potensi, mengerjakan simulasi, mengumpulkan evidence, dan membaca progress tanpa istilah rumit.",
    proofPoint: "Journey, simulasi, portofolio, notifikasi.",
  },
  {
    role: "orang-tua",
    href: "/orang-tua" as Route,
    label: "Mobile PWA",
    title: "Orang Tua",
    description:
      "Ringkasan perkembangan anak, rekomendasi dukungan rumah, dan persetujuan data yang ditulis dengan bahasa sederhana.",
    proofPoint: "Progres, dukungan rumah, consent.",
  },
  {
    role: "guru",
    href: "/dashboard/guru" as Route,
    label: "Dashboard",
    title: "Guru",
    description:
      "Monitoring banyak siswa, catatan pendampingan, consent queue, dan laporan internal dalam satu ruang kerja yang efisien.",
    proofPoint: "Filter siswa, detail, placement, laporan.",
  },
  {
    role: "dudi",
    href: "/dashboard/dudi" as Route,
    label: "Dashboard Aman",
    title: "DUDI",
    description:
      "Talent pool berbasis bukti dengan payload publik, validasi industri, shortlist, dan placement tanpa membuka data sensitif.",
    proofPoint: "Kandidat publik, validation seal, pipeline.",
  },
  {
    role: "admin",
    href: "/dashboard/admin" as Route,
    label: "Governance",
    title: "Admin",
    description:
      "Kontrol tenant, user, sekolah, DUDI, consent, audit log, dan report center sebagai lapisan tata kelola sistem.",
    proofPoint: "User, tenant, audit, reports.",
  },
];

export const pageSpecs = {
  "/login": {
    path: "/login",
    role: "auth",
    surface: "auth",
    eyebrow: "Autentikasi",
    title: "Masuk ke ruang kerja SyncVoca",
    description:
      "Login akan membaca profil dari backend, lalu mengarahkan pengguna ke pengalaman sesuai active role.",
    primaryAction: { label: "Lanjut ke Dashboard Siswa", href: "/siswa" as Route },
    narrative: [
      "Form login perlu tetap ringkas: email atau nomor akun, password, serta opsi lupa password.",
      "Setelah sukses, frontend memanggil /auth/me untuk memastikan role berasal dari server, bukan localStorage.",
      "Cache TanStack Query dibersihkan ketika logout atau saat pengguna berpindah tenant.",
    ],
    checkpoints: ["React Hook Form", "Zod validation", "role redirect", "no sensitive localStorage"],
  },
  "/forgot-password": {
    path: "/forgot-password",
    role: "auth",
    surface: "auth",
    eyebrow: "Pemulihan akun",
    title: "Bantu pengguna kembali masuk dengan aman",
    description:
      "Flow pemulihan akun harus sederhana untuk pengguna awam, tetapi tetap bergantung pada verifikasi backend.",
    narrative: [
      "Gunakan bahasa yang jelas: pengguna cukup memasukkan email atau nomor akun yang terdaftar.",
      "Jangan tampilkan apakah akun ditemukan atau tidak; cukup beri instruksi cek pesan masuk.",
      "Batasi retry dan tampilkan inline error yang bisa dibaca screen reader.",
    ],
    checkpoints: ["rate-limit friendly", "inline error", "accessible status", "no account enumeration"],
  },
  "/accept-invite": {
    path: "/accept-invite",
    role: "auth",
    surface: "auth",
    eyebrow: "Undangan pengguna",
    title: "Aktifkan akses role dari undangan resmi",
    description:
      "Halaman ini menerima token undangan dari sekolah, DUDI, atau admin dan memvalidasinya ke backend.",
    narrative: [
      "Pengguna melihat konteks undangan dengan kalimat pendek: siapa yang mengundang dan role apa yang diberikan.",
      "Jika token valid, pengguna melengkapi password dan data minimal yang diperlukan.",
      "Jika token kedaluwarsa, berikan CTA untuk meminta undangan baru.",
    ],
    checkpoints: ["token validation", "password setup", "invite expiry", "server-side role binding"],
  },
  "/siswa": {
    path: "/siswa",
    role: "siswa",
    surface: "mobile-pwa",
    eyebrow: "Dashboard Siswa",
    title: "Hari ini siswa tahu langkah kecil berikutnya",
    description:
      "Beranda siswa mengubah journey menjadi arahan harian yang mudah dipahami: tahap sekarang, latihan berikutnya, dan bukti yang sudah terkumpul.",
    primaryAction: { label: "Lihat Journey", href: "/siswa/journey" as Route },
    narrative: [
      "First viewport menampilkan sapaan, journey score, tahap aktif, dan CTA simulasi berikutnya.",
      "Gunakan kartu ringkas, progress visual, dan microcopy yang suportif agar siswa tidak merasa diuji.",
      "Bottom navigation maksimal lima item: Beranda, Journey, Simulasi, Portofolio, Notifikasi.",
    ],
    checkpoints: ["mobile-first", "large CTA", "offline shell", "accessibility mode"],
  },
  "/siswa/journey": {
    path: "/siswa/journey",
    role: "siswa",
    surface: "mobile-pwa",
    eyebrow: "Journey 5 Tahap",
    title: "Perjalanan dibuat bertahap, bukan terasa seperti tes panjang",
    description:
      "Journey menunjukkan Pengenalan Diri, Eksplorasi Minat, Pra-Internship, Internship, dan Siap Kerja secara visual.",
    narrative: [
      "Setiap tahap memakai bahasa kegiatan, bukan bahasa administrasi.",
      "Siswa melihat apa yang selesai, apa yang sedang berjalan, dan apa yang akan dibuka berikutnya.",
      "Progress tidak hanya angka; tampilkan bukti yang mendukung dan feedback guru secara manusiawi.",
    ],
    checkpoints: ["stepper journey", "stage status", "teacher feedback", "evidence link"],
  },
  "/siswa/simulasi": {
    path: "/siswa/simulasi",
    role: "siswa",
    surface: "mobile-pwa",
    eyebrow: "Simulasi Adaptif",
    title: "Latihan kerja terasa dekat dengan keseharian siswa",
    description:
      "Simulasi perlu pendek, jelas, dan adaptif agar siswa bisa menyelesaikan tugas tanpa beban kognitif berlebih.",
    narrative: [
      "Setiap simulasi diawali konteks sederhana: situasi kerja, tugas, dan hasil yang diharapkan.",
      "Gunakan instruksi satu langkah setiap kali memungkinkan, dengan status tersimpan otomatis.",
      "Hasil simulasi masuk ke evidence stack untuk dinilai guru dan dirangkum ke portofolio.",
    ],
    checkpoints: ["autosave", "short task", "evidence capture", "non-judgmental feedback"],
  },
  "/siswa/portofolio": {
    path: "/siswa/portofolio",
    role: "siswa",
    surface: "mobile-pwa",
    eyebrow: "Portofolio ABK",
    title: "Bukti perkembangan dirangkai menjadi cerita siap kerja",
    description:
      "Portofolio menampilkan kompetensi, evidence, validasi, dan ringkasan yang aman untuk dibagikan sesuai consent.",
    narrative: [
      "Siswa dan guru bisa melihat bukti yang sudah terkumpul dari tugas, foto, video, dan refleksi.",
      "Konten privat tetap dipisah dari versi publik untuk DUDI.",
      "Gunakan badge validasi agar portofolio terasa kredibel tanpa terlalu teknis.",
    ],
    checkpoints: ["evidence stack", "public payload split", "validation badge", "share consent"],
  },
  "/siswa/notifikasi": {
    path: "/siswa/notifikasi",
    role: "siswa",
    surface: "mobile-pwa",
    eyebrow: "Notifikasi",
    title: "Pesan penting tidak tenggelam dalam dashboard",
    description:
      "Notifikasi mengutamakan arahan guru, jadwal latihan, update consent, dan kabar placement yang relevan.",
    narrative: [
      "Kelompokkan notifikasi berdasarkan urgensi, bukan hanya waktu.",
      "Gunakan kalimat aksi yang jelas: mulai latihan, baca feedback, minta bantuan, atau konfirmasi.",
      "Untuk PWA, notifikasi harus menghormati izin perangkat dan preferensi pengguna.",
    ],
    checkpoints: ["notification preferences", "clear priority", "actionable copy", "permission-aware"],
  },
  "/orang-tua": {
    path: "/orang-tua",
    role: "orang-tua",
    surface: "mobile-pwa",
    eyebrow: "Dashboard Orang Tua",
    title: "Orang tua melihat perkembangan tanpa membaca laporan rumit",
    description:
      "Beranda orang tua merangkum progress anak, kabar guru, dukungan rumah, dan status persetujuan data.",
    primaryAction: { label: "Lihat Progres Anak", href: "/orang-tua/progres" as Route },
    narrative: [
      "Tampilkan ringkasan perkembangan dengan bahasa positif dan mudah dicerna.",
      "Beri konteks mengapa sebuah rekomendasi dukungan rumah penting untuk tahap saat ini.",
      "Consent ditulis sebagai keputusan yang bisa dipahami, bukan sekadar checkbox legal.",
    ],
    checkpoints: ["plain language", "progress summary", "consent clarity", "home support CTA"],
  },
  "/orang-tua/progres": {
    path: "/orang-tua/progres",
    role: "orang-tua",
    surface: "mobile-pwa",
    eyebrow: "Progres Anak",
    title: "Progress dibaca sebagai cerita tumbuh, bukan rapor angka",
    description:
      "Halaman progres menjelaskan tahap, evidence, catatan guru, dan perubahan yang terlihat dari waktu ke waktu.",
    narrative: [
      "Gunakan timeline sederhana untuk menjelaskan perkembangan minggu ini.",
      "Sorot kekuatan anak dan area dukungan berikutnya secara seimbang.",
      "Hindari istilah diagnosis atau catatan sensitif yang tidak perlu tampil.",
    ],
    checkpoints: ["timeline", "teacher notes", "strength highlight", "sensitive data guard"],
  },
  "/orang-tua/dukungan-rumah": {
    path: "/orang-tua/dukungan-rumah",
    role: "orang-tua",
    surface: "mobile-pwa",
    eyebrow: "Dukungan Rumah",
    title: "Dukungan kecil di rumah tersambung dengan journey sekolah",
    description:
      "Rekomendasi aktivitas rumah membantu orang tua mendampingi anak tanpa merasa harus menjadi guru kedua.",
    narrative: [
      "Setiap rekomendasi harus praktis, pendek, dan bisa dilakukan dengan alat yang mudah ditemui.",
      "Tampilkan tujuan aktivitas dalam satu kalimat agar orang tua memahami manfaatnya.",
      "Berikan opsi tandai selesai atau butuh bantuan untuk follow-up guru.",
    ],
    checkpoints: ["simple activity", "support goal", "completion status", "teacher follow-up"],
  },
  "/orang-tua/persetujuan": {
    path: "/orang-tua/persetujuan",
    role: "orang-tua",
    surface: "mobile-pwa",
    eyebrow: "Persetujuan Data",
    title: "Persetujuan dibuat jelas sebelum data dibagikan",
    description:
      "Orang tua melihat data apa yang diminta, siapa yang akan melihat, untuk tujuan apa, dan kapan bisa dicabut.",
    narrative: [
      "Pisahkan consent untuk portofolio, validasi DUDI, placement, dan laporan.",
      "Jelaskan konsekuensi dengan bahasa manusia, bukan paragraf panjang legal.",
      "Sediakan riwayat perubahan agar keputusan tetap transparan.",
    ],
    checkpoints: ["granular consent", "revocation", "history", "DUDI-safe explanation"],
  },
  "/guru": {
    path: "/guru",
    role: "guru",
    surface: "dashboard",
    eyebrow: "Dashboard Guru",
    title: "Guru memonitor banyak siswa tanpa kehilangan konteks personal",
    description:
      "Ruang guru menggabungkan daftar siswa, progress tahap, consent queue, rekomendasi latihan, dan follow-up placement.",
    primaryAction: { label: "Buka Daftar Siswa", href: "/dashboard/guru/siswa" as Route },
    narrative: [
      "Dashboard mengutamakan filter cepat, pencarian, status tahap, dan aksi lanjutan.",
      "Detail siswa tetap punya narasi perkembangan agar guru tidak hanya membaca tabel.",
      "Aksi besar seperti consent, validation, dan placement tidak memakai optimistic update tanpa rollback jelas.",
    ],
    checkpoints: ["server-side filters", "summary metrics", "detail drawer/page", "mutation invalidation"],
  },
  "/guru/siswa": {
    path: "/guru/siswa",
    role: "guru",
    surface: "dashboard",
    eyebrow: "Daftar Siswa",
    title: "Daftar siswa cepat dipindai dan mudah difilter",
    description:
      "Guru perlu menemukan siswa berdasarkan tahap, status consent, progress, kelas, dan kebutuhan follow-up.",
    narrative: [
      "Gunakan DataTable responsif dengan pagination atau server-side filtering.",
      "Kolom utama harus menjawab: siapa, tahap apa, status bukti, dan aksi berikutnya.",
      "Untuk data besar, siapkan virtualized list atau pagination yang tidak membebani browser.",
    ],
    checkpoints: ["TanStack Table", "server filters", "virtualization-ready", "detail route"],
  },
  "/guru/siswa/[studentId]": {
    path: "/guru/siswa/[studentId]",
    role: "guru",
    surface: "dashboard",
    eyebrow: "Detail Siswa",
    title: "Detail siswa menyatukan evidence, catatan, dan rencana pendampingan",
    description:
      "Halaman detail membantu guru membaca perjalanan siswa secara utuh sebelum memberi rekomendasi.",
    narrative: [
      "Pisahkan tab ringkasan, evidence, catatan guru, consent, dan placement.",
      "Catatan internal tidak boleh bocor ke payload DUDI.",
      "Rencana pendampingan harus bisa diperbarui tanpa mengganggu data historis.",
    ],
    checkpoints: ["tabbed detail", "private notes guard", "evidence review", "support plan"],
  },
  "/guru/consent": {
    path: "/guru/consent",
    role: "guru",
    surface: "dashboard",
    eyebrow: "Consent Queue",
    title: "Permintaan persetujuan mudah dipantau sebelum data bergerak",
    description:
      "Guru melihat consent yang menunggu, disetujui, ditolak, atau perlu diperbarui sebelum validasi DUDI.",
    narrative: [
      "Tampilkan status consent sebagai alur, bukan daftar mentah.",
      "Beri alasan mengapa consent diperlukan untuk tiap kandidat atau aktivitas.",
      "Aksi pengingat ke orang tua harus tercatat dan dapat diaudit.",
    ],
    checkpoints: ["status badges", "reminder action", "audit trail", "no optimistic approval"],
  },
  "/guru/simulasi": {
    path: "/guru/simulasi",
    role: "guru",
    surface: "dashboard",
    eyebrow: "Simulasi",
    title: "Guru menyesuaikan simulasi dengan minat dan kebutuhan siswa",
    description:
      "Halaman ini membantu guru memilih latihan, membaca hasil, dan memberi feedback yang membangun.",
    narrative: [
      "Simulasi dikelompokkan berdasarkan tahap journey dan kompetensi kerja.",
      "Hasil siswa masuk ke evidence stack dengan status perlu review atau sudah tervalidasi.",
      "Feedback ditulis sebagai arahan berikutnya, bukan penilaian yang menghakimi.",
    ],
    checkpoints: ["simulation catalog", "review queue", "feedback template", "evidence status"],
  },
  "/guru/placement": {
    path: "/guru/placement",
    role: "guru",
    surface: "dashboard",
    eyebrow: "Placement",
    title: "Placement diputuskan dari bukti, kesiapan, dan consent aktif",
    description:
      "Guru memantau kandidat yang siap masuk pipeline DUDI dan melihat kecocokan kebutuhan kerja.",
    narrative: [
      "Pipeline menampilkan siswa yang siap, butuh dukungan, sedang shortlist, atau sudah ditempatkan.",
      "Setiap kandidat hanya bisa diteruskan jika consent dan payload publik sudah siap.",
      "Integrasi DUDI tetap membaca endpoint publik yang sudah difilter backend.",
    ],
    checkpoints: ["placement pipeline", "consent gate", "public payload", "DUDI outcome"],
  },
  "/guru/laporan": {
    path: "/guru/laporan",
    role: "guru",
    surface: "dashboard",
    eyebrow: "Laporan Internal",
    title: "Laporan membantu sekolah melihat dampak tanpa membuka data berlebih",
    description:
      "Guru dan sekolah membaca rekap progres, evidence, outcome, dan kebutuhan follow-up secara aman.",
    narrative: [
      "Laporan internal boleh lebih detail daripada DUDI report, tetapi tetap mengikuti izin dan role.",
      "Export harus jelas tujuannya dan tidak tersimpan di cache publik.",
      "Gunakan summary metrics serta filter waktu, kelas, dan tahap.",
    ],
    checkpoints: ["report filters", "no-store export", "summary metrics", "role scoped access"],
  },
  "/dudi": {
    path: "/dudi",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Dashboard DUDI",
    title: "DUDI melihat talenta lewat bukti yang aman dibagikan",
    description:
      "Ruang DUDI fokus pada kandidat pseudonim, evidence publik, kebutuhan akomodasi kerja, validasi, dan shortlist.",
    primaryAction: { label: "Lihat Kandidat", href: "/dashboard/dudi/kandidat" as Route },
    narrative: [
      "DUDI tidak membaca nama siswa, kontak wali, catatan medis, atau catatan internal sekolah.",
      "Setiap kandidat tampil sebagai profil publik yang sudah lolos consent dan privacy boundary.",
      "Validasi industri menjadi seal bukti, bukan akses bebas ke data privat.",
    ],
    checkpoints: ["public candidate API", "pseudonymized data", "validation seal", "shortlist"],
  },
  "/dudi/kandidat": {
    path: "/dudi/kandidat",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Talent Pool",
    title: "Kandidat dipilih berdasarkan kompetensi yang terbukti",
    description:
      "Talent pool membantu DUDI menemukan kecocokan minat, kompetensi, akomodasi kerja, dan kesiapan tahap.",
    narrative: [
      "Filter diarahkan ke kebutuhan pekerjaan, bukan identitas pribadi siswa.",
      "Kartu kandidat menampilkan bukti inti, kesiapan, dan status validasi.",
      "Akses detail tetap memakai candidate code publik dari backend.",
    ],
    checkpoints: ["safe filters", "candidate code", "evidence preview", "privacy test"],
  },
  "/dudi/kandidat/[candidateCode]": {
    path: "/dudi/kandidat/[candidateCode]",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Detail Kandidat Publik",
    title: "Detail kandidat menjawab kecocokan kerja tanpa membuka identitas sensitif",
    description:
      "DUDI melihat ringkasan kompetensi, evidence terpilih, akomodasi kerja, dan status validasi.",
    narrative: [
      "Tampilkan hanya payload yang memang disiapkan untuk DUDI.",
      "Jangan render nama sekolah spesifik, kontak wali, catatan medis, atau catatan guru internal.",
      "CTA shortlist dan validasi harus mengecek consent aktif.",
    ],
    checkpoints: ["DUDI-safe payload", "shortlist CTA", "consent status", "hidden sensitive fields"],
  },
  "/dudi/lowongan": {
    path: "/dudi/lowongan",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Lowongan Inklusif",
    title: "Kebutuhan kerja DUDI diterjemahkan menjadi peluang yang bisa dicocokkan",
    description:
      "DUDI mengelola lowongan, skill kebutuhan, lingkungan kerja, dan akomodasi yang tersedia.",
    narrative: [
      "Form lowongan perlu membantu DUDI menulis kebutuhan dengan bahasa objektif dan inklusif.",
      "Skill dan akomodasi kerja menjadi dasar matching dengan kandidat.",
      "Status lowongan terhubung ke shortlist dan placement pipeline.",
    ],
    checkpoints: ["inclusive form", "skill taxonomy", "accommodation fields", "pipeline link"],
  },
  "/dudi/validasi": {
    path: "/dudi/validasi",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Validasi Industri",
    title: "Validasi memberi bobot pada bukti, bukan klaim sepihak",
    description:
      "DUDI memberi validasi terhadap kompetensi yang sudah dipresentasikan dalam payload publik.",
    narrative: [
      "Validasi hanya bisa dilakukan pada bukti yang sudah punya consent aktif.",
      "Setiap validasi menyimpan status, catatan, dan waktu agar dapat diaudit.",
      "Seal validasi tampil di portofolio sesuai aturan berbagi data.",
    ],
    checkpoints: ["consent gate", "validation status", "audit record", "portfolio seal"],
  },
  "/dudi/placement": {
    path: "/dudi/placement",
    role: "dudi",
    surface: "dashboard",
    eyebrow: "Placement Pipeline",
    title: "Pipeline membantu DUDI dan sekolah menjaga follow-up tetap jelas",
    description:
      "DUDI memantau kandidat dari shortlist, interview, trial, diterima, hingga butuh tindak lanjut.",
    narrative: [
      "Gunakan status pipeline yang sederhana dan mudah dipahami semua pihak.",
      "Setiap perpindahan status memicu audit dan notifikasi terkait.",
      "Data placement kembali menjadi outcome untuk guru dan admin.",
    ],
    checkpoints: ["pipeline status", "audit mutation", "notification", "outcome sync"],
  },
  "/admin": {
    path: "/admin",
    role: "admin",
    surface: "governance",
    eyebrow: "Dashboard Admin",
    title: "Admin menjaga tata kelola platform tetap rapi dan aman",
    description:
      "Admin mengelola tenant, user, sekolah, DUDI, consent oversight, audit log, dan report center.",
    primaryAction: { label: "Buka Overview", href: "/dashboard/admin" as Route },
    narrative: [
      "Admin dashboard menampilkan kesehatan sistem, status consent, aktivitas terbaru, dan anomali akses.",
      "Aksi user dan role harus tercatat karena frontend bukan lapisan security final.",
      "Report center dan audit log tidak boleh tersimpan dalam cache PWA.",
    ],
    checkpoints: ["tenant overview", "role management", "audit visibility", "no-store reports"],
  },
  "/admin/overview": {
    path: "/admin/overview",
    role: "admin",
    surface: "governance",
    eyebrow: "Overview Tenant",
    title: "Overview memberi sinyal cepat tentang adopsi dan risiko",
    description:
      "Admin membaca jumlah pengguna aktif, sekolah, DUDI, consent tertunda, validasi, dan event audit penting.",
    narrative: [
      "Metrics harus bisa dipindai cepat tanpa membuka tabel panjang.",
      "Tampilkan alert untuk consent menumpuk, error integrasi, atau akses mencurigakan.",
      "Data overview tetap berasal dari endpoint agregat backend.",
    ],
    checkpoints: ["aggregate API", "risk alerts", "summary metrics", "tenant scope"],
  },
  "/admin/users": {
    path: "/admin/users",
    role: "admin",
    surface: "governance",
    eyebrow: "User Management",
    title: "User dan role membership dikelola dengan jejak audit",
    description:
      "Admin mengundang pengguna, mengatur role, menonaktifkan akun, dan membaca status akses.",
    narrative: [
      "Form invite perlu membedakan role sekolah, orang tua, DUDI, dan admin.",
      "Perubahan role tidak cukup disembunyikan di UI; backend tetap memvalidasi izin.",
      "Setiap perubahan role masuk audit log.",
    ],
    checkpoints: ["invite flow", "role membership", "deactivation", "audit trail"],
  },
  "/admin/schools": {
    path: "/admin/schools",
    role: "admin",
    surface: "governance",
    eyebrow: "School Management",
    title: "Sekolah menjadi tenant kerja yang jelas struktur dan aksesnya",
    description:
      "Admin mengelola profil sekolah, guru, kelas, dan konfigurasi awal program vokasi inklusif.",
    narrative: [
      "Data sekolah harus terpisah per tenant agar akses lintas sekolah tidak bocor.",
      "Konfigurasi sekolah memengaruhi pilihan program, kelas, dan laporan.",
      "Status aktif/nonaktif perlu terlihat sebelum data siswa diproses.",
    ],
    checkpoints: ["tenant boundary", "school profile", "teacher membership", "program config"],
  },
  "/admin/dudi": {
    path: "/admin/dudi",
    role: "admin",
    surface: "governance",
    eyebrow: "DUDI Management",
    title: "Mitra industri dikelola sebagai ruang kolaborasi yang aman",
    description:
      "Admin mengatur perusahaan DUDI, user perusahaan, validasi, dan akses ke payload kandidat publik.",
    narrative: [
      "Akses DUDI harus terkait company membership, bukan akun individual tanpa konteks.",
      "Admin dapat melihat status kolaborasi, lowongan, validasi, dan placement.",
      "Perubahan akses DUDI wajib masuk audit log.",
    ],
    checkpoints: ["company membership", "DUDI access", "validation status", "audit"],
  },
  "/admin/consent": {
    path: "/admin/consent",
    role: "admin",
    surface: "governance",
    eyebrow: "Consent Governance",
    title: "Admin mengawasi consent tanpa mengambil alih keputusan keluarga",
    description:
      "Admin melihat status consent lintas tenant dan memastikan data tidak mengalir tanpa persetujuan.",
    narrative: [
      "Tampilan admin fokus pada status, risiko, dan kepatuhan, bukan isi data sensitif.",
      "Riwayat consent harus bisa ditelusuri dari permintaan sampai pencabutan.",
      "Export consent memakai no-store dan role check ketat.",
    ],
    checkpoints: ["consent history", "revocation status", "risk view", "no-store export"],
  },
  "/admin/audit": {
    path: "/admin/audit",
    role: "admin",
    surface: "governance",
    eyebrow: "Audit Log",
    title: "Audit log menjawab siapa melakukan apa, kapan, dan untuk konteks apa",
    description:
      "Admin menggunakan audit log untuk investigasi akses, perubahan role, consent, validasi, dan report.",
    narrative: [
      "Audit log perlu filter waktu, aktor, tenant, resource, dan event type.",
      "Data audit tidak boleh dicache offline atau tersimpan di localStorage.",
      "Detail event sebaiknya tampil dalam drawer agar konteks daftar tetap terlihat.",
    ],
    checkpoints: ["server filters", "network-only", "event detail", "export guard"],
  },
  "/admin/reports": {
    path: "/admin/reports",
    role: "admin",
    surface: "governance",
    eyebrow: "Report Center",
    title: "Report center memisahkan laporan internal dan payload publik",
    description:
      "Admin mengatur laporan adoption, progress, DUDI outcome, dan audit tanpa mencampur data privat.",
    narrative: [
      "Setiap report harus punya tujuan, role penerima, dan cakupan data yang jelas.",
      "Preview report DUDI hanya memakai public payload.",
      "Download report memakai no-store dan jejak audit.",
    ],
    checkpoints: ["report scope", "DUDI-safe preview", "no-store download", "audit event"],
  },
} satisfies Record<string, PageSpec>;

export type PageSpecKey = keyof typeof pageSpecs;

export function getPageSpec(path: PageSpecKey) {
  return pageSpecs[path];
}
