const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./queries");
const cors = require("cors");

const news = require("./routes/news");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});


// Cors
app.use(cors());
app.options('*', cors());

// Routes
const port = process.env.PORT || 5000;

if ( process.env.PORT){
  // Handles any requests that don't match the ones above
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
  app.use("/api/news", news);  
}
else{
  app.get("/api/news/users", db.getUsers);
  /* app.get("/users", localdb.getUsers);
  app.get("/users/:id", localdb.getUserById);
  app.post("/users", localdb.createUser);
  app.put("/users/:id", localdb.updateUser);
  app.delete("/users/:id", localdb.deleteUser); */

}

app.listen(port);

console.log("App is listening on port " + port);
