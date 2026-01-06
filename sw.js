const CACHE_NAME = 'forest-quest-v1';
const ASSETS = [
  '/',
  '/game',
  '/static/css/style.css',
  '/static/js/script.js',
  '/static/images/base.gif',
  '/static/images/base.png',
  '/static/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching game assets...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file if found, otherwise go to network (terminal)
      return response || fetch(event.request);
    })
  );
});
