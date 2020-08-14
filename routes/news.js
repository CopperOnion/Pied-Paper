const { Client } = require("pg");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const scraper = require("../scraper/scraper");
const axios = require('axios')

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

  try {
    const response = await newsapi.v2.sources({
      language: "en",
    })
    const sources = response.sources
    sources.map((source) => {
      siteID[source.id] = source.category
      siteName[source.name] = source.category
    })
    console.log("middle")
  } catch (err) {
    throw err;
  }

  // newsapi.v2.
  //   sources({
  //     language: "en",
  //   })
  //   .then((response) => {
  //     const sources = response.sources
  //     sources.map((source) => {
  //       siteName[source.name] = source.category
  //     })
  //     console.log("middle")
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
};

// the news api is pinged everytime the app gets started, which should be however often heroku shuts down and has to restart.
async function getNews() {

  // setTimeout(() => {
  //   console.log('before')
  // }, 0);
  await getCategories();

  // setTimeout(() => {
  //   console.log(siteID)
  //   console.log('after')
  //   console.log(siteID)
  // }, 0);

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

  console.log(monthDate)
  console.log(currentDate)

  try {
    const response = await newsapi.v2.topHeadlines({
      //q: "covid",
      // V this doesnt actually work bc theres no date filter implemented
      from: monthDate,
      to: currentDate,
      pageSize: 100,
      language: "en",
    })

    const news = response.articles

    //filter out articles with less than 200 characters of content scraped by the api, because those are inaccessible articles.
    const filteredNews = news.filter((article) => article.content && article.content.length >= 200)

    const urlScrapedArticle = await scraper.newsScraper(filteredNews)
    // console.log(filteredNews)
    // console.log(urlScrapedArticle)

    /*
    TO DO:
      - urlScrapedArticle is an object with key value pairs of url: articletext. this needs to be sent through sagemaker, and be returned with an ML metric of TRUE FALSE
      - newsapi call needs to be reverted to "everything", since the site categories are independent from article retrieval, and non-categorized sites are defaulted to "general"
        - reverting to everything will allow us to fetch news of specific time window rather than of that day with top headlines.
      - pageSize = 100, but that means 100 articles are retrieved for each day's worth? might be too many articles
      - database still needs some work
        - each unique article identified by the url, do other columns need to be "not null"?
      - menus for sort and date doesn't work without selecting category first NEEDS FIX
    */

    //this compares whether the fetched article has a source entry in the api
    //if the article does not have a registered category, then it is defaulted to 'general'
    //caching news articles into the postgreSQL database
    filteredNews.map((article) => {

      client.query(
        "INSERT INTO news (articles, truefalse, category, publish_date, url) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (url) DO NOTHING",
        [article, 1, siteID[article.source.id] || siteName[article.source.name] || 'general', article.publishedAt, article.url],
        (err, result) => {
          if (err) throw err;
        })
    })
  } catch (err) {
    throw err;
  }

};

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
given the URL /api/news/retrieve?category=entertainment&range=30+days&sort=DESC
*/

router.get("/retrieve", (req, res) => {

  const newsParam = req.query

  client.query(
    `SELECT * FROM news
    WHERE (\'${newsParam.category}\' IS NULL OR
    category = \'${newsParam.category}\') AND
    publish_date > now() - interval \'${newsParam.range}\'
    ORDER BY publish_date ${newsParam.sort}`,
    (err, result) => {
      if (err) throw err;

      res.status(200).json(result.rows)
    })
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


/* 
FIXME: Example API call to the AWS gateway api. use the same /predictnews directory.
  any json file can go as the second argument. In our case, it will be news content.

  Currently the model running with the API is image classification not news classification. 
  Put images of stuff and see what the model thinks.
*/
router.post("/runmodel", (req, res) => {
  axios.post('  https://lwhm795rcg.execute-api.us-east-2.amazonaws.com/test/predictnews', {
    "url": "https://upload.wikimedia.org/wikipedia/commons/0/09/TheCheethcat.jpg"
  })
  .then((result) => {
    res.send(result.data)
  },
  )
});


module.exports = router;
