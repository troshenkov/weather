/**
 * weather.js
 * 
 * @description A JavaScript file for fetching and displaying real-time weather data using the OpenWeatherMap API.
 *              This script dynamically updates the weather information, including temperature, weather conditions,
 *              sunrise, sunset, humidity, and wind speed. It also changes the background image based on the time of day.
 * 
 * @author Dmitry Troshenkov
 * @contact troshenkov.d@gmail.com
 * @organization Centre.MEDIA
 * 
 * @dependencies:
 * - OpenWeatherMap API (https://openweathermap.org/api)
 * - IPInfo API (https://ipinfo.io/)
 * - Weather Icons (https://erikflowers.github.io/weather-icons/)
 * 
 * @constants:
 * - WEATHER_API_KEY: Your OpenWeatherMap API key (replace "your_api_key_here" with your actual key).
 * - LOCATION_API_URL: URL for fetching the user's location using the IPInfo API.
 * - WEATHER_API_BASE_URL: Base URL for fetching weather data from OpenWeatherMap.
 * - BACKGROUND_COLORS: Object defining background colors for different times of the day.
 * - DAY_IMAGE / NIGHT_IMAGE: URLs for the background images for day and night.
 * 
 * @usage:
 * 1. Replace `WEATHER_API_KEY` with your OpenWeatherMap API key.
 * 2. Ensure the required APIs (OpenWeatherMap and IPInfo) are accessible.
 * 3. Include this script in your HTML file:
 *    <script src="javascript/weather.js"></script>
 * 4. Ensure the following HTML structure exists in your file:
 *    - An element with ID `city` for displaying the city name.
 *    - An element with ID `temperature` for displaying the temperature.
 *    - An element with ID `weather` for displaying the weather description.
 *    - An element with ID `icon` for displaying the weather icon.
 *    - Elements with IDs `sunset`, `sunrise`, `humidity`, and `wind` for additional weather information.
 * 5. Run the application on a local or remote server to avoid CORS issues.
 * 
 * @example:
 * HTML Structure:
 * <div id="city"></div>
 * <div id="temperature"></div>
 * <div id="weather"></div>
 * <i id="icon"></i>
 * <div id="sunset"><span></span><label>Sunset</label></div>
 * <div id="sunrise"><span></span><label>Sunrise</label></div>
 * <div id="humidity"><span></span><label>Humidity</label></div>
 * <div id="wind"><span></span><label>Wind</label></div>
 * 
 * @notes:
 * - This script uses the Fetch API for making HTTP requests.
 * - Ensure the background images (DAY_IMAGE and NIGHT_IMAGE) are accessible at the specified URLs.
 * - The script dynamically updates the DOM elements with the fetched weather data.
 * 
 * @license MIT
 */

let currentWeather, city;

// Weather icons mapping
const weatherIcons = {
  200: { icon: 'thunderstorm' },
  300: { icon: 'sprinkle' },
  500: { icon: 'rain' },
  600: { icon: 'snow' },
  700: { icon: 'fog' },
  800: { icon: 'sunny' },
  801: { icon: 'cloudy' },
  802: { icon: 'cloudy' },
  803: { icon: 'cloudy' },
  804: { icon: 'cloudy' },
  // Add more mappings as needed
};

// Constants
const LOCATION_API_URL = "https://ipinfo.io/json";
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "your_api_key_here";
const BACKGROUND_COLORS = {
  morning: "#FFD700", // Gold
  afternoon: "#87CEEB", // Light Blue
  evening: "#FF4500", // Orange-Red
  night: "#191970" // Midnight Blue
};
const DAY_IMAGE = "http://localhost/img/ny_1.jpg";
const NIGHT_IMAGE = "http://localhost/img/ny_2.jpg";

/**
 * @summary Sends HTTP request to get data from a URL using Fetch API.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<object>} - Resolves to the fetched data.
 */
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Network Error: ${error.message}`);
  }
}

/**
 * @summary Initializes the application by fetching and displaying weather data.
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
    const errorElement = document.getElementById('error');
    if (errorElement) {
      errorElement.textContent = `Error: ${error.message}`;
    } else {
      console.error("Error element not found in the DOM.");
    }
  }
}

/**
 * @summary Fetches location information.
 * @returns {Promise<object>} - Resolves to location data.
 */
async function getLocation() {
  return await getData(LOCATION_API_URL);
}

/**
 * @summary Sets the user's location based on the response object.
 * @param {object} locationData - The location response object.
 */
function setLocation(locationData) {
  if (!locationData || !locationData.city || !locationData.country) {
    console.error("Invalid location data received:", locationData);
    return;
  }
  city = `${locationData.city},${locationData.country}`;
}

/**
 * @summary Fetches weather data for the user's location.
 * @returns {Promise<object>} - Resolves to weather data.
 */
async function getWeatherData() {
  const weatherApiUrl = `${WEATHER_API_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=imperial&lang=en`;
  // const weatherApiUrl = `http://localhost/json/weather.json`;
  return await getData(weatherApiUrl);
}

