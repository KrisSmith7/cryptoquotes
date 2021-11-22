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
var cryptoDisplay = document.querySelector("#cryptodata");
var formDiv = document.querySelector("#form")
var buySpotOut = document.getElementById("buySpot");
var priceSpotOut = document.getElementById("priceSpot");
var differenceOut = document.getElementById("difference")
var dateSpotOut = document.getElementById("dateSpot")

var currentCoin;
var userCoin;

var currentCoinResult;
var userCoinResult;

var priceSpot = [];
var buySpot = [];



var down = ["Oof...That's not good.", "Uh Oh...Time to get a second job!", 
            "HAHA...If I don't laugh, I'll cry.", "Wow, that didn't go as planned!", 
            "Oy vey..", "Looks like it's ramen for a week.", 
            "I should have heeded the warnings.", ">.<", 
            "TikTok made it look so easy...", "Maybe I should donate blood."];

var up = ["HECK YEAH!!", "Let's get that bread!", 
          "Make that money!", "And they said I couldn't do it!", 
          ":O", "Steak for dinner!", 
          "One, two, and a lambo for you!", "Hey look, mom, I made it!",
          "Man, I wish I had a friend like me!", "High roller, comin' through!"];


// takes info from user input and passes through to fetch request
function submitHandler(event,currency, amount, date) {
    event.preventDefault();
    
    if (document.querySelector("#error-el")) {
        document.querySelector("#error-el").remove();
    }

    formDiv.classList.add("border-blue-900");
    formDiv.classList.add("bg-blue-100");

    var currencyLabel = document.querySelector("#currency-label");
    var currencyEl = document.querySelector("#currency");
    var amountEl = document.querySelector("#amount");
    var dateEl = document.querySelector("#date");

    if (!currencyEl.value || !amountEl.value || !dateEl.value) {
        formDiv.classList.remove("border-blue-900");
        formDiv.classList.remove("bg-blue-100");
        formDiv.classList.add("border-red-700");
        formDiv.classList.add("bg-red-300");
        
        
        var errorEl = document.createElement("p");
        errorEl.id = "error-el"
        errorEl.classList.add("text-red-700")
        errorEl.textContent = "You must enter a valid cryptocurrency, date, and amount to generate a quote."

        userForm.insertBefore(errorEl, currencyLabel)
        return;
        
    }




    var currency = currencyEl.value;
    var amount = amountEl.value;
    var date = dateEl.value;
    var formatDate = date.split("/");

    var userInput ={
        currencyInput: currency,
        amountInput: amount, 
        buyDay: formatDate[1],
        buyMonth: formatDate[0],
        buyYear: formatDate[2],
    }
    localStorage.setItem("userInput", JSON.stringify(userInput));
   
    priceGrab(userInput);
    displayQuote();
    gainOrLoss();
    document.getElementById("user-form").reset();
};

function priceGrab(userInput) {
    var priceSpot = currentApiCall(userInput);
    var buySpot = userApiCall(userInput);

    //priceCompare(priceSpot, buySpot);
}

//function priceCompare(now, then) {
    //console.log(now);
    //console.log(then);

//}


function currentApiCall(input){
    setTimeout(function(){ 
    var url = "https://api.coinbase.com/v2/prices/" + input.currencyInput + "-USD/spot";
    fetch(url)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then( function(result) {
                    var priceSpot = getCurrentPrice(result);
                    localStorage.setItem("priceSpot", JSON.stringify(priceSpot));
                    return priceSpot;
                    
                    
            }) 
            } else {
                formDiv.classList.remove("border-blue-900");
                formDiv.classList.remove("bg-blue-100");
                formDiv.classList.add("border-red-700");
                formDiv.classList.add("bg-red-300");
                
                
                var errorEl = document.createElement("p");
                errorEl.id = "error-el"
                errorEl.classList.add("text-red-700")
                errorEl.textContent = "Coinbase can't seem to find data for that request. Try again later."
        
                userForm.insertBefore(errorEl, currencyLabel)
                return; 
            }
            // priceSpot = priceSpot;
            //console.log('priceSpot:', priceSpot)
            return priceSpot;
        })
        .catch(function(error) {
            
            formDiv.classList.remove("border-blue-900");
            formDiv.classList.remove("bg-blue-100");
            formDiv.classList.add("border-red-700");
            formDiv.classList.add("bg-red-300");
        
        
            var errorEl = document.createElement("p");
            errorEl.id = "error-el"
            errorEl.classList.add("text-red-700")
            errorEl.textContent = "Wait, is Coinbase down? How am I going to sell my coin!?"

            userForm.insertBefore(errorEl, currencyLabel)
            return;
        });  
        //console.log('priceSpot:', priceSpot)
        return priceSpot;
    

   
        
}, 25) 
}

