// Things the app can DO. UI modules call these instead of touching the API directly.
import { getState, setState } from "./state.js";
import { searchCity, getWeather } from "./api.js";

export async function loadCity(city) {
  setState({ city, status: "loading", error: null });
  try {
    const weather = await getWeather({ ...city, units: getState().units });
    setState({ weather, status: "ready" });
  } catch (err) {
    setState({ status: "error", error: err.message });
  }
}

export async function searchAndLoad(query) {
  const name = query.trim();
  if (!name) return;
  setState({ status: "loading", error: null });
  try {
    const city = await searchCity(name);
    await loadCity(city);
  } catch (err) {
    setState({ status: "error", error: err.message });
  }
}

// Re-fetch for the current city (e.g. after the units change).
export async function refresh() {
  const { city } = getState();
  if (city) await loadCity(city);
}
