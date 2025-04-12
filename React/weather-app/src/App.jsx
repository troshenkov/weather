import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherDetails from './components/WeatherDetails';
import OtherInfo from './components/OtherInfo';
import './styles/style.css';
import { fetchWeatherData } from './api/weatherApi';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherData();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getWeatherData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="wrapper">
            <Header date={weatherData.date} city={weatherData.city} />
            <WeatherDetails 
                icon={weatherData.icon} 
                temperature={weatherData.temperature} 
                description={weatherData.description} 
            />
            <OtherInfo 
                sunrise={weatherData.sunrise} 
                sunset={weatherData.sunset} 
                humidity={weatherData.humidity} 
                windSpeed={weatherData.windSpeed} 
            />
        </div>
    );
};

export default App;