// coinbase api url
// https://api.coinbase.com/v2/prices/:currency_pair/spot

// quotable io url 
// https://api.quotable.io/random?tags=

// function to fetch api requests > 
    // function to get buy price at user date > 
    // function to get current price 
        // function to compare the two and get 'good vs. bad'
            // good/bad fetch request to new api for quote
                // populate quote with generated html

var userForm = document.querySelector("#user-form");

function submitHandler(currency, amount, date) {
    event.preventDefault();

    var currency = document.querySelector("#currency").value;
    var amount = document.querySelector("#amount").value;
    var date = document.querySelector("#date").value;
    var formatDate = date.split("/");
    var buyDay = formatDate[2];
    var buyMonth = formatDate[1];
    var buyYear = formatDate[3];

    console.log(currency, amount, date);

    var currentCoin = "https://api.coinbase.com/v2/prices/:" + currency + "_USD/spot";
    var userCoin = "https://api.coinbase.com/v2/prices/:" + currency + "_USD/spot?date=" + buyYear + "-" + buyMonth + "-" + buyDay;

    


}



$("#date").datepicker();
userForm.addEventListener("submit", submitHandler);