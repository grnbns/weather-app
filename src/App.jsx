import { useState, useEffect, useRef } from 'react'
import { VscListUnordered } from "react-icons/vsc";

import './styles/App.css'
import useWeather from './hooks/useWeather';
import useSavedCities from './hooks/useSavedCities.jsx';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import Sidebar from './components/Sidebar.jsx';

function App() {
  const [ city, setCity ] = useState(null);
  const isNewSearch = useRef(false);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const { savedCities, addCity, removeCity } = useSavedCities([]);
  const { current, forecast, loading, error } = useWeather(city);

  useEffect(() => {
    if (current && isNewSearch.current) {
      addCity({
        cityName: current.name,
        temp: Math.round(current.main.temp),
        desc: current.weather[0].description
      });
      isNewSearch.current=false;
    }
  }, [current])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        savedCities={savedCities}
        onSelectCity={(city) => {
          isNewSearch.current=false;
          setCity(city)
        }}
        onSearch={newCity => {
          isNewSearch.current=true;
          setCity(newCity);
        }}
        
        onRemoveCity={removeCity}
      />
      <div className="weather-display">
        <div className="weather-info">
          <button className="sidebar-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <VscListUnordered size={40} color="white"/>
          </button>
          {current && <WeatherCard current={current} />}
          {forecast && <ForecastList forecast={forecast} />}
        </div>
      </div>
    </div>
  );
}

export default App;
