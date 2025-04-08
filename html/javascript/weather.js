var currentWeather, city;

/**
 * @summary Sends HTTP request to get data from a URL using a promise.
 *
 * @param string url URL for fetching data from.
 *
 * @return object Data fetched from the URL or error.
 */
async function getData(url) {
  try {
    let req = await fetch(url);
    if (!req.ok) {
      throw new Error(req.statusText);
    }
    return await req.json();
  } catch (error) {
    throw new Error('Network Error: ' + error.message);
  }
}

/**
 * @summary Initiates the fetching of location and weather data.
 */
async function init() {
  try {
    const locationData = await getLocation();
    setLocation(locationData);

    const weatherData = await getWeatherData();
    setWeather(weatherData);
    getIcon(weatherData);
    setCurrentTime(weatherData);
    setOtherInfo(weatherData);
  } catch (error) {
    console.error('Error:', error.message);
    document.write('Error: ' + error.message);
  }
}

/**
 * @summary Gets location information.
 *
 * @return object The location data.
 */
async function getLocation() {
  const locationApiUrl = "https://ipinfo.io/json";
  return await getData(locationApiUrl);
}

/**
 * @summary Sets location information.
 *
 * @param object locationData The location response data.
 */
function setLocation(locationData) {
  const loc = locationData;
  city = `${loc.city},${loc.country}`;
}

/**
 * @summary Sends request to get weather data.
 *
 * @return object The weather data.
 */
async function getWeatherData() {
  const weatherApiUrl = "http://localhost/json/weather.json";
  return await getData(weatherApiUrl);
}

/**
 * @summary Sets the weather information in the DOM.
 *
 * @param object weatherData The weather data response.
 */
function setWeather(weatherData) {
  const weather = weatherData.weather.map(w => w.description);
  currentWeather = {
    city: weatherData.name,
    country: weatherData.sys.country,
    weather: weather,
    temperature: Math.ceil(weatherData.main.temp)
  };

  document.getElementById('city').innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
  document.getElementById('temperature').innerHTML = currentWeather.temperature;
  document.getElementById('weather').innerHTML = weather.join(', ');
}

/**
 * @summary Sets the weather icon based on weather conditions.
 *
 * @param object weatherData The weather data response.
 */
function getIcon(weatherData) {
  const weatherIcons = data;
  const code = weatherData.weather[0].id;
  const icon = weatherIcons[code]?.icon || 'wi wi-na';
  const responseIcon = weatherData.weather[0].icon;
  const dayOrNight = responseIcon.charAt(responseIcon.length - 1) === 'd' ? 'day' : 'night';

  const finalIcon = code > 699 && code < 800 || code > 899 && code < 1000
    ? `${icon}`
    : `${dayOrNight}-${icon}`;

  document.getElementById('icon').className = `wi ${finalIcon}`;
}

/**
 * @summary Toggles the temperature unit between Celsius and Fahrenheit.
 */
function changeUnit() {
  const currentUnit = document.getElementById('unit').innerHTML;
  const newUnit = currentUnit === "C" ? "F" : "C";
  const newTemp = currentUnit === "C"
    ? cToF(currentWeather.temperature)
    : currentWeather.temperature;

  document.getElementById('unit').innerHTML = newUnit;
  document.getElementById('temperature').innerHTML = newTemp;
}

/**
 * @summary Converts Celsius to Fahrenheit.
 *
 * @param number celsius The temperature in Celsius.
 * @return number The temperature in Fahrenheit.
 */
function cToF(celsius) {
  return Math.ceil(celsius * 9 / 5 + 32);
}

/**
 * @summary Sets the current date and time in the DOM.
 *
 * @param object weatherData The weather data response.
 */
function setCurrentTime(weatherData) {
  const timeInMs = Date.now() / 1000;
  const time = unixToTime(timeInMs);
  document.getElementById('date').innerHTML = time;

  if (timeInMs > weatherData.sys.sunrise) {
    document.body.style.backgroundColor = '#6495ED';
  }

  if (timeInMs > weatherData.sys.sunset) {
    document.body.style.backgroundColor = '#0C090A';
  }
}

/**
 * @summary Sets additional weather information in the DOM.
 *
 * @param object weatherData The weather data response.
 */
function setOtherInfo(weatherData) {
  document.getElementById('sunset').innerHTML += unixToTime(weatherData.sys.sunset, "time");
  document.getElementById('sunrise').innerHTML += unixToTime(weatherData.sys.sunrise, "time");
  document.getElementById('humidity').innerHTML += `${weatherData.main.humidity}%`;
  document.getElementById('wind').innerHTML += `${weatherData.wind.speed} м/c`;
}

/**
 * @summary Converts Unix timestamp to a human-readable format.
 *
 * @param number timestamp The timestamp to convert.
 * @param string returnType The type of format to return ("time", "date", or default).
 * @return string The formatted date or time.
 */
function unixToTime(timestamp, returnType) {
  const a = new Date(timestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const day = days[a.getDay()];
  let hour = a.getHours();
  const mins = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  let meridiem = hour > 12 ? "PM" : "AM";
  hour = hour > 12 ? hour - 12 : hour;

  const time = `${hour}:${mins} ${meridiem}`;
  const CurrentDate = `${day}, ${date} ${month} ${year}`;

  switch (returnType) {
    case "time":
      return time;
    case "date":
      return CurrentDate;
    default:
      return `${CurrentDate} ${time}`;
  }
}

init();