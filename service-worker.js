/* ══════════════════════════════════════
   Dashboard TPA — Service Worker v3
   Simpel en robuust: netwerk-eerst,
   geen clone-fouten meer
══════════════════════════════════════ */

const CACHE = 'tpa-v3';

const SHELL = [
  '/index.html',
  '/project_detail.html',
  '/analyse.html',
  '/boringen_module.html',
  '/duiker_module.html',
  '/omgevingsmanagement_module.html',
  '/planning.html',
  '/proefsleuven_module.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

/* ── Install: cache shell ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: verwijder ALLE oude caches ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch: netwerk-eerst, correcte clone ── */
self.addEventListener('fetch', e => {
  const url = e.request.url;

  /* Supabase + externe CDNs → altijd netwerk, nooit cachen */
  if (url.includes('supabase.co') ||
      url.includes('cdn.jsdelivr.net') ||
      url.includes('cdnjs.cloudflare.com')) {
    return; /* Browser handelt zelf af */
  }

  /* Navigatie (HTML pagina's) → netwerk eerst */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(networkRes => {
          /* Clone VÓÓR het returnen om body-al-gebruikt fout te voorkomen */
          if (networkRes && networkRes.status === 200) {
            const toCache = networkRes.clone();
            caches.open(CACHE).then(c => c.put(e.request, toCache));
          }
          return networkRes;
        })
        .catch(() => caches.match(e.request)
          .then(cached => cached || Response.error())
        )
    );
    return;
  }

  /* Statische assets (png, json, js) → cache eerst, netwerk als fallback */
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      return fetch(e.request).then(networkRes => {
        if (!networkRes || networkRes.status !== 200 || networkRes.type === 'opaque') {
          return networkRes;
        }
        /* Clone VÓÓR alle operaties */
        const toCache = networkRes.clone();
        caches.open(CACHE).then(c => c.put(e.request, toCache));
        return networkRes;
      });
    })
  );
});
