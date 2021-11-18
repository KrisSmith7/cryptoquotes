var qContainer = document.querySelector("#quote-container")
var happiness = "happiness"
var wisdom = "wisdom"
var x = Math.floor(Math.random() * 100)
console.log(x)

{
if (x < 50 ){
    var chooseText = "happiness"
} else {
    var chooseText = "wisdom" }
}

    var quoteURL = "https://api.quotable.io/random?tags=" + chooseText
    
    
    fetch (quoteURL)
    .then (function (response){
        console.log(response);
        return response.json()
    })
    .then (function(data){
        console.log(data);
    });


function displayQuote (data){
var quoteText = data.content;
var quoteEl = document.createElement("p")
quoteEl.innerText = "Make that money! -- " + quoteText
qContainer.appendChild(quoteEl)
}


displayQuote();