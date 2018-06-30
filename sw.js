// importScripts('/currencyconverterapp/serviceworker-cache-polyfill.js');


if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('app/sw.js').then((reg) => console.log("service worker successfully registered!")
).catch((err) => console.log('Error while trying to register service worker')
);
}

// importScripts('/currencyconverterapp/serviceworker-cache-polyfill.js');


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('currencyconverter').then((cache) => {
            return cache.addAll([
                '/currencyconverterapp',
                '/currencyconverterapp/index.html',
                '/currencyconverterapp/styles/main.css',
                '/currencyconverterapp/app/sw.js',
                '/currencyconverterapp/app/app.js',
                '//currencyconverterappimages/favicon.ico'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
   console.log(event.request.url);
                  event.respondWith(
                caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
            })
        );
});
