;(function(Kiddo, d3){
  Kiddo.LineChart = function(){
    var self = this;

    this.x = d3.time.scale().range([0, this.width]);
    this.y = d3.scale.linear().range([this.height, 0]);

    var valueline = d3.svg.line()
      .x(function(d) { return self.x(d.x); })
      .y(function(d) { return self.y(d.y); });

    var axes = Kiddo.Axes.apply(this);
    var helper = new Kiddo.Helper();

    self.color = d3.scale.category10();

    return {
      render: function(svg, json){
        var title = json.title,
          datasets = json.data;

        // Scale the range of the data before rendering axes
        var allValues = datasets.reduce(function(result, element){
          return result.concat(element.values);
        }, []);

        var x_domain = d3.extent(allValues, function(d){
          return new Date(d.x);
        });

        self.x.domain(x_domain);

        var y_domain = [d3.min(datasets, function (datum) {
                            return d3.min(datum.values, function (d) {
                                return d.y;
                            });
                        }),
                        d3.max(datasets, function (datum) {
                            return d3.max(datum.values, function (d) {
                                return d.y;
                            });
                        })];

        self.y.domain(y_domain);

        axes.render(svg, title);

        self.color.domain(d3.keys(datasets));

        datasets.forEach(function(dataset){
          var data = dataset.values,
            name = dataset.name;

          data.forEach(function(d) {
            d.date = d.x.split('T')[0]; // Support both date and date/times
            d.x = helper.parseDate(d.date);
            d.y = +d.y;
          });

          svg.append('path')
            .attr('class', 'line')
            .attr('d', valueline(data))
            .attr("transform", "translate(" + self.margin_left + ",0)")
            .style("stroke", function() { return self.color(name); });
        });

        self.datasets = datasets;
        Kiddo.Utils.MouseOver.apply(self).render(svg, self.x, self.y);
      }
    }
  };
})(window.Kiddo = window.Kiddo || {}, d3)
