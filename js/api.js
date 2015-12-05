
function debug(message) {
	if(debugging) {
		console.log(message);
	}
}
var search = "Grace Hopper"
var searchMod = search.replace(" ", "_");
var keywordUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords"
var wikiUrl = "https://en.wikipedia.org/wiki/" + searchMod;
var debugging = false;
var searchTerms;

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
	debug(pageHTML);
	var firstParagraph = pageHTML.slice(0,pageHTML.indexOf("</p>") + 4);
	$('#about .featurette-heading').html(search)
	$('#about .lead').html(firstParagraph);
}).fail(function() {
	console.log("error");
});




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
	var wordList = search.split(" ");
	var searchTerms = [];
	console.log("success");
	var keywords = data.keywords;
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
