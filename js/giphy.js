var search = "";
// grace hopper example search terms:  searchTerms = ["Grace&Hopper", "United&States&Navy", "programming&languages", "New&York", "active&duty", "Defense&Distinguished&Service", "Naval&Support&Activity", "Government&Technology&Leadership"];
//noble gases example search terms
	// searchTerms =["Noble gas", "helium", "xenon", "argon", "monatomic gases", "krypton", "chemical"]
//Portland example search terms
	// searchTerms = ["Portland, Oregon", "Portland", "city", "United States", "Willamette River", "West Hills"]
//Programming example search terms 
	searchTerms = ["Computer programming", "source code", "software development", "machine language", "different assembly languages", "final program takes.", "punched cards", "low-level hardware control", "data processing industry", "unit record"];


function searchGIF() {
	for(i = 0; i < searchTerms.length; i++) {
		search = searchTerms[i];
		imageSearch(search);
	}
}

function  imageSearch(search) {
	  // testing invalid search += "grr";
	var url = 'http://api.giphy.com/v1/stickers/search?q='+search+'&api_key=dc6zaTOxFJmzC'

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
  
//$(target).click(function(searchGIF()}));/
searchGIF();