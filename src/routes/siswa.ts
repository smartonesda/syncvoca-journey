import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const siswaRouter = Router();

/**
 * Endpoint POST /api/siswa/simulasi
 * Menerima dan menyimpan hasil permainan/simulasi kerja siswa.
 * Dilindungi oleh authenticateJWT. userId diambil langsung dari payload token.
 */
siswaRouter.post('/simulasi', authenticateJWT, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Konteks pengguna tidak ditemukan' });
    }

    const { gameId, gameName, score, accuracy, completionTime, errorCount, consistency } = req.body;

    if (!gameId || !gameName || score === undefined) {
      return res.status(400).json({ error: 'Data simulasi tidak lengkap' });
    }

    // Cari profil siswa berdasarkan userId dari token
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.userId }
    });

    if (!studentProfile) {
      return res.status(404).json({ error: 'Profil siswa tidak ditemukan' });
    }

    // Simpan sesi permainan
    const session = await prisma.gameSession.create({
      data: {
        studentProfileId: studentProfile.id,
        gameId,
        gameName,
        score,
        accuracy: accuracy || 0,
        completionTime: completionTime || 0,
        errorCount: errorCount || 0,
        consistency: consistency || 0
      }
    });

    res.status(201).json({ message: 'Sesi simulasi berhasil disimpan', data: session });
  } catch (error) {
    console.error('Kesalahan pada endpoint simulasi:', error);
    res.status(500).json({ error: 'Terjadi kesalahan internal server' });
  }
});

/**
 * Endpoint GET /api/siswa/portofolio
 * Mengambil data portofolio siswa beserta rekam jejak sesi simulasi (maksimal 10 terakhir).
 */
siswaRouter.get('/portofolio', authenticateJWT, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Konteks pengguna tidak ditemukan' });
    }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.userId },
      include: {
        portfolio: true,
        gameSessions: {
          orderBy: { playedAt: 'desc' },
          take: 10
        }
      }
    });

    if (!studentProfile) {
      return res.status(404).json({ error: 'Profil siswa tidak ditemukan' });
    }

    res.json({ data: studentProfile });
  } catch (error) {
    console.error('Kesalahan pada endpoint portofolio:', error);
    res.status(500).json({ error: 'Terjadi kesalahan internal server' });
  }
});

/**
 * Endpoint GET /api/siswa/journey
 * Mengambil data log status milestone siswa.
 */
siswaRouter.get('/journey', authenticateJWT, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Konteks pengguna tidak ditemukan' });
    }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.userId },
      include: {
        milestones: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!studentProfile) {
      return res.status(404).json({ error: 'Profil siswa tidak ditemukan' });
    }

    res.json({ data: studentProfile.milestones });
  } catch (error) {
    console.error('Kesalahan pada endpoint journey:', error);
    res.status(500).json({ error: 'Terjadi kesalahan internal server' });
  }
});
