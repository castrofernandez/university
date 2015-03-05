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

/* Question charts */

function renderCharts(audit) {
  wesCountry.ajax.load({
    url: audit ? "/questionsByAudit/" + audit : "/questions",
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
      container.innerHTML = "";

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
  /*
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
      });*/
    }
  });
}
