// var term1 = "grace";
// var term2 = "hopper";
// var term3= "";

var search = "cat";
$.ajax({
	url: 'http://api.giphy.com/v1/stickers/search?q='+search+'&api_key=dc6zaTOxFJmzC',
	type: 'GET',
	dataType: 'json',
	data: {limit: '1'},
	success: function(jsonData) {
		console.log(jsonData);
		//getting first gif (data is part of array for search term- fixed height)
		gif = jsonData.data[0].images.fixed_height.url;
		console.log(gif);
		//put gifey on page
		$(".giphySpot").html("<img src=" + gif + ">" )
	}
})

//change search term to var  - take search term from header
//isolate image from data to display
.done(function() {
	console.log("success");
	})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});

//use inner html to display image on page