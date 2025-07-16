import React from 'react';

const WeatherCard = ({ weatherData, error, loading }) => {
  // Default values for empty state
  const defaultCard = {
    name: '--',
    country: '',
    temp: '--',
    feelsLike: '--',
    humidity: '--',
    windSpeed: '--',
    weatherDesc: '--',
    icon: '01d', // clear sky icon as default
    visibility: '--',
  };

  let card = defaultCard;
  if (weatherData && !error) {
    const { name, sys, main, weather, wind, visibility } = weatherData;
    card = {
      name: name || '--',
      country: sys?.country ? `, ${sys.country}` : '',
      temp: main?.temp !== undefined ? Math.round(main.temp) : '--',
      feelsLike: main?.feels_like !== undefined ? Math.round(main.feels_like) : '--',
      humidity: main?.humidity !== undefined ? main.humidity : '--',
      windSpeed: wind?.speed !== undefined ? wind.speed : '--',
      weatherDesc: weather?.[0]?.description ? weather[0].description : '--',
      icon: weather?.[0]?.icon || '01d',
      visibility: visibility !== undefined ? Math.round(visibility / 1000) : '--',
    };
  }

  if (error) {
    return (
      <div className="weather-card error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="weather-card glass">
      <div className="weather-location">
        <span role="img" aria-label="location" className="location-icon">📍</span>
        <span className="location-text">{card.name}{card.country}</span>
      </div>
      <div className="weather-main">
        <img
          src={`http://openweathermap.org/img/wn/${card.icon}@4x.png`}
          alt={card.weatherDesc}
          className="weather-main-icon"
          style={{ opacity: card.temp === '--' ? 0.3 : 1 }}
        />
        <span className="weather-temp">{card.temp !== '--' ? `${card.temp}°` : '--'}</span>
      </div>
      <div className="weather-desc">{card.weatherDesc !== '--' ? card.weatherDesc.charAt(0).toUpperCase() + card.weatherDesc.slice(1) : '--'}</div>
      <div className="weather-summary">
        {card.temp !== '--' && card.weatherDesc !== '--' && card.feelsLike !== '--'
          ? `Current temperature is ${card.temp}°C with ${card.weatherDesc}. Feels like ${card.feelsLike}°C.`
          : 'Weather information will appear here.'}
      </div>
      <div className="weather-info-grid">
        <div className="weather-info-box">
          <div className="info-label">FEELS LIKE</div>
          <div className="info-value">{card.feelsLike !== '--' ? `${card.feelsLike}°` : '--'}</div>
        </div>
        <div className="weather-info-box">
          <div className="info-label">HUMIDITY</div>
          <div className="info-value">{card.humidity !== '--' ? `${card.humidity}%` : '--'}</div>
        </div>
        <div className="weather-info-box">
          <div className="info-label">VISIBILITY</div>
          <div className="info-value">{card.visibility !== '--' ? `${card.visibility} km` : '--'}</div>
        </div>
        <div className="weather-info-box">
          <div className="info-label">WIND</div>
          <div className="info-value">{card.windSpeed !== '--' ? `${card.windSpeed} km/h` : '--'}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 