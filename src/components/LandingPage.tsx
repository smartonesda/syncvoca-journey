import {
  ArrowRight,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Heart,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  User,
  Users
} from 'lucide-react';
import { AccessibilityPreferences, UserRole } from '../types';

interface LandingPageProps {
  onEnterPortal: (role: UserRole) => void;
  preferences: AccessibilityPreferences;
}

const journeyStages = [
  {
    title: 'Intake Dukungan',
    output: 'Profil dukungan aman',
    desc: 'Sekolah memetakan minat, skill awal, kebutuhan dukungan, dan batas data privat sebelum siswa masuk simulasi.',
    icon: User,
    tone: 'bg-[#e8f8ee] text-[#12843a]'
  },
  {
    title: 'Simulasi Kerja',
    output: 'Skor performa tugas',
    desc: 'Misi adaptif memecah standar kerja industri menjadi tugas kecil yang mengukur akurasi, ketahanan, dan kemandirian.',
    icon: PlayCircle,
    tone: 'bg-[#eaf4ff] text-[#1768c8]'
  },
  {
    title: 'Rencana Pendampingan',
    output: 'Action plan rumah-sekolah',
    desc: 'Guru dan orang tua membaca progres yang sama, lalu menyusun latihan lanjutan yang realistis.',
    icon: Users,
    tone: 'bg-[#fff7d6] text-[#b77900]'
  },
  {
    title: 'Portofolio Bukti',
    output: 'Evidence stack',
    desc: 'Hasil simulasi dan catatan pendamping berubah menjadi portofolio kompetensi yang mudah dibaca.',
    icon: FileText,
    tone: 'bg-[#e8f8ee] text-[#0b5d2a]'
  },
  {
    title: 'Validasi DUDI',
    output: 'Industry Validation Seal',
    desc: 'DUDI memvalidasi bukti kompetensi dan kebutuhan akomodasi kerja tanpa melihat data sensitif.',
    icon: ShieldCheck,
    tone: 'bg-[#eef2ff] text-[#1768c8]'
  }
];

const roleCards: Array<{
  role: UserRole;
  title: string;
  desc: string;
  cta: string;
  icon: any;
}> = [
  {
    role: 'siswa',
    title: 'Siswa ABK',
    desc: 'Mulai misi kerja, lihat journey score, dan kumpulkan bukti portofolio.',
    cta: 'Mulai latihan',
    icon: User
  },
  {
    role: 'guru',
    title: 'Guru',
    desc: 'Baca pola progres, tambah catatan, dan susun rencana pendampingan.',
    cta: 'Pantau progres',
    icon: GraduationCap
  },
  {
    role: 'orang_tua',
    title: 'Orang Tua',
    desc: 'Lihat perkembangan anak dan langkah kecil yang bisa dilakukan di rumah.',
    cta: 'Dampingi anak',
    icon: Heart
  },
  {
    role: 'dudi',
    title: 'DUDI',
    desc: 'Cari talenta ABK berbasis bukti, akomodasi kerja, dan validation seal.',
    cta: 'Validasi kandidat',
    icon: Building2
  },
  {
    role: 'admin',
    title: 'Admin',
    desc: 'Kelola data demo siswa, sekolah inklusi/SLB, mitra industri, dan lowongan.',
    cta: 'Kelola demo',
    icon: ShieldCheck
  }
];

const heroProofs = [
  {
    label: '4 pilar',
    value: 'Siswa, guru, orang tua, DUDI'
  },
  {
    label: '5 tahap',
    value: 'Dari intake sampai validasi'
  },
  {
    label: 'Privacy wall',
    value: 'Data privat tidak tampil ke DUDI'
  }
];

const productProofs = [
  {
    title: 'ABK Talent Portfolio',
    desc: 'Ringkasan skill, skor simulasi, indikator fungsi, dan bukti tugas yang bisa ditinjau pendamping.',
    metric: '2 sesi bukti',
    icon: FileText
  },
  {
    title: 'Industry Validation Seal',
    desc: 'Pengakuan DUDI terhadap skill yang sudah dibuktikan lewat misi simulasi dan portofolio.',
    metric: '1 seal aktif',
    icon: Award
  },
  {
    title: 'UDL + WCAG + ICF',
    desc: 'Desain adaptif, aksesibel, dan menilai fungsi kerja, bukan label diagnosis.',
    metric: 'standar inti',
    icon: BookOpenCheck
  }
];

