import '../styles/WeatherCard.css';

function WeatherCard({ current }) {
    return (
        <div className="weather-card">
            <div className="weather-city">{current.name}</div>
            <div className="weather-temp">
                <span>{Math.round(current.main.temp)}</span>
                <span className="weather-temp-degree">°</span>
            </div>
            <div className="weather-condition">{current.weather[0].description}</div>
            <img className="weather-icon" src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt="weather icon" />
            <div className="weather-details">
                <span>Humidity: {current.main.humidity}%</span>
                <span>Wind: {current.wind.speed} m/s</span>
            </div>
        </div>
    )
}

export default WeatherCard;