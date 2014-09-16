var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'})); // Upload limit

var expressHbs = require('express3-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// Express behind proxy (IP)
app.enable('trust proxy');

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
  res.writeHead(301, { Location: '/lab/stats/' });
  res.end();
});

app.get('/lab/stats', function(req, res){
  // Favicon
  app.use(favicon(__dirname + '/public/img/lab_favicon.ico'));
  renderLab(res, "stats")
});

app.get('/lab/questions', function(req, res){
  // Favicon
  app.use(favicon(__dirname + '/public/img/lab_favicon.ico'));
  renderLab(res, "questions")
});

app.get('/lab/events', function(req, res){
  // Favicon
  app.use(favicon(__dirname + '/public/img/lab_favicon.ico'));
  renderLab(res, "events")
});

function renderLab(res, view) {
  getAudits(function(error, audits) {

    if (audits.length > 0)
      audits[0].selected = "selected";

    getSubtests(function(error, subtests) {

      if (subtests.length > 0)
        subtests[0].selected = "selected";

      getUsers(null, function(error, users) {

        if (users.length > 0)
          users[0].selected = "selected";

        getEvents(function(error, events) {

          if (events.length > 0)
            events[0].selected = "selected";

          getUserStats(function(error, userStats) {

            var percent = 0;

            if (userStats)
              percent = (100 * userStats["count"] / userStats["total"]).toFixed(2);

            res.render(view, {
              audits: audits,
              subtests: subtests,
              users: users,
              events: events,
              count: users.length,
              unfinished: userStats ? userStats["count"] : 0,
              unfinishedPercent: percent
            });

          });
        });
      });
    });
  });
}

function getUserStats(callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var queryStr = 'SELECT count, (SELECT COUNT(1) FROM users) AS total FROM (SELECT COUNT(1) AS count FROM (SELECT count FROM (SELECT user_id, COUNT(1) AS count FROM (SELECT DISTINCT identifier, user_id FROM observations) o1 GROUP BY user_id) c1 HAVING count <> (SELECT COUNT(identifier) FROM (SELECT DISTINCT identifier FROM observations) o2)) c2) f';

  var query = connection.query(queryStr, function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {

          callback(true, result.length > 0 ? result[0] : null);
        }
     }
  );

  connection.end();
}

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

app.get('/observations/:audits', function(req, res) {
  var audits = req.params.audits ? req.params.audits : null;

  getObservations(audits, null, null, null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/observations/:audits/:test', function(req, res) {
  var audits = req.params.audits ? req.params.audits : null;
  var test = req.params.test ? req.params.test : null;

  getObservations(audits, test, null, null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/observations/:audits/:test/:user', function(req, res) {
  var audits = req.params.audits ? req.params.audits : null;
  var test = req.params.test ? req.params.test : null;
  var user = req.params.user ? req.params.user : null;

  getObservations(audits, test, user, null, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

app.get('/observations/:audits/:test/:user/:events', function(req, res) {
  var audits = req.params.audits ? req.params.audits : null;
  var test = req.params.test ? req.params.test : null;
  var user = req.params.user ? req.params.user : null;
  var events = req.params.events ? req.params.events : null;

  getObservations(audits, test, user, events, function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getObservations(audits, test, user, events, callback) {
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

  if (audits)
    where += " audit_id IN (" + audits + ")";
  else
    where += " 1=1";

  if (test)
    where += ' AND identifier = "' + test + '"';

  if (user)
    where += ' AND user_id = ' + user;

  if (events) {
    events = events.replace(',', '", "')
    where += ' AND type IN ("' + events + '")';
  }

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

  var queryStr = 'SELECT id, code, ip, useragent, acceptlanguage, width, height, CONVERT(info USING UTF8) AS info FROM users';

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
  var info = req.body.info ? req.body.info : null;
  var ip = req.ip;

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

  var query = connection.query('INSERT INTO users (code, ip, useragent, acceptlanguage, width, height, info) VALUES (?, ?, ?, ?, ?, ?, ?)', [code, ip, useragent, acceptlanguage, width, height, info], function(error, result){
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
            results.push({
              event: result[i]["type"]
            });
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
            results.push({
              test: result[i]["identifier"]
            });
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
            var count = result[i]["count"];

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
            var count = result[i]["count"];

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
    'iPhone': /iphone/i,
    'iPod': /ipod/i,
    'iPad': /ipad/i,
    'Mac OS X': /macintosh|mac os x/i,
    'Mac OS 9': /mac_powerpc/i,
    'Linux': /linux/i,
    'Ubuntu': /ubuntu/i,
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

////////////////////////////////////////////////////////////////////////////////
//                                 QUESTIONS
////////////////////////////////////////////////////////////////////////////////

app.get('/questions', function(req, res) {
  getQuestions(function(success, data) {
    if (!success)
      res.send(data)
    else
      res.send(JSON.stringify(data));
  });
});

function getQuestions(callback) {
  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
        callback(false, "Error: " + error);
     }else{
        console.log('Connection made');
     }
  });

  var query = connection.query('SELECT element, CONVERT(value USING utf8) AS value, COUNT(1) AS count FROM observations WHERE type = "answer" GROUP BY element, CONVERT(value USING utf8) ORDER BY element', function(error, result){
        if (error) {
           callback(false, "Error: " + error);
        } else {
          var results = {};

          for (var i = 0; i < result.length; i++) {
            var element = result[i]["element"];
            var value = result[i]["value"];
            var count = result[i]["count"];

            if (!results[element])
              results[element] = [];

            results[element].push({
              name: value,
              values: [ count ]
            });
          }

          // Group age values
          results["AGE_VALUE"] = sortAgeValues(results["AGE_VALUE"])

          callback(true, results);
        }
     }
  );

  connection.end();
}

function sortAgeValues(data) {

  if (!data)
    return null;

  var groups = [
    {
      min: 0,
      max: 9
    },
    {
      min: 10,
      max: 14
    },
    {
      min: 15,
      max: 19
    },
    {
      min: 20,
      max: 29
    },
    {
      min: 30,
      max: 39
    },
    {
      min: 40,
      max: 49
    },
    {
      min: 50,
      max: 59
    },
    {
      min: 60,
      max: 100
    }
  ];

  var results = {};

  for (var i = 0; i < data.length; i++) {
    var element = data[i];
    var age = parseInt(element.name);
    var count = element.values[0];

    for (var j = 0; j < groups.length; j++) {
      var group = groups[j];

      if (age >= group.min && age <= group.max) {
        var groupName = group.min + "-" + group.max;

        if (!results[groupName])
          results[groupName] = 0;

        results[groupName] = results[groupName] + count;

        break;
      }
    }
  }

  var processedResults = [];

  for (var group in results) {
    processedResults.push({
      name: group,
      values: [ results[group] ]
    });
  }

  return processedResults;
}

////////////////////////////////////////////////////////////////////////////////
//                              SERVER START
////////////////////////////////////////////////////////////////////////////////

var server = app.listen(3000);
