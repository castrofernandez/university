var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'})); // Upload limit

var expressHbs = require('express3-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// Database
var fs = require("fs");
var file = "data/data.sqlite";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

app.get('/', function(req, res){
  res.render('index');
});

app.get('/observations', function(req, res) {
  db.all("SELECT id, identifier, element, date, type, value, width, height, x, y, instant, user_id, audit_id FROM observations", function(error, rows) {
    if(error)
    {
      throw error;
      res.send("Error: " + error);
    }
    else
    {
      var results = [];

      for (var i = 0; i < rows.length; i++)
        results.push(rows[i]);

      res.send(JSON.stringify(results));
    }
  });
});

app.post('/observations', function(req, res) {console.log(req.body)
  var data = req.body.data ? req.body.data : {};
  var identifier = data.identifier ? data.identifier : "UNKNOWN";
  var user = req.body.user ? req.body.user : -1;
  var audit = req.body.audit ? req.body.audit : -1;

  var observations = data.observations;
  var length = observations.length;

  for (var i = 0; i < length; i++) {
    var observation = observations[i];
    var element = observation.element ? observation.element : "UNKNOWN";
    var type = observation.event ? observation.event : "UNKNOWN";
    var value = observation.value ? observation.value : "";

    var coordinate = observation.coordinate ? observation.coordinate : {};

    var width = coordinate.width ? coordinate.width : -1;
    var height = coordinate.height ? coordinate.height : -1;
    var x = coordinate.x ? coordinate.x : -1;
    var y = coordinate.y ? coordinate.y : -1;
    var instant = coordinate.instant ? coordinate.instant : -1;

    var stmt = db.prepare("INSERT INTO observations (identifier, element, type, value, width, height, x, y, instant, user_id, audit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    stmt.run(identifier, element, type, value, width, height, x, y, instant, user, audit);

    stmt.finalize();
  }

  res.send('Thanks');
});

app.get('/users', function(req, res) {
  db.all("SELECT id, code, ip, useragent, acceptlanguage FROM users", function(error, rows) {
    if(error)
    {
      throw error;
      res.send("Error: " + error);
    }
    else
    {
      var results = [];

      for (var i = 0; i < rows.length; i++)
        results.push(rows[i]);

      res.send(JSON.stringify(results));
    }
  });
});

app.post('/users', function(req, res) {
  var code = req.body.code ? req.body.code : "UNKNOWN";
  var ip = req.connection.remoteAddress;
  var useragent = req.headers['user-agent'] ? req.headers['user-agent'] : "UNKNOWN";
  var acceptlanguage = req.headers['accept-language'] ? req.headers['accept-language'] : "UNKNOWN";

  var stmt1 = db.prepare("INSERT INTO users (code, ip, useragent, acceptlanguage) VALUES (?, ?, ?, ?)");

  var user = -1;

  stmt1.run(code, ip, useragent, acceptlanguage, function() {
    user = stmt1.lastID;
  });

  stmt1.finalize();

  // Check audit

  stmt2 = db.prepare("SELECT * FROM audits WHERE code = ?");

  stmt2.bind(code);

  stmt2.get(function(error, row)
  {
    if(error)
    {
        res.send("Error: " + error);
    }
    else
    {
        if(row)
        {
          // Audit already exists
          var audit = row.id;

          res.send(JSON.stringify({
            user: user,
            audit: audit
          }));
        }
        else
        {
          // Audit doesn't exist
          var stmt3 = db.prepare("INSERT INTO audits (code, description) VALUES (?, ?)");

          stmt3.run(code, code, function() {
            var audit = stmt3.lastID;

            res.send(JSON.stringify({
              user: user,
              audit: audit
            }));
          });

          stmt3.finalize();
        }
    }
  });
});

app.get('/simple', function(req, res){
  var data = {name: 'Gorilla'};
  res.render('simple', data);
});

app.get('/complex', function(req, res){
  var data = {
    name: 'Gorilla',
    address: {
      streetName: 'Broadway',
      streetNumber: '721',
      floor: 4,
      addressType: {
        typeName: 'residential'
      }
    }
  };
  res.render('complex', data);
});

app.get('/loop', function(req, res){
  var basketballPlayers = [
    {name: 'Lebron James', team: 'the Heat'},
    {name: 'Kevin Durant', team: 'the Thunder'},
    {name: 'Kobe Jordan',  team: 'the Lakers'}
  ];

  var days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  var data = {
    basketballPlayers: basketballPlayers,
    days: days
  };

  res.render('loop', data);
});

app.get('/logic', function(req, res){
  var data = {
    upIsUp: true,
    downIsUp: false,
    skyIsBlue: "yes"
  };

  res.render('logic', data);
});

var server = app.listen(3000);
