;(function(Kiddo, d3){
  Kiddo.Settings = function(){
    var margin_top =  30,
      margin_bottom = 40,
      margin_left = 50,
      margin_right = 150,
      raw_width = parseInt(this.element.node().getBoundingClientRect().width, 10),
      raw_height = 500;

    return {
      margin_top: margin_top,
      margin_bottom: margin_bottom,
      margin_left: margin_left,
      margin_right: margin_right,
      raw_width: raw_width,
      raw_height: raw_height,
      width: raw_width - margin_left - margin_right,
      height: raw_height - margin_top - margin_bottom
    }
  };
})(window.Kiddo = window.Kiddo || {}, d3)
