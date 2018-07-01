let staticCacheName = 'currency-converter';

//Register Service  Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then( reg => console.log("service worker successfully registered!", reg)
    ).catch( err => console.log('Error while trying to register service worker', err)
    );
}

//Use Cache Api

const convertCurrency = (amount, fromCurrency, toCurrency, cb) => {
    let validate;
    validate = document.getElementById('amount').value;
    if (isNaN(validate) || validate === "") {
        document.getElementById("amount").style.border = "1px solid red";
        document.getElementById("amount").value = "Enter amount";

    }
    else {
        let convert = "converting..."
        document.getElementById('process').value = convert;
        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        const query = fromCurrency + '_' + toCurrency;
        const url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra';
        fetch(url).then((response) => {
            return response.json();
        })
            .then((body) => {
                try {
                    let jsonObj = body;

                    let val = jsonObj[query];
                    if (val) {
                        var total = val * amount;
                        cb(null, Math.round(total * 100) / 100);
                    } else {
                        var err = new Error("Value not found for " + query);
                        console.log(err);
                        cb(err);
                    }
                } catch (e) {
                    console.log("Parse error: ", e);
                    cb(e);
                }
                console.log(body)
            })

    }
    self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then( cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/main.css',
                '/sw.js',
                '/app.js',
                '/favicon.ico',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
                'https://free.currencyconverterapi.com/api/v5/currencies',
                'https://free.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra'
            ]);
        })
    );
});
}




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
