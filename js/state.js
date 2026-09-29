// Tiny shared store. Every UI module reads from here and re-renders on change.
// Shape:
//   city:    { name, country, latitude, longitude } | null
//   weather: raw Open-Meteo response { current, daily } | null
//   units:   "celsius" | "fahrenheit"
//   status:  "idle" | "loading" | "error" | "ready"
//   error:   string | null

const state = {
  city: null,
  weather: null,
  units: "celsius",
  status: "idle",
  error: null,
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
