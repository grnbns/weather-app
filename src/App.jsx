import { useState } from 'react'

import './App.css'
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';


function App() {
  const [ city, setCity ] = useState(null);
  const { current, forecast, loading, error } = useWeather(city);

  // if (!city) return <p>Search for a city to get started</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <SearchBar onSearch={(city) => setCity(city)} />
      {current && <WeatherCard current={current} />}
      {forecast && <ForecastList forecast={forecast} />}
    </div>
  );
}

export default App;
