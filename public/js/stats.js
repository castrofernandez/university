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
