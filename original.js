const version = '1.0.9';
const CACHE_NAME = `ARK-cache-version: ${version}`;

const urlsToCache = [
    'index.html',
    'manifest.json',
    'css/index.css',
    'css/lateload.css',
    'js/variables.js',
    'js/index.js',
    'js/lateload.js',
    'js/searcher.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            console.log('Opened cache');
            await cache.addAll(urlsToCache);
            console.log(CACHE_NAME);
            try {
                const response = await fetch(`manifest.json?version=${version}`);
                const manifest = await response.json();
                if (manifest.icons) {
                    const iconUrls = manifest.icons.map(icon => icon.src);
                    console.log('Caching manifest icons:', iconUrls);
                    await cache.addAll(iconUrls);
                };
                if (manifest.screenshots) {
                    const screenshotUrls = manifest.screenshots.map(screenshot => screenshot.src);
                    console.log('Caching manifest screenshots:', screenshotUrls);
                    await cache.addAll(screenshotUrls);
                };
            } catch (error) {
                console.error('Error fetching or parsing manifest:', error);
            };
        })()
    );
});

async function deleteCache() {

    const keys = await caches.keys();
    await Promise.all(keys.map(async (key) => { await caches.delete(key); }));
};

self.addEventListener('activate', async (event) => {

    const cacheAllowList = [CACHE_NAME];
    const keys = await caches.keys();
    await Promise.all(keys.map(async (key) => {
        if (!cacheAllowList.includes(key)) { await caches.delete(key); };
    }));
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const filename = url.pathname.split('/').pop();

    if (filename !== 'manifest.json' && filename.endsWith('.json')) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    const jsonBlob = await cachedResponse.blob();
                    const decompressedBlob = await decompressBlob(jsonBlob);
                    return new Response(decompressedBlob, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                };
                if (navigator.onLine) {
                    let newurl = removeQueryString(event.request.url);
                    if (filename === 'TWFVerses.json') { newurl = `${newurl}?version=${version}`};
                    const networkResponse = await fetch(newurl);
                    const returnResponse = networkResponse.clone();
                    event.waitUntil((async () => {
                        const jsonData = await networkResponse.text();
                        const compressedBlob = await compressJson(jsonData);
                        const response = new Response(compressedBlob, {
                            headers: { 'Content-Encoding': 'gzip', 'Content-Type': 'application/json' }
                        });
                        await cache.put(event.request, response.clone());
                    })());
                    return returnResponse;
                } else { return 'offline'; };
            })()
        );
    } else {
        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                const response = await cache.match(event.request);
                if (response) { return response; };
                if (navigator.onLine) {
                    const newurl = removeQueryString(event.request.url);
                    const networkResponse = await fetch(`${newurl}?version=${version}`);
                    return networkResponse;
                } else { return 'offline'; };
            })()
        );
    };
});

function removeQueryString(url) {

    const questionMarkIndex = url.indexOf('?');
    if (questionMarkIndex !== -1) { return url.substring(0, questionMarkIndex); };
    return url;
};

//! gzip compression
    async function compressJson(jsonString) {
        const readableStream = new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode(jsonString));
                controller.close();
            }
        });
        const compressionStream = new CompressionStream('gzip');
        const compressedStream = readableStream.pipeThrough(compressionStream);
        const chunks = [];
        for await (const chunk of compressedStream) {
            chunks.push(chunk);
        };
        return new Blob(chunks);
    };

    async function decompressBlob(blob) {
        const arrayBuffer = await blob.arrayBuffer();
        const decompressionStream = new DecompressionStream('gzip');
        const decompressedStream = new Response(arrayBuffer).body.pipeThrough(decompressionStream);
        return new Response(decompressedStream).blob();
    };
//! End of gzip compression

/*  This goes in the index.html file ******  <script src="sw.js"></script>

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
    </script>*/



