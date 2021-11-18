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
var currentCoin;
var userCoin;

var currentCoinResult;
var userCoinResult;

// var test = {data: {amount: 1}};

// takes info from user input and passes through to fetch request
function submitHandler(event,currency, amount, date) {
    event.preventDefault();



    var currency = document.querySelector("#currency").value;
    var amount = document.querySelector("#amount").value;
    var date = document.querySelector("#date").value;
    var formatDate = date.split("/");

    var userInput ={
        currencyInput:currency,
        buyDay: formatDate[1],
        buyMonth: formatDate[0],
        buyYear: formatDate[2],
    }


    console.log(currency, amount, date);
console.log(userInput);


console.log(currentApiCall(userInput))
 console.log(userApiCall(userInput))

  
        
};

function currentApiCall(input){
    var url = "https://api.coinbase.com/v2/prices/" + input.currencyInput + "-USD/spot";
    fetch(url)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then( result => console.log(result)
            );
            } else {
                // populate error area? 
            }
        })
        .catch(function(error) {
            
            // populate error with unable to connect to coinbase
        });    
}

function userApiCall(input){
var url = "https://api.coinbase.com/v2/prices/" + input.currencyInput + "-USD/spot?date=" + input.buyYear + "-" + input.buyMonth + "-" + input.buyDay;
fetch(url)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(result) {
              return result;

        });
        
        } else {
            // populate error area? 
        }
    })
    .catch(function(error) {
    //    populate error div with unable to connect to coinbase
    });    
}

function getCurrentPrice(input) {
    console.log(input);
    var price = input.data.amount;

    console.log(price);
    return price;
}

function getBuyPrice(input) {
    console.log(input);
    var price = input.data.amount;
    
    console.log(price);
    return price;
}


function gainOrLoss(a,b) {
    console.log(a)
    console.log(b)
    // var buyPrice = getBuyPrice(userCoin);
    // console.log(buyPrice);

    // var currentPrice = getCurrentPrice(currentCoin);
    // console.log(currentPrice);

}




$("#date").datepicker();
userForm.addEventListener("submit", submitHandler);




