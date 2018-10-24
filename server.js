var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = require("./tablesData.js");
var waiting = require("./waitingData.js");

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/tables", function(req, res) {
    res.json(tables);
  });

  app.get("/api/waitlist", function(req, res) {
    res.json(waiting);
  });



app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
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


app.post("/api/tables", function (req, res) {
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
