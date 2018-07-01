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




