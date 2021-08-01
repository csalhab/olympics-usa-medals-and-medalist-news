//DEPENDENCIES =================================================================
var searchBtn = $("#search-usa-medalist");
var newsSection = $("#news-section");
var newsHeading = $("#news-subheading");

var articlesArray = [];

//DATA =========================================================================

//FUNCTIONS ====================================================================
async function searchNews(searchTerm) {
	constructedNEWSURL =
		"https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
		searchTerm +
		"&api-key=GGFWJmCqMq0NCTFkqwJ3PAgGRrCDZmlJ";

	var data = await fetch(constructedNEWSURL, {
		method: "GET", //GET is the default.
		credentials: "same-origin", // include, *same-origin, omit
		redirect: "follow", // manual, *follow, error
	}).then(function (response) {
		return response.json();
	});

	extractAndStoreNYTData(data);

	// Display news results for "searched word"
	newsHeading.text(`Showing results for ${searchTerm}`);
}

function extractAndStoreNYTData(NYTData) {
	//extract headline and link to story
	for (var i = 0; i < NYTData.response.docs.length; i++) {
		var snippet = NYTData.response.docs[i].snippet;
		var web_url = NYTData.response.docs[i].web_url;
		articlesArray.push({ headline: snippet, storyLink: web_url });
	}

	//save in localstorage
	localStorage.setItem("articlesArray", JSON.stringify(articlesArray));

	// Display from local storage
	getArticlesArrayFromLocalStorage();
}

function getArticlesArrayFromLocalStorage() {
	var lastArticles = JSON.parse(localStorage.getItem("articlesArray"));

	// Display the searched result
	displayNewsArticles(lastArticles);
	// return lastArticles;
}

// Create news articles elements
function createNewsElements(articleObject) {
	// Create
	var articleEl = $("<article class='row'>");
	var divColEl = $("<div class='col s12'>");
	var divCardEl = $("<div class='card blue'>");
	var divCardContentEl = $("<div class='card-content white-text'>");
	var spanCardTitleEl = $("<span class='card-title'>"); // Add article partial title here
	var pCardLinkEl = $("<p>"); // Add article full header text here
	var aCardLinkEl = $("<a target='_blank' class='black-text'>"); // Add article link here
	var hrEl = $("<hr>");

	// Build
	spanCardTitleEl.text(articleObject.headline.slice(0, 30) + "...");
	pCardLinkEl.text(articleObject.headline);
	aCardLinkEl.attr("href", articleObject.storyLink);
	aCardLinkEl.text(articleObject.storyLink);

	// Place
	divCardContentEl.append(spanCardTitleEl);
	divCardContentEl.append(pCardLinkEl);
	divCardContentEl.append(aCardLinkEl);
	divCardContentEl.append(hrEl);
	divCardEl.append(divCardContentEl);
	divColEl.append(divCardEl);
	articleEl.append(divColEl);
	newsSection.append(articleEl);
}

// Using loop, display news articles on DOM
function displayNewsArticles(newsArticlesArray) {
	// Ensure the news array was provided, else don't proceed
	if (!newsArticlesArray) return;

	// Empty out the already displayed results before loading up new ones
	newsSection.html("");

	// Loop through news
	for (var i = 0; i < newsArticlesArray.length; i++) {
		var currentNewsObject = newsArticlesArray[i];

		// Call the create article function to display current article on DOM
		createNewsElements(currentNewsObject);
	}
}

//USER INTERACTIONS ============================================================
// When a user makes a search request
searchBtn.on("click", function (event) {
	event.preventDefault();
	var searchBtnInput = $("#searchInput").val();
	if (searchBtnInput) {
		// Run the search function with users input as value
		searchNews(searchBtnInput);

		// Clearout the search box
		$("#searchInput").val("");
	} else {
		var elems = document.querySelector("#modal1");
		var startingTop = 100;
		var instance = M.Modal.init(elems, startingTop);
		instance.open();
	}
});

//INITIALIZATION ===============================================================
//get query string param from url
var queryStringParam = window.location.search;
if (queryStringParam) {
	var queryPair = queryStringParam.split("?");
	var queryKeyValue = queryPair[1].split("=");
}

// Display the latest searched news articles from local storage
getArticlesArrayFromLocalStorage();
