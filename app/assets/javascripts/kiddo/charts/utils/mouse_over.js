;(function(Kiddo, d3){
  Kiddo.Utils = Kiddo.Utils || {};

  Kiddo.Utils.MouseOver = function(){
    var self = this;
    var helper = new Kiddo.Helper();

    return {
      render: function(svg, x, y){
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
            i = helper.bisectDate(self.data, x0, 1),
            d0 = self.data[i - 1],
            d1 = self.data[i],
            d = x0 - d0.x > d1.x - x0 ? d1 : d0;
          focus.attr("transform", "translate(" + x(d.x) + "," + y(d.y) + ")");
          focus.select("text").text(helper.formatValueDisplay(d));
        }
      }
    };
  };
})(window.Kiddo = window.Kiddo || {}, d3)