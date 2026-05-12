

function SearchBar({ onSearch }) {
    return (
        <form onSubmit={onSearch(city)}>
            <input type="text" name="city"/>
        </form>
    )
}

export default SearchBar;