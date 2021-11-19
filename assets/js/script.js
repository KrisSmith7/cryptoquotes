var qContainer = document.querySelector("#quote-container")
var happiness = "happiness"
var wisdom = "wisdom"

function displayQuote(data){
    var x = Math.floor(Math.random() * 100)
    console.log(x)
    if (x < 50 ){
        var chooseText = "happiness"
        var quoteURL = "https://api.quotable.io/random?tags=" + chooseText
        fetch (quoteURL)
        .then (function (response){
            return response.json()
        })
        .then (function(data){
            var quoteText = data.content;
            var quoteEl = document.createElement("p")
            quoteEl.innerText = "Make that money! -- " + quoteText
            qContainer.appendChild(quoteEl)
    
        })
    } else {
        var chooseText = "wisdom" 
        var quoteURL = "https://api.quotable.io/random?tags=" + chooseText
        
        fetch (quoteURL)
        .then (function (response){
            return response.json()
        })
        .then (function(data){
            console.log(data.content);
            var quoteText = data.content;
            var quoteEl = document.createElement("p")
            quoteEl.innerText = "Make that money! -- " + quoteText
            qContainer.appendChild(quoteEl)
        })
    };
};  

displayQuote();