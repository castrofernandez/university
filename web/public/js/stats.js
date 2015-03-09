////////////////////////////////////////////////////////////////////////////////
//                              CHART CREATIONå
////////////////////////////////////////////////////////////////////////////////

/* Browser chart */

var browserLoader = wesCountry.loader.renderChart({
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

/* Unfinished tests */

var userStatsLoader = wesCountry.loader.renderChart({
	chartType: "pie",
	container: "#unfinished",
	title: "",
	xAxis: {
		values: [""]
	},
	legend: {
		show: false
	},
	barMargin: 0,
	margins: [0, 0, 0, 0],
	valueOnItem: {
		show: false
	},
	serieColours: ["#ccc", "#E3493B"],
	getChartData: function(options, data) {
		var data = JSON.parse(data);

		var unfinished = data["unfinished"] ? parseInt(data["unfinished"]) : 0;
		var total = data["count"] ? parseInt(data["count"]) : 0;

		var series = [
			{
				name: "finished",
				values: [ total - unfinished ]
			},
			{
				name: "unfinished",
				values: [ unfinished ]
			}
		];

		options.series = series;

		// Update view
		document.getElementById("userCount").innerHTML = total;
		document.getElementById("userUnfinished").innerHTML = unfinished;
		document.getElementById("userUnfinishedPercent").innerHTML = total != 0 ? (unfinished * 100 / total).toFixed(2) : 0;

		return options;
	},
});

////////////////////////////////////////////////////////////////////////////////
//                                 PAGE STATE
////////////////////////////////////////////////////////////////////////////////

wesCountry.stateful.start({
  init: function (parameters, selectors) {

	},
  urlChanged: function (parameters, selectors) {

	},
  elements: [
    {
      name: "audit",
      selector: "#audit_select",
      onChange: function (index, value, parameters, selectors) {
        renderCharts(value);
			}
    }
	]
});

////////////////////////////////////////////////////////////////////////////////
//                                 CHART LOAD
////////////////////////////////////////////////////////////////////////////////

function renderCharts(audit) {
	browserLoader.load({
		url: "/oss/seriesByBrowser/" + audit
	});

	ossLoader.load({
		url: "/oss/seriesByOS/" + audit
	});

	userStatsLoader.load({
		url: "/users/stats/" + audit
	});
}