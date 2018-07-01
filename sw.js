let staticCacheName = 'currency-converter';

//Register Service  Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('app/sw.js').then(( reg)=> console.log("service worker successfully registered!", reg)
    ).catch( err => console.log('Error while trying to register service worker', err)
    );
}

//Use Cache Api

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then( cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles/main.css',
                '/app/sw.js',
                '/app/app.js',
                '/images/favicon.ico',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
                'https://free.currencyconverterapi.com/api/v5/currencies'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {

    console.log(event.request.url);

    event.respondWith(

        caches.match(event.request).then( response => {

            return response || fetch(event.request);

        })

    );

});


//Indexdb Here
const dbname = "Currency-Converterdb";

// Open  the database
var open = indexedDB.open(dbname, 1);

// Create the schema
open.onupgradeneeded = () => {
    let db = open.result;
    let store = db.createObjectStore("CurrencyConverter", { keyPath: "id" });
    let index = store.createIndex("CurrencyNameIndex", ["Currency.CurrencyName", "Currency.CurrencySymbol"]);
};

open.onsuccess = () => {
    // Start a new transaction
    let db = open.result;
    let tx = db.transaction("CurrencyConverter", "readwrite");
    let store = tx.objectStore("CurrencyConverter");
    let index = store.index("CurrencyNameIndex");

    // Add some data
    store.put({ id: "ALL", Currency: { CurrencyName: "Albanian Lek", CurrencySymbol: "ALL" } });
    store.put({ id: "$", Currency: { CurrencyName: "East Caribbean Dollar", CurrencySymbol: "$" } });
    store.put({ id: "$", Currency: { CurrencyName: "EasT", CurrencySymbol: "$" } });
    store.put({ id: "EUR", Currency: { currencyName: "Euro", CurrencySymbol: "€" } });
    store.put({ id: "NGN", Currency: { CurrencyName: "Nigerian Naira", CurrencySymbol: "₦" } });
    store.put({ id: "$", Currency: { CurrencyName: "United States Dollar", CurrencySymbol: "$" } });
    store.put({ id: "$", Currency: { CurrencyName: "Australian Dollar", CurrencySymbol: "$" } });
    store.put({ id: "CNY", Currency: { CurrencyName: "Chinese Yuan", CurrencySymbol: "¥" } });
    store.put({ id: "CRC", Currency: { CurrencyName: "Costa Rican Colon", CurrencySymbol: "₡" } });
    store.put({ id: "SYP", Currency: { CurrencyName: "Syrian Pound", CurrencySymbol: "£" } });
    store.put({ id: "AWG", Currency: { CurrencyName: "Aruban Florin", CurrencySymbol: "ƒ" } });
    store.put({ id: "INR", Currency: { CurrencyName: "Indian Rupee", CurrencySymbol: "₹" } });

    // Close the db when the transaction is done
    tx.oncomplete = () => {
        db.close();
    }
}
