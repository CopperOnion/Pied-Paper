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
client.connect();

//newsAPI and its key
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("e5bc086901ee4a3fbda77b9c49634c3a");

//garbage collection of news articles older than 30 days of publishing to maintain space on db
client.query(
  "DELETE FROM news WHERE publish_date < now() - interval \'30 days\'",
  function (err, result) {
    if (err) throw err;
  }
)

//getting an updated list of all sources and their associated categories
const siteID = {}
const siteName = {}

async function getCategories() {
  newsapi.v2.
    sources({
      language: "en",
    })
    .then((response) => {
      const sources = response.sources
      sources.map((source) => {
        siteID[source.id] = source.category
        siteName[source.name] = source.category
      })
    })
    .catch((err) => {
      console.log(err);
    })
};

// the news api is pinged everytime the app gets started, which should be however often heroku shuts down and has to restart.
async function getNews() {
  await getCategories();
  newsapi.v2
    .topHeadlines({
      //q: "covid",
      from: "2020-07-25",
      to: "2020-07-30",
      language: "en",
    })
    .then((response) => {

      /*
        send response to the database so that the new news articles can be stored
        - IMPLEMENT DATE TIMEFRAME SEARCH I.E. 1 DAY, 1 WEEK, 1 MONTH, THE FREE API DOESN'T SERVE NEWS OLDER THAN A MONTH
      */
      const news = response.articles

      //this compares whether the fetched article has a source entry in the api
      //if the article does not have a registered category, then it is defaulted to 'general'
      //caching news articles into the postgreSQL database
      news.map((article) => {
        client.query(
          "INSERT INTO news (articles, truefalse, category, publish_date) VALUES ($1, $2, $3, $4) ON CONFLICT (articles) DO NOTHING",
          [article, 1, siteID[article.source.id] || siteName[article.source.name] || 'general', article.publishedAt],
          function (err, result) {
            if (err) throw err;
          })
      })
    })
    .catch((err) => {
      console.log(err);
    })
};

getCategories();
getNews();

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


/* 
  TODO: Change retrieve to a POST so that it retrieves only the 
  selected category of news

*/
//the express router receives a request from the react client, and pings the news api
//for news articles. Then the packaged news articles are sent back as an object.
router.get("/retrieve", (req, res) => {
  client.query("SELECT * FROM news", (err, result) => {
    if (err) throw err;

    res.status(200).json(result.rows)
  })
});

module.exports = router;
