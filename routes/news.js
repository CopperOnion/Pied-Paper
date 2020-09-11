const { Client } = require("pg");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const scraper = require("../scraper/scraper");
const robot = require("../robot/analysis");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

//postgreSQL remote db connection point
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

//newsAPI and its key
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

//garbage collection of news articles older than 5 days of publishing to maintain space on db
client.query(
  "DELETE FROM news WHERE publish_date < now() - interval \'5 days\'",
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

  // console.log(monthDate)
  // console.log(currentDate)

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

    /*
    urlScrapedArticle{
      url: string scrapedtext
    }
    urlMetric{
      url: integer metric
    }
    */
    const urlScrapedArticle = await scraper.newsScraper(filteredNews)
    const urlMetric = await robot.robotAnalysis(urlScrapedArticle)
    // console.log(filteredNews)
    // console.log(urlScrapedArticle['https://'])

    //this compares whether the fetched article has a source entry in the api
    //if the article does not have a registered category, then it is defaulted to 'general'
    //caching news articles into the postgreSQL database
    filteredNews.map((article) => {

      if (urlMetric[article.url]) {
        client.query(
          "INSERT INTO news (articles, truefalse, category, publish_date, url, title) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (url) DO NOTHING",
          [article, urlMetric[article.url], siteID[article.source.id] || siteName[article.source.name] || 'general', article.publishedAt, article.url, article.title],
          (err, result) => {
            if (err) throw err;
          })
      } else {
        console.log(`ARTICLE: ${article.url} does not have an associated metric. SKIPPING...`)
      }


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
given the URL /api/news/retrieve?category=\'entertainment\'&range=30+days&sort=DESC
@FIXME: figure this bug out...
*/

router.get("/retrieve", (req, res) => {

  const newsParam = req.query
  console.log(newsParam)
  /*  publish_date interval was causing a bug...
  `SELECT * FROM news
    WHERE (${newsParam.category} IS NULL OR
    category = ${newsParam.category}) AND
    (title ~* \'${newsParam.title}\') AND
    publish_date > now() - interval \'${newsParam.range}\'
    ORDER BY publish_date ${newsParam.sort};`
   */
  client.query(
    `SELECT * FROM news
    WHERE (${newsParam.category} IS NULL OR
    category = ${newsParam.category}) AND
    (title ~* \'${newsParam.title}\') AND
    publish_date > now() - interval '10 days'
    ORDER BY publish_date ${newsParam.sort};`,
    (err, result) => {
      if (err) throw err;

      res.status(200).json(result.rows)
    })
});

/*
User vote handler
*/
router.post("/uservote", (req, res) => {
  /*
  req.body = {
    header: {}
    params: {}
  }
  */
  const vote = req.body.params.type
  const url = req.body.params.url

  client.query(`UPDATE news SET ${vote} = ${vote}+1 WHERE url = \'${url}\' RETURNING user_true, user_false;`, (err, result) => {
    if (err) throw err;

    res.status(200).json({
      url: url,
      votes: result.rows[0]
    })
    console.log(result.rows[0])
  })
});

/* 
Retrieve all for data visualization

*/
router.get("/retrieve_all", (req, res) => {

  const newsParam = req.query

  client.query(
    `SELECT * FROM news`,
    (err, result) => {
      if (err) throw err;

      res.status(200).json(result.rows)
    })
});



module.exports = router;
