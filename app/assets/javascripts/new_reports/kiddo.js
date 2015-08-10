var Kiddo = function(selector){
  this.element = d3.select(selector);

  var margin = { top: 20, bottom: 20, left: 20, right: 20 },
    width = parseInt(this.element.node().getBoundingClientRect().width, 10),
    height = 500,
    widthWithoutMargins = width - margin.left - margin.right,
    heightWithoutMargins = height - margin.top - margin.top;

  // Parse the date / time
  var parseDate = d3.time.format("%Y-%m-%d").parse,
    bisectDate = d3.bisector(function(d) { return d.x; }).left,
    formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return "$" + formatValue(d); },
    formatValueDisplay = function(d) { return d.date + ": " + formatCurrency(d.y); };

  // Set the ranges
  var x = d3.time.scale().range([0, widthWithoutMargins - margin.right]);
  var y = d3.scale.linear().range([heightWithoutMargins, 0]);

  // Define the line
  var valueline = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

  var axes = new KiddoAxes(x, y);

  var svg = this.element
    .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  return {
    lineChart: function(title, data){
      data.forEach(function(d) {
        d.date = d.x;
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

      axes.render(svg, widthWithoutMargins, margin.left, title);

      var focus = svg.append("g")
          .attr("class", "focus")
          .style("display", "none");

      // add mouseover
      focus.append("circle")
        .attr("r", 4.5)
        .attr("transform", "translate(" + margin.left + ",0)");

      focus.append("text")
        .attr("y", -20)
        .attr("dy", ".35em")
        .attr("class", "chart_values");

      svg.append("rect")
        .attr("class", "overlay")
        .attr("width", widthWithoutMargins - margin.right)
        .attr("height", heightWithoutMargins)
        .attr('transform', 'translate(' + margin.left + ',0)')
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.x > d1.x - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.x) + "," + y(d.y) + ")");
        focus.select("text").text(formatValueDisplay(d));
      }
    }
  };
};
