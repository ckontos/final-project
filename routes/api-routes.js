var passport = require("../config/passport");
var db = require("../models");

module.exports = function(app) {
    
// route to get all the users
app.get("/api/users", function(req, res) {
    var query = {};
   // find all of them
    db.User.findAll({
      where: query, 
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
  // get user by email
  // app.get("/api/users/:email", function(req, res) {
  
  //   db.User.findOne({
  //     where: {
  //       email: req.params.email
  //     } 
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

 // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  
  
   // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username,
        userFirstName: req.user.userFirstName,
        userLastName: req.user.userLastName,
        isBand: req.user.isBand,
        instrumentsPlayed: req.user.instrumentsPlayed,
        searchingFor: req.user.searchingFor,
        genre: req.user.genre,
        about: req.user.about,
        userImage: req.user.userImage
        
        
      });
    }
  });
  
  
  
   app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
      // console.log("-------------------------- " + JSON.stringify(res));
    res.redirect("/search");
  
  });

// create new user
 app.post("/api/users", function(req, res) {
   console.log("at begining of api/users");
   console.log(req.body)
   // take all this info
    db.User.create({ 
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      isBand: req.body.isBand,
      instrumentsPlayed: req.body.instrumentsPlayed,
      searchingFor: req.body.searchingFor,
      genre: req.body.genre,
      about: req.body.about,
      userLocation: req.body.userLocation,
      userImage: req.body.userImage
    }).then(function(dbUser) {
           console.log("at the end of api/users");
      res.json(dbUser);
        // res.redirect("/login");
   
    })// if an error happends catch it
    .catch(function(err) { // then throw some json
         console.log("at the catch of api/users  " + err);
      res.json(err);
    });
  });
  
// route to delete use account (should probably be only for admin or user)
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ 
      where: { 
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });

  });

app.get('/api/users/', function(req, res){
  console.log("****++++******")
  console.log(req.query)
  let where = {}
  
  db.User.findAll({
    where: {
      userFirstName: req.params.userFirstName,
      isBand: req.params.isBand,
      instrumentsPlayed: req.params.instrumentsPlayed
      
    }
  }).then(function(dbUser) {
    res.json(dbUser)
  })
})

 // PUT route for updating user profile
  app.put("/api/users/username", function(req, res) {
    db.User.update({ // allow them to update these fields
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      username: req.body.username,
      isBand: req.body.isBand,
      instrumentsPlayed: req.body.instrumentsPlayed,
      searchingFor: req.body.searchingFor,
      genre: req.body.genre,
      about: req.body.about
    }, { // update it by id
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
      // res.redirect("http://google.com");
    })
    .catch(function(err) {
      res.json(err);
    });
  });


// route to search users by genre they like
 app.get("/api/users/:userFirstName", function(req, res) {
  console.log("===============" + req.params.userFirstName)
   db.User.findAll({
      where: {
        userFIrstName: req.params.userFirstName
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
  app.get("/api/isBand/:isBand", function(req, res) {
  
   db.User.findAll({
      where: {
        isBand: req.params.isBand
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
  app.get("/api/instrumentsPlayed/:instrumentsPlayed", function(req, res) {
  
   db.User.findAll({
      where: {
        instrumentsPlayed: req.params.instrumentsPlayed
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// route to search users by genre they like
 
}