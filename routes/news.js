const { Client } = require("pg");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//postgreSQL remote db connection point
const cstring =
  "postgres://wejgjhiuiahuhh:8de3f710eb110c9ed94d3fee5c28617b33926452a53a3ad54d236f02adb68566@ec2-34-193-117-204.compute-1.amazonaws.com:5432/de20i26pohuek0";
const client = new Client({
  connectionString: cstring,
  ssl: {
    rejectUnauthorized: false,
  },
});

//newsAPI and its key
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("e5bc086901ee4a3fbda77b9c49634c3a");

client.connect();

//the express router receives a rquest from the react client, and pings the database
//for user data. Then the rows of data are sent back.
router.get("/users", (req, res) => {
  client.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    for (let row of result.rows) {
      console.log(JSON.stringify(row));
    }
    res.status(200).json(result.rows);
  });
});

//the express router receives a request from the react client, and pings the news api
//for news articles. Then the packaged news articles are sent back as an object.
router.get("/retrieve", (req, res) => {
  newsapi.v2
    .everything({
      q: "covid",
      from: "2020-06-30",
      to: "2020-07-05",
      language: "en",
    })
    .then((response) => {
      res.send(response);
      /*TO DO
      /send response to the database so that the new news articles can be stored
      let news = response.articles
      
      THERE IS AN ISSUE HERE, DB REQUIRES LIST, BUT API GIVES A LIST OF OBJECTS
      news.map((article) => client.query("INSERT INTO placeholdDB (placeholdDATA, TF) VALUES ($1, $2) ON CONFLICT (placeholdDATA) DO NOTHING RETURNING *", [article, "True"],
      function (err, result){
        if (err) throw err;
      }))
      */
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
