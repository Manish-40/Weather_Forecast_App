// FEATURE 3 – Forecast
// Owner: Contributor 3
import { subscribe } from "../state.js";
import { describeWeather } from "../utils/weather-codes.js";
import { formatTemp, formatDayName } from "../utils/format.js";

export function initForecast(root) {
  subscribe((state) => render(root, state));
}

function render(root, { weather, units }) {
  if (!weather) {
    root.innerHTML = "";
    return;
  }
  const { time, weather_code, temperature_2m_max, temperature_2m_min } = weather.daily;

  const rows = time
    .map((day, i) => {
      const info = describeWeather(weather_code[i]);
      return `
        <li class="forecast__day">
          <span class="forecast__name">${formatDayName(day, i)}</span>
          <span aria-hidden="true">${info.icon}</span>
          <span class="forecast__label">${info.label}</span>
          <span class="forecast__range">
            ${formatTemp(temperature_2m_max[i], units)}
            <span class="forecast__low">${formatTemp(temperature_2m_min[i], units)}</span>
          </span>
        </li>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel"><ul class="forecast">${rows}</ul></div>
    <!-- TODO (Feature 3): hourly forecast strip, rain chance, temperature chart -->
  `;
}
