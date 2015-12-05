$.ajax({
	url: 'http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC',
	type: 'GET',
	dataType: 'json',
	data: {images: 'fixed_height'},
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