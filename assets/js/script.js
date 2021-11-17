// coinbase api url
// https://api.coinbase.com/v2/prices/:currency_pair

// quotable io url 
// https://api.quotable.io/random?tags=

var userForm = document.querySelector("#user-form");

function submitHandler(currency, amount, date) {
    event.preventDefault();

    var currency = document.querySelector("#currency").value;
    var amount = document.querySelector("#amount").value;
    var date = document.querySelector("#date").value;

    console.log(currency, amount, date);

}

$("#date").datepicker();
userForm.addEventListener("submit", submitHandler);