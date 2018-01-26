$(document).ready(function() {
  $('.modal').modal();
  $('select').material_select();

  $.get("api/user_data", {}, function(data) {
    console.log(data);
    console.log(data.instrumentsPlayed);

    // Sets account info into account info card
    $("#username").text(data.username);
    $("#name").text((data.userFirstName) + " " + (data.userLastName));
    $("#email").text(data.email);
    $("#instrument").text(data.instrumentsPlayed);
    $("#genre").text(data.genre);
    $("#inBand").text(data.isBand);
    $(".profilePic").attr("src", data.userImage);


    //Sets account info into edit profile modal
    $("label").addClass('active');
    $("#userFirstNameModal").val(data.userFirstName);
    $("#userLastNameModal").val(data.userLastName);
    
    $("#inBandModal").val(data.isBand);
    $("#inBandModal").material_select();

    $("#instrumentsPlayedModal").val(data.instrumentsPlayed);
    $("#instrumentsPlayedModal").material_select();


    $("#searchingForModal").val(data.searchingFor);
    $("#searchingForModal").material_select();
    
    $("#genreModal").val(data.genre);
    $("#genreModal").material_select();
    
    $("#aboutModal").val(data.about);
    $("#registerEmailModal").val(data.email);
  });





  // This function updates a todo in our database
  //   function updateTodo(todo) {
  //     $.ajax({
  //       method: "PUT",
  //       url: "/api/todos",
  //       data: todo
  //     }).done(getTodos);
  //   }
});

$("#updateAccount").on("click", handleSubmitForm);
    
    function handleSubmitForm (event){
       
    var about = $("#aboutModal").val().trim();
    var firstName = $("#userFirstNameModal").val().trim();
    var lastName = $("#userLastNameModal").val().trim();
    var email = $("#registerEmailModal").val().trim();
    var genre = $("#genreModal").val();
    var isBand = $("#isBandModal").val();
    var instrumentsPlayed = $("#instrumentsPlayedModal").val();
    var searchingFor = $("#searchingForModal").val();
    var username = $("#usernameModal").val();
     event.preventDefault();
    
    console.log(about);
    
    
    
    var editedInfo = {
        
        about: about,
        userFirstName: firstName,
        userLastName: lastName,
        registerEmail: email,
        genre: genre,
        isBand: isBand,
        instrumentsPlayed: instrumentsPlayed,
        searchingFor: searchingFor,
        username: username
    };
        updateUser(editedInfo);
        
           // empty out the input fields
    $("#aboutModal").val("")
    $("#userFirstNameModal").val("")
    $("#userLastNameModal").val("")
    $("#registerEmailModal").val("")
    $("#genreModal").val("")
    $("#isBandModal").val("")
    $("#instrumentsPlayedModal").val("")
    $("#searchingForModal").val("")
    };
    



function updateUser(user) {
  
    $.ajax({
      method: "PUT",
      url: "/api/users/username",
      data: user
    }).done();
    
};




