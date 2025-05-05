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
                    try {
                        const networkResponse = await fetch(newurl);
                        const returnResponse = networkResponse.clone();
                        const jsonData = await networkResponse.text();
                        const compressedBlob = await compressJson(jsonData);
                        const response = new Response(compressedBlob, {
                            headers: { 'Content-Encoding': 'gzip', 'Content-Type': 'application/json' }
                        });
                        await cache.put(event.request, response.clone());
                        return returnResponse;
                    } catch (error) {
                        console.error('Fetch failed:', error);
                        return new Response('Network error', { status: 500 }); // Or a custom offline error page
                    };
                } else {
                    return new Response('No internet connection', { status: 503 }); // Or a custom offline message/page
                };
            })()
        );
    } else {
        event.respondWith(
            (async () => {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) { return cachedResponse; };
                if (navigator.onLine) {
                    try {
                        const newurl = removeQueryString(event.request.url);
                        const networkResponse = await fetch(`${newurl}?version=${version}`);
                        return networkResponse;
                    } catch (error) {
                        console.error('Fetch failed:', error);
                        return new Response('Network error', { status: 500 });
                    };
                } else {
                    return new Response('No internet connection', { status: 503 });
                };
            })()
        );
    };
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
                    try {
                        const networkResponse = await fetch(newurl);
                        const returnResponse = networkResponse.clone();

                        // Respond with the network response immediately
                        event.waitUntil(
                            (async () => {
                                const jsonData = await networkResponse.text();
                                const compressedBlob = await compressJson(jsonData);
                                const response = new Response(compressedBlob, {
                                    headers: { 'Content-Encoding': 'gzip', 'Content-Type': 'application/json' }
                                });
                                await cache.put(event.request, response.clone());
                                console.log('Cache updated for:', event.request.url);
                            })()
                        );
                        return returnResponse;
                    } catch (error) {
                        console.error('Fetch failed:', error);
                        return new Response('Network error', { status: 500 });
                    };
                } else {
                    return new Response('No internet connection', { status: 503 });
                };
            })()
        );
    } else {
        event.respondWith(
            (async () => {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) { return cachedResponse; };
                if (navigator.onLine) {
                    try {
                        const newurl = removeQueryString(event.request.url);
                        const networkResponse = await fetch(`${newurl}?version=${version}`);
                        return networkResponse;
                    } catch (error) {
                        console.error('Fetch failed:', error);
                        return new Response('Network error', { status: 500 });
                    };
                } else {
                    return new Response('No internet connection', { status: 503 });
                };
            })()
        );
    };
});