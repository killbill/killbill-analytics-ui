;(function(d3, $, window, document, undefined){
  $(document).ready(function(){
    if($('#chartAnchor').length == 0) { return; }

    d3.json($('#chartAnchor').data('reports-path'), function(error, json){
      if(error){ throw error };
      $('#loading-spinner').remove();

      var renderer = new Kiddo.Renderer('#chartAnchor');

      var render = function(type){
        switch(type){
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
      };

      try{
        render(json[0].type);
      }catch(ex){
        renderer.noData();
      }

    });
  });
})(d3, jQuery, window, document);
