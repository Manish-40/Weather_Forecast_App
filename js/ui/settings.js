// FEATURE 4 – Settings
// Owner: Contributor 4
// The app already supports units: call changeUnits("fahrenheit") below.
import { setState, getState } from "../state.js";
import { refresh } from "../actions.js";

export function initSettings(root) {
  root.innerHTML = `
    <div class="settings">
      <!-- TODO (Feature 4): °C / °F toggle, dark mode, remember choices in localStorage -->
    </div>
  `;
}

// Ready to use by whoever builds the toggle:
export async function changeUnits(units) {
  if (getState().units === units) return;
  setState({ units });
  await refresh();
}
