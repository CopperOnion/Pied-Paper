const axios = require('axios');

async function robotAnalysis(urlScrapedArticles) {
  /*
  urlScrapedArticles is an object with url keys and text value pairs
  */
  const urlMetric = {}

  //this code implentation is basically a variation on scraper/scraper.js look there for more documentation
  try {
    await Promise.all(Object.keys(urlScrapedArticles).map(async (url) => {
      try {
        //receive metric from the sagemaker api, by giving the article's scraped content
        const metric = await axios.post('https://lwhm795rcg.execute-api.us-east-2.amazonaws.com/test/predictnews', {
          "content": urlScrapedArticles[url]
        })

        // console.log(url)
        // console.log(urlScrapedArticles[url])
        // console.log("server status: " + metric.status)
        // console.log(metric.data)

        //store the metric into the object with the article url as the key
        urlMetric[url] = parseFloat(metric.data) * 100

      } catch (error) {
        //error when the promise doesnt work? not sure
        if (urlScrapedArticles[url] === "") {
          console.log(`ERROR: ${url} scraped content is empty. SKIPPING...`)
        } else {
          console.log(`ERROR: ${url} broke with status code: ${error.statusCode}. SKIPPING...`)
        }
      }
    }));
  } catch (err) {
    //error when the map on all the scraped articles fails? shouldn't happen
    throw err;
  };
  return urlMetric;
};

module.exports.robotAnalysis = robotAnalysis;