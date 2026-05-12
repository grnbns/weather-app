# Weather App — Build Plan

## Stack
- **Framework:** React 19 + Vite (already scaffolded)
- **API:** [OpenWeatherMap](https://openweathermap.org/api) — free tier covers current weather + 5-day forecast
- **Styling:** Plain CSS modules (no extra dependencies needed)

---

## Step 1 — API Key Setup

1. Sign up at openweathermap.org and grab a free API key.
2. Create `.env` in the project root:
   ```
   VITE_WEATHER_API_KEY=your_key_here
   ```
3. Add `.env` to `.gitignore` (it already is via the scaffold's default).

---

## Step 2 — Project Structure

Reorganize `src/` before writing any features:

```
src/
  components/
    SearchBar.jsx      # city search input + submit
    WeatherCard.jsx    # current conditions display
    ForecastList.jsx   # 5-day forecast row
    ForecastItem.jsx   # single forecast day card
  hooks/
    useWeather.js      # fetches + caches API data
  utils/
    weather.js         # unit conversion, icon mapping helpers
  App.jsx              # root layout + state wiring
  App.css
  index.css
```

---

## Step 3 — Data Layer (`useWeather` hook)

Build a custom hook that:
- Accepts a city name string
- Calls two OpenWeatherMap endpoints:
  - `/weather` for current conditions
  - `/forecast` for 5-day / 3-hour data (collapsed to daily)
- Returns `{ current, forecast, loading, error }`
- Uses `AbortController` so stale requests don't overwrite fresh results

No extra libraries needed — plain `fetch` is sufficient.

---

## Step 4 — Components

Build in this order (each is independently testable):

| Component | What it renders |
|---|---|
| `SearchBar` | Controlled text input + search button; calls `onSearch(city)` prop |
| `WeatherCard` | City name, temperature, condition, humidity, wind speed, weather icon |
| `ForecastItem` | Day name, high/low temps, condition icon |
| `ForecastList` | Maps over 5 `ForecastItem`s |

---

## Step 5 — Wire Up `App.jsx`

`App.jsx` owns two pieces of state:
- `city` — the last searched city string
- Results from `useWeather(city)`

Render flow:
```
SearchBar  →  (user submits)  →  setCity  →  useWeather refetch
                                                  ↓
                                         WeatherCard + ForecastList
```

Show a loading spinner while `loading === true`.  
Show an error message when `error` is set (e.g. city not found).

---

## Step 6 — Styling

- Replace the Vite default content in `App.css` and `index.css`.
- Use a simple card layout: search bar centered at top, weather card below, forecast row beneath that.
- Add a subtle background gradient that changes based on condition (clear = blue, cloudy = grey, rain = dark blue).
- Make it responsive — single column on mobile, wider cards on desktop.

---

## Step 7 — Polish & Edge Cases

- **Empty state:** Show a prompt ("Search for a city to get started") before any search.
- **Debounce:** No need — search is submit-triggered, not on-keypress.
- **Unit toggle:** Add a °C / °F toggle button; convert in `utils/weather.js`.
- **Favicon + title:** Update `index.html` title to "Weather App" and swap in a weather favicon.

---

## Sequence Summary

```
1. API key + .env
2. Create src/components/, src/hooks/, src/utils/ folders
3. Build useWeather hook
4. Build SearchBar
5. Build WeatherCard
6. Build ForecastItem + ForecastList
7. Wire up App.jsx
8. Style
9. Polish (empty state, unit toggle, title)
```

Each step can be reviewed as its own commit.
