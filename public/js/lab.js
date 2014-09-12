/* Browser chart */

var browserLoader = wesCountry.loader.renderChart({
	url: "/oss/seriesByBrowser",
	chartType: "pie",
	container: "#browserGraph",
	title: "Browser distribution",
  xAxis: {
    values: [""]
  },
  legend: {
    "font-size": "0.7em",
    itemSize: 1
  },
  barMargin: 2,
  valueOnItem: {
    "font-colour": "#111"
  },
  getChartData: function(options, data) {
		var series = JSON.parse(data);
		options.series = series;

		return options;
	},
});

/* OS chart */

var ossLoader = wesCountry.loader.renderChart({
  url: "/oss/seriesByOS",
  chartType: "pie",
  container: "#ossGraph",
  title: "OS distribution",
  xAxis: {
    values: [""]
  },
  legend: {
    "font-size": "0.7em",
    itemSize: 1
  },
  barMargin: 2,
  valueOnItem: {
    "font-colour": "#111"
  },
  serieColours: ["#EEBA4C", "#E3493B", "#23B5AF", "#A9DDD9", "#BB7365", "#3C4663", "#6D748C", "#F16745", "#FFC65D", "#7BC8A4", "#4CC3D9", "#93648D"],
  getChartData: function(options, data) {
    var series = JSON.parse(data);
    options.series = series;

    return options;
  },
});

/* Question charts */

wesCountry.ajax.load({
  url: "/questions",
  callback: function(questions) {
    questions = JSON.parse(questions);

    var options = {
      chartType: "pie",
      //container: ".question_graphs",
      xAxis: {
        values: [""]
      },
      legend: {
        "font-size": "0.7em",
        itemSize: 1
      },
      valueOnItem: {
        "font-colour": "#111"
      },
      barMargin: 2
    };

    var colours1 = ["#23B5AF", "#FD4E13", "#EEBA4C", "#A9DDD9", "#BB7365", "#3C4663", "#6D748C", "#F16745", "#FFC65D", "#7BC8A4", "#4CC3D9", "#93648D"];
    var colours2 = ["#01DFD7", "#FFBF00", "#97BF5A", "#ED9F2B", "#B43104", "#592F05"];

    var container = document.querySelector(".question_graphs");

    var count = 0;

    for (var question in questions) {
      options.title = question;
      options.series = questions[question];

      var div = document.createElement("div");
      div.id = "g" + wesCountry.guid();
      container.appendChild(div);

      options.container = "#" + div.id;

      options.serieColours = (count % 2 == 0) ? colours1 : colours2;

      wesCountry.charts.chart(options);

      count++;
    }

    var questionsLoader = wesCountry.loader.renderChart({
      url: "/questions",
      chartType: "pie",
      container: "#question_graphs",
      title: "User questions",
      xAxis: {
        values: [""]
      },
      legend: {
        "font-size": "0.7em",
        itemSize: 1
      },
      barMargin: 2,
      serieColours: ["#EEBA4C", "#E3493B", "#23B5AF", "#A9DDD9", "#BB7365", "#3C4663", "#6D748C", "#F16745", "#FFC65D", "#7BC8A4", "#4CC3D9", "#93648D"],
      getChartData: function(options, data) {
        var series = JSON.parse(data);
        options.series = series;

        return options;
      },
    });
  }
});

/* Selection */

var selectionLoader = wesCountry.loader.render({
	callback: function(data) {
    data = JSON.parse(data);
		showDataTable(data);
    showDataPoints(data);
	}
});

var auditSelect = document.getElementById("audit_select");
auditSelect.onchange = loadUserData;

var testSelect = document.getElementById("subtest_select");
testSelect.onchange = loadUserData;

var userSelect = document.getElementById("user_select");
userSelect.onchange = loadUserData;

var eventSelect = document.getElementById("event_select");
eventSelect.onchange = loadUserData;

var refreshButton = document.getElementById("refresh");
refreshButton.onclick = loadUserData;

var pauseButton = document.getElementById("pause");
pauseButton.onclick = pause;

var playButton = document.getElementById("play");
playButton.onclick = play;

function loadUserData() {
  pause();

  //var audit = auditSelect.value;
  var test = testSelect.value;
  var user = userSelect.value;
  //var eventName = eventSelect.value;

  var audits = "";

  for (var i = 0; i < auditSelect.options.length; i++) {
    var option = auditSelect.options[i];

    if (!option.selected)
      continue;

    if (audits != "")
      audits += ",";

    audits += option.value;
  }

  var events = "";

  for (var i = 0; i < eventSelect.options.length; i++) {
    var option = eventSelect.options[i];

    if (!option.selected)
      continue;

    if (events != "")
      events += ",";

    events += option.value;
  }

  selectionLoader.load({
    url: "/observations/" + audits + "/" + test + "/" + user + "/" + events
  });
}

