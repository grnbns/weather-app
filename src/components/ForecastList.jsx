import ForecastItem from './ForecastItem';

function ForecastList({ forecast }) {
    return forecast.map(date => {
        return <ForecastItem key={date.dt_txt} dayName={date.dt_txt} highTemp={date.main.temp_max} lowTemp={date.main.temp_min} condition={date.weather[0].description} icon={`https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`} />
    })
}

export default ForecastList;
