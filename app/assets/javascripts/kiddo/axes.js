;(function(Kiddo, d3){
  Kiddo.Axes = function(x, y){
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(6);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(20);

    return {
      x: xAxis,
      y: yAxis,
      render: function(svg, xTranslateY, yTranslateX, yTitle){
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(" + yTranslateX + "," + xTranslateY + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + yTranslateX + ",0)")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(yTitle);
      }
    };
  };
})(window.Kiddo = window.Kiddo || {}, d3)
