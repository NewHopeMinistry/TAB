const version = '1.1.14';
const CACHE_NAME = `ARK-cache-version: ${version}`;
var online = null;

const urlsToCache = [
    'index.html',
    'manifest.json',
    'css/index.css',
    'css/lateload.css',
    'js/variables.js',
    'js/index.js',
    'js/lateload.js',
    'js/searcher.js',
    'html/css/html.css',
    'html/js/htmlvariables.js',
    'html/about.html',
    'html/help.html',
    'html/history.html',
    'html/license.html',
    'html/statement.html',
    'html/twfabout.html',
    'html/images/icons/clear-yellow-logo1-512.png',
];

self.addEventListener('install', event => {

    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(urlsToCache);
            console.log(CACHE_NAME);
        })()
    );
});

self.addEventListener('activate', async (event) => {

    event.waitUntil(
        (async () => {

            const cacheAllowList = [CACHE_NAME];
            const keys = await caches.keys();
            await Promise.all(keys.map(async (key) => {
                if (!cacheAllowList.includes(key)) { await caches.delete(key); };
            }));
        })()
    );
});

async function deleteCachedFile(fileName) {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();

    for (const request of keys) {
        if (request.url.endsWith(fileName)) {
            await cache.delete(request);
        }
    };
    return Promise.resolve(true);
}

self.addEventListener('fetch', event => {

    event.respondWith(
        (async () => {
            const url = new URL(event.request.url);
            const filename = url.pathname.split('/').pop();
            if (filename !== 'manifest.json' && filename.endsWith('.json')) {
                    //Keep code from Here
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(event.request);
                    if (cachedResponse) { return cachedResponse };
                    if (navigator.onLine) {
                        if (online === null) { online = await isOnline(); };
                        if (online) {
                            let newurl = event.request.url;
                            newurl.search = '';
                            if (filename === 'TWFVerses.json') { newurl = `${newurl}?version=${version}`};
                            try {
                                const networkResponse = await fetch(newurl);
                                if (!networkResponse.ok) { throw new Error(networkResponse.status); };
                                await cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            } catch (error) {
                                return new Response('Network fetch error: 500', { status: 500 });
                            };
                        } else {
                            return new Response(`${filename}: No internet connection error: 503-1`, { status: 503 });
                        };
                    } else {
                        return new Response(`${filename}: No internet connection error: 503-2`, { status: 503 });
                    };
                    // To End here

            } else {
                const cache = await caches.open(CACHE_NAME);
                var response = null;
                if (event.request.mode === 'navigate') {
                    if (event.request.url.includes('/html/')) {
                        response = await cache.match(event.request);
                    } else {
                        if (filename === 'index.html' || filename === '') {
                            response = await caches.match('/index.html');
                        } else {
                            response = await cache.match(event.request);
                        };
                    };
                } else {
                    response = await cache.match(event.request);
                };
                if (response) { return response; };
                if (navigator.onLine) {
                    if (online === null) { online = await isOnline(); };
                    if (online) {
                        var networkResponse;
                        const newurl = event.request.url;
                        newurl.search = '';
                        try {
                            if (event.request.destination === 'image') {
                                networkResponse = await fetch(newurl);
                            } else {
                                networkResponse = await fetch(`${newurl}?version=${version}`);
                            };
                            if (filename !== 'index.html') { await cache.put(event.request, networkResponse.clone()); };

                            return networkResponse;
                        } catch (error) {
                            return new Response('Network error: 500-1', { status: 500 });
                        };
                    } else {
                        const cache = await caches.open(CACHE_NAME);
                        let newurl = new URL(event.request.url);
                        if (filename === 'index.html') { newurl.search = ''; };
                        const response = await cache.match(newurl.toString());
                        if (response) { return response; };
                        return new Response(`${filename}: No internet connection error: 503-3`, { status: 503 });
                    };
                } else {
                    const cache = await caches.open(CACHE_NAME);
                    let newurl = new URL(event.request.url);
                    if (filename === 'index.html') { newurl.search = ''; };
                    const response = await cache.match(newurl.toString());
                    if (response) { return response; };
                    return new Response(`${filename}: No internet connection error: 503-4`, { status: 503 });
                };
            };
        })()
    );


});

async function isOnline() {
  try {
    const response = await fetch('status/204', { mode: 'cors', cache: 'no-store' });
    if (response.ok) { return true; };
  } catch (error) {
    return false;
  }
};

/*
    <script>
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
        };
    </script>
*/
