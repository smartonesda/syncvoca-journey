import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Interface untuk payload dari JWT yang sudah didekode
 */
interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Mendeklarasikan tipe user di Request Express
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware untuk memverifikasi token JWT dari header Authorization.
 * Hanya mengizinkan request yang memiliki Bearer token yang valid.
 * 
 * @param req Request objek dari Express
 * @param res Response objek dari Express
 * @param next Fungsi Next untuk melanjutkan ke middleware atau controller berikutnya
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
      console.error('Kunci rahasia JWT belum dikonfigurasi di environment!');
      return res.status(500).json({ error: 'Kesalahan konfigurasi server internal' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Sesi tidak valid atau telah berakhir' });
      }

      req.user = user as JwtPayload;
      next();
    });
  } else {
    res.status(401).json({ error: 'Akses ditolak, header otorisasi tidak ditemukan' });
  }
};