const ecosystemCards = [
  {
    title: 'Partner kunci',
    desc: 'SLB/sekolah inklusi, SMK/SMA inklusi, DUDI, dinas, komunitas ABK, ahli PLB, dan mitra sertifikasi.',
    icon: Users
  },
  {
    title: 'Value proposition',
    desc: 'Simulasi vokasi adaptif, portofolio kompetensi digital, monitoring empat pilar, dan validasi kesiapan kerja.',
    icon: Sparkles
  },
  {
    title: 'Model berkelanjutan',
    desc: 'Freemium & partnership: SaaS sekolah, subscription DUDI, CSR/grant, validasi modul, dan placement fee tanpa membebani ABK.',
    icon: BriefcaseBusiness
  }
];

export default function LandingPage({ onEnterPortal, preferences }: LandingPageProps) {
  const isHighContrast = preferences.highContrast;

  const titleClass = {
    normal: 'text-[2.25rem] sm:text-5xl lg:text-[4rem]',
    large: 'text-[2.55rem] sm:text-6xl lg:text-[4.6rem]',
    xlarge: 'text-[2.9rem] sm:text-7xl lg:text-[5.1rem]'
  }[preferences.textSize];

  const bodyClass = {
    normal: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  }[preferences.textSize];

  const surfaceClass = isHighContrast
    ? 'border-4 border-black bg-white text-black shadow-none'
    : 'border border-[#dbe7dd] bg-white text-[#17351f] shadow-sm';

  return (
    <div className={`space-y-10 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'}`}>
      <section className={`relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] ${surfaceClass}`}>
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#1768c8] via-[#12843a] to-[#f6c343]" />

        <div className="grid gap-8 p-4 sm:p-8 lg:grid-cols-[1.02fr_0.98fr] lg:p-10">
          <div className="flex flex-col justify-between gap-7">
            <div className="space-y-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dbe7dd] bg-[#f8faf7] px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#0b5d2a]">
                <Sparkles className="h-4 w-4 text-[#f59e0b]" />
                Ekosistem vokasi-inklusi ABK
              </div>

              <div className="space-y-4">
                <h1 className={`${titleClass} max-w-full break-words font-display font-black leading-[0.98] tracking-tight text-[#17351f] sm:max-w-5xl sm:leading-[0.94]`}>
                  Bukti kerja ABK, siap dibaca sekolah dan DUDI.
                </h1>
                <p className={`${bodyClass} max-w-2xl font-medium leading-relaxed text-[#61746a]`}>
                  SyncVoca Journey mengubah misi simulasi adaptif menjadi portofolio kompetensi, rencana pendampingan, dan Industry Validation Seal tanpa membuka data sensitif siswa.
                </p>
              </div>

              <div className="flex flex-col gap-3 min-[460px]:flex-row min-[460px]:flex-wrap">
                <a
                  href="#portal-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12843a] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/10 transition hover:bg-[#0b5d2a]"
                >
                  Masuk Portal Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#proof"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dbe7dd] bg-white px-5 py-3 text-sm font-black text-[#17351f] transition hover:bg-[#eef8f0]"
                >
                  Lihat Bukti Produk
                </a>
              </div>

              <div className="rounded-[1.25rem] border border-[#dbe7dd] bg-[#f8faf7] p-3">
                <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#61746a]">
                  Pilih mode demo cepat
                </p>
                <div className="grid gap-2 min-[520px]:grid-cols-5">
                  {roleCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <button
                        key={card.role}
                        onClick={() => onEnterPortal(card.role)}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-white px-3 py-3 text-xs font-black text-[#17351f] transition hover:bg-[#e8f8ee] hover:text-[#0b5d2a]"
                      >
                        <Icon className="h-4 w-4 text-[#12843a]" />
                        <span>{card.title.replace(' ABK', '')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroProofs.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#12843a]">{item.label}</p>
                  <p className="mt-1 text-sm font-black leading-snug text-[#17351f]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-[2rem] border border-[#dbe7dd] bg-gradient-to-b from-white to-[#eef8f0] p-5 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/syncvoca-logo.png"
                    alt="Logo SyncVoca Journey"
                    className="h-16 w-16 rounded-2xl border border-[#dbe7dd] object-cover"
                  />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#61746a]">Live demo output</p>
                    <h2 className="font-display text-xl font-black text-[#17351f]">Nadia Saputri</h2>
                    <p className="text-xs font-bold text-[#61746a]">Administrasi digital & desain grafis</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#fff7d6] p-3 text-[#b77900]">
                  <Award className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['Journey Score', '88%'],
                  ['Sesi Bukti', '2'],
                  ['Validation Seal', '1']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#61746a]">{label}</p>
                    <p className="mt-1 font-display text-3xl font-black text-[#12843a]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-[#17351f]">Portofolio kompetensi digital</p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-[#61746a]">
                      Akurasi data entry, ketahanan tugas, komunikasi tertulis, dan kemandirian kerja.
                    </p>
                  </div>
                  <ClipboardCheck className="h-8 w-8 shrink-0 text-[#1768c8]" />
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e8f8ee]">
                  <div className="h-full w-[88%] rounded-full bg-[#12843a]" />
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#12843a]">
                    <CheckCircle2 className="h-4 w-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.12em]">DUDI melihat</p>
                  </div>
                  <p className="text-xs font-bold leading-relaxed text-[#61746a]">Skill, skor, portofolio, kebutuhan akomodasi kerja.</p>
                </div>
                <div className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#12843a]">
                    <LockKeyhole className="h-4 w-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.12em]">Tetap privat</p>
                  </div>
                  <p className="text-xs font-bold leading-relaxed text-[#61746a]">Catatan medis, keluarga, dan catatan sensitif pendamping.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#12843a]">Alur produk utama</p>
            <h2 className="mt-2 font-display text-3xl font-black text-[#17351f]">Dari intake menjadi validasi industri</h2>
          </div>
          <p className="max-w-xl text-sm font-medium leading-relaxed text-[#61746a]">
            Nama tahap di landing sama dengan workspace demo, sehingga user tidak pindah konteks saat masuk sebagai siswa, guru, orang tua, DUDI, atau admin.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {journeyStages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-[#dbe7dd] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className={`rounded-2xl p-3 ${item.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-black text-[#c4d7c9]">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-sm font-black text-[#17351f]">{item.title}</h3>
                <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#12843a]">{item.output}</p>
                <p className="mt-2 text-xs font-medium leading-relaxed text-[#61746a]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="proof" className="scroll-mt-24 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className={`rounded-[2rem] p-5 sm:p-6 ${surfaceClass}`}>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#12843a]">Proof over claim</p>
              <h2 className="mt-2 font-display text-3xl font-black text-[#17351f]">Output yang ditunjukkan ke juri</h2>
            </div>
            <p className="max-w-sm text-xs font-medium leading-relaxed text-[#61746a]">
              Klaim inklusi dibuat konkret lewat artefak yang bisa dibuka, dibaca, dan divalidasi.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {productProofs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#12843a] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#61746a]">{item.metric}</p>
                  <h3 className="mt-1 text-sm font-black text-[#17351f]">{item.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-[#61746a]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#dbe7dd] bg-[#0b5d2a] p-5 text-white shadow-xl sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9f99d]">BMC signal</p>
              <h2 className="mt-3 font-display text-3xl font-black">Bukan hanya aplikasi, tetapi ekosistem berkelanjutan.</h2>
            </div>
            <BriefcaseBusiness className="h-8 w-8 shrink-0 text-[#f6c343]" />
          </div>
          <div className="mt-6 space-y-3">
            {ecosystemCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3 rounded-2xl bg-white/10 p-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#f6c343]" />
                  <div>
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-white/85">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portal-demo" className={`scroll-mt-24 rounded-[2rem] p-5 sm:p-6 ${surfaceClass}`}>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#12843a]">Portal role demo</p>
            <h2 className="mt-2 font-display text-2xl font-black text-[#17351f]">Masuk dari sudut pandang pengguna</h2>
          </div>
          <p className="max-w-sm text-xs font-medium leading-relaxed text-[#61746a]">
            Setiap role masuk ke journey yang sama, tetapi prioritas aksi dan hak melihat datanya berbeda.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {roleCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.role}
                onClick={() => onEnterPortal(card.role)}
                className="group flex min-h-[190px] flex-col justify-between rounded-2xl border border-[#dbe7dd] bg-[#f8faf7] p-4 text-left transition hover:-translate-y-1 hover:border-[#12843a] hover:bg-[#eef8f0] hover:shadow-lg"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#12843a] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-black text-[#17351f]">{card.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-[#61746a]">{card.desc}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[#12843a]">
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-[#dbe7dd] pt-6 text-center text-xs font-semibold text-[#61746a]">
        <p>© 2026 SyncVoca Journey. Menghubungkan potensi, menembus batas, mewujudkan kemandirian ekonomi inklusif.</p>
      </footer>
    </div>
  );
}
