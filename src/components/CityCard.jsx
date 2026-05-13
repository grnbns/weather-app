import '../styles/CityCard.css';

import { IoIosCloseCircleOutline } from "react-icons/io";


function CityCard({ cityData, onSelect, onRemove }) {
    return (
        <div className="city-card" onClick={onSelect}>
            <div className="city-card-left">
                <div className="city-card-top">{cityData.cityName}</div>
                <div className="city-card-bottom">{cityData.desc}</div>
            </div>
            <div className="city-card-right">
                <button className="del-city-card-btn" onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}>
                    <IoIosCloseCircleOutline />
                </button>
                <div className="city-card-top">{cityData.temp}°</div>
            </div>
        </div>
    )
}

export default CityCard;

