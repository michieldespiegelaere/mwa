var cacheName = 'v2';
var cacheFiles = [
    '/boteljon/index.php',
    '/boteljon/concept.php',
    '/boteljon/inschrijven.php',
    '/boteljon/bierkalender.php',
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
    '/boteljon/assets/images/belgie.jpg',
    '/boteljon/assets/images/bier.jpg',
    '/boteljon/assets/images/bieren.jpg',
    '/boteljon/assets/images/bpost.jpg',
    '/boteljon/assets/images/betalen.jpg',
    '/boteljon/assets/images/pakket.jpg',
    '/boteljon/assets/images/logo.jpg',
    '/boteljon/assets/images/bab.jpg',
    '/boteljon/assets/images/specialbeerweekend.jpg',
    '/boteljon/assets/images/zythos.jpg',
    '/boteljon/assets/images/bouillon.jpg',
    '/boteljon/assets/images/mons.jpg',
    '/boteljon/assets/images/grotedorst.jpg',
    '/boteljon/assets/images/oktoberfest.jpg',
    '/boteljon/assets/images/beerlovers.jpg',
    '/boteljon/assets/images/bierpassie.jpg',
    '/boteljon/assets/images/stembert.jpg',
    '/boteljon/assets/images/hotton.jpg',
    '/boteljon/assets/images/northsea.jpg',
    '/boteljon/assets/images/chouffe.jpg',
    '/boteljon/assets/images/100bieren.jpg',
    '/boteljon/assets/images/archen.jpg',
    '/boteljon/assets/images/beerweekend.jpg',
    '/boteljon/assets/images/cheese.jpg',
    '/boteljon/assets/images/hops.jpg',
    '/boteljon/assets/images/hopfeesten.jpg',
    '/boteljon/assets/images/beermuseum.jpg',
    '/boteljon/assets/images/bles.png',
    '/boteljon/assets/images/brassigaume.jpg',
    '/boteljon/assets/images/poperinge.jpg',
    '/boteljon/assets/images/weekend.jpg',
    '/boteljon/assets/images/stembert.jpg',
    '/boteljon/assets/images/christmas.jpg',
    '/boteljon/icon-96x96.jpg',
    '/boteljon/icon-144x144.jpg',
    '/boteljon/icon-192x192.jpg',
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
]


self.addEventListener('install', function(e) {
    //console.log('[Serviceworker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(
        // Open the cache
        caches.open(cacheName).then(function(cache) {

            // Add all the default files to the cache
            //console.log('[Serviceworker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    //console.log('[Serviceworker] Activated');

    e.waitUntil(
        // Get all the cache keys (cacheName)
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {

                // If a cached item is saved under a previous cacheName
                if (thisCacheName !== cacheName) {

                    // Delete that cached file
                    //console.log('[Serviceworker] Removing Cached Files from Cache - ', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    ); // end e.waitUntil
});

self.addEventListener('fetch', function(e) {
    //console.log('[ServiceWorker] Fetch', e.request.url);


    // check if post request of
    // check if it is a redirect if so just send respond and dont safe page
    // but only when you are online
    if(navigator.onLine)
    {
        var resp = fetch(e.request);
        if(resp) {
            if (e.request.method === 'POST' || resp.status === '302') {
                return resp;
            }
        }
    }


    e.respondWith(
        caches.match(e.request)
            .then(function (response) {


            if(response){
                var cacheResponse = response.clone();
                if(cacheResponse) {
                    if (!navigator.onLine) {
                        return cacheResponse;
                    }
                }
            }

            var fetchRequest = e.request.clone();

                // try fetching request
            return fetch(fetchRequest)
                .then(function (fetchresponse) {

                    if(fetchresponse.status === '302') {
                        return fetchresponse;
                    }

                    if (!fetchresponse) {
                        //console.log("[Serviceworker] fetch unsuccesfull ", fetchRequest);

                        return cacheResponse;
                    }

                    //console.log("[Serviceworker] fetch succesfull, ", fetchRequest);
                    var responseToCache = fetchresponse.clone();

                    caches.open(cacheName)
                        .then(function (cache) {
                            // update cache
                            //console.log("[Serviceworker] Updating cache with new fetch", e.request, cacheName);
                            cache.put(e.request, responseToCache);
                        });

                    return fetchresponse;

                })
                .catch(function (err) {
                    //console.log("[Serviceworker] Error fetching returning cache ", err);

                    return cacheResponse;
                });
        })
    )
});