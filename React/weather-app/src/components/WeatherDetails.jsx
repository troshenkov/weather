import React from 'react';

const WeatherDetails = ({ weather, temperature }) => {
    return (
        <div className="weather-details">
            <div id="icon" className="wi">{weather.icon}</div>
            <div id="temperature">{temperature} <span className="degree">°</span></div>
            <div id="weather">{weather.description}</div>
        </div>
    );
};

export default WeatherDetails;