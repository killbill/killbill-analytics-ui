;(function(d3, $, window, document, undefined){
  $(document).ready(function(){
    d3.json('http://localhost:3000/assets/new_reports/sample_data.json', function(error, json){
      if(error){ throw error };

      var data = json[0].data[0].values;
      var chartRenderer = new Kiddo('#chartAnchor');

      try{
        chartRenderer.lineChart(json[0].title, data);
      }catch(e){
        console.error(e);
      }
    });
  });
})(d3, jQuery, window, document);
