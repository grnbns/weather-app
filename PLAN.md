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

---

## Phase 2 — Sidebar & Animated Backgrounds

---

### Step 8 — Layout Restructure

The current layout is a single centered column. It needs to become a side-by-side flex row:

```
┌──────────┬────────────────────────────┐
│          │                            │
│ Sidebar  │     Main content           │
│ (closed) │     (WeatherCard +         │
│          │      ForecastList)         │
└──────────┴────────────────────────────┘
```

Changes to `App.jsx`:
- Add `sidebarOpen` boolean state (default `false`)
- Add `savedCities` state (loaded from localStorage on mount)
- Top-level layout becomes `display: flex; flex-direction: row`
- A hamburger/menu button in the top-left toggles the sidebar
- Main content area takes up remaining width with `flex: 1`

---

### Step 9 — `useSavedCities` Hook

New file: `src/hooks/useSavedCities.js`

Manages the saved cities list with localStorage sync:
- Initialises from `localStorage.getItem('savedCities')` on mount
- Returns `{ savedCities, addCity, removeCity }`
- `addCity(city)` — adds to list if not already saved, persists to localStorage
- `removeCity(city)` — removes by name, persists to localStorage
- Adding a city also triggers a lightweight fetch for its current conditions (name, temp, condition) so the preview card has data immediately

---

### Step 10 — `Sidebar` Component

New file: `src/components/Sidebar.jsx`

Props: `{ isOpen, onClose, savedCities, onSelectCity, onRemoveCity, onSearch }`

Renders:
- Frosted glass panel (`backdrop-filter: blur`) that slides in from the left
- SearchBar at the top (moved here from main view)
- List of `CityCard` components below
- When a city is searched, it gets added to `savedCities` via `addCity`

CSS: translucent dark background (`rgba` + `backdrop-filter: blur(20px)`), fixed width (e.g. `280px`), slides in with a CSS `transform: translateX` transition.

---

### Step 11 — `CityCard` Component

New file: `src/components/CityCard.jsx`

Props: `{ cityData, onSelect, onRemove }`

Layout — 2×2 grid inside a card:

```
┌─────────────────────────┐
│ City Name       18°     │
│                         │
│ Partly Cloudy           │
└─────────────────────────┘
```

- Top-left: city name
- Top-right: current temperature
- Bottom-left: condition description
- Bottom-right: placeholder for high/low (omitted for now — API limitation)
- X button (absolute top-right corner) calls `onRemove`
- Clicking the card (not the X) calls `onSelect(cityName)`

---

### Step 12 — Animated Video Background

New file: `src/components/VideoBackground.jsx`

Maps OpenWeatherMap condition codes to a looping `<video>` element:

| Condition group | Video file |
|---|---|
| Clear day | `clear-day.mp4` |
| Clear night | `clear-night.mp4` |
| Clouds | `cloudy.mp4` |
| Rain / Drizzle | `rain.mp4` |
| Thunderstorm | `storm.mp4` |
| Snow | `snow.mp4` |
| Mist / Fog | `fog.mp4` |

**Video sourcing** — you need to supply the `.mp4` files. Good free sources:
- [Mixkit](https://mixkit.co/free-stock-video/weather/) — free, no attribution required
- [Pexels](https://www.pexels.com/search/videos/weather/) — free with attribution

Place files in `public/videos/`. The component reads `current.weather[0].id` (the OWM condition code) and swaps the video `src` accordingly. Use `key={videoSrc}` on the `<video>` element so React remounts it when the source changes, triggering a reload.

CSS: `position: fixed; inset: 0; z-index: -1; object-fit: cover` — sits behind everything.

---

### New Files Summary

```
src/
  components/
    Sidebar.jsx
    CityCard.jsx
    VideoBackground.jsx
  hooks/
    useSavedCities.js
  styles/
    Sidebar.css
    CityCard.css
    VideoBackground.css
public/
  videos/
    clear-day.mp4
    clear-night.mp4
    cloudy.mp4
    rain.mp4
    storm.mp4
    snow.mp4
    fog.mp4
```

---

### Phase 2 Sequence

```
8.  Restructure App.jsx layout (sidebar toggle + flex row)
9.  Build useSavedCities hook
10. Build Sidebar component + CSS
11. Build CityCard component + CSS
12. Source video files → public/videos/
13. Build VideoBackground component + CSS
14. Wire everything together in App.jsx
```
