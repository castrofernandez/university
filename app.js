var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'})); // Upload limit

var expressHbs = require('express3-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// Public folder
app.use(express.static(__dirname + '/public'));

// Session
var cookieParser = require('cookie-parser');
var expressSession = require('express-session')
app.use(cookieParser());
app.use(expressSession({
                          secret: 'asdf30klk3jrl3k400000233dlfjweofj',
                          saveUninitialized: true,
                          resave: true}));

// Favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// Database
var mysql = require('mysql');

function getDBConnection() {
  return mysql.createConnection({
     host: 'localhost',
     user: 'juancast_circo',
     password: 'neuronal_org_1',
     database: 'juancast_circo',
     port: 3306
  });
}

app.get('/', function(req, res){
  //res.render('index');

  var code = req.query.code;
  code = code ? "?code=" + code : ""

  res.writeHead(301, { Location: '/tests/test1/' + code });
  res.end();
});

app.get('/tests', function(req, res) {
  var code = req.query.code;
  code = code ? "?code=" + code : ""

  res.writeHead(301, { Location: '/tests/test1/' + code });
  res.end();
});

app.get('/played/:identifier', function(req, res) {
  var identifier = req.params.identifier ? req.params.identifier : null;

  if (identifier) {
    res.send(req.session[identifier] ? "TRUE" : "FALSE");
    return;
  }

  res.send("FALSE");
});

app.post('/played', function(req, res) {
  var identifier = req.body.identifier ? req.body.identifier : null;

  if (identifier) {
    req.session[identifier] = true;
  }

  res.send("Thanks");
});

app.get('/observations', function(req, res) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        res.send("Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT id, identifier, element, date, type, CONVERT(value USING utf8) AS value, width, height, x, y, instant, user_id, audit_id FROM observations', function(error, result){
        if (error) {
           res.send("Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++)
            results.push(result[i]);

          res.send(JSON.stringify(results));
        }
     }
  );

  connection.end();
});

app.post('/observations', function(req, res) {
  var data = req.body.data ? req.body.data : {};
  var identifier = data.identifier ? data.identifier : "UNKNOWN";
  var user = req.body.user ? req.body.user : -1;
  var audit = req.body.audit ? req.body.audit : -1;

  var observations = data.observations;

  if (!observations) {
    res.send("Thanks");
    return;
  }

  var length = observations.length;

  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        res.send("Error: " + error);
     }else{
        console.log('Conexion correcta.');
     }
  });

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
    var sx = coordinate.sx ? coordinate.sx : -1;
    var sy = coordinate.sy ? coordinate.sy : -1;
    var instant = observation.instant ? observation.instant : -1;

    var query = connection.query('INSERT INTO observations (identifier, element, type, value, width, height, x, y, sx, sy, instant, user_id, audit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [identifier, element, type, value, width, height, x, y, sx, sy, instant, user, audit], function(error, result){
        if (error) {
          res.send("Error: " + error);
        } else {

        }
      }
    );
  }

  connection.end();

  res.send('Thanks');
});

app.get('/users', function(req, res) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        res.send("Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT id, code, ip, useragent, acceptlanguage FROM users', function(error, result){
        if (error) {
           res.send("Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++)
            results.push(result[i]);

          res.send(JSON.stringify(results));
        }
     }
  );

  connection.end();
});

app.post('/users', function(req, res) {
  var code = req.body.code ? req.body.code : "UNKNOWN";
  var ip = req.connection.remoteAddress;
  var useragent = req.headers['user-agent'] ? req.headers['user-agent'] : "UNKNOWN";
  var acceptlanguage = req.headers['accept-language'] ? req.headers['accept-language'] : "UNKNOWN";

  var width = req.body.width ? req.body.width : -1;
  var height = req.body.height ? req.body.height : -1;

  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        res.send("Error: " + error);
     }else{
        console.log('Conexion correcta.');
     }
  });

  var user = -1;

  var query = connection.query('INSERT INTO users (code, ip, useragent, acceptlanguage, width, height) VALUES (?, ?, ?, ?, ?, ?)', [code, ip, useragent, acceptlanguage, width, height], function(error, result){
      if (error) {
        res.send("Error: " + error);
      } else {
        user = result.insertId;
      }
    }
  );

  // Check audit

  var query = connection.query('SELECT * FROM audits WHERE code = ?', code, function(error, result){
        if(error) {
           res.send("Error: " + error);
        } else {
           if (result.length > 0) {
              // Audit already exists
              result = result[0];

              var audit = result.id;

              res.send(JSON.stringify({
                 user: user,
                 audit: audit
               }));

           } else {
              var query = connection.query('INSERT INTO audits (code, description) VALUES (?, ?)', [code, code], function(error, result){
                  if (error) {
                    res.send("Error: " + error);
                  } else {
                    var audit = result.insertId;

                    res.send(JSON.stringify({
                      user: user,
                      audit: audit
                    }));
                  }
                }
              );
           }
        }

    connection.end();
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
