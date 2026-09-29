export function formatTemp(value, units = "celsius") {
  const symbol = units === "fahrenheit" ? "°F" : "°C";
  return `${Math.round(value)}${symbol}`;
}

export function formatDayName(isoDate, index = 0) {
  if (index === 0) return "Today";
  // Add T00:00 so the date is parsed as local time, not UTC.
  return new Date(`${isoDate}T00:00`).toLocaleDateString("en", { weekday: "long" });
}
