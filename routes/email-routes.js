
const nodemailer = require('nodemailer');
// using this email for test purposes right now
// var smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     host: "joshjanculawebpage@gmail.com",
//     auth: {
//         user: "joshjanculawebpage@gmail.com",
//         pass: "gmailPassword"
//     }
// });



var Transport = nodemailer.createTransport({
    service: "gmail",
    host: "joshjanculawebpage@gmail.com",
    auth: {
        user: "joshjanculawebpage@gmail.com",
        pass: "gmailPassword"
    }
});

module.exports = function(app, flag) {
    // will need to change this to which page we are on
app.get('/',function(req,res){
    res.sendfile('main.html');
});
app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        html : req.query.html
    }
    console.log(mailOptions);
    Transport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});
}