/* Script for Lake Kegonsa Interactive Map, David J. Waro */ 

//initialize function called when the script loads
function initialize(){
    createMap();
};

// global map variable
var map;

var rivers = new L.GeoJSON.AJAX("data/Riv2.geojson", {style: riverStyle}).bringToBack();

// styling for rivers while zoom is greater than 12
function riverStyle() {
    return {
        weight: 2.5,
        opacity: 0.6,
        color: '#2eb8b8',
        fillOpacity: 0,
    };
};

// styling for rivers while zoom is between 10 and 12
function river2() {
    return {
        weight: 1,
        opacity: 0.6,
        color: '#2eb8b8',
        fillOpacity: 0,
    };
};

// make rivers disappear if zoom is less <= 10
function river3() {
    return {
        weight: 0,
        opacity: 0
    };
};

/* function initializes the map object and assigns its setting (i.e. center, bounds, zoom, restrictions) and adds
a basemap tileset */
function createMap(){

  // map object
  map = L.map('map', {
    center: [42.977210, -89.252280],
    preferCanvas: true,
    //fullscreenControl: true,
    maxBounds: [ [39, -100], [50, -80] ],
    zoom: 13
  });

  // base tile layer
  var basemap = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    minZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // add navigation bar to the map
  L.control.navbar().addTo(map);

  // add rivers to map
  rivers.addTo(map);

  // change rivers styling based on zoom level
  map.on('zoomend', function() {
    if (map.getZoom() <= 12 && map.getZoom() > 10) {
      rivers.setStyle(river2);
    } else if (map.getZoom() > 12) {
      rivers.setStyle(riverStyle);
    } else if (map.getZoom() <= 10) {
      rivers.setStyle(river3);
    };
  });

  getData(map);
};

// Function starts asynchronously loading data in the background, grabbing data from the geojson file
function getData(map) {
    
  //load the data
  $.ajax("data/kegonsa.geojson", {
    dataType: "json",
    success: function(response){

      // attributes of the file, synonymous to column headers in dataframe
      var attributes = processData(response);

      // call function to create markers
      createSymbols(response, map, attributes);

    } // close to success
  }); // close to ajax
};

// function reads json data and assigns respective attributes and properties for the features
function processData(data){

  // empty array to hold attributes
  var attributes = [];

  // properties of the first feature in the dataset
  var properties = data.features[0].properties;

  // push each attribute name into attributes array
  for (var attribute in properties){

    // condition to make sure attributes are populated
    if (attribute.indexOf("Name") != "adsfsa"){
      attributes.push(attribute);
    };

  };

  // return the array of attributes
  return attributes;

};

// add markers for point features to the map
function createSymbols(data, map, attributes){

  // create a Leaflet GeoJSON layer and add it to the map
  var symbols = L.geoJson(data, {
    pointToLayer: function(feature, latlng, map){
      return pointToLayer(feature, latlng, attributes);
    }
  }).addTo(map);

}; // close ot createSymbols

