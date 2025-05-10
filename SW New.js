const STATIC_CACHE = 'static-cache-v1';
const DATA_CACHE = 'data-cache-v1';

// Install event: caches static assets
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/offline.html'
      ]);
      console.log('Static assets cached');
    })()
  );
});

// Activate event: deletes old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cache => {
          if (cache !== STATIC_CACHE && cache !== DATA_CACHE) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })()
  );
});

// Fetch event: handles API data separately
self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      if (event.request.url.includes('/api/')) {
        try {
          const cache = await caches.open(DATA_CACHE);
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          return response;
        } catch {
          return caches.match(event.request);
        }
      } else {
        const cachedResponse = await caches.match(event.request);
        return cachedResponse || fetch(event.request);
      }
    })()
  );
});


/*
event.request.destination values:

"document" – An HTML document.
"image" – An image file (e.g., .png, .jpg, .gif).
"script" – A JavaScript file.
"style" – A CSS file.
"font" – A font file.
"media" – A media resource like video or audio.
"worker" – A worker script.
"manifest" – A web app manifest file.
"report" – A reporting API endpoint.
"iframe" – An iframe document.
"object" – An embedded object (e.g., Flash or PDF).
"xslt" – An XSLT stylesheet.
"audio" – An audio resource.
"video" – A video resource.
*/

// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  // Check if this is a request for an image
  if (event.request.destination === 'image') {
    event.respondWith(handleImageFetch(event.request));
  } else {
    return;
  }
});

async function handleImageFetch(request) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request.url);

    // Return a cached response if we have one
    if (cachedResponse) {
      return cachedResponse;
    }

    // Otherwise, hit the network
    const fetchedResponse = await fetch(request);

    // Add the network response to the cache for later visits
    await cache.put(request, fetchedResponse.clone());

    // Return the network response
    return fetchedResponse;
  } catch (error) {
    console.error('Error handling fetch request:', error);
    // Optionally return a fallback response here
    throw error;
  }
};



//! ignore headers
self.addEventListener('fetch', event => {
  event.respondWith(handleFetch(event));
});

async function handleFetch(event) {
  try {
    const responseFromCache = await caches.match(event.request, {
      ignoreSearch: true,
      ignoreMethod: true,
      ignoreVary: true
    });

    if (responseFromCache) {
      return responseFromCache;
    }

    const responseFromNetwork = await fetch(event.request);

    if (!responseFromNetwork || !responseFromNetwork.ok) {
      return responseFromNetwork; // Or handle the error as needed
    }

    const cache = await caches.open('my-cache-name');
    await cache.put(event.request, responseFromNetwork.clone());

    return responseFromNetwork;

  } catch (error) {
    console.error('Fetch error:', error);
    // Optionally return a fallback response
    return new Response('Network error happened', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}


function test() {

  // Delete old version
  const oldVersion = '1.1.0'
  if (url.search.includes(oldVersion)) { cache.delete(request); };
  // Delete no querystring
  const url = new URL(request.url);
  if (!url.search) { cache.delete(request); };
};

if (event.request.mode === 'navigate') {
  const cachedResponse = await caches.match('/index.html');
};