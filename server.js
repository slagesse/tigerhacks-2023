const express = require('express');
var bodyParser = require('body-parser')
const { callbackify } = require('util');
const mysql = require("mysql");
fs = require('fs');

const db = mysql.createConnection({
  host:"en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port:"3306",
  user:"ujk93j21v1n63k8r",
  password:"mu8zho2hl0ibw3rv",
  database:"pboheymsp0bl3jdh",
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));

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

app.get("/user-profile", function(req, res) {
  res.sendFile(__dirname + "/user-profile.html")
});

app.post("/submit_review", function(req, res) {
  console.log("Receiving review...\n")
  info = req.body;
  db.query("INSERT INTO reviews (url, question1, question2, question3, comments, author) VALUES ('" + info.url + "', '" + info.q1 + "', '" + info.q2 + "', '" + info.q3 + "', '" + info.comment + "', '" + info.user + "')", (err, result) => {
    console.log(err);
  });
  console.log("Review successfully stored.\n")
  res.end();
});

//Login
app.post("/login", function(req, res) {
    attempt = req.body;
    console.log("attempting login...\n")
    //Check if user exists
      // Perform database operations...
      if (req.body.type == "Consumer")
      {
        db.query("SELECT * FROM users WHERE username='"+attempt.user+"' AND password='"+attempt.pass+"'", (err, result) => {
          if (result != undefined && result.length > 0)
          {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify({ userID: result[0].id, username: result[0].username, password: result[0].password, type: "Consumer"}));
          }
          else{
            res.end(JSON.stringify({error: "e"}));
          }
        });
        // Close the MySQL connection
      }
      else if (req.body.type =="Publisher")
      {
        db.query("SELECT * FROM publications WHERE name='"+attempt.user+"' AND password='"+attempt.pass+"'", (err, result) => {
          console.log(result);
          if (result != undefined && result.length > 0)
          {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify({ userID: result[0].id, username: result[0].name, password: result[0].password, type: "Publisher"}));
          }
          else{
            res.end(JSON.stringify({error: "e"}));
          }
        });
        // Close the MySQL connection
      } 
 });

 app.post("/signup", function(req, res) {
  attempt = req.body;
  //Check if user exists
  // Perform database operations...
  if (req.body.type == "Consumer")
  {
    db.query("SELECT * FROM users WHERE username='%"+attempt.user+"%'", (err, result) => {
      if (result != undefined && result.length == 0 && attempt.user != "")
      {
        db.query("INSERT INTO users (username, password) VALUES ('" + attempt.user + "', '" + attempt.pass + "')", (err, result) => {
        });
        db.query("SELECT * FROM users WHERE username='"+attempt.user+"' AND password='"+attempt.pass+"'", (err, result) => {
          if (result != undefined && result.length > 0)
          {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ userID: result[0].id, username: result[0].username, password: result[0].password, type: "Consumer"}));
          }
          else{
            res.end(JSON.stringify({error: "e"}));
          }
        });
      }
      else{
        res.end(JSON.stringify({error: "e"}));
      }
    });
  }
  else if (req.body.type =="Publisher")
      {
        db.query("SELECT * FROM publications WHERE name='%"+attempt.user+"%'", (err, result) => {
          if (result != undefined && result.length == 0 && attempt.user != "")
          {
            db.query("INSERT INTO publications (name, password) VALUES ('" + attempt.user + "', '" + attempt.pass + "')", (err, result) => {
            });
            db.query("SELECT * FROM publications WHERE name='"+attempt.user+"' AND password='"+attempt.pass+"'", (err, result) => {
              if (result != undefined && result.length > 0)
              {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ userID: result[0].id, username: result[0].name, password: result[0].password, type: "Publisher"}));
              }
              else{
                res.end(JSON.stringify({error: "e"}));
              }
            });
          }
          else{
            res.end(JSON.stringify({error: "e"}));
          }
        });
      }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

process.on('exit', () => {
  // Close the database connection here
  // This code will be executed when the server is shutting down
  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed.');
    }
  });
});