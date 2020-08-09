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

  //get today's date
  let currentDate = new Date()
  const dd1 = String(currentDate.getDate()).padStart(2, '0')      //day and month give number datatypes, pad to strings only
  const mm1 = String(currentDate.getMonth() + 1).padStart(2, '0') //january returns 0
  const yyyy1 = currentDate.getFullYear()

  //get date of 30 days prior to today
  let monthDate = new Date().setDate(currentDate.getDate() - 30) //returns milliseconds
  monthDate = new Date(monthDate)                                //parse to actual date format
  const dd2 = String(monthDate.getDate()).padStart(2, '0')
  const mm2 = String(monthDate.getMonth() + 1).padStart(2, '0')
  const yyyy2 = monthDate.getFullYear()

  //"yyyy-mm-dd"
  currentDate = yyyy1 + "-" + mm1 + "-" + dd1
  monthDate = yyyy2 + "-" + mm2 + "-" + dd2
  console.log(currentDate)
  console.log(monthDate)

  newsapi.v2
    .topHeadlines({
      //q: "covid",
      from: monthDate,
      to: currentDate,
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
          (err, result) => {
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
    res.status(200).json(result.rows);
  });
});



//the express router receives a request from the react client, and pings the news api
//for news articles. Then the packaged news articles are sent back as an object.

/*   
given the URL /api/news/retrieve?category=entertainment&time=30+days&sort=desc
*/
 
router.get("/retrieve", (req, res) => {
 
  if (req.query){
    const newsParam = req.query
    client.query(`SELECT * FROM news 
                  WHERE (\'${newsParam.category}\' IS NULL OR 
                  category = \'${newsParam.category}\') AND 
                  publish_date > now() - interval \'${newsParam.time}\' 
                  ORDER BY publish_date ${newsParam.sort}`, (err, result) => {
      if (err) throw err;

      res.status(200).json(result.rows)
    }) 
  }
});

/* 
FIXME:Temporary, hopefully this can be done with /retrieve
retreive all for the start of the application

*/
router.get("/retrieveall", (req, res) => {
  client.query(`SELECT * FROM news`, (err, result) => {
    if (err) throw err;

    res.status(200).json(result.rows)
  }) 
});
*/

module.exports = router;
