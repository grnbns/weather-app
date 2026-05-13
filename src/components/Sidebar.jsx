import '../styles/SideBar.css';

import CityCard from './CityCard';
import SearchBar from './SearchBar';

function SideBar({ isOpen, onClose, savedCities, onSelectCity, onRemoveCity, onSearch }) {
    return (
        <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
            <SearchBar onSearch={onSearch}/>
            <CityCard
            />
        </div>
    )
}

export default SideBar;
