import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
    return (
        <form className="search-bar" onSubmit={(e) => {
            e.preventDefault();
            onSearch(e.target.city.value);
        }}>
            <input type="text" name="city"/>
            <button className="search-button" type="submit">Search</button>
        </form>
    )
}

export default SearchBar;