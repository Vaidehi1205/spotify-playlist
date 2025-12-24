const CACHE_NAME = 'spotify-pwa-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/logo.png',
    '/po1.jpeg',
    '/po2.webp',
    "/Dooron Dooron.mp3",
    'po3.webp',
    'po4.webp',
    'po5.webp',
    '/Ehsaas.mp3',
    'po6.webp',
    '/Kashish.mp3',
    'po7.webp',
    '/Arziyaan.mp3',
    'po9.webp',
    '/Bairiyaa.mp3',
    'po10.webp',
    '/Haseen.mp3',
    'po11.webp',
    '/Hope.mp3',
    '/I_M_Done.mp3',
    'po12.webp',
    '/Mera Mann.mp3',
    'po13.webp',
    '/Pal Pal.mp3',
    'po14.webp',
    '/Preet Re.mp3',
    'po15.webp',
    '/Samjhawan.mp3',
    '/Soniyo.mp3',
    '/Zaalima.mp3',
    '/Zaroor.mp3',
    'banner.webp',
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
