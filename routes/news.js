const { Client } = require("pg");
const express = require("express");
const router = express.Router();


const cstring = 'postgres://wejgjhiuiahuhh:8de3f710eb110c9ed94d3fee5c28617b33926452a53a3ad54d236f02adb68566@ec2-34-193-117-204.compute-1.amazonaws.com:5432/de20i26pohuek0'
const client = new Client({
  connectionString: cstring,
  ssl: {
    rejectUnauthorized: false
  }
});


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

module.exports = router;