function userApiCall(input){
    setTimeout(function(){
    var url = "https://api.coinbase.com/v2/prices/" + input.currencyInput + "-USD/spot?date=" + input.buyYear + "-" + input.buyMonth + "-" + input.buyDay;
    fetch(url)
        .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(result) {
              var buySpot = getBuyPrice(result);
              localStorage.setItem("buySpot", JSON.stringify(buySpot));
              return buySpot;

              
              

        });
        
        } else {
            formDiv.classList.remove("border-blue-900");
            formDiv.classList.remove("bg-blue-100");
            formDiv.classList.add("border-red-700");
            formDiv.classList.add("bg-red-300");
                
                
            var errorEl = document.createElement("p");
            errorEl.id = "error-el"
            errorEl.classList.add("text-red-700")
            errorEl.textContent = "Coinbase can't seem to find data for that request. Try again later."
        
            userForm.insertBefore(errorEl, currencyLabel)
            return;  
        }
        return buySpot;
    })
    .catch(function(error) {
        formDiv.classList.remove("border-blue-900");
        formDiv.classList.remove("bg-blue-100");
        formDiv.classList.add("border-red-700");
        formDiv.classList.add("bg-red-300");
    
    
        var errorEl = document.createElement("p");
        errorEl.id = "error-el"
        errorEl.classList.add("text-red-700")
        errorEl.textContent = "Wait, is Coinbase down? How am I going to sell my coin!?"

        userForm.insertBefore(errorEl, currencyLabel)
        return;
    });    
    return buySpot;
    
   
}, 25)
}

function getCurrentPrice(input) {
    var price = input.data.amount;
    priceSpot.push(price);

    return price;
    
}

function getBuyPrice(input) {
    var price = input.data.amount;
    buySpot.push(price);

    return price;
}




// Calculates loss to date and prints information out on page.
 function gainOrLoss() {
     setTimeout(function(){
        var userInput = JSON.parse(localStorage.getItem("userInput"))
        console.log(userInput)
        var amountInput = userInput.amountInput
        var currencyInput = userInput.currencyInput
        var buyDay = userInput.buyDay
        var buyMonth = userInput.buyMonth
        var buyYear = userInput.buyYear
        var buySpot = JSON.parse(localStorage.getItem("buySpot"))    
        var priceSpot = JSON.parse(localStorage.getItem("priceSpot"))
        var difference = (priceSpot * 100 - buySpot * 100) / 100 * amountInput    
        var buySpot = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(buySpot)
        var priceSpot = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(priceSpot)
        dateSpotOut.innerText = "Purchased " + amountInput + " " + currencyInput + " on " + buyDay + "/" + buyMonth + "/" + buyYear
        buySpotOut.innerText = "You bought " + currencyInput + " at $" + buySpot
        priceSpotOut.innerText = "The current value is $" + priceSpot
        
        if(difference < 0) {
            differenceOut.innerText = "Your loss to date is $" + new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(difference) 
        }
   
        if(difference > 0) {
            differenceOut.innerText = "Your gain to date is $" + new Intl.NumberFormat().format(difference) 
        }
     }, 400);
 }



 
$("#date").datepicker({maxDate: "0"});

userForm.addEventListener("submit", submitHandler);



// quotable api call to use.
var happiness = "happiness"
var wisdom = "wisdom"

function displayQuote(){
    setTimeout(function(){
        var buySpot = JSON.parse(localStorage.getItem("buySpot"))
        var priceSpot = JSON.parse(localStorage.getItem("priceSpot"))
        var difference = (priceSpot * 100 - buySpot * 100) / 100    
        if (difference > 0 ){
            var chooseText = "happiness"
            var quoteURL = "https://api.quotable.io/random?tags=" + chooseText
            fetch (quoteURL)
            .then (function (response){
                return response.json()
            })
            .then (function(data){
                console.log(data);
                var quote = up[Math.floor(Math.random() * 10)];
                var quoteText = data.content;
                var quoteEl = document.getElementById("quote")
                quoteEl.innerText = quote +" -- " + quoteText
                var element = document.getElementById("quote-container")
                console.log(element);
                element.classList.remove("bg-gray-200")
                element.classList.remove("bg-red-200")
                element.classList.add("bg-green-200")
            })
        } else {
            var chooseText = "wisdom" 
            var quoteURL = "https://api.quotable.io/random?tags=" + chooseText
        
            fetch (quoteURL)
            .then (function (response){
                return response.json()
            })
            .then (function(data){
                console.log(data);
                var quote = down[Math.floor(Math.random() * 10)];
                var quoteText = data.content;
                var quoteEl = document.getElementById("quote")
                quoteEl.innerText = quote +" -- " + quoteText
                var element = document.getElementById("quote-container")
                console.log(element);
                element.classList.remove("bg-gray-200")
                element.classList.remove("bg-green-200")
                element.classList.add("bg-red-200")
            })
        };
    }, 300);
};
