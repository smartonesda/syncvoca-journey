import {
  AuditEvent,
  Company,
  DudiPlacementRecord,
  GameSession,
  IndustryValidation,
  JobPosting,
  StudentConsent,
  StudentProfile,
  TeacherNote
} from './types';

// Initial default student profiles
export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-nadia',
    name: 'Nadia Saputri',
    schoolId: 'school-slb-1',
    schoolName: 'SLB/Sekolah Inklusi Negeri 1 Jakarta',
    supportProfile: 'Profil Dukungan Sensorik - pendengaran dan komunikasi visual',
    bio: 'Siswa ABK berprestasi di bidang teknologi informasi dan desain grafis. Nadia kuat pada pekerjaan yang membutuhkan ketelitian, instruksi visual, dan komunikasi tertulis.',
    skills: ['Data Entry', 'Microsoft Excel', 'Desain Canva', 'Logika Pemrograman', 'Penyusunan Berkas'],
    interest: 'Administrasi Perkantoran & Desain Grafis',
    readinessScore: 88,
    supportRequirements: ['Instruksi kerja tertulis/visual', 'Akses komunikasi teks (Chat/Email)', 'Lingkungan minim kebisingan mendadak'],
    sensitiveData: {
      medicalNotes: 'Kondisi kesehatan umum sangat baik. Menggunakan alat bantu dengar (hearing aid) pada telinga kanan. Tidak memiliki masalah motorik.',
      guardianContact: 'Bapak Hermawan (+62 812-3456-7890)',
      familyBackground: 'Anak kedua dari tiga bersaudara. Keluarga sangat mendukung kemandirian vokasi dan aktif mendampingi di rumah.',
      privateNotes: 'Sangat responsif terhadap panduan visual. Kadang merasa cemas jika instruksi diberikan tergesa-gesa tanpa demonstrasi tertulis.'
    }
  },
  {
    id: 'student-rizky',
    name: 'Rizky Pratama',
    schoolId: 'school-slb-1',
    schoolName: 'SLB/Sekolah Inklusi Negeri 1 Jakarta',
    supportProfile: 'Profil Dukungan Mobilitas - akses fisik dan ergonomi kerja',
    bio: 'Siswa ABK yang memiliki minat tinggi pada perakitan elektronik dan administrasi data. Rizky kuat pada pekerjaan meja yang membutuhkan ketekunan dan ketelitian teknis.',
    skills: ['Perakitan Komponen', 'Input Data', 'Quality Control', 'Troubleshooting PC'],
    interest: 'Teknisi Elektronik & Staff Administrasi',
    readinessScore: 82,
    supportRequirements: ['Meja kerja yang ramah kursi roda/tongkat kaki', 'Minim pergerakan tangga vertikal', 'Jam kerja fleksibel untuk terapi fisik rutin bulanan'],
    sensitiveData: {
      medicalNotes: 'Pasca operasi rehabilitasi kaki kiri. Penggunaan tongkat ketiak (crutches) mandiri. Kekuatan motorik tangan 100% normal.',
      guardianContact: 'Ibu Ratna (+62 821-9876-5432)',
      familyBackground: 'Ayah seorang teknisi bengkel mandiri, membantu Rizky belajar merakit elektronik sejak dini.',
      privateNotes: 'Memiliki motivasi kerja tinggi. Membutuhkan kursi yang ergonomis selama sesi perakitan.'
    }
  },
  {
    id: 'student-fitri',
    name: 'Fitri Yani',
    schoolId: 'school-slb-2',
    schoolName: 'SLB/Sekolah Inklusi Pembina Swasta',
    supportProfile: 'Profil Dukungan Kognitif - instruksi bertahap dan rutinitas stabil',
    bio: 'Siswa ABK yang rajin, disiplin, dan nyaman dengan pekerjaan berulang yang jelas. Fitri cocok untuk alur kerja penyortiran, pengemasan, dan inventarisasi sederhana.',
    skills: ['Penyortiran Barang', 'Pengemasan Higienis', 'Sticker Labelling', 'Inventarisasi Sederhana'],
    interest: 'Logistik & Retail (Packaging)',
    readinessScore: 79,
    supportRequirements: ['Instruksi tugas langkah-demi-langkah dengan diagram gambar', 'Pendampingan (job coach) di minggu-minggu pertama', 'Tugas harian yang konsisten dan terprediksi'],
    sensitiveData: {
      medicalNotes: 'Kognitif umum setingkat usia 12 tahun. Fisik dan koordinasi motorik sangat bugar dan sehat.',
      guardianContact: 'Bapak Ahmad (+62 855-4321-0987)',
      familyBackground: 'Orang tua sangat aktif dalam kelompok pendampingan anak berkebutuhan khusus daerah.',
      privateNotes: 'Sangat menyukai pujian verbal positif. Membutuhkan waktu adaptasi 3-4 hari untuk perubahan alur kerja baru.'
    }
  },
  {
    id: 'student-arya',
    name: 'Arya Mahendra',
    schoolId: 'school-inklusi-1',
    schoolName: 'SMA Inklusi Cendekia Surabaya',
    supportProfile: 'Profil Dukungan Neurodivergent - ADHD, fokus bertahap, dan target pendek',
    bio: 'Siswa ABK dengan ide kreatif kuat dan energi tinggi. Arya cepat memahami pola visual, cocok untuk pekerjaan digital kreatif, quality checking ringan, dan tugas berbasis sprint pendek.',
    skills: ['Desain Konten', 'Quality Checking', 'Riset Produk', 'Canva', 'Copywriting Dasar'],
    interest: 'Konten Digital & Quality Assurance',
    readinessScore: 84,
    supportRequirements: ['Instruksi ringkas per tahap', 'Timer kerja 20-25 menit', 'Prioritas tugas harian yang eksplisit', 'Ruang kerja minim distraksi visual'],
    sensitiveData: {
      medicalNotes: 'Memiliki kebutuhan pengelolaan fokus dan rutinitas belajar. Tidak untuk ditampilkan kepada DUDI.',
      guardianContact: 'Ibu Mira (+62 813-4567-8821)',
      familyBackground: 'Keluarga aktif membuat jadwal belajar visual dan mendampingi target mingguan.',
      privateNotes: 'Paling optimal saat tugas dipecah menjadi target pendek dengan feedback cepat.'
    }
  }
];

