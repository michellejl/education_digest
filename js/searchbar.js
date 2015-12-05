<!-- JAVASCRIPT to clear search text when the field is clicked -->

$(function() {
  $("#searchTerm").click(function() {
    if ($("#searchTerm").val() == "Search our website"){
      $("#searchTerm").val(""); 
    }
  });
});
