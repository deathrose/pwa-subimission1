const CACHE_NAME = "submission1-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/mission.html",
  "/pages/hero.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon.png",
  "/manifest.json",
  "/favicon.ico",
  "/img/3826.jpg",
  "/img/pp.jpg",
  "/img/undraw_be_the_hero_ssr2.png",
  "/img/undraw_dreamer_gxxi.png",
  "/img/undraw_instant_support_elxh.png",
  "/img/undraw_witch_7uk7.png",
  "/img/undraw_xmas_snowman_k7yf.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
          return fetch(event.request);
        })
    );
  });
  
  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });