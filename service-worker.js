const staticSimonGame = "simon-game-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/index.js",
  "/img/favicon.jpg",
  "https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&family=Roboto:wght@300&display=swap",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js",
  "https://cdn.jsdelivr.net/npm/howler@2.2.3/dist/howler.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css",
  "https://unpkg.com/keyboard-css@1.2.4/dist/css/main.min.css",
  "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=whit",
  "/sound/stage.wav",
  "/sound/level.wav",
  "/sound/lose.wav",
  "/sound/black.wav",
  "/sound/yellow.wav",
  "/sound/red.wav",
  "/sound/aqua.wav",
  "/sound/purple.wav",
  "/sound/forestgreen.wav",
  "/sound/orange.wav",
  "/sound/mediumslateblue.wav",
  "/sound/coral.wav",
  "/sound/blue.wav",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticSimonGame).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
