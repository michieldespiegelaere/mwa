this.addEventListener('install', function (event) {
    // Perform install steps
    console.log("test install");
    event.waitUntil(
        caches.open('v2').then(function (cache) {
            return cache.addAll([
                '/boteljon/',
                '/boteljon/index.php',
                '/boteljon/concept.php',
                '/boteljon/inschrijven.php',
                '/boteljon/bierkalender.php',
                '/boteljon/contact.php',
                '/boteljon/winkelmandje.php',
                '/boteljon/manifest.json',
                '/boteljon/register.js',
                '/boteljon/sw.js',
                '/boteljon/assets/css/materialdesignicons.css',
                '/boteljon/assets/css/materialdesignicons.css.map',
                '/boteljon/assets/css/materialdesignicons.min.css',
                '/boteljon/assets/css/materialdesignicons.min.css.map',
                '/boteljon/assets/css/materialize.css',
                '/boteljon/assets/css/materialize.min.css',
                '/boteljon/assets/css/reset.css',
                '/boteljon/assets/css/style.css',
                '/boteljon/assets/js/init.js',
                '/boteljon/assets/js/materialize.js',
                '/boteljon/assets/js/materialize.min.js',
                '/boteljon/assets/images/banner.jpg',
                '/boteljon/assets/images/belgie.png',
                '/boteljon/assets/images/bier.jpg',
                '/boteljon/assets/images/bieren.jpg',
                '/boteljon/assets/images/bpost.png',
                '/boteljon/assets/images/logo.png',
                '/boteljon/icon-96x96.png',
                '/boteljon/icon-144x144.png',
                '/boteljon/icon-192x192.png',
                '/boteljon/node_modules/mdi/fonts/materialdesignicons-webfont.svg',
                '/boteljon/node_modules/mdi/fonts/materialdesignicons-webfont.eot',
                '/boteljon/node_modules/mdi/fonts/materialdesignicons-webfont.ttf',
                '/boteljon/node_modules/mdi/fonts/materialdesignicons-webfont.woff',
                '/boteljon/node_modules/mdi/fonts/materialdesignicons-webfont.woff2',
                'https://code.jquery.com/jquery-2.1.1.min.js',
                '/boteljon/assets/fonts/roboto/Roboto-Regular.woff2',
                '/boteljon/assets/fonts/roboto/Roboto-Medium.woff2',
                '/boteljon/assets/fonts/roboto/Roboto-Bold.woff2',
                '/boteljon/assets/fonts/roboto/Roboto-Light.woff2',
                '/boteljon/node_modules/mdi/fonts/materialdesignicons-webfont.woff2?v=1.9.32'
                ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    console.log("test fetch");
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});