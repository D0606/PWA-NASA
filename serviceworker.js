//set up cache name and files to add to it
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const type = connection.effectiveType;
const CACHE_NAME = 'NASA-API-Assignment-v1';
const CACHE_URLS = ['index.html',
    'apod.html',
    'gallery.html',
    'landsat.html',
    'neo.html',
    'settings.html',
    'styles/images/Banner_Starfield.jpg',
    'images/fallback/asteroids1x.jpg',
    'images/fallback/asteroids2x.jpg',
    'images/fallback/asteroids3x.jpg',
    'images/fallback/asteroids4x.jpg',
    'images/fallback/astronaut1x.jpg',
    'images/fallback/astronaut2x.jpg',
    'images/fallback/astronaut3x.jpg',
    'images/fallback/astronaut4x.jpg',
    'images/fallback/earth1x.jpg',
    'images/fallback/earth2x.jpg',
    'images/fallback/earth3x.jpg',
    'images/fallback/earth4x.jpg',
    'images/fallback/spacewalk1x.jpg',
    'images/fallback/spacewalk2x.jpg',
    'images/fallback/spacewalk3x.jpg',
    'images/fallback/spacewalk4x.jpg',
    'images/fallback/hubble1x.jpg',
    'images/fallback/hubble2x.jpg',
    'images/fallback/hubble3x.jpg',
    'images/fallback/hubble4x.jpg',
    'images/fallback/ISS1x.jpg',
    'images/fallback/ISS2x.jpg',
    'images/fallback/ISS3x.jpg',
    'images/fallback/ISS4x.jpg',
    'images/fallback/mercury1x.jpg',
    'images/fallback/mercury2x.jpg',
    'images/fallback/mercury3x.jpg',
    'images/fallback/mercury4x.jpg',
    'images/1x/asteroids.webp',
    'images/1x/astronaut.webp',
    'images/1x/earth.webp',
    'images/1x/spacewalk.webp',
    'images/1x/hubble.webp',
    'images/1x/ISS.webp',
    'images/1x/mercury.webp',
    'images/2x/asteroids.webp',
    'images/2x/astronaut.webp',
    'images/2x/earth.webp',
    'images/2x/spacewalk.webp',
    'images/2x/hubble.webp',
    'images/2x/ISS.webp',
    'images/2x/mercury.webp',
    'images/3x/asteroids.webp',
    'images/3x/astronaut.webp',
    'images/3x/earth.webp',
    'images/3x/spacewalk.webp',
    'images/3x/hubble.webp',
    'images/3x/ISS.webp',
    'images/3x/mercury.webp',
    'images/4x/asteroids.webp',
    'images/4x/astronaut.webp',
    'images/4x/earth.webp',
    'images/4x/spacewalk.webp',
    'images/4x/hubble.webp',
    'images/4x/ISS.webp',
    'images/4x/mercury.webp',
    'images/gallery/crop-nasa-astrohelmLx16x9.webp',
    'images/gallery/crop-nasa-astrohelmLx16x9.jpg',
    'images/gallery/crop-nasa-astrohelmMx16x9.webp',
    'images/gallery/crop-nasa-astrohelmMx16x9.jpg',
    'images/gallery/crop-nasa-astrohelm1x1.webp',
    'images/gallery/crop-nasa-astrohelm1x1.jpg',
    'images/gallery/crop-nasa-astrohelm9x16.webp',
    'images/gallery/crop-nasa-astrohelm9x16.jpg',
    'images/gallery/crop-nasa-geneapolloLx16x9.webp',
    'images/gallery/crop-nasa-geneapolloLx16x9.jpg',
    'images/gallery/crop-nasa-geneapolloMx16x9.webp',
    'images/gallery/crop-nasa-geneapolloMx16x9.jpg',
    'images/gallery/crop-nasa-geneapollo1x1.webp',
    'images/gallery/crop-nasa-geneapollo1x1.jpg',
    'images/gallery/crop-nasa-geneapollo9x16.webp',
    'images/gallery/crop-nasa-geneapollo9x16.jpg',
    'images/gallery/crop-nasa-hurricaneLx16x9.webp',
    'images/gallery/crop-nasa-hurricaneLx16x9.jpg',
    'images/gallery/crop-nasa-hurricaneMx16x9.webp',
    'images/gallery/crop-nasa-hurricaneMx16x9.jpg',
    'images/gallery/crop-nasa-hurricane1x1.webp',
    'images/gallery/crop-nasa-hurricane1x1.jpg',
    'images/gallery/crop-nasa-hurricane9x16.webp',
    'images/gallery/crop-nasa-hurricane9x16.jpg',
    'images/gallery/crop-nasa-satellitecloudLx16x9.webp',
    'images/gallery/crop-nasa-satellitecloudLx16x9.jpg',
    'images/gallery/crop-nasa-satellitecloudMx16x9.webp',
    'images/gallery/crop-nasa-satellitecloudMx16x9.jpg',
    'images/gallery/crop-nasa-satellitecloud1x1.webp',
    'images/gallery/crop-nasa-satellitecloud1x1.jpg',
    'images/gallery/crop-nasa-satellitecloud9x16.webp',
    'images/gallery/crop-nasa-satellitecloud9x16.jpg',
    'manifest.json',
    'scripts/connection.js',
    'scripts/home.js',
    'scripts/apod.js',
    'scripts/landsat.js',
    'scripts/neo.js',
    'scripts/gallery.js',
    'scripts/settings.js',
    'styles/styles.css'
];
const CACHE_URLS_2G = ['index.html',
    'apod.html',
    'gallery.html',
    'landsat.html',
    'neo.html',
    'settings.html',
    'styles/images/Banner_Starfield.jpg',
    'manifest.json',
    'scripts/connection.js',
    'scripts/home.js',
    'scripts/apod.js',
    'scripts/landsat.js',
    'scripts/neo.js',
    'scripts/gallery.js',
    'scripts/settings.js',
    'styles/styles.css'
];

//add all URLs to cache when installed
self.addEventListener("install", function(event) {
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log("Cache opened");
            if (type) {
                switch (type) {
                    case "4g":
                        return cache.addAll(CACHE_URLS);
                    default:
                        return cache.addAll(CACHE_URLS_2G);
                }
            }
            //add all URLs to cache


            return cache.addAll(CACHE_URLS);
        })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith('NASA-API-') && CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercept any network requests
self.addEventListener("fetch", function(event) {

    // We have intercepted a fetch request, how should we respond?
    // -> If we have a match for the resource in our cache, respond with it!
    // -> Otherwise, return an "outside" fetch request for it (try to go to the network to get it)

    event.respondWith(
        caches.match(event.request).then(function(response) {

            // Did we find a match for this request in our caches?
            if (response) {
                // Yes, return it from the cache
                console.log(`Returning ${event.request.url} from cache!`);
                return response;
            }

            // No, so return an outside fetch request for it (go to network)
            console.log(`Sorry, ${event.request.url} not found in cache`);
            return fetch(event.request);
        })
    );
});