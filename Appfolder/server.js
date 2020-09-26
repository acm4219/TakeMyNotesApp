var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; //dynamic port

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// html path
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Api path
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(data);
  });

  app.get("/api/notes", function (req, res) {
    res.json(data[Number(req.params.id)]);
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let uniqueId = data.length.toString();
    console.log(uniqueId);
    newNote.id = uniqueId;
    data.push(newNote);

    res.json(data);
  });

  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id $(noteId)`);
    data = data.filter((currentNote) => {
      return currentNote.id != noteId;
    });
    for (currentNote of data) {
      currentNote.id = newId.toString();
      newId++;
    }
    res.json(data);
  });
};

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
