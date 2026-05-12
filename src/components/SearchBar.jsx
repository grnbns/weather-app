

function SearchBar({ onSearch }) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearch(e.target.city.value);
        }}>
            <input type="text" name="city"/>
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar;