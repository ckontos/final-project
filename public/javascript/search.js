// When user hits the search-btn

// looking for yes or no in the band looking for category in yes

// looking for users with specific names
$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  // var userFirstName = $("#profileSearchInput").val().trim();

  // Make an AJAX get request to our api, including the user's book in the url
  // $.get("/api/users/" + userFirstName, function(data) {
    $.get('/api/users', function(data){
    console.log(data);
    // Call our renderBooks function to add our books to the page
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
  var  isBand = $("input[name=group2]:checked").val();
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
  var  instrumentsPlayed = $("input[name=group1]:checked").val();

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

      var div = $("<div>");

      div.append("<h2>" + data[i].userFirstName + "</h2>");
      div.append("<p>instrumentsPlayed: " + data[i].instrumentsPlayed + "</p>");
      div.append("<p>userLocation: " + data[i].userLocation + "</p");
      div.append("<p>searchingFor: " + data[i].searchingFor + "</p>");
      div.append("<button class='delete' data-id='" + data[i].id + "'>Contact User</button>");

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
  window.location.href='/userProfile';


});



// button to logout
$("#logout").on("click", function(event) {
  // event.preventDefault();
 $.get("/logout", function(data) {

    window.location.href='/userProfile';
  
  });

});