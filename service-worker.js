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
    "/Dooron Dooron.mp3",
    "/SAMJHO NA.mp3",
    'po3.webp',
    'po4.webp',
    '/Arz Kiya Hai.mp3',
    'po5.webp',
    '/Ehsaas.mp3',
    'po6.webp',
    '/Kashish.mp3',
    'po7.webp',
    '/Gabriela.mp3',
    'po8.jpg',
    '/s9.mp3',
    'po9.webp',
    '/Attention.mp3',
    'po10.webp',
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
