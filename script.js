// window.onload = function() {
//
// 	// Check to see if the browser supports the GeoLocation API.
// 	if (navigator.geolocation) {
// 		// Get the location
// 		navigator.geolocation.getCurrentPosition(function(position) {
// 			var lat = position.coords.latitude;
// 			var lon = position.coords.longitude;
// 			console.log('latitude: ' + lat);
// 			console.log('longitude: ' + lon);
//
// 			// Show the JSON
// 			gettingJSON(lat, lon);
// 		});
// 	} else {
// 		// Print out a message to the user.
// 		document.write('Your browser does not support GeoLocation :(');
// 	}
//
// }

var jsonData;

// get OpenWeather API JSON
function gettingJSON(){
	// document.write("jquery loaded");
	var x = document.getElementById("zipvalue");
    var zip = "";
    zip += x.value;
	console.log('zip entered: ' + zip);
	$.getJSON("https://api.openweathermap.org/data/2.5/forecast?appid=d78f5363c58b1e99ac14e3786c1b25ae&zip=" + zip, function(json){
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
