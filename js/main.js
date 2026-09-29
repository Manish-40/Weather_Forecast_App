// Entry point: wires the UI modules to their mount points.
import { subscribe } from "./state.js";
import { describeWeather } from "./utils/weather-codes.js";
import { formatTemp } from "./utils/format.js";
import { initSearch } from "./ui/search.js";
import { initCurrent } from "./ui/current.js";
import { initForecast } from "./ui/forecast.js";
import { initSettings } from "./ui/settings.js";
import { searchAndLoad } from "./actions.js";

const $ = (id) => document.getElementById(id);

initSettings($("settings"));
initSearch($("search"));
initCurrent($("current"));
initForecast($("forecast"));

// Status line + sky colour + page title
subscribe(({ status, error, city, weather, units }) => {
  const el = $("status");
  el.classList.toggle("status--error", status === "error");
  el.textContent =
    status === "loading" ? "Loading…" :
    status === "error"   ? error :
    status === "idle"    ? "Search for a city to see its forecast." : "";

  if (weather) {
    document.body.dataset.sky = describeWeather(weather.current.weather_code).sky;
  }

  // Update the tab title only when the new weather has finished loading
  if (status === "ready" && city && weather) {
    const temp = formatTemp(weather.current.temperature_2m, units);
    document.title = `${city.name} ${temp} – Skyline`;
  }
});

// Show something on first load
searchAndLoad("Mumbai");