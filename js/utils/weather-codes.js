// Maps WMO weather codes (used by Open-Meteo) to a label, an icon and a "sky" mood.
// Swap the emoji for SVG icons later – see docs/TASKS.md.
const CODES = [
  { codes: [0],                              label: "Clear sky",     icon: "☀️", sky: "clear" },
  { codes: [1, 2],                           label: "Partly cloudy", icon: "⛅", sky: "clear" },
  { codes: [3],                              label: "Overcast",      icon: "☁️", sky: "cloudy" },
  { codes: [45, 48],                         label: "Fog",           icon: "🌫️", sky: "cloudy" },
  { codes: [51, 53, 55, 56, 57],             label: "Drizzle",       icon: "🌦️", sky: "rain" },
  { codes: [61, 63, 65, 66, 67, 80, 81, 82], label: "Rain",          icon: "🌧️", sky: "rain" },
  { codes: [71, 73, 75, 77, 85, 86],         label: "Snow",          icon: "❄️", sky: "snow" },
  { codes: [95, 96, 99],                     label: "Thunderstorm",  icon: "⛈️", sky: "storm" },
];

export function describeWeather(code) {
  return (
    CODES.find((c) => c.codes.includes(code)) ?? {
      label: "Unknown",
      icon: "❔",
      sky: "clear",
    }
  );
}
