function initMap(){

var $overlay;

var forexData = {
  "US": 1,
  "CA": 1.25450,
  "CN": 6.20365,
  "AU": 1.31073,
  "RU": 55.4758,
  "BR": 3.09680,
  "MX": 15.6641,
  "IN": 63.3040,
  "GL": 6.72458,
  "EUR": .9,
  "JP":0.96
};
//My App ID: 29b04a09d4da4c98b23b6e1f1aa8112c
// Use jQuery.ajax to get the latest exchange rates, with JSONP:
var appId = '29b04a09d4da4c98b23b6e1f1aa8112c';
$.ajax({
    url: 'https://openexchangerates.org/api/latest.json?app_id=' + appId,
    dataType: 'jsonp',
    success: function(json) {
        
      console.log(json);
      console.log(json.base);
      console.log(forexData);

      $('#world-map').vectorMap({
        map: 'world_mill_en',    
        series: {
          regions: [{
            values: forexData,
            scale: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial'
          }]
        },
        onRegionTipShow: function(e, el, code){
          var map = $('#world-map').vectorMap('get', 'mapObject');
          var name = map.getRegionName(code);
          var currency = map.getCurrency(code);          
      
          el.html(el.html() + ' (1 USD to ' + forexData[code] +' '+ currency +' conversion)');
        },
        onRegionClick: function(e,code){
            var map = $('#world-map').vectorMap('get', 'mapObject');
            var region = map.getRegion(code);
            var currency = map.getCurrency(code);          

            //console.log("Country Code: " + code);
            //console.log("Country Name: " + region.name);
            console.log("Region %s %o", code,  region);
            //console.log("Currency Code: " + region.currency);
            console.log(json.rates[currency]);

            console.log(fx.convert(10, {from: 'USD', to: 'CAD'}))


            if ($overlay != null) {
               $overlay.remove();
            }

            $overlay = $('<div class="overlay"></div>');
            var $overlayClose = $('<div class="overlay-close"></div>');
            var $forexInfo =$(
            '<ul>' +
                '<li>USD to ' + currency +': '+ json.rates[currency] + '</ul>' + 
            '</ul>');

            var $conversionCalc = $(
                '<form>' +
                  '<input type="number" >' +
                  '<input type="number" name="lastname">'  +
                '</form>'

              );
            //Show overlay
            $("body").append($overlay);
            $overlay.append($forexInfo);
            $overlay.append($conversionCalc);
            $overlay.show();
   
            $overlay.append($overlayClose);
            //$overlayClose.show();


            //Hide the overlay.
            $overlayClose.click(function(){
              $overlay.remove();
              //$overlayClose.remove();
              //$overlay.empty();
            });

        }
    });

  }
});


}

