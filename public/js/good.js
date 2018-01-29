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
          "<div class='row'>" +
          "<div class='col s10'>" + "<div class='card'>" + "<div class='card-image'>" + "<img src="+ + ">" + 
          "</div>" +
          "<div class='card-stacked'>" + "<div class='card-content'>" +
          "<h2>" + result.title + "</h2>" +
          "<p> Summary : " + result.summary + "</p>" +
          "<p> Link : " + result.link + ' miles away' + "</p>" +
          "</div>" +
          "</div>" +
          "</div>"
                );
                
                $("#news").append(div1);
        })
        
      }
    
   }
}