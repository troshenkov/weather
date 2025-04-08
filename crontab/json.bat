@echo off
:: ===================================================================
:: Script to Fetch Weather Data from OpenWeatherMap API
:: ===================================================================
::
:: This script retrieves weather data from OpenWeatherMap API based on
:: either city name, state code, and country code, or latitude and 
:: longitude.
::
:: The script will:
:: - Fetch weather data based on the chosen method (coordinates or location).
:: - Save the JSON response to a specified location.
:: - Handle errors if the request fails.
::
:: How to use:
:: 1. Set your OpenWeatherMap API Key as a global environment variable:
::    setx OPENWEATHER_API_KEY "your_api_key_here"
::
:: 2. Select the method you want to use:
::    - Set USE_COORDS to true if you want to use latitude and longitude.
::    - Set USE_LOCATION to true if you want to use city, state, and country.
::
:: 3. Set the parameters:
::    - For coordinates: Set LAT and LON.
::    - For location: Set CITY, STATE, and COUNTRY.
::
:: 4. Optional:
::    - Set the units and language parameters in the script.
::
:: 5. Save this script as json.bat and run it.
::
:: Author: Dmitry Troshenkov (troshenkov.d@gmail.com)
:: ===================================================================

:: Load API Key from environment variables
set "API_KEY=%OPENWEATHER_API_KEY%"

:: Ensure API key is set
if "%API_KEY%"=="" (
    echo Error: API key is missing. Set OPENWEATHER_API_KEY as an environment variable.
    exit /b 1
)

:: Output file location (change this path as needed)
set "OUTPUT_FILE=C:\path\to\weather.json"

:: Method selection (Only one should be set to true)
set "USE_COORDS=true"    :: Set to true to use coordinates (lat/lon), false otherwise
set "USE_LOCATION=false" :: Set to true to use city/state/country, false otherwise

:: Coordinates (latitude, longitude) method
set "LAT=40.7128"  :: Example: New York City
set "LON=-74.0060" 

:: Location (city, state, country) method
set "CITY=New York"   :: Example: New York
set "STATE=NY"        :: Example: NY (optional for some countries)
set "COUNTRY=US"      :: Example: US

:: Optional parameters
set "UNITS=imperial"  :: Can be "standard", "metric", or "imperial"
set "LANG=en"         :: Language code for the response (default: English)

:: Ensure only one method is selected
if "%USE_COORDS%"=="true" if "%USE_LOCATION%"=="true" (
    echo Error: Only one method (coordinates or location) should be enabled.
    exit /b 1
)

:: Ensure at least one method is selected
if "%USE_COORDS%"=="false" if "%USE_LOCATION%"=="false" (
    echo Error: No valid method selected. Please enable either coordinates or location.
    exit /b 1
)

:: Fetch weather data based on the selected method
if "%USE_COORDS%"=="true" (
    echo Fetching weather data for coordinates: Latitude=%LAT%, Longitude=%LON%...
    D:\path\to\wget64.exe "http://api.openweathermap.org/data/2.5/weather?lat=%LAT%&lon=%LON%&appid=%API_KEY%&units=%UNITS%&lang=%LANG%" -O "%OUTPUT_FILE%"

) else if "%USE_LOCATION%"=="true" (
    echo Fetching weather data for location: City=%CITY%, State=%STATE%, Country=%COUNTRY%...
    D:\path\to\wget64.exe "http://api.openweathermap.org/data/2.5/weather?q=%CITY%,%STATE%,%COUNTRY%&appid=%API_KEY%&units=%UNITS%&lang=%LANG%" -O "%OUTPUT_FILE%"
)

:: Verify if the request was successful
if errorlevel 1 (
    echo Error: Failed to fetch weather data.
    exit /b 1
)

echo Weather data updated successfully.
exit /b 0