// function to create markers layer
function pointToLayer(feature, latlng, attributes, layer, map) {

  var clock = L.icon({
    iconUrl: 'photos/clock.png',
    iconSize:     [35, 35], // size of the icon
    iconAnchor:   [17.5, 17.5] // point of the icon which will correspond to marker's location
  });

  var microscope = L.icon({
    iconUrl: 'photos/microscope.png',
    iconSize:     [35, 35], // size of the icon
    iconAnchor:   [17.5, 17.5], // point of the icon which will correspond to marker's location
    className: 'Created by AliWijaya from Noun Project'
  });

  var project = L.icon({
    iconUrl: 'photos/project.png',
    iconSize:     [40, 34], // size of the icon
    iconAnchor:   [20, 17] // point of the icon which will correspond to marker's location
  });

  var other = L.icon({
    iconUrl: 'photos/other.png',
    iconSize:     [35, 35], // size of the icon
    iconAnchor:   [17.5, 17.5] // point of the icon which will correspond to marker's location
  });

  // variables to hold image links
  var image = document.createElement("img");
  var image2 = document.createElement("img");

  // variables to hold links for additional information
  href = '';
  href2 = '';
  href3 = '';

  // loops to assign image and href variables for each respective marker
  if (feature.properties.Name == 'Lock and Dam') {
    image.src = 'photos/lock_and_dam.png';
    image.setAttribute("alt", "Lock and Dam Lake Kegonsa");
  } else if (feature.properties.Name == 'Amundson Boat Landing') {
    image.src = 'photos/boat_landing.png';
    image.setAttribute("alt", "Amundson Boat Landing");
  } else if (feature.properties.Name == 'Carp') {
    image.src = 'photos/carp_1.png';
    image2.src = 'photos/carp_2.png';
    image.setAttribute("alt", "Removing carp from the lake.");
  } else if (feature.properties.Name == 'The Castle') {
    image.src = 'photos/castle.png';
    image.setAttribute("alt", "Castle on Lake Kegonsa");
  } else if (feature.properties.Name == 'Example CLA Station') {
    image.src = 'photos/cla_station.png';
    image.setAttribute("alt", "CLA sample station");
  } else if (feature.properties.Name == 'Camp Collins and Stoughton Country Club') {
    image.src = 'photos/country_club_1.png';
    image2.src = 'photos/country_club_2.png';
    image.setAttribute("alt", "Stoughton Country Club");
  } else if (feature.properties.Name == 'Crown Point') {
    image.src = 'photos/crown_point.png';
    image.setAttribute("alt", "Crown Point Lake Kegonsa");
  } else if (feature.properties.Name == 'Culvert') {
    image.src = 'photos/culvert_1.png';
    image2.src = 'photos/culvert_2.png';
    image.setAttribute("alt", "Culvert near Lake Kegonsa");
  } else if (feature.properties.Name == 'Door Creek') {
    image.src = 'photos/door_creek_2.png';
    image.setAttribute("alt", "Door Creek");
  } else if (feature.properties.Name == 'Farming') {
    image.src = 'photos/farm_1.png';
    image2.src = 'photos/farm_2.png';
    image.setAttribute("alt", "Farm near Lake Kegonsa");
  } else if (feature.properties.Name == 'Fish Camp') {
    image.src = 'photos/fish_camp.png';
    image.setAttribute("alt", "Fish Camp");
  } else if (feature.properties.Name == 'NLA Project') {
    image.src = 'photos/nla_project.png';
    image.setAttribute("alt", "NLA Project");
  } else if (feature.properties.Name == '\"Saloon in the Lake\"') {
    image.src = 'photos/saloon.png';
    image.setAttribute("alt", "Saloon in the Lake");
  } else if (feature.properties.Name == 'Lake Kegonsa State Park') {
    image.src = 'photos/state_park.png';
    image.setAttribute("alt", "Kegonsa State Park");
  } else if (feature.properties.Name == 'Ho-Chunk') {
    image.src = 'photos/hochunk.png';
    image.setAttribute("alt", "A nineteenth-century Ho-Chunk camp in southwestern Wisconsin as painted by Seth Eastman");
  } else if (feature.properties.Name == 'Mound Builders') {
    image.src = 'photos/mound_2.png';
    image2.src = 'photos/mound_1.png';
    image.setAttribute("alt", "Mound Builders");
  } else if (feature.properties.Name == 'Skare Site') {
    image.src = 'photos/skare_1.png';
    image.setAttribute("alt", "Skare Site");
  } else if (feature.properties.Name == 'Springers') {
    image.src = 'photos/springers.png';
    image.setAttribute("alt", "Springers Restaurant");
  } else if (feature.properties.Name == 'Kegonsa Cove') {
    image.src = 'photos/kegonsa_cove.png';
    image.setAttribute("alt", "Kegonsa Cove");
  };

  var layer;

  if (feature.properties.Type == 'Historical') {
    layer = L.marker(latlng, {icon: clock});
  } else if (feature.properties.Type == 'Project') {
    layer = L.marker(latlng, {icon: project});
  } else if (feature.properties.Type == 'Test') {
    layer = L.marker(latlng, {icon: microscope});
  } else {
    layer = L.marker(latlng, {icon: other});
  };

  // panel to display marker information.  Incorporates html bootstrap strings
  var panel = "<div class='container'><div class='row justify-content-center'><div class='container'><h1 class='display-4 text-center'>"; 
      panel += feature.properties.Name + "</h1><p class='lead col-md-12 offset-md-0'>" + feature.properties.Description + "</p>";

      if (image.src != '' && feature.properties.Name != 'Skare Site') {
        panel += "<div class='container col-md-11 justify-content-center'><img src=" + image.src + " class='img-fluid'><div>"
      };
      if (feature.properties.Name == 'Skare Site') {
        panel += "<div id='skare' class='container col-md-11 justify-content-center'><a href='https://www.youtube.com/watch?v=l0qd1UNTYNE' target='_blank'><img src=" + image.src + " class='img-fluid'></a><div>"
      };
      if (image2.src != '') {
        panel += "<img style='width: 100%;' src=" + image2.src + " class='img-fluid'>"
      };
      if (feature.properties.Link_1 != '' && feature.properties.Name != 'Example CLA Station' && feature.properties.Name != 'Carp' && feature.properties.Name != 'Farming') {
        panel += "<p class='lead text-center'>More information on <a href=" + feature.properties.Link_1 + " target='_blank'>" + feature.properties.Name + "</a>";
      };
      if (feature.properties.Name == 'Example CLA Station') {
        panel += "<p class='lead text-center'>More information on <a href=" + feature.properties.Link_1 + " target='_blank'>" + 'Clean Lakes Alliance' + "</a>";
      };
      if (feature.properties.Name == 'Carp') {
        panel += "<p class='lead text-center'>More information on <a href=" + feature.properties.Link_1 + " target='_blank'>" + 'carp removal in Lake Kegonsa' + "</a>";
      };
      if (feature.properties.Name == 'Farming') {
        panel += "<p class='lead text-center'>More information on <a href=" + feature.properties.Link_1 + " target='_blank'>" + 'farming & water quality' + "</a>";
      };
      if (feature.properties.Link_2 != '') {
        panel += "<p class='lead text-center'>Additional <a href=" + feature.properties.Link_2 + " target='_blank'>information</a>";
      };
      if (feature.properties.Link_3 != '') {
        panel += "<p class='lead text-center'>Additional <a href=" + feature.properties.Link_3 + " target='_blank'>information</a>";
      };

      panel += "</div></div></div>";

  // creates a new popup object
  var popup = new Popup(feature.properties, layer, 5);

  // add popup to marker
  popup.bindToLayer();

  // event listeners to open popup on click
  layer.on({
    mouseover: function(){
      //layer.setStyle(options_2);
      this.openPopup();
    },
    mouseout: function(){
      //layer.setStyle(options);
      this.closePopup();
    },
    click: function(e){
      clickZoom(e);
      $('#starting-text').css("display", "none");
      $('#panel').html(panel);
      $('#content').html(content);
    }
  });

  // return the circle marker to the L.geoJson pointToLayer option
  return layer;

}; // close to pointToLayer function

// OOM Popup constructor function
function Popup(properties, layer, radius){

  // creating the Popup object
  this.properties = properties;
  this.layer = layer;

  // content in popup with html
  this.content = "<h5><b>" + this.properties.Name + "</h5></b>" //+
  
  // binds the popup to the marker and positions it on top center
  this.bindToLayer = function(){
    this.layer.bindPopup(this.content, {
      offset: new L.Point(0,-radius),
      closeButton: true,
      closeButton: false
    });
  }; // close to bindToLayer
}; // close to Popup function

// reset maps view on click
function clickZoom(e) {
  if (map.getZoom() < 17) {
    console.log(e.target.getLatLng());
    map.flyTo(e.target.getLatLng(), 16, 0.1);
  } else {
    map.flyTo(e.target.getLatLng(), map.getZoom(), 0.1);
  }
};

//call the initialize function when the document has loaded
$(document).ready(initialize);
