import '../styles/ForecastItem.css';

function ForecastItem({ dayName, highTemp, lowTemp, condition, icon }) {
    return (
        <div className="forecast-item">
            <div className="forecast-day">
                {new Date(dayName).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>

            <img className="forecast-icon" src={icon} alt={condition} />
            <div className="forecast-temp">{Math.round(highTemp)}°</div>
        </div>
    )
}

export default ForecastItem;