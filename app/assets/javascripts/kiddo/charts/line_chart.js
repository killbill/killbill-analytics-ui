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
      render: function(svg, json){
        var title = json.title,
          datasets = json.data;

        // Scale the range of the data before rendering axes
        var x_domain = d3.extent(datasets.reduce(function(self, other){
          return self.values.concat(other.values);
        }), function(d){
          return new Date(d.x);
        });

        x.domain(x_domain);

        var y_domain = [0, d3.max(datasets, function(datum){
          return d3.max(datum.values, function(d){
            return d.y;
          });
        })];

        y.domain(y_domain);

        axes.render(svg, self.height, self.margin_left, title);

        color.domain(d3.keys(datasets));

        datasets.forEach(function(dataset){
          var data = dataset.values,
            name = dataset.name;

          data.forEach(function(d) {
            d.date = d.x;
            d.x = helper.parseDate(d.x);
            d.y = +d.y;
          });

          svg.append('path')
            .attr('class', 'line')
            .attr('d', valueline(data))
            .attr("transform", "translate(" + self.margin_left + ",0)")
            .style("stroke", function() { return color(name); });

          svg.append('text')
            .attr('class', 'chart-label')
            .attr('transform', 'translate(' + x(data.slice(-1)[0].x) + ',' + y(data.slice(-1)[0].y) + ')')
            .text(name);
        });

        self.datasets = datasets;
        Kiddo.Utils.MouseOver.apply(self).render(svg, x, y);
      }
    }
  };
})(window.Kiddo = window.Kiddo || {}, d3)
