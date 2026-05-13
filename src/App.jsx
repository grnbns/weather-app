import { useState } from 'react'
import { VscListUnordered } from "react-icons/vsc";

import './styles/App.css'
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import Sidebar from './components/Sidebar.jsx';

function App() {
  const [ city, setCity ] = useState(null);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const { savedCities, addCity, removeCity } = useSavedCities([]);
  const { current, forecast, loading, error } = useWeather(city);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        savedCities={savedCities}
        onSelectCity={(city) => setCity(city)}
        onSearch={(city) => setCity(city)}
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
