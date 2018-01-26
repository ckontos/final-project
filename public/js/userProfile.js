$(document).ready(function(){
    $('.modal').modal();
    $('select').material_select();
    
    $.get("api/user_data", {}, function(data){
        console.log(data);
        console.log(data.instrumentsPlayed);
        
        $("#username").text(data.username);
        $("#name").text((data.userFirstName) + " " + (data.userLastName));
        $("#email").text(data.email);
        $("#instrument").text(data.instrumentsPlayed);
        $("#genre").text(data.genre);
        $("#inBand").text(data.isBand);
         $(".profilePic").attr("src", data.userImage);
    })
    
    
    
    
  // button to logout
  $("#logout").on("click", function(event) {
    // event.preventDefault();
    $.get("/logout", function(data) {
      window.location.href = '/login';
    });
  });



  // view profile button
  $("#backToMain").on("click", function(event) {
    event.preventDefault();
    // go to the profile
    window.location.href = '/main';
  });

    
    
    
})