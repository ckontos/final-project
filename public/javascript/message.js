$(document).ready(function() {
    var sender;
    var reciever;
    var username;
    // initialize modal

    $('select').material_select();
    $('.modal').modal({
        ready: function(modal, trigger) {
            // Do whatever you want to do with your modal and trigger button
            // For example here 'id' and 'data-id' attributes of trigger are displayed in modal
            modal.find('#toEmail').text(trigger.data('id'));
        }

    });


    // when you click on contact button
    $(".contact").on("click", function(event) {
        console.log("we made a click");
        event.preventDefault();
        // get recipient email
        //   reciever = $(this).attr("data-id");

        // get the senders email
        $.get("api/user_data", {}, function(data) {
            console.log(data);
            sender = data.email;
            username = data.username;
            console.log("sender: " + sender + "  username: " + username);
        }).done(function() {
            // pop the modal
            $('#contactModal').modal('open');
        });

    });



    // when you click on the submitMessage button in modal
    $("#submitMessage").on("click", function(event) {
        event.preventDefault();
        // get the input from modal
        reciever = $("#toEmail").text();
        console.log("reciever: " + reciever);
        let message = $("#message").val().trim();

        $.get("api/user_data", {}, function(data) {
            console.log(data);
            sender = data.email;
            username = data.username;
            console.log("sender: " + sender + "  username: " + username);
        }).done(function() {
            
     
        // console.log(reciever);
        // send the message
        $.get("/send", {
                to: reciever,
                subject: "New Message",
                html: "<h4>" + "email: " + sender + "</h4>" +
                    "<h4>" + "name: " + username + "</h4>" +
                    "<p>" + "message: " + message + "</p>"

            },
            function(data) {
                if (data == "sent") {
                    console.log("Great Success!");
                }
            });
        // close the modal 
        $('#contactModal').modal('close');
    });

   });



});
