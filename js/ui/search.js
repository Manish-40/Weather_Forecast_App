// FEATURE 1 – Search
// Owner: Contributor 1
import { searchAndLoad } from "../actions.js";
import { getState } from "../state.js";

export function initSearch(root) {
  root.innerHTML = `
    <form class="search" role="search">
      <input class="search__input" name="q" type="search"
             placeholder="Search a city, e.g. Mumbai" aria-label="City name" autocomplete="off" />
      <button class="search__button" type="submit">Search</button>
    </form>
    <!-- TODO (Feature 1): "Use my location" button and recent searches list -->
  `;

  const form = root.querySelector("form");
  const input = root.querySelector(".search__input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await searchAndLoad(input.value);

    // Clear the box only if the search worked; keep the text if it failed
    if (getState().status === "ready") {
      input.value = "";
    }
  });
}