/**
 * @summary Displays the city name, weather description, and temperature.
 * @param {object} weatherObject - The weather response object.
 */
function setWeather(weatherObject) {
  if (!weatherObject || !weatherObject.name || !weatherObject.sys || !weatherObject.main) {
    console.error("Invalid weather data received:", weatherObject);
    return;
  }

  const weatherDescriptions = weatherObject.weather?.map(w => w.description).join(", ") || "No data";

  currentWeather = {
    city: weatherObject.name,
    country: weatherObject.sys.country,
    weather: weatherDescriptions,
    temperature: Math.ceil(weatherObject.main.temp),
  };

  updateElementSafely('#city', `${currentWeather.city}, ${currentWeather.country}`);
  updateElementSafely('#temperature', `${currentWeather.temperature}°F`);
  updateElementSafely('#weather', currentWeather.weather);
}

/**
 * @summary Sets the weather icon based on the weather condition.
 * @param {object} resp - The weather response object.
 */
function getIcon(resp) {
  if (!resp || !resp.weather || resp.weather.length === 0) {
    console.error("Invalid weather response:", resp);
    return;
  }

  const prefix = "wi wi-";
  const code = resp.weather[0].id;
  const responseIcon = resp.weather[0].icon;
  const dayOrNight = responseIcon.charAt(responseIcon.length - 1) === "d" ? "day" : "night";

  let icon = weatherIcons[code]?.icon || (dayOrNight === "day" ? "day-cloudy" : "night-cloudy");

  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = icon === "sunny" ? `day-${icon}` : `${dayOrNight}-${icon}`;
  }

  icon = `${prefix}${icon}`;
  updateElementSafely('#icon', icon, "className");
}

/**
 * @summary Sets the current date, time, and background based on sunrise and sunset.
 * @param {object} weatherObj - The weather response object.
 */
function setCurrentTime(weatherObj) {
  if (!weatherObj || !weatherObj.sys) {
    console.error("Invalid weather data received.");
    return;
  }

  const { sunrise, sunset } = weatherObj.sys;
  const currentTime = Date.now();
  const sunriseTime = sunrise * 1000;
  const sunsetTime = sunset * 1000;

  updateElementSafely('#date', unixToTime(currentTime / 1000, "time"));

  const hour = new Date().getHours();
  const fallbackColor =
    hour >= 6 && hour < 12 ? BACKGROUND_COLORS.morning :
    hour >= 12 && hour < 18 ? BACKGROUND_COLORS.afternoon :
    hour >= 18 && hour < 21 ? BACKGROUND_COLORS.evening :
    BACKGROUND_COLORS.night;

  function imageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  Promise.all([imageExists(DAY_IMAGE), imageExists(NIGHT_IMAGE)]).then(([dayImageExists, nightImageExists]) => {
    if (currentTime >= sunriseTime && currentTime < sunsetTime) {
      document.body.style.backgroundImage = dayImageExists ? `url('${DAY_IMAGE}')` : fallbackColor;
    } else {
      document.body.style.backgroundImage = nightImageExists ? `url('${NIGHT_IMAGE}')` : fallbackColor;
    }
  });
}

/**
 * @summary Displays additional weather information (sunset, sunrise, humidity, wind speed).
 * @param {object} weatherObj - The weather response object.
 */
function setOtherInfo(weatherObj) {
  if (!weatherObj || !weatherObj.sys || !weatherObj.main || !weatherObj.wind) {
    console.error("Invalid or incomplete weather data received:", weatherObj);
    return;
  }

  // Update the text content inside the <span> of each element
  updateElementSafely('#sunset span', unixToTime(weatherObj.sys.sunset, "time"));
  updateElementSafely('#sunrise span', unixToTime(weatherObj.sys.sunrise, "time"));
  updateElementSafely('#humidity span', `${weatherObj.main.humidity}%`);
  updateElementSafely('#wind span', `${weatherObj.wind.speed} m/s`);
}

/**
 * @summary Safely updates the text content or class of a DOM element.
 * @param {string} selector - The CSS selector of the DOM element.
 * @param {string} value - The value to set.
 * @param {string} [property="textContent"] - The property to update (e.g., "textContent" or "className").
 */
function updateElementSafely(selector, value, property = "textContent") {
  const element = document.querySelector(selector);
  if (element) {
    element[property] = value;
  } else {
    console.warn(`Element with selector '${selector}' not found in the DOM.`);
  }
}

/**
 * @summary Converts Unix timestamp to human-readable format.
 * @param {number} timestamp - The timestamp to be converted.
 * @param {string} returnType - Format to return ("time" or "date").
 * @returns {string} - The formatted date/time.
 */
function unixToTime(timestamp, returnType) {
  const date = new Date(timestamp * 1000);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const time = date.toLocaleTimeString("en-US", options);
  const fullDate = date.toLocaleDateString("en-US");

  return returnType === "time" ? time : returnType === "date" ? fullDate : `${fullDate} ${time}`;
}

// Initialize the application
init();
