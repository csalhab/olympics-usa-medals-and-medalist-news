//DEPENDENCIES =================================================================
var searchBtn = $("#search-usa-medalist");

var articlesArray = [];


//DATA =========================================================================

//FUNCTIONS ====================================================================
async function searchNews(searchTerm) {

    constructedNEWSURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=GGFWJmCqMq0NCTFkqwJ3PAgGRrCDZmlJ"

    var data = await fetch(constructedNEWSURL, {
        method: "GET", //GET is the default.
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        })
        .then(function (response) {
            return response.json();
        })
 
    extractAndStoreNYTData(data);

}

function extractAndStoreNYTData (NYTData) {

    //extract headline and link to story
    for (var i=0; i < NYTData.response.docs.length; i++) {
        var snippet = NYTData.response.docs[i].snippet;
        var web_url = NYTData.response.docs[i].web_url;
        articlesArray.push({headline: snippet, storyLink: web_url});
    }

    //save in localstorage
    localStorage.setItem("articlesArray", JSON.stringify(articlesArray));

}

function getArticlesArrayFromLocalStorage() {

    var lastArticles = JSON.parse(localStorage.getItem("articlesArray"));
    return lastArticles;
}

//USER INTERACTIONS ============================================================

//INITIALIZATION ===============================================================
searchBtn.on("click", function(event){
    event.preventDefault();
    var searchBtnInput = $("#searchInput").val()
    if (searchBtnInput) {
        searchNews(searchBtnInput);
    } else {
            var elems = document.querySelector("#modal1");
            var startingTop = 100;
            var instance = M.Modal.init(elems, startingTop);
            instance.open();
    }
});

//get query string param from url
var queryStringParam = window.location.search;
if (queryStringParam) {
    var queryPair = queryStringParam.split("?");
    var queryKeyValue = queryPair[1].split("=");
    //console.log("queryKeyValue[0]: " + queryKeyValue[0]);
    //console.log("queryKeyValue[1]: " + queryKeyValue[1]);
}

