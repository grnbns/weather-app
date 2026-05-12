

function WeatherCard({ current }) {
    return (
        <div>
            <div>{current.name}</div>
            <div>{current.main.temp}</div>
            <div>{current.weather[0].description}</div>
            <div>{current.wind.speed}</div>
            <div>{current.weather[0].icon}</div>
            <div>
                <img src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt="weather icon" />
            </div>
        </div>
    )
}

export default WeatherCard;