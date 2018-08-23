window.onload = function() {

	// global variables
	var lat, lon, jsonData, jsonRawData;

	// clear button
	$("#clearBtn").on('click', function (event) {
		event.preventDefault();
		$('#jsondata').text('');
		console.log('JSON cleared');
	});

	// zip form button
	$("#zipform").submit(function (event) {
		event.preventDefault();
		const zip = $('#zipvalue').val();
		console.log('zip entered: ' + zip);
		getLatLngByZipcode(zip);
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

	// OpenWeather API JSON using latitude and longitude
	function gettingJSON(lat, lon) {
		// document.write("jquery loaded");
		$.getJSON("https://api.openweathermap.org/data/2.5/forecast?appid=d78f5363c58b1e99ac14e3786c1b25ae&lat=" + lat + "&lon=" + lon, function (json) {
			// document.write(JSON.stringify(json));
			jsonRawData = json;
			jsonData = JSON.stringify(json);
			showForecast();
		});
	}

	// show forecast
	function showForecast() {
		console.log("Forecast coming up.");
		// $('#jsondata').text(jsonData);
		extractDisplayData(jsonRawData);
	};

	// geo coordinates from zip code
	function getLatLngByZipcode(zipcode) {
		const geocoder = new google.maps.Geocoder();
		const address = zipcode;
		geocoder.geocode({ 'address': address }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				lat = results[0].geometry.location.lat();
				lon = results[0].geometry.location.lng();
				console.log('latitude: ' + lat);
				console.log('longitude: ' + lon);

				// Show the JSON
				gettingJSON(lat, lon);
			} else {
				alert("Request failed.")
			}
		});
	}

	// extract weather data
	function extractDisplayData(weatherData) {
		let content = '';
		const weatherList = weatherData.list;
		for (let i = 0; i < weatherList.length; i++) {
			if (i && (i % 8 === 0)) {
				const element = weatherList[i];
				const weatherCondition = element.weather[0].description;
				const weatherIcon = element.weather[0].icon;
				let currentDate = new Date(element.dt_txt);
				const weatherDate = currentDate.toDateString();
				console.log("Date: " + weatherDate);
				console.log("Condition: " + weatherCondition);
				console.log("Icon code: " + weatherIcon);
				content += "<p>";
				content += weatherDate + "<br>";
				content += weatherCondition + "<br>";
				content += "<img src='//openweathermap.org/img/w/" + weatherIcon + ".png'>";
				content += "</p>"
			}
		}
		$('#jsondata').html(content);
	}
}
