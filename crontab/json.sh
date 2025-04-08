#!/bin/bash
# ===================================================================
# Script to Fetch Weather Data from OpenWeatherMap API
# ===================================================================
#
# This script retrieves weather data from OpenWeatherMap API based on
# either city name, state code, and country code, or latitude and 
# longitude.
#
# The script will:
# - Fetch weather data based on the chosen method (coordinates or location).
# - Save the JSON response to a specified location.
# - Handle errors if the request fails.
#
# How to use:
# 1. Set your OpenWeatherMap API Key as a global environment variable:
#    export OPENWEATHER_API_KEY="your_api_key_here"
#
# 2. Select the method you want to use:
#    - Set the `USE_COORDS` to true if you want to use latitude and longitude.
#    - Set the `USE_LOCATION` to true if you want to use city, state, and country.
#
# 3. Set the parameters:
#    - For coordinates: Set `LAT` and `LON`.
#    - For location: Set `CITY`, `STATE`, and `COUNTRY`.
# 4. Optional:
#    Set the units and language parameters in the script.
#      UNITS="imperial"    # Can be "standard", "metric", or "imperial"
#      LANG="en"           # Language code for the response
#
# 5. Save this script as json.sh and make it executable:
#    chmod +x /path/to/json.sh
#
# 6. Set up a cron job to run it every 10 minutes by adding the following to crontab:
#    */10 * * * * /path/to/json.sh
#
# Author: Dmitry Troshenkov (troshenkov.d@gmail.com)
# ===================================================================

# Global API Key (Ensure it's set as an environment variable for security)
API_KEY="$OPENWEATHER_API_KEY"

# Ensure API key is set
if [ -z "$API_KEY" ]; then
    echo "Error: API key is missing. Set OPENWEATHER_API_KEY as an environment variable."
    exit 1
fi

# Output file location
OUTPUT_FILE="/var/www/weather/json/weather.json"

# Method selection
USE_COORDS=true  # Set to true to use coordinates (lat/lon), false to use location (city/state/country)
USE_LOCATION=false  # Set to true to use city/state/country method

# Coordinates (latitude, longitude) method
LAT="40.7128"  # Latitude for New York City (example)
LON="-74.0060"  # Longitude for New York City (example)

# Location (city, state, country) method
CITY="New York"   # City name (example)
STATE="NY"        # State code (example)
COUNTRY="US"      # Country code (example)

# Optional parameters
UNITS="imperial"  # Can be "standard", "metric", or "imperial"
LANG="en"         # Language code for the response (default: English)

# Ensure either coordinates or location is set, not both
if [ "$USE_COORDS" = true ] && [ "$USE_LOCATION" = true ]; then
    echo "Error: Only one method (coordinates or location) should be enabled."
    exit 1
fi

# Fetch weather data based on the selected method
if [ "$USE_COORDS" = true ]; then
    echo "Fetching weather data for coordinates: Latitude=$LAT, Longitude=$LON..."
    wget -q "http://api.openweathermap.org/data/2.5/weather?lat=$LAT&lon=$LON&appid=$API_KEY&units=$UNITS&lang=$LANG" -O "$OUTPUT_FILE"
elif [ "$USE_LOCATION" = true ]; then
    echo "Fetching weather data for location: City=$CITY, State=$STATE, Country=$COUNTRY..."
    wget -q "http://api.openweathermap.org/data/2.5/weather?q=$CITY,$STATE,$COUNTRY&appid=$API_KEY&units=$UNITS&lang=$LANG" -O "$OUTPUT_FILE"
else
    echo "Error: No valid method (coordinates or location) selected."
    exit 1
fi

# Verify if the request was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to fetch weather data."
    exit 1
fi

echo "Weather data updated successfully."
exit 0