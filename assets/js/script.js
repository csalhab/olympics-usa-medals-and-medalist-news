//DEPENDENCIES =================================================================
var searchBtn = $("#search-usa-medalist");


//DATA =========================================================================

//FUNCTIONS ====================================================================
function searchNews(searchTerm) {

    constructedNEWSURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=GGFWJmCqMq0NCTFkqwJ3PAgGRrCDZmlJ"
    fetch(constructedNEWSURL, {
        method: "GET", //GET is the default.
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("===== SEARCH RESULTS: =====");
            console.log(data);
        })
        .catch(function (err) {
            alert("Please make sure you entered a search term.");

        });

}

//USER INTERACTIONS ============================================================

//INITIALIZATION ===============================================================
searchBtn.on("click", function(event){
    event.preventDefault();
    var searchBtnInput = $("#searchInput").val()
    if (searchBtnInput) {
        searchNews(searchBtnInput);
    } else {
        alert("Please enter a search term.");
    }
});

//get query string param from url
//console.log(window.location.search);
var queryStringParam = window.location.search;
if (queryStringParam) {
    var queryPair = queryStringParam.split("?");
    //console.log(queryPair);
    var queryKeyValue = queryPair[1].split("=");
    //console.log(queryKeyValue);
    console.log("queryKeyValue[0]: " + queryKeyValue[0]);
    console.log("queryKeyValue[1]: " + queryKeyValue[1]);
}
