import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
  

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found. Please check the spelling and try again.');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-bg">
      <div className="weather-content-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <span className="search-location-icon">📍</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            Search
          </button>
        </form>
        <div className="weather-center">
          <WeatherCard weatherData={weatherData} error={error} loading={loading || (!weatherData && !error)} />
        </div>
      </div>
    </div>
  );
}

export default App;
