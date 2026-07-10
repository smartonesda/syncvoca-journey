import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatbotRouter } from './routes/chatbot.js';
import { authRouter } from './routes/auth.js';
import { siswaRouter } from './routes/siswa.js';
import { setupDocs } from './routes/docs.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Konfigurasi CORS yang ketat untuk keamanan akses API
// Membatasi asal origin hanya ke URL frontend dan metode HTTP tertentu
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
  origin: frontendUrl,
  credentials: true, // Mengizinkan pengiriman cookie/header otorisasi
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


// Routes
// Mendaftarkan endpoint otentikasi (login)
app.use('/api/auth', authRouter);

// Mendaftarkan endpoint chatbot (terlindungi oleh JWT di dalam router)
app.use('/api/chatbot', chatbotRouter);

// Mendaftarkan endpoint siswa (terlindungi oleh JWT di dalam router)
app.use('/api/siswa', siswaRouter);

// Setup Scalar Docs jika diaktifkan di .env
if (process.env.SCALAR_DOCS_ENABLED === 'true') {
  setupDocs(app);
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SyncVoca Journey API is running' });
});

/**
 * Memulai server dan menampilkan log startup yang disesuaikan dengan lingkungan.
 * Jika di mode production, hanya menampilkan satu baris log.
 * Jika di mode development, menampilkan dashboard ASCII dengan status environment.
 */
app.listen(port, () => {
  const env = process.env.NODE_ENV || 'development';
  const aiProvider = process.env.AI_PROVIDER || 'google';
  const aiModel = process.env.AI_MODEL_NAME || 'gemini-2.5-flash';

  let apiKeySet = 'no';
  if (aiProvider === 'google' && process.env.GOOGLE_AI_API_KEY) {
    apiKeySet = 'yes';
  } else if (aiProvider === 'openrouter' && process.env.OPENROUTER_API_KEY) {
    apiKeySet = 'yes';
  }

  // Batas rate limit yang dikonfigurasi pada middleware chatbot (5 req / min)
  const rateLimit = '5 req / min';

  const healthCheckUrl = `http://localhost:${port}/api/health`;
  const docsUrl = `http://localhost:${port}/reference`;

  if (env === 'production') {
    console.log(`[PRODUCTION] SyncVoca Journey Backend running on port ${port} | Provider: ${aiProvider} | API Key: ${apiKeySet}`);
  } else {
    console.log(`
============================================================
⠀⠀⢀⣀⡀⠘⢀⣀⠀⣀⠀⠀⠀⠀⣠⡀
⠠⡪⠁⠄⢀⠟⠁⠀⠀⠀⠈⠢⠀⠀⠙⠁
⠀⠑⠄⡑⢌⡀⠀⠀⠀⠀⠀⠀⡗⠠⡀⠀
⠀⠀⠀⠈⠒⡬⢐⠢⠄⣀⠀⢠⠃⠱⡈⠢
⠀⠀⠀⠀⠀⠈⠒⠨⠥⠶⠆⠩⠭⠥⠤⠐
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢰⡧⠀⠀⠀⠀

============================================================
 SYNCVOCA JOURNEY BACKEND STARTUP
============================================================
- PORT         : ${port}
- ENV          : ${env}
- AI PROVIDER  : ${aiProvider}
- AI MODEL     : ${aiModel}
- API KEY SET  : ${apiKeySet}
- RATE LIMIT   : ${rateLimit}
============================================================
- HEALTH CHECK : ${healthCheckUrl}
- SCALAR DOCS  : ${docsUrl}
============================================================
`);
  }
});
