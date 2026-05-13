import '../styles/SearchBar.css';

import { CiSearch } from "react-icons/ci";

function SearchBar({ onSearch }) {
    return (
        <form className="search-bar" onSubmit={(e) => {
            e.preventDefault();
            onSearch(e.target.city.value);
        }}>
            <input className="search-input" type="text" name="city" placeholder="Search for a city"/>
            <button className="search-button" type="submit">
                <CiSearch />
            </button>
        </form>
    )
}

export default SearchBar;