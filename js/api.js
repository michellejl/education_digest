
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
var pageHTML;


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
			prop:'extracts|images',
			format:'json'
		},
	})
	.done(function(data) {
		console.log("success");
		console.log(data.query);
		//pulls the html from the search results and saves it as pageHTML and firstParagraph variables
		var pages = data.query.pages
		var results = $.map(pages, function(value, index) {
			return [value];
		})[0]
		pageHTML = results.extract;
		var images = results.images;

		if(images) {
			setTimeout(function() {
				getImages(images[0].title);
		}, 200);


		}

		console.log(images)
		var pageHTML = pageHTML.slice(0,pageHTML.indexOf('<h2>'));
		$('.headline .container h1').html(search);
		$('#about .featurette-heading').html(search);
		$('#about .lead').html(pageHTML);

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
			$('#services .featurette-heading').html(searchTerms[1]);
			$('#contact .featurette-heading').html(searchTerms[2]);
			var newHTML = hideKeywords(pageHTML, searchTerms.slice(1));
			 $('#about .lead').html(newHTML);
		}).fail(function() {
			console.log("error");
		});
	}).fail(function() {
		console.log("error");
	});
	
}

function hideKeywords(html, keywords) {
	for(var i=0;i<keywords.length;i++) {
		var keyword = keywords[i];
		html = html.replace(keyword, "<span class='keyword'>" + keyword + "</span>")
	}
	return html
}

$('body').on('click', '.keyword', function(event) {
	console.log(event.target);
	event.target.className = "";
})

function getImages(imageName) {

	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			action:'query',
			titles:imageName,
			prop:'imageinfo',
			iiprop:'url',
			format:'json'
		},
	})
	.done(function(data) {
		console.log(data.query.pages["-1"].imageinfo[0].url);
		var imageUrl = data.query.pages["-1"].imageinfo[0].url;
		$('.featurette-image').attr('src', imageUrl);
	});
}