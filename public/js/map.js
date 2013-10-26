var setupMap = function() {
    var map = L.map('map').setView([-2.143722, -79.864697], 12);

    L.tileLayer('http://{s}.tile.cloudmade.com/2d5a61297d38433e8da952ea7cb1e0df/997/256/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);
    map.locate({setView: true, maxZoom: 12});
    map.on("locationfound", function(e) {
	loadGeoPoints(map, {lat: e.latlng.lat, lng: e.latlng.lng});
    });
};

var drawPoints = function() {
    
};

var loadGeoPoints = function(map, userLocation) {
    Parse.initialize("4RFKcCR5vsItVPUnebOZ49G58NUpy1YBs6x5CS5f", "05JFLW8ZpeooKUAgxjkXU53vKezLKga6BCKdYV90");
    var point = new Parse.GeoPoint({latitude: userLocation.lat, longitude: userLocation.lng});
    var RecintoObject = Parse.Object.extend("Recinto");
    var query = new Parse.Query(RecintoObject);
    query.near("position", point);
    query.limit(100);
    query.find({
	success: function(placesObjects) {
	    _.map(placesObjects, function(item) {
		var marker = L.marker([item.get("position").latitude, item.get("position").longitude]).addTo(map);
		marker.bindPopup("<h3>" + item.get("RECINTO") + "</h3><p>" + item.get("DIR_RECINT") + "</p><p>" + item.get("PARROQUIA") + ", " +
				 item.get("CANTON") + ", " + item.get("PROVINCIA") + "</p><p><strong>Juntas Receptoras del Voto:</strong> " + item.get("NUM_JUNR") + "</p>")
	    });
	}
    });
};

$( document ).ready(function() {
    setupMap();
});
