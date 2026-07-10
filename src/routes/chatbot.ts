import { Router } from 'express';
import dotenv from 'dotenv';
import { authenticateJWT } from '../middleware/auth.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import rateLimit from 'express-rate-limit';

dotenv.config();

export const chatbotRouter = Router();

/**
 * Middleware untuk membatasi jumlah request (Rate Limiting).
 * Maksimal 5 request per menit untuk mencegah kehabisan kuota API gratis.
 */
const chatbotRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 5, // Batas maksimal request per windowMs
  message: {
    error: 'Terlalu banyak permintaan. Silakan tunggu beberapa saat lagi.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Endpoint POST untuk AI Chatbot.
 * Endpoint ini dilindungi oleh middleware JWT (authenticateJWT) dan Rate Limiting.
 * Menggunakan logika multi-provider (Google atau OpenRouter) berdasarkan .env.
 */
chatbotRouter.post('/ask', authenticateJWT, chatbotRateLimiter, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Pesan (message) wajib diisi' });
    }

    // Ekstrak konteks user dari payload JWT
    const user = req.user;
    if (!user) {
       return res.status(401).json({ error: 'Konteks pengguna tidak ditemukan' });
    }

    const provider = process.env.AI_PROVIDER || 'google';
    const modelName = process.env.AI_MODEL_NAME || 'gemini-2.5-flash';
    let reply = '';

    // Memilih provider AI berdasarkan konfigurasi environment
    if (provider === 'google') {
      const apiKey = process.env.GOOGLE_AI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GOOGLE_AI_API_KEY belum dikonfigurasi' });
      }

      // Menginisialisasi Google Generative AI SDK
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent(message);
      reply = result.response.text();

    } else if (provider === 'openrouter') {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'OPENROUTER_API_KEY belum dikonfigurasi' });
      }

      // Melakukan request HTTP fetch ke OpenRouter API
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'SyncVoca Journey',
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: 'user', content: message }],
        }),
      });

      if (!response.ok) {
        const errData = await response.text();
        console.error('OpenRouter API error:', errData);
        return res.status(response.status).json({ error: 'Gagal mendapatkan respon dari OpenRouter' });
      }

      const data = await response.json();
      reply = data.choices?.[0]?.message?.content || 'Tidak ada respon dari AI';
    } else {
      return res.status(400).json({ error: `Provider AI '${provider}' tidak didukung` });
    }

    res.json({
      reply,
      userId: user.userId,
      userRole: user.role,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Kesalahan pada endpoint chatbot:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server saat memproses permintaan AI' });
  }
});
