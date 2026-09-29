# Skyline – Weather Forecast App

A small weather app built with plain HTML, CSS and JavaScript (no frameworks, no build step, no API key).
It uses the free Open-Meteo API. The page background changes with the weather.

## Run it

Browsers block ES modules from `file://`, so use a small local server:

```bash
python3 -m http.server 5500
```

Then open http://localhost:5500

## Structure

```
index.html            page + mount points
css/                  base, layout, search, current, forecast, settings
js/
  main.js             wires everything together
  state.js            shared store (getState / setState / subscribe)
  api.js              network calls (Open-Meteo)
  actions.js          loadCity, searchAndLoad, refresh
  ui/                 search.js, current.js, forecast.js, settings.js
  utils/              weather-codes.js, format.js
```

Data flow: UI -> actions.js -> api.js -> setState() -> every UI module re-renders via subscribe().
The `TODO` comments inside `js/ui/*.js` mark where new features go.
