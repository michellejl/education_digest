<!-- JAVASCRIPT to clear search text when the field is clicked -->

$(function() {
  $("#tfq2b").click(function() {
    if ($("#tfq2b").val() == "Search our website"){
      $("#tfq2b").val(""); 
    }
  });
});
