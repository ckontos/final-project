var Article = require("../models/musicNews.js");
var request = require("request");
var cheerio = require("cheerio");



module.exports = function(app) {
app.get('/scrape', function(req, res) {
  request("www.rollingstone.com", function(error, response, html) {
    var $ = cheerio.load(html);

    $("article").each(function(i, element){
      var result = {};

      result.title = $(this).children  ("header").children("h1").children("a").text();
      if (result.title != "" && result.title != null) {
        result.link = $(this).children("header").children("h1").children("a").attr("href");
        result.summary = $(this).children(".item__content").children(".entry-summary").children("p").text();
        //Checks to see if the article is already in the database, and if it isn't then it adds it
        Article.findOne({title: result.title}, function(err, doc) {
          if (doc == null) {
            var entry = new Article(result);

            entry.save(function(err, doc) {
              if (err) {
                console.log(err);
              }
              else {
                console.log(doc);
              }
            });
          }
          else {
            console.log('Already in DB');
          }
        });
          
        // });
      }
    });
  });
  res.send("Scrape Complete");
});
//     app.get("/search", function(req, res) {
//   Article.find({"saved": false}, function(error, data) {
//     if(error) {
//       console.log(error);
//     }
//       else {
//         res.render("/search")
//       }
//   });
// });

app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});
}

