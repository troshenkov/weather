var currentWeather, city;

/**
 * @summary Sends HTTP request to get data from url using promise.
 *
 * @param string $url Url for fetching data from.
 *
 * @return object Either data fetched from url is returned or error is returned.
 */
function getData( url ) {
	return new Promise( function ( resolve, reject ) {
	var req = new XMLHttpRequest();
	req.open( 'GET', url, true );
	req.onload = function() {
		if ( req.status == 200 ) {
			resolve( req.response );
		}
		else {
			reject( Error ( req.statusText ));
		}
	};
	
	req.onerror = function() {
		reject( Error ( "Network Error" ) );
	};
	
	req.send();
	});
}	

/**
 * @summary Initiates and completes the process of fetching data and displaying it.
 */
function init() {
	getLocation().then ( function( response ) {
			setLocation( response );
			getWeatherData().then ( function( response ){
				setWeather( response );
				getIcon( response );
				setCurrentTime( response );
				setOtherInfo( response );
				})
			.catch( function( error ) { 
				document.write ( 'Error: ', error );
				});
			})
		.catch( function( error ) {
			document.write ( 'Error2: ', error );
		});
}

/**
 * @summary Used to get location info.
 *
 * @return object Promise is returned after fetching data.
 *
*/
function getLocation() {
	locationApiurl = "https://ipinfo.io/json";
	return getData( locationApiurl );
}

/**
 * @summary Sets location of the user by parsing the reposnse object.
 *
 * @param object $locationData location response object returned by request.
 *
 * @global string $city city is set to be used in getting weather data.
 */
function setLocation( locationData ) {
	loc = JSON.parse( locationData ) ;
	city = loc.city + "," + loc.country;
}

/**
 * @summary Sends request to get weather data.
 *
 * @return object Promise object is returned ofter getting weather data.
 */

/* Get location by City*/
function getWeatherData() {
	//var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?";
	//var weatherAppId = "&APPID=7040a1f543f50652aee32c6eeedc83e7";
	//var weatherAppId = "&APPID=2a48b250e8c5413273a05392c3ecab7f";
	//var units = "&units=imperial";
	//var lang = "&lang=en";
	//return getData ( weatherApiUrl + city + weatherAppId + units + lang);
	return getData ( "http://localhost/json/weather.json" );
}

/**
 * @summary Sorts out the city name & weather and display it in the application.
 *
 * @param object $weatherObject weather response object returned by request.
 */
function setWeather( weatherObject ) {
	var rawData = JSON.parse( weatherObject );
	var weather = [];
	for ( i = 0; i < rawData.weather.length; i++ ) {
		weather[i] = rawData.weather[i].description;
	}
	currentWeather = {
	"city": rawData.name,
	"country": rawData.sys.country,
	"weather": weather,
	"temperature": Math.ceil( rawData.main.temp )}
	document.getElementById( 'city' ).innerHTML = rawData.name + ", " + rawData.sys.country;
	document.getElementById( 'temperature' ).innerHTML = currentWeather["temperature"];
	document.getElementById( 'weather' ).innerHTML = weather.toString();
}

/**
 * @summary Sets icon for weather.
 *
 * @param object $resp weather response object returned by request.
 */
function getIcon( resp ) {
	response = JSON.parse( resp );
	var weatherIcons =  data;
	var prefix = 'wi wi-';
	var code = response.weather[0].id;
	var icon = weatherIcons[ code ].icon;
	var responseIcon = response.weather[0].icon;
	var dayOrNight = responseIcon.charAt( responseIcon.length-1 ) === "d" ? "day" : "night";
	// If we are not in the ranges mentioned above, add a day/night prefix.
	if ( !( code > 699 && code < 800 ) && !( code > 899 && code < 1000 ) ) {
		icon === "sunny" ? icon = 'day-' + icon :  icon = dayOrNight + '-' + icon;
		//icon = dayOrNight + '-' + icon;
	}
	// Finally tack on the prefix.
	icon = prefix + icon;
	document.getElementById( 'icon' ).className =  icon;
}

/**
 * @summary Toggles the temperature to Celsius/Farenhiet.
 */
function changeUnit() {
	var currentUnit = document.getElementById( 'unit' ).innerHTML;
	if( currentUnit == "C" ) {
		document.getElementById( 'unit' ).innerHTML = "F";
		document.getElementById( 'temperature' ).innerHTML = cToF ( currentWeather["temperature"] );
	} else {
		document.getElementById( 'unit' ).innerHTML = "C";
		document.getElementById( 'temperature' ).innerHTML = currentWeather["temperature"];
	}
}

/**
 * @summary Converts the value from celsius to Farenheit.
 *
 * @param number $celsius temperature to be converted.
 *
 * @return number temperature in Farenheit.
 */
function cToF(celsius) {  
	return  Math.ceil( celsius * 9 / 5 + 32 );  
}

/**
 * @summary Sets the current date and time.
 *
 * @param obhject $weatherObj weather response object returned by request.
 */
function setCurrentTime( weatherObj ) {
	var weatherData = JSON.parse( weatherObj );
	//time = unixToTime( weatherData.dt );
	var timeInMs = Date.now() / 1000;
	time = unixToTime( timeInMs );
	document.getElementById( 'date' ).innerHTML = time;
	// Changing background color
	if (timeInMs > weatherData.sys.sunrise){document.body.style.backgroundColor='#6495ED'};
	//if (timeInMs > weatherData.sys.sunrise){document.body.style.backgroundImage="url('img/ny_1.jpg')"};
	if (timeInMs > weatherData.sys.sunset){document.body.style.backgroundColor='#0C090A'};
	//if (timeInMs > weatherData.sys.sunset){document.body.style.backgroundImage="url('img/ny_2.jpg')"};
}

/**
 * @summary sets value for the additional information to be displayed.
 *
 * @param object $weatherObj weather response object returned by request.
 */
function setOtherInfo( weatherObj ) {
	var weatherData = JSON.parse( weatherObj );
	document.getElementById( 'sunset' ).innerHTML += unixToTime( weatherData.sys.sunset, "time" );
	document.getElementById( 'sunrise' ).innerHTML += unixToTime( weatherData.sys.sunrise, "time" );
	document.getElementById( 'humidity' ).innerHTML += weatherData.main.humidity+"%";
	document.getElementById( 'wind' ).innerHTML += weatherData.wind.speed+"м/c";
}

/**
 * @summary Converts time from Unix timestamp to human readable format.
 *
 * @param number $timestamp timestamp to be converted into time and date.
 * @param string $returnType codes to decide the format to be returned.
 *
 * @return string Formatted Date/Time.
 */
function unixToTime( timestamp, returnType ) {
	var a = new Date( timestamp * 1000 );
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var day = days[a.getDay()];
	var hour = a.getHours();
	var mins = a.getMinutes()< 10 ? '0' + a.getMinutes() : a.getMinutes();
	//var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
	var CurrentDate = day + ", " + date + ' ' + month + ' ' + year;
	//***
	if (hour > 12){
		meridiem = "PM";
		hour = hour - 12;
	} else {
		meridiem = "AM";
	}
	var time = hour + ':' + mins + meridiem;
	//***
	var dateTime = CurrentDate + ' ' + time ;
	switch(returnType) {
		case "time":
		return time;
		case "date":
		return CurrentDate;
		default:
		return dateTime;
	}
}

init();
