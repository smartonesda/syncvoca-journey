import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, User, Key, Keyboard, Package, Sparkles, CheckCircle2, 
  Eye, FileText, Printer, ArrowRight, TrendingUp, Accessibility, Star, Heart,
  MessageSquare, Send, Bot, Trophy, Medal, Award, Bell, Clock
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import { StudentProfile, GameSession, AccessibilityPreferences, IndustryValidation } from '../types';
import { useAppFeedback } from './AppFeedback';
import Games from './Games';
interface SiswaDashboardProps {
  student: StudentProfile;
  students: StudentProfile[];
  sessions: GameSession[];
  onGameComplete: (session: GameSession) => void;
  preferences: AccessibilityPreferences;
  validations: IndustryValidation[];
}

export default function SiswaDashboard({ 
  student, 
  students,
  sessions, 
  onGameComplete, 
  preferences,
  validations 
}: SiswaDashboardProps) {
  const { notify } = useAppFeedback();
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'portfolio' | 'mentor' | 'leaderboard'>('overview');
  const [leaderboardFilter, setLeaderboardFilter] = useState<'global' | 'logic' | 'data-entry' | 'package' | 'validation'>('global');

  // PWA push notification reminder states
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isSWRegistered, setIsSWRegistered] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(false);
  const [demoMessage, setDemoMessage] = useState('');
  const [isScheduling, setIsScheduling] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        setIsSWRegistered(!!reg);
      });
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      notify({
        title: 'Notifikasi tidak tersedia',
        message: 'Browser atau frame ini belum mendukung notifikasi sistem.',
        tone: 'warning'
      });
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        sendNotificationDirectly(
          'SyncVoca Aktif',
          'Terima kasih telah mengaktifkan pengingat PWA karir inklusif Anda.'
        );
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  const sendNotificationDirectly = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          // Send notification via Service Worker registration to work in background PWA style
        reg.showNotification(title, {
            body,
            icon: '/syncvoca-logo.png',
            badge: '/syncvoca-logo.png',
            vibrate: [100, 50, 100],
            tag: 'syncvoca-reminder'
          } as any);
        });
      } else {
        new Notification(title, { body });
      }
    } else {
      // In-app fallback banner if permission is not granted or blocked by iframe sandbox
      setDemoMessage(`${title}: ${body}`);
      setShowDemoBanner(true);
    }
  };

  const schedulePWAReminder = (type: 'simulation' | 'validation') => {
    setIsScheduling(type);
    
    const title = type === 'simulation' 
      ? 'Waktunya Latihan di SyncVoca'
      : 'Validasi Industri Menunggu';
    
    const body = type === 'simulation'
      ? `Halo ${student.name}, sudah 24 jam sejak simulasi terakhir Anda. Ayo ikuti simulasi baru untuk meningkatkan Kesiapan Kerja!`
      : `Halo ${student.name}, Anda memiliki capaian simulasi yang memenuhi kualifikasi Validasi DUDI. Segera periksa dan klaim Seal Validasi Anda!`;

    // 5 second delay to simulate real-world background reminder behavior
    setTimeout(() => {
      sendNotificationDirectly(title, body);
      setIsScheduling(null);
    }, 4000);
  };

  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; id: string }>>([
    { 
      role: 'assistant', 
      text: `Halo ${student.name}! Saya adalah Mentor Vokasi AI Anda di SyncVoca.\n\nSaya telah membaca minat Anda di bidang **${student.interest}** dan profil dukungan ABK **${student.supportProfile}**.\n\nSaya siap membantu menjawab pertanyaan seputar persiapan kerja, bimbingan karier, akomodasi kerja yang diperlukan, serta bagaimana simulasi kerja di SyncVoca dapat membantu melatih keterampilan Anda.\n\nApa yang ingin Anda tanyakan hari ini?`,
      id: 'welcome'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [suggestedQuestions] = useState([
    `Bagaimana prospek kerja bidang ${student.interest}?`,
    `Akomodasi apa yang bisa saya peroleh untuk profil dukungan ${student.supportProfile}?`,
    `Bagaimana melatih ketelitian kognitif atau data entry?`,
    `Tips menghadapi wawancara kerja yang inklusif?`
  ]);

  const studentSessions = sessions.filter(s => s.studentId === student.id);

  // Filter sessions by game type
  const logicSessions = studentSessions.filter(s => s.gameName.toLowerCase().includes('logic') || s.gameId === 'game-logic');
  const entrySessions = studentSessions.filter(s => s.gameName.toLowerCase().includes('data entry') || s.gameId === 'game-data-entry' || s.gameName.toLowerCase().includes('administrasi'));
  const packageSessions = studentSessions.filter(s => s.gameName.toLowerCase().includes('package') || s.gameId === 'game-package' || s.gameName.toLowerCase().includes('gudang') || s.gameName.toLowerCase().includes('sort'));

  // Calculate averages or fall back to baselines from skills and readinessScore
  const logicScore = logicSessions.length > 0 
    ? Math.round(logicSessions.reduce((acc, s) => acc + s.score, 0) / logicSessions.length)
    : (student.skills.includes('Logika Pemrograman') ? 90 : 75);

  const accuracyScore = entrySessions.length > 0
    ? Math.round(entrySessions.reduce((acc, s) => acc + s.metrics.accuracy, 0) / entrySessions.length)
    : (student.skills.includes('Data Entry') ? 85 : 70);

  const motoricScore = packageSessions.length > 0
    ? Math.round(packageSessions.reduce((acc, s) => acc + s.metrics.accuracy, 0) / packageSessions.length)
    : (student.skills.includes('Penyortiran Barang') || student.skills.includes('Perakitan Komponen') ? 80 : 65);

  const consistencyScore = studentSessions.length > 0
    ? Math.round(studentSessions.reduce((acc, s) => acc + s.metrics.consistency, 0) / studentSessions.length)
    : Math.round(student.readinessScore * 0.95);

  const speedScore = studentSessions.length > 0
    ? Math.round(Math.max(40, Math.min(100, 100 - (studentSessions.reduce((acc, s) => acc + s.metrics.completionTime, 0) / studentSessions.length) / 5)))
    : Math.round(student.readinessScore * 0.9);

  const competencyData = [
    { subject: 'Logika Sekuensial', A: logicScore, fullMark: 100 },
    { subject: 'Akurasi Administrasi', A: accuracyScore, fullMark: 100 },
    { subject: 'Kecepatan Kerja', A: speedScore, fullMark: 100 },
    { subject: 'Konsistensi Fokus', A: consistencyScore, fullMark: 100 },
    { subject: 'Motorik & Penyortiran', A: motoricScore, fullMark: 100 },
  ];

  // Calculate leaderboard statistics dynamically
  const leaderboardData = students.map((s) => {
    const sSessions = sessions.filter(gs => gs.studentId === s.id);
    
    // Logic Quest
    const sLogicSessions = sSessions.filter(gs => gs.gameId === 'game-logic' || gs.gameName.toLowerCase().includes('logic'));
    const maxLogicScore = sLogicSessions.length > 0 ? Math.max(...sLogicSessions.map(gs => gs.score)) : (s.skills.includes('Logika Pemrograman') ? 90 : 75);
    
    // Data Entry
    const sDataEntrySessions = sSessions.filter(gs => gs.gameId === 'game-data-entry' || gs.gameName.toLowerCase().includes('data entry') || gs.gameName.toLowerCase().includes('administrasi'));
    const maxDataEntryScore = sDataEntrySessions.length > 0 ? Math.max(...sDataEntrySessions.map(gs => gs.score)) : (s.skills.includes('Data Entry') ? 85 : 70);
    
    // Package Sorter
    const sPackageSessions = sSessions.filter(gs => gs.gameId === 'game-package' || gs.gameName.toLowerCase().includes('package') || gs.gameName.toLowerCase().includes('sorter') || gs.gameName.toLowerCase().includes('sort') || gs.gameName.toLowerCase().includes('gudang'));
    const maxPackageScore = sPackageSessions.length > 0 ? Math.max(...sPackageSessions.map(gs => gs.score)) : (s.skills.includes('Penyortiran Barang') || s.skills.includes('Perakitan Komponen') ? 80 : 65);
    
    // Industry Validations
    const validationCount = validations.filter(v => v.studentId === s.id).length;
    
    return {
      student: s,
      globalScore: s.readinessScore,
      logicScore: maxLogicScore,
      dataEntryScore: maxDataEntryScore,
      packageScore: maxPackageScore,
      validationCount: validationCount,
      totalGamesPlayed: sSessions.length,
    };
  });

  // Sort based on selected filter
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
    if (leaderboardFilter === 'global') {
      if (b.globalScore !== a.globalScore) return b.globalScore - a.globalScore;
      return b.validationCount - a.validationCount;
    }
    if (leaderboardFilter === 'logic') {
      return b.logicScore - a.logicScore;
    }
    if (leaderboardFilter === 'data-entry') {
      return b.dataEntryScore - a.dataEntryScore;
    }
    if (leaderboardFilter === 'package') {
      return b.packageScore - a.packageScore;
    }
    if (leaderboardFilter === 'validation') {
      if (b.validationCount !== a.validationCount) return b.validationCount - a.validationCount;
      return b.globalScore - a.globalScore;
    }
    return 0;
  });

  // Find logged-in student rank
  const myRank = sortedLeaderboard.findIndex(item => item.student.id === student.id) + 1;
  const myStats = leaderboardData.find(item => item.student.id === student.id);

  const textClass = {
    normal: 'text-sm',
    large: 'text-base',
    xlarge: 'text-lg'
  }[preferences.textSize];

  const headingClass = {
    normal: 'text-2xl sm:text-3xl font-bold font-display tracking-tight',
    large: 'text-3xl sm:text-4xl font-extrabold font-display tracking-tight',
    xlarge: 'text-4xl sm:text-5xl font-black font-display tracking-normal'
  }[preferences.textSize];

  const handleSendChatMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || chatLoading) return;

    const userMsgId = Date.now().toString();
    const newUserMessage = { role: 'user' as const, text: query, id: userMsgId };
    setChatMessages(prev => [...prev, newUserMessage]);
    if (!textToSend) setInputMessage('');
    setChatLoading(true);

    try {
      const studentContext = {
        name: student.name,
        schoolName: student.schoolName,
        supportProfile: student.supportProfile,
        interest: student.interest,
        skills: student.skills,
        readinessScore: student.readinessScore,
        supportRequirements: student.supportRequirements,
        sessions: studentSessions.map(s => ({
          gameName: s.gameName,
          score: s.score,
          accuracy: s.metrics.accuracy,
          speed: s.metrics.completionTime,
          consistency: s.metrics.consistency,
          completedAt: s.date
        }))
      };

      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: query,
          history: chatMessages.map(m => ({ role: m.role, text: m.text })),
          studentContext
        })
      });

      const data = await response.json();
      if (data.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: data.reply, id: Date.now().toString() }]);
      } else {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          text: `Maaf, terjadi kendala saat merumuskan bimbingan: ${data.error || 'Silakan coba kembali.'}`, 
          id: Date.now().toString() 
        }]);
      }
    } catch (error: any) {
      console.error('Error sending chat message:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'Maaf, terjadi gangguan koneksi dengan server Mentor AI. Silakan periksa koneksi Anda dan coba lagi.', 
        id: Date.now().toString() 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Printable layout helper
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF('p', 'mm', 'a4');
    const studentValidations = validations.filter(v => v.studentId === student.id);

    let y = 15;

    // Header band
    doc.setFillColor(79, 70, 229); // Indigo-600
    doc.rect(15, y, 180, 24, 'F');

    // Logo
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('SV', 22, y + 16);

    // Title & Subtitle inside header
    doc.setFontSize(12);
    doc.text('PORTFOLIO DIGITAL VOKASI INKLUSIF', 38, y + 10);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Sistem Transisi Kompetensi Inklusif Nasional - SyncVoca', 38, y + 17);

    y += 32;

    // Profile section
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text('INFORMASI PESERTA / CANDIDATE PROFILE', 15, y);

    doc.setFillColor(245, 247, 250);
    doc.rect(15, y + 3, 180, 38, 'F');

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    
    doc.text('Nama Lengkap', 20, y + 11);
    doc.text('Asal Sekolah', 20, y + 18);
    doc.text('Profil Dukungan ABK', 20, y + 25);
    doc.text('Minat Bidang Vokasi', 20, y + 32);

    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`: ${student.name}`, 55, y + 11);
    doc.text(`: ${student.schoolName}`, 55, y + 18);
    doc.text(`: ${student.supportProfile}`, 55, y + 25);
    doc.text(`: ${student.interest}`, 55, y + 32);

    // Readiness score circular indicator / box in info section
    doc.setFillColor(238, 242, 255);
    doc.rect(142, y + 8, 45, 28, 'F');
    doc.setDrawColor(224, 231, 255);
    doc.rect(142, y + 8, 45, 28, 'S');

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(99, 102, 241);
    doc.text('SKOR KESIAPAN KERJA', 145, y + 14);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129); // Emerald-500
    doc.text(`${student.readinessScore}%`, 145, y + 24);

    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('Sangat Siap Kerja', 145, y + 31);

    y += 48;

    // Bio & Akomodasi
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text('PROFIL RINGKAS & AKOMODASI', 15, y);

    // Bio text
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const bioLines = doc.splitTextToSize(student.bio, 180);
    doc.text(bioLines, 15, y + 5);

    y += 8 + (bioLines.length * 4.5);

    // Akomodasi
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Akomodasi & Dukungan Kerja yang Diperlukan:', 15, y);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    student.supportRequirements.forEach((req, idx) => {
      doc.text(`- ${req}`, 18, y + 5 + (idx * 5));
    });

    y += 10 + (student.supportRequirements.length * 5);

    // Competency
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text('ANALISIS KOMPETENSI KERJA VOKASIONAL', 15, y);

    // Underline
    doc.setDrawColor(241, 245, 249);
    doc.line(15, y + 2, 195, y + 2);

    y += 7;

    const competencies = [
      { label: 'Logika Sekuensial (Simulasi Logic Quest)', score: logicScore, desc: 'Pemecahan masalah terstruktur, penalaran komparatif, dan penanganan instruksi sekuensial.' },
      { label: 'Akurasi Administrasi (Simulasi Data Entry)', score: accuracyScore, desc: 'Ketepatan entri data verbal/numerik, pengecekan kesalahan, dan administrasi perkantoran.' },
      { label: 'Ketangkasan Motorik & Sortir (Simulasi Sorter Paket)', score: motoricScore, desc: 'Keterampilan motorik halus, penyortiran logistik gudang, pelabelan barang, dan efisiensi fisik.' },
      { label: 'Konsistensi Fokus Kerja (Daya Tahan Kognitif)', score: consistencyScore, desc: 'Keberlanjutan tingkat fokus sepanjang sesi pengerjaan tugas berulang.' },
      { label: 'Kecepatan & Ketekunan Kerja', score: speedScore, desc: 'Rasio waktu penyelesaian simulasi terhadap tolok ukur standar kecepatan industri.' }
    ];

    competencies.forEach((comp) => {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text(`${comp.label}`, 15, y);
      
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(`${comp.score}%`, 185, y, { align: 'right' });

      // Progress bar background
      doc.setFillColor(241, 245, 249);
      doc.rect(15, y + 1.5, 170, 2.5, 'F');
      // Progress bar fill
      doc.setFillColor(99, 102, 241);
      doc.rect(15, y + 1.5, (comp.score / 100) * 170, 2.5, 'F');

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text(comp.desc, 15, y + 6.5);

      y += 10.5;
    });

    y += 3;

    // Check if we need to add a page for validations
    if (y > 210) {
      doc.addPage();
      y = 15;
    }

    // Validations
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text('VALIDASI INDUSTRI RESMI / INDUSTRY ENDORSEMENTS', 15, y);

    doc.setDrawColor(241, 245, 249);
    doc.line(15, y + 2, 195, y + 2);

    y += 7;

    if (studentValidations.length === 0) {
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Belum ada sertifikasi validasi industri yang diterbitkan secara resmi.', 15, y);
      y += 12;
    } else {
      studentValidations.forEach((val) => {
        const noteLines = doc.splitTextToSize(`"${val.note}"`, 166);
        const boxHeight = 16 + (noteLines.length * 4.5);

        // check page overflow inside loop
        if (y + boxHeight > 270) {
          doc.addPage();
          y = 15;
        }

        doc.setFillColor(248, 250, 252);
        doc.rect(15, y, 180, boxHeight, 'F');
        doc.setDrawColor(99, 102, 241);
        doc.rect(15, y, 180, boxHeight, 'S');

        // Stamp badge validated
        doc.setFillColor(238, 242, 255);
        doc.rect(158, y + 2, 34, 5, 'F');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(79, 70, 229);
        doc.text('VERIFIED BY SYNCVOCA', 175, y + 5.5, { align: 'center' });

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        doc.text(`${val.companyName}`, 20, y + 6);

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text(`Diterbitkan: ${new Date(val.sealIssuedAt).toLocaleDateString('id-ID')}`, 20, y + 10);

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(79, 70, 229);
        doc.text(`Keterampilan Teruji: ${val.validatedSkills.join(', ')}`, 20, y + 14);

        doc.setFont('Helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text(noteLines, 20, y + 19);

        y += boxHeight + 6;
      });
    }

    // Privacy Guardrail
    if (y > 250) {
      doc.addPage();
      y = 15;
    }

    doc.setFillColor(248, 250, 252);
    doc.rect(15, y, 180, 22, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(15, y, 180, 22, 'S');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Pernyataan Privasi Keluarga & Siswa (Family Privacy Guardrail):', 18, y + 5);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    const privacyText = 'Sesuai dengan kode etik privasi siswa, rekam medis internal, catatan keluarga, dan nomor kontak langsung wali siswa dijaga kerahasiaannya secara ketat dan tidak dipublikasikan secara umum kepada instansi luar tanpa persetujuan khusus keluarga siswa.';
    const privacyLines = doc.splitTextToSize(privacyText, 172);
    doc.text(privacyLines, 18, y + 9);

    // Document Footer stamp
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text('Dokumen ini diterbitkan secara sah dan digital melalui platform SyncVoca.', 105, 287, { align: 'center' });

    // Save
    doc.save(`Portofolio_Vokasi_${student.name.replace(/\s+/g, '_')}.pdf`);
  };

  const isHighContrast = preferences.highContrast;

  return (
    <div className={`space-y-6 ${preferences.dyslexiaFont ? 'font-serif' : 'font-sans'} print:bg-white print:p-0`}>
      
      {/* Floating Demo Notification Toast */}
      {showDemoBanner && (
        <div className="fixed top-6 right-6 z-[9999] max-w-sm w-full p-4 rounded-2xl bg-indigo-950 border border-indigo-500/30 text-white shadow-2xl flex items-start gap-3 animate-bounce">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl shrink-0">
            <Bell className="w-5 h-5 animate-pulse text-indigo-400" />
          </div>
          <div className="space-y-1 text-xs">
            <p className="font-bold text-white flex items-center gap-1.5">
              <span>Notifikasi PWA (Simulasi)</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] font-bold uppercase">Fallback</span>
            </p>
            <p className="text-zinc-300 leading-relaxed font-medium">{demoMessage}</p>
            <p className="text-[9px] text-zinc-500 mt-1">Dapat diuji sebagai notifikasi sistem setelah Anda memberikan izin di tab browser/PWA Anda.</p>
          </div>
          <button 
            onClick={() => setShowDemoBanner(false)}
            className="text-zinc-400 hover:text-white font-bold text-xs shrink-0 px-1 ml-auto cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Info Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden ${
        isHighContrast ? 'bg-white text-black border-4 border-black' : 'bg-[#111] border border-white/5 bento-glow-indigo'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500">
              {isOnline ? 'Siswa Aktif (Online)' : 'Mode Offline Aktif'}
            </span>
            {!isOnline && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[8px] font-bold text-amber-400 uppercase tracking-wide">
                Profil & Simulasi Tersimpan Lokal
              </span>
            )}
          </div>
          <h2 className={`${headingClass} ${isHighContrast ? 'text-black' : 'text-white'}`}>
            Halo, {student.name}!
          </h2>
          <p className={`${textClass} ${isHighContrast ? 'text-neutral-700' : 'text-zinc-400'}`}>
            Ayo latih terus kemampuan kerjamu, kumpulkan skor, dan siapkan resume masa depanmu.
          </p>
        </div>
        
        <div className="flex w-full max-w-full flex-wrap gap-2.5 md:w-auto md:max-w-[44%] md:justify-end">
          <span className={`max-w-full whitespace-normal break-words text-left text-xs font-bold px-3 py-1.5 rounded-xl border ${
            isHighContrast ? 'bg-neutral-200 text-black border-black' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
          }`}>
            {student.supportProfile}
          </span>
          <span className={`max-w-full whitespace-normal text-xs font-bold px-3 py-1.5 rounded-xl border ${
            isHighContrast ? 'bg-black text-white border-black' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            Kesiapan Kerja: {student.readinessScore}%
          </span>
        </div>
      </div>

      {/* Modern Bento Navigation Tabs */}
      <div className={`flex flex-wrap sm:flex-nowrap gap-2 p-1.5 rounded-2xl max-w-2xl print:hidden ${
        isHighContrast ? 'bg-zinc-100 border border-black' : 'bg-[#111] border border-white/5'
      }`}>
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'overview'
              ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
              : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
          }`}
        >
          Ringkasan Saya
        </button>
        <button
          onClick={() => setActiveTab('simulation')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'simulation'
              ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
              : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
          }`}
        >
          Simulasi Kerja
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'portfolio'
              ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
              : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
          }`}
        >
          Portofolio Kerja
        </button>
        <button
          onClick={() => setActiveTab('mentor')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'mentor'
              ? (isHighContrast ? 'bg-black text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg')
              : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Mentor Karir AI
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'leaderboard'
              ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white')
              : (isHighContrast ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:text-white')
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          Peringkat Kompetensi
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
                  {/* Left Large Bento Card - Competency Radar & Bar Graphs */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl space-y-6 ${
              isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5 bento-glow-emerald'
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h3 className={`font-bold text-lg font-display flex items-center gap-2 ${isHighContrast ? 'text-black' : 'text-white'}`}>
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    Analisis Kesiapan Kerja Vokasional
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Pemetaan multi-dimensi kompetensi kerja berdasarkan simulasi waktu nyata.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                
                {/* Radar Chart Panel - Left (3/5 width on desktop) */}
                <div className="lg:col-span-3 h-[300px] w-full flex items-center justify-center relative sm:h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="58%"
                      data={competencyData}
                      margin={{ top: 24, right: 36, bottom: 24, left: 36 }}
                    >
                      <PolarGrid stroke={isHighContrast ? "#000000" : "#cfe1d2"} />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ 
                            fill: isHighContrast ? "#000000" : "#61746a", 
                          fontSize: 9,
                          fontWeight: 600
                        }} 
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: isHighContrast ? "#000000" : "#61746a", fontSize: 9 }}
                      />
                      <Radar
                        name={student.name}
                        dataKey="A"
                        stroke={isHighContrast ? "#000000" : "#12843a"}
                        fill={isHighContrast ? "rgba(0,0,0,0.2)" : "rgba(19, 138, 61, 0.18)"}
                        fillOpacity={0.6}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isHighContrast ? '#ffffff' : '#ffffff',
                          borderColor: isHighContrast ? '#000000' : '#dbe7dd',
                          color: isHighContrast ? '#000000' : '#17351f',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Progress Indicators - Right (2/5 width on desktop) */}
                <div className="lg:col-span-2 space-y-4">
                  
                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className={isHighContrast ? 'text-black' : 'text-zinc-400'}>Logika Sekuensial</span>
                      <span className={isHighContrast ? 'text-black' : 'text-indigo-400'}>
                        {logicScore}% ({logicScore >= 90 ? 'Sangat Baik' : logicScore >= 80 ? 'Baik' : 'Cukup'})
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isHighContrast ? 'bg-zinc-200' : 'bg-zinc-950/50 border border-white/5'}`}>
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${logicScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className={isHighContrast ? 'text-black' : 'text-zinc-400'}>Akurasi Administrasi</span>
                      <span className={isHighContrast ? 'text-black' : 'text-emerald-400'}>
                        {accuracyScore}% ({accuracyScore >= 90 ? 'Sangat Baik' : accuracyScore >= 80 ? 'Baik' : 'Cukup'})
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isHighContrast ? 'bg-zinc-200' : 'bg-zinc-950/50 border border-white/5'}`}>
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${accuracyScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className={isHighContrast ? 'text-black' : 'text-zinc-400'}>Ketangkasan Motorik</span>
                      <span className={isHighContrast ? 'text-black' : 'text-amber-400'}>
                        {motoricScore}% ({motoricScore >= 90 ? 'Sangat Baik' : motoricScore >= 80 ? 'Baik' : 'Cukup'})
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isHighContrast ? 'bg-zinc-200' : 'bg-zinc-950/50 border border-white/5'}`}>
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${motoricScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className={isHighContrast ? 'text-black' : 'text-zinc-400'}>Konsistensi Kerja</span>
                      <span className={isHighContrast ? 'text-black' : 'text-cyan-400'}>
                        {consistencyScore}% ({consistencyScore >= 90 ? 'Sangat Konsisten' : consistencyScore >= 80 ? 'Konsisten' : 'Cukup'})
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isHighContrast ? 'bg-zinc-200' : 'bg-zinc-950/50 border border-white/5'}`}>
                      <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${consistencyScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className={isHighContrast ? 'text-black' : 'text-zinc-400'}>Kecepatan & Ketekunan</span>
                      <span className={isHighContrast ? 'text-black' : 'text-rose-400'}>
                        {speedScore}% ({speedScore >= 90 ? 'Sangat Baik' : speedScore >= 80 ? 'Baik' : 'Cukup'})
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isHighContrast ? 'bg-zinc-200' : 'bg-zinc-950/50 border border-white/5'}`}>
                      <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: `${speedScore}%` }} />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Recent activities section */}
            <div className={`p-6 rounded-3xl space-y-4 ${
              isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className={`font-bold font-display text-sm ${isHighContrast ? 'text-black' : 'text-white'}`}>Riwayat Latihan & Skor Sesi</h3>
                <span className="text-[10px] text-zinc-500">REALTIME SYNC</span>
              </div>
              
              {studentSessions.length === 0 ? (
                <div className="text-center py-6">
                  <Gamepad2 className="mx-auto h-9 w-9 text-[#12843a]" />
                  <p className="text-xs text-zinc-500 mt-2">Belum ada aktivitas. Silakan coba menu Simulasi Kerja!</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {studentSessions.map((session, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl border transition ${
                      isHighContrast ? 'bg-zinc-100 border-black' : 'bg-[#161616] border-white/5 hover:border-white/10'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${
                          isHighContrast ? 'bg-black text-white' : 'bg-indigo-500/10 text-indigo-400'
                        }`}>
                          <Gamepad2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`font-bold text-xs ${isHighContrast ? 'text-black' : 'text-zinc-200'}`}>{session.gameName}</p>
                          <p className="text-[10px] text-zinc-500">{new Date(session.date).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-mono font-bold text-xs ${isHighContrast ? 'text-black' : 'text-indigo-400'}`}>{session.score} Poin</span>
                        <p className="text-[10px] text-zinc-500">Akurasi {session.metrics.accuracy}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Bento Grid - Badges & Quick Action */}
          <div className="col-span-1 space-y-6">
            
            {/* Lencana Vokasi */}
            <div className={`p-6 rounded-3xl space-y-4 ${
              isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5'
            }`}>
              <h3 className={`font-bold font-display text-sm flex items-center gap-1.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                Lencana Vokasi Saya
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className={`p-3 rounded-xl border flex flex-col items-center ${
                  isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-indigo-500/10 border-indigo-500/10 text-indigo-300'
                }`}>
                  <Clock className="h-6 w-6" />
                  <span className="text-[10px] font-bold mt-1 block">Fokus Tinggi</span>
                </div>
                <div className={`p-3 rounded-xl border flex flex-col items-center ${
                  isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-emerald-500/10 border-emerald-500/10 text-emerald-300'
                }`}>
                  <Keyboard className="h-6 w-6" />
                  <span className="text-[10px] font-bold mt-1 block">Ketik Akurat</span>
                </div>
                <div className={`p-3 rounded-xl border flex flex-col items-center ${
                  isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-amber-500/10 border-amber-500/10 text-amber-300'
                }`}>
                  <Package className="h-6 w-6" />
                  <span className="text-[10px] font-bold mt-1 block">Ahli Gudang</span>
                </div>
                <div className={`p-3 rounded-xl border flex flex-col items-center ${
                  isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-rose-500/10 border-rose-500/10 text-rose-300'
                }`}>
                  <Heart className="h-6 w-6" />
                  <span className="text-[10px] font-bold mt-1 block">Disiplin Kerja</span>
                </div>
              </div>
            </div>

            {/* Recommendation Quick CTA */}
            <div className={`p-6 rounded-3xl space-y-4 relative overflow-hidden ${
              isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-indigo-600 text-white bento-glow-indigo'
            }`}>
              <div className={`absolute right-2 top-2 text-[9px] uppercase font-bold px-3 py-1 rotate-6 ${
                isHighContrast ? 'bg-black text-white' : 'bg-black/20 text-indigo-100'
              }`}>
                Recom
              </div>
              <h3 className="font-bold font-display text-sm">Butuh Peningkatan Skor?</h3>
              <p className={`text-xs leading-relaxed ${isHighContrast ? 'text-neutral-700' : 'text-indigo-100'}`}>
                Skor akurasi input data atau ketangkasan sortir paket Anda sangat berpengaruh ke rating asisten vokasi di mata Mitra Industri. Terus asah logika Anda!
              </p>
              <button
                onClick={() => setActiveTab('simulation')}
                className={`w-full py-2.5 text-xs font-bold rounded-xl transition ${
                  isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg'
                }`}
              >
                Ulangi Simulasi Kerja
              </button>
            </div>

            {/* PWA Push Notification Reminders Card */}
            <div className={`p-6 rounded-3xl space-y-4 ${
              isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className={`font-bold font-display text-sm flex items-center gap-1.5 ${isHighContrast ? 'text-black' : 'text-white'}`}>
                  <Bell className="w-4 h-4 text-indigo-400" />
                  Pengingat Karier PWA
                </h3>
                <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                  isSWRegistered 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {isSWRegistered ? 'PWA Aktif' : 'PWA Standby'}
                </span>
              </div>

              <p className="text-[11px] leading-relaxed text-zinc-400">
                Aktifkan sistem notifikasi untuk menerima pengingat harian melatih simulasi karier serta status validasi mitra industri (DUDI) Anda.
              </p>

              {/* Notification Permission Indicator and Setup button */}
              <div className={`p-3 rounded-2xl flex items-center justify-between gap-3 text-xs ${
                isHighContrast ? 'bg-zinc-100 border border-zinc-200' : 'bg-zinc-950/50 border border-white/5'
              }`}>
                <div className="space-y-0.5">
                  <span className="text-zinc-500 block text-[10px]">Status Izin Notifikasi</span>
                  <span className={`font-bold flex items-center gap-1 ${
                    notificationPermission === 'granted' 
                      ? 'text-emerald-400' 
                      : notificationPermission === 'denied' 
                        ? 'text-rose-400' 
                        : 'text-amber-400'
                  }`}>
                    {notificationPermission === 'granted' 
                      ? 'Diizinkan' 
                      : notificationPermission === 'denied' 
                        ? 'Ditolak / Blokir' 
                        : 'Belum Diatur'}
                  </span>
                </div>
                {notificationPermission !== 'granted' && (
                  <button
                    onClick={requestNotificationPermission}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] transition cursor-pointer shrink-0"
                  >
                    Izinkan Notifikasi
                  </button>
                )}
              </div>

              {/* Demo Reminders Simulator */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Uji Coba Pengingat Sistem</span>
                
                <button
                  disabled={isScheduling !== null}
                  onClick={() => schedulePWAReminder('simulation')}
                  className={`w-full py-2 px-3 text-left rounded-xl transition text-[11px] font-bold flex items-center justify-between cursor-pointer ${
                    isHighContrast 
                      ? 'bg-zinc-100 text-black hover:bg-zinc-200 border border-zinc-300' 
                      : 'bg-zinc-900/60 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Pengingat Simulasi (Delay 4s)</span>
                  </span>
                  {isScheduling === 'simulation' ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 opacity-55" />
                  )}
                </button>

                <button
                  disabled={isScheduling !== null}
                  onClick={() => schedulePWAReminder('validation')}
                  className={`w-full py-2 px-3 text-left rounded-xl transition text-[11px] font-bold flex items-center justify-between cursor-pointer ${
                    isHighContrast 
                      ? 'bg-zinc-100 text-black hover:bg-zinc-200 border border-zinc-300' 
                      : 'bg-zinc-900/60 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pengingat Validasi (Delay 4s)</span>
                  </span>
                  {isScheduling === 'validation' ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 opacity-55" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'simulation' && (
        <div className="print:hidden">
          <Games 
            studentId={student.id} 
            studentName={student.name} 
            onGameComplete={onGameComplete} 
            preferences={preferences} 
          />
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className={`rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl print:shadow-none print:border-none print:p-0 relative ${
          isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5 text-white'
        }`}>
          {/* Print & Download Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className={`flex items-center gap-1.5 px-3.5 py-2 font-bold rounded-xl text-xs transition bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10`}
            >
              <FileText className="w-4 h-4" />
              Unduh PDF Resmi
            </button>
            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3.5 py-2 font-bold rounded-xl text-xs transition ${
                isHighContrast ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-zinc-200 shadow'
              }`}
            >
              <Printer className="w-4 h-4" />
              Cetak
            </button>
          </div>

          {/* Portfolio Header */}
          <div className="text-center space-y-3 pb-6 border-b border-white/5 print:border-neutral-300">
            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl print:bg-slate-100 print:text-black ${
              isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white'
            }`}>
              SV
            </div>
            <h1 className={`text-2xl font-bold font-display tracking-tight uppercase ${isHighContrast ? 'text-black' : 'text-white'}`}>
              Portofolio Kerja Vokasi Digital
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Sistem Transisi Kompetensi Inklusif Nasional</p>
          </div>

          {/* Student details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm py-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-500 block uppercase font-mono tracking-wider">Informasi Pelamar</span>
              <div className="grid grid-cols-3 gap-y-2.5 text-xs">
                <span className="text-zinc-500 col-span-1">Nama</span>
                <span className={`font-bold col-span-2 ${isHighContrast ? 'text-black' : 'text-zinc-100'}`}>: {student.name}</span>

                <span className="text-zinc-500 col-span-1">Asal Sekolah</span>
                <span className={`font-bold col-span-2 ${isHighContrast ? 'text-black' : 'text-zinc-100'}`}>: {student.schoolName}</span>

                <span className="text-zinc-500 col-span-1">Minat Vokasi</span>
                <span className={`font-bold col-span-2 ${isHighContrast ? 'text-black' : 'text-zinc-100'}`}>: {student.interest}</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-500 block uppercase font-mono tracking-wider">Akomodasi & Dukungan</span>
              <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs font-medium print:text-neutral-700">
                {student.supportRequirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-white/5 print:border-neutral-300" />

          {/* Bio and Skills */}
          <div className="space-y-4 text-sm py-6">
            <div>
              <span className="text-xs font-bold text-zinc-500 block uppercase font-mono tracking-wider mb-2">Profil Ringkat</span>
              <p className={`text-xs leading-relaxed ${isHighContrast ? 'text-neutral-800' : 'text-zinc-300'}`}>{student.bio}</p>
            </div>

            <div>
              <span className="text-xs font-bold text-zinc-500 block uppercase font-mono tracking-wider mb-2">Keterampilan Teruji</span>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                    isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-white/5 border-white/5 text-zinc-300'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-white/5 print:border-neutral-300" />

          {/* Competency indicators based on games */}
          <div className="space-y-4 py-6">
            <span className="text-xs font-bold text-zinc-500 block uppercase font-mono tracking-wider">Skor Kompetensi Teruji (Hasil Latihan)</span>
            {studentSessions.length === 0 ? (
              <p className="text-xs text-zinc-500 py-2">Belum ada skor simulasi terekam.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentSessions.slice(0, 4).map((session, i) => (
                  <div key={i} className={`p-4 rounded-2xl flex justify-between items-center text-xs border ${
                    isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-300'
                  }`}>
                    <div>
                      <p className={`font-bold ${isHighContrast ? 'text-black' : 'text-white'}`}>{session.gameName}</p>
                      <p className="text-[10px] text-zinc-500 mt-1">Akurasi {session.metrics.accuracy}% | Konsistensi {session.metrics.consistency}%</p>
                    </div>
                    <span className={`font-mono font-bold text-sm ${isHighContrast ? 'text-black' : 'text-indigo-400'}`}>{session.score} Pts</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="border-white/5 print:border-neutral-300" />

          {/* Validation Seal and Guardrails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-6">
            
            {validations.filter(v => v.studentId === student.id).length === 0 ? (
              <div className={`p-5 rounded-2xl border ${
                isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-400'
              }`}>
                <h4 className="font-bold flex items-center gap-1 mb-2 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Belum Ada Sertifikat Industri
                </h4>
                <p className="text-[11px] leading-relaxed text-zinc-500">
                  Siswa ini sedang mengumpulkan rekam jejak simulasi kognitif dan vokasi. Sertifikat Validasi Industri akan otomatis terbit saat mitra industri meninjau hasil evaluasi kerja obyektif siswa.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {validations.filter(v => v.studentId === student.id).map((val) => (
                  <div key={val.id} className={`p-5 rounded-2xl border relative overflow-hidden ${
                    isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                  }`}>
                    <span className={`absolute right-2 top-2 text-[8px] uppercase font-bold px-3 py-0.5 rotate-6 ${
                      isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white'
                    }`}>
                      VALIDATED
                    </span>
                    <h4 className="font-bold flex items-center gap-1.5 mb-1.5 text-xs">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      Validasi Industri - {val.companyName}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-zinc-400 print:text-neutral-700">
                      Disahkan pada {new Date(val.sealIssuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}. 
                      Keterampilan teruji: <strong className="text-indigo-400">{val.validatedSkills.join(', ')}</strong>.
                    </p>
                    <p className="text-[10px] italic text-zinc-500 mt-2">
                      "{val.note}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy Guardrails Statement */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? 'bg-zinc-100 border-black text-black' : 'bg-[#161616] border-white/5 text-zinc-400'
            }`}>
              <h4 className={`font-bold flex items-center gap-1 mb-2 text-xs ${isHighContrast ? 'text-black' : 'text-zinc-200'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Pernyataan Privasi Keluarga
              </h4>
              <p className="text-[10px] leading-relaxed text-zinc-500 print:text-neutral-500">
                Sesuai dengan kode etik privasi siswa, rekam medis internal, catatan keluarga, dan nomor kontak langsung wali siswa dijaga kerahasiaannya dan tidak dipublikasikan secara umum kepada instansi luar tanpa persetujuan khusus.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mentor' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:hidden">
          {/* Left Panel: Student Career Insight Summary */}
          <div className="col-span-1 space-y-6">
            <div className={`p-6 rounded-3xl ${
              isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5 bento-glow-indigo'
            }`}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" />
                Fokus Karir Anda
              </h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-500 block mb-1">Bidang Minat:</span>
                  <span className="font-semibold text-indigo-400">{student.interest}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Kemampuan Terlatih:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {student.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Dukungan / Akomodasi:</span>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-400 text-[11px]">
                    {student.supportRequirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Kesiapan Kerja saat ini:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${student.readinessScore}%` }} />
                    </div>
                    <span className="font-bold text-emerald-400">{student.readinessScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl ${
              isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5'
            }`}>
              <h4 className="font-bold text-xs mb-2 flex items-center gap-1.5 text-indigo-400">
                <Bot className="w-4 h-4" />
                Tentang Mentor AI
              </h4>
              <p className="text-[11px] leading-relaxed text-zinc-400">
                Mentor AI menggunakan teknologi kecerdasan buatan Gemini untuk memberikan panduan karir vokasi yang disesuaikan secara pribadi dengan potensi, Profil Dukungan ABK, dan hasil simulasi kerja Anda.
              </p>
            </div>
          </div>

          {/* Right Panel: Chat Interface */}
          <div className="col-span-1 lg:col-span-3 flex flex-col h-[560px]">
            <div className={`flex flex-col flex-1 rounded-3xl overflow-hidden border ${
              isHighContrast ? 'bg-white border-black' : 'bg-[#111] border-white/5'
            }`}>
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-indigo-950/40 to-purple-950/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">Mentor Karir Vokasi</h3>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Aktif memberikan bimbingan
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-indigo-400" />
                      </div>
                    )}
                    <div className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? (isHighContrast ? 'bg-black text-white' : 'bg-indigo-600 text-white rounded-tr-none')
                        : (isHighContrast ? 'bg-zinc-100 text-black border border-zinc-200' : 'bg-zinc-900 text-zinc-200 border border-white/5 rounded-tl-none')
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-indigo-400 animate-pulse" />
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tl-none bg-zinc-900 border border-white/5 text-zinc-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[10px]">Mentor sedang mengetik...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Questions Bubble */}
              <div className="p-3 bg-zinc-950/20 border-t border-white/5">
                <span className="text-[10px] text-zinc-500 block mb-2 px-1">Pertanyaan yang disarankan:</span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChatMessage(q)}
                      disabled={chatLoading}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition text-left cursor-pointer disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3.5 border-t border-white/5 bg-zinc-950/40">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChatMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Tanyakan mengenai simulasi, tips wawancara, karir..."
                    disabled={chatLoading}
                    className="flex-1 bg-zinc-900 border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !inputMessage.trim()}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition flex items-center justify-center shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6 print:hidden">
          {/* Top Hero / Motivation Banner */}
          <div className={`p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-zinc-950/40 border border-white/5 bento-glow-indigo'
          }`}>
            <div className="space-y-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                isHighContrast ? 'bg-black text-white' : 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/20'
              }`}>
                Pusat Kompetensi SyncVoca
              </span>
              <h3 className="font-extrabold text-lg sm:text-xl font-display tracking-tight text-white">
                Klasemen Keterampilan & Validasi Industri
              </h3>
              <p className="text-xs text-zinc-400 max-w-xl">
                Latih diri Anda secara obyektif melalui simulasi kognitif dan vokasional. Hubungkan bakat unik Anda dengan pengakuan langsung dari Dunia Usaha & Industri (DUDI).
              </p>
            </div>

            {/* Personalized Rank Indicator Card */}
            <div className={`p-5 rounded-2xl shrink-0 min-w-[240px] flex items-center gap-4 ${
              isHighContrast ? 'bg-zinc-100 border-2 border-black' : 'bg-zinc-900/90 border border-white/5'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-xs">
                <div className="text-zinc-500 font-medium">Peringkat Anda</div>
                <div className="font-black text-lg text-indigo-400"># {myRank} dari {students.length} Siswa</div>
                <div className="text-[10px] text-zinc-400 mt-0.5 font-medium">
                  {myRank === 1 
                    ? 'Luar biasa! Anda memimpin klasemen! 🥇' 
                    : 'Ayo tingkatkan akurasi untuk naik peringkat! ⚡'}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Categories Sub-navigation */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'global', label: 'Global (Kesiapan Kerja)', icon: Award, desc: 'Peringkat gabungan skor kognitif, motorik, dan seal validasi industri' },
              { id: 'logic', label: 'Logic Quest (Logika)', icon: Key, desc: 'Skor tertinggi simulasi kognitif penyusunan urutan instruksi' },
              { id: 'data-entry', label: 'Data Entry (Administrasi)', icon: Keyboard, desc: 'Skor tertinggi simulasi administrasi & akurasi ketikan data' },
              { id: 'package', label: 'Package Sorter (Logistik)', icon: Package, desc: 'Skor tertinggi simulasi ketangkasan motorik halus dan sortir barang' },
              { id: 'validation', label: 'Seal Validasi Industri', icon: Sparkles, desc: 'Jumlah sertifikasi resmi yang disetujui langsung oleh Mitra DUDI' }
            ].map((f) => {
              const Icon = f.icon;
              const isActive = leaderboardFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setLeaderboardFilter(f.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                    isActive
                      ? (isHighContrast ? 'bg-black text-white border-2 border-black' : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10')
                      : (isHighContrast ? 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200' : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800')
                  }`}
                  title={f.desc}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Leaderboard Rankings List */}
            <div className="col-span-1 lg:col-span-3 space-y-4">
              <div className={`rounded-3xl border overflow-hidden ${
                isHighContrast ? 'bg-white border-black' : 'bg-[#111] border-white/5'
              }`}>
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-3 p-4 bg-zinc-950/40 text-[10px] uppercase font-bold text-zinc-500 tracking-wider border-b border-white/5">
                  <div className="col-span-2 sm:col-span-1 text-center">Peringkat</div>
                  <div className="col-span-6 sm:col-span-5">Siswa & Detail</div>
                  <div className="col-span-4 sm:col-span-3 text-right">Skor / Capaian</div>
                  <div className="hidden sm:block col-span-3 text-center">Sertifikasi Dudi</div>
                </div>

                {/* List Rows */}
                <div className="divide-y divide-white/5">
                  {sortedLeaderboard.map((item, index) => {
                    const isMe = item.student.id === student.id;
                    const rank = index + 1;
                    
                    // Choose score based on filter
                    let activeScore = 0;
                    let suffix = '%';
                    if (leaderboardFilter === 'global') activeScore = item.globalScore;
                    else if (leaderboardFilter === 'logic') activeScore = item.logicScore;
                    else if (leaderboardFilter === 'data-entry') activeScore = item.dataEntryScore;
                    else if (leaderboardFilter === 'package') activeScore = item.packageScore;
                    else if (leaderboardFilter === 'validation') {
                      activeScore = item.validationCount;
                      suffix = ' Seal';
                    }

                    return (
                      <div 
                        key={item.student.id} 
                        className={`grid grid-cols-12 gap-3 p-4 sm:p-5 items-center transition ${
                          isMe 
                            ? (isHighContrast ? 'bg-zinc-100 font-bold border-l-4 border-black' : 'bg-indigo-600/5 border-l-4 border-indigo-500') 
                            : 'hover:bg-zinc-950/20'
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className="col-span-2 sm:col-span-1 flex justify-center">
                          {rank === 1 ? (
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                              <Trophy className="w-4 h-4 text-amber-400" />
                            </div>
                          ) : rank === 2 ? (
                            <div className="w-8 h-8 rounded-full bg-zinc-300/10 border border-zinc-300/20 flex items-center justify-center">
                              <Medal className="w-4 h-4 text-zinc-300" />
                            </div>
                          ) : rank === 3 ? (
                            <div className="w-8 h-8 rounded-full bg-amber-700/10 border border-amber-700/20 flex items-center justify-center">
                              <Medal className="w-4 h-4 text-amber-600" />
                            </div>
                          ) : (
                            <span className="font-mono text-zinc-500 text-xs font-bold">{rank}</span>
                          )}
                        </div>

                        {/* Student Info */}
                        <div className="col-span-6 sm:col-span-5 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`font-semibold text-xs ${isMe ? 'text-indigo-400' : 'text-white'}`}>
                              {item.student.name}
                            </span>
                            {isMe && (
                              <span className="text-[8px] bg-indigo-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase">
                                Anda
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            {item.student.schoolName}
                          </div>
                          {/* Disability Type Tag */}
                          <div className="pt-0.5">
                            <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px] text-zinc-400">
                              {item.student.supportProfile.split('(')[0].trim()}
                            </span>
                          </div>
                        </div>

                        {/* Score Indicator */}
                        <div className="col-span-4 sm:col-span-3 text-right space-y-1.5">
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="font-mono font-bold text-xs text-white">
                              {activeScore}{suffix}
                            </span>
                          </div>
                          
                          {/* Little progress bar representing progress */}
                          {leaderboardFilter !== 'validation' && (
                            <div className="w-full bg-zinc-900 rounded-full h-1 max-w-[120px] ml-auto overflow-hidden">
                              <div 
                                className="bg-indigo-500 h-1 rounded-full transition-all duration-500" 
                                style={{ width: `${activeScore}%` }}
                              />
                            </div>
                          )}
                          <div className="text-[9px] text-zinc-500">
                            {item.totalGamesPlayed} Simulasi Selesai
                          </div>
                        </div>

                        {/* Dudi Seals */}
                        <div className="hidden sm:block col-span-3 text-center">
                          {item.validationCount === 0 ? (
                            <span className="text-[10px] text-zinc-600">Belum ada</span>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-1">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                                <Sparkles className="w-2.5 h-2.5" />
                                {item.validationCount} Seal Aktif
                              </span>
                              <span className="text-[8px] text-zinc-500">
                                {validations.find(v => v.studentId === item.student.id)?.companyName.split(' ').slice(1).join(' ') || ''}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Guidelines & Promotion Information */}
            <div className="col-span-1 space-y-6">
              <div className={`p-6 rounded-3xl space-y-4 ${
                isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5'
              }`}>
                <h4 className="font-bold text-xs flex items-center gap-1.5 text-indigo-400">
                  <Award className="w-4 h-4" />
                  Misi Naik Peringkat
                </h4>
                
                <p className="text-[11px] leading-relaxed text-zinc-400">
                  Peringkat dihitung secara obyektif berdasarkan tingkat kesiapan kerja vokasional Anda. Inilah 3 cara utama meningkatkan poin:
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-md bg-zinc-800 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0">1</div>
                    <div>
                      <h5 className="font-semibold text-zinc-300 text-[11px]">Tingkatkan Akurasi Game</h5>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">Selesaikan simulasi dengan akurasi &gt;90%. Akurasi tinggi membuktikan ketelitian Anda pada industri.</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-md bg-zinc-800 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0">2</div>
                    <div>
                      <h5 className="font-semibold text-zinc-300 text-[11px]">Dapatkan Seal Validasi</h5>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">Bila hasil kerja dinilai luar biasa, Mitra DUDI akan menerbitkan Seal Validasi Resmi. Setiap Seal memberikan <strong className="text-emerald-400">+5 poin kesiapan kerja</strong>.</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-md bg-zinc-800 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0">3</div>
                    <div>
                      <h5 className="font-semibold text-zinc-300 text-[11px]">Konsistensi Harian</h5>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">Hindari kesalahan berturut-turut pada simulasi berulang demi menjaga skor kestabilan fokus.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('simulation')}
                    className="w-full py-2 px-3 text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[11px] transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    Mulai Simulasi Baru
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-3xl ${
                isHighContrast ? 'bg-white border-4 border-black text-black' : 'bg-[#111] border border-white/5'
              }`}>
                <h4 className="font-bold text-xs mb-2 flex items-center gap-1.5 text-yellow-400">
                  <Trophy className="w-4 h-4" />
                  Mengapa Bersaing?
                </h4>
                <p className="text-[11px] leading-relaxed text-zinc-400">
                  Persaingan sehat di SyncVoca memotivasi seluruh siswa berkebutuhan khusus untuk membuktikan kemampuan mereka. Perusahaan mitra (DUDI) memantau klasemen ini secara berkala untuk mencari kandidat terbaik untuk program kerja inklusif & magang.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
