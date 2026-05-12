import { useState, useEffect } from 'react';

const BASE = 'https://api.openweathermap.org/data/2.5';
const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeather(city) {
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return

        const controller = new AbortController()
        const { signal } = controller

        async function fetchWeather() {
            setLoading(true)
            setError(null)
            try {
                const [currentRes, forecastRes] = await Promise.all([
                    fetch(`${BASE}/weather?q=${city}&appid=${KEY}&units=metric`, { signal }),
                    fetch(`${BASE}/forecast?q=${city}&appid=${KEY}&units=metric`, { signal }),
                ])

                if (!currentRes.ok) throw new Error(currentRes.status === 404 ? 'City not found' : 'Failed to fetch weather')
                if (!forecastRes.ok) throw new Error('Failed to fetch forecast')

                const currentData = await currentRes.json()
                const forecastData = await forecastRes.json()

                setCurrent(currentData)
                // one entry per day: pick the reading closest to noon
                setForecast(forecastData.list.filter(item => item.dt_txt.includes('12:00:00')))
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
        return () => controller.abort()
    }, [city])

    return { current, forecast, loading, error }
}