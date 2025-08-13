(function (Kiddo, d3) {
  Kiddo.Utils = Kiddo.Utils || {};

  Kiddo.Utils.MouseOver = function () {
    var self = this;
    var helper = new Kiddo.Helper();

    return {
      render: function (svg, x, y) {
        var focus = svg
          .append("g")
          .attr("class", "focus")
          .style("display", "none");

        var canvas = svg
          .append("g")
          .attr("id", "mouseover_canvas")
          .style("display", "none");

        var info = canvas
          .append("rect")
          .attr("class", "information")
          .attr("width", self.width / 2);

        // The magic:
        svg
          .append("rect")
          .attr("class", "overlay")
          .attr("width", self.width)
          .attr("height", self.height)
          .attr("transform", "translate(" + self.margin_left + ",0)")
          .on("mouseover", function () {
            focus.style("display", null);
            canvas.style("display", null);
          })
          .on("mouseout", function () {
            focus.style("display", "none");
            canvas.style("display", "none");
          })
          .on("mousemove", mousemove);

        var infoTitleBg = canvas
          .append("rect")
          .attr("class", "info-title__bg")
          .attr("width", self.width)
          .attr("height", 30);

        var infoTitle = canvas
          .append("text")
          .attr("dy", "1em")
          .attr("dx", 0)
          .attr("class", "info-title")
          .attr("id", "info-title");

        var addInfoDimensions = function (element) {
          // On mouseover, element is the current label_idx
          var box = element.node().getBBox();
          // infoBox is the .information rect
          var infoBox = info.node().getBBox();
          var infoTitleBox = infoTitle.node().getBBox();
          var margin = 40;

          info.attr("height", infoBox.height + box.height + 7);
          if (infoBox.width < box.width) {
            info.attr("width", box.width + margin);
            infoTitleBg.attr("width", box.width + margin);

            $("#mouseover_canvas #info-title").attr(
              "dx",
              (box.width + margin) / 2 - infoTitleBox.width / 2
            );
          }
        };

        self.datasets.forEach(function (element, index) {
          focus
            .append("circle")
            .attr("r", 4.5)
            .attr("id", "circle_" + index)
            .attr("transform", "translate(" + self.margin_left + ",0)");
        });

        function mousemove() {
          var _this = this;

          $("#mouseover_canvas .chart_values").detach().remove();
          $("#mouseover_canvas .chart_circles").detach().remove();
          info.attr("height", infoTitleBg.node().getBBox().height + 10);
          info.attr("width", 1);
          infoTitle.attr("width", 1);

          var elementsForLegend = [];
          self.datasets.forEach(function (element, index) {
            var data = element.values;
            var name = element.name;

            var x0 = x.invert(d3.mouse(_this)[0]),
              i = helper.bisectDate(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i];

            if (d0 !== undefined && d1 !== undefined) {
              var d = x0 - d0.x > d1.x - x0 ? d1 : d0;
            } else if (d0 !== undefined) {
              var d = d0;
            } else if (d1 !== undefined) {
              var d = d1;
            } else {
              return;
            }

            focus
              .select("#circle_" + index)
              .attr("cx", x(d.x))
              .attr("cy", y(d.y))
              .style("fill", self.color(name));

            var canvasPosition = x(x0) > self.width / 2 ? 50 : self.width / 2;

            canvas.attr("transform", "translate(" + canvasPosition + ",0)");

            canvas.select("#info-title").text(d.date);

            elementsForLegend.push({ element: element, d: d });
          });

          elementsForLegend.sort(function (a, b) {
            return a.d.y > b.d.y ? -1 : a.d.y < b.d.y ? 1 : 0;
          });

          // Limit the number of legend items (document largest values only)
          elementsForLegend.slice(0, 10).forEach(function (element, index) {
            canvas
              .append("circle")
              .attr("r", 5.5)
              .attr("cx", 15)
              .attr("cy", (index + 2) * 25)
              .attr("class", "chart_circles")
              .style("fill", self.color(element.element.name))
              .style("stroke", "black");

            var text = canvas
              .append("text")
              .attr("y", (index + 2) * 25)
              .attr("x", 25)
              .attr("cx", 25)
              .attr("dy", ".35em")
              .attr("class", "chart_values")
              .attr("id", "label_" + index)
              .text(
                element.d === undefined
                  ? element.element.name
                  : helper.formatValueDisplay(element.element.name, element.d)
              );

            addInfoDimensions(text);
          });
        }
      },
    };
  };
})((window.Kiddo = window.Kiddo || {}), d3);
