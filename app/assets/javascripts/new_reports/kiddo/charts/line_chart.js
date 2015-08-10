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

    var color = d3.scale.category10();

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

        self.data = data;

        axes.render(svg, self.height, self.margin_left, title);
        Kiddo.Utils.MouseOver.apply(self).render(svg, x, y);
      }
    }
  };
})(window.Kiddo = window.Kiddo || {}, d3)