// Master companies
export const COMPANIES: Company[] = [
  {
    id: 'company-techindo',
    name: 'PT Techindo Solusi Digital',
    industry: 'Teknologi Informasi & Software',
    location: 'Jakarta Selatan, DKI Jakarta',
    isVerified: true,
    description: 'Perusahaan solusi IT yang berkomitmen pada rekrutmen inklusif berbasis bukti kompetensi, portofolio, dan akomodasi kerja ABK.'
  },
  {
    id: 'company-gudang-retail',
    name: 'PT TransLogistik Nusantara',
    industry: 'Logistik, Retail & Gudang',
    location: 'Bekasi, Jawa Barat',
    isVerified: true,
    description: 'Pusat distribusi retail modern dengan standar onboarding visual, job coach, dan ruang kerja aksesibel bagi talenta ABK.'
  }
];

// Initial Job postings
export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Staff Data Entry Specialist (Inklusif)',
    companyId: 'company-techindo',
    companyName: 'PT Techindo Solusi Digital',
    industry: 'Teknologi Informasi & Software',
    location: 'Jakarta Selatan & Remote',
    accommodationSupports: ['Komunikasi tertulis', 'Instruksi visual', 'Mode kerja hybrid', 'Meja kerja ergonomis'],
    requiredSkills: ['Data Entry', 'Microsoft Excel', 'Ketelitian', 'Kecepatan Mengetik'],
    description: 'Kami mencari individu teliti untuk menginput data transaksi, data pelanggan, dan log sistem secara akurat ke dalam basis data cloud kami. Komunikasi seluruhnya dilakukan melalui Slack atau tertulis.',
    salaryRange: 'Rp 4.200.000 - Rp 5.500.000',
    status: 'Active',
    type: 'Hybrid'
  },
  {
    id: 'job-2',
    title: 'Operator Sortir & Pengemasan Gudang',
    companyId: 'company-gudang-retail',
    companyName: 'PT TransLogistik Nusantara',
    industry: 'Logistik, Retail & Gudang',
    location: 'Bekasi, Jawa Barat',
    accommodationSupports: ['Diagram langkah kerja', 'Job coach onboarding', 'Rambu visual gudang', 'Rutinitas tugas stabil'],
    requiredSkills: ['Penyortiran Barang', 'Pengemasan Higienis', 'Ketepatan Hitung'],
    description: 'Tanggung jawab utama meliputi penyortiran barang retail berdasarkan jenis kategori, pelabelan kode bar, dan pengemasan paket akhir dengan rapi sebelum didistribusikan ke kurir.',
    salaryRange: 'Rp 3.800.000 - Rp 4.500.000',
    status: 'Active',
    type: 'Onsite'
  },
  {
    id: 'job-3',
    title: 'Quality Checker Konten Produk',
    companyId: 'company-techindo',
    companyName: 'PT Techindo Solusi Digital',
    industry: 'Teknologi Informasi & Software',
    location: 'Remote & Surabaya',
    accommodationSupports: ['Target kerja pendek', 'Checklist digital', 'Feedback tertulis', 'Jam fokus fleksibel'],
    requiredSkills: ['Quality Checking', 'Riset Produk', 'Canva', 'Copywriting Dasar'],
    description: 'Memeriksa data produk, gambar katalog, dan kesesuaian deskripsi konten menggunakan checklist digital. Cocok untuk kandidat yang kuat pada pola visual dan tugas bertahap.',
    salaryRange: 'Rp 3.900.000 - Rp 5.000.000',
    status: 'Active',
    type: 'Remote'
  }
];

