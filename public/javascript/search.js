// When user hits the search-btn

// looking for yes or no in the band looking for category in yes

$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  isBand = $("#lookingForBand").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/isBand/" + isBand, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });

});
// looking for users with specific names
$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var userFirstName = $("#profileSearchInput").val().trim();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/users/" + userFirstName, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });

});

 // looking for in band category in no
$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  isBand = $("#notLookingForBand").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/isBand/" + isBand, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });

});


 // looking for in band category in no
$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  instrumentsPlayed = $("#lookingForGuitarists").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/instrumentsPlayed/" + instrumentsPlayed, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });

});

// looking for in band category in no
$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  instrumentsPlayed = $("#lookingForDrummers").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/instrumentsPlayed/" + instrumentsPlayed, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });
});
  $("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  instrumentsPlayed = $("#lookingForBassists").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/instrumentsPlayed/" + instrumentsPlayed, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });
  });
$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  instrumentsPlayed = $("#lookingForPercussionists").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/instrumentsPlayed/" + instrumentsPlayed, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });
});
  $("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  instrumentsPlayed = $("#lookingForVocalists").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/instrumentsPlayed/" + instrumentsPlayed, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderUsers(data);

  });
  });

$("#searchUser").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the book-search input
  var  instrumentsPlayed = $("#lookingForOther").val();

  // Make an AJAX get request to our api, including the user's book in the url
  $.get("/api/instrumentsPlayed/" + instrumentsPlayed, function(data) {

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

      div.append("<h2>" + data[i].user + "</h2>");
      div.append("<p>instrumentsPlayed: " + data[i].instrumentsPlayed + "</p>");
    //   div.append("<p>genre: " + data[i].genre + "</p>");
      div.append("<p>searchingFor: " + data[i].searchingFor + "</p>");
    //   div.append("<button class='delete' data-id='" + data[i].id + "'>DELETE User</button>");

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