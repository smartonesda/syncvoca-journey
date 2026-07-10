import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const authRouter = Router();

/**
 * Endpoint POST untuk melakukan proses login.
 * Memeriksa email dan password, lalu mengembalikan JWT jika berhasil.
 */
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    // Mencari pengguna berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Memverifikasi hash password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Mengambil secret key dari env
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('Kunci rahasia JWT belum dikonfigurasi di environment!');
      return res.status(500).json({ error: 'Kesalahan konfigurasi server internal' });
    }

    // Menghasilkan JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Mengembalikan data user beserta token
    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Kesalahan pada endpoint login:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server saat proses login' });
  }
});
