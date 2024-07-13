import React, { useState } from 'react';
import SearchBar from './components/Weather/SearchBar';
import WeatherCard from './components/Weather/WeatherCard';
import { getWeather } from './services/weatherService';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      const data = await getWeather(city);
      setWeatherData(data);
      setError(null);
      setRecentSearches((prevSearches) => {
        const newSearches = [city, ...prevSearches.filter(item => item !== city)].slice(0, 5);
        return newSearches;
      });
    } catch (err) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="App shadow text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 rounded-300">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Weather Dashboard</h1>
        </header>
        <SearchBar onSearch={handleSearch} recentSearches={recentSearches} error={error} />
        {weatherData && <WeatherCard weather={weatherData} />}
      </div>
    </div>
  );
};

export default App;
