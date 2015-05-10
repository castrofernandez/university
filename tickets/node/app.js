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

// Database
var mysql = require('mysql');

// Files
var fs = require('fs');

// String format
String.format = function(pattern)
{
	for (var i = 1; i < arguments.length; i++)
	{
		var regex = new RegExp('\\{' + (i - 1) + '\\}', 'g');
		pattern = pattern.replace(regex, arguments[i]);
	}
	return pattern;
};

function getDBConnection() {
  return mysql.createConnection({
     host: 'localhost',
     user: 'juancast_bus',
     password: 'neuronal_org_1',
     database: 'juancast_bus',
     port: 3306
  });
}

app.get('/users', function(req, res) {
  var info = req.param('info') ? req.param('info') : '';
  var ip = req.ip;
  
  var sessionid = req.param('session');

  var useragent = req.headers['user-agent'] ? req.headers['user-agent'] : "UNKNOWN";
  var acceptlanguage = req.headers['accept-language'] ? req.headers['accept-language'] : "UNKNOWN";

  var width = req.param('width');
  var height = req.param('height');

  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
     	console.log(error)
        res.jsonp({
        "success": false,
        "error": error,
        "session": sessionid
        });
     }else{
        console.log('Conexion correcta.');
     }
  });

  var user = -1;
  
  var queryStr = "SELECT id FROM users WHERE session = '" + sessionid + "'";

  var query = connection.query(queryStr, function(error, result){
        if (error) {
           res.jsonp({
        	"success": false,
        	"error": error,
        	"session": sessionid
        	});
        } else {
        	if (result && result.length && result.length > 0) {
				res.jsonp({
        			"success": true,
        			"id": result[0].id,
        			"session": sessionid
        		});
        	}
        	else {
        		var query = connection.query('INSERT INTO users (ip, useragent, acceptlanguage, width, height, info, session) VALUES (?, ?, ?, ?, ?, ?, ?)', [ip, useragent, acceptlanguage, width, height, info, sessionid], function(error, result){
					  if (error) {
						res.jsonp({
						"success": false,
						"error": error,
						"session": sessionid
						});
					  } else {
						user = result.insertId;
						req.session["user_id"] = user;
						res.jsonp({
						"success": true,
						"id": user,
						"session": sessionid
						});
					  }
					}
				  );
        	}
        }
     }
  );
});

app.get('/observations', function(req, res) {
  var identifier = req.param('identifier');
  var element = req.param('element');
  var width = req.param('width');
  var height = req.param('height');
  var x = req.param('x');
  var y = req.param('y');
  var sx = req.param('sx');
  var sy = req.param('sy');
  var instant = req.param('instant');
  var type = req.param('type');
  var value = req.param('value');
  var other_value = req.param('other_value');
  var label = req.param('label');
  var user_id = req.param('user_id');
  var count = req.param("count");
  var test = req.param("test");
  
  var form = req.param("form");
  var email = req.param("email");
  var session_id = req.param("session");

  var connection = getDBConnection();

  connection.connect(function(error){
     if(error){
     	console.log(error)
        res.jsonp({
        "success": false,
        "error": error
        });
     }else{
        console.log('Conexion correcta.');
     }
  });
    var query = connection.query('INSERT INTO observations (identifier, element, type, value, other_value, label, width, height, x, y, sx, sy, instant, user_id, count, test, form, email, session) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [identifier, element, type, value, other_value, label, width, height, x, y, sx, sy, instant, user_id, count, test, form, email, session_id], function(error, result){
        if (error) {
          res.jsonp({
        	"success": false,
        	"error": error
        	});
        } else {

        }
      }
    );

  connection.end();

  res.jsonp({
     "success": true
    });
});

////////////////////////////////////////////////////////////////////////////////
//                              SERVER START
////////////////////////////////////////////////////////////////////////////////

var server = app.listen(3000);
