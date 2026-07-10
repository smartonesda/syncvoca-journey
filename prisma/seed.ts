/**
 * Script untuk mengisi database SQLite dengan data dummy untuk pengujian.
 * Terdiri dari pengguna dengan peran STUDENT, TEACHER, dan DUDI.
 * Termasuk data kaya untuk Simulasi (Game Session), Journey, dan Portofolio.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding database...');

  // Hash password standar untuk semua akun dummy
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Akun Siswa (STUDENT)
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: hashedPassword,
      name: 'Budi Santoso',
      role: 'STUDENT',
      studentProfile: {
        create: {
          pseudonymCode: 'ABK-01-XYZ',
          schoolType: 'SLB Negeri',
          readinessScore: 85,
          vocationalInterest: 'Desain Grafis',
          accommodationNeeds: 'Instruksi visual, waktu istirahat fleksibel',
        },
      },
    },
  });

  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: studentUser.id }
  });

  if (studentProfile) {
    // Bersihkan data relasi siswa untuk mencegah duplikasi jika di-run berkali-kali (upsert gracefulness)
    await prisma.gameSession.deleteMany({ where: { studentProfileId: studentProfile.id } });
    await prisma.journeyMilestone.deleteMany({ where: { studentProfileId: studentProfile.id } });
    await prisma.studentPortfolio.deleteMany({ where: { studentProfileId: studentProfile.id } });

    // Seeding Portofolio
    await prisma.studentPortfolio.create({
      data: {
        studentProfileId: studentProfile.id,
        summary: 'Budi menunjukkan ketelitian tinggi pada tugas visual spasial dan beradaptasi baik dengan instruksi terstruktur.',
        competencyLogika: 85,
        competencyKetelitian: 92,
        competencyKonsistensi: 88,
        competencyMotorik: 75,
      }
    });

    // Seeding Journey Milestone
    const milestones = [
      { name: 'Intake Dukungan', status: 'completed', date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      { name: 'Simulasi Kerja', status: 'completed', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
      { name: 'Rencana Pendampingan', status: 'completed', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
      { name: 'Portofolio Bukti', status: 'in_progress', date: new Date() },
      { name: 'Validasi DUDI', status: 'pending', date: null }
    ];

    for (const ms of milestones) {
      await prisma.journeyMilestone.create({
        data: {
          studentProfileId: studentProfile.id,
          milestoneName: ms.name,
          status: ms.status,
          completedAt: ms.date,
          notes: ms.status === 'completed' ? 'Tahap ini telah diselesaikan dengan baik.' : 'Tahap sedang berjalan atau menunggu.'
        }
      });
    }

    // Seeding Game Session (18 baris untuk variasi ekstensif)
    const games = [
      { id: 'g1', name: 'Logic Quest' },
      { id: 'g2', name: 'Data Entry' },
      { id: 'g3', name: 'Package Sorter' }
    ];

    const gameSessions = [];
    for (let i = 0; i < 18; i++) {
      const game = games[i % games.length];
      const accuracy = Math.floor(Math.random() * (100 - 70 + 1)) + 70; // 70-100
      const completionTime = Math.floor(Math.random() * (300 - 60 + 1)) + 60; // 60s to 300s
      const errorCount = Math.floor(Math.random() * 5); // 0 to 4 errors
      const consistency = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // 60-100
      
      const playedAt = new Date(Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)); // random dalam 14 hari terakhir

      gameSessions.push({
        studentProfileId: studentProfile.id,
        gameId: game.id,
        gameName: game.name,
        score: accuracy * 10,
        accuracy: accuracy,
        completionTime: completionTime,
        errorCount: errorCount,
        consistency: consistency,
        playedAt: playedAt
      });
    }

    await prisma.gameSession.createMany({
      data: gameSessions
    });
  }

  // 2. Akun Guru (TEACHER)
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      password: hashedPassword,
      name: 'Ibu Rina',
      role: 'TEACHER',
    },
  });

  // 3. Akun Mitra Industri (DUDI)
  const dudiUser = await prisma.user.upsert({
    where: { email: 'dudi@example.com' },
    update: {},
    create: {
      email: 'dudi@example.com',
      password: hashedPassword,
      name: 'HRD Tech Company',
      role: 'DUDI',
      dudiProfile: {
        create: {
          companyName: 'PT Teknologi Inklusi',
          industry: 'IT & Software',
        },
      },
    },
  });

  console.log('Seeding selesai dengan data yang kaya (Simulasi, Journey, Portofolio)!');
  console.log('Akun yang berhasil dibuat:');
  console.log(`- Siswa: ${studentUser.email} / password123`);
  console.log(`- Guru: ${teacherUser.email} / password123`);
  console.log(`- DUDI: ${dudiUser.email} / password123`);
}

main()
  .catch((e) => {
    console.error('Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
