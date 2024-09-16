// map initialization
var map = L.map('map').setView([23.6850, 90.3563], 6);

// open street map layer
var osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

if(!navigator.geolocation)
{
    console.log("your browser doesn't support geolocation api");
}
else 
{
    navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position)
{
    console.log(position);
    var lat=position.coords.latitude;
    var long=position.coords.longitude;

    var marker=L.marker([lat,long]).addTo(map);
    console.log(lat, long);
}