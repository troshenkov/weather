# Weather Application

This is a simple weather application built using React. It fetches weather data from the OpenWeatherMap API and displays it in a user-friendly interface.

## Project Structure

```
weather-app
├── public
│   ├── index.html        # Main HTML template
│   └── favicon.ico       # Favicon for the application
├── src
│   ├── components        # React components
│   │   ├── Header.jsx    # Displays the header section
│   │   ├── WeatherDetails.jsx # Displays main weather information
│   │   └── OtherInfo.jsx # Displays additional weather information
│   ├── styles            # CSS styles
│   │   └── style.css     # Styles for the application
│   ├── App.jsx           # Main application component
│   ├── index.jsx         # Entry point of the application
│   └── api               # API functions
│       └── weatherApi.js # Functions for fetching weather data
├── package.json          # npm configuration file
├── .gitignore            # Files to ignore by Git
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration file
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- Enter a city name to fetch the current weather data.
- The application displays the city name, date, temperature, weather description, and additional information such as humidity and wind speed.

## License

This project is licensed under the MIT License.
