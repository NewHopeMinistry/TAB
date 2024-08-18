
const CACHE_NAME = 'TAB-cache-v1';
const urlsToCache = [
  '/css/index.css',
  '/css/lateload.css',
  '/js/variables.js',
  '/js/index.js',
  '/js/lateload.js',
  '/js/elasticlunr.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('Opened cache');
      await cache.addAll(urlsToCache);
    })()
  );
});

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('.json')) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) { return cachedResponse; };
                const networkResponse = await fetch(event.request);
                await cache.put(event.request, networkResponse.clone());
                return networkResponse;
            })()
        );

    } else {

        (async () => {
            const response = await caches.match(event.request);
            if (response) { return response; };
            return fetch(event.request);
        })();

    };
  });