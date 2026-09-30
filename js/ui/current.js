// FEATURE 2 – Current weather
// Owner: Contributor 2
import { subscribe } from "../state.js";
import { describeWeather } from "../utils/weather-codes.js";
import { formatTemp } from "../utils/format.js";

// Remember WHEN each new forecast arrived.
// render() runs on every state change (loading, error...), so we only
// save a new time when the weather data itself is a new object.
let lastWeather = null;
let fetchedAt = null;

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

// Turns a Date into "3:42 PM" (uses the user's own time format)
function formatUpdatedTime(date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function render(root, { city, weather, units }) {
  if (!city || !weather) {
    root.innerHTML = "";
    return;
  }

  // New forecast arrived -> save the time it was fetched
  if (weather !== lastWeather) {
    lastWeather = weather;
    fetchedAt = new Date();
  }

  const { temperature_2m, weather_code } = weather.current;
  const info = describeWeather(weather_code);

  root.innerHTML = `
    <div class="panel current">
      <div>
        <p class="current__city">${formatLocation(city)}</p>
        <p class="current__temp">${formatTemp(temperature_2m, units)}</p>
        <p class="current__updated">
          Updated <time datetime="${fetchedAt.toISOString()}">${formatUpdatedTime(fetchedAt)}</time>
        </p>
        <p class="current__label">${info.label}</p>
      </div>
      <div class="current__icon" aria-hidden="true">${info.icon}</div>
    </div>
    <!-- TODO (Feature 2): feels-like, humidity, wind speed, sunrise/sunset -->
  `;
}