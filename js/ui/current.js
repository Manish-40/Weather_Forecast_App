// FEATURE 2 – Current weather
// Owner: Contributor 2
import { subscribe } from "../state.js";
import { describeWeather } from "../utils/weather-codes.js";
import { formatTemp } from "../utils/format.js";

export function initCurrent(root) {
  subscribe((state) => render(root, state));
}

// Builds "Springfield, Illinois, United States".
// Skips missing parts and repeated names (e.g. "Singapore, Singapore").
function formatLocation({ name, region, country }) {
  return [name, region, country]
    .filter(Boolean)
    .filter((part, i, parts) => part !== parts[i - 1])
    .join(", ");
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
        <p class="current__city">${formatLocation(city)}</p>
        <p class="current__temp">${formatTemp(temperature_2m, units)}</p>
        <p class="current__label">${info.label}</p>
      </div>
      <div class="current__icon" aria-hidden="true">${info.icon}</div>
    </div>
    <!-- TODO (Feature 2): feels-like, humidity, wind speed, sunrise/sunset -->
  `;
}