//jshint esversion: 6

const express = require("express");
const request = require ("request");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req,res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/d66481d08d";
const options = {
  method: "POST",
  auth: "daria:Mailchimp.API.key"
}

const request = https.request(url, options, function(response) {
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});



//Audience ID d66481d08d -> Audience -> Settings -> Audience name and defaults
