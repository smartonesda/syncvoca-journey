import { Express } from 'express';
import { apiReference } from '@scalar/express-api-reference';

export const setupDocs = (app: Express) => {
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: {
          openapi: '3.1.0',
          info: {
            title: 'SyncVoca Journey API',
            version: '1.0.0',
            description: 'API documentation for SyncVoca Journey Backend',
          },
          tags: [
            { name: 'System Management', description: 'Endpoint utilitas dan health check' },
            { name: 'Authentication', description: 'Autentikasi dan kontrol akses pengguna' },
            { name: 'AI Chatbot Integration', description: 'Mentor AI dan asisten virtual' },
            { name: 'Student Core Engine', description: 'Fitur inti untuk aktivitas siswa ABK (Simulasi, Portofolio, Journey)' }
          ],
          paths: {
            '/api/health': {
              get: {
                tags: ['System Management'],
                summary: 'Health Check',
                responses: {
                  '200': {
                    description: 'Server is running',
                  },
                },
              },
            },
            '/api/auth/login': {
              post: {
                tags: ['Authentication'],
                summary: 'User Login',
                requestBody: {
                  required: true,
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          email: { type: 'string' },
                          password: { type: 'string' }
                        },
                        required: ['email', 'password']
                      }
                    }
                  }
                },
                responses: {
                  '200': {
                    description: 'Login successful, returns a bearer token string',
                  },
                  '401': {
                    description: 'Unauthorized, invalid credential matches',
                  }
                }
              }
            },
            '/api/chatbot/ask': {
              post: {
                tags: ['AI Chatbot Integration'],
                summary: 'Ask AI Mentor',
                security: [{ bearerAuth: [] }],
                requestBody: {
                  required: true,
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          message: { type: 'string' }
                        },
                        required: ['message']
                      }
                    }
                  }
                },
                responses: {
                  '200': {
                    description: 'Successful AI response',
                  },
                  '401': {
                    description: 'Unauthorized',
                  },
                  '429': {
                    description: 'Too Many Requests',
                  }
                }
              }
            },
            '/api/siswa/simulasi': {
              post: {
                tags: ['Student Core Engine'],
                summary: 'Kirim Hasil Simulasi Kerja',
                description: 'Menyimpan sesi permainan/simulasi vokasi dari siswa ke dalam log.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                  required: true,
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          gameId: { type: 'string' },
                          gameName: { type: 'string' },
                          score: { type: 'number' },
                          accuracy: { type: 'number' },
                          completionTime: { type: 'number' },
                          errorCount: { type: 'number' },
                          consistency: { type: 'number' }
                        },
                        required: ['gameId', 'gameName', 'score']
                      }
                    }
                  }
                },
                responses: {
                  '201': { description: 'Sesi simulasi berhasil disimpan' },
                  '400': { description: 'Data simulasi tidak lengkap' },
                  '401': { description: 'Unauthorized' },
                  '404': { description: 'Profil siswa tidak ditemukan' }
                }
              }
            },
            '/api/siswa/portofolio': {
              get: {
                tags: ['Student Core Engine'],
                summary: 'Ambil Data Portofolio',
                description: 'Mengambil ringkasan portofolio dan 10 riwayat simulasi terakhir siswa.',
                security: [{ bearerAuth: [] }],
                responses: {
                  '200': { description: 'Berhasil mengambil data portofolio' },
                  '401': { description: 'Unauthorized' },
                  '404': { description: 'Profil siswa tidak ditemukan' }
                }
              }
            },
            '/api/siswa/journey': {
              get: {
                tags: ['Student Core Engine'],
                summary: 'Ambil Status Milestone (Journey)',
                description: 'Mengambil daftar milestone atau log tahapan journey yang telah diselesaikan siswa.',
                security: [{ bearerAuth: [] }],
                responses: {
                  '200': { description: 'Berhasil mengambil data milestone' },
                  '401': { description: 'Unauthorized' },
                  '404': { description: 'Profil siswa tidak ditemukan' }
                }
              }
            }
          },
          components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer'
              }
            }
          }
        },
      },
    }),
  );
};
