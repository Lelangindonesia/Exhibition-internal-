const CACHE_NAME = "tas-premium-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Install SW
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (evt) => {
  evt.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((resp) => resp || fetch(evt.request))
  );
});
