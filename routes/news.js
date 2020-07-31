const { Client } = require("pg");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const cstring = 'postgres://wejgjhiuiahuhh:8de3f710eb110c9ed94d3fee5c28617b33926452a53a3ad54d236f02adb68566@ec2-34-193-117-204.compute-1.amazonaws.com:5432/de20i26pohuek0'
const client = new Client({
  connectionString: cstring,
  ssl: {
    rejectUnauthorized: false
  }
});

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e5bc086901ee4a3fbda77b9c49634c3a');

client.connect()
router.get("/users", (req, res )=>{

    client.query('SELECT * FROM users', function(err, result) {
        if (err) throw err;
        for (let row of result.rows) {
          console.log(JSON.stringify(row));
        }
        res.status(200).json(result.rows);

    });

})

router.post("/insert", (req, res )=>{
  const values = ['ironman', 'ooga@gmail.com']
  client.query('INSERT INTO users(name,email) VALUES ($1, $2)', values, function(err, result) {
      if (err) throw err;
      for (let row of result.rows) {
        console.log(JSON.stringify(row));
      }
      res.status(200).json(result.rows);
  });
})

router.get("/retrieve", (req, res )=>{
  newsapi.v2.everything({
    q: 'covid',
    from: '2020-06-30',
    to: '2020-07-05',
    language: 'en'
  }).then(response => {
    res.send(response);
   
  }).catch(err =>{
    console.log(err)
  });

});

module.exports = router;
