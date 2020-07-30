const express = require("express");
const router = express.Router();
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "wejgjhiuiahuhh",
    host: "ec2-34-193-117-204.compute-1.amazonaws.com",
    database: "de20i26pohuek0",
    password: "0412",
    port: 5432,
    sslmode:require
  });

router.get("/users" ,(req, res) => {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
        if (error) {
            throw error;
        }
        console.log(res)
        res.status(200).json(result.rows);
    });
})


module.exports = router;
