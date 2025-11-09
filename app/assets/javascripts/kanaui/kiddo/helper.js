(function (Kiddo, d3) {
  Kiddo.Helper = function () {
    var formatCurrency = function (d) {
      return "$" + formatValue(d);
    };
    var formatValue = d3.format(",.2f");

    return {
      parseDate: d3.time.format("%Y-%m-%d").parse,
      bisectDate: d3.bisector(function (d) {
        return d.x;
      }).left,
      formatCurrency: formatCurrency,
      formatValue: formatValue,
      formatValueDisplay: function (name, d) {
        return name + ": " + formatValue(d.y); // Add currency boolean on backend later -- formatCurrency(d.y); }
      },
    };
  };
})((window.Kiddo = window.Kiddo || {}), d3);
