window.onload = function() {

	// Check to see if the browser supports the GeoLocation API.
	if (navigator.geolocation) {
		// Get the location
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			console.log('latitude: ' + lat);
			console.log('longitude: ' + lon);
			
			// Show the JSON
			gettingJSON(lat, lon);
		});
	} else {
		// Print out a message to the user.
		document.write('Your browser does not support GeoLocation :(');
	}

}

// get OpenWeather API JSON
function gettingJSON(lat, lon){
		// document.write("jquery loaded");
		$.getJSON("https://api.darksky.net/forecast/09ffec8ffd7df43c9e4ec34117d734f7/" + lat + "," + lon,function(json){
				document.write(JSON.stringify(json));
				showForecast();
		});
}

// Show forecast
function showForecast() {
	console.log("Forecast coming up.");
};
