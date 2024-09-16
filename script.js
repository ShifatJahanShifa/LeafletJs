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
console.log(marker.toGeoJSON());
L.geoJSON(pointJSON).addTo(map);
L.geoJSON(lineJSON).addTo(map);
L.geoJSON(polygonJSON).addTo(map);

L.geoJSON(polygonJSON, {
    onEachFeature: function(feature,layer){
        layer.bindPopup(`<b>name: </b>`+feature.properties.name)
    }
}).addTo(map);

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