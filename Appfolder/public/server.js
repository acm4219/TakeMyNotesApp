var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; //dynamic port

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let notes = [];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get("/api/notes", function (req, res) {});

app.post("/api/notes", function (req, res) {
  console.log("request.body", req.body);
  let newNotes = req.body;
  notes.push(newNotes);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
