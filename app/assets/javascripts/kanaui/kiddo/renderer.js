;(function(Kiddo, d3){
  Kiddo.Renderer = function(selector){
    this.element = d3.select(selector);

    var settings = Kiddo.Settings.apply(this);
    var helper = new Kiddo.Helper();

    var svg = this.element
      .append('svg')
        .attr('width', settings.raw_width)
        .attr('height', settings.raw_height)
      .append('g')
        .attr('transform', 'translate(' + settings.margin_left + ',' + settings.margin_top + ')');

    return {
      lineChart: function(data){
        var chart = Kiddo.LineChart.apply(settings);
        chart.render(svg, data);
      },

      pieChart: function(data){var chart = Kiddo.PieChart.apply(settings);
        chart.render(svg, data);
      },

      table: function(data){
        svg.node().parentNode.remove();
        new ReportsDataTables(null).buildTable(data['data'][0], $(selector));
      },

      noData: function(){
        svg.append('text')
          .attr('class', 'chart-info')
          .attr('transform', 'translate(' + settings.width / 2 + ',' + settings.height / 2 + ')')
          .text('No data to display.');
      }
    };
  };
})(window.Kiddo = window.Kiddo || {}, d3);
