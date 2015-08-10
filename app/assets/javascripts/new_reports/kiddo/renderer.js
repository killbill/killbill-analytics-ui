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
      lineChart: function(title, data){
        var chart = Kiddo.LineChart.apply(settings);
        chart.render(svg, title, data);
      }
    };
  };
})(window.Kiddo = window.Kiddo || {}, d3);
