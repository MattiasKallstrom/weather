import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return null;
  }

  const { name, main, weather: weatherDetails } = weather;
  const { temp, humidity } = main;
  const { description, icon } = weatherDetails[0];

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
      <h2 className="text-3xl font-bold mb-4">{name}</h2>
      <div className="flex items-center mb-4">
        <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={description} className="w-20 h-20 mr-4" />
        <p className="text-2xl">{description}</p>
      </div>
      <p className="text-4xl mb-4">{Math.round(temp)}°C</p>
      <p className="text-xl">Humidity: {humidity}%</p>
    </div>
  );
};

export default WeatherCard;
