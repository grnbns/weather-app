import { useState, useEffect } from 'react';

// Manages the saved cities list with localStorage sync:
// - Initialises from `localStorage.getItem('savedCities')` on mount
// - Returns `{ savedCities, addCity, removeCity }`
// - `addCity(city)` — adds to list if not already saved, persists to localStorage
// - `removeCity(city)` — removes by name, persists to localStorage
// - Adding a city also triggers a lightweight fetch for its current conditions (name, temp, condition) so the preview card has data immediately

function useSavedCities() {
    const [ savedCities, setSavedCities ] = useState(() => {
        const stored = localStorage.getItem('savedCities');
        return JSON.parse(stored) || [];
    });

    useEffect(() => {
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
    }, [savedCities])

    function addCity(city) {
        setSavedCities(prev => {
            if (prev.find(c => c.cityName === city.cityName)) return prev;
            return [...prev, city];
        });
    }

    function removeCity(city) {
        setSavedCities(savedCities.filter(c => c.cityName !== city.cityName));
    }

    return { savedCities, addCity, removeCity };

}

export default useSavedCities;