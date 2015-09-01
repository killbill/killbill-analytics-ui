;(function(Kiddo, d3){
  Kiddo.PieChart = function(){
    var self = this;
    var radius = Math.min(this.width, this.height) / 2;
    var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

    return {
      render: function(svg, title, data){
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

        g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.data.label + ": " + d.data.value; })
          .attr("class", "chart_values");
      }
    }
  };
})(window.Kiddo = window.Kiddo || {}, d3)
