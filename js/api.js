
function debug(message) {
	if(debugging) {
		console.log(message);
	}
}
var search = "Noble gas"
var searchMod = search.replace(" ", "_");
var keywordUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords"
var wikiUrl = "https://en.wikipedia.org/wiki/" + searchMod;
var debugging = false;
var searchTerms;
var searchData = []

var searchTerm;
var searchUrl;

$('input').autocomplete({
  minLength: 2,
  source: function(request, response) {
    $.ajax({
      url: "http://en.wikipedia.org/w/api.php",
      dataType: "jsonp",
      data: {
        'action': "opensearch",
        'format': "json",
        'search': request.term
      },
      success: function(data) {
        response(data[1]);
        console.log(data);
        searchTerm = data[1][0];
      }
    });
  },
  select: function(event, ui) {
    console.log(searchData);
        updatePage(searchTerm);

  }
}).appendTo('#search');

function updatePage(search) {

	searchMod = search.replace(" ", "_");
	keywordUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords"
	wikiUrl = "https://en.wikipedia.org/wiki/" + encodeURI(search)
//call to wikipedia to get page content
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			action:'query',
			titles:searchMod,
			prop:'extracts',
			format:'json'
		},
	})
	.done(function(data) {
		console.log("success");

		//pulls the html from the search results and saves it as pageHTML and firstParagraph variables
		var pages = data.query.pages
		var pageHTML = $.map(pages, function(value, index) {
			return [value];
		})[0].extract;
		console.log(pageHTML);
		var firstParagraph = pageHTML.slice(0,pageHTML.indexOf("</p>") + 4);
		$('.headline .container h1').html(search)
		$('#about .featurette-heading').html(search)
		$('#about .lead').html(firstParagraph);
	}).fail(function() {
		console.log("error");
	});



// calls the keyword api to get a list of related keywords
	$.ajax({
		url: keywordUrl,
		type: 'GET',
		dataType: 'json',
		data: {
			"url": wikiUrl,
			"apikey":"0fd7fecb7d2d5c5a696b179312c6023f112956bd",
			"outputMode":"json"
		},
	})
	.done(function(data) {

		//loop through the word list and eliminate redundant searches
		var wordList = search.split(" ");
		var searchTerms = [];
		searchTerms.push(search);
		console.log("success");
		var keywords = data.keywords;
		console.log(data)
		keywords.filter(function(obj, index) {
			var arr = obj.text.split(" ");
			var match = false;
			for(var i=0;i<wordList.length;i++) {
				for(var j=0;j<arr.length;j++) {
					debug(wordList[i].toLowerCase(), arr[j].toLowerCase());
					if(wordList[i].toLowerCase() === arr[j].toLowerCase()) {
						match = true;
						debug(match)
					}
				}
			}
			if(!match) {
				var wordsToAdd = obj.text.split(" ")
				searchTerms.push(obj.text);

				for(var i=0;i<wordsToAdd.length;i++) {
					wordList.push(wordsToAdd[i]);
				}
				debug(wordList);
			}
		})
		console.log(searchTerms);

	}).fail(function() {
		console.log("error");
	});

}

//Begin Giphy Code

var searchGiphy = "";
// grace hopper example search terms:  searchTerms = ["Grace&Hopper", "United&States&Navy", "programming&languages", "New&York", "active&duty", "Defense&Distinguished&Service", "Naval&Support&Activity", "Government&Technology&Leadership"];
//noble gases example search terms
	// searchTerms =["Noble gas", "helium", "xenon", "argon", "monatomic gases", "krypton", "chemical"]
//Portland example search terms
	// searchTerms = ["Portland, Oregon", "Portland", "city", "United States", "Willamette River", "West Hills"]
//Programming example search terms 
	searchTerms = ["Computer programming", "source code", "software development", "machine language", "different assembly languages", "final program takes.", "punched cards", "low-level hardware control", "data processing industry", "unit record"];

function searchGIF() {
	for(i = 0; i < searchTerms.length; i++) {
		searchGiphy = searchTerms[i];
		imageSearch(searchGiphy);
	}
}

function  imageSearch(searchGiphy) {
	  // testing invalid search += "grr";
	var url = 'http://api.giphy.com/v1/stickers/search?q='+searchGiphy+'&api_key=dc6zaTOxFJmzC'

	//ajax callback to access Giphy API

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		data: {limit: '1'},
		success: function(jsonData) {
			// console.log(jsonData);
			//getting first gif (data is part of array for search term- fixed height) and isolate image from data to display
			console.log(jsonData.data[0]);
			//if url isn't valid/no results change url to next term until result is found- IN PROGRESS
				// for(i = 0; i < searchTerms.length ; i++){
				// 	console.log(searchTerms[i])
				// if(jsonData.data[0] === undefined) {
				// 	console.log(search + "SEARCH TERM");
				// 	console.log("URL"+ url);
				// 	search = searchTerms[i];
				// 	url = 'http://api.giphy.com/v1/stickers/search?q='+search+'&api_key=dc6zaTOxFJmzC';
				// 	console.log("New URL" + url);
				// 	console.log("New Data" + " " + url.jsonData.data);
				// } else {
				// 	console.log("valid")
				// }
			// }
			gif = jsonData.data[0].images.fixed_height.url;
			console.log(gif + "THIS IS THE GIFURL")
			//if gif is undfined- change search term 
			//put gifey on page
			$(".giphySpot").append("<img src=" + gif + ">" )
		}
	})
	.done(function() {
		console.log("gif retrival success");
		})
	.fail(function() {
		console.log("gif retrival error");
	})
	.always(function() {
		console.log("gif retrival complete");
	});
}
  
//$(#searchButton).click(function(searchGIF()}));/
searchGIF();