var DYNAMIC_CACHE_NAME = 'cache-vVERSION'

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== DYNAMIC_CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});
