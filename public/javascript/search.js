// When user hits the search-btn

// looking for yes or no in the band looking for category in yes

// looking for users with specific names
// var params = {
//   "otherParam": "x",
//   "q": [ text, title ]
// };

// $.get(url, $.param(params, true), mySuccessFunction);
$("#searchUser").on("click", function(event) {
  event.preventDefault();
  var userFirstName = $("#profileSearchInput").val().trim();
  var  isBand = $("input[name=group2]:checked").val();
  var  instrumentsPlayed = $("input[name=group1]:checked").val();
  var params = {
    "userFirstName":userFirstName,
    "isBand":isBand,
    "instrumentsPlayed": instrumentsPlayed
  }
  


    $.get('/api/users/', params, function(data){
    console.log(data);
    console.log(params);
   

    renderUsers(data);

  });

});
$("#user-search-btn").on("click", function(event) {
  event.preventDefault();
  var userFirstName = $("#profileSearchInput").val().trim();
  $.get("/api/users/" + userFirstName, function(data) {
    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });

});


$("#band-search-btn").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var isBand = $("input[name=group2]:checked").val();
  // so if i do this it only searches for no
  //and i also tried group 2 but i wasnt using input ect 
  //i also 

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/isBand/" + isBand, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });

});
$("#looking-search-btn").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var instrumentsPlayed = $("input[name=group1]:checked").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/instrumentsPlayed/" + instrumentsPlayed, function(data) {
    console.log(instrumentsPlayed)

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });
});




function renderUsers(data) {
  if (data.length !== 0) {

    $("#stats").empty();
    $("#stats").show();

    for (var i = 0; i < data.length; i++) {

      var div = $("<div>").append(
        "<div class='row'>" +
        "<div class='col s10'>" + "<div class='card horizontal'>" + "<div class='card-image'>" + "<img src='https://www.ctvnews.ca/polopoly_fs/1.1640896.1389819488!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg'>" +
        "</div>" +
        "<div class='card-stacked'>" + "<div class='card-content'>" +
        "<h2>" + data[i].userFirstName + "</h2>" +
        "<p> Primary Instrument: " + data[i].instrumentsPlayed + "</p>" +
        "<p> User Location: " + data[i].userLocation + "</p>" +
        "<p> Looking to jam with: " + data[i].searchingFor + "</p>" +
        "<button data-target='contactModal' class='btn modal-trigger contact'  data-id='" + data[i].email + "'>Contact User</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
      );

      $("#stats").append(div);

    }

    $(".delete").click(function() {

      var info = {
        id: $(this).attr("data-id")
      };

      $.post("/api/delete", info)
        // On success, run the following code
        .done(function(deldata) {
          // Log the data we found
          console.log(deldata);
          console.log("Deleted Successfully!");
        });

      $(this).closest("div").remove();

    });

  }
}




// view profile button
$("#viewProfile").on("click", function(event) {
  event.preventDefault();
  // go to the profile
  window.location.href = '/userProfile';


});



// button to logout
$("#logout").on("click", function(event) {
  // event.preventDefault();
  $.get("/logout", function(data) {

    window.location.href = '/userProfile';

  });

});
