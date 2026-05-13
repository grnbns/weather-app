import '../styles/SideBar.css';

import CityCard from './CityCard';
import SearchBar from './SearchBar';

function SideBar({ isOpen, onClose, savedCities, onSelectCity, onRemoveCity, onSearch }) {
    return (
        <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
            <SearchBar onSearch={onSearch}/>
            {
                savedCities.map(city => (
                    <CityCard 
                        key={city.cityName}
                        onSelect={() => onSelectCity(city.cityName)}
                        onRemove={() => onRemoveCity(city)}
                        cityData={city}
                    />
                ))
            }
        </div>
    )
}

export default SideBar;
