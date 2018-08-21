window.onload = function() {

	// variable to store weather json data
	var jsonData;

	// form click button
	$("#zipform").submit(function (event) {
		event.preventDefault();
		var zip = $('#zipvalue').value;
		console.log('zip entered: ' + zip);
	});

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

	// get OpenWeather API JSON
	function gettingJSON(lat, lon) {
		// document.write("jquery loaded");
		$.getJSON("https://api.openweathermap.org/data/2.5/forecast?appid=d78f5363c58b1e99ac14e3786c1b25ae&lat=" + lat + "&lon=" + lon, function (json) {
			// document.write(JSON.stringify(json));
			jsonData = JSON.stringify(json);
			showForecast();
		});
	}

	// Show forecast
	function showForecast() {
		console.log("Forecast coming up.");
		$('#jsondata').text(jsonData);
	};

}
