// Keeps the app working offline: serve saved files, refresh them in the background.
const CACHE = "makro-afe0aae6";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "fonts/archivo-latin.woff2", "fonts/archivo-latin-ext.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request).then(hit => {
    const fresh = fetch(e.request).then(r => { if (r.ok && new URL(e.request.url).origin === location.origin) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || fresh;
  })));
});
