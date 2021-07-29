//DEPENDENCIES =================================================================
var searchBtn = $("#search-usa-medalist");


//DATA =========================================================================

//FUNCTIONS ====================================================================


//USER INTERACTIONS ============================================================

//INITIALIZATION ===============================================================
searchBtn.on("click", function(event){
    console.log("search button clicked, working");
    event.preventDefault();
});

//get query string param from url
//console.log(window.location.search);
var queryStringParam = window.location.search;
var queryPair = queryStringParam.split("?");
//console.log(queryPair);
var queryKeyValue = queryPair[1].split("=");
//console.log(queryKeyValue);
console.log("queryKeyValue[0]: " + queryKeyValue[0]);
console.log("queryKeyValue[1]: " + queryKeyValue[1]);