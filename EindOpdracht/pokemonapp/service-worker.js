const cacheName = 'pokemon-app-v1'

const appFiles = [
  '/',
  '/manifest.webmanifest',
  '/assets/img/icons/icon-192x192.png',
  '/assets/img/icons/icon-512x512.png',
]

// Bij de installatie worden de belangrijkste bestanden bewaard in de cache.
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(appFiles)))
})

// Oude caches worden verwijderd wanneer een nieuwe versie wordt geactiveerd.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== cacheName).map((name) => caches.delete(name)),
      )
    }),
  )
})

// Eigen app-bestanden komen van het netwerk, met de cache als reserve bij geen internet.
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)

  if (event.request.method !== 'GET' || requestUrl.origin !== location.origin) return

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  )
})
