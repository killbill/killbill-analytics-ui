;(function(d3, $, window, document, undefined){
  var Kiddo = function(selector){
    this.element = d3.select(selector);

    var margin = { top: 20, bottom: 20, left: 20, right: 20 },
      width = parseInt(this.element.node().getBoundingClientRect().width, 10),
      height = 500,
      widthWithoutMargins = width - margin.left - margin.right,
      heightWithoutMargins = height - margin.top - margin.top;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, widthWithoutMargins]);
    var y = d3.scale.linear().range([heightWithoutMargins, 0]);

    // Define the axes
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(20);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(20);

    // Define the line
    var valueline = d3.svg.line()
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });

    var svg = this.element
      .append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    return {
      lineChart: function(data){
        data.forEach(function(d) {
          d.x = parseDate(d.x);
          d.y = +d.y;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.x; }));
        y.domain([0, d3.max(data, function(d) { return d.y; })]);

        svg.append('path')
          .attr('class', 'line')
          .attr('d', valueline(data))
          .attr("transform", "translate(" + margin.left + ",0)");

        // Add the X Axis
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + heightWithoutMargins + ")")
          .call(xAxis);

        // Add the Y Axis
        svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + margin.left + ",0)")
          .call(yAxis);
        }
    };
  };

  $(document).ready(function(){
    d3.json('http://localhost:3000/assets/new_reports/sample_data.json', function(error, json){
      if(error){ throw error };

      var data = json[0].data[0].values;
      var chartRenderer = new Kiddo('#chartAnchor');
      chartRenderer.lineChart(data);
    });
  });
})(d3, jQuery, window, document);
