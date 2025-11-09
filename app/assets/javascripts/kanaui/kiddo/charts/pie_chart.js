(function (Kiddo, d3) {
  Kiddo.PieChart = function () {
    var self = this;
    var radius = Math.min(this.width, this.height) / 2;

    // Custom blue color theme - matching the line chart
    var blueColors = [
      "#1565C0",
      "#1976D2",
      "#2196F3",
      "#42A5F5",
      "#64B5F6",
      "#90CAF9",
      "#BBDEFB",
      "#E3F2FD",
    ];
    var color = d3.scale.ordinal().range(blueColors);

    var arc = d3.svg
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    var pie = d3.layout
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });

    return {
      render: function (svg, json) {
        var data = json.data;

        svg.attr(
          "transform",
          "translate(" + self.width / 2 + "," + self.height / 2 + ")"
        );

        data.forEach(function (d) {
          d.value = +d.value;
        });

        var g = svg
          .selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "arc");

        g.append("path")
          .attr("d", arc)
          .style("fill", function (d, i) {
            return color(i);
          }) // Use index for consistent coloring
          .style("stroke", "#ffffff")
          .style("stroke-width", "1px"); // Add white borders for better separation

        var colorCircle = function (value, index) {
          return (
            '<span class="colored-dot" style="background-color:' +
            color(index) +
            ';"></span>'
          );
        };

        g.append("foreignObject")
          .attr("width", 200)
          .attr("height", 150)
          .attr("dy", ".35em")
          .attr("x", 250)
          .attr("y", function (d, i) {
            return 50 * i - 200;
          })
          .html(function (d, i) {
            return (
              colorCircle(d.data.value, i) + d.data.label + ": " + d.data.value
            );
          })
          .attr("class", "chart_values");
      },
    };
  };
})((window.Kiddo = window.Kiddo || {}), d3);
