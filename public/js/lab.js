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
  serieColours: ["#EEBA4C", "#E3493B", "#23B5AF", "#A9DDD9", "#BB7365", "#3C4663", "#6D748C", "#F16745", "#FFC65D", "#7BC8A4", "#4CC3D9", "#93648D"],
  getChartData: function(options, data) {
    var series = JSON.parse(data);
    options.series = series;

    return options;
  },
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

function loadUserData() {
  var audit = auditSelect.value;
  var test = testSelect.value;
  var user = userSelect.value;
  var eventName = eventSelect.value;

  selectionLoader.load({
    url: "/observations/" + audit + "/" + test + "/" + user + "/" + eventName
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

function showDataPoints(data) {
  var user = userSelect.value;

  wesCountry.ajax.load({
		url: "/users/" + user,
		callback: function(user) {
      user = JSON.parse(user);
      var width = user.width;
      var height = user.height;

      processDataPoints(width, height, data)
    }
	});
}

function processDataPoints(width, height, data) {
  data_points.innerHTML = "";

  var svgNs = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
  data_points.appendChild(svg);

  drawElements(data, svg, svgNs);
  drawPoint(0, data, svg, svgNs);
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

function drawPoint(i, data, svg, svgNs) {
  if (i >= data.length)
    return;

  var element = data[i];

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
    // Event
    var circle = document.createElementNS(svgNs, "circle");
    circle.setAttributeNS(null, "cx", sx);
    circle.setAttributeNS(null, "cy", sy);
    circle.setAttributeNS(null, "r",  4);
    circle.setAttributeNS(null, "fill", "rgba(32, 89, 143, 0.5)");
    svg.appendChild(circle);
  }

  setTimeout(function() {
    drawPoint(i + 1, data, svg, svgNs);
  }, 10);
}
