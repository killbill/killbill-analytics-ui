;(function(d3, $, window, document, undefined){
  $(document).ready(function(){
    d3.json($('#chartAnchor').data('reports-path'), function(error, json){
      if(error){ throw error };

      var renderer = new Kiddo.Renderer('#chartAnchor');

      switch(json[0].type){
        case 'COUNTERS':
          var data = json[0].data;
          renderer.pieChart(json[0].title, data)
          break;
        case 'TIMELINE':
          var data = json[0].data[0].values;
          renderer.lineChart(json[0].title, data);
          break;
        default:
          console.log('No such type implemented: ' + json.type);
      }
    });
  });
})(d3, jQuery, window, document);
