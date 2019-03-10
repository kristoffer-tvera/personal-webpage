// Set a name for the current cache
var cacheName = 'v1';

// Default files to always cache
var cacheFiles = [
	'./',
	'./about',
	'./experience',
	'./projects',
	'./contact',
	'./assets/site.min.css',
	'./assets/site.min.js',
	'./images',
	'https://fonts.googleapis.com/css?family=Roboto'
]

self.addEventListener('install', function (evt) {
	evt.waitUntil(precache());
});

self.addEventListener('fetch', function (evt) {
	evt.respondWith(fromCache(evt.request));
	evt.waitUntil(update(evt.request));
});


async function precache() {
	const cache = await caches.open(cacheName);
	return cache.addAll(cacheFiles);
}

async function fromCache(request) {
	const cache = await caches.open(cacheName);
	const matching = await cache.match(request);
	return matching || Promise.reject('no-match');
}

async function update(request) {
	const cache = await caches.open(CACHE);
	const response = await fetch(request);
	return cache.put(request, response);
}
