#!/bin/bash

	wget "http://api.openweathermap.org/data/2.5/weather?q=New York&APPID=2a48b250e8c5413273a05392c3ecab7f&units=imperial&lang=en" -O /var/www/weather/json/weather.json

exit 0
