const express = require('express');
var bodyParser = require('body-parser')
const { callbackify } = require('util');
fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));

//Declare user bank
var users = {
    admin: {
        pass: "1234",
        id: 00000
    }
};

//Declare publisher bank
var publishers = [];

//Landing page -> index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//Login -> login.html
app.get("/index.html", function(req, res) {
    res.sendFile(__dirname + "/index.html")
  });

//Login -> login.html
app.get("/login.html", function(req, res) {
    res.sendFile(__dirname + "/login.html")
  });

//Login
app.post("/login", function(req, res) {
    attempt = req.body;
    //Check if user exists
    console.log(attempt);
    if (attempt.user in users)
    {
        console.log(users[attempt.user].pass);
        if (users[attempt.user].pass == attempt.pass)
        {
            res.send(users[attempt.user].id);
        }
        else {
            res.send('fail')
        }
    }
    else {
        console.log('fail')
    }
    res.sendFile(__dirname + "/login.html")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });