

function ForecastItem({ dayName, highTemp, lowTemp, condition, icon }) {
    return (
        <div>
            <div>{dayName}</div>
            <div>{highTemp}</div>
            <div>{lowTemp}</div>
            <div>{condition}</div>
            <div>
                <img src={icon} alt="icon" />
            </div>
        </div>
    )
}

export default ForecastItem;