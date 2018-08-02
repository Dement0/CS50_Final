// Google Map
let map;

// Markers for map
let markers = [];

// Info window
// let info = new google.maps.InfoWindow();

// Execute when DOM is fully loaded
$(document).ready(function() {

  // Local weather variables
  var weatherLong;
  var weatherLat;
  var celcius;
  var city;
  var weatherType;

  // Get browser's coordinates
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function(position) {
      weatherLong = position.coords.longitude;
      weatherLat = position.coords.latitude;

      // fCC Weather API
      var weatherAPI = "https://fcc-weather-api.glitch.me/api/current?lat="+weatherLat+"&lon="+weatherLong+"";

      $.getJSON(weatherAPI, function(weatherData) {
        // JSON call
        weatherType = weatherData.weather[0].description;
        celcius = weatherData.main.temp.toFixed(1);
        city = weatherData.name;

        // Select corresponding DOM nodes and append variables
        $("#city").html(city);
        $("#degree").html(celcius + " &#8451");
        $("#weatherType").html(weatherType);
      }, function(error) {
        console.error(error);
      });
    });
  }

  // Styles for map
  // https://developers.google.com/maps/documentation/javascript/styling
  let styles = [
    // Hide Google's labels
    {
      featureType: "all",
      elementType: "labels",
      stylers: [
        {visibility: "off"}
      ]
    },

    // Hide roads
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {visibility: "off"}
      ]
    }
  ];

  // Options for map
  // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  let center = {lat: 38.1157, lng: 13.3613}; // Palermo, Italy

  let options = {
    center: {lat: 38.1157, lng: 13.3613}, // Palermo, Italy
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: 14,
    styles: styles,
    zoom: 13,
    zoomControl: true
  };

  // Get DOM node in which map will be installed
  let canvas = $("#map-canvas").get(0);

  // Instantiate map
  map = new google.maps.Map(canvas, options);

  // google.maps.event.addListenerOnce(map, "idle", configure);
});
