(function (d3, $, window, document, undefined) {
  $(document).ready(function () {
    if ($("#chartAnchor").length == 0) {
      return;
    }

    d3.json($("#chartAnchor").data("reports-path"), function (error, json) {
      $("#loading-spinner").remove();

      var renderer = new Kiddo.Renderer("#chartAnchor");

      if (error) {
        ajaxErrorAlert(error);
        return renderer.noData();
      }

      var data = json[0];

      if (
        data === undefined ||
        data.data === undefined ||
        data.data.length == 0
      ) {
        return renderer.noData();
      }

      var render = function (type) {
        switch (type) {
          case "COUNTERS":
            renderer.pieChart(data);
            break;
          case "TIMELINE":
            renderer.lineChart(data);
            // Date controls only make sense for timelines
            $("#date-controls").show();
            break;
          case "TABLE":
            renderer.table(data);
            break;
          default:
            console.log("No such type implemented: " + type);
            renderer.noData();
        }
      };

      try {
        render(data.type);
      } catch (ex) {
        console.log(ex);
        renderer.noData();
      }
    });
  });
})(d3, jQuery, window, document);
