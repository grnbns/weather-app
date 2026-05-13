import '../styles/CityCard.css';
import VideoBackground from './VideoBackground';

import { IoIosCloseCircleOutline } from "react-icons/io";

import { useRef } from 'react';


function CityCard({ cityData, onSelect, onRemove }) {
    const randomKey = useRef(Math.random());

    return (
        <div className="city-card" onClick={onSelect}>
            <VideoBackground className="card-video" weatherId={cityData.weatherId} icon={cityData.icon} key={randomKey.current}/>
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

