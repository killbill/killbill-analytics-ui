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

        var canvas = svg.append("g");

        var info = canvas.append("rect")
          .attr("class", "information")
          .attr("width", self.width / 2)
          .attr("height", self.height / 3)
          .attr("transform", "translate(200,0)");

        svg.append("rect")
          .attr("class", "overlay")
          .attr("width", self.width)
          .attr("height", self.height)
          .attr('transform', 'translate(' + self.margin_left + ',0)')
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

        self.datasets.forEach(function(element, index){
          focus.append("circle")
            .attr("r", 4.5)
            .attr("id", "circle_" + index)
            .attr("transform", "translate(" + self.margin_left + ",0)");

          canvas.append("text")
            .attr("y", -20)
            .attr("cx", 20)
            .attr("dy", ".35em")
            .attr("class", "chart_values")
            .attr("id", "label_" + index)
            .attr("transform", "translate(230," + (index + 1) * 30 + ")");
        });

        function mousemove() {
          var _this = this;

          self.datasets.forEach(function(element, index){
            var data = element.values;
            var name = element.name;

            var x0 = x.invert(d3.mouse(_this)[0]),
              i = helper.bisectDate(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0.x > d1.x - x0 ? d1 : d0;

            focus.select("#circle_" + index)
              .attr("cx", x(d.x))
              .attr("cy", y(d.y));
              //.attr("transform", "translate(" + x(d.x) + "," + y(d.y) + ")");

            canvas.select("#label_" + index).text(helper.formatValueDisplay(name, d));
          });
        }
      }
    };
  };
})(window.Kiddo = window.Kiddo || {}, d3)
