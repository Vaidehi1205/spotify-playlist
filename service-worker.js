const CACHE_NAME = 'spotify-pwa-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/logo.png',
    '/po1.jpeg',
    '/po2.webp',
    '/Perfect.mp3',
    '/Promise.mp3',
    '/po3.jpg',
    '/Preet Re.mp3',
    '/po4.webp',
    '/Ishq Hai.mp3',
    '/po5.jpg',
    '/O Maahi.mp3',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', event=>{
    event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener('fetch', event=>{
    event.respondWith(caches.match(event.request).then(resp=>resp||fetch(event.request)));
});

self.addEventListener('activate', event=>{
    event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
});
