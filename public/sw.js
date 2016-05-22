'use strict';

const fundamentalsCacheName = 'v2::fundamentals';
const posterCacheName = 'v1::posters';
const offlineFundamentals = [
    '/',
    '/polyfills.bundle.js',
    '/vendor.bundle.js',
    '/main.bundle.js',
    '/style.css'
];

self.addEventListener('install', event => {
    console.log('install');
    event.waitUntil(
        caches
            .open(fundamentalsCacheName)
            .then(cache => {
                cache.addAll(offlineFundamentals);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('activate');
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => [fundamentalsCacheName].indexOf(cacheName) < 0)
                        .map(cacheName => caches.delete(cacheName))
                );
            })
    );
});

self.addEventListener('fetch', event => {
    const requestURL = new URL(event.request.url);
    let response;

    if (requestURL.hostname === 'tvmazecdn.com') {
        response = cacheFallbackOnNetwork(event.request, posterCacheName);
    } else if (requestURL.hostname === 'www.placecage.com') {
        response = cacheFallbackOnNetwork(event.request, posterCacheName);
    } else if (location.hostname === requestURL.hostname) {
        response = cacheFallbackOnNetwork(event.request, fundamentalsCacheName);
    } else {
        console.log('Unknown data, go for the internet', event.request.url);
        response = fetch(event.request);
    }

    return event.respondWith(response);
});

/**
 * Check if we have the request in cache, if we do: response, else make a network request and update the cache.
 * @param  {Request} request
 * @param  {String} cacheName
 * @return {Promise}
 */
function cacheFallbackOnNetwork(request, cacheName) {
    return caches.open(cacheName).then(cache => {
        return cache.match(request.clone()).then(response => {
            var fetchPromise = fetch(request.clone()).then(networkResponse => {
                cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
            return response || fetchPromise;
        });
    });
}
