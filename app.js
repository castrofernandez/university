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

////////////////////////////////////////////////////////////////////////////////
//                                    LAB                                     //
////////////////////////////////////////////////////////////////////////////////

app.get('/lab', function(req, res){
  // Favicon
  app.use(favicon(__dirname + '/public/img/lab_favicon.ico'));

  getAudits(function(error, audits) {
    getSubtests(function(error, subtests) {
      getUsers(null, function(error, users) {
        getEvents(function(error, events) {
          res.render('lab', {
            audits: audits,
            subtests: subtests,
            users: users,
            events: events
          });
        });
      });
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
//                                OBSERVATIONS                                //
////////////////////////////////////////////////////////////////////////////////

app.get('/observations', function(req, res) {
  getObservations(null, null, null, null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/observations/:audit', function(req, res) {
  var audit = req.params.audit ? req.params.audit : null;

  getObservations(audit, null, null, null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/observations/:audit/:test', function(req, res) {
  var audit = req.params.audit ? req.params.audit : null;
  var test = req.params.test ? req.params.test : null;

  getObservations(audit, test, null, null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/observations/:audit/:test/:user', function(req, res) {
  var audit = req.params.audit ? req.params.audit : null;
  var test = req.params.test ? req.params.test : null;
  var user = req.params.user ? req.params.user : null;

  getObservations(audit, test, user, null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/observations/:audit/:test/:user/:event', function(req, res) {
  var audit = req.params.audit ? req.params.audit : null;
  var test = req.params.test ? req.params.test : null;
  var user = req.params.user ? req.params.user : null;
  var event = req.params.event ? req.params.event : null;

  getObservations(audit, test, user, event, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getObservations(audit, test, user, eventName, callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var queryStr = 'SELECT id, identifier, element, date, type, CONVERT(value USING utf8) AS value, width, height, x, y, sx, sy, instant, user_id, audit_id FROM observations';
  var where = " WHERE";

  if (audit)
    where += " audit_id = " + audit;
  else
    where += " 1=1";

  if (test)
    where += ' AND identifier = "' + test + '"';

  if (user)
    where += ' AND user_id = ' + user;

  if (eventName)
    where += ' AND type = "' + eventName + '"';

  queryStr += where;
  queryStr += " ORDER BY instant"

  var query = connection.query(queryStr, function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++)
            results.push(result[i]);

          callback(true, results);
        }
     }
  );

  connection.end();
}

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

////////////////////////////////////////////////////////////////////////////////
//                                   USERS                                    //
////////////////////////////////////////////////////////////////////////////////

app.get('/users', function(req, res) {
  getUsers(null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/users/:user', function(req, res) {
  var user = req.params.user ? req.params.user : null;

  getUsers(user, function(success, data) {
    if (!success)
      res.send(data)
    else {
      data = data.length > 0 ? data[0] : data;
      res.send(JSON.stringify(data));
    }
  });
});

function getUsers(user, callback) {
  var connection = getDBConnection();

  connection.connect(function(error) {
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var queryStr = 'SELECT id, code, ip, useragent, acceptlanguage, width, height FROM users';

  if (user)
    queryStr += " WHERE id = " + user;

  var query = connection.query(queryStr, function(error, result) {
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++)
            results.push(result[i]);

          callback(true, results);
        }
     }
  );

  connection.end();
}

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
     	console.log(error)
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

/*
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
*/

////////////////////////////////////////////////////////////////////////////////
//                                  AUDITS                                    //
////////////////////////////////////////////////////////////////////////////////

app.get('/audits', function(req, res) {
  getAudits(function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getAudits(callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT * FROM audits', function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++) {
            results.push(result[i]);
          }

          callback(true, results);
        }
     }
  );

  connection.end();
}

////////////////////////////////////////////////////////////////////////////////
//                                  EVENTS                                    //
////////////////////////////////////////////////////////////////////////////////

app.get('/events', function(req, res) {
  getEvents(function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getEvents(callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT DISTINCT type FROM observations', function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++) {
            results.push(result[i]["type"]);
          }

          callback(true, results);
        }
     }
  );

  connection.end();
}

////////////////////////////////////////////////////////////////////////////////
//                                SUBTESTS                                    //
////////////////////////////////////////////////////////////////////////////////

app.get('/subtests', function(req, res) {
  getSubtests(function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getSubtests(callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT DISTINCT identifier FROM observations', function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++) {
            results.push(result[i]["identifier"]);
          }

          callback(true, results);
        }
     }
  );

  connection.end();
}

////////////////////////////////////////////////////////////////////////////////
//                                    OSS                                     //
////////////////////////////////////////////////////////////////////////////////

app.get('/oss', function(req, res) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        res.send("Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT useragent, COUNT(1) AS count FROM users GROUP BY useragent', function(error, result){
        if (error) {
           res.send("Error: " + error);
        } else {
          var results = [];

          for (var i = 0; i < result.length; i++) {
            var useragent = result[i]["useragent"];
            var os = getOS(useragent);
            var browser = getBrowser(useragent);

            results.push({
              "useragent": useragent,
              "os": os,
              "browser": browser
            });
          }

          res.send(JSON.stringify(results));
        }
     }
  );

  connection.end();
});

app.get('/oss/seriesByBrowser', function(req, res) {
  getOssSeriesByBrowser(function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getOssSeriesByBrowser(callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT useragent, COUNT(1) AS count FROM users GROUP BY useragent', function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = {};

          for (var i = 0; i < result.length; i++) {
            var useragent = result[i]["useragent"];
            var count = result[1]["count"];

            var browser = getBrowser(useragent);

            if (!results[browser])
              results[browser] = 0;

            results[browser] = results[browser] + count;
          }

          var series = [];

          for (var browser in results) {
            var count = results[browser];

            series.push({
              name: browser,
              values: [ count ]
            });
          }

          callback(true, series);
        }
     }
  );

  connection.end();
}

app.get('/oss/seriesByOS', function(req, res) {
  getOssSeriesByOS(function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getOssSeriesByOS(callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT useragent, COUNT(1) AS count FROM users GROUP BY useragent', function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = {};

          for (var i = 0; i < result.length; i++) {
            var useragent = result[i]["useragent"];
            var count = result[1]["count"];

            var os = getOS(useragent);

            if (!results[os])
              results[os] = 0;

            results[os] = results[os] + count;
          }

          var series = [];

          for (var os in results) {
            var count = results[os];

            series.push({
              name: os,
              values: [ count ]
            });
          }

          callback(true, series);
        }
     }
  );

  connection.end();
}

function getBrowser(useragent) {
	var browsers = {
    'Internet Explorer': /msie/i,
    'Internet Explorer 11': /trident\/7/i,
    'Internet Explorer 10': /trident\/6/i,
    'Internet Explorer 9': /trident\/5/i,
    'Internet Explorer 8': /trident\/4/i,
    'Firefox': /firefox/i,
    'Chrome': /chrome/i,
    'Safari': /safari/i,
    'Opera': /opera/i,
    'Netscape': /netscape/i,
    'Maxthon': /maxthon/i,
    'Konqueror': /konqueror/i,
    'Handheld Browser': /mobile/i
  };

  for (var browser in browsers) {
    var pattern = browsers[browser];

    if (useragent.match(pattern))
      return browser;
  }

  return "unknown";
}

function getOS(useragent) {
  var oss = {
    'Windows 8.1': /windows nt 6\.3/i,
    'Windows 8': /windows nt 6\.2/i,
    'Windows 7': /windows nt 6\.1/i,
    'Windows Vista': /windows nt 6\.0/i,
    'Windows Server 2003/XP x64': /windows nt 5\.2/i,
    'Windows XP (Service Pack 3)': /windows nt 5\.1/i,
    'Windows XP': /windows xp/i,
    'Windows 2000':  /windows nt 5\.0/i,
    'Windows ME': /windows me/i,
    'Windows 98': /win98/i,
    'Windows 95': /win95/i,
    'Windows 3.11': /win16/i,
    'Mac OS X': /macintosh|mac os x/i,
    'Mac OS 9': /mac_powerpc/i,
    'Linux': /linux/i,
    'Ubuntu': /ubuntu/i,
    'iPhone': /iphone/i,
    'iPod': /ipod/i,
    'iPad': /ipad/i,
    'Android': /android/i,
    'BlackBerry': /blackberry/i,
    'Mobile': /webos/i
  };

  for (var os in oss) {
    var pattern = oss[os];

    if (useragent.match(pattern))
      return os;
  }

  return "unknown";
}

var server = app.listen(3000);
