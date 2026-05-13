import { useState, useEffect, useRef } from 'react'
import { VscListUnordered } from "react-icons/vsc";

import './styles/App.css';
import useWeather from './hooks/useWeather';
import useSavedCities from './hooks/useSavedCities.jsx';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import Sidebar from './components/Sidebar.jsx';
import VideoBackground from './components/VideoBackground.jsx';

function App() {
  const [ city, setCity ] = useState(null);
  const isNewSearch = useRef(false);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const { savedCities, addCity, removeCity } = useSavedCities([]);
  const { current, forecast, loading, error } = useWeather(city);

  const [shown, setShown] = useState({ current: null, forecast: null });
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (current && isNewSearch.current) {
      addCity({
        cityName: current.name,
        temp: Math.round(current.main.temp),
        desc: current.weather[0].description,
        weatherId: current.weather[0].id,
        icon: current.weather[0].icon
      });
      isNewSearch.current=false;
    }

    if (!current) return;

    if (!shown.current) {
      setShown({ current, forecast });
      return;
    }

    setShown({ current, forecast });
    setPhase('enter');
    setTimeout(() => setPhase('idle'), 600);

    // setPhase('exit');
    // setTimeout(() => {
    //   setShown({ current, forecast });
    //   setPhase('enter');
    //   setTimeout(() => setPhase('idle'), 400);
    // }, 50);
  }, [current])

  return (
    <div className="app">
      <VideoBackground fade className="bg-video" weatherId={current?.weather[0].id} icon={current?.weather[0].icon} />
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
          <div className={`weather-content ${phase}`}>
            {shown.current && <WeatherCard current={shown.current} />}
            {shown.forecast && <ForecastList forecast={shown.forecast} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
