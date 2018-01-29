window.onload = function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function(data) {
        console.log("heyeyeheyhysyfs" + data)
        // window.location = "/search"
    })
    
$("#scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/articles",
    }).done(function(data) {
        console.log(data)
        renderNews(data)
    })
})
function renderNews(data) {
    if(data.length !== 0) {
        $("#news").empty();
        $("#news").show();
        
        data.forEach(function(result) {
            var div1 = $("<div>").append(
                "<div class ='row'>" +
                "<h1>" + result.title + "</h2>" +
                "</div>"
                );
                
                $("#news").append(div1);
        })
        
      }
    
   }
}