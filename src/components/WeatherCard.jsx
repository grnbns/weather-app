

function WeatherCard({ cityName, temperature, condition, humidity, windSpeed, weatherIcon }) {
    return (
        <div>
            <div>{cityName}</div>
            <div>{temperature}</div>
            <div>{condition}</div>
            <div>{humidity}</div>
            <div>{windSpeed}</div>
            <div>
                <img src={weatherIcon} alt="weather icon" />
            </div>
        </div>
    )
}

export default WeatherCard;