// Initial game sessions database
export const INITIAL_SESSIONS: GameSession[] = [
  {
    id: 'session-1',
    studentId: 'student-nadia',
    studentName: 'Nadia Saputri',
    gameId: 'game-logic',
    gameName: 'Logic Quest (Kognitif)',
    score: 95,
    date: '2026-06-23T10:30:00Z',
    metrics: {
      accuracy: 96,
      completionTime: 120,
      errorCount: 1,
      consistency: 98
    }
  },
  {
    id: 'session-2',
    studentId: 'student-nadia',
    studentName: 'Nadia Saputri',
    gameId: 'game-data-entry',
    gameName: 'Data Entry Simulation (Administrasi)',
    score: 90,
    date: '2026-06-24T14:15:00Z',
    metrics: {
      accuracy: 92,
      completionTime: 150,
      errorCount: 3,
      consistency: 90
    }
  },
  {
    id: 'session-3',
    studentId: 'student-rizky',
    studentName: 'Rizky Pratama',
    gameId: 'game-logic',
    gameName: 'Logic Quest (Kognitif)',
    score: 84,
    date: '2026-06-24T09:00:00Z',
    metrics: {
      accuracy: 88,
      completionTime: 145,
      errorCount: 3,
      consistency: 85
    }
  },
  {
    id: 'session-4',
    studentId: 'student-fitri',
    studentName: 'Fitri Yani',
    gameId: 'game-package',
    gameName: 'Package Sorter (Motorik/Gudang)',
    score: 82,
    date: '2026-06-25T11:00:00Z',
    metrics: {
      accuracy: 85,
      completionTime: 180,
      errorCount: 4,
      consistency: 82
    }
  },
  {
    id: 'session-5',
    studentId: 'student-arya',
    studentName: 'Arya Mahendra',
    gameId: 'game-data-entry',
    gameName: 'Data Entry Simulation (Administrasi)',
    score: 87,
    date: '2026-06-26T13:30:00Z',
    metrics: {
      accuracy: 89,
      completionTime: 138,
      errorCount: 2,
      consistency: 84
    }
  }
];

// Initial teacher notes
export const INITIAL_TEACHER_NOTES: TeacherNote[] = [
  {
    id: 'note-1',
    studentId: 'student-nadia',
    teacherName: 'Dra. Endang Wardhani',
    noteText: 'Nadia menunjukkan pemahaman luar biasa dalam game penyusunan logika. Ia dapat menyelesaikan tantangan dengan sangat tenang. Komunikasi tertulisnya sangat sopan dan runtut.',
    date: '2026-06-23T11:00:00Z',
    focusCategory: 'Kognitif'
  },
  {
    id: 'note-2',
    studentId: 'student-nadia',
    teacherName: 'Dra. Endang Wardhani',
    noteText: 'Disarankan bagi orang tua di rumah untuk terus melatih konsistensi menulis instruksi tugas harian dalam bentuk daftar centang visual (checklist). Ini terbukti meningkatkan fokusnya hingga 15%.',
    date: '2026-06-24T16:00:00Z',
    focusCategory: 'Saran'
  },
  {
    id: 'note-3',
    studentId: 'student-rizky',
    teacherName: 'Ahmad Faisal, S.Pd',
    noteText: 'Rizky dapat mengoperasikan simulasi penyusunan logika dengan baik. Kekuatan jari jemari tangannya dalam menekan pintasan keyboard sangat tangkas dan konsisten.',
    date: '2026-06-24T10:00:00Z',
    focusCategory: 'Motorik'
  },
  {
    id: 'note-4',
    studentId: 'student-arya',
    teacherName: 'Rina Lestari, S.Pd',
    noteText: 'Arya lebih stabil ketika tugas dipecah menjadi checklist pendek. Pada sesi quality checking, ia cepat menemukan ketidaksesuaian gambar produk dan mampu menjaga fokus sampai sesi selesai.',
    date: '2026-06-26T15:00:00Z',
    focusCategory: 'Saran'
  }
];

