


// catch enter code in search form in front page
$(redirect()  {
  $('#tfq2b').keyup(function (e) {
      var str = $('#tfq2b').val();
      var url = "google.com/search?q=" + str;           // redirect the url to where you want it to be
      if (e.keyCode == 13) {
          location.href = url;
      }
  });
)});