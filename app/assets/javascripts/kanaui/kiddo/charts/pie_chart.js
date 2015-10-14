;(function(Kiddo, d3){
  Kiddo.PieChart = function(){
    var self = this;
    var radius = Math.min(this.width, this.height) / 2;
    var color = d3.scale.category10();

    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

    return {
      render: function(svg, json){
        var data = json.data;

        svg.attr('transform', "translate(" + self.width / 2 + "," + self.height / 2 + ")");

        data.forEach(function(d){
          d.value = +d.value;
        });

        var g = svg.selectAll(".arc")
          .data(pie(data))
          .enter().append("g")
          .attr("class", "arc");

        g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.value); });

        var colorCircle = function(value){
          return(
            '<span class="colored-dot" style="background-color:' + color(value) + ';"></span>'
          );
        }

        g.append("foreignObject")
          .attr("width", 200)
          .attr("height", 150)
          .attr("dy", ".35em")
          .attr("x", 250)
          .attr("y", function(d, i) { return 50 * i - 200; })
          .html(function(d) { return  colorCircle(d.data.value) + d.data.label + ": " + d.data.value; })
          .attr("class", "chart_values");
      }
    }
  };
})(window.Kiddo = window.Kiddo || {}, d3)
