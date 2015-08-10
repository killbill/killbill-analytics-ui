;(function(Kiddo, d3){
  Kiddo.LineChart = function(){
    var self = this;

    var x = d3.time.scale().range([0, this.width]);
    var y = d3.scale.linear().range([this.height, 0]);

    var valueline = d3.svg.line()
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });

    var axes = Kiddo.Axes(x, y);
    var helper = new Kiddo.Helper();

    return {
      render: function(svg, title, data){
        data.forEach(function(d) {
          d.date = d.x;
          d.x = helper.parseDate(d.x);
          d.y = +d.y;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain([0, d3.max(data, function(d) { return d.y; })]);

        svg.append('path')
          .attr('class', 'line')
          .attr('d', valueline(data))
          .attr("transform", "translate(" + self.margin_left + ",0)");

        axes.render(svg, self.height, self.margin_left, title);

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        // add mouseover
        focus.append("circle")
          .attr("r", 4.5)
          .attr("transform", "translate(" + self.margin_left + ",0)");

        focus.append("text")
          .attr("y", -20)
          .attr("dy", ".35em")
          .attr("class", "chart_values");

        svg.append("rect")
          .attr("class", "overlay")
          .attr("width", self.width)
          .attr("height", self.height)
          .attr('transform', 'translate(' + self.margin_left + ',0)')
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

        function mousemove() {
          var x0 = x.invert(d3.mouse(this)[0]),
            i = helper.bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.x > d1.x - x0 ? d1 : d0;
          focus.attr("transform", "translate(" + x(d.x) + "," + y(d.y) + ")");
          focus.select("text").text(helper.formatValueDisplay(d));
        }
      }
    }
  };
})(window.Kiddo = window.Kiddo || {}, d3)