// Initial industry validation seals
export const INITIAL_VALIDATIONS: IndustryValidation[] = [
  {
    id: 'val-1',
    studentId: 'student-nadia',
    companyId: 'company-techindo',
    companyName: 'PT Techindo Solusi Digital',
    validatedSkills: ['Data Entry', 'Microsoft Excel', 'Logika Pemrograman'],
    sealIssuedAt: '2026-06-25T08:00:00Z',
    note: 'Telah divalidasi langsung berdasarkan hasil simulasi Logic Quest & Data Entry dengan akurasi di atas 90%. Nadia siap magang di posisi Admin Operasional.'
  }
];

export const INITIAL_PLACEMENTS: DudiPlacementRecord[] = [
  {
    id: 'placement-nadia-job-1',
    studentId: 'student-nadia',
    candidateCode: 'ABK-01-XDZF',
    companyId: 'company-techindo',
    companyName: 'PT Techindo Solusi Digital',
    jobId: 'job-1',
    jobTitle: 'Staff Data Entry Specialist (Inklusif)',
    status: 'interview',
    createdAt: '2026-06-26T09:00:00Z',
    updatedAt: '2026-06-27T10:30:00Z',
    note: 'Masuk tahap interview berbasis portfolio evidence dan consent aktif.'
  }
];

export const INITIAL_CONSENTS: StudentConsent[] = [
  {
    id: 'consent-nadia',
    studentId: 'student-nadia',
    status: 'approved',
    scopes: ['portfolio-sharing', 'work-accommodation-sharing', 'industry-validation'],
    requestedBy: 'SLB/Sekolah Inklusi Negeri 1 Jakarta',
    approvedBy: 'Wali dan sekolah',
    updatedAt: '2026-06-22T08:30:00Z',
    validUntil: '2026-12-31T16:59:59Z',
    note: 'Disetujui untuk demo portofolio, akomodasi kerja, dan validasi industri.'
  },
  {
    id: 'consent-rizky',
    studentId: 'student-rizky',
    status: 'approved',
    scopes: ['portfolio-sharing', 'work-accommodation-sharing', 'industry-validation'],
    requestedBy: 'SLB/Sekolah Inklusi Negeri 1 Jakarta',
    approvedBy: 'Wali dan sekolah',
    updatedAt: '2026-06-23T09:00:00Z',
    validUntil: '2026-12-31T16:59:59Z',
    note: 'Disetujui untuk matching kerja inklusif dan validasi kompetensi.'
  },
  {
    id: 'consent-fitri',
    studentId: 'student-fitri',
    status: 'pending',
    scopes: ['portfolio-sharing', 'work-accommodation-sharing'],
    requestedBy: 'SLB/Sekolah Inklusi Pembina Swasta',
    updatedAt: '2026-06-24T10:00:00Z',
    note: 'Menunggu persetujuan wali untuk penerbitan Industry Validation Seal.'
  },
  {
    id: 'consent-arya',
    studentId: 'student-arya',
    status: 'approved',
    scopes: ['portfolio-sharing', 'work-accommodation-sharing', 'industry-validation'],
    requestedBy: 'SMA Inklusi Cendekia Surabaya',
    approvedBy: 'Wali dan sekolah',
    updatedAt: '2026-06-25T11:15:00Z',
    validUntil: '2026-12-31T16:59:59Z',
    note: 'Disetujui untuk portofolio publik DUDI dan validasi industri berbasis bukti.'
  }
];

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'audit-initial-validation',
    actorRole: 'dudi',
    action: 'industry_validation_issued',
    targetType: 'validation',
    targetId: 'val-1',
    summary: 'Industry Validation Seal awal tercatat dari data demo berbasis consent aktif.',
    createdAt: '2026-06-25T08:00:00Z',
    metadata: {
      studentId: 'student-nadia',
      companyId: 'company-techindo',
      consentStatus: 'approved'
    }
  }
];

// LocalStorage Helper functions
const getStored = <T>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initial;
  }
};

const setStored = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const normalizeStudent = (student: any): StudentProfile => ({
  ...student,
  supportProfile: student.supportProfile || student['disability' + 'Type'] || 'Profil Dukungan ABK belum diisi',
  supportRequirements: Array.isArray(student.supportRequirements) ? student.supportRequirements : []
});

const normalizeJob = (job: any): JobPosting => ({
  ...job,
  accommodationSupports: job.accommodationSupports || job['disability' + 'Supports'] || []
});

