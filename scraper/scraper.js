const cheerio = require('cheerio');
const rp = require('request-promise');

//news.js calls this function with the array of retrieved article objects filteredNews[]
async function newsScraper(newsDump) {
  const scrapedArticles = {}

  try {
    //Promise.all makes the async code run through all articles and scrape their text before returning the scraped text data.
    await Promise.all(newsDump.map(async (articleObj) => {
      // console.log(articleObj.url)
      try {
        //sent a rq GET request to article url, receive an article that is loaded into var $ by cheerio.load()
        const $ = await rp({
          uri: articleObj.url,
          headers: {
            'User-Agent': 'Request-Promise',
          },
          transform: (body) => {
            return cheerio.load(body)
          }
        })
        //identifies all text elements with the tag <p>, and strips of all whitespace formatting with a single space through regex
        const rawArticle = $('p').text().replace(/\s+/g, ' ');

        //place scraped article in an object with 'url': 'scraped text' key value pair
        if (rawArticle != "") {
          scrapedArticles[articleObj.url] = rawArticle
        }
      } catch (err) {
        console.log(`ERROR: ${err.statusCode} at this site article: ${articleObj.url}`)
        if (err.statusCode !== 403) {
          throw err
        }
      }
    }));
  } catch (err) {
    throw err;
  }
  // console.log(Object.keys(scrapedArticles))
  return scrapedArticles
};

/* TEST CODE BELOW
const dummyart = [
  {
    "source": {
      "id": null,
      "name": "Eleven Warriors"
    },
    "author": null,
    "title": "Skull Session: Nebraska Would Forfeit $50 Million if It Played Outside the Big Ten, Negative Recruiting Has Al - Eleven Warriors",
    "description": "The Big Ten has a message for Nebraska if it tries to play this fall, the negative recruiting against Big Ten schools has already begun, and more.",
    "url": "https://www.elevenwarriors.com/skull-sessions/2020/08/115736/ohio-state-football-nebraska-would-forfeit-50-million-if-it-played-outside-the-big-ten-negative-recruiting-has-already",
    "urlToImage": "https://www.elevenwarriors.com/sites/default/files/styles/904x490/public/c/2020/08/115736_h.jpg?itok=QDuBdB4w",
    "publishedAt": "2020-08-12T09:36:09Z",
    "content": "Just to put everything in perspective...\r\n2020 will be the first calendar year without an Ohio State football game since 1889.\r\nBuckeyes played through the flu pandemic of 1918 and two World Wars, bu… [+3610 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "NPR"
    },
    "author": "",
    "title": "5 Takeaways On The New Biden-Harris Presidential Ticket - NPR",
    "description": "Beyond making history, Biden showed his vision for the future, opened a window into his decision-making and picked someone who will likely be able to stand up well in a vice-presidential debate.",
    "url": "https://www.npr.org/2020/08/12/901537144/5-takeaways-on-the-new-biden-harris-presidential-ticket",
    "urlToImage": "https://media.npr.org/assets/img/2020/08/11/gettyimages-1206293567_wide-4065af18f11066c73d3218bae868c5025e5d28eb.jpg?s=1400",
    "publishedAt": "2020-08-12T09:00:03Z",
    "content": "Sen. Kamala Harris at the U.S. Capitol after a vote in March.\r\nSaul Loeb/AFP via Getty Images\r\nJoe Biden picked California Sen. Kamala Harris to be his vice-presidential running mate.\r\nIt's an histor… [+5881 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "BBC News"
    },
    "author": "https://www.facebook.com/bbcnews",
    "title": "QAnon supporter Marjorie Taylor Greene wins Georgia Republican primary - BBC News",
    "description": "Marjorie Taylor Greene seems set to become the conspiracy theory's first devotee in Congress.",
    "url": "https://www.bbc.com/news/world-us-canada-53747851",
    "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/181A/production/_113907160_116917074_2489297028027059_682561770363673382_n.png",
    "publishedAt": "2020-08-12T08:38:04Z",
    "content": "Image copyrightMarjorie Taylor GreeneImage caption\r\n Marjorie Taylor Greene is poised to be elected in November\r\nA US businesswoman who has expressed support for the QAnon conspiracy theory has won t… [+4144 chars]"
  },
]

async function waiting() {
  setTimeout(() => {
    console.log('hello world')
  }, 0);

  await newsScraper(dummyart)

  setTimeout(() => {
    console.log("middle world")
    console.log(dummyart)
    console.log("end world")
  }, 0);
}

waiting()
*/
module.exports.newsScraper = newsScraper;