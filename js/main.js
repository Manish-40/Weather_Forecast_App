// Entry point: wires the UI modules to their mount points.
import { subscribe } from "./state.js";
import { describeWeather } from "./utils/weather-codes.js";
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

// Status line + sky colour
subscribe(({ status, error, weather }) => {
  const el = $("status");
  el.classList.toggle("status--error", status === "error");
  el.textContent =
    status === "loading" ? "Loading…" :
    status === "error"   ? error :
    status === "idle"    ? "Search for a city to see its forecast." : "";

  if (weather) {
    document.body.dataset.sky = describeWeather(weather.current.weather_code).sky;
  }
});

// Show something on first load
searchAndLoad("Mumbai");
