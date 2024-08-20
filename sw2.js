const swUrl = '/path/to/your/service-worker.js';
const OLD_CACHE_NAME = 'ARK-cache-v1';
const NEW_CACHE_NAME = 'ARK-cache-v2';
const urlsToCache = [
    'css/index.css',
    'css/lateload.css',
    'js/variables.js',
    'js/index.js',
    'js/lateload.js',
    'js/elasticlunr.js'
];


if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {

        try {
            const registration = await navigator.serviceWorker.register(swUrl);

            if (await needsUpdate(registration)) {
                await registration.unregister();
                const newRegistration = await navigator.serviceWorker.register(swUrl);

                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName.startsWith('old-cache-prefix')) {
                            return caches.delete(cacheName);
                        };
                    })
                );

                newRegistration.onupdatefound = () => {
                    // ... handle updates and caching

                };
            };
        } catch (error) {
            console.error('Service worker registration failed:', error);
        };
    });
};


async function needsUpdate(registration) {
    // Implement your logic to determine if an update is needed
    // This could involve checking Service Worker version, cached asset hashes, etc.
    return false; // Replace with your actual logic
}

async function checkCache() {
    try {
        const exists = await caches.has(cacheName);
        if (exists) {
            console.log('Cache exists:', cacheName);
            // Do something if the cache exists
        } else {
            console.log('Cache does not exist:', cacheName);
            // Do something if the cache doesn't exist
        }
    } catch (error) {
        console.error('Error checking cache:', error);
    }
};

checkCache();


async function unregisterAndClearCaches() {
    // Unregister all service workers
    const registrations = await navigator.serviceWorker.getRegistrations();
    const unregisterPromises = registrations.map(registration => registration.unregister());

    // Clear all caches
    const allCaches = await caches.keys();
    const cacheDeletionPromises = allCaches.map(cache => caches.delete(cache));

    // Wait for all promises to resolve
    await Promise.all([...unregisterPromises, ...cacheDeletionPromises]);
};