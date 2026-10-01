// Ancienne adresse de HandBase : ce service worker remplace l'ancien, vide ses caches,
// se désinscrit et renvoie les pages ouvertes vers la nouvelle adresse.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (cs) {
        cs.forEach(function (c) {
          var u = new URL(c.url);
          c.navigate('https://handbase-app.github.io' + u.pathname + u.search + u.hash);
        });
      })
  );
});
