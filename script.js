// map initialization
var map = L.map('map').setView([23.6850, 90.3563], 13);

// open street map layer
var osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

var watercolor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
	minZoom: 1,
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

// watercolor.addTo(map);

googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// googleStreets.addTo(map);

googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// googleHybrid.addTo(map);

googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// googleSat.addTo(map);

googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// googleTerrain.addTo(map);

// add marker
var myIcon = L.icon({
    iconUrl: 'google-map-marker-green.png',
    iconSize: [40, 40],
});

var marker=L.marker([23.6850, 90.3563], {icon: myIcon, draggable: true});
var popup=marker.bindPopup("this is Dhaka, Bangladesh "+ marker.getLatLng()).openPopup();
popup.addTo(map);
var secondMarker=L.marker([22.6850, 91.3563], {icon: myIcon, draggable: true});

// geojson
// console.log(marker.toGeoJSON());
// L.geoJSON(pointJSON).addTo(map);
// L.geoJSON(lineJSON).addTo(map);
// L.geoJSON(polygonJSON).addTo(map);

// L.geoJSON(polygonJSON, {
//     onEachFeature: function(feature,layer){
//         layer.bindPopup(`<b>name: </b>`+feature.properties.name)
//     }
// }).addTo(map);

// layer controller
var baseMaps = {
    "OSM": osm,
    "Water Color Map": watercolor,
    "Google Street": googleStreets,
    "Google Satellite": googleSat
};

var overlayMaps = {
    "Source": marker,
    "Sink" : secondMarker
};

L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);


// map events
// map.on('mousemove',function({

// }))

// add scale 
L.control.scale({position: 'bottomright'}).addTo(map);

// full screen view, khub ekta kaajer na
var mapId=document.getElementById('map');
function fullScreenView()
{
    mapId.requestFullscreen();
}

// add print option
L.control.browserPrint({position: 'topleft', title: 'Print ...'}).addTo(map);

// search by location
L.Control.geocoder().addTo(map);

// user's current position
L.control.locate().addTo(map);

// add heatmap
console.log(addressPoints);
var heat = L.heatLayer(addressPoints, {radius: 25}).addTo(map); 



// geotiff layer
fetch('data/MiCASA_v1_ATMC_x3600_y1800_daily_20010101.tif')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    parseGeoraster(arrayBuffer).then(georaster => {
      console.log("georaster:", georaster);

      /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.

          Just make sure to include the georaster option!

          Optionally set the pixelValuesToColorFn function option to customize
          how values for a pixel are translated to a color.

          https://leafletjs.com/reference.html#gridlayer
      */
      var layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.5,
        //   pixelValuesToColorFn: values => values[0] === 42 ? '#ffffff' : '#000000',
        // pixelValuesToColorFn: function (value) {
        //     // if value
        //     if (value < 50) {
        //       return "yellow";
        //     } else if (value > 50 && value < 130) {
        //       return "green";
        //     } else if (value < 130 && value > 180) {
        //       return "#93E9BE";
        //     } else if (value == 190) {
        //       return "red";
        //     } else if (value == 200) {
        //       return "#966400";
        //     } else if (value == 210) {
        //       return "blue";
        //     } else if (value == 220) {
        //       return "#ffffff";
        //     } else {
        //       return "transparent";
        //     }
        //   },
          resolution: 128 // optional parameter for adjusting display resolution
      });
      layer.addTo(map);

      map.fitBounds(layer.getBounds());

  });
});