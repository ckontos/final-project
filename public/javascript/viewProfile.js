$(document).ready(function(){
    
    var username; 
    
    $('select').material_select();
    
    $('.modal').modal({
        ready: function(modal, trigger) {
          // gets the reciever email and hides it in #toEmail
            modal.find('#toSearch').text(trigger.data('id'));
        }

    });
    
    
    
    
    $(".view").on("click", function(event) {
 
  // get the email for query
   username = $("#toSearch").text();

    
    $.get("api/users/:username" + username, function(data) {
        
        console.log(data);
        
        $("#accountName").text(data.username);
        $("#name").text((data.userFirstName) + " " + (data.userLastName));
        $("#email").text(data.email);
        $("#instrument").text(data.instrumentsPlayed);
        $("#genre").text(data.genre);
        $("#inBand").text(data.isBand);
        $(".profilePic").attr("src", data.userImage);
    });
});

});