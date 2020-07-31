const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./queries");
const cors = require("cors");
const News = require("./routes/news");
const app = express();

//e5bc086901ee4a3fbda77b9c49634c3a NEWSAPI
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Cors
app.use(cors());
app.options("*", cors());

// Routes
app.use("/api/news", News);

const port = process.env.PORT || 5000;

if (process.env.PORT) {
  // Handles any requests that don't match the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// These stuff works locally but gotta make it work globally

/*app.get("/api/news/users", db.getUsers);
app.get("/users", localdb.getUsers);
app.get("/users/:id", localdb.getUserById);
app.post("/users", localdb.createUser);
app.put("/users/:id", localdb.updateUser);
app.delete("/users/:id", localdb.deleteUser); */

app.listen(port);

console.log("App is listening on port " + port);
