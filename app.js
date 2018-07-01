const populateCurrency = () => {
    const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
    fetch(url).then((response) => response.json()
    )
    .then( body => {
        let sortCurrency = [];
        for (const data in body.results) {
            //sortCurrency.push(data);
           // let sortedArray = sortCurrency.sort();
            console.log(data);
            // for (let i = 0; i < sortedArray.length; i++) {
            //     const element = sortedArray[i];
                
            // }
            let fromCurrency = document.getElementById("fromCurrency");
            let toCurrency = document.getElementById("toCurrency");
            let toOption = document.createElement("OPTION");
            let fromOption = document.createElement("OPTION");
            //Set  Name in Text part.
            toOption.innerHTML = `${body.results[data].currencyName} (${data})`;
            fromOption.innerHTML = `${body.results[data].currencyName} (${data})`;
            //Set id in Value part.
            toOption.value = data;
            fromOption.value = data;
            //Add the fromOption and toOption element to DropDownList.
            fromCurrency.add(fromOption);
            toCurrency.add(toOption);
        }
        console.log(body);
    })

}
populateCurrency();



const getData = () => {
    let amount = parseInt(document.querySelector('#amount').value);
    let fromCurrency = document.querySelector('#fromCurrency').value;;
    let toCurrency = document.querySelector('#toCurrency').value;
    let result = document.querySelector('#process');

    //alert(amount,fromCurrency,toCurrency);
    convertCurrency(amount, fromCurrency, toCurrency, (err, amt) => {
        result.value = amt;
        console.log("Result is " + amount);
    });
    document.getElementById('amount').value = '';
 


};


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
}



