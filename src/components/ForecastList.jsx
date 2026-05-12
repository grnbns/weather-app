import ForecastItem from './ForecastItem';
import '../styles/ForecastList.css';


function ForecastList({ forecast }) {
    return (
        <div className="forecast-list">
            {forecast.map(date => (
                <ForecastItem key={date.dt_txt} dayName={date.dt_txt} highTemp={date.main.temp_max} lowTemp={date.main.temp_min} condition={date.weather[0].description} icon={`https://openweathermap.org/img/wn/${date.weather[0].icon}@4x.png`} />
            ))}
        </div>
    )
}

export default ForecastList;
