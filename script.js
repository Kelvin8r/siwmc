window.onload = function() {

	// Check to see if the browser supports the GeoLocation API.
	if (navigator.geolocation) {
		// Get the location
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;

			// Show the map
			gettingJSON(lat, lon);
		});
	} else {
		// Print out a message to the user.
		document.write('Your browser does not support GeoLocation :(');
	}

}

// get OpenWeather API JSON
function gettingJSON(lat, lon){
		document.write("jquery loaded");
		$.getJSON("https://api.openweathermap.org/data/2.5/forecast?forecast?lat=" + lat + "&lon=" + lon + "&APPID=d78f5363c58b1e99ac14e3786c1b25ae",function(json){
				document.write(JSON.stringify(json));
				showForecast();
		});
}

// Show forecast
function showForecast() {
	console.log("Forecast coming up.");
};
