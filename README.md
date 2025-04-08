# Weather App

This is a simple weather application that fetches and displays weather data based on either a user's location or specified city. The app uses the OpenWeatherMap API to get weather information and displays it with options for temperature units, weather description, icons, and additional information like sunrise, sunset, and wind speed.

## Features

- **Get Weather by Location**: The app can fetch weather data based on the user's location (using IP geolocation) or a predefined city name.
- **Temperature Unit Toggle**: Allows users to toggle between Celsius and Fahrenheit.
- **Current Weather**: Displays temperature, weather description, and location.
- **Weather Icon**: Displays an appropriate icon based on the weather condition (e.g., sunny, rainy, cloudy).
- **Sunrise and Sunset Times**: Shows the time of the sunrise and sunset for the current location.
- **Wind Speed and Humidity**: Displays additional weather details like wind speed and humidity.

## Installation

### Prerequisites

1. **OpenWeatherMap API Key**: You will need an API key from OpenWeatherMap to fetch weather data.
   
   - Go to [OpenWeatherMap](https://openweathermap.org/api) and sign up for an API key.

2. **Environment Setup**: Ensure that your environment supports `JavaScript` and `XMLHttpRequest` for fetching data.

### Steps

1. Clone or download the repository.

   ```bash
   git clone https://github.com/troshenkov/weather.git

1. Add your OpenWeatherMap API key in the environment variables or the script file where the weather API URL is used.

2. Set up the project on a local server or open the HTML file directly in a browser to view the app in action.

## Real-World Use Case

This weather application was specially designed for use in outdoor LED screen setups, where it fetches real-time weather data and displays it in a user-friendly format.

For real-life demonstration of the app, you can check out how it's implemented in an outdoor LED screen environment in the following video:  
[Outdoor LED Screen Weather App Demo](https://www.youtube.com/watch?v=xTm8B7Zrhqk)

## How It Works

The app fetches data through an asynchronous request to the OpenWeatherMap API. Based on the user's location or the selected city, it retrieves weather data like temperature, conditions, and sunrise/sunset times. The weather icon is dynamically updated to reflect the current conditions.

### Features for Outdoor Displays:
- **Real-time updates**: Continuously fetches the latest weather data.
- **Weather visualization**: Displays detailed weather information and icons on a large, outdoor screen.

## Usage

- The weather data is updated periodically based on the time interval defined in the app's configuration.
- Users can interact with the temperature unit toggle to switch between Celsius and Fahrenheit.

## License

This project is licensed under the MIT License - see the LICENSE file for details.