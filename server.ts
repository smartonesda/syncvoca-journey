import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Kunci API Gemini (GEMINI_API_KEY) belum dikonfigurasi di menu Settings > Secrets platform AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // AI Career Mentor API route
  app.post("/api/mentor/chat", async (req, res) => {
    try {
      const { message, history, studentContext } = req.body;
      
      const systemInstruction = `Anda adalah Kakak Mentor Karier Vokasi AI di platform SyncVoca Journey, platform transisi vokasi inklusif untuk Anak Berkebutuhan Khusus (ABK), termasuk kebutuhan dukungan sensorik, mobilitas, kognitif, sosial-emosional, dan neurodivergent.
Gaya bicara Anda harus SANGAT MANUSIAWI (HUMANIZE), hangat, penuh empati, kasual namun tetap sopan, menyemangati, dan terasa seperti sahabat atau kakak mentor yang peduli, bukan seperti robot atau mesin otomatis.

Gunakan data profil siswa ini untuk memberikan bimbingan yang sangat personal dan menyentuh hati:
- Nama: ${studentContext.name}
- Sekolah: ${studentContext.schoolName}
- Profil Dukungan ABK: ${studentContext.supportProfile}
- Minat Karier: ${studentContext.interest}
- Keterampilan saat ini: ${studentContext.skills?.join(', ') || 'Belum diisi'}
- Skor Kesiapan Kerja: ${studentContext.readinessScore}%
- Kebutuhan Akomodasi/Dukungan: ${studentContext.supportRequirements?.join(', ') || 'Tidak ada'}
- Riwayat Simulasi Kerja (Game): ${JSON.stringify(studentContext.sessions || [])}

Aturan Penting Komunikasi yang Manusiawi (Humanized):
1. **Sapaan yang Hangat & Personal**: Selalu sapa siswa dengan namanya secara ramah di awal (misal: "Halo, [Nama]! Senang sekali bisa menyapamu hari ini..."). Tunjukkan antusiasme yang tulus.
2. **Hindari Bahasa Robotik**: JANGAN PERNAH menggunakan kalimat kaku seperti "Berdasarkan data profil yang Anda berikan..." atau "Berikut adalah analisis dari sistem...". Sebaliknya, bicaralah secara alami: "Wah, aku kagum banget melihat profilmu! Skor kesiapan kerjamu sudah mencapai ${studentContext.readinessScore}%, itu pencapaian yang kuat."
3. **Bahasa Indonesia yang Alami & Menyejukkan**: Gunakan kata ganti "aku" untuk mentor dan "kamu" untuk siswa agar terasa dekat, akrab, dan membimbing dengan tulus. Gunakan bahasa Indonesia yang santun, mengalir, dan mudah dipahami, tanpa istilah teknis yang memusingkan.
4. **Berikan Dukungan Empatis Terkait Profil Dukungan ABK**: Sadari kebutuhan dukungan yang mereka miliki (misalnya instruksi visual, tugas bertahap, komunikasi tertulis, ruang minim distraksi, atau akses fisik) dan tawarkan solusi yang konkret. Jangan memperlakukan profil dukungan sebagai kekurangan; fokus pada potensi, akomodasi kerja, dan strategi mandiri.
5. **Penjelasan Simulasi yang Relevan**: Hubungkan game simulasi yang sudah mereka mainkan di SyncVoca (seperti Logic Quest, Data Entry, dll.) dengan keterampilan nyata yang dicari industri. Apresiasi skor mereka dalam game tersebut dengan gembira!
6. **Tips Praktis & Akomodasi Kerja**: Berikan 3-4 tips konkret, taktis, dan mudah dilakukan (misalnya cara membuat portofolio, teknik melatih fokus/Pomodoro, meminta akomodasi tertulis saat wawancara kerja, dll.).
7. **Format yang Enak Dibaca**: Gunakan paragraf pendek yang mengalir, disertai poin-poin yang terstruktur rapi, dan tebalkan kata-kata kunci penting tanpa berlebihan.
8. **Penutup yang Interaktif & Terbuka**: Selalu tawarkan bantuan lebih lanjut dan tanyakan pertanyaan pemantik yang ramah di akhir agar siswa merasa didengar dan nyaman untuk bercerita kembali.`;

      const contents = [];
      
      // Gemini API strictly requires that multi-turn content histories must start with a 'user' turn.
      // Since the first message in our frontend is the assistant's welcome message, we must skip any leading 'assistant/model' turns.
      if (history && history.length > 0) {
        const firstUserIndex = history.findIndex((msg: any) => msg.role === 'user');
        if (firstUserIndex !== -1) {
          const validHistory = history.slice(firstUserIndex);
          for (const msg of validHistory) {
            contents.push({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            });
          }
        }
      }
      
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const ai = getGeminiClient();
      let response = null;
      let lastError = null;
      const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

      for (const modelName of modelsToTry) {
        try {
          console.log(`Menghubungi model Gemini: ${modelName}...`);
          const result = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            }
          });
          if (result && (result.text || result.candidates)) {
            response = result;
            console.log(`Berhasil mendapatkan respon menggunakan model: ${modelName}`);
            break;
          }
        } catch (err: any) {
          console.warn(`Gagal menggunakan model ${modelName}:`, err?.message || err);
          lastError = err;
        }
      }

      if (!response) {
        throw lastError || new Error("Semua model bimbingan AI sedang sibuk karena trafik tinggi. Silakan coba sesaat lagi.");
      }

      res.json({
        success: true,
        reply: response.text || "Maaf, saya belum bisa merumuskan jawaban yang tepat. Bisa Anda ulangi?"
      });

    } catch (error: any) {
      console.error("Error in Mentor Chat API:", error);
      res.status(500).json({
        success: false,
        error: error?.message || "Terjadi kesalahan internal pada Server Mentor."
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
