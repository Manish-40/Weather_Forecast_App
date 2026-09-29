// All network calls live here. Uses Open-Meteo (free, no API key needed).
// Docs: https://open-meteo.com/en/docs

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(name) {
  const url = `${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City search failed. Please try again.");
  const data = await res.json();
  if (!data.results?.length) throw new Error(`No city found for "${name}".`);
  const { name: cityName, admin1, country, latitude, longitude } = data.results[0];
  return { name: cityName, region: admin1, country, latitude, longitude };
}

export async function getWeather({ latitude, longitude, units = "celsius" }) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    temperature_unit: units,
    timezone: "auto",
    forecast_days: 7,
  });
  const res = await fetch(`${WEATHER_URL}?${params}`);
  if (!res.ok) throw new Error("Could not load the forecast. Please try again.");
  return res.json();
}