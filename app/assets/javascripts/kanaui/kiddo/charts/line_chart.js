(function (Kiddo, d3) {
  Kiddo.LineChart = function () {
    var self = this;

    this.x = d3.time.scale().range([0, this.width]);
    this.y = d3.scale.linear().range([this.height, 0]);

    var valueline = d3.svg
      .line()
      .x(function (d) {
        return self.x(d.x);
      })
      .y(function (d) {
        return self.y(d.y);
      })
      .interpolate("monotone"); // Smooth line interpolation

    var axes = Kiddo.Axes.apply(this);
    var helper = new Kiddo.Helper();

    // Custom blue color theme matching the image
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
    self.color = d3.scale.ordinal().range(blueColors);

    return {
      render: function (svg, json) {
        var title = json.title,
          datasets = json.data;

        // Scale the range of the data before rendering axes
        var allValues = datasets.reduce(function (result, element) {
          return result.concat(element.values);
        }, []);

        var x_domain = d3.extent(allValues, function (d) {
          return new Date(d.x);
        });

        self.x.domain(x_domain);

        var y_domain = [
          d3.min(datasets, function (datum) {
            return d3.min(datum.values, function (d) {
              return d.y;
            });
          }),
          d3.max(datasets, function (datum) {
            return d3.max(datum.values, function (d) {
              return d.y;
            });
          }),
        ];

        self.y.domain(y_domain);

        // Render axes first
        axes.render(svg, title);

        self.color.domain(d3.keys(datasets));

        // Create legend container at the top
        var legendContainer = svg
          .append("g")
          .attr("class", "chart-legend")
          .attr("transform", "translate(" + (self.width - 100) + ", -25)");

        // Calculate total values for legend
        var legendData = datasets.map(function (dataset, index) {
          var latestValue = dataset.values[dataset.values.length - 1];
          var totalCount = dataset.values.length;
          return {
            name: dataset.name,
            value: latestValue ? latestValue.y : 0,
            count: totalCount,
            color: self.color(dataset.name),
            index: index,
          };
        });

        // Create legend items
        var legendItems = legendContainer
          .selectAll(".legend-item")
          .data(legendData)
          .enter()
          .append("g")
          .attr("class", "legend-item");

        var xOffset = 0;
        legendItems.each(function (d, i) {
          var legendItem = d3.select(this);

          // Add colored circle
          legendItem
            .append("circle")
            .attr("cx", xOffset + 6)
            .attr("cy", 0)
            .attr("r", 6)
            .style("fill", d.color);

          // Add text label
          var labelText =
            d.name + " :: " + d.count + ": " + d3.format(",.2f")(d.value);
          legendItem
            .append("text")
            .attr("x", xOffset + 18)
            .attr("y", 0)
            .attr("dy", "0.35em")
            .style("font-size", "0.875rem")
            .style("font-weight", "500")
            .style("fill", "#6B7280")
            .text(labelText);

          // Calculate width for next item
          var textWidth = this.getBBox().width;
          xOffset += textWidth + 40; // Add spacing between items
        });

        // Render data lines
        datasets.forEach(function (dataset) {
          var data = dataset.values,
            name = dataset.name;

          data.forEach(function (d) {
            d.date = d.x.split("T")[0]; // Support both date and date/times
            d.x = helper.parseDate(d.date);
            d.y = +d.y;
          });

          svg
            .append("path")
            .attr("class", "line")
            .attr("d", valueline(data))
            .attr("transform", "translate(" + self.margin_left + ",0)")
            .style("stroke", function () {
              return self.color(name);
            })
            .style("stroke-width", "0.125rem")
            .style("fill", "none")
            .style("opacity", 0.9);
        });

        self.datasets = datasets;
        Kiddo.Utils.MouseOver.apply(self).render(svg, self.x, self.y);
      },
    };
  };
})((window.Kiddo = window.Kiddo || {}), d3);
