// FEATURE 2 – Current weather
// Owner: Contributor 2
import { subscribe } from "../state.js";
import { describeWeather } from "../utils/weather-codes.js";
import { formatTemp } from "../utils/format.js";

export function initCurrent(root) {
  subscribe((state) => render(root, state));
}

function render(root, { city, weather, units }) {
  if (!city || !weather) {
    root.innerHTML = "";
    return;
  }
  const { temperature_2m, weather_code } = weather.current;
  const info = describeWeather(weather_code);

  root.innerHTML = `
    <div class="panel current">
      <div>
        <p class="current__city">${city.name}${city.country ? ", " + city.country : ""}</p>
        <p class="current__temp">${formatTemp(temperature_2m, units)}</p>
        <p class="current__label">${info.label}</p>
      </div>
      <div class="current__icon" aria-hidden="true">${info.icon}</div>
    </div>
    <!-- TODO (Feature 2): feels-like, humidity, wind speed, sunrise/sunset -->
  `;
}
