(function (Kiddo, d3) {
  Kiddo.Axes = function () {
    var self = this;

    var makeXAxis = function () {
      return d3.svg.axis().scale(self.x).orient("bottom").ticks(6);
    };

    var makeYAxis = function () {
      return d3.svg
        .axis()
        .scale(self.y)
        .orient("left")
        .tickFormat(d3.format(",d"));
    };

    var xAxis = makeXAxis();
    var yAxis = makeYAxis();

    return {
      x: xAxis,
      y: yAxis,
      render: function (svg, yTitle) {
        svg
          .append("g")
          .attr("class", "grid")
          .attr(
            "transform",
            "translate(" + self.margin_left + "," + self.height + ")"
          )
          .call(makeXAxis().tickSize(-self.height, 0, 0).tickFormat(""));

        svg
          .append("g")
          .attr("class", "grid")
          .attr("transform", "translate(" + self.margin_left + ",0)")
          .call(makeYAxis().tickSize(-self.width, 0, 0).tickFormat(""));

        svg
          .append("g")
          .attr("class", "x axis")
          .attr(
            "transform",
            "translate(" + self.margin_left + "," + self.height + ")"
          )
          .call(xAxis);

        svg
          .append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + self.margin_left + ",0)")
          .call(yAxis);
        //.append("text")
        //.attr("transform", "rotate(-90)")
        //.attr("y", 6)
        //.attr("dy", ".71em")
        //.style("text-anchor", "end")
        //.text(yTitle);
      },
    };
  };
})((window.Kiddo = window.Kiddo || {}), d3);
