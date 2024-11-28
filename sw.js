const version = '1.0.7';
const CACHE_NAME = `ARK-cache-version: ${version}`;

const urlsToCache = [
    'index.html',
    'css/index.css',
    'css/lateload.css',
    'js/variables.js',
    'js/index.js',
    'js/lateload.js',
    'js/elasticlunr.js',
    'images/icons/favicon-16.png',
    'images/icons/logo-128.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            console.log('Opened cache');
            await cache.addAll(urlsToCache);
            console.log(CACHE_NAME);
        })()
    );
});

self.addEventListener('activate', async (event) => {

    const cacheAllowList = [CACHE_NAME];
    const keys = await caches.keys();
    await Promise.all(keys.map(async (key) => {
        if (!cacheAllowList.includes(key)) { await caches.delete(key); };
    }));
});

self.addEventListener('fetch', event => {

    if (event.request.url.endsWith('.json')) {

        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) { return cachedResponse; };
                if (navigator.onLine) {
                    const networkResponse = await fetch(event.request);
                    await cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                } else { return 'offline'; };

            })()
        );
    } else {

        (async () => {
            const response = await caches.match(event.request);
            if (response) { return response; };
            if (navigator.onLine) {
                return fetch(event.request);
            } else { return 'offline'; };

        })();
    };
});



/*  This goes in the html ******  <script src="sw.js"></script>

    if ('serviceWorker' in navigator) {   //This goes in the client side javascript
        (async () => {
            try {
                const registration = await navigator.serviceWorker.register('sw.js', { scope: '/' });
                console.log('Service Worker registered with scope:', registration.scope);
                console.log(`Version: ${version}`)
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        })();
    };*/