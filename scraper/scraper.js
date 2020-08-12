const cheerio = require('cheerio');
const request = require('request');

function newsScraper(articleJSON) {
  request({
    method: 'GET',
    url: 'https://www.npr.org/2020/08/12/901537144/5-takeaways-on-the-new-biden-harris-presidential-ticket'
  }, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      const headline = $('p');

      console.log(headline.text())
    } else {
      throw err
    }
  });
};

newsScraper();