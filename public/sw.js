const CACHE_NAME = 'syncvoca-journey-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/syncvoca-logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle standard HTTP/HTTPS requests
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // 1. Navigation requests (e.g. page refreshes or routing)
  // Use a Network-First strategy, falling back to /index.html (the SPA shell)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If successful, cache the index.html
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put('/', responseClone);
          });
          return response;
        })
        .catch(() => {
          // If offline, return the cached index.html shell
          return caches.match('/').then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // 2. Static assets from Google Fonts (external static assets)
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // 3. API endpoints (e.g., mentor chat requests or other backend communications)
  // Try network first, and if offline, return a friendly custom response
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If the network fails (offline), provide a graceful offline fallback for APIs
          if (url.pathname === '/api/mentor/chat') {
            return new Response(
              JSON.stringify({
                success: true,
                reply: "Koneksi internet terputus. Saya adalah asisten AI offline Anda saat ini. Seluruh simulasi, nilai kompetensi, dan profil Anda tetap tersimpan aman di perangkat ini. Silakan hubungkan kembali internet untuk mengaktifkan kembali Mentor Karier AI penuh."
              }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          }
          // Default offline JSON response for other APIs
          return new Response(
            JSON.stringify({ success: false, error: "Offline mode active" }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // 4. Stale-While-Revalidate strategy for static resources (JS, CSS, images, JSON)
  // Serves from cache immediately while updating the cache in background.
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fail silently, fall back to cached version
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Push notification listener
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'SyncVoca Reminder', body: event.data.text() };
    }
  }

  const title = data.title || 'SyncVoca Career Reminder';
  const options = {
    body: data.body || 'Ayo latih terus keterampilan kerja Anda!',
    icon: '/syncvoca-logo.png',
    badge: '/syncvoca-logo.png',
    data: data.url || '/',
    vibrate: [100, 50, 100],
    actions: [
      { action: 'explore', title: 'Buka Dashboard' },
      { action: 'close', title: 'Tutup' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data || '/');
      }
    })
  );
});

// Message listener for manual reminder triggers from the client app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_NOTIFICATION') {
    const { title, body, url } = event.data.payload;
    const options = {
      body,
      icon: '/syncvoca-logo.png',
      badge: '/syncvoca-logo.png',
      data: url || '/',
      vibrate: [100, 50, 100],
      tag: 'syncvoca-reminder-' + Date.now()
    };
    self.registration.showNotification(title, options);
  }
});

