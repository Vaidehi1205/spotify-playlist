const CACHE_NAME = 'spotify-pwa-v3';

// App shell (UI + images)
const APP_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/logo.png',
  '/banner.webp',

  // images
  '/po1.jpeg',
  '/po2.webp',
  '/po3.webp',
  '/po4.webp',
  '/po5.webp',
  '/po6.webp',
  '/po7.webp',
  '/po9.webp',
  '/po10.webp',
  '/po11.webp',
  '/po12.webp',
  '/po13.webp',
  '/po14.webp',
  '/po15.webp'
];

// 🎵 ALL SONGS (URL-encoded where needed)
const SONGS = [
  '/Dooron%20Dooron.mp3',
  '/Ehsaas.mp3',
  '/Kashish.mp3',
  '/Arziyaan.mp3',
  '/Bairiyaa.mp3',
  '/Haseen.mp3',
  '/Hope.mp3',
  '/I_M_Done.mp3',
  '/Mera%20Mann.mp3',
  '/Pal%20Pal.mp3',
  '/Preet%20Re.mp3',
  '/Samjhawan.mp3',
  '/Soniyo.mp3',
  '/Zaalima.mp3',
  '/Zaroor.mp3'
];

// 📦 INSTALL — cache EVERYTHING or fail
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await cache.addAll(APP_ASSETS);
      await cache.addAll(SONGS);
    })
  );
});

// 🧹 ACTIVATE — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 🎧 FETCH — cache-only for songs
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 🎵 AUDIO: cache only (no network ever)
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then(response => response)
    );
    return;
  }

  // 🌐 PAGES & ASSETS
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => {
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/offline.html');
        }
      });
    })
  );
});