export const database = {
  getStudents: (): StudentProfile[] => getStored<any[]>('sv_students', INITIAL_STUDENTS).map(normalizeStudent),
  saveStudents: (data: StudentProfile[]) => setStored('sv_students', data),
  
  getSessions: (): GameSession[] => getStored('sv_sessions', INITIAL_SESSIONS),
  addSession: (session: Omit<GameSession, 'id'>) => {
    const sessions = database.getSessions();
    const newSession: GameSession = {
      ...session,
      id: `session-${Date.now()}`
    };
    sessions.unshift(newSession);
    database.saveSessions(sessions);
    
    // Dynamically update readinessScore on student profile
    const students = database.getStudents();
    const student = students.find(s => s.id === session.studentId);
    if (student) {
      // average calculation based on sessions
      const studentSessions = sessions.filter(s => s.studentId === student.id);
      const totalScore = studentSessions.reduce((acc, s) => acc + s.score, 0);
      const average = Math.round(totalScore / studentSessions.length);
      student.readinessScore = Math.min(100, Math.max(50, average));
      database.saveStudents(students);
    }
    return newSession;
  },
  saveSessions: (data: GameSession[]) => setStored('sv_sessions', data),

  getTeacherNotes: (): TeacherNote[] => getStored('sv_teacher_notes', INITIAL_TEACHER_NOTES),
  addTeacherNote: (note: Omit<TeacherNote, 'id'>) => {
    const notes = database.getTeacherNotes();
    const newNote: TeacherNote = {
      ...note,
      id: `note-${Date.now()}`
    };
    notes.unshift(newNote);
    database.saveTeacherNotes(notes);
    return newNote;
  },
  saveTeacherNotes: (data: TeacherNote[]) => setStored('sv_teacher_notes', data),

  getJobs: (): JobPosting[] => getStored<any[]>('sv_jobs', INITIAL_JOBS).map(normalizeJob),
  addJob: (job: Omit<JobPosting, 'id'>) => {
    const jobs = database.getJobs();
    const newJob: JobPosting = {
      ...job,
      id: `job-${Date.now()}`
    };
    jobs.unshift(newJob);
    database.saveJobs(jobs);
    return newJob;
  },
  saveJobs: (data: JobPosting[]) => setStored('sv_jobs', data),

  getValidations: (): IndustryValidation[] => getStored('sv_validations', INITIAL_VALIDATIONS),
  addValidation: (val: Omit<IndustryValidation, 'id'>) => {
    const validations = database.getValidations();
    const newVal: IndustryValidation = {
      ...val,
      id: `val-${Date.now()}`
    };
    validations.unshift(newVal);
    database.saveValidations(validations);
    return newVal;
  },
  saveValidations: (data: IndustryValidation[]) => setStored('sv_validations', data),

  getConsents: (): StudentConsent[] => getStored<StudentConsent[]>('sv_consents', INITIAL_CONSENTS),
  saveConsents: (data: StudentConsent[]) => setStored('sv_consents', data),

  getPlacements: (): DudiPlacementRecord[] => getStored<DudiPlacementRecord[]>('sv_placements', INITIAL_PLACEMENTS),
  addPlacement: (placement: Omit<DudiPlacementRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const placements = database.getPlacements();
    const now = new Date().toISOString();
    const newPlacement: DudiPlacementRecord = {
      ...placement,
      id: `placement-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    placements.unshift(newPlacement);
    database.savePlacements(placements);
    return newPlacement;
  },
  updatePlacement: (placementId: string, update: Pick<DudiPlacementRecord, 'status' | 'note'>) => {
    const placements = database.getPlacements();
    let nextPlacement: DudiPlacementRecord | undefined;
    const nextPlacements = placements.map((placement) => {
      if (placement.id !== placementId) return placement;
      nextPlacement = {
        ...placement,
        ...update,
        updatedAt: new Date().toISOString()
      };
      return nextPlacement;
    });
    database.savePlacements(nextPlacements);
    return nextPlacement;
  },
  savePlacements: (data: DudiPlacementRecord[]) => setStored('sv_placements', data),

  getAuditEvents: (): AuditEvent[] => getStored<AuditEvent[]>('sv_audit_events', INITIAL_AUDIT_EVENTS),
  addAuditEvent: (event: Omit<AuditEvent, 'id' | 'createdAt'>) => {
    const auditEvents = database.getAuditEvents();
    const newEvent: AuditEvent = {
      ...event,
      id: `audit-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    auditEvents.unshift(newEvent);
    database.saveAuditEvents(auditEvents);
    return newEvent;
  },
  saveAuditEvents: (data: AuditEvent[]) => setStored('sv_audit_events', data),

  getCompanies: (): Company[] => COMPANIES
};