loadUserData();

/* Data table */

var data_table = document.getElementById("data_table");

function showDataTable(data) {
  data_table.innerHTML = "";

  var table = document.createElement("table");
  table.className = "pages"
  data_table.appendChild(table);

  var thead = document.createElement("thead");
  table.appendChild(thead);

  var tr = document.createElement("tr");
  thead.appendChild(tr);

  var columns = ["element", "width", "height", "x", "y", "sx", "sy", "instant", "value"];

  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];

    var th = document.createElement("th");
    th.innerHTML = column;
    tr.appendChild(th);
  }

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (var i = 0; i < data.length; i++) {
    var element = data[i];

    var tr = document.createElement("tr");
    tbody.appendChild(tr);

    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      var value = element[column];

      var td = document.createElement("td");
      td.innerHTML = value;
      tr.appendChild(td);
    }
  }

  // Pagination
  wesCountry.table.pages.apply(20);
}

/* Data points */

var data_points = document.getElementById("data_points");

var playing = true;

var screen = null;
var userData = null;

function showDataPoints(data) {
  var user = userSelect.value;

  wesCountry.ajax.load({
		url: "/users/" + user,
		callback: function(user) {
      user = JSON.parse(user);
      var width = user.width;
      var height = user.height;

      // Save user data
      screen = {
        width: width,
        height: height
      };

      userData = data;

      processDataPoints(width, height, data)
    }
	});
}

function processDataPoints(width, height, data, index) {

  var svg = null;
  var svgNs = "http://www.w3.org/2000/svg";

  if (!index) {
    data_points.innerHTML = "";

    var svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    data_points.appendChild(svg);
  }
  else
    svg = data_points.querySelector("svg");

  drawElements(data, svg, svgNs);
  playing = true;
  drawPoint(index ? index: 0, data, svg, svgNs);
}

function drawElements(data, svg, svgNs) {
  var processedElements = {};

  for (var i = 0; i < data.length; i++) {
    var element = data[i];
    var elementName = element["element"];

    if (processedElements[elementName])
      continue;

    processedElements[elementName] = true;

    // Element coordinates
    var x = element["x"];
    var y = element["y"];

    // Element dimension
    var width = element["width"];
    var height = element["height"];

    // Screen coordinates
    var sx = element["sx"];
    var sy = element["sy"];

    // Element origin
    var ox = sx - x;
    var oy = sy - y;

    if (sx != -1 && sy != -1) {
      // Element rectangle
      var rectangle = document.createElementNS(svgNs, "rect");
      rectangle.setAttributeNS(null, "x", ox);
      rectangle.setAttributeNS(null, "y", oy);
      rectangle.setAttributeNS(null, "width", width);
      rectangle.setAttributeNS(null, "height", height);
      rectangle.setAttributeNS(null, "stroke", "#3B86CD");
      rectangle.setAttributeNS(null, "fill", "transparent");
      svg.appendChild(rectangle);

      var text = document.createElementNS(svgNs, 'text');
      text.setAttribute('x', ox + width / 2);
      text.setAttribute('y', oy + height / 2);
      text.setAttribute('fill', "#345F86");
      text.setAttribute('text-anchor', "middle");
      text.textContent = elementName;
      svg.appendChild(text);
    }
  }
}

var timeout = null;
var indexPos = null;

function drawPoint(i, data, svg, svgNs) {
  if (i >= data.length || !playing)
    return;

  // Save pos
  indexPos = i;

  var element = data[i];

  var event = element["type"];

  // Element coordinates
  var x = element["x"];
  var y = element["y"];

  // Element dimension
  var width = element["width"];
  var height = element["height"];

  // Screen coordinates
  var sx = element["sx"];
  var sy = element["sy"];

  // Element origin
  var ox = sx - x;
  var oy = sy - y;

  var colour = "";
  var radius = 4;

  switch(event) {
    case "onclick":
      colour = "rgba(217, 24, 24, 0.8)";
      radius = 8;
      break;
    case "ondblclick":
      colour = "rgba(49, 180, 4, 0.8)";
      radius = 8;
      break;
    default:
      colour = "rgba(32, 89, 143, 0.5)";
      radius = 4;
      break;
  }

  if (sx != -1 && sy != -1) {
    // Event
    var circle = document.createElementNS(svgNs, "circle");
    circle.setAttributeNS(null, "cx", sx);
    circle.setAttributeNS(null, "cy", sy);
    circle.setAttributeNS(null, "r",  radius);
    circle.setAttributeNS(null, "fill", colour);
    svg.appendChild(circle);
  }

  timeout = setTimeout(function() {
    drawPoint(i + 1, data, svg, svgNs);
  }, 10);
}

function pause() {
  if (timeout)
    clearTimeout(timeout);

  playing = false;
}

function play() {
  processDataPoints(screen.width, screen.height, userData, indexPos);
}
