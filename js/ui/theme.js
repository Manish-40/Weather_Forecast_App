// FEATURE 4 – Dark mode
// Owner: Contributor 4
// Adds a light/dark toggle. The choice is saved in localStorage.
// On the first visit the device's own theme (prefers-color-scheme) is used.

const KEY = "skyline-theme";
const html = document.documentElement;

function getSaved() {
  try {
    const value = localStorage.getItem(KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null; // storage can be blocked, so fail quietly
  }
}

function save(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* ignore */
  }
}

function systemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  html.dataset.theme = theme;
}

export function initTheme(mount) {
  let theme = getSaved() ?? systemTheme();
  applyTheme(theme);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.setAttribute("aria-label", "Dark mode");

  function sync() {
    const isDark = theme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    button.textContent = isDark ? "☀️" : "🌙";
  }

  button.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    save(theme);
    sync();
  });

  // If the user never chose a theme, follow the device when it changes
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getSaved()) return;
    theme = systemTheme();
    applyTheme(theme);
    sync();
  });

  sync();
  mount.append(button);
}