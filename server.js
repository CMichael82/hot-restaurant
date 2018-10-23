var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [];
var waiting = [];


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// // Displays a single character, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });


app.post("/api/TABLES", function (req, res) {
	var newTable = req.body;
	// newTable.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
	console.log(newTable);
	if (tables.length < 5) {
		tables.push(newTable);
	} else {
		waiting.push(newTable);
	}

	res.json(newTable);
});

app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});
