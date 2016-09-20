;(function(d3, $, window, document, undefined){
  $(document).ready(function(){
    if($('#chartAnchor').length == 0) { return; }

    d3.json($('#chartAnchor').data('reports-path'), function(error, json){
      if(error){ throw error };

      var data = json[0];

      $('#loading-spinner').remove();

      var render = function(type){
        if(data.data.length == 0) { return renderer.noData(); }
        switch(type){
          case 'COUNTERS':
            var renderer = new Kiddo.Renderer('#chartAnchor');
            renderer.pieChart(data)
            break;
          case 'TIMELINE':
            var renderer = new Kiddo.Renderer('#chartAnchor');
            renderer.lineChart(data);
            break;
          case 'TABLE':
            new ReportsDataTables(null).buildTable(data['data'][0], $('#chartAnchor'));
            break;
          default:
            console.log('No such type implemented: ' + type);
            var renderer = new Kiddo.Renderer('#chartAnchor');
            renderer.noData();
        }
      };

      try{
        render(json[0].type);
      }catch(ex){
        console.log(ex);
        renderer.noData();
      }

    });
  });
})(d3, jQuery, window, document);
