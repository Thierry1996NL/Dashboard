/* ══════════════════════════════════════
   Dashboard TPA — Service Worker v1
   Strategie:
   - HTML pagina's  → Network first (altijd verse versie)
   - Supabase API   → Network only  (live data)
   - Overige assets → Cache first   (snel laden)
══════════════════════════════════════ */

const CACHE = 'tpa-v2';

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

/* ── Install ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: oude caches opruimen ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', e => {
  const url = e.request.url;

  /* Supabase → altijd netwerk */
  if (url.includes('supabase.co')) {
    e.respondWith(fetch(e.request));
    return;
  }

  /* Navigatie (HTML) → netwerk eerst, cache als fallback */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  /* Overig → cache eerst, dan netwerk */
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      });
    })
  );
});
