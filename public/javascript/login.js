$(document).ready(function() {
  
  var emailInput = $("#userEmail");
  var passwordInput = $("#userPassword");

  // When the form is submitted, we validate there's an email and password entered
 
 $("#loginTheUser").on("click", function(){
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the main page
  function loginUser(email, password) {
    console.log("email and Password: " + email + " " + password)
    $.post("/api/login", {
      email: email,
      password: password
    }).done(function(data) {
      window.location.href='/main';
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

});
