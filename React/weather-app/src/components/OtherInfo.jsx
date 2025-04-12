import React from 'react';

const OtherInfo = ({ sunrise, sunset, humidity, windSpeed }) => {
    return (
        <div className="other-info">
            <div className="info-item">
                <label>Sunrise:</label>
                <span>{new Date(sunrise * 1000).toLocaleTimeString()}</span>
            </div>
            <div className="info-item">
                <label>Sunset:</label>
                <span>{new Date(sunset * 1000).toLocaleTimeString()}</span>
            </div>
            <div className="info-item">
                <label>Humidity:</label>
                <span>{humidity}%</span>
            </div>
            <div className="info-item">
                <label>Wind Speed:</label>
                <span>{windSpeed} m/s</span>
            </div>
        </div>
    );
};

export default OtherInfo;