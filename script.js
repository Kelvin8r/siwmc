window.onload = function() {

	// global variables
	var lat, lon, jsonData;

	// clear button
	$("#clearBtn").on('click', function (event) {
		event.preventDefault();
		$('#jsondata').text('');
		console.log('zip entered: ' + zip);
	});

	// zip form button
	$("#zipform").submit(function (event) {
		event.preventDefault();
		var zip = $('#zipvalue').val();
		console.log('zip entered: ' + zip);
		var coor = getLatLngByZipcode(zip);
		gettingJSON(coor[0], coor[1]);
	});

	// geolocation button
	$("#geoLocBtn").on('click', function (event) {
		console.log('geolocation requested');
		event.preventDefault();
		// Check to see if the browser supports the GeoLocation API.
		if (navigator.geolocation) {
			// Get the location
			navigator.geolocation.getCurrentPosition(function (position) {
				lat = position.coords.latitude;
				lon = position.coords.longitude;
				console.log('latitude: ' + lat);
				console.log('longitude: ' + lon);

				// Show the JSON
				gettingJSON(lat, lon);
			});
		} else {
			// Print out a message to the user.
			document.write('Your browser does not support GeoLocation :(');
		}
	});

	// get OpenWeather API JSON using latitude and longitude
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

	// Get geo coordinates from zip code
	function getLatLngByZipcode(zipcode) {
		var geocoder = new google.maps.Geocoder();
		var address = zipcode;
		geocoder.geocode({ 'address': address }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				// alert("Latitude: " + latitude + "\nLongitude: " + longitude);
			} else {
				alert("Request failed.")
			}
		});
		return [latitude, longitude];
	}